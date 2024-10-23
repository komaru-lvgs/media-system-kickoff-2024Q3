package model

import "time"

type PlayedGame struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	TeamId    uint      `json:"team_id" gorm:"not null"`
	GameId    uint      `json:"game_id" gorm:"not null"`
	CreatedAt time.Time `json:"created_at"`
}

type PlayedGameResponse struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	TeamId    uint      `json:"team_id" gorm:"not null"`
	GameId    uint      `json:"game_id" gorm:"not null"`
	CreatedAt time.Time `json:"created_at"`
}
