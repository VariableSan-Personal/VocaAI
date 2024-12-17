package routes

import (
	"autosummarize/handlers"
	"net/http"
)

func SetupRoutes() *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /", handlers.Home)
	mux.HandleFunc("GET /snippet/view", handlers.SnippetView)
	mux.HandleFunc("GET /snippet/create", handlers.SnippetCreate)

	return mux
}
