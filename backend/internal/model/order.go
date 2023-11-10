package model

type Order struct {
	ID          int64  `db:"id" json:"id"`
	Email       string `db:"email" json:"email"`
	Name        string `db:"name" json:"name"`
	Tel         string `db:"tel" json:"tel"`
	PrinterName string `db:"printername" json:"printername"`
	Description string `db:"desc" json:"description"`
	Date        string `db:"date" json:"date"`
	Status      string `db:"status" json:"status"`
}
type CreateOrder struct {
	ID          int64  `json:"id"`
	Email       string `json:"email"`
	Name        string `json:"name"`
	Tel         string `json:"tel"`
	PrinterName string `json:"printername"`
	Description string `json:"description"`
	Date        string `json:"date"`
	Status      string `json:"status"`
}
type UpdateOrder struct {
	Status string `json:"status"`
}
type DeleteOrder struct {
}
