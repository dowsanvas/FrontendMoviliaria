import { Component } from '@angular/core';
import axios from 'axios';
import { UsuariosService } from 'src/app/service/usuarios.service';
import Swal from 'sweetalert2';
import { ProtectedComponent } from '../protected/protected.component';
import { remota } from 'src/connection';
@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent {
  usuario_id: number = 0;
  marca: string = '';
  modelo: string = '';
  anio: string = '';
  tipo: string = '';
  chasis: string = '';
  placa: any = '';
  kilometraje: number = 0;
  link: string = '';

  constructor(private modalService: UsuariosService) { }

  ngOnInit(): void {
    const idFromLocalStorage = localStorage.getItem('id');
    const idAsNumber = idFromLocalStorage !== null ? parseInt(idFromLocalStorage) : 0;
    this.usuario_id = idAsNumber;
  }

  isValidAnio(): boolean {
    return /^[0-9]{4}$/.test(this.anio);
  }

  isValidPlaca(): boolean {
    return /^[A-Za-z]{0,3}[0-9]{0,4}$/.test(this.placa);
  }

  isValidKilometraje(): boolean {
    return /^[0-9]*$/.test(this.kilometraje.toString());
  }

  isValidMarca(): boolean {
    return /^[A-Za-z]+$/.test(this.marca);
  }

  isValidModelo(): boolean {
    return /^[A-Za-z0-9]+$/.test(this.modelo);
  }

  validarPlaca(placa: any): boolean {
    if (typeof placa !== 'string') {
      return false;
    }
    const placaRegex = /^[A-Z]{3}\d{4}$/;
    return placaRegex.test(placa);
  }

  isValidTipo(): boolean {
    return /^[A-Za-z]+$/.test(this.tipo);
  }

  isValidChasis(): boolean {
    return /^[A-Za-z0-9]+$/.test(this.chasis);
  }

  guardar() {
    if (!this.validarPlaca(this.placa)) {
      Swal.fire("Error", "La placa debe tener 3 letras y 4 números y no exceder de 7 caracteres", "error");
      return;
    }

    if (
      this.usuario_id &&
      this.isValidMarca() &&
      this.isValidModelo() &&
      this.isValidAnio() &&
      this.isValidKilometraje() &&
      this.isValidChasis() &&
      this.isValidTipo()
    ) {
      const formData = {
        usuario_id: this.usuario_id,
        marca: this.marca,
        modelo: this.modelo,
        anio: this.anio,
        tipo: this.tipo,
        chasis: this.chasis,
        placa: this.placa,
        kilometraje: this.kilometraje,
        link: this.link
      }

      const url = remota+'/api/vehiculo';

      axios.post(url, formData)
        .then(response => {
          console.log('Respuesta del servidor:', response.data);
          Swal.fire({
            title: 'Éxito',
            text: 'Vehículo Registrado',
            icon: 'success',
            timer: 5000,
            showConfirmButton: true
          }).then((result) => {
            if (result.isConfirmed) {
              this.modalService.cerrarModal();
            }
          });
        })
        .catch(error => {
          console.error('Error al enviar la solicitud POST:', error);
          Swal.fire("Error", "Vehículo no Registrado", "error");
        });
    } else {
      Swal.fire("Error", "Por favor, complete todos los campos correctamente", "error");
    }
  }

}
