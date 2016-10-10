package server

import (
	"encoding/json"
	"net/http"

	"github.com/jaredramirez/user-profile/userprofileServer/models"
	"github.com/jaredramirez/user-profile/userprofileServer/store"

	"github.com/gorilla/mux"

	"gopkg.in/mgo.v2/bson"
)

// Login determines if password is valid, and returns a session key for the client.
func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		handleError(err, http.StatusUnprocessableEntity, w)
		return
	}

	isValid, user, _ := store.IsValidUser(user, store.GetDatabase().C("user"))

	if isValid {
		token, e := createJWT(user)
		if e != nil {
			handleError(e, http.StatusInternalServerError, w)
			return
		}

		json, _ := json.Marshal(bson.M{"token": token})
		w.Write(json)
	} else {
		json, _ := json.Marshal(bson.M{"error": bson.M{"message": "Invalid User."}})
		w.Write(json)
	}
}

// Save will save an existing user, or create a new one.
// Save will save an existing user, or create a new one.
func Save(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")

	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		handleError(err, http.StatusUnprocessableEntity, w)
		return
	}

	ID, err := store.SaveUser(user, store.GetDatabase().C("user"))
	if err != nil {
		json, _ := json.Marshal(bson.M{"error": err.Error()})
		w.WriteHeader(http.StatusConflict)
		w.Write(json)
		return
	}

	if ID == user.ID {
		w.WriteHeader(http.StatusNoContent)
	} else {
		w.WriteHeader(http.StatusCreated)
		json, _ := json.Marshal(bson.M{"ID": ID})
		w.Write(json)
	}
}

// FindAll locates all users.
func FindAll(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")

	retrievedUsers, err := store.ReadAllUser(store.GetDatabase().C("user"))
	if err != nil {
		handleError(err, http.StatusConflict, w)
		return
	}

	json, _ := json.Marshal(retrievedUsers)
	w.WriteHeader(http.StatusFound)
	w.Write(json)
}

// FindByID locates a user based on the ID passed in from the path.
func FindByID(w http.ResponseWriter, r *http.Request) {
	ID := bson.ObjectIdHex(mux.Vars(r)["ID"])

	retrievedUser, err := store.ReadUserByID(ID, store.GetDatabase().C("user"))
	if err != nil {
		handleError(err, http.StatusUnprocessableEntity, w)
		return
	}

	json, _ := json.Marshal(retrievedUser)
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusFound)
	w.Write(json)
}

// DeleteByID delets a user based on the ID passed in from the path.
func DeleteByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	ID := bson.ObjectIdHex(mux.Vars(r)["ID"])

	err := store.DeleteUserByID(ID, store.GetDatabase().C("user"))
	if err != nil {
		handleError(err, http.StatusNotModified, w)
		return
	}

	w.WriteHeader(http.StatusOK)
}
