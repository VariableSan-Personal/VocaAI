package main

import (
	"autosummarize/routes"
	"fmt"
	"log"
	"net/http"
)

func main() {
	port := "localhost:4000"

	mux := routes.SetupRoutes()

	message := fmt.Sprintf("starting server on %s", port)
	fmt.Println(message)

	err := http.ListenAndServe(port, mux)
	log.Fatal(err)
}
