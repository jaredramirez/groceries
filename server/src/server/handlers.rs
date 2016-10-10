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
    Ok(Response::with( (status::Ok, "Recieved Request") ))
}

pub fn id(req: &mut Request) -> IronResult<Response> {
    let client = req.get::<Read<DB>>().unwrap();
    let collection = client.db("userprofile").collection("user");

    let id = ObjectId::with_string(&get_property_from_query(req, &"id")).ok().unwrap(); // Add error handling
    let mut db_query_document = OrderedDocument::new();
    // db_query_document.insert("_id", id);
    db_query_document.insert_bson("_id".to_string(), Bson::ObjectId(id));

    let result = collection.find_one(Some(db_query_document), None).unwrap();

    if let Some(user_bson) = result {
        let user = User {
            id:            user_bson.get_object_id("_id").unwrap().clone(),
            email:         user_bson.get_str("email").unwrap().to_string(),
            password_hash: user_bson.get_str("passwordHash").unwrap().to_string(),
            created_at:    user_bson.get_utc_datetime("createdAt").unwrap().clone(),
            updated_at:    user_bson.get_utc_datetime("updatedAt").unwrap().clone()
        };

        return Ok(Response::with( (status::Ok, user.to_json().to_string()) ))
    }

    Ok(Response::with( (status::NotFound, "Failed to get User!") ))
}

fn get_property_from_query(req: &mut Request, property: &str) -> String {
    req.extensions.get::<Router>().unwrap().find(property).unwrap_or("/").to_string()
}
