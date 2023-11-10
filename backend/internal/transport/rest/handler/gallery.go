package handler

import "context"

type GalleryService interface {
	GetAll(ctx context.Context) error
	Create(ctx context.Context) error
	GetById(ctx context.Context) error
	Update(ctx context.Context) error
	Delete(ctx context.Context) error
}

type GalleryHandler struct {
	service GalleryService
}

func NewGalleryHandler(service GalleryService) *GalleryHandler {
	return &GalleryHandler{
		service: service,
	}
}
