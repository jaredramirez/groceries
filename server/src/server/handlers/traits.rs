pub trait Handle {
    type R;
    type IR;

    fn create(&self, request: &mut Self::R) -> Self::IR;

    fn read_all(&self, request: &mut Self::R) -> Self::IR;
    // pub fn read_by_id(self, request: &mut Self::R) -> Self::IR;
    // pub fn update_by_id(self, request: &mut Self::R) -> Self::IR;
    // pub fn remove_by_id(self, request: &mut Self::R) -> Self::IR;

}
