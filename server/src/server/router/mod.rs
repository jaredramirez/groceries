pub mod authentication;
pub mod user;
pub mod list;

use server::models::structs;

use iron::prelude::*;
use logger::Logger;
use mount::Mount;
use persistent::Read;
use bodyparser;

use mongodb::{Client, ThreadedClient};

const MAX_BODY_LENGTH: usize = 1024 * 1024 * 10;

// new_local creates new router with local MongoDB client
pub fn new_local(host: &str, port: u16) -> Chain {
    let client: Client = Client::connect(host, port)
        .ok()
        .expect("Failed to initialize client.");

    get_new_router(client)
}

// new_remote creates new router with remote MongoDB client
pub fn new_remote(uri: &str) -> Chain {
    let client = Client::with_uri(uri)
        .ok()
        .expect("Failed to initialize client.");

    get_new_router(client)
}

// get_new_router creates and links router with paths and all middleware
fn get_new_router(client: Client) -> Chain {
    let mut mount = Mount::new();
    authentication::mount_router(&mut mount);
    user::mount_router(&mut mount, client.clone());
    list::mount_router(&mut mount);

    let (logger_before, logger_after) = Logger::new(None);

    let mut chain = Chain::new(mount);
    chain.link_before(logger_before);
    chain.link_before(Read::<bodyparser::MaxBodyLength>::one(MAX_BODY_LENGTH));
    chain.link(
        Read::<structs::DB>::both(client)
    );
    chain.link_after(logger_after);

    chain
}
