use server::models::traits::ToDoc;
use mongodb::Client;

pub trait Controller {
    type O;
    type E;

    fn new(client: Client) -> Self;

    fn create(self, object: Self::O) -> Result< (), Self::E > where Self::O: ToDoc;

    fn read_all(self) -> Result< Vec<Self::O>, Self::E >;
    //
    // fn read_by_id(self, id: String) -> Result< Self::O, Self::E > where Self::O: ToDoc;
    //
    // fn update_by_id(self, id: String, object: Self::O) -> Result< (), Self::E > where Self::O: ToDoc;
    //
    // fn delete_by_id(self, id: String) -> Result< (), Self::E >;
}
