import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VehiculoComponent } from './component/vehiculo/vehiculo.component';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { QuienesSomosComponent } from './component/quienes-somos/quienes-somos.component';
import { CooperativaComponent } from './component/cooperativa/cooperativa.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { MantenimientoComponent } from './component/mantenimiento/mantenimiento.component';
import { acceso } from './guards/acceso.guard';
import { ProtectedComponent } from './component/protected/protected.component';
import { NuestrosserviciosComponent } from './component/nuestrosservicios/nuestrosservicios.component';
import { ContactanosComponent } from './component/contactanos/contactanos.component';

const routes: Routes = [
  {path: 'Vehiculo', component: VehiculoComponent, canActivate: [acceso]},
  {path: 'Usuario', component: UsuarioComponent},
  {path: 'QuienesSomos', component: QuienesSomosComponent},
  {path: 'Cooperativa', component: CooperativaComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'mantenimiento', component: MantenimientoComponent},
  {path: 'protected', component:ProtectedComponent, canActivate:[acceso]},
  {path: 'nuestrosservicios', component:NuestrosserviciosComponent},
  {path: 'contactanos', component:ContactanosComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
