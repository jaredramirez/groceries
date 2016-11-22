use server::handlers::utils;
use server::handlers::traits::Handle;
use server::utils::traits::Constructor;
use server::models::traits::ToDoc;
use server::models::structs::{DB, User};
use server::controllers::traits::Controller;
use server::controllers::user::UserController;

use std::error::Error;

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

pub struct UserHandler {
    controller: UserController
}

impl Constructor for UserHandler {
    type C = UserController;

    fn new(controller: Self::C) -> Self {
        UserController {
            controller: controller
        }
    }
}

impl Handle for UserHandler {
    type R = Request;
    type IR = IronResult<Response>;

    // Error format not right
    fn create(&self, request: &mut Self::R) -> Self::IR {
        let req_body_result = request.get::<bodyparser::Struct<User>>();
        if let Ok(None) = req_body_result {
            return utils::get_new_response(status::UnprocessableEntity, Some("\"No request body found!\"".to_string()))
        } else if let Err(err) = req_body_result {
            return utils::get_new_response(status::UnprocessableEntity, Some(err.to_string()))
        }
        let user = req_body_result.unwrap().unwrap();

        let insert_result = self.controller.create(user);
        if let Err(err) = insert_result {
            return utils::get_new_response(status::Conflict, Some(err.to_string()))
        }

        utils::get_new_response(status::Created, None)
    }

    fn read_all(&self, request: &mut Self::R) -> Self::IR {
        let users_result = self.controller.read_all();
        if let Err(err) = users_result {
            return utils::get_new_response(status::Conflict, Some(err.description().to_string()))
        }
        let users = users_result.unwrap();

        let json_result = serde_json::to_string(&users);
        if let Err(err) = json_result {
            return utils::get_new_response(status::UnprocessableEntity, Some(err.description().to_string()))
        }
        let json = json_result.unwrap();

        utils::get_new_response(status::Ok, Some(json))
    }

    // fn read_by_id(self, request: &mut Self::R) -> Self::IR {
    //     let client = request.get::<Read<DB>>().unwrap();
    //     let collection = client.db("userprofile").collection("user");
    //
    //     let id_result = ObjectId::with_string(&utils::get_property_from_path_params(request, &"userId"));
    //     if let Err(e) = id_result {
    //         return utils::get_new_response(status::NotFound, Some(e.to_string()))
    //     }
    //     let id = id_result.unwrap();
    //
    //     let mut db_query_document = OrderedDocument::new();
    //     db_query_document.insert_bson("_id".to_string(), Bson::ObjectId(id));
    //
    //     let result_creator = collection.find_one(Some(db_query_document), None);
    //     if let Err(e) = result_creator {
    //         return utils::get_new_response(status::NotFound, Some(e.to_string()))
    //     }
    //     let result = result_creator.unwrap();
    //
    //     if let Some(user_bson) = result {
    //         let user = User {
    //             id:            user_bson.get_object_id("_id").unwrap().clone(),
    //             email:         user_bson.get_str("email").unwrap().to_string(),
    //             password_hash: user_bson.get_str("passwordHash").unwrap().to_string(),
    //             lists:         vec![],
    //             created_at:    user_bson.get_utc_datetime("createdAt").unwrap().clone(),
    //             updated_at:    user_bson.get_utc_datetime("updatedAt").unwrap().clone()
    //         };
    //
    //         return utils::get_new_response(status::Found, Some(serde_json::to_string(&user).unwrap()));
    //     }
    //
    //     utils::get_new_response(status::NotFound, Some("\"Failed to get User!\"".to_string()))
    // }
    //
    // // ERROR HANDLING NOT WORKING
    // fn update_by_id(self, request: &mut Self::R) -> Self::IR {
    //     let req_body_result = request.get::<bodyparser::Struct<User>>();
    //     if let Ok(None) = req_body_result {
    //         return utils::get_new_response(status::NotModified, Some("\"No request body found!\"".to_string()))
    //     } else if let Err(err) = req_body_result {
    //         return utils::get_new_response(status::NotModified, Some(err.description().to_string()))
    //     }
    //     let user = req_body_result.unwrap().unwrap();
    //
    //     let id_result = ObjectId::with_string(&utils::get_property_from_path_params(request, &"userId"));
    //     if let Err(e) = id_result {
    //         return utils::get_new_response(status::NotModified, Some(e.description().to_string()))
    //     }
    //     let id = id_result.unwrap();
    //
    //     let client = request.get::<Read<DB>>().unwrap();
    //     let collection = client.db("userprofile").collection("user");
    //
    //     let filter = doc! {
    //         "_id" => id
    //     };
    //
    //     let doc = doc! {
    //         "$set" => {
    //             user.to_doc_without_id().clone()
    //         }
    //     };
    //
    //     let update_result = collection.find_one_and_update(filter.clone(), doc.clone(), None);
    //     if let Err(e) = update_result {
    //         return utils::get_new_response(status::Conflict, Some(e.to_string()));
    //     }
    //
    //     utils::get_new_response(status::NoContent, Some("\"Failed to get User!\"".to_string()))
    // }
    //
    // fn remove_by_id(self, request: &mut Self::R) -> Self::IR {
    //     let client = request.get::<Read<DB>>().unwrap();
    //     let collection = client.db("userprofile").collection("user");
    //
    //     let id_result = ObjectId::with_string(&utils::get_property_from_path_params(request, &"userId"));
    //     if let Err(e) = id_result {
    //         return utils::get_new_response(status::NotFound, Some(e.to_string()))
    //     }
    //     let id = id_result.unwrap();
    //
    //     let filter = doc! {
    //         "_id" => id
    //     };
    //
    //     let collection_result = collection.delete_one(filter, None);
    //     if let Err(e) = collection_result {
    //         return utils::get_new_response(status::Conflict, Some(e.to_string()));
    //     }
    //
    //     utils::get_new_response(status::NoContent, None)
    // }
}
