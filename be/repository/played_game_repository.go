package repository

import (
	"errors"
	"nakapro/model"

	"gorm.io/gorm"
)

type IPlayedGameRepository interface {
	CreatePlayedGame(playedGame *model.PlayedGame) error
	GetPlayedGame(playedGame *model.PlayedGame, teamId uint, gameId uint) error
	GetAllPlayedGames(playedGames *[]model.PlayedGame, teamId uint) error
}

type playedGameRepository struct {
	db *gorm.DB
}

func NewPlayedGameRepository(db *gorm.DB) IPlayedGameRepository {
	return &playedGameRepository{db}
}

func (playedGameRepository *playedGameRepository) CreatePlayedGame(playedGame *model.PlayedGame) error {
	if err := playedGameRepository.db.Create(playedGame).Error; err != nil {
		return err
	}
	return nil
}

func (playedGameRepository *playedGameRepository) GetPlayedGame(playedGame *model.PlayedGame, teamId uint, gameId uint) error {
	if err := playedGameRepository.db.Where("team_id=? AND game_id=?", teamId, gameId).First(playedGame).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			// 該当のplayedGameが見つからない場合はIDが0のplayedGameを作成する
			*playedGame = model.PlayedGame{ID: 0}
			return nil
		}
		return err
	}
	return nil
}

func (playedGameRepository *playedGameRepository) GetAllPlayedGames(playedGames *[]model.PlayedGame, teamId uint) error {
	if err := playedGameRepository.db.Where("team_id=?", teamId).Find(playedGames).Error; err != nil {
		return err
	}
	return nil
}
