import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { remota } from 'src/connection';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  nombredeusuario: string = '';
  pass: string = '';
  bandera: boolean = false;

  constructor(private router: Router) { }

  validar() {
    const url = remota+'/api/acceso';
    const formData = {
      nombredeusuario: this.nombredeusuario,
      pass: this.pass
    };
    axios.post(url, formData)
    .then(response => {
        if (response.data.usuario.estado === "Activo") {
            console.log('Respuesta del servidor:', response.data);
            localStorage.setItem('rol', response.data.usuario.rol);
            localStorage.setItem('nombrecompleto', response.data.usuario.nombrecompleto);
            localStorage.setItem('email', response.data.usuario.email);
            localStorage.setItem('bandera', 'true');
            localStorage.setItem('id', response.data.usuario.id);
            Swal.fire("Éxito", "Inicio de sesión exitoso", "success").then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/protected';
                }
            });
        } else if (response.data.usuario.estado === 'Pendiente') {
            Swal.fire("Atención", "Usuario Pendiente de Aprobación", "warning");
        } else {
            Swal.fire("Error", "Usuario Bloqueado", "error");
        }
    })
    .catch(error => {
        console.error('Error al iniciar sesión:', error);
        Swal.fire("Error", "Usuario no Validado", "error");
        localStorage.setItem('bandera', 'false');
    });

  }
}