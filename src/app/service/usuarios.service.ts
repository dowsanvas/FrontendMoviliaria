import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VehiculoComponent } from '../component/vehiculo/vehiculo.component';
import { MantenimientoComponent } from '../component/mantenimiento/mantenimiento.component';
import { remota } from 'src/connection';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = remota+'/api/usuarios';
  private apiUrl1 = remota+'/api/vehiculos';
  private apiUrl2 = remota+'/api/mantenimientos';
  private apiUrl3 = remota+'/api/vehiculoID';
  private apiUrl4 = remota+'/api/mantenimientoID';
  private apiUrl5 = remota+'/api/vehiculosIDs';
  private apiUrl6 = remota+'/api/deleteMantenimiento';
  private apiUrl7 = remota+'/api/registro';
  private apiUrl8 = remota+'/api/updateMantenimiento';
  private apiUrl9 = remota+'/api/habilitarUsuario';
  private apiUrl10 = remota+'/api/bloquearUsuario';
  private apiUrl11 = remota+'/api/deleteContacto';
  private apiUrl12 = remota+'/api/deleteVehiculo';


  dialogRef: MatDialogRef<VehiculoComponent> | undefined; 
  dialogRef1: MatDialogRef<MantenimientoComponent> | undefined; 

  constructor(private dialog: MatDialog) {
    this.dialogRef = undefined;
  }

  abrirModal(): void {
    this.dialogRef = this.dialog.open(VehiculoComponent, {
      width: '720px',
      height: '750px',
      panelClass: 'custom-dialog-class'
    });

    this.dialogRef.afterOpened().subscribe(() => {
      const container = document.querySelector('.mat-dialog-container');
      if (container) {
        container.classList.add('open');
      }
    });

    this.dialogRef.afterClosed().subscribe(() => {
      const container = document.querySelector('.mat-dialog-container');
      if (container) {
        container.classList.remove('open');
      }
    });
  }

  cerrarModal(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  abrirModal1(): void {
    this.dialogRef1 = this.dialog.open(MantenimientoComponent, {
      width: '720px',
      height: '750px',
      panelClass: 'custom-dialog-class'
    });

    this.dialogRef1.afterOpened().subscribe(() => {
      const container = document.querySelector('.mat-dialog-container');
      if (container) {
        container.classList.add('open');
      }
    });

    this.dialogRef1.afterClosed().subscribe(() => {
      const container = document.querySelector('.mat-dialog-container');
      if (container) {
        container.classList.remove('open');
      }
    });
  }

  cerrarModal1(): void {
    if (this.dialogRef1) {
      this.dialogRef1.close();
    }
  }

  getUsuarios(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      axios
        .get(this.apiUrl, {})
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getVehiculos(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      axios
        .get(this.apiUrl1, {})
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getMantenimientos(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      axios
        .get(this.apiUrl2, {})
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  postVehiculo(val: number): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      axios
        .post(this.apiUrl3, { usuario_id: val })
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  postMantenimiento(val: number): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      axios
        .post(this.apiUrl4, { vehiculo_id: val })
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  postMantenimiento1(val: number): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      axios
        .post(this.apiUrl5, { usuario_id: val })
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  deleteMantenimiento(val: number): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      axios
        .delete(this.apiUrl6, {
          data: { id: val },
        })
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getRegistros(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      axios
        .get(this.apiUrl7, {})
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  updateMantenimiento(val: number): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      axios
        .put(this.apiUrl8, {
          id: val,
        })
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  habilitarUsuario(val: number): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      axios
        .put(this.apiUrl9, {
          id: val,
        })
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  bloquearUsuario(val: number): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      axios
        .put(this.apiUrl10, {
          id: val,
        })
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  deleteContacto(val: number): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      axios
        .delete(this.apiUrl11, {
          data: { id: val },
        })
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  deleteVehiculo(val: number): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      axios
        .delete(this.apiUrl12, {
          data: { id: val },
        })
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
