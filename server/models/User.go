package models

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

// User defined the model to hold id, username and password for each application user.
type User struct {
	ID           bson.ObjectId `json:"id,omitempty" bson:"_id,omitempty"`
	Email        string        `json:"email" bson:"email"`
	PasswordHash string        `json:"passwordHash" bson:"passwordHash"`
	CreatedAt    time.Time     `json:"createdAt" bson:"createdAt"`
	UpdatedAt    time.Time     `json:"updatedAt" bson:"updatedAt"`
}
