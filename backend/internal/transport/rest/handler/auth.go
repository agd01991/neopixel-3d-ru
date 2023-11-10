package handler

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"neopixel3d.ru/internal/model"
)

type AuthService interface {
	Register(c *gin.Context) error
	Login(c *gin.Context) string
}

type AuthHandler struct {
	service AuthService
}

func NewAuthHandler(service AuthService) *AuthHandler {
	return &AuthHandler{
		service: service,
	}
}

func (h *AuthHandler) Register(c *gin.Context) {
	err := h.service.Register(c)
	fmt.Println(err)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Произошла ошибка при регистрации пользователя",
		})
		return
	}
	// Respond
	c.JSON(http.StatusCreated, gin.H{
		"message": "success created user",
	})
}

func (h *AuthHandler) Login(c *gin.Context) {
	tokenString := h.service.Login(c)

	// Respond
	c.JSON(http.StatusOK, gin.H{
		"token": tokenString,
	})
}

func (h *AuthHandler) Logout(c *gin.Context) {
	c.SetCookie("Authorization", "", -1, "", "", false, true)
	c.Set("user", &model.User{})

	// Respond
	c.JSON(http.StatusOK, gin.H{
		"message": "success unauthorized",
	})
}

func (h *AuthHandler) Validate(c *gin.Context) {
	user, _ := c.Get("user")

	// Respond
	c.JSON(http.StatusOK, gin.H{
		"user": user,
	})
}
