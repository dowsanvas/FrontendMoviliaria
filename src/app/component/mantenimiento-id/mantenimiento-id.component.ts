import { Component, Injector } from '@angular/core';
import axios from 'axios';
import { ImpresionService } from 'src/app/service/impresion.service';
import { UsuariosService } from 'src/app/service/usuarios.service';
import Swal from 'sweetalert2';
import { remota } from 'src/connection';
@Component({
  selector: 'app-mantenimiento-id',
  templateUrl: './mantenimiento-id.component.html',
  styleUrls: ['./mantenimiento-id.component.css']
})

export class MantenimientoIDComponent {
  mantenimiento: any[] = [];
  mantenimiento1: any[] = [];
  bandera: boolean = false;
  filtroTipo: string = 'todos';
  filtroID: number = 0;
  mostrarTooltip: boolean = false;

  id:number=0;
  vehiculo_id:number=0;
  detalles:string='';
  tipo:string='';
  kilometraje:number=0;
  alertas:string='';
  fecha= new Date();
  comentario:string='';

  constructor(private injector: Injector, private srvImpresion: ImpresionService) { }
  
  ngOnInit(): void {
    const usuariosService = this.injector.get(UsuariosService);
    const idFromLocalStorage = localStorage.getItem('id');
    const idAsNumber = idFromLocalStorage !== null ? parseInt(idFromLocalStorage) : 0;

    if (idAsNumber !== 0) {
      usuariosService.postMantenimiento1(idAsNumber).subscribe(data => {
        this.mantenimiento1 = data;
      });
    } else {
      console.log('El valor de "id" en localStorage no es un número válido.');
    }
  }

  get isBanderaSet(): boolean {
    return !!localStorage.getItem('bandera');
  }

  enviarMantenimiento(val: number): void {
    if (this.isBanderaSet) {
      const usuariosService = this.injector.get(UsuariosService);

      usuariosService.postMantenimiento(val).subscribe(
        (result) => {
          this.mantenimiento = result;
          this.mostrarAlerta();
          console.log("resultados: ", this.mantenimiento);
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

  actualizarMantenimiento(val: number): void {
    const usuariosService = this.injector.get(UsuariosService);

    usuariosService.updateMantenimiento(val).subscribe(
      (result) => {
        if (result) {
          Swal.fire("Mantenimiento", "Mantenimiento Realizado Exitosamente", "success");
          location.reload();
        }else {
          Swal.fire("Error", "No se pudo realizar el mantenimiento", "error");
        }
      },
      (error) => {
        console.error('Error al actualizar el mantenimiento', error);
        Swal.fire("Error", "Ocurrió un error al actualizar el mantenimiento", "error");
      }
    );
  }

  mostrarAlerta() {
    console.log('Entrando a mostrarAlerta');
  
    const alertasPorId = new Map(); 
  
    for (const login of this.mantenimiento) {
      console.log('Verificando login.alertas:', login.alertas);
  
      if (login.alertas === 'Por Realizar') {
        const fechaMantenimiento = new Date(login.fecha);
        const fechaActual = new Date();
        const diferencia = fechaMantenimiento.getTime() - fechaActual.getTime();
        const diasFaltantes = Math.floor(diferencia / (1000 * 3600 * 24));
  
        let mensaje = '';
  
        if (diasFaltantes < 0) {
          mensaje = `El Mantenimiento con ID número ${login.id} está atrasado.`;
        } else if (diasFaltantes === 0) {
          mensaje = `El Mantenimiento con ID número ${login.id} es hoy.`;
        } else {
          mensaje = `El Mantenimiento con ID número ${login.id} le faltan ${diasFaltantes} días.`;
        }
  
        if (!alertasPorId.has(login.id)) {
          alertasPorId.set(login.id, []);
        }
        alertasPorId.get(login.id).push(mensaje);
      }
    }
  
    let mensajeAlerta = '';
  
    for (const [id, alertas] of alertasPorId) {
      mensajeAlerta += `<br>${alertas.join('<br>')}`;
    }
  
    if (mensajeAlerta !== '') {
      console.log('Mostrando alertas:', mensajeAlerta);
  
      Swal.fire({
        title: 'Alertas Para Este Vehículo',
        html: mensajeAlerta,
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }


  mostrarVentanaEmergente1(id: number) {
    const registro = this.mantenimiento.find(mantenimiento => mantenimiento.id === id);
    this.id = registro.id;
    this.vehiculo_id = registro.vehiculo_id;
    this.detalles = registro.detalles;
    this.tipo = registro.tipo;
    this.alertas = registro.alertas;
    this.kilometraje = registro.kilometraje;
    this.fecha = registro.fecha;
    this.comentario = registro.comentario;

    const ventanaEmergente = document.getElementById('ventanaEmergente1');
    if (ventanaEmergente) {
      ventanaEmergente.style.display = 'block';
    }
  }

  cerrarVentanaEmergente1() {
    const ventanaEmergente = document.getElementById('ventanaEmergente1');
    if (ventanaEmergente) {
      ventanaEmergente.style.display = 'none';
    }
  }



   Imprimir(){
    console.log('imprimiendo', this.mantenimiento);  
    const encabezado = ['ID',	'Detalles',	'Tipo',	'Kilometraje',	'Estado',	'Fecha',	'Comentario'];
    const cuerpo = this.mantenimiento.map(
      (obj:any) =>{
        const datos= [
          obj.id,
          obj.detalles,
          obj.tipo,
          obj.kilometraje,
          obj.alertas,
          obj.fecha,
          obj.comentario
        ]
        return datos;
        
      }
    )
    console.log('imprimiendo', cuerpo);  
    this.srvImpresion.imprimir(encabezado, cuerpo, 'Mantenimientos', true);
   }




  guardar(id: number) {
    if (
      this.id &&
      this.detalles &&
      this.tipo &&
      this.kilometraje &&
      this.fecha &&
      this.comentario
    ) {
      const formData = {
        detalles: this.detalles,
        tipo: this.tipo,
        kilometraje: this.kilometraje,
        fecha: this.fecha,
        comentario: this.comentario,
        id: id
      }

      const url = remota+'/api/updateMantenimiento1';

      axios.put(url, formData)
        .then(response => {
          console.log('Respuesta del servidor:', response.data);
          Swal.fire({
            title: "Éxito",
            text: "Mantenimiento Actualizado",
            icon: "warning",
          }).then(() => {
            this.cerrarVentanaEmergente1();
            location.reload();
          });
        })
        .catch(error => {
          console.error('Error al enviar la solicitud PUT:', error);
          Swal.fire("Error", "Mantenimiento no Actualizado", "error");
        });
    } else {
      Swal.fire("Error", "Por favor, complete todos los campos", "error");
    }

  }

}
