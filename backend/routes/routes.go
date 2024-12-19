package routes

import (
	"autosummarize/handlers"
	"autosummarize/middlewares"
	"net/http"

	"github.com/gorilla/mux"
)

func SetupRoutes() *mux.Router {
	router := mux.NewRouter()

	router.NotFoundHandler = middlewares.NotFoundHandler()

	router.Use(middlewares.CORSMiddleware)
	router.Use(middlewares.JSONMiddleware)
	router.Use(middlewares.ErrorHandler)

	apiV1 := router.PathPrefix("/api/v1").Subrouter()

	apiV1.Path("").HandlerFunc(handlers.Home).Methods(http.MethodGet)
	apiV1.Path("/greetings").HandlerFunc(handlers.Greetings).Methods(http.MethodGet)
	apiV1.Path("/snippet/view/{id}").HandlerFunc(handlers.SnippetView).Methods(http.MethodGet)
	apiV1.Path("/snippet/create").HandlerFunc(handlers.SnippetCreate).Methods(http.MethodPost)

	apiV1.Path("/upload").Handler(middlewares.MultipartFormMiddleware(http.HandlerFunc(handlers.UploadHandler))).Methods(http.MethodPost)

	return router
}
