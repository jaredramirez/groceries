use iron::prelude::*;
use iron::status;
use router::Router;

pub fn get_new_response(status_code: status::Status, data: Option<String>) -> IronResult<Response> {
    if let Some(content) = data {
        let mut payload: String = "{ \"payload\": ".to_string();
        payload.push_str(&content);
        payload.push_str("}");

        return Ok(Response::with((status_code, payload)))
    }

    Ok(Response::with((status_code)))
}

pub fn get_property_from_query(req: &mut Request, property: &str) -> String {
    req.extensions.get::<Router>().unwrap().find(property).unwrap_or("/").to_string()
}
