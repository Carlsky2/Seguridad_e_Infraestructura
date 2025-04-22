package main

import (
	"gestor-tareas/database"
	"gestorTareas/controllers"

	"github.com/gin-gonic/gin"
)

func main() {
	database.ConectarMongo()

	r := gin.Default()

	r.GET("/tareas", controllers.ObtenerTareas)

	r.Run(":8080")
}
