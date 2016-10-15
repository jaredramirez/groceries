extern crate groceries;

extern crate iron;
#[macro_use] extern crate router;
extern crate logger;
extern crate mount;
extern crate persistent;
extern crate bodyparser;

#[macro_use(bson, doc)] extern crate bson;
extern crate mongodb;

use groceries::server::handlers;
use groceries::server::types;

use iron::prelude::*;
use logger::Logger;
use mount::Mount;
use persistent::Read;

use mongodb::{Client, ThreadedClient};

const MAX_BODY_LENGTH: usize = 1024 * 1024 * 10;

fn main() {
    let client: Client = Client::connect("localhost", 27017)
        .ok()
        .expect("Failed to connnect to database");

    let router = router!{
        userReadAll:     get     ""         => handlers::user::read_all,
        userCreate:      post    ""         => handlers::user::create,
        userReadById:    get     "/:userId" => handlers::user::read_by_id,
        userUpdateById:  put     "/:userId" => handlers::user::update_by_id,
        userRemoveById:  delete  "/:userId" => handlers::user::remove_by_id,

        listReadAll:     get     "/:userId/lists"         => handlers::list::read_all,
        listCreate:      post    "/:userId/lists"         => handlers::list::create,
        listReadById:    get     "/:userId/lists/:listId" => handlers::list::read_by_id,
        listUpdateById:  put     "/:userId/lists/:listId" => handlers::list::update_by_id,
        listRemoveById:  delete  "/:userId/lists/:listId" => handlers::list::remove_by_id
    };

    let mut mount = Mount::new();
    mount.mount("/api/v1/users", router);

    let (logger_before, logger_after) = Logger::new(None);

    let mut middleware = Chain::new(mount);
    middleware.link_before(logger_before);
    middleware.link_before(Read::<bodyparser::MaxBodyLength>::one(MAX_BODY_LENGTH));
    middleware.link(
        Read::<types::DB>::both(client)
    );
    middleware.link_after(logger_after);

    Iron::new(middleware).http("localhost:3000").unwrap();
}
