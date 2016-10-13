use bson::ordered::OrderedDocument;

pub trait ToDoc {
    fn to_doc(&self) -> OrderedDocument;
}
