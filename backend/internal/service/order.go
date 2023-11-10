package service

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"neopixel3d.ru/internal/model"
)

type OrderRepository interface {
	GetAll(ctx *gin.Context) ([]model.Order, error)
	CreateOrder(ctx *gin.Context, order model.Order) (model.Order, error)
	GetOrderById(ctx *gin.Context, id int64) (model.Order, error)
	UpdateOrderStatus(ctx *gin.Context, id int64, status string) error
}

type OrderService struct {
	OrderRepository OrderRepository
}

func NewOrderService(rep OrderRepository) *OrderService {
	return &OrderService{
		OrderRepository: rep,
	}
}

func (s *OrderService) GetAll(ctx *gin.Context) ([]model.Order, error) {
	orders, err := s.OrderRepository.GetAll(ctx)
	if err != nil {
		fmt.Println("error in getting orders from repository")
		return nil, err
	}
	return orders, nil
}

func (s *OrderService) CreateOrder(ctx *gin.Context, order model.Order) (model.Order, error) {
	createdOrder, err := s.OrderRepository.CreateOrder(ctx, order)
	if err != nil {
		fmt.Println("error in creating order in repository")
		return model.Order{}, err
	}
	return createdOrder, nil
}

func (s *OrderService) GetOrderById(ctx *gin.Context, id int64) (model.Order, error) {
	order, err := s.OrderRepository.GetOrderById(ctx, id)
	if err != nil {
		fmt.Println("error in getting order by ID from repository")
		return model.Order{}, err
	}
	return order, nil
}

func (s *OrderService) UpdateOrderStatus(ctx *gin.Context, id int64, status string) error {
	err := s.OrderRepository.UpdateOrderStatus(ctx, id, status)
	if err != nil {
		fmt.Println("error in updating order status in repository")
		return err
	}
	return nil
}
