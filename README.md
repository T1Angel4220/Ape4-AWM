# Ape4-AWM

Proyecto Angular para Aplicaciones Web y Móvil - Semestre 6

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 18.0.0.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [npm](https://www.npmjs.com/) (viene con Node.js)
- [Angular CLI](https://angular.io/cli) globalmente: `npm install -g @angular/cli`

## Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd Ape4-AWM
```

2. Instala las dependencias:
```bash
npm install
```

## Desarrollo

### Servidor de desarrollo

Ejecuta `ng serve` o `npm start` para iniciar un servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

```bash
ng serve
# o
npm start
```

### Construcción

Ejecuta `ng build` para construir el proyecto. Los archivos construidos se almacenarán en el directorio `dist/`.

```bash
ng build
# Para producción
ng build --configuration production
```

### Ejecutar pruebas unitarias

Ejecuta `ng test` para ejecutar las pruebas unitarias vía [Karma](https://karma-runner.github.io).

```bash
ng test
```

## Estructura del proyecto

```
Ape4-AWM/
├── src/
│   ├── app/              # Componentes y módulos de la aplicación
│   ├── index.html        # Página principal HTML
│   └── styles.css       # Estilos globales
├── public/              # Archivos estáticos
├── angular.json         # Configuración de Angular CLI
├── package.json         # Dependencias del proyecto
└── tsconfig.json        # Configuración de TypeScript
```

## Tecnologías utilizadas

- Angular 18.0.0
- TypeScript 5.4.2
- RxJS 7.8.0
- Karma & Jasmine (para testing)

## Ayuda adicional

Para obtener más ayuda sobre Angular CLI usa `ng help` o visita la [Página de Descripción General de Angular CLI](https://angular.io/cli).

