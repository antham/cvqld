package controllers

import (
	"github.com/revel/revel"
	"github.com/antham/askme/app/models"
	"encoding/json"
	"io/ioutil"
)

type Surveys struct {
	*revel.Controller
}

func (c Surveys) Index() revel.Result {
	surveys := []models.Survey{}

	models.FindAllSurveys(&surveys)

	return c.RenderJson(
		surveys,
	)
}

func (c Surveys) Create() revel.Result {
	survey := models.NewSurvey()
	content, err := ioutil.ReadAll(c.Request.Body)

	if err != nil {
		return c.RenderError(err)
	}

	err = json.Unmarshal(content, survey)

	if err != nil {
		return c.RenderError(err)
	}

	models.CreateSurvey(survey)

	return c.RenderJson(
		survey,
	)
}

func (c Surveys) Count() revel.Result {
	var count int

	models.CountSurveys(&count)

	return c.RenderJson(
		map[string]int{"count": count},
	)
}
