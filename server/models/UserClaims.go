package models

import (
	"github.com/dgrijalva/jwt-go"
)

// UserClaims defined the model to hold user and jwt.StandardClaims for each application user.
type UserClaims struct {
	User User `json:"user"`
	jwt.StandardClaims
}
