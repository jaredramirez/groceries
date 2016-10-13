#![feature(proc_macro)]

extern crate iron;
extern crate router;
extern crate persistent;
extern crate bodyparser;
extern crate serde;
#[macro_use]
extern crate serde_derive;
extern crate serde_json;
extern crate chrono;
extern crate rustc_serialize;

#[macro_use(bson, doc)]
extern crate bson;
extern crate mongodb;

pub mod server;
