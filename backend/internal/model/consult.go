package model

type Consult struct {
	ID     int64  `db:"id" json:"id"`
	Email  string `db:"email" json:"email"`
	Name   string `db:"name" json:"name"`
	Tel    string `db:"tel" json:"tel"`
	Date   string `db:"date" json:"date"`
	Status string `db:"status" json:"status"`
}
type CreateConsult struct {
	ID     int64  `json:"id"`
	Email  string `json:"email"`
	Name   string `json:"name"`
	Tel    string `json:"tel"`
	Date   string `json:"date"`
	Status string `json:"status"`
}
type UpdateConsult struct {
	Status string `json:"status"`
}
type DeleteConsul struct {
}
