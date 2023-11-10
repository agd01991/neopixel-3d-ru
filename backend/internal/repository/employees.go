package repository

import (
	"errors"
	"fmt"

	"github.com/jackc/pgx"
	"neopixel3d.ru/internal/model"
)

type EmployeesRepository struct {
	DB *pgx.Conn
}

func NewEmployeesRepository(conn *pgx.Conn) *EmployeesRepository {
	return &EmployeesRepository{
		DB: conn,
	}
}

func (r *EmployeesRepository) GetEmployeeByUsernameOrEmail(username, email string) model.Employees {
	var employee model.Employees
	_ = r.DB.QueryRow("SELECT id FROM employees WHERE username=$1 OR email=$2", username, email).Scan(&employee.ID)
	return employee
}

func (r *EmployeesRepository) GetEmployeeByUsername(username string) model.Employees {
	var employee model.Employees
	_ = r.DB.QueryRow("SELECT id, name, email, username, password, role FROM employees WHERE username=$1", username).Scan(&employee.ID, &employee.Name, &employee.Email, &employee.Username, &employee.Password, &employee.Role)
	return employee
}

func (r *EmployeesRepository) CreateNewEmployee(employee *model.Employees) error {
	result, _ := r.DB.Exec("INSERT INTO employees (name, email, username, password, role) VALUES ($1, $2, $3, $4, $5)", employee.Name, employee.Email, employee.Username, employee.Password, employee.Role)
	if result.RowsAffected() == 0 {
		fmt.Println("failed to create employee")
		return errors.New("failed to create employee")
	}
	return nil
}

func (r *EmployeesRepository) ValidateEmployee() (struct{}, error) {
	return struct{}{}, nil
}

func (r *EmployeesRepository) GetAllEmployees() ([]model.Employees, error) {
	rows, err := r.DB.Query("SELECT id, name, email, username, password, role FROM employees")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	employees := []model.Employees{}
	for rows.Next() {
		var employee model.Employees
		err := rows.Scan(&employee.ID, &employee.Name, &employee.Email, &employee.Username, &employee.Password, &employee.Role)
		if err != nil {
			return nil, err
		}
		employees = append(employees, employee)
	}

	return employees, nil
}
