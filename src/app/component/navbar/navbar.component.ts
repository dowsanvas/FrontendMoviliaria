import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../../service/acceso.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private router: Router) { }

  bandera:boolean=false;
  nombre:string='';
  ngOnInit(){
    this.bandera=localStorage.getItem('bandera') === 'true';
    console.log("bandera: " + this.bandera);
    const nombreLocalStorage = localStorage.getItem('nombrecompleto');
    if (nombreLocalStorage !== null) {
      this.nombre = nombreLocalStorage;
    } else {
      this.nombre = "valor"; 
    }
    
  }

  cerrarSesion() {
    this.bandera = false;
    localStorage.removeItem('bandera');
    localStorage.removeItem('rol');
    localStorage.removeItem('nombrecompleto');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    localStorage.removeItem('id_vehiculo');
    this.router.navigate(['/home']);
  }

  perfil(){
    this.router.navigate(['/protected']);
  }
}
