package main

import (
	"autosummarize/routes"
	"log"
	"net/http"
)

func main() {
	mux := routes.SetupRoutes()

	log.Print("starting server on :4000")
	err := http.ListenAndServe("localhost:4000", mux)
	log.Fatal(err)
}
