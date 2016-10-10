package server

import (
	"fmt"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/jaredramirez/user-profile/userprofileServer/models"
)

func createJWT(user models.User) (string, error) {
	claims := models.UserClaims{
		User: models.User{
			ID:           user.ID,
			Email:        user.Email,
			PasswordHash: "",
			CreatedAt:    user.CreatedAt,
			UpdatedAt:    user.UpdatedAt,
		},
	}
	claims.ExpiresAt = time.Now().Add(time.Minute * 15).Unix()
	claims.Issuer = "golangServer"

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(secret))

	return tokenString, err
}

func parseJWT(tokenString string) (interface{}, error) {
	token, err := jwt.ParseWithClaims(tokenString, &models.UserClaims{}, keyLookupFunc)
	if err == nil {
		claims := token.Claims.(*models.UserClaims)
		fmt.Printf("Token for user %v expires %v\n", claims.User.ID, claims.StandardClaims.ExpiresAt)
		return claims.User, nil
	}
	return nil, err

}

func keyLookupFunc(token *jwt.Token) (interface{}, error) {
	if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
		return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
	}
	return []byte(secret), nil
}
