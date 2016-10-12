extern crate groceries;
extern crate iron;
#[macro_use] extern crate router;
extern crate mount;
extern crate persistent;
extern crate bodyparser;

#[macro_use(bson, doc)] extern crate bson;
extern crate mongodb;

use groceries::server;
use iron::prelude::*;
use mount::Mount;
use persistent::Read;

use mongodb::{Client, ThreadedClient};

const MAX_BODY_LENGTH: usize = 1024 * 1024 * 10;

fn main() {
    let client: Client = Client::connect("localhost", 27017)
        .ok()
        .expect("Failed to connnect to database");

    let router = router!{
        userAll:   get  "/users" => server::handlers::user_all,
        userSave:  post "/users" => server::handlers::user_save,
        userById:  get  "/users/:id" => server::handlers::user_by_id
    };

    let mut mount = Mount::new();
    mount.mount("/", router);

    let mut middleware = Chain::new(mount);
    middleware.link_before(Read::<bodyparser::MaxBodyLength>::one(MAX_BODY_LENGTH));
    middleware.link(
        Read::<server::types::DB>::both(client)
    );

    Iron::new(middleware).http("localhost:3000").unwrap();
}
