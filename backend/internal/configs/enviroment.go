package configs

import (
	"fmt"

	"github.com/joho/godotenv"
)

func LoadEnviroment() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Failed to load enviroment")
	}
}
