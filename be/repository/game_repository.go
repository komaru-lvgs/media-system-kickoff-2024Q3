package repository

import (
	"nakapro/model"

	"gorm.io/gorm"
)

type IGameRepository interface {
	GetGameByPassword(game *model.Game, password string) error
}

type gameRepository struct {
	db *gorm.DB
}

func NewGameRepository(db *gorm.DB) IGameRepository {
	return &gameRepository{db}
}

func (gameRepository *gameRepository) GetGameByPassword(game *model.Game, password string) error {
	if err := gameRepository.db.Where("password=?", password).First(game).Error; err != nil {
		return err
	}
	return nil
}
