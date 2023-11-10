package service

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"neopixel3d.ru/internal/model"
)

type ConsultRepository interface {
	GetAll(ctx *gin.Context) ([]model.Consult, error)
	CreateConsult(ctx *gin.Context, consult model.Consult) (model.Consult, error)
	GetConsultById(ctx *gin.Context, id int64) (model.Consult, error)
	UpdateConsultStatus(ctx *gin.Context, id int64, status string) error
}

type ConsultService struct {
	ConsultRepository ConsultRepository
}

func NewConsultService(rep ConsultRepository) *ConsultService {
	return &ConsultService{
		ConsultRepository: rep,
	}
}

func (s *ConsultService) GetAll(ctx *gin.Context) ([]model.Consult, error) {
	consults, err := s.ConsultRepository.GetAll(ctx)
	if err != nil {
		fmt.Println("error in getting Consults from repository")
		return nil, err
	}
	return consults, nil
}

func (s *ConsultService) CreateConsult(ctx *gin.Context, consult model.Consult) (model.Consult, error) {
	createdConsult, err := s.ConsultRepository.CreateConsult(ctx, consult)
	if err != nil {
		fmt.Println("error in creating Consult in repository")
		return model.Consult{}, err
	}
	return createdConsult, nil
}

func (s *ConsultService) GetConsultById(ctx *gin.Context, id int64) (model.Consult, error) {
	consult, err := s.ConsultRepository.GetConsultById(ctx, id)
	if err != nil {
		fmt.Println("error in getting Consult by ID from repository")
		return model.Consult{}, err
	}
	return consult, nil
}

func (s *ConsultService) UpdateConsultStatus(ctx *gin.Context, id int64, status string) error {
	err := s.ConsultRepository.UpdateConsultStatus(ctx, id, status)
	if err != nil {
		fmt.Println("error in updating Consult status in repository")
		return err
	}
	return nil
}
