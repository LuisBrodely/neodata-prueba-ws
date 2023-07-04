import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-web-socket',
  template: `
    <h2>Estado de la conexion: {{ connectionStatus }}</h2>
  `,
})
export class WebSocketComponent implements OnInit {
  private socket!: WebSocket;
  public connectionStatus: string = '';

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.socket = new WebSocket('ws://localhost:8080/ws');

    this.socket.onopen = () => {
      this.connectionStatus = 'Conectado';
      this.changeDetectorRef.detectChanges();
      console.log('Conectado');
    };

    this.socket.onmessage = (event) => {
      console.log('Mensaje:', event.data);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

}
