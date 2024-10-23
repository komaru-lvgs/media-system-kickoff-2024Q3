package controller

import (
	"nakapro/model"
	"nakapro/usecase"
	"net/http"
	"strconv"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

type IPlayedGameController interface {
	CreatePlayedGame(c echo.Context) error
	CheckIsPlayedGame(c echo.Context) error
	GetAllPlayedGames(c echo.Context) error
}

type playedGameController struct {
	playedGameUsecase usecase.IPlayedGameUsecase
}

func NewPlayedGameController(playedGameUsecase usecase.IPlayedGameUsecase) IPlayedGameController {
	return &playedGameController{playedGameUsecase}
}

func (playedGameController *playedGameController) CreatePlayedGame(c echo.Context) error {
	team := c.Get("user").(*jwt.Token)
	claims := team.Claims.(jwt.MapClaims)
	teamId := claims["team_id"]
	id := c.Param("gameId")
	gameId, _ := strconv.Atoi(id)

	playedGame := model.PlayedGame{}
	if err := c.Bind(&playedGame); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	playedGame.TeamId = uint(teamId.(float64))
	playedGame.GameId = uint(gameId)
	if err := playedGameController.playedGameUsecase.CreatePlayedGame(playedGame); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, playedGame)
}

func (playedGameController *playedGameController) CheckIsPlayedGame(c echo.Context) error {
	team := c.Get("user").(*jwt.Token)
	claims := team.Claims.(jwt.MapClaims)
	teamId := claims["team_id"]
	gameIdString := c.QueryParam("gameId")
	gameId, _ := strconv.Atoi(gameIdString)

	gameRes, err := playedGameController.playedGameUsecase.GetPlayedGame(uint(teamId.(float64)), uint(gameId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	if gameRes.ID == 0 {
		return c.JSON(http.StatusCreated, false)
	}
	return c.JSON(http.StatusCreated, true)

}

func (playedGameController *playedGameController) GetAllPlayedGames(c echo.Context) error {
	team := c.Get("user").(*jwt.Token)
	claims := team.Claims.(jwt.MapClaims)
	teamId := claims["team_id"]

	gameRes, err := playedGameController.playedGameUsecase.GetAllPlayedGames(uint(teamId.(float64)))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, gameRes)

}