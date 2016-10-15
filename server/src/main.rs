extern crate groceries;
extern crate iron;

use groceries::server::router;
use iron::prelude::Iron;

fn main() {
    let handler = router::get_new_handler_local("localhost", 27017);

    Iron::new(handler).http("localhost:3000").unwrap();
}
