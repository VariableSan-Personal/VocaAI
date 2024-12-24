package handlers

import (
	"ai-vocabulary-builder/models"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func Home(w http.ResponseWriter, r *http.Request) {
	response := models.BaseResponse{"message": "Hello from Snippetbox"}
	json.NewEncoder(w).Encode(response)
}

func Greetings(w http.ResponseWriter, r *http.Request) {
	response := models.BaseResponse{"message": "Hello from Go Service"}
	json.NewEncoder(w).Encode(response)
}

func SnippetView(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	w.WriteHeader(http.StatusOK)
	response := models.BaseResponse{"category": vars["id"]}
	json.NewEncoder(w).Encode(response)

}

func SnippetCreate(w http.ResponseWriter, r *http.Request) {
	response := models.BaseResponse{"message": "Display a form for creating a new snippet..."}
	json.NewEncoder(w).Encode(response)
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
