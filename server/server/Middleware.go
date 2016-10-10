package server

import (
	"errors"
	"log"
	"net/http"
	"time"
)

//Logger is a middleware that logs information about each request
func Logger(inner http.Handler, name string) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		inner.ServeHTTP(w, r)

		log.Printf(
			"%s\t%s\t%s\t%s",
			r.Method,
			r.RequestURI,
			name,
			time.Since(start),
		)
	})
}

//VerifyJWT verifies that the JWT on each request is valid before continueing the request before continuing
func VerifyJWT(inner http.Handler, name string) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if name != "Login" && name != "FindAll" {
			if r.Header["Authorization"] == nil {
				handleError(errors.New("Authorization Header not set."), http.StatusNotAcceptable, w)
				return
			}
			_, err := parseJWT(r.Header["Authorization"][0])
			if err != nil {
				handleError(err, http.StatusUnauthorized, w)
				return
			}
		}

		inner.ServeHTTP(w, r)
	})
}
