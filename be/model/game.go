package model

import "time"

type Game struct {
	ID        		uint      `json:"id" gorm:"primaryKey"`
	InitialPoint  uint    	`json:"initialPoint" gorm:"not null"`
	Url 					string    `json:"url" gorm:"not null;unique"`
	Password			string    `json:"password" gorm:"not null;unique"`
	ImagePath			string    `json:"imagePath" gorm:"not null;unique"`
	Address			  uint 			`json:"address" gorm:"not null;unique"`
	CreatedAt 		time.Time `json:"created_at"`
}

type GameResponse struct {
	ID        		uint      `json:"id" gorm:"primaryKey"`
	InitialPoint  uint    	`json:"initialPoint" gorm:"not null"`
	Url 					string    `json:"url" gorm:"not null;unique"`
	Password			string    `json:"password" gorm:"not null;unique"`
	ImagePath			string    `json:"imagePath" gorm:"not null;unique"`
	Address			  uint 			`json:"address" gorm:"not null;unique"`
	CreatedAt 		time.Time `json:"created_at"`
}
