pub trait Constructor {
    type C;

    fn new(controller: Self::C) -> Self;
}
