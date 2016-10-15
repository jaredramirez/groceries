use iron::prelude::*;
use iron::status;
use persistent::Read;
use bodyparser;
use serde_json;

use mongodb::db::ThreadedDatabase;
use mongodb::ThreadedClient;
use bson::ordered::OrderedDocument;
use bson::oid::ObjectId;
use bson::Bson;

use super::utils;
use super::super::traits::ToDoc;
use super::super::types::{DB, User};

pub fn read_all(req: &mut Request) -> IronResult<Response> {
    let client = req.get::<Read<DB>>().unwrap();
    let collection = client.db("userprofile").collection("user");

    let mut users = vec![];
    let cursor = collection.find(None, None).unwrap();

    for result in cursor {
        if let Ok(user_bson) = result {
            let user = User {
                id:            user_bson.get_object_id("_id").unwrap().clone(),
                email:         user_bson.get_str("email").unwrap().to_string(),
                password_hash: user_bson.get_str("passwordHash").unwrap().to_string(),
                created_at:    user_bson.get_utc_datetime("createdAt").unwrap().clone(),
                updated_at:    user_bson.get_utc_datetime("updatedAt").unwrap().clone()
            };
            users.push(user);
        }
    }

    utils::get_new_response(status::Ok, Some(serde_json::to_string(&users).unwrap()))
}

pub fn create(req: &mut Request) -> IronResult<Response> {
    let req_body_result = req.get::<bodyparser::Struct<User>>();
    if let Ok(None) = req_body_result {
        return utils::get_new_response(status::UnprocessableEntity, Some("\"No request body found!\"".to_string()));
    } else if let Err(err) = req_body_result {
        return utils::get_new_response(status::UnprocessableEntity, Some(err.to_string()));
    }
    let user = req_body_result.unwrap().unwrap();

    let client = req.get::<Read<DB>>().unwrap();
    let collection = client.db("userprofile").collection("user");

    collection.insert_one(user.to_doc().clone(), None).unwrap();

    utils::get_new_response(status::Created, None)
}

pub fn read_by_id(req: &mut Request) -> IronResult<Response> {
    let client = req.get::<Read<DB>>().unwrap();
    let collection = client.db("userprofile").collection("user");

    let id_result = ObjectId::with_string(&utils::get_property_from_query(req, &"userId"));
    if let Err(e) = id_result {
        return utils::get_new_response(status::NotFound, Some(e.to_string()))
    }
    let id = id_result.unwrap();

    let mut db_query_document = OrderedDocument::new();
    db_query_document.insert_bson("_id".to_string(), Bson::ObjectId(id));

    let result_creator = collection.find_one(Some(db_query_document), None);
    if let Err(e) = result_creator {
        return utils::get_new_response(status::NotFound, Some(e.to_string()))
    }
    let result = result_creator.unwrap();

    if let Some(user_bson) = result {
        let user = User {
            id:            user_bson.get_object_id("_id").unwrap().clone(),
            email:         user_bson.get_str("email").unwrap().to_string(),
            password_hash: user_bson.get_str("passwordHash").unwrap().to_string(),
            created_at:    user_bson.get_utc_datetime("createdAt").unwrap().clone(),
            updated_at:    user_bson.get_utc_datetime("updatedAt").unwrap().clone()
        };

        return utils::get_new_response(status::Found, Some(serde_json::to_string(&user).unwrap()));
    }

    utils::get_new_response(status::NotFound, Some("\"Failed to get User!\"".to_string()))
}

pub fn update_by_id(req: &mut Request) -> IronResult<Response> {
    let req_body_result = req.get::<bodyparser::Struct<User>>();
    if let Ok(None) = req_body_result {
        return utils::get_new_response(status::NotModified, Some("\"No request body found!\"".to_string()));
    } else if let Err(err) = req_body_result {
        return utils::get_new_response(status::NotModified, Some(err.to_string()));
    }
    let user = req_body_result.unwrap().unwrap();

    let id_result = ObjectId::with_string(&utils::get_property_from_query(req, &"userId"));
    if let Err(e) = id_result {
        return utils::get_new_response(status::NotModified, Some(e.to_string()))
    }
    let id = id_result.unwrap();

    let client = req.get::<Read<DB>>().unwrap();
    let collection = client.db("userprofile").collection("user");

    let filter = doc! {
        "_id" => id
    };

    let doc = doc! {
        "$set" => {
            user.to_doc_without_id().clone()
        }
    };

    let update_result = collection.find_one_and_update(filter.clone(), doc.clone(), None);
    if let Err(e) = update_result {
        return utils::get_new_response(status::Conflict, Some(e.to_string()));
    }

    utils::get_new_response(status::NoContent, Some("\"Failed to get User!\"".to_string()))
}

pub fn remove_by_id(req: &mut Request) -> IronResult<Response> {
    let client = req.get::<Read<DB>>().unwrap();
    let collection = client.db("userprofile").collection("user");

    let id_result = ObjectId::with_string(&utils::get_property_from_query(req, &"userId"));
    if let Err(e) = id_result {
        return utils::get_new_response(status::NotFound, Some(e.to_string()))
    }
    let id = id_result.unwrap();

    let filter = doc! {
        "_id" => id
    };

    let collection_result = collection.delete_one(filter, None);
    if let Err(e) = collection_result {
        return utils::get_new_response(status::Conflict, Some(e.to_string()));
    }

    utils::get_new_response(status::NoContent, None)
}
