import { Component, Injector, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/service/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  usuarios: any[] = [];
  bandera: boolean = false;

  constructor(private injector: Injector) { }

  ngOnInit(): void {
    const usuariosService = this.injector.get(UsuariosService);
    this.obtenerUsuarios();
  }


  get isBanderaSet(): boolean {
    return !!localStorage.getItem('bandera');
  }

  obtenerUsuarios(): void {
    if (this.isBanderaSet) {
      const usuariosService = this.injector.get(UsuariosService);

      usuariosService.getUsuarios().subscribe(
        (result) => {
          this.usuarios = result;
          console.log('Registros de inicio de sesión:', this.usuarios);
        },
        (error) => {
          console.error('Error al obtener registros de inicio de sesión', error);
        }
      );
    } else {
      console.log('error');
    }
  }

  habilitarUsuario(id: number) {
    const usuariosService = this.injector.get(UsuariosService);

    usuariosService.habilitarUsuario(id).subscribe(
      (result) => {
        if (result) {
          Swal.fire("Usuario", "Usuario Habilitado", "success").then(() => {
            location.reload();
          });
        } else {
          Swal.fire("Error", "No se pudo habilitar al usuario", "error");
        }
      },
      
      (error) => {
        console.error('Error al habilitar usuario', error);
        Swal.fire("Error", "Ocurrió un error al habilitar al usuario", "error");
      }
    );
  }

  bloquearUsuario(id: number) {
    const usuariosService = this.injector.get(UsuariosService);

    usuariosService.bloquearUsuario(id).subscribe(
      (result) => {
        if (result) {
          Swal.fire("Usuario", "Usuario Bloqueado", "success").then(() => {
            location.reload();
          });
        } else {
          Swal.fire("Error", "No se pudo bloquear al usuario", "error");
        }
      },
      (error) => {
        console.error('Error al bloquear al usuario', error);
        Swal.fire("Error", "Ocurrió un error al bloquear al usuario", "error");
      }
    );
  }
}
