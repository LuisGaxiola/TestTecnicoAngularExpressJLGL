import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { categorias, Contacto, DeleteContactoOutput, DeleteContactosOutput, GetContactosOutput, PostContactosOutput, PutContactoOutput } from '../../../../BackendExpress/src/commonData'

@Component({
  selector: 'app-admin',
  template: `<div class="card" style="width: 100%;">
  <div class="card-body">
    <h1 class="card-title h2">Administración</h1>
    <button type="button" (click)="borrarRegistros()" class="my-3 btn" style="background-color: #cc0040; color: white; display: flex; align-items: center; gap: 8px;">
      Borrar todos los registros
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path stroke-dasharray="64" stroke-dashoffset="64" stroke-width="2" d="M13 3L19 9V21H5V3H13"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0"/></path><path stroke-dasharray="14" stroke-dashoffset="14" d="M12.5 3V8.5H19"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="14;0"/></path><path stroke-dasharray="8" stroke-dashoffset="8" stroke-width="2" d="M9 14H15"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1s" dur="0.2s" values="8;0"/></path></g></svg>
    </button>
    <h1 class="card-title h4">
      Todos los registros
    </h1>
    <div class="custom-control custom-switch my-3">
        <input type="checkbox" [checked]="mostrarExclusivamenteMensajesNoVistos" (change)="mostrarExclusivamenteMensajesNoVistos = !mostrarExclusivamenteMensajesNoVistos; obtenerRegistros()" class="custom-control-input" id="customSwitch1">
        <label class="custom-control-label" for="customSwitch1">Mostrar exclusivamente mensajes NO vistos</label>
    </div>
    <div class="table-responsive" *ngIf="contactos[0]">
      <table class="table table-bordered table-hover">
        <thead class="bg-main" style="color: white;">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre completo</th>
            <th scope="col">Nombre de la empresa</th>
            <th scope="col">Correo electrónico</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Categoría</th>
            <th scope="col" style="min-width: 200px;">Mensaje</th>
            <th scope="col">Fecha de creación</th>
            <th scope="col">Visto?</th>
            <th scope="col" style="min-width: 220px;">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let contacto of contactos">
            <th scope="row">{{contacto.id}}</th>
            <td>{{contacto.nombreCompleto}}</td>
            <td>{{contacto.nombreEmpresa}}</td>
            <td>{{contacto.correoElectronico}}</td>
            <td>{{contacto.telefono}}</td>
            <td>{{contacto.categoria}}</td>
            <td>{{contacto.mensaje}}</td>
            <td>{{fechaEstilizada(contacto)}}</td>
            <td>
              <svg *ngIf="!contacto.visto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="12" stroke-dashoffset="12" stroke-linecap="round" stroke-width="2" d="M12 12L19 19M12 12L5 5M12 12L5 19M12 12L19 5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="12;0"/></path></svg>
              <svg *ngIf="contacto.visto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="24" stroke-dashoffset="24" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11L11 17L21 7"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="24;0"/></path></svg>
            </td>
            <td style="display: flex; gap: 8px; flex-direction: column;">
              <button type="button" (click)="actualizarRegistroVisto(contacto)" class="btn" style="display: flex; align-items: center; justify-content: 'space-between'; background-color: #4080cc; color: white; display: flex; align-items: center; gap: 8px;">
                <ng-container *ngIf="!contacto.visto">
                  Marcar como visto
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="24" stroke-dashoffset="24" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11L11 17L21 7"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="24;0"/></path></svg>
                </ng-container>
                <ng-container *ngIf="contacto.visto">
                  Marcar como NO visto
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="12" stroke-dashoffset="12" stroke-linecap="round" stroke-width="2" d="M12 12L19 19M12 12L5 5M12 12L5 19M12 12L19 5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="12;0"/></path></svg>
                </ng-container>
              </button>
              <button type="button" (click)="borrarRegistro(contacto)" class="btn" style="display: flex; align-items: center; justify-content: 'space-between'; background-color: #cc0040; color: white; display: flex; align-items: center; gap: 8px;">
                Borrar registro
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path stroke-dasharray="64" stroke-dashoffset="64" stroke-width="2" d="M13 3L19 9V21H5V3H13"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0"/></path><path stroke-dasharray="14" stroke-dashoffset="14" d="M12.5 3V8.5H19"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="14;0"/></path><path stroke-dasharray="8" stroke-dashoffset="8" stroke-width="2" d="M9 14H15"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1s" dur="0.2s" values="8;0"/></path></g></svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table> 
    </div>
    <div style="font-style: italic;" *ngIf="!contactos[0]">Sin registros.</div>
  </div>
</div>`
})

export class AdminComponent implements OnInit {
  contactos: Contacto[] = [];
  mostrarExclusivamenteMensajesNoVistos = false

  constructor(private titleService: Title, private http: HttpClient) { }


  ngOnInit(): void {
    this.titleService.setTitle('Administración | Contacto de soporte')
    this.obtenerRegistros()
  }

  fechaEstilizada(contacto: Contacto) {
    return new Date(contacto.fechaCreacion).toLocaleTimeString("es-MX", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour12: true, 
      
    })
  }

  obtenerRegistros() {
    this.http.get<GetContactosOutput>(`/api/contactos?mostrarExclusivamenteMensajesNoVistos=${this.mostrarExclusivamenteMensajesNoVistos}`).subscribe((data) => {
      this.contactos = data
    })
  }
  borrarRegistros() {
    if (confirm("¿Está seguro(a)?!")) {
      this.http.delete<DeleteContactosOutput>(`/api/contactos`).subscribe((data) => {
        if (data.success) {
          alert("¡Registros borrados con éxito!")
          this.obtenerRegistros()
        } else {
          alert("¡Error inesperado!, contacte a administración")
        }
      })
    }
  }

  borrarRegistro(contacto: Contacto) {
    if (confirm("¿Está seguro(a)?!")) {
      this.http.delete<DeleteContactoOutput>(`/api/contactos/${contacto.id}`).subscribe((data) => {
        if (data.success) {
          alert("¡Registro borrado con éxito!")
          this.obtenerRegistros()
        } else {
          alert("¡Error inesperado!, contacte a administración")
        }
      })
    }
  }

  actualizarRegistroVisto(contacto: Contacto) {
    const contactoClone = { ...contacto }
    contactoClone.visto = !contactoClone.visto
    console.log(contactoClone)
    this.http.put<PutContactoOutput>(`/api/contactos/${contactoClone.id}`, contactoClone).subscribe((data) => {
      if (data.success) {
        alert("¡Registro actualizado con éxito!")
        this.obtenerRegistros()
      } else {
        alert("¡Error inesperado!, contacte a administración")
      }
    })
  }
}
