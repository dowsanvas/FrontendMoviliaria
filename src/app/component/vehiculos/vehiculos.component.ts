import { Component, Injector } from '@angular/core';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent {
  vehiculos: any[] = [];
  bandera: boolean = false;

  constructor(private injector: Injector) { }

  ngOnInit(): void {
    const usuariosService = this.injector.get(UsuariosService);
    this.obtenerVehiculos();
  }

  get isBanderaSet(): boolean {
    return !!localStorage.getItem('bandera');
  }

  obtenerVehiculos(): void {
    if (this.isBanderaSet) {
      const usuariosService = this.injector.get(UsuariosService);

      usuariosService.getVehiculos().subscribe(
        (result) => {
          this.vehiculos = result;
        },
        (error) => {
          console.error('Error al obtener registros de inicio de sesión', error);
        }
      );
    } else {
      console.log('error');
    }
  }
}
