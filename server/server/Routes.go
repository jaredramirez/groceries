package server

import (
	"net/http"
)

// Route defines Name, Method, Path, and Handler variables for each route of the API.
type Route struct {
	Name        string
	Method      string
	Path        string
	HandlerFunc http.HandlerFunc
}

//Routes defines an array of the Route.
type Routes []Route

var userRoutes = Routes{
	Route{
		"Save",
		"POST",
		"/users",
		Save,
	},
	Route{
		"FindAll",
		"GET",
		"/users",
		FindAll,
	},
	Route{
		"FindByID",
		"GET",
		"/users/{ID}",
		FindByID,
	},
	Route{
		"DeleteByID",
		"DELETE",
		"/users/{ID}",
		DeleteByID,
	},
	Route{
		"Login",
		"POST",
		"/users/login",
		Login,
	},
}
