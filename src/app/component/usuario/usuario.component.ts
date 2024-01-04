import { Component } from '@angular/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import { remota } from 'src/connection';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  nombrecompleto: string = '';
  nombredeusuario: string = '';
  email: string = '';
  pass: string = '';

  hasInvalidCharacters(): boolean {
    return !/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/.test(this.nombrecompleto);
  }

  isInvalidEmail(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return !emailPattern.test(this.email);
  }

  guardar() {
    if (
      !this.isInvalidEmail() &&
      this.nombredeusuario &&
      !this.hasInvalidCharacters() &&
      this.pass
    ) {
      const formData = {
        nombrecompleto: this.nombrecompleto,
        nombredeusuario: this.nombredeusuario,
        email: this.email,
        pass: this.pass
      }

      const url = remota+'/api/usuario';

      axios.post(url, formData)
        .then(response => {
          console.log('Respuesta del servidor:', response.data);
          Swal.fire("Éxito", "Usuario Registrado", "success");
          setTimeout(function () {
            window.location.href = '/login';
          }, 3000);
        })
        .catch(error => {
          console.error('Error al enviar la solicitud POST:', error);
          Swal.fire("Error", "Usuario no Registrado", "error");
        });

    } else {
      Swal.fire("Error", "Por favor, verifique los campos", "error");
    }
  }
}
