use server::handlers;

use router::Router;
use mount::Mount;

pub fn mount_router(mount: &mut Mount) -> &mut Mount {
    mount.mount("/api/v1/auth", get_routes())
}

fn get_routes() -> Router {
    router! {
        signup: post "/signup" => handlers::auth::singup,
        signin: post "/signin"  => handlers::auth::signin
    }
}
