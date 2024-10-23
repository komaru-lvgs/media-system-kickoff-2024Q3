package usecase

import (
	"nakapro/model"
	"nakapro/repository"
)

type IGameUsecase interface {
	GetGameByPassword(password string) (model.GameResponse, error)
}

type gameUsecase struct {
	gameRepository repository.IGameRepository
}

func NewGameUsecase(gameRepository repository.IGameRepository) IGameUsecase {
	return &gameUsecase{gameRepository}
}

func (gameUsecase *gameUsecase) GetGameByPassword(password string) (model.GameResponse, error) {
	game := model.Game{}
	if err := gameUsecase.gameRepository.GetGameByPassword(&game, password); err != nil {
		return model.GameResponse{}, err
	}

	responseGame := model.GameResponse{
		ID:           game.ID,
		InitialPoint: game.InitialPoint,
		Url:          game.Url,
		ImagePath:    game.ImagePath,
		Address:      game.Address,
	}
	return responseGame, nil
}
