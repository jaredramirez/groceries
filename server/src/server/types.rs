use iron::typemap::Key;

use mongodb::Client;
use bson::oid::ObjectId;

pub struct DB;
impl Key for DB {
    type Value = Client;
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct User {
    pub id: ObjectId,
    pub email: String,
    #[serde(rename="passwordHash")]
    pub password_hash: String,
    #[serde(rename="createdAt")]
    pub created_at: i64,
    #[serde(rename="updatedAt")]
    pub updated_at: i64
}
