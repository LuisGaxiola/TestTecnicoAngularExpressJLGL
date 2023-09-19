# Sobre el proyecto
Test técnico, elaborado por José Luis Gaxiola López.
Martes 19 de septiembre de 2023.

## Instrucciones
- Crear un formulario que permita la captura de la siguiente información:
- Nombre completo
- Nombre de la empresa
- Correo electrónico
- Teléfono
- Categoría (Facturación, soporte técnico, ventas, información general).
- Mensaje

## Consideraciones importantes
- Crear un diseño basado en componentes (utilizar angular 10).
- Crear un API con node js (express) para el guardado de los datos.
- Crear una base de datos (MongoDB, MySQL, PostgreSQL, SQLite, etc).
- Subir el código a un repositorio GIT. (Github, GitLab).

## Tecnologías a utilizar
- Angular 10
- Bootstrap 4
- HTML 5 / CSS
- Node JS (Express)
- MySQL

# Requisitos
- Entorno linux
- Docker
- Docker compose

# Comandos útiles
## Desplegar proyecto
Descargue el proyecto, ejecute el siguiente comando y espere hasta que el frontend de angular se construya (1 a 2 minutos). Una vez transcurrido ese tiempo puede visitar su navegador en la siguente ruta (puede cambiar el puerto en la línea 6 del archivo docker-compose.yml): http://localhost:8000

```sh
git clone https://github.com/LuisGaxiola/TestTecnicoAngularExpressJLGL.git
cd TestTecnicoAngularExpressJLGL
docker-compose up -d
```

## Creación de un proyecto con Angular 10
```sh
npx --force @angular/cli@10 new FrontendAngular
```

# Observaciones personales
El proyecto puede ser mejorado a través de las siguientes features:

- Implementar un sistema Captcha, para evitar bots
- Crear un un sistema de inicio de sesión, para proteger las acciones de administración
- Mover la coleción de categorías de un array en javascript a una tabla de la base de datos, para evitar hard-coding