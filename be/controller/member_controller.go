package controller

import (
	"nakapro/model"
	"nakapro/usecase"
	"net/http"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

//TODO: 本当はteamのRegisterでmemberも作成したかったがBindで問題が発生認め、一旦分ける。余裕があれば修正する

type IMemberController interface {
	Register(c echo.Context) error
}

type memberController struct {
	memberUsecase usecase.IMemberUsecase
}

func NewMemberController(memberUsecase usecase.IMemberUsecase) IMemberController {
	return &memberController{memberUsecase}
}

func (memberController *memberController) Register(c echo.Context) error {
	team := c.Get("user").(*jwt.Token)
	claims := team.Claims.(jwt.MapClaims)
	teamId := claims["team_id"]

	members := []model.Member{}
	if err := c.Bind(&members); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	if err := memberController.memberUsecase.SignUp(members, uint(teamId.(float64))); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, members)
}
