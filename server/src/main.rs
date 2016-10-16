extern crate groceries;
extern crate iron;

use groceries::server::router;
use iron::prelude::Iron;

fn main() {
    let router = router::new_local("localhost", 27017);
    
    Iron::new(router).http("localhost:3000").unwrap();
}
