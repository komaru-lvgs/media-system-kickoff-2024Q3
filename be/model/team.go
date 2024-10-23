package model

import "time"

type Team struct {
	ID         uint      `json:"id" gorm:"primaryKey"`
	Name       string    `json:"name"`
	Point      uint      `json:"point" gorm:"not null"`
	Department string    `json:"department" gorm:"default:'MEDIA_SYSTEM'"`
	IsCleared  bool      `json:"is_cleared" gorm:"default:false"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
	Members    []Member  `json:"members" gorm:"foreignKey:TeamId"`
}

type TeamResponse struct {
	ID         uint      `json:"id" gorm:"primaryKey"`
	Point      uint      `json:"point" gorm:"not null"`
	Department string    `json:"department" gorm:"default:'MEDIASYSTEM';not null"`
	IsCleared  bool      `json:"is_cleared" gorm:"default:false"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
	Members    []Member  `json:"members" gorm:"foreignKey:TeamId"`
}
