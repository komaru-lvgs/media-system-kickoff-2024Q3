package model

import "time"

type Member struct {
	ID        		uint      `json:"id" gorm:"primaryKey"`
	FamilyName    string    `json:"familyName" gorm:"not null"`
	FirstName 		string    `json:"firstName" gorm:"not null"`
	CreatedAt 		time.Time `json:"created_at"`
	Team      		Team      `json:"team" gorm:"foreignKey:TeamId; constraint:OnDelete:CASCADE"`
	TeamId    		uint      `json:"team_id" gorm:"not null"`
}

type MemberResponse struct {
	ID        		uint      `json:"id" gorm:"primaryKey"`
	FamilyName    string    `json:"familyName" gorm:"not null"`
	FirstName     string    `json:"firstName" gorm:"not null"`
	CreatedAt 		time.Time `json:"created_at"`
}
