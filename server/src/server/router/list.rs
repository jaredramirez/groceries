use server::handlers;

use router::Router;
use mount::Mount;

pub fn mount_router(mount: &mut Mount) -> &mut Mount {
    mount.mount("/api/v1/lists", get_routes())
}

fn get_routes() -> Router {
    router! {
        listReadAll:     get     ""         => handlers::list::read_all,
        listCreate:      post    ""         => handlers::list::create,
        listReadById:    get     "/:listId" => handlers::list::read_by_id,
        listUpdateById:  put     "/:listId" => handlers::list::update_by_id,
        listRemoveById:  delete  "/:listId" => handlers::list::remove_by_id
    }
}
