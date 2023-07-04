import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebSocketComponent } from './web-socket/web-socket.component';

const routes: Routes = [
  {
    path: '',
    component: WebSocketComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
