package models

import "gorm.io/gorm"

type ErrorResponse struct {
	Message string `json:"message"`
}

type BaseResponse map[string]interface{}

type User struct {
	gorm.Model
	Name  string
	Email string
}
