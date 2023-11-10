package handler

import (
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"neopixel3d.ru/internal/model"
)

type EventService interface {
	GetAll(ctx *gin.Context) ([]model.Event, error)
	GetById(ctx *gin.Context, id int64) (*model.Event, error)
	CreateEvent(ctx *gin.Context, event model.Event) (model.Event, error)
	DeleteEvent(ctx *gin.Context, id int64) error
	UpdateEvent(ctx *gin.Context, id int64, event model.UpdateEvent) (*model.Event, error)
}

type EventHandler struct {
	service EventService
}

func NewEventHandler(service EventService) *EventHandler {
	return &EventHandler{
		service: service,
	}
}

func (h *EventHandler) Get(c *gin.Context) {
	events, err := h.service.GetAll(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "bad request",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"events": events,
	})
}

func (h *EventHandler) GetById(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid event ID",
		})
		return
	}

	event, err := h.service.GetById(c, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to get event",
		})
		return
	}

	if event == nil {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "Event not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"event": event,
	})
}

func (h *EventHandler) Create(c *gin.Context) {
	var event model.Event
	if err := c.ShouldBindJSON(&event); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid request body",
		})
		return
	}

	createdEvent, err := h.service.CreateEvent(c, event)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to create event",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"event": createdEvent,
	})
}

func (h *EventHandler) Delete(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid event ID",
		})
		return
	}

	err = h.service.DeleteEvent(c, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to delete event",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Event deleted successfully",
	})
}

func (h *EventHandler) Update(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid event ID",
		})
		return
	}

	var updateEvent model.UpdateEvent
	if err := c.ShouldBindJSON(&updateEvent); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid request body",
		})
		return
	}

	updatedEvent, err := h.service.UpdateEvent(c, id, updateEvent)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to update event",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"event": updatedEvent,
	})
}

func (h *EventHandler) UploadSTL(c *gin.Context) {

	err := removeAllFiles("aaaaa")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to remove existing files"})
		return
	}

	file, err := c.FormFile("stlFile")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to retrieve STL file"})
		return
	}

	filename := uuid.New().String() + filepath.Ext(file.Filename)
	filePath := filepath.Join("aaaaa", filename)

	if err := c.SaveUploadedFile(file, filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save STL file"})
		return
	}

	cmd := exec.Command("py", "calculate_volume.py", filePath)
	output, err := cmd.Output()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to calculate volume"})
		return
	}

	volume := string(output)
	volume = strings.TrimSpace(volume)

	c.JSON(http.StatusOK, gin.H{"message": volume})
}

func removeAllFiles(dirPath string) error {
	dir, err := os.Open(dirPath)
	if err != nil {
		return err
	}
	defer dir.Close()

	// Получаем список всех файлов и папок в указанной директории
	fileInfos, err := dir.Readdir(-1)
	if err != nil {
		return err
	}

	// Удаляем каждый файл
	for _, fileInfo := range fileInfos {
		filePath := filepath.Join(dirPath, fileInfo.Name())
		err := os.RemoveAll(filePath)
		if err != nil {
			return err
		}
	}

	return nil
}
