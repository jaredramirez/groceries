use serde::{Serializer, Deserializer, Deserialize};
use chrono::{UTC, DateTime, TimeZone};
use rustc_serialize::hex::ToHex;

use bson::oid::ObjectId;

pub fn object_id_serialize<S>(object_id: &ObjectId, serializer: &mut S) -> Result<(), S::Error> where S: Serializer {
    let serialized_id_result = serializer.serialize_str(&object_id.to_hex());
    if let Err(e) = serialized_id_result {
        return Err(e);
    }

    Ok(serialized_id_result.unwrap())
}

pub fn object_id_deserialize<D>(deserializer: &mut D) -> Result<ObjectId, D::Error> where D: Deserializer {
    let deserializer_result = Deserialize::deserialize(deserializer);
    if let Err(_) = deserializer_result {
        println!("Error deserializing id, creating new one.");
        return Ok(ObjectId::new().unwrap());
        // return Err(e);
    }
    let id_string: String = deserializer_result.unwrap();

    Ok(ObjectId::with_string(&id_string).unwrap())
}

pub fn date_serialize<S>(date: &DateTime<UTC>, serializer: &mut S) -> Result<(), S::Error> where S: Serializer {
    let serialized_date_result = serializer.serialize_i64(date.timestamp());
    if let Err(e) = serialized_date_result {
        return Err(e);
    }
    Ok(serialized_date_result.unwrap())
}

pub fn date_deserialize<D>(deserializer: &mut D) -> Result<DateTime<UTC>, D::Error> where D: Deserializer {
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
