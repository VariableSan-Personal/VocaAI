package main

import (
	"ai-vocabulary-builder/database"
	"ai-vocabulary-builder/routes"
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	// Get port from environment variable or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Use 0.0.0.0 to listen on all interfaces
	addr := fmt.Sprintf("0.0.0.0:%s", port)

	database.InitDatabase()
	mux := routes.SetupRoutes()

	message := fmt.Sprintf("Starting server on %s", addr)
	fmt.Println(message)

	server := &http.Server{
		Addr:    addr,
		Handler: mux,
	}

	log.Printf("Server is running on http://%s", addr)
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}
