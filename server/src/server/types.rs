use iron::typemap::Key;
use serde::{Serializer, Deserializer, Deserialize};
use chrono::{UTC, DateTime, TimeZone};
use rustc_serialize::hex::ToHex;

use mongodb::Client;
use bson::Bson;
use bson::oid::ObjectId;
use bson::ordered::OrderedDocument;

use super::traits::ToDoc;

pub struct DB;
impl Key for DB {
    type Value = Client;
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct User {
    #[serde(serialize_with="object_id_serialize", deserialize_with="object_id_deserialize")]
    pub id: ObjectId,
    pub email: String,
    #[serde(rename="passwordHash")]
    pub password_hash: String,
    #[serde(rename="createdAt", serialize_with="date_serialize", deserialize_with="date_deserialize")]
    pub created_at: DateTime<UTC>,
    #[serde(rename="updatedAt", serialize_with="date_serialize", deserialize_with="date_deserialize")]
    pub updated_at: DateTime<UTC>
}

impl ToDoc for User {
    fn to_doc_without_id(&self) -> OrderedDocument {
        let mut doc = doc!{};

        doc.insert_bson("email".to_string(), Bson::String(self.email.clone()));
        doc.insert_bson("passwordHash".to_string(), Bson::String(self.password_hash.clone()));
        doc.insert_bson("createdAt".to_string(), Bson::UtcDatetime(self.created_at));
        doc.insert_bson("updatedAt".to_string(), Bson::UtcDatetime(self.updated_at));

        doc
    }
    fn to_doc(&self) -> OrderedDocument {
        let mut doc = self.to_doc_without_id();

        doc.insert_bson("_id".to_string(), Bson::ObjectId(self.id.clone()));

        doc
    }
}

fn object_id_serialize<S>(object_id: &ObjectId, serializer: &mut S) -> Result<(), S::Error> where S: Serializer {
    let serialized_id_result = serializer.serialize_str(&object_id.to_hex());
    if let Err(e) = serialized_id_result {
        return Err(e);
    }

    Ok(serialized_id_result.unwrap())
}

fn object_id_deserialize<D>(deserializer: &mut D) -> Result<ObjectId, D::Error> where D: Deserializer {
    let deserializer_result = Deserialize::deserialize(deserializer);
    if let Err(_) = deserializer_result {
        println!("Error deserializing id, creating new one.");
        return Ok(ObjectId::new().unwrap());
        // return Err(e);
    }
    let id_string: String = deserializer_result.unwrap();

    Ok(ObjectId::with_string(&id_string).unwrap())
}

fn date_serialize<S>(date: &DateTime<UTC>, serializer: &mut S) -> Result<(), S::Error> where S: Serializer {
    let serialized_date_result = serializer.serialize_i64(date.timestamp());
    if let Err(e) = serialized_date_result {
        return Err(e);
    }
    Ok(serialized_date_result.unwrap())
}

fn date_deserialize<D>(deserializer: &mut D) -> Result<DateTime<UTC>, D::Error> where D: Deserializer {
    let deserializer_result = Deserialize::deserialize(deserializer);
    if let Err(_) = deserializer_result {
        println!("Error deserializing date, creating new one.");
        return Ok(UTC::now())
        // return Err(e);
    }
    let epoch: i64 = deserializer_result.unwrap();

    let new_date_result = UTC::datetime_from_str(&UTC, &epoch.to_string(), "%s");
    if let Err(_) = new_date_result {
        println!("Error deserializing date, creating new one.");
        return Ok(UTC::now())
        // return Err( de::Error::custom(e.description()) );
    }
    let new_date = new_date_result.unwrap();

    Ok(new_date)
}
