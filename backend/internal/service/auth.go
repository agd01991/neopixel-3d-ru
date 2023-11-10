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

type AuthRepository interface {
	GetUserByUsernameOrEmail(string, string) model.User
	GetUserByUsername(string) model.User
	CreateNewUser(*model.User) error
}

type AuthService struct {
	AuthRepository AuthRepository
}

func NewAuthService(rep AuthRepository) *AuthService {
	return &AuthService{
		AuthRepository: rep,
	}
}

func (s *AuthService) Register(c *gin.Context) error {
	// Get name,username,password off req body
	var UserInputRegister model.UserInputRegister
	if c.Bind(&UserInputRegister) != nil {
		return errors.New("Failed to read request")
	}

	// Hash the password
	hash, err := bcrypt.GenerateFromPassword([]byte(UserInputRegister.Password), 10)
	if err != nil {
		return errors.New("Failed to hash password")
	}

	// Validate the user
	user := s.AuthRepository.GetUserByUsernameOrEmail(UserInputRegister.Username, UserInputRegister.Email)
	if user.ID != 0 {
		return errors.New("User with this username or email already exist")
	}

	// Create the user
	user = model.User{Name: UserInputRegister.Name, Email: UserInputRegister.Email, Username: UserInputRegister.Username, Password: string(hash)}
	err = s.AuthRepository.CreateNewUser(&user)
	if err != nil {
		return err
	}

	return nil
}

func (s *AuthService) Login(c *gin.Context) string {
	// Get the email and pass off request body
	var UserInputLogin model.UserInputLogin
	if c.Bind(&UserInputLogin) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read request",
		})
	}

	// Look up requested user
	user := s.AuthRepository.GetUserByUsername(UserInputLogin.Username)
	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid username or password",
		})
		return ""
	}

	// Compare sent in pass with saved user pass hash
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(UserInputLogin.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid username or password",
		})
		return ""
	}

	// Generate a jwt token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid to create token",
		})
		// return ""
	}

	// Respond it back
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "", "", false, true)

	return tokenString
}
