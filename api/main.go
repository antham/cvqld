package main

import (
	"html/template"
	"io"
	"log"
	"net/http"

	"github.com/antham/cvqld/api/models"
	"github.com/labstack/echo/v4"
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
		return c.String(http.StatusForbidden, "Accès refusé pour la clé "+id)
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

	if err := c.Bind(survey); err != nil {
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
	log.Println("Start server...")

	t := &Template{
		templates: template.Must(template.ParseGlob("/templates/*.html")),
	}

	e := echo.New()
	e.Renderer = t
	e.GET("/", Index)
	e.GET("/admin/:id", Admin)
	e.GET("/api/v1/surveys", FindAllSurveys)
	e.POST("/api/v1/surveys", CreateSurvey)
	e.GET("/api/v1/surveys/count", CountSurveys)
	e.Static("/public", "public")
	e.Start(":9000")
}
