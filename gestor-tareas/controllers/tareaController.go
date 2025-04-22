package controllers

import (
	"context"
	"net/http"
	"time"

	"gestor-tareas/database"
	"gestor-tareas/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

func ObtenerTareas(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := database.TareaCollection.Find(ctx, bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudieron obtener las tareas"})
		return
	}
	defer cursor.Close(ctx)

	var tareas []models.Tarea
	for cursor.Next(ctx) {
		var tarea models.Tarea
		cursor.Decode(&tarea)
		tareas = append(tareas, tarea)
	}

	c.JSON(http.StatusOK, tareas)
}
