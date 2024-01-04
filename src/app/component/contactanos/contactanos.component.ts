import { Component } from '@angular/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import { remota } from 'src/connection';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent {

  nombre:string='';
  correo:string='';
  mensaje:string='';

  guardar() {
    if (
      this.nombre &&
      this.correo &&
      this.mensaje
    ) {
      const formData = {
        nombre: this.nombre,
        correo: this.correo,
        mensaje: this.mensaje,
      }
  
      const url = remota+'/api/contacto';
  
      axios.post(url, formData)
        .then(response => {
          console.log('Respuesta del servidor:', response.data);
          Swal.fire("Éxito", "Registro creado", "success");
          location.reload();
        })
        .catch(error => {
          console.error('Error al enviar la solicitud POST:', error);
          Swal.fire("Error", "Registro no creado", "error");
        });
    } else {
      Swal.fire("Error", "Por favor, complete todos los campos", "error");
    }
  }
  
}