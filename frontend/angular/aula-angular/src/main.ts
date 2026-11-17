import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})

export class App {
  valor = 0;

  viaDOM() {
    document.getElementById('num')!.innerHTML='999';
  }

  viaAngular() {
    this.valor++;
  }

}