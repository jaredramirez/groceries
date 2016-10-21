use server::handlers;

use router::Router;
use mount::Mount;

pub fn mount_router(mount: &mut Mount) -> &mut Mount {
    mount.mount("/api/v1/users", get_routes())
}

fn get_routes() -> Router {
    router! {
        userReadAll:     get     ""         => handlers::user::read_all,
        userCreate:      post    ""         => handlers::user::create,
        userReadById:    get     "/:userId" => handlers::user::read_by_id,
        userUpdateById:  put     "/:userId" => handlers::user::update_by_id,
        userRemoveById:  delete  "/:userId" => handlers::user::remove_by_id,
    }
}
