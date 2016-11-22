use server::handlers::user::UserHandler;
use server::controllers::traits::Controller;
use server::controllers::user::UserController;

use iron::prelude::*;
use mount::Mount;
use mongodb::Client;

pub fn mount_router(mount: &mut Mount, client: Client) -> &mut Mount {
    let handler = UserHandler::new();
    let controller = UserController::new(client);

    let router = router! {
        userCreate:      post    ""         => move |r: &mut Request| handler.create(r, &controller),
        userReadAll:     get     ""         => move |r: &mut Request| handler.read_all(r, &controller)
        // ,
        // userReadById:    get     "/:userId" => user::read_by_id,
        // userUpdateById:  put     "/:userId" => user::update_by_id,
        // userRemoveById:  delete  "/:userId" => user::remove_by_id,
    };

    mount.mount("/api/v1/users", router)
}
