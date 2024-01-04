import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { VehiculoComponent } from '../vehiculo/vehiculo.component';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent {

  rol: string = '';
  nombrecompleto: string = '';
  email: string = '';
  modalAbierto: boolean = true;

  constructor(private modalService: UsuariosService) { }

  ngOnInit() {
    const rolFromLocalStorage1 = localStorage.getItem('rol');
    this.rol = rolFromLocalStorage1 !== null ? rolFromLocalStorage1 : 'valor1';
    const rolFromLocalStorage2 = localStorage.getItem('nombrecompleto');
    this.nombrecompleto = rolFromLocalStorage2 !== null ? rolFromLocalStorage2 : 'valor2';
    const rolFromLocalStorage3 = localStorage.getItem('email');
    this.email = rolFromLocalStorage3 !== null ? rolFromLocalStorage3 : 'valor3';
  }

  agregarVehiculo(): void {
    this.modalService.abrirModal();
  }
}