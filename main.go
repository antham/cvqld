package main

import (
	"net/http"
	"io/ioutil"
	"io"
	"encoding/json"
	"html/template"

    "github.com/labstack/echo"
	"github.com/labstack/echo/engine/standard"
	"github.com/antham/askme/models"
)

type Template struct {
    templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
    return t.templates.ExecuteTemplate(w, name, data)
}

func Index(c echo.Context) error {
	return c.Render(http.StatusOK, "index", map[string]string{})
}

func Admin(c echo.Context) error {
	key := &models.Key{}
	id := c.Param("id")

	models.FindKey(key, id)

	if key.ID == "" {
		return c.String(http.StatusForbidden, "Accès refusé pour la clé " + id)
	}

	return c.Render(http.StatusOK, "admin", map[string]string{})
}

func FindAllSurveys(c echo.Context) error {
	surveys := []models.Survey{}

	models.FindAllSurveys(&surveys)

	return c.JSON(200, surveys)
}

func CreateSurvey(c echo.Context) error {
	survey := models.NewSurvey()
	content, err := ioutil.ReadAll(c.Request().Body())

	if err != nil {
		return c.JSON(400, err)
	}

	err = json.Unmarshal(content, survey)

	if err != nil {
		return c.JSON(400, err)
	}

	models.CreateSurvey(survey)

	return c.JSON(200, survey)
}

func CountSurveys(c echo.Context) error {
	var count int

	models.CountSurveys(&count)

	return c.JSON(200, map[string]int{"count": count})
}


func main() {
	t := &Template{
		templates: template.Must(template.ParseGlob("templates/*.html")),
	}

	e := echo.New()
	e.SetRenderer(t)
	e.Get("/", Index)
	e.Get("/admin/:id", Admin)
	e.Get("/api/v1/surveys", FindAllSurveys)
	e.Post("/api/v1/surveys", CreateSurvey)
	e.Get("/api/v1/surveys/count", CountSurveys)
	e.Static("/public", "public")
	e.Run(standard.New(":9000"))
}
