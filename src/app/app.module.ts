import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { VehiculoComponent } from './component/vehiculo/vehiculo.component';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { CooperativaComponent } from './component/cooperativa/cooperativa.component';
import { QuienesSomosComponent } from './component/quienes-somos/quienes-somos.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { MantenimientoComponent } from './component/mantenimiento/mantenimiento.component';
import { acceso } from './guards/acceso.guard';
import { AccesoService } from './service/acceso.service';
import { ProtectedComponent } from './component/protected/protected.component';
import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { UsuariosService } from './service/usuarios.service';
import { VehiculosComponent } from './component/vehiculos/vehiculos.component';
import { MantenimientosComponent } from './component/mantenimientos/mantenimientos.component';
import { VehiculoIDComponent } from './component/vehiculo-id/vehiculo-id.component';
import { MantenimientoIDComponent } from './component/mantenimiento-id/mantenimiento-id.component';
import { NuestrosserviciosComponent } from './component/nuestrosservicios/nuestrosservicios.component';
import { ContactanosComponent } from './component/contactanos/contactanos.component';
import { ContactosComponent } from './component/contactos/contactos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VehiculoComponent,
    UsuarioComponent,
    CooperativaComponent,
    QuienesSomosComponent,
    HomeComponent,
    LoginComponent,
    MantenimientoComponent,
    ProtectedComponent,
    UsuariosComponent,
    VehiculosComponent,
    MantenimientosComponent,
    VehiculoIDComponent,
    MantenimientoIDComponent,
    NuestrosserviciosComponent,
    ContactanosComponent,
    ContactosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    acceso,
    AccesoService,
    UsuariosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
