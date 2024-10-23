package repository

import (
	"nakapro/model"

	"gorm.io/gorm"
)

type IMemberRepository interface {
	CreateMembers(member *[]model.Member) error
}

type memberRepository struct {
	db *gorm.DB
}

func NewMemberRepository(db *gorm.DB) IMemberRepository {
	return &memberRepository{db}
}

func (memberRepository *memberRepository) CreateMembers(members *[]model.Member) error {
	if err := memberRepository.db.Create(members).Error; err != nil {
		return err
	}
	return nil
}
