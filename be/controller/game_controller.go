package controller

import (
	"nakapro/usecase"
	"net/http"

	"github.com/labstack/echo/v4"
)

type IGameController interface {
	GetGameByPassword(c echo.Context) error
}

type gameController struct {
	gameUsecase usecase.IGameUsecase
}

func NewGameController(gameUsecase usecase.IGameUsecase) IGameController {
	return &gameController{gameUsecase}
}

func (gameController *gameController) GetGameByPassword(c echo.Context) error {
	password := c.QueryParam("password")
	gameRes, err := gameController.gameUsecase.GetGameByPassword(password)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, gameRes)
}
