package middleware

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

var secretKey = os.Getenv("JWT_ACCESS_SECRET") 

func verifyJWT(next http.HandlerFunc) http.HandlerFunc {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        authHeader := r.Header.Get("Authorization")
        if authHeader == "" {
            http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
            return
        }

        tokenString := strings.Split(authHeader, " ")[1] // Bearer <token>

        token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
            
            if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
                return nil, fmt.Errorf("Unexpected signing method")
            }
            return secretKey, nil
        })

        if err != nil || !token.Valid {
            http.Error(w, "Invalid token", http.StatusUnauthorized)
            return
        }

        
        next.ServeHTTP(w, r)
    })
}