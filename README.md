# Sobre el proyecto
Test técnico, elaborado por José Luis Gaxiola López.

# Requisitos
- Entorno linux
- nvm (Node Version Manager)

# Comandos útiles
## Instalación de node.js 16
nvm install 16
nvm use 16

## Creación de un proyecto con Angular 10
cd src && npx --force @angular/cli@10 new FrontendAngular

## Iniciar el frontend (modo desarrollo)
cd src/FrontendAngular && npm run start

## Iniciar el frontend (modo producción)
cd src/FrontendAngular && npm run build && npm run preview
