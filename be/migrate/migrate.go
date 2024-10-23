package main

import (
	"fmt"
	"nakapro/db"
	"nakapro/model"
)

func main() {
	dbConn := db.NewDB()
	defer fmt.Println("Successfully Migrated")
	defer db.CloseDB(dbConn)
	dbConn.AutoMigrate(&model.User{}, &model.Task{}, &model.Game{}, &model.Member{}, &model.PlayedGame{}, &model.Team{})
}
