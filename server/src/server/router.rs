use server::handlers;
use server::models::structs;

use iron::prelude::*;
use logger::Logger;
use mount::Mount;
use persistent::Read;
use bodyparser;

use mongodb::{Client, ThreadedClient};

const MAX_BODY_LENGTH: usize = 1024 * 1024 * 10;

// new_local creates new router with local MongoDB client
// Params: host &str, port u16
pub fn new_local(host: &str, port: u16) -> Chain {
    let client: Client = Client::connect(host, port)
        .ok()
        .expect("Failed to initialize client.");

    get_new_router(client)
}

// new_remote creates new router with remote MongoDB client
// Params: URI string
pub fn new_remote(uri: &str) -> Chain {
    let client = Client::with_uri(uri)
        .ok()
        .expect("Failed to initialize client.");

    get_new_router(client)
}

// get_new_router creates and links router with paths and all middleware
// Params: client mongodb::Client
fn get_new_router(client: Client) -> Chain {
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

    let mut chain = Chain::new(mount);
    chain.link_before(logger_before);
    chain.link_before(Read::<bodyparser::MaxBodyLength>::one(MAX_BODY_LENGTH));
    chain.link(
        Read::<structs::DB>::both(client)
    );
    chain.link_after(logger_after);

    chain
}
