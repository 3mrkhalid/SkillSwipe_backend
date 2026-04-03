package main

import (
	"fmt"
	"net/http"
	"os"
	"log"

	"skillswipe/config"
	"skillswipe/routes"
	"skillswipe/utils"

	"github.com/joho/godotenv"
)

func main() {
	
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, relying on environment variables")
    }
	
	// PORT
	port := os.Getenv("PORT")
	
	// Connect MongoDB
	client := config.ConnectDB()
	collection := client.Database("").Collection("skillswipe")

	fmt.Println("Collection:", collection.Name())
	// Routes
	routeHandlers := map[string]http.HandlerFunc{
		"/": routes.Hello,
	}

	for path, handler := range routeHandlers {
		http.HandleFunc(path, utils.WithErrorHandling(utils.LoggerMiddleware(handler)))
	}

	fmt.Println("Server is running on http://localhost:"+port)
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		fmt.Println("Error starting server:", err)
	}
}