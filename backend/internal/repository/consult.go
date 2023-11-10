package repository

import (
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx"
	"neopixel3d.ru/internal/model"
)

type ConsultRepository struct {
	DB *pgx.Conn
}

func NewConsultRepository(conn *pgx.Conn) *ConsultRepository {
	return &ConsultRepository{
		DB: conn,
	}
}

func (r *ConsultRepository) GetAll(ctx *gin.Context) ([]model.Consult, error) {
	rows, err := r.DB.Query("SELECT id, email, name, tel, date, status FROM consults")
	if err != nil {
		fmt.Println("error in repository level")
		return nil, err
	}
	defer rows.Close()

	var consults []model.Consult
	for rows.Next() {
		var consult model.Consult
		err := rows.Scan(&consult.ID, &consult.Email, &consult.Name, &consult.Tel, &consult.Date, &consult.Status)
		if err != nil {
			fmt.Println("Failed to get row in parsing")
			return nil, err
		}
		consults = append(consults, consult)
	}

	return consults, nil
}

func (r *ConsultRepository) CreateConsult(ctx *gin.Context, consult model.Consult) (model.Consult, error) {
	currentTime := time.Now().Format("2006-01-02 15:04:05")
	defaultStatus := "ожидание"

	_, err := r.DB.Exec("INSERT INTO consults (email, name, tel, date, status) VALUES ($1, $2, $3, $4, $5)",
		consult.Email, consult.Name, consult.Tel, currentTime, defaultStatus)
	if err != nil {
		fmt.Println("Failed to create consult in repository")
		return model.Consult{}, err
	}

	consult.Date = currentTime
	consult.Status = defaultStatus
	return consult, nil
}

func (r *ConsultRepository) GetConsultById(ctx *gin.Context, id int64) (model.Consult, error) {
	row := r.DB.QueryRow("SELECT id, email, name, tel, date, status FROM consults WHERE id = $1", id)

	var consult model.Consult
	err := row.Scan(&consult.ID, &consult.Email, &consult.Name, &consult.Tel, &consult.Date, &consult.Status)
	if err != nil {
		if err == pgx.ErrNoRows {
			return model.Consult{}, fmt.Errorf("consult not found")
		}
		fmt.Println("Failed to get consult by ID in repository")
		return model.Consult{}, err
	}

	return consult, nil
}

func (r *ConsultRepository) UpdateConsultStatus(ctx *gin.Context, id int64, status string) error {
	_, err := r.DB.Exec("UPDATE consults SET status = $1 WHERE id = $2", status, id)
	if err != nil {
		fmt.Println("Failed to update consult status in repository")
		return err
	}
	return nil
}
