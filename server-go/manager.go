package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var (
	websocketUpgrader = websocket.Upgrader{
		ReadBufferSize: 1024,
		WriteBufferSize: 1024,
	}
)

type Manager struct {

}

func NewManager() *Manager{
	return &Manager{}
}

func (m *Manager) serveWS(w http.ResponseWriter, r *http.Request) {
	log.Println("new connection")
	websocketUpgrader.CheckOrigin = func(r *http.Request) bool { return true }
	conn, err := websocketUpgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print(err)
		return
	}

	conn.Close()
}