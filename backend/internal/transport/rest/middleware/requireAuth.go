package middleware

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"neopixel3d.ru/internal/configs"
	"neopixel3d.ru/internal/model"
)

func RequireAuth(c *gin.Context) {
	// Получаем токен из cookie запроса
	tokenString, err := c.Cookie("Authorization")

	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	// Декодируем/проверяем токен

	// Функция Parse принимает строку токена и функцию для поиска ключа.
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Убедитесь, что алгоритм соответствует ожидаемому значению:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("SECRET")), nil
	})

	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	// Проверяем срок действия токена
	expiration, ok := claims["exp"].(float64)
	if !ok || float64(time.Now().Unix()) > expiration {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	// Находим пользователя по ID из токена
	var user model.User
	err = configs.DB.QueryRow("SELECT id FROM users WHERE id=$1", claims["sub"]).Scan(&user.ID)
	if err != nil {
		fmt.Println(err)
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	if user.ID == 0 {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	// Прикрепляем пользователя к контексту запроса
	c.Set("user", user)

	// Продолжаем выполнение следующего обработчика
	c.Next()
}
