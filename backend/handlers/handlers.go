package handlers

import (
	"autosummarize/models"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func Home(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Server", "Go")
	w.Write([]byte("Hello from Snippetbox"))
}

func Greetings(w http.ResponseWriter, r *http.Request) {
	response := models.BaseResponse{"message": "Hello from Go Service"}
	json.NewEncoder(w).Encode(response)
}

func SnippetView(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Category: %v\n", vars["id"])
}

func SnippetCreate(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Display a form for creating a new snippet..."))
}

func UploadHandler(w http.ResponseWriter, r *http.Request) {
	err := r.ParseMultipartForm(10 << 20)
	if err != nil {
		http.Error(w, "Unable to parse form", http.StatusBadRequest)
		return
	}

	file, handler, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Error retrieving the file", http.StatusBadRequest)
		return
	}
	defer file.Close()

	response := models.BaseResponse{
		"message": fmt.Sprintf("Uploaded File: %s, File Size: %d", handler.Filename, handler.Size),
	}

	json.NewEncoder(w).Encode(response)
}
