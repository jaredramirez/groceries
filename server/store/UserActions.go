package store

import (
	"github.com/jaredramirez/user-profile/userprofileServer/models"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// IsValidUser determines if the user is valid, and if so return a sessionId for the client
// to use to show the request is authentic.
func IsValidUser(user models.User, collection *mgo.Collection) (bool, models.User, error) {
	var retrived models.User
	var isValid = true
	retrived, err := ReadUserByAuth(user.Email, user.PasswordHash, collection)
	if err != nil {
		isValid = false
	}
	return isValid, retrived, err
}

// SaveUser either creates or updates an object, depending on whether the object already exists in the collection.
func SaveUser(user models.User, collection *mgo.Collection) (bson.ObjectId, error) {
	if user.ID.Valid() {
		user.UpdatedAt = bson.Now()
	} else {
		user.ID = bson.NewObjectId()
		user.CreatedAt = bson.Now()
		user.UpdatedAt = bson.Now()
	}
	_, err := collection.UpsertId(user.ID, user)
	return user.ID, err
}

// ReadAllUser returns all documents in the collection.
func ReadAllUser(collection *mgo.Collection) (retrieved []models.User, err error) {
	err = collection.Find(bson.M{}).All(&retrieved)
	return retrieved, err
}

// ReadUserByID reads a documents based on the ID from the collection.
func ReadUserByID(ID bson.ObjectId, collection *mgo.Collection) (retrieved models.User, err error) {
	err = collection.Find(bson.M{"_id": ID}).Limit(1).One(&retrieved)
	return retrieved, err
}

// ReadUserByAuth reads a documents based on the email and password from the collection.
func ReadUserByAuth(email string, passwordHash string, collection *mgo.Collection) (retrieved models.User, err error) {
	err = collection.Find(bson.M{"email": email, "passwordHash": passwordHash}).Limit(1).One(&retrieved)
	return retrieved, err
}

// DeleteUserByID deletes a documents based on the ID from the collection.
func DeleteUserByID(ID bson.ObjectId, collection *mgo.Collection) error {
	err := collection.Remove(bson.M{"_id": ID})
	return err
}
