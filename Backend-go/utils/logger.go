package utils

import (
	"log"
	"net/http"
	"os"
	"time"
)

// LoggerMiddleware logs requests only in development
func LoggerMiddleware(handler http.HandlerFunc) http.HandlerFunc {
	env := os.Getenv("NODE_ENV") // read environment variable

	return func(w http.ResponseWriter, r *http.Request) {
		if env == "development" {
			start := time.Now()

			// Wrapper to capture status code
			lrw := &loggingResponseWriter{w, http.StatusOK}
			handler(lrw, r)

			duration := time.Since(start)
			log.Printf("%s %s %d %s", r.Method, r.URL.Path, lrw.statusCode, duration)
		} else {
			// Production: just call handler normally
			handler(w, r)
		}
	}
}

type loggingResponseWriter struct {
	http.ResponseWriter
	statusCode int
}

func (lrw *loggingResponseWriter) WriteHeader(code int) {
	lrw.statusCode = code
	lrw.ResponseWriter.WriteHeader(code)
	lrw.statusCode = code
}