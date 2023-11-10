package service

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"neopixel3d.ru/internal/model"
)

type EventRepository interface {
	GetAll(ctx *gin.Context) ([]model.Event, error)
	CreateEvent(ctx *gin.Context, event model.Event) (model.Event, error)
	GetById(ctx *gin.Context, id int64) (*model.Event, error)
	DeleteEvent(ctx *gin.Context, id int64) error
	UpdateEvent(ctx *gin.Context, id int64, event model.UpdateEvent) (*model.Event, error)
}

type EventService struct {
	EventRepository EventRepository
}

func NewEventService(rep EventRepository) *EventService {
	return &EventService{
		EventRepository: rep,
	}
}

func (s *EventService) GetAll(ctx *gin.Context) ([]model.Event, error) {
	events, err := s.EventRepository.GetAll(ctx)
	if err != nil {
		fmt.Println("Error in getting events from repository")
		return nil, err
	}
	return events, nil
}

func (s *EventService) CreateEvent(ctx *gin.Context, event model.Event) (model.Event, error) {
	createdEvent, err := s.EventRepository.CreateEvent(ctx, event)
	if err != nil {
		fmt.Println("Error in creating event in repository")
		return model.Event{}, err
	}
	return createdEvent, nil
}

func (s *EventService) GetById(ctx *gin.Context, id int64) (*model.Event, error) {
	event, err := s.EventRepository.GetById(ctx, id)
	if err != nil {
		fmt.Println("Error in getting event by ID from repository")
		return nil, err
	}
	return event, nil
}

func (s *EventService) DeleteEvent(ctx *gin.Context, id int64) error {
	err := s.EventRepository.DeleteEvent(ctx, id)
	if err != nil {
		fmt.Println("Error in deleting event in repository")
		return err
	}
	return nil
}

func (s *EventService) UpdateEvent(ctx *gin.Context, id int64, event model.UpdateEvent) (*model.Event, error) {
	updatedEvent, err := s.EventRepository.UpdateEvent(ctx, id, event)
	if err != nil {
		fmt.Println("Error in updating event in repository")
		return nil, err
	}
	return updatedEvent, nil
}
