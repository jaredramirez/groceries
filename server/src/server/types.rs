use std::collections::BTreeMap;

use rustc_serialize::json::{ToJson, Json};
use rustc_serialize::hex::ToHex;

use iron::typemap::Key;

use mongodb::Client;
use bson::oid::ObjectId;
use chrono::{DateTime, UTC};

pub struct DB;
impl Key for DB {
    type Value = Client;
}

pub struct User {
    pub id: ObjectId,
    pub email: String,
    pub password_hash: String,
    pub created_at: DateTime<UTC>,
    pub updated_at: DateTime<UTC>
}

impl ToJson for User {
    fn to_json(&self) -> Json {
        let mut json = BTreeMap::new();

        json.insert(String::from("id"), Json::String(self.id.to_hex()) );
        json.insert(String::from("email"), Json::String(self.email.to_string()));
        json.insert(String::from("passwordHash"), Json::String(self.password_hash.to_string()));
        json.insert(String::from("createdAt"), Json::String(self.created_at.to_string()) );
        json.insert(String::from("updatedAt"), Json::String(self.updated_at.to_string()) );

        Json::Object(json)
    }
}
