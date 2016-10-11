use rustc_serialize::json::ToJson;

use iron::prelude::*;
use iron::status;
use router::Router;
use persistent::Read;

use mongodb::db::ThreadedDatabase;
use mongodb::ThreadedClient;
use bson::ordered::OrderedDocument;
use bson::oid::ObjectId;
use bson::Bson;

use super::types::{DB, User};

pub fn default(req: &mut Request) -> IronResult<Response> {
    get_new_response(status::Ok, "Recieved Request".to_string())
}

pub fn user_save(req: &mut Request) -> IronResult<Response> {
    unimplemented!();
}

pub fn user_by_id(req: &mut Request) -> IronResult<Response> {
    let client = req.get::<Read<DB>>().unwrap();
    let collection = client.db("userprofile").collection("user");

    let id_creator = ObjectId::with_string(&get_property_from_query(req, &"id"));
    if let Err(e) = id_creator {
        return get_new_response(status::NotFound, e.to_string())
    }
    let id = id_creator.unwrap();

    let mut db_query_document = OrderedDocument::new();
    db_query_document.insert_bson("_id".to_string(), Bson::ObjectId(id));

    let result_creator = collection.find_one(Some(db_query_document), None);
    if let Err(e) = result_creator {
        return get_new_response(status::NotFound, e.to_string())
    }
    let result = result_creator.unwrap();

    if let Some(user_bson) = result {
        let user = User {
            id:            user_bson.get_object_id("_id").unwrap().clone(),
            email:         user_bson.get_str("email").unwrap().to_string(),
            password_hash: user_bson.get_str("passwordHash").unwrap().to_string(),
            created_at:    user_bson.get_i64("createdAt").unwrap().clone(),
            updated_at:    user_bson.get_i64("updatedAt").unwrap().clone()
        };

        return get_new_response(status::Ok, user.to_json().to_string());
    }

    get_new_response(status::NotFound, "Failed to get User!".to_string())
}

fn get_new_response(status_code: status::Status, data: String) -> IronResult<Response> {
    Ok(Response::with((status_code, data) ))
}

fn get_property_from_query(req: &mut Request, property: &str) -> String {
    req.extensions.get::<Router>().unwrap().find(property).unwrap_or("/").to_string()
}
