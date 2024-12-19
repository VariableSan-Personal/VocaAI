package routes

import (
	"autosummarize/graphql"
	"autosummarize/handlers"
	"autosummarize/middlewares"
	"net/http"

	"github.com/graphql-go/handler"

	"github.com/gorilla/mux"
)

type PathPrefixes struct {
	Graphql string
	V1      string
}

var pathPrefixes = PathPrefixes{
	Graphql: "/graphql",
	V1:      "/api/v1",
}

func SetupRoutes() *mux.Router {
	router := mux.NewRouter()

	setupMiddlewares(router)
	setupApiV1(router)
	setupGraphql(router)

	return router
}

func setupMiddlewares(router *mux.Router) {
	router.NotFoundHandler = middlewares.NotFoundHandler()

	router.Use(middlewares.CORSMiddleware)
	router.Use(middlewares.JSONMiddleware)
	router.Use(middlewares.ErrorHandler)
}

func setupApiV1(router *mux.Router) {
	apiV1 := router.PathPrefix(pathPrefixes.V1).Subrouter()

	apiV1.Path("").HandlerFunc(handlers.Home).Methods(http.MethodGet)
	apiV1.Path("/greetings").HandlerFunc(handlers.Greetings).Methods(http.MethodGet)
	apiV1.Path("/snippet/view/{id}").HandlerFunc(handlers.SnippetView).Methods(http.MethodGet)
	apiV1.Path("/snippet/create").HandlerFunc(handlers.SnippetCreate).Methods(http.MethodPost)

	apiV1.Path("/upload").Handler(middlewares.MultipartFormMiddleware(http.HandlerFunc(handlers.UploadHandler))).Methods(http.MethodPost)
}

func setupGraphql(router *mux.Router) {
	apiGraphql := router.PathPrefix(pathPrefixes.Graphql).Subrouter()

	h := handler.New(&handler.Config{
		Schema:   &graphql.Schema,
		Pretty:   true,
		GraphiQL: true,
	})

	apiGraphql.Path("").Handler(h)
}
