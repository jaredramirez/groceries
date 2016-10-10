package store

import mgo "gopkg.in/mgo.v2"

// Store is a struct to hold a reference to the mgo session.
type Store struct {
	Session      *mgo.Session
	DatabaseName string
}
