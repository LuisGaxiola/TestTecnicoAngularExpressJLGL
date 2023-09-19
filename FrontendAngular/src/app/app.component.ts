import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<header>
  <nav class="navbar navbar-expand-lg navbar-dark bg-main">
    <a class="navbar-brand" routerLink="/">Contacto de soporte</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Administración</a>
        </li>
      </ul>
      <span class="navbar-text">
      © 2023 | Hecho por José Luis Gaxiola López
      </span>
    </div>
  </nav>
</header>
<main class="container-fluid py-3" style="min-height: 100vh;">
  <router-outlet></router-outlet>
</main>
<footer class="bg-main container-fluid py-3" style="color: white; display: flex; align-items: center; justify-content: space-between;">
© 2023 | Hecho por José Luis Gaxiola López
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="34" stroke-dashoffset="34" d="M12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="34;0"/></path><g stroke-dasharray="2" stroke-dashoffset="2"><path d="M0 0"><animate fill="freeze" attributeName="d" begin="0.5s" dur="0.2s" values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1"/><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="2;0"/></path><path d="M0 0"><animate fill="freeze" attributeName="d" begin="0.7s" dur="0.2s" values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"/><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="2;0"/></path><animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></g></g></svg>
</footer>`
})
export class AppComponent {
  title = 'Contacto de soporte';
}
