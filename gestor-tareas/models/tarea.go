package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Tarea struct {
	ID            primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Titulo        string             `bson:"titulo" json:"titulo"`
	Completada    bool               `bson:"completada" json:"completada"`
	FechaCreacion primitive.DateTime `bson:"fecha_creacion" json:"fecha_creacion"`
}
