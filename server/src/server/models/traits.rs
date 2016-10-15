use bson::ordered::OrderedDocument;

pub trait ToDoc {
    fn to_doc_without_id(&self) -> OrderedDocument;
    fn to_doc(&self) -> OrderedDocument;
}
