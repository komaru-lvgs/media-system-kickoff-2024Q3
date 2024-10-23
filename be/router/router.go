package router

import (
	"nakapro/controller"
	"net/http"
	"os"

	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func NewRouter(
	uc controller.IUserController,
	tc controller.ITaskController,
	teamController controller.ITeamController,
	memberController controller.IMemberController,
	playedGameController controller.IPlayedGameController,
	gameController controller.IGameController,
) *echo.Echo {
	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{os.Getenv("FE_URL"), os.Getenv("FE_URL")},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept,
			echo.HeaderAccessControlAllowHeaders, echo.HeaderXCSRFToken},
		AllowMethods:     []string{"GET", "PUT", "POST", "DELETE"},
		AllowCredentials: true,
	}))
	e.Use(middleware.CSRFWithConfig(middleware.CSRFConfig{
		CookiePath:     "/",
		CookieDomain:   os.Getenv("API_DOMAIN"),
		CookieHTTPOnly: true,
		CookieSameSite: http.SameSiteNoneMode,
		//[WHY]: postman動作確認用のためコメントアウト
		// CookieSameSite: http.SameSiteDefaultMode,
	}))
	e.POST("/signup", uc.SignUp)
	e.POST("/login", uc.LogIn)
	e.POST("/logout", uc.LogOut)
	e.GET("/csrf", uc.CsrfToken)
	t := e.Group("/tasks")
	t.Use(echojwt.WithConfig(echojwt.Config{
		SigningKey:  []byte(os.Getenv("SECRET")),
		TokenLookup: "cookie:token",
	}))
	t.GET("", tc.GetAllTasks)
	t.GET("/:taskId", tc.GetTaskById)
	t.POST("", tc.CreateTask)
	t.PUT("/:taskId", tc.UpdateTask)
	t.DELETE("/:taskId", tc.DeleteTask)
	//登録mutation用
	register := e.Group("/register")
	register.Use(echojwt.WithConfig(echojwt.Config{
		SigningKey:  []byte(os.Getenv("SECRET")),
		TokenLookup: "cookie:token",
	}))
	e.POST("/register/team", teamController.Register)
	register.POST("/member", memberController.Register)
	register.GET("/team", teamController.GetTeam)
	e.GET("/teams", teamController.GetSortedTeams)
	register.PUT("/point", teamController.UpdateTeamPoint)
	register.PUT("/clear", teamController.UpdateTeamClearPoint)
	register.POST("/played-game/:gameId", playedGameController.CreatePlayedGame)
	e.GET("/game", gameController.GetGameByPassword)
	register.GET("/check", playedGameController.CheckIsPlayedGame)
	register.GET("/played-games", playedGameController.GetAllPlayedGames)
	return e
}
