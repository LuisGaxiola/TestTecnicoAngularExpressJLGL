# Sobre el proyecto
Test técnico, elaborado por José Luis Gaxiola López.
Martes 19 de septiembre de 2023.

Es un formulario que permite la captura de la siguiente información:
- Nombre completo
- Nombre de la empresa
- Correo electrónico
- Teléfono
- Categoría (Facturación, soporte técnico, ventas, información general).
- Mensaje

## Características
- Diseño basado en componentes (Angular 10).
- API con node js (express) para el guardado de los datos.
- Base de datos MySQL.

## Tecnologías
- Angular 10
- Bootstrap 4
- HTML 5 / CSS
- Node JS (Express)
- MySQL

# Requisitos del sistema
- Entorno Linux
- Docker
- Docker Compose

# Instalar/Desplegar proyecto
Descargue el proyecto, ejecute el comando docker-compose up -d y espere hasta que el frontend de Angular se construya (2 minutos aprox.). Una vez transcurrido ese tiempo puede visitar su navegador en la ruta http://localhost:8000 (puede cambiar el puerto en la línea 6 del archivo docker-compose.yml): 

```sh
git clone https://github.com/LuisGaxiola/TestTecnicoAngularExpressJLGL.git
cd TestTecnicoAngularExpressJLGL
docker-compose up -d
```

# Comandos útiles
## Creación de un proyecto con Angular 10
```sh
npx --force @angular/cli@10 new FrontendAngular
```

# Observaciones personales
Este proyecto puede ser mejorado a través de las siguientes features:

- Implementar un sistema Captcha, para evitar bots
- Crear un un sistema de inicio de sesión, para proteger las acciones de administración
- Mover la coleción de categorías de un array en javascript a una tabla de la base de datos, para evitar hard-coding