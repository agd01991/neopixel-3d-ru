package model

type Gallery struct {
	ID  int64  `db:"id" json:"id"`
	Src string `db:"src" json:"src"`
}
