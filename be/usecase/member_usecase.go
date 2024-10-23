package usecase

import (
	"nakapro/model"
	"nakapro/repository"
)

type IMemberUsecase interface {
	SignUp(members []model.Member, teamId uint) error
}

type memberUsecase struct {
	memberRepository repository.IMemberRepository
}

func NewMemberUsecase(memberRepository repository.IMemberRepository) IMemberUsecase {
	return &memberUsecase{memberRepository}
}

func (memberUsecase *memberUsecase) SignUp(members []model.Member, teamId uint) error {
	newMembers := make([]model.Member, len(members))
	for i, m := range members {
		newMembers[i] = model.Member{
			FamilyName: m.FamilyName,
			FirstName:  m.FirstName,
			TeamId:     teamId,
		}
	}

	if err := memberUsecase.memberRepository.CreateMembers(&newMembers); err != nil {
		return err
	}
	return nil
}
