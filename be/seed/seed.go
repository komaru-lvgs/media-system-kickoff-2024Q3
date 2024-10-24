package main

import (
	"fmt"
	"nakapro/db"
	"nakapro/model"
)

func main() {
	dbConn := db.NewDB()

	// 初期データの作成
	games := []model.Game{
		{InitialPoint: 70, Url: "/twister", Password: "ツイスター", ImagePath: "images/puzzle1.png", Address: 1},
		{InitialPoint: 0, Url: "/mistakes", Password: "間違え探し", ImagePath: "images/puzzle2.png", Address: 2},
		{InitialPoint: 0, Url: "/flash-shinsotu", Password: "新卒フラッシュ", ImagePath: "images/puzzle3.png", Address: 3},
		{InitialPoint: 0, Url: "/face-swap", Password: "顔入れ替え", ImagePath: "images/puzzle4.png", Address: 4},
		{InitialPoint: 0, Url: "/nervous-breakdown", Password: "神経衰弱", ImagePath: "images/puzzle5.png", Address: 5},
		{InitialPoint: 0, Url: "/rhythm", Password: "リズムゲーム", ImagePath: "images/puzzle6.png", Address: 6},
		{InitialPoint: 0, Url: "/wherefrom", Password: "出身地クイズ", ImagePath: "images/puzzle7.png", Address: 7},
		{InitialPoint: 0, Url: "/mogura", Password: "新卒叩き", ImagePath: "images/puzzle8.png", Address: 8},
		{InitialPoint: 0, Url: "/tyokusen", Password: "直線繋ぎ", ImagePath: "images/puzzle9.png", Address: 9},
	}

	// データベースに挿入
	for _, game := range games {
		dbConn.Create(&game)
	}

	fmt.Println("Seed data inserted successfully")
}
