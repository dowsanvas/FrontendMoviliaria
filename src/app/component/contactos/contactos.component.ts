import { Component, Injector } from '@angular/core';
import { UsuariosService } from 'src/app/service/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent {
  contactos: any[] = [];
  bandera: boolean = false;

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    const usuariosService = this.injector.get(UsuariosService);
    this.obtenerRegistros();
  }

  get isBanderaSet(): boolean {
    return !!localStorage.getItem('bandera');
  }

  obtenerRegistros(): void {
    if (this.isBanderaSet) {
      const usuariosService = this.injector.get(UsuariosService);

      usuariosService.getRegistros().subscribe(
        (result) => {
          this.contactos = result;
          console.log('Registros de inicio de sesión:', this.contactos);
        },
        (error) => {
          console.error('Error al obtener registros de inicio de sesión', error);
        }
      );
    } else {
      console.log('error');
    }
  }

  eliminarContacto(id: number) {
    if (this.isBanderaSet) {
      Swal.fire({
        title: '¿Estás seguro de eliminar Contacto?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'No, cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          const usuariosService = this.injector.get(UsuariosService);
          usuariosService.deleteContacto(id).subscribe(
            (result) => {
              this.contactos = result;
              console.log("resultados: ", this.contactos);
            },
            (error) => {
              console.error('Error al obtener contactos', error);
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
