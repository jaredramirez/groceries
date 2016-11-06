use std::error;
use std::fmt;
use mongodb;

#[derive(Debug)]
pub enum QueryError {
    MongoError(mongodb::Error),
    DefaultError(String),
}

impl From<mongodb::Error> for QueryError {
    fn from(err: mongodb::Error) -> QueryError {
        QueryError::MongoError(err)
    }
}

impl From<String> for QueryError {
    fn from(s: String) -> QueryError {
        QueryError::DefaultError(s)
    }
}

impl fmt::Display for QueryError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match *self {
            QueryError::MongoError(ref err) => write!(f, "Mongo error: {}", err),
            QueryError::DefaultError(ref err) => write!(f, "Error: {}", err),
        }
    }
}

impl error::Error for QueryError {
    fn description(&self) -> &str {
        match *self {
            QueryError::MongoError(ref err) => err.description(),
            QueryError::DefaultError(ref err) => err,
        }
    }

    fn cause(&self) -> Option<&error::Error> {
        match *self {
            QueryError::MongoError(ref err) => Some(err),
            QueryError::DefaultError(ref err) => None,
        }
    }
}
