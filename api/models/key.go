package models

type Key struct {
	ID string `json:"id" gorm:"type:uuid;primary_key"`
}

func FindKey(key *Key, id string) {
	db.Find(key, "id = ?", id)
}
