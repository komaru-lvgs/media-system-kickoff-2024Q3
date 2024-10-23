package main

import (
	"nakapro/controller"
	"nakapro/db"
	"nakapro/repository"
	"nakapro/router"
	"nakapro/usecase"
	"nakapro/validator"
)

func main() {
	db := db.NewDB()
	userValidator := validator.NewUserValidator()
	taskValidator := validator.NewTaskValidator()
	userRepository := repository.NewUserRepository(db)
	taskRepository := repository.NewTaskRepository(db)
	teamRepository := repository.NewTeamRepository(db)
	memberRepository := repository.NewMemberRepository(db)
	gameRepository := repository.NewGameRepository(db)
	playedGameRepository := repository.NewPlayedGameRepository(db)
	userUsecase := usecase.NewUserUsecase(userRepository, userValidator)
	taskUsecase := usecase.NewTaskUsecase(taskRepository, taskValidator)
	teamUsecase := usecase.NewTeamUsecase(teamRepository)
	memberUsecase := usecase.NewMemberUsecase(memberRepository)
	gameUsecase := usecase.NewGameUsecase(gameRepository)
	playedGameUsecase := usecase.NewPlayedGameUsecase(playedGameRepository)
	userController := controller.NewUserController(userUsecase)
	taskController := controller.NewTaskController(taskUsecase)
	teamController := controller.NewTeamController(teamUsecase)
	memberController := controller.NewMemberController(memberUsecase)
	gameController := controller.NewGameController(gameUsecase)
	playedGameController := controller.NewPlayedGameController(playedGameUsecase)
	e := router.NewRouter(userController, taskController, teamController, memberController, playedGameController, gameController)
	e.Logger.Fatal(e.Start(":8080"))
}
