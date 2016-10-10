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
        index: get "/" => server::handlers::default,
        id:    get "/:id" => server::handlers::id
    };

    let mut mount = Mount::new();
    mount.mount("/", router);

    let mut middleware = Chain::new(mount);
    middleware.link(
        Read::<server::types::DB>::both(client)
    );

    Iron::new(middleware).http("localhost:3000").unwrap();
}
