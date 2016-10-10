package server

import (
	"encoding/json"
	"net/http"

	"gopkg.in/mgo.v2/bson"
)

func handleError(err error, httpStatus int, w http.ResponseWriter) {
	json, _ := json.Marshal(bson.M{"error": bson.M{"message": err.Error()}})
	w.WriteHeader(httpStatus)
	w.Write(json)
}
