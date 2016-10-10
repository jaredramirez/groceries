package server

import "github.com/gorilla/mux"

// NewRouter creates a router from the gorilla/mux, based off the userRoutes array.
func NewRouter() *mux.Router {
	router := mux.NewRouter().StrictSlash(true)
	for _, route := range userRoutes {
		handler := Logger(VerifyJWT(route.HandlerFunc, route.Name), route.Name)
		router.
			Methods(route.Method).
			Path(route.Path).
			Name(route.Name).
			Handler(handler)
	}
	return router
}
