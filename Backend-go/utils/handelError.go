package utils

import (
    "net/http"
	"log"
)

func WithErrorHandling(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				http.Error(w, "Internal Server Error", http.StatusInternalServerError)
				log.Println("Recovered from panic:", err)
			}
		}()
		handler(w, r)
	}
}