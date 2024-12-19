package models

type ErrorResponse struct {
	Message string `json:"message"`
}

type BaseResponse map[string]interface{}
