package config


import (
	"context"
	"fmt"
	"time"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectDB () *mongo.Client {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	uri := os.Getenv("MONGO_URI")

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil{
		panic(err)
	}
	
	if err := client.Ping(ctx, nil); err != nil {
		panic(err)
	}

	fmt.Println("MongoDB connect")
	return client
}