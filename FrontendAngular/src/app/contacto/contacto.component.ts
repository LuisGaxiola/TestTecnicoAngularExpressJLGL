import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { categorias, PostContactosOutput } from '../../../../BackendExpress/src/commonData'

@Component({
  selector: 'app-contacto',
  template: `<div class="card" style="width: 100%;">
  <div class="card-body">
    <h1 class="card-title h2">Contacto de soporte</h1>
    <h2 class="card-subtitle h6 text-muted">Bienvenido/a, ingrese sus datos para continuar con el proceso.</h2>
    <form class="mt-3" [formGroup]="formulario" (ngSubmit)="onSubmit()">
      <label>
        Nombre completo
        <input type="text" class="form-control" formControlName="nombreCompleto">
        <div style="color: red;" *ngIf="isSubmitted && formulario.get('nombreCompleto')?.invalid">
          Verifique el dato
        </div>
      </label>
      <label>
        Nombre de la empresa
        <input type="text" class="form-control" formControlName="nombreEmpresa">
        <div style="color: red;" *ngIf="isSubmitted && formulario.get('nombreEmpresa')?.invalid">
          Verifique el dato
        </div>
      </label>
      <label>
        Correo electrónico
        <input type="email" class="form-control" formControlName="correoElectronico">
        <div style="color: red;" *ngIf="isSubmitted && formulario.get('correoElectronico')?.invalid">
          Verifique el dato
        </div>
      </label>
      <div class="row">
        <label class="col-sm">
          Teléfono
          <input type="tel" class="form-control" formControlName="telefono">
          <div style="color: red;" *ngIf="isSubmitted && formulario.get('telefono')?.invalid">
            Verifique el dato
          </div>
        </label>
        <label class="col-sm">
          Categoría
          <select
            class="form-control"
            formControlName="categoria"
          >
            <option value="">Seleccione un valor</option>
            <option *ngFor="let categoria of categorias" [ngValue]="categoria">
              {{ categoria }}
            </option>
          </select>
          <div style="color: red;" *ngIf="isSubmitted && formulario.get('categoria')?.invalid">
            Verifique el dato
          </div>
        </label>
      </div>
      <label>
        Mensaje
        <textarea placeholder="Escriba su mensaje" type="text" class="form-control" formControlName="mensaje"></textarea>
        <div style="color: red;" *ngIf="isSubmitted && formulario.get('mensaje')?.invalid">
          Verifique el dato
        </div>
      </label>
      <button type="submit" class="mt-3 btn bg-main" style="color: white; display: flex; align-items: center; gap: 8px;">
        Enviar
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path fill="none" stroke-dasharray="14" stroke-dashoffset="14" d="M6 19h12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="14;0"/></path><path fill="currentColor" d="M12 15 h2 v-6 h2.5 L12 4.5M12 15 h-2 v-6 h-2.5 L12 4.5"><animate attributeName="d" calcMode="linear" dur="1.5s" keyTimes="0;0.7;1" repeatCount="indefinite" values="M12 15 h2 v-6 h2.5 L12 4.5M12 15 h-2 v-6 h-2.5 L12 4.5;M12 15 h2 v-3 h2.5 L12 7.5M12 15 h-2 v-3 h-2.5 L12 7.5;M12 15 h2 v-6 h2.5 L12 4.5M12 15 h-2 v-6 h-2.5 L12 4.5"/></path></g></svg>
      </button>
    </form>
  </div>
</div>`
})

export class ContactoComponent implements OnInit {
  categorias = categorias;

  formulario = new FormGroup({
    nombreCompleto: new FormControl('', [Validators.required]),
    nombreEmpresa: new FormControl('', [Validators.required]),
    correoElectronico: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.required, Validators.minLength(10)]),
    categoria: new FormControl('', [Validators.required]),
    mensaje: new FormControl('', [Validators.required])
  });

  isSubmitted = false;

  constructor(private titleService: Title, private http: HttpClient) { }

  ngOnInit(): void {
    this.titleService.setTitle('Inicio | Contacto de soporte')
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (!this.formulario.valid) {
      alert('¡Verifique los datos!')
      return;
    }
    this.http.post<PostContactosOutput>(`/api/contactos`, this.formulario.value).subscribe((data) => {
      if (data.success) {
        alert("¡Éxito!: Sus datos fueron enviados correctamente, espere nuestro contacto, gracias por su tiempo.")
        this.formulario.reset()
        this.isSubmitted = false
      } else {
        alert("Error no identificado, intente de nuevo. Si el problema persiste contactenos por otro medio, gracias por su paciencia.")
      }
    })
  }
}
