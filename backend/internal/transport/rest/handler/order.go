package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"neopixel3d.ru/internal/model"
)

type OrderService interface {
	GetAll(ctx *gin.Context) ([]model.Order, error)
	CreateOrder(ctx *gin.Context, order model.Order) (model.Order, error)
	GetOrderById(ctx *gin.Context, id int64) (model.Order, error)
	UpdateOrderStatus(ctx *gin.Context, id int64, status string) error // Added method for updating order status
	// Implement other methods for Update and Delete
}

type OrderHandler struct {
	service OrderService
}

func NewOrderHandler(service OrderService) *OrderHandler {
	return &OrderHandler{
		service: service,
	}
}

func (h *OrderHandler) Get(c *gin.Context) {
	orders, err := h.service.GetAll(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Failed to get orders",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"orders": orders,
	})
}

func (h *OrderHandler) Create(c *gin.Context) {
	var order model.Order
	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid request body",
		})
		return
	}

	createdOrder, err := h.service.CreateOrder(c, order)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to create order",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"order": createdOrder,
	})
}

func (h *OrderHandler) GetById(c *gin.Context) {
	id := c.Param("id")
	orderID, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid order ID",
		})
		return
	}

	order, err := h.service.GetOrderById(c, orderID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "Order not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"order": order,
	})
}

func (h *OrderHandler) UpdateStatus(c *gin.Context) {
	id := c.Param("id")
	orderID, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid order ID",
		})
		return
	}

	var updateOrder model.UpdateOrder
	if err := c.ShouldBindJSON(&updateOrder); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid request body",
		})
		return
	}

	if err := h.service.UpdateOrderStatus(c, orderID, updateOrder.Status); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to update order status",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Order status updated successfully",
	})
}

func (h *OrderHandler) Update(c *gin.Context) {
	// Implement logic to update order
}

func (h *OrderHandler) Delete(c *gin.Context) {
	// Implement logic to delete order
}
