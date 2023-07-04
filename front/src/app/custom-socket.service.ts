import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
//Observable (PROGRAMACION REACTIVA)
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomSocketService {

  constructor(private socket: Socket) { }

  //Se importa desde rxjs para crear un objeto observador que emite los datos recibidos a medida que llegan
  public getPrices$(): Observable<any> {
    return new Observable(observer => {
      try {

        // connect, disconnect, error, conect_error SON EVENTOS NATIVOS DE LOS SOCKETS

        // Se ejecuta cuando la conexión de socket se establece correctamente
        this.socket.on('connect', () => {
          console.log('Conectado!');
        })

        //Se ejecuta cuando llega un nuevo dato del servidor
        this.socket.on('push', (data) => {
          console.log('Llegaron las datos');
          console.log(data)
          //Se utiliza para enviar los datos recibidos al observador
          observer.next(data)

        })

        //Se ejecuta cuando se pierde la conexión de socket.
        this.socket.on('disconnect', () => {
          //Aqui indicamos que el observer se completo para evitar la fuga de memoria
          observer.complete()
        })

        //Se ejecuta cuando se produce un error de conexión
        this.socket.on('error', (e) => {
          //Para notificar el error
          observer.error(e)
        })

        //Se ejecuta cuando se produce un error de conexión
        this.socket.on('connect_error', (e) => {
          observer.error(e)
        })

      } catch (e) {
        observer.error(e);
      }
    })
  }
}
