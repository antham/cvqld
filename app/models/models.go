package models

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"log"
)

var db *gorm.DB

func init() {
	var err error

	db, err = gorm.Open("postgres", "user=postgres dbname=postgres sslmode=disable")

	if err != nil {
		log.Fatal(err)
	}

	db.AutoMigrate(&Survey{})
}
