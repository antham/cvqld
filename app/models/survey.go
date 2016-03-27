package models

import (
	"github.com/satori/go.uuid"
)

type Survey struct {
	ID string `json:"id" gorm:"type:uuid"`
	Name string `json:"name" gorm:"varchar(255)"`
	Age int `json:"age"`
	Answer1 string `json:"answer1"`
	Answer2 string `json:"answer2"`
	Answer3 string `json:"answer3"`
	Answer4 string `json:"answer4"`
	Answer5 string `json:"answer5"`
	Answer6 string `json:"answer6"`
	Answer7 string `json:"answer7"`
}

func NewSurvey() *Survey {
	return &Survey{
		ID: uuid.NewV4().String(),
	}
}

func FindAllSurveys(surveys *[]Survey) {
	db.Find(surveys)
}

func CreateSurvey(survey *Survey) {
	db.Create(survey)
}
