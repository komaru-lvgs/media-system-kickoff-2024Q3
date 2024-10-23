package main

import (
	"fmt"
	"nakapro/db"
	"nakapro/model"
)

func main() {
	dbConn := db.NewDB()

	// 既存のデータを削除
	dbConn.Exec("DELETE FROM games")

	// 初期データの作成
	games := []model.Game{
		{InitialPoint: 0, Url: "/twister", Password: "0.1ミリも怒られたくない", ImagePath: "images/puzzle1.png", Address: 1},
		{InitialPoint: 0, Url: "/mistakes", Password: "できる。大丈夫できる。", ImagePath: "images/puzzle2.png", Address: 2},
		{InitialPoint: 0, Url: "/flash-newgraduate", Password: "何でもやります無茶振り上等TeamOK", ImagePath: "images/puzzle3.png", Address: 3},
		{InitialPoint: 0, Url: "/face-swap", Password: "こまるまんど！一生ルマンド！", ImagePath: "images/puzzle4.png", Address: 4},
		{InitialPoint: 0, Url: "/nervous-breakdown", Password: "占いで配属を決断したみさきち", ImagePath: "images/puzzle5.png", Address: 5},
		{InitialPoint: 0, Url: "/rhythm", Password: "第二の男幸多郎", ImagePath: "images/puzzle6.png", Address: 6},
		{InitialPoint: 0, Url: "/wherefrom", Password: "デスクの引き出しハーブティーだらけこじこじ", ImagePath: "images/puzzle7.png", Address: 7},
		{InitialPoint: 0, Url: "/whack-a-mole", Password: "24卒入社おめでとう", ImagePath: "images/puzzle8.png", Address: 8},
		{InitialPoint: 0, Url: "/line-connection", Password: "栄養価を無視した料理を作るあいぴょん", ImagePath: "images/puzzle9.png", Address: 9},
	}

	// データベースに挿入
	for _, game := range games {
		dbConn.Create(&game)
	}

	fmt.Println("Seed data inserted successfully")
}
