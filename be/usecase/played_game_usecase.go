package usecase

import (
	"nakapro/model"
	"nakapro/repository"
)

type IPlayedGameUsecase interface {
	CreatePlayedGame(playedGame model.PlayedGame) error
	GetPlayedGame(teamId uint, gameId uint) (model.PlayedGameResponse, error)
	GetAllPlayedGames(teamId uint) ([]model.PlayedGameResponse, error)
}

type playedGameUsecase struct {
	playedGameRepository repository.IPlayedGameRepository
}

func NewPlayedGameUsecase(playedGameRepository repository.IPlayedGameRepository) IPlayedGameUsecase {
	return &playedGameUsecase{playedGameRepository}
}

func (playedGameUsecase *playedGameUsecase) CreatePlayedGame(playedGame model.PlayedGame) error {
	newPlayedGame := model.PlayedGame{GameId: playedGame.GameId, TeamId: playedGame.TeamId}
	if err := playedGameUsecase.playedGameRepository.CreatePlayedGame(&newPlayedGame); err != nil {
		return err
	}
	return nil
}

func (playedGameUsecase *playedGameUsecase) GetPlayedGame(teamId uint, gameId uint) (model.PlayedGameResponse, error) {
	playedGame := model.PlayedGame{}
	if err := playedGameUsecase.playedGameRepository.GetPlayedGame(&playedGame, teamId, gameId); err != nil {
		return model.PlayedGameResponse{}, err
	}

	responsePlayedGame := model.PlayedGameResponse{
		ID: playedGame.ID,
	}
	return responsePlayedGame, nil
}

func (playedGameUsecase *playedGameUsecase) GetAllPlayedGames(teamId uint) ([]model.PlayedGameResponse, error) {
	playedGames := []model.PlayedGame{}
	if err := playedGameUsecase.playedGameRepository.GetAllPlayedGames(&playedGames, teamId); err != nil {
		return []model.PlayedGameResponse{}, err
	}

	responsePlayedGames := []model.PlayedGameResponse{}
	for _, v := range playedGames {
		t := model.PlayedGameResponse{
			GameId: v.GameId,
		}
		responsePlayedGames = append(responsePlayedGames, t)
	}
	return responsePlayedGames, nil
}
