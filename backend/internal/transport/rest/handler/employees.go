package handler

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"neopixel3d.ru/internal/model"
)

type EmployeesService interface {
	Register(c *gin.Context) error
	Login(c *gin.Context) string
	GetRole(username, password string) string
	GetAll() ([]model.Employees, error) // Added GetAll function
}

type EmployeesHandler struct {
	service EmployeesService
}

func NewEmployeesHandler(service EmployeesService) *EmployeesHandler {
	return &EmployeesHandler{
		service: service,
	}
}

func (h *EmployeesHandler) Register(c *gin.Context) {
	err := h.service.Register(c)
	fmt.Println(err)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "An error occurred while registering the employee",
		})
		return
	}
	// Respond
	c.JSON(http.StatusCreated, gin.H{
		"message": "Successfully created employee",
	})
}

func (h *EmployeesHandler) Login(c *gin.Context) {
	tokenString := h.service.Login(c)

	// Respond
	c.JSON(http.StatusOK, gin.H{
		"token": tokenString,
	})
}

func (h *EmployeesHandler) Logout(c *gin.Context) {
	c.SetCookie("Authorization", "", -1, "", "", false, true)
	c.Set("employee", &model.Employees{})

	// Respond
	c.JSON(http.StatusOK, gin.H{
		"message": "Successfully logged out",
	})
}

func (h *EmployeesHandler) Validate(c *gin.Context) {
	employee, _ := c.Get("employee")

	// Respond
	c.JSON(http.StatusOK, gin.H{
		"employee": employee,
	})
}

func (h *EmployeesHandler) GetRole(c *gin.Context) {
	var EmployeesInputLogin model.EmployeesInputLogin
	if c.Bind(&EmployeesInputLogin) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read request",
		})
		return
	}

	role := h.service.GetRole(EmployeesInputLogin.Username, EmployeesInputLogin.Password)
	if role == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid username or password",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"role": role,
	})
}

func (h *EmployeesHandler) GetAll(c *gin.Context) {
	employees, err := h.service.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to get employees",
		})
		return
	}

	c.JSON(http.StatusOK, employees)
}
