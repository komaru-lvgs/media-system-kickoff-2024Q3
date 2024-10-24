package controller

import (
	"nakapro/model"
	"nakapro/usecase"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

type ITeamController interface {
	Register(c echo.Context) error
	CsrfToken(c echo.Context) error
	GetTeam(c echo.Context) error
	GetSortedTeams(c echo.Context) error
	UpdateTeamPoint(c echo.Context) error
}

type teamController struct {
	teamUsecase usecase.ITeamUsecase
}

func NewTeamController(teamUsecase usecase.ITeamUsecase) ITeamController {
	return &teamController{teamUsecase}
}

func (teamController *teamController) Register(c echo.Context) error {
	//Teamを作成する
	team := model.Team{}
	if err := c.Bind(&team); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	teamResponse, err := teamController.teamUsecase.SignUp(team)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	//ログインを実行する
	tokenString, err := teamController.teamUsecase.Login(teamResponse.ID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	cookie := new(http.Cookie)
	cookie.Name = "token"
	cookie.Value = tokenString
	cookie.Expires = time.Now().Add(24 * time.Hour)
	cookie.Path = "/"
	cookie.Domain = os.Getenv("API_DOMAIN")
	cookie.Secure = true
	cookie.HttpOnly = true
	cookie.SameSite = http.SameSiteNoneMode
	c.SetCookie(cookie)

	return c.JSON(http.StatusCreated, teamResponse)
}

// 1件取得する
func (teamController *teamController) GetTeam(c echo.Context) error {
	team := c.Get("user").(*jwt.Token)
	claims := team.Claims.(jwt.MapClaims)
	teamId := claims["team_id"]

	teamResponse, err := teamController.teamUsecase.GetTeamById(uint(teamId.(float64)))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, teamResponse)
}

// ランキング用に全件取得する
func (teamController *teamController) GetSortedTeams(c echo.Context) error {

	teamsResponse, err := teamController.teamUsecase.GetSortedTeams()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, teamsResponse)
}

// ポイント加算
func (teamController *teamController) UpdateTeamPoint(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	teamId := claims["team_id"]

	team := model.Team{}
	if err := c.Bind(&team); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	currentTeam, err := teamController.teamUsecase.GetTeamById(uint(teamId.(float64)))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	team.Point += currentTeam.Point
	taskRes, err := teamController.teamUsecase.UpdateTeamPoint(team, uint(teamId.(float64)))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, taskRes)
}

func (teamController *teamController) CsrfToken(c echo.Context) error {
	token := c.Get("csrf").(string)
	return c.JSON(http.StatusOK, echo.Map{
		"csrf_token": token,
	})
}
