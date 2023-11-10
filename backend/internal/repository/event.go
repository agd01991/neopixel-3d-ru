package repository

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx"
	"neopixel3d.ru/internal/model"
)

type EventRepository struct {
	DB *pgx.Conn
}

func NewEventRepository(conn *pgx.Conn) *EventRepository {
	return &EventRepository{
		DB: conn,
	}
}

func (r *EventRepository) GetAll(ctx *gin.Context) ([]model.Event, error) {
	rows, err := r.DB.Query("SELECT id, name, description, date, img FROM events")
	if err != nil {
		fmt.Println("error in repository level")
		return nil, err
	}
	defer rows.Close()

	var events []model.Event
	for rows.Next() {
		var event model.Event
		err := rows.Scan(&event.ID, &event.Title, &event.Description, &event.Date, &event.Img)
		if err != nil {
			fmt.Println("Failed to get row in parsing")
			return nil, err
		}
		events = append(events, event)
	}

	return events, nil
}

func (r *EventRepository) CreateEvent(ctx *gin.Context, event model.Event) (model.Event, error) {
	_, err := r.DB.Exec("INSERT INTO events (name, description, date, img) VALUES ($1, $2, $3, $4)",
		event.Title, event.Description, event.Date, event.Img)
	if err != nil {
		fmt.Println("Failed to create Event in repository")
		return model.Event{}, err
	}

	return event, nil
}

func (r *EventRepository) GetById(ctx *gin.Context, id int64) (*model.Event, error) {
	row := r.DB.QueryRow("SELECT id, name, description, date, img FROM events WHERE id = $1", id)
	event := &model.Event{}
	err := row.Scan(&event.ID, &event.Title, &event.Description, &event.Date, &event.Img)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, nil // Запись с указанным идентификатором не найдена
		}
		fmt.Println("Failed to get event by ID from repository")
		return nil, err
	}
	return event, nil
}

func (r *EventRepository) UpdateEvent(ctx *gin.Context, id int64, event model.UpdateEvent) (*model.Event, error) {
	_, err := r.DB.Exec("UPDATE events SET name = $1, description = $2, date = $3, img = $4 WHERE id = $5",
		event.Title, event.Description, event.Date, event.Img, id)
	if err != nil {
		fmt.Println("Failed to update event in repository")
		return nil, err
	}

	updatedEvent, err := r.GetById(ctx, id) // Получите обновленное мероприятие с помощью метода GetById
	if err != nil {
		fmt.Println("Failed to get updated event from repository")
		return nil, err
	}

	return updatedEvent, nil
}

func (r *EventRepository) DeleteEvent(ctx *gin.Context, id int64) error {
	_, err := r.DB.Exec("DELETE FROM events WHERE id = $1", id)
	if err != nil {
		fmt.Println("Failed to delete event from repository")
		return err
	}
	return nil
}
