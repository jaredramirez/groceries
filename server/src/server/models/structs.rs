use super::utils;
use super::traits::ToDoc;

use iron::typemap::Key;
use chrono::{UTC, DateTime};

use mongodb::Client;
use bson::Bson;
use bson::oid::ObjectId;
use bson::ordered::OrderedDocument;

pub struct DB;
impl Key for DB {
    type Value = Client;
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct User {
    #[serde(serialize_with="utils::object_id_serialize", deserialize_with="utils::object_id_deserialize")]
    pub id: ObjectId,
    pub email: String,
    #[serde(rename="passwordHash")]
    pub password_hash: String,
    pub lists: Vec<i32>,
    #[serde(rename="createdAt", serialize_with="utils::date_serialize", deserialize_with="utils::date_deserialize")]
    pub created_at: DateTime<UTC>,
    #[serde(rename="updatedAt", serialize_with="utils::date_serialize", deserialize_with="utils::date_deserialize")]
    pub updated_at: DateTime<UTC>
}

impl ToDoc for User {
    fn to_doc_without_id(&self) -> OrderedDocument {
        doc!{
            "email"        => (Bson::String(self.email.clone())),
            "passwordHash" => (Bson::String(self.password_hash.clone())),
            // "lists"        => (self.lists.to_doc_without_id()),
            "createdAt"    => (Bson::UtcDatetime(self.created_at)),
            "updatedAt"    => (Bson::UtcDatetime(self.created_at))
        }
    }
    fn to_doc(&self) -> OrderedDocument {
        let mut doc = self.to_doc_without_id();
        doc.insert_bson("_id".to_string(), Bson::ObjectId(self.id.clone()));
        doc
    }
}
