package service

import (
	"errors"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
	"neopixel3d.ru/internal/model"
)

type EmployeesRepository interface {
	GetEmployeeByUsernameOrEmail(string, string) model.Employees
	GetEmployeeByUsername(string) model.Employees
	CreateNewEmployee(*model.Employees) error
	GetAllEmployees() ([]model.Employees, error)
}

type EmployeesService struct {
	EmployeesRepository EmployeesRepository
}

func NewEmployeesService(rep EmployeesRepository) *EmployeesService {
	return &EmployeesService{
		EmployeesRepository: rep,
	}
}

func (s *EmployeesService) Register(c *gin.Context) error {
	var EmployeesInputRegister model.EmployeesInputRegister
	if c.Bind(&EmployeesInputRegister) != nil {
		return errors.New("Failed to read request")
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(EmployeesInputRegister.Password), 10)
	if err != nil {
		return errors.New("Failed to hash password")
	}

	employee := s.EmployeesRepository.GetEmployeeByUsernameOrEmail(EmployeesInputRegister.Username, EmployeesInputRegister.Email)
	if employee.ID != 0 {
		return errors.New("Employee with this username or email already exists")
	}

	employee = model.Employees{Name: EmployeesInputRegister.Name, Email: EmployeesInputRegister.Email, Username: EmployeesInputRegister.Username, Password: string(hash), Role: EmployeesInputRegister.Role}
	err = s.EmployeesRepository.CreateNewEmployee(&employee)
	if err != nil {
		return err
	}

	return nil
}

func (s *EmployeesService) Login(c *gin.Context) string {
	var EmployeesInputLogin model.EmployeesInputLogin
	if c.Bind(&EmployeesInputLogin) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read request",
		})
	}

	employee := s.EmployeesRepository.GetEmployeeByUsername(EmployeesInputLogin.Username)
	if employee.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid username or password",
		})
		return ""
	}

	err := bcrypt.CompareHashAndPassword([]byte(employee.Password), []byte(EmployeesInputLogin.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid username or password",
		})
		return ""
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": employee.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create token",
		})
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "", "", false, true)

	return tokenString
}

func (s *EmployeesService) GetRole(username, password string) string {
	employee := s.EmployeesRepository.GetEmployeeByUsername(username)
	if employee.ID == 0 {
		return ""
	}

	err := bcrypt.CompareHashAndPassword([]byte(employee.Password), []byte(password))
	if err != nil {
		return ""
	}

	return employee.Role
}

func (s *EmployeesService) GetAll() ([]model.Employees, error) {
	return s.EmployeesRepository.GetAllEmployees()
}
