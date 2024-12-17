package main

import (
	"log"
	"net/http"
)

func home(res http.ResponseWriter, _ *http.Request)  {
  res.Write([]byte("Hello from Snippetbox"))
}

func main()  {
  port := ":4000"
  
  mux := http.NewServeMux()
  mux.HandleFunc("/", home)

  log.Print("Starting server on " + port)

  err := http.ListenAndServe(port, mux)
  log.Fatal(err)
}