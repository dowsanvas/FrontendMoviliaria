import { Component, Injector } from '@angular/core';
import { UsuariosService } from 'src/app/service/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mantenimientos',
  templateUrl: './mantenimientos.component.html',
  styleUrls: ['./mantenimientos.component.css']
})
export class MantenimientosComponent {
  mantenimiento: any[] = [];
  bandera: boolean = false;

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    const usuariosService = this.injector.get(UsuariosService);
    console.log(this.obtenerMantenimientos());
  }

  get isBanderaSet(): boolean {
    return !!localStorage.getItem('bandera');
  }

  obtenerMantenimientos(): void {
    if (this.isBanderaSet) {
      const usuariosService = this.injector.get(UsuariosService);

      usuariosService.getMantenimientos().subscribe(
        (result) => {
          this.mantenimiento = result;
        },
        (error) => {
          console.error('Error al obtener registros de inicio de sesión', error);
        }
      );
    } else {
      console.log('error');
    }
  }

  obtenerId(id: number) {
    if (this.isBanderaSet) {
      Swal.fire({
        title: '¿Estás seguro de eliminar Mantenimiento?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'No, cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          const usuariosService = this.injector.get(UsuariosService);
          usuariosService.deleteMantenimiento(id).subscribe(
            (result) => {
              this.mantenimiento = result;
              console.log("resultados: ", this.mantenimiento);
              location.reload();
            },
            (error) => {
              console.error('Error al obtener registros de inicio de sesión', error);
            }
          );
        } else {
          console.log('Eliminación cancelada');
        }
      });
    } else {
      console.log('error');
    }
  }
}
