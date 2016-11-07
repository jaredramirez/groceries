use server::controllers::traits::Controller;
use server::models::structs::{DB, User};
use server::models::traits::ToDoc;
use server::errors::QueryError;

use std::error::Error;

use iron::prelude::*;
use iron::status;
use persistent::Read;
use bodyparser;
use serde_json;

use mongodb::db::ThreadedDatabase;
use mongodb::{Client, ThreadedClient};
use bson::ordered::OrderedDocument;
use bson::oid::ObjectId;
use bson::Bson;

#[derive(Clone)]
pub struct UserController {
    client: Client
}

impl Controller for UserController {
    type O = User;
    type E = QueryError;

    fn new(client: Client) -> Self {
        UserController {
            client: client
        }
    }

    // fn create(self, object: User) -> Result<(), QueryError> where Self::O: ToDoc {
    fn create(self, object: Self::O) -> Result< (), Self::E > where Self::O: ToDoc {
        let collection = self.client.db("userprofile").collection("user");

        let insert_result = collection.insert_one(object.to_doc().clone(), None);
        if let Ok(insert_one_result) = insert_result {
            if let Some(write_exception) = insert_one_result.write_exception {
                return Err(QueryError::DefaultError(write_exception.description().to_string()))
            }
        } else if let Err(e) = insert_result {
            return Err(QueryError::DefaultError(e.to_string()))
        }

        Ok(())
    }

    fn read_all(self) -> Result< Vec<Self::O>, Self::E > where Self::O: ToDoc {
        let collection = self.client.db("userprofile").collection("user");
        let cursor = try!(collection.find(None, None));
        let mut users = vec![];

        for result in cursor {
            if let Ok(user_bson) = result {
                let user = User {
                    id:            user_bson.get_object_id("_id").unwrap().clone(),
                    email:         user_bson.get_str("email").unwrap().to_string(),
                    password_hash: user_bson.get_str("passwordHash").unwrap().to_string(),
                    lists:         vec![],
                    created_at:    user_bson.get_utc_datetime("createdAt").unwrap().clone(),
                    updated_at:    user_bson.get_utc_datetime("updatedAt").unwrap().clone()
                };
                users.push(user);
            }
        }

        Ok(users)
    }

    // fn read_by_id(&self, id: String) -> Result< O, E > where O: ToDoc {
    //     let collection = self.client.db("userprofile").collection("user");
    //
    //     let mut db_query_document = OrderedDocument::new();
    //     db_query_document.insert_bson("_id".to_string(), Bson::ObjectId(id));
    //
    //     let result_creator = collection.find_one(Some(db_query_document), None);
    //     if let Err(e) = result_creator {
    //         return Err(QueryError::DefaultError((e))
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
    //         return Ok(user)
    //     }
    //
    //     Err(QueryError::DefaultError("\"Failed to get User!\"".to_string()))
    // }
    //
    // fn update_by_id<O,E>(&self, id: String, user: O) -> Result< (), E > where O: ToDoc {
    //     let collection = self.client.db("userprofile").collection("user");
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
    //         return Err(QueryError::MongoError((e))
    //     }
    //
    //     Ok(())
    // }
    //
    // fn delete_by_id<E>(&self, id: String) -> Result< (), E > {
    //     let collection = self.client.db("userprofile").collection("user");
    //
    //     let filter = doc! {
    //         "_id" => id
    //     };
    //
    //     let collection_result = collection.delete_one(filter, None);
    //     if let Err(e) = collection_result {
    //         return Err(QueryError::DefaultError(e.to_string()));
    //     }
    //
    //     Ok(())
    // }
}
