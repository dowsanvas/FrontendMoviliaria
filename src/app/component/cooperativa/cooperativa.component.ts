import { Component } from '@angular/core';

@Component({
  selector: 'app-cooperativa',
  templateUrl: './cooperativa.component.html',
  styleUrls: ['./cooperativa.component.css']
})
export class CooperativaComponent {
  cooperativa: any = {};

  onSubmit() {
    // Aquí puedes realizar acciones con los datos del formulario, como enviarlos al servidor para registrar la cooperativa.
    console.log(this.cooperativa);
  }
}
