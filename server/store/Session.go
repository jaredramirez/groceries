package store

import "gopkg.in/mgo.v2"

var store *Store

// SetMongoDBSession sets the current a *mgo.Session object.
func SetMongoDBSession(url string, databaseName string) {
	session, err := mgo.Dial(url)
	if err != nil {
		panic(err)
	}
	store = &Store{
		session,
		databaseName,
	}
}

// GetSession returns a copy of *mgo.Session object with no Database set.
func GetSession() *mgo.Session {
	return store.Session.Copy()
}

// GetDatabase returns a copy of store's *mgo.Session object using the database passed in to SetMongoDBSession().
func GetDatabase() *mgo.Database {
	session := store.Session.Copy()
	return session.DB(store.DatabaseName)
}
