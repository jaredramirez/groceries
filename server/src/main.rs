extern crate groceries;
extern crate iron;
#[macro_use] extern crate router;
extern crate mount;
extern crate persistent;

#[macro_use(bson, doc)] extern crate bson;
extern crate mongodb;

use groceries::server;
use iron::prelude::*;
use mount::Mount;
use persistent::Read;

use mongodb::{Client, ThreadedClient};

fn main() {
    let client: Client = Client::connect("localhost", 27017)
        .ok()
        .expect("Failed to connnect to database");

    let router = router!{
        index: get  "/" => server::handlers::default,
        save:  post "/users" => server::handlers::user_save,
        id:    get  "/users/:id" => server::handlers::user_by_id
    };

    let mut mount = Mount::new();
    mount.mount("/", router);

    let mut middleware = Chain::new(mount);
    middleware.link(
        Read::<server::types::DB>::both(client)
    );

    Iron::new(middleware).http("localhost:3000").unwrap();
}
