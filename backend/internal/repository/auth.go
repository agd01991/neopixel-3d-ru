package repository

import (
	"errors"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx"
	"neopixel3d.ru/internal/model"
)

type AuthRepository struct {
	DB *pgx.Conn
}

func NewAuthRepository(conn *pgx.Conn) *AuthRepository {
	return &AuthRepository{
		DB: conn,
	}
}

func (r *AuthRepository) GetUserByUsernameOrEmail(username, email string) model.User {
	var user model.User
	_ = r.DB.QueryRow("SELECT id FROM users WHERE username=$1 OR email=$2", username, email).Scan(&user.ID)
	return user
}
func (r *AuthRepository) GetUserByUsername(username string) model.User {
	var user model.User
	_ = r.DB.QueryRow("SELECT id, name, email, username, password FROM users WHERE username=$1", username).Scan(&user.ID, &user.Name, &user.Email, &user.Username, &user.Password)
	return user
}

func (r *AuthRepository) CreateNewUser(user *model.User) error {
	result, _ := r.DB.Exec("INSERT INTO users (name, email, username, password) VALUES ($1, $2, $3, $4)", user.Name, user.Email, user.Username, user.Password)
	if result.RowsAffected() == 0 {
		fmt.Println("failed to create user")
		return errors.New("failed to create user")
	}
	return nil
}

func (r *AuthRepository) ValidateUser(ctx *gin.Context) (struct{}, error) {
	return struct{}{}, nil
}
