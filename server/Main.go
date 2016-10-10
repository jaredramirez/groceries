package main

import (
	"log"
	"net/http"
	"os"

	"github.com/jaredramirez/user-profile/userprofileServer/server"
	"github.com/jaredramirez/user-profile/userprofileServer/store"
)

func main() {
	env := os.Getenv("ENV")
	if env == "dev" {
		store.SetMongoDBSession("localhost:27017", "userprofile")
	} else if env == "prod" {
		username := os.Getenv("MLAB_USERNAME")
		password := os.Getenv("MLAB_PASSWORD")
		store.SetMongoDBSession("mongodb://"+username+":"+password+"@ds021166.mlab.com:21166/userprofile", "userprofile")
	}

	router := server.NewRouter()
	err := http.ListenAndServe(":3000", router)
	log.Fatal(err)
}
