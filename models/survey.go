package models

import (
	"github.com/satori/go.uuid"
)

type Survey struct {
	ID      string `json:"id" gorm:"type:uuid;primary_key"`
	Name    string `json:"name" gorm:"varchar(255);not null"`
	Age     int    `json:"age" gorm:"not null"`
	Answer1 string `json:"answer1" gorm:"not null"`
	Answer2 string `json:"answer2" gorm:"not null"`
	Answer3 string `json:"answer3" gorm:"not null"`
	Answer4 string `json:"answer4" gorm:"not null"`
	Answer5 string `json:"answer5" gorm:"not null"`
	Answer6 string `json:"answer6" gorm:"not null"`
	Answer7 string `json:"answer7" gorm:"not null"`
}

func NewSurvey() *Survey {
	return &Survey{
		ID: uuid.NewV4().String(),
	}
}

func FindAllSurveys(surveys *[]Survey) {
	db.Order("surveys.created_at desc", true).Find(surveys)
}

func CreateSurvey(survey *Survey) {
	db.Create(survey)
}

func CountSurveys(total *int) {
	db.Model(Survey{}).Count(total)
}
