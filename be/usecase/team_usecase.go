package usecase

import (
	"nakapro/model"
	"nakapro/repository"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type ITeamUsecase interface {
	SignUp(team model.Team) (model.TeamResponse, error)
	Login(id uint) (string, error)
	GetTeamById(id uint) (model.TeamResponse, error)
	GetSortedTeams() ([]model.TeamResponse, error)
	UpdateTeamPoint(team model.Team, id uint) (model.TeamResponse, error)
	UpdateTeamClearPoint(team model.Team, id uint) (model.TeamResponse, error)
}

type teamUsecase struct {
	teamRepository repository.ITeamRepository
}

func NewTeamUsecase(teamRepository repository.ITeamRepository) ITeamUsecase {
	return &teamUsecase{teamRepository}
}

func (teamUsecase *teamUsecase) SignUp(team model.Team) (model.TeamResponse, error) {
	newTeam := model.Team{Department: team.Department, Point: 0}
	if err := teamUsecase.teamRepository.CreateTeam(&newTeam); err != nil {
		return model.TeamResponse{}, err
	}
	responseTeam := model.TeamResponse{
		ID:         newTeam.ID,
		Department: newTeam.Department,
		Point:      newTeam.Point,
	}
	return responseTeam, nil
}

func (teamUsecase *teamUsecase) Login(id uint) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"team_id": id,
		"exp":     time.Now().Add(time.Hour * 12).Unix(),
	})
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

// ランキング表示用に全件ソート後Team取得
func (teamUsecase *teamUsecase) GetSortedTeams() ([]model.TeamResponse, error) {
	newTeams := []model.Team{}

	if err := teamUsecase.teamRepository.GetSortedTeams(&newTeams); err != nil {
		return nil, err
	}

	responseTeams := []model.TeamResponse{}
	for _, v := range newTeams {
		teams := model.TeamResponse{
			ID:         v.ID,
			Department: v.Department,
			Point:      v.Point,
			Members:    v.Members,
		}
		responseTeams = append(responseTeams, teams)
	}
	return responseTeams, nil
}

// Team名表示用に取得
func (teamUsecase *teamUsecase) GetTeamById(id uint) (model.TeamResponse, error) {
	newTeam := model.Team{}
	if err := teamUsecase.teamRepository.GetTeamById(&newTeam, id); err != nil {
		return model.TeamResponse{}, err
	}
	responseTeam := model.TeamResponse{
		ID:         newTeam.ID,
		Department: newTeam.Department,
		Point:      newTeam.Point,
		Members:    newTeam.Members,
		IsCleared:  newTeam.IsCleared,
	}
	return responseTeam, nil
}

// ポイントの更新
func (teamUsecase *teamUsecase) UpdateTeamPoint(team model.Team, id uint) (model.TeamResponse, error) {
	if err := teamUsecase.teamRepository.UpdateTeamPoint(&team, id); err != nil {
		return model.TeamResponse{}, err
	}

	responseTeam := model.TeamResponse{
		ID:         team.ID,
		Department: team.Department,
		Point:      team.Point,
	}
	return responseTeam, nil
}

func (teamUsecase *teamUsecase) UpdateTeamClearPoint(team model.Team, id uint) (model.TeamResponse, error) {
	if err := teamUsecase.teamRepository.UpdateTeamClearPoint(&team, id); err != nil {
		return model.TeamResponse{}, err
	}

	responseTeam := model.TeamResponse{
		ID:         team.ID,
		Department: team.Department,
		Point:      team.Point,
	}
	return responseTeam, nil
}
