package models

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"log"
	"os"
)

var db *gorm.DB

func init() {
	var err error

	db, err = gorm.Open("postgres", "user="+os.Getenv("DBUSER")+" dbname="+os.Getenv("DBNAME")+" host=postgres sslmode=disable")

	if err != nil {
		log.Fatal(err)
	}

	db.AutoMigrate(&Survey{})
	db.AutoMigrate(&Key{})
}
