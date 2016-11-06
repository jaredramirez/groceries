use super::super::models::structs::User;
use super::super::models::traits::ToDoc;

use std::error::Error;

pub trait Controller {
    type O: ToDoc;
    type E: Error;

    fn create<O,E>(&self, object: O) -> Result< (), E >;

    fn read_all<O,E>(&self) -> Result< Vec<O>, E >;

    fn read_by_id<O,E>(&self, id: String) -> Result< O, E >;

    fn update_by_id<O,E>(&self, id: String, object: O) -> Result< (), E >;

    fn delete_by_id<E>(&self, id: String) -> Result< (), E >;
}
