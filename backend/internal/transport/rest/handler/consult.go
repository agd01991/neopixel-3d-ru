package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"neopixel3d.ru/internal/model"
)

type ConsultService interface {
	GetAll(ctx *gin.Context) ([]model.Consult, error)
	CreateConsult(ctx *gin.Context, consult model.Consult) (model.Consult, error)
	GetConsultById(ctx *gin.Context, id int64) (model.Consult, error)
	UpdateConsultStatus(ctx *gin.Context, id int64, status string) error // Added method for updating Consult status
	// Implement other methods for Update and Delete
}

type ConsultHandler struct {
	service ConsultService
}

func NewConsultHandler(service ConsultService) *ConsultHandler {
	return &ConsultHandler{
		service: service,
	}
}

func (h *ConsultHandler) Get(c *gin.Context) {
	consults, err := h.service.GetAll(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Failed to get consults",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"consults": consults,
	})
}

func (h *ConsultHandler) Create(c *gin.Context) {
	var consult model.Consult
	if err := c.ShouldBindJSON(&consult); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid request body",
		})
		return
	}

	createdConsult, err := h.service.CreateConsult(c, consult)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to create consult",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"consult": createdConsult,
	})
}

func (h *ConsultHandler) GetById(c *gin.Context) {
	id := c.Param("id")
	consultID, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid Consult ID",
		})
		return
	}

	consult, err := h.service.GetConsultById(c, consultID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "Consult not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"consult": consult,
	})
}

func (h *ConsultHandler) UpdateStatus(c *gin.Context) {
	id := c.Param("id")
	consultID, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid consult ID",
		})
		return
	}

	var updateConsult model.UpdateConsult
	if err := c.ShouldBindJSON(&updateConsult); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid request body",
		})
		return
	}

	if err := h.service.UpdateConsultStatus(c, consultID, updateConsult.Status); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to update Consult status",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Consult status updated successfully",
	})
}

func (h *ConsultHandler) Update(c *gin.Context) {
	// Implement logic to update Consult
}

func (h *ConsultHandler) Delete(c *gin.Context) {
	// Implement logic to delete Consult
}
