package main

import (
	"autosummarize/database"
	"autosummarize/routes"
	"fmt"
	"log"
	"net/http"
)

func main() {
	port := "localhost:4000"

	database.InitDatabase()
	mux := routes.SetupRoutes()

	message := fmt.Sprintf("starting server on %s", port)
	fmt.Println(message)

	err := http.ListenAndServe(port, mux)
	log.Fatal(err)
}
