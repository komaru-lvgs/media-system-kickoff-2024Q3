package repository

import (
	"fmt"
	"nakapro/model"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type ITeamRepository interface {
	GetSortedTeams(teams *[]model.Team) error
	GetTeamById(team *model.Team, id uint) error
	CreateTeam(team *model.Team) error
	UpdateTeamPoint(team *model.Team, id uint) error
	UpdateTeamClearPoint(team *model.Team, id uint) error
}

type teamRepository struct {
	db *gorm.DB
}

func NewTeamRepository(db *gorm.DB) ITeamRepository {
	return &teamRepository{db}
}

// pointが大きい順にMemberと紐付けて全チーム取得
func (teamRepository *teamRepository) GetSortedTeams(teams *[]model.Team) error {
	if err := teamRepository.db.Preload("Members").Order("point DESC").Find(teams).Error; err != nil {
		return err
	}
	return nil
}

// 各チーム表示用teamを1件取得
func (teamRepository *teamRepository) GetTeamById(team *model.Team, id uint) error {
	if err := teamRepository.db.Preload("Members").Where("id=?", id).First(team).Error; err != nil {
		return err
	}
	return nil
}

func (teamRepository *teamRepository) CreateTeam(team *model.Team) error {
	if err := teamRepository.db.Create(team).Error; err != nil {
		return err
	}
	return nil
}

func (teamRepository *teamRepository) UpdateTeamPoint(team *model.Team, id uint) error {
	result := teamRepository.db.Model(team).Clauses(clause.Returning{}).Where("id=?", id).Update("point", team.Point)

	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected < 1 {
		return fmt.Errorf("object does not exist")
	}
	return nil
}

func (teamRepository *teamRepository) UpdateTeamClearPoint(team *model.Team, id uint) error {
	result := teamRepository.db.Model(team).Clauses(clause.Returning{}).Where("id=?", id).Updates(map[string]interface{}{"point":team.Point, "is_cleared":team.IsCleared})
	
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected < 1 {
		return fmt.Errorf("object does not exist")
	}
	return nil
}
