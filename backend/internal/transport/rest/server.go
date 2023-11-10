package rest

import (
	"context"
	"fmt"
	"net/http"
	"time"
)

const (
	readTimeout, writeTimeout = 10 * time.Second, 10 * time.Second
	maxHeaderMegabytes        = 1
)

type Server struct {
	http *http.Server
}

func NewServer(port string, handler http.Handler) *Server {
	return &Server{
		http: &http.Server{
			Addr:           fmt.Sprintf(":%s", port),
			Handler:        handler,
			ReadTimeout:    readTimeout,
			WriteTimeout:   writeTimeout,
			MaxHeaderBytes: maxHeaderMegabytes,
		},
	}
}

func (s *Server) ListenAndServe() error {
	return s.http.ListenAndServe()
}

func (s *Server) Stop(ctx context.Context) error {
	return s.http.Shutdown(ctx)
}
