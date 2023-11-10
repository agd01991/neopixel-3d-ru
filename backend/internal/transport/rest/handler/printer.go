package handler

import "context"

type PrinterService interface {
	GetAll(ctx context.Context) error
	Create(ctx context.Context) error
	GetById(ctx context.Context) error
	Update(ctx context.Context) error
	Delete(ctx context.Context) error
}

type PrinterHandler struct {
	service PrinterService
}

func NewPrinterHandler(service PrinterService) *PrinterHandler {
	return &PrinterHandler{
		service: service,
	}
}
