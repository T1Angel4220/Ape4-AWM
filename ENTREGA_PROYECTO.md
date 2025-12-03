# Guía de Entrega - Proyecto Ape4-AWM

## Resumen del Proyecto

Este proyecto implementa un sistema completo de gestión de usuarios con autenticación, desarrollado en Angular 18, incluyendo pruebas unitarias, pruebas de integración y control de versiones con Git.

## PARTE 1: Pruebas Unitarias y de Integración ✅

### Implementación Completada

1. **Pruebas Unitarias con Karma + Jasmine:**
   - ✅ AuthService: 5 pruebas
   - ✅ LoginComponent: 4 pruebas
   - ✅ UserService (CRUD): 8 pruebas
   - ✅ UserListComponent: 4 pruebas

2. **Pruebas de Integración:**
   - ✅ UserApiService: 10 pruebas de integración
   - ✅ Verificación del endpoint `/usuarios`
   - ✅ Pruebas de todos los métodos HTTP (GET, POST, PUT, DELETE)
   - ✅ Prueba de flujo completo CRUD

### Resultados de las Pruebas

**Total:** 35 pruebas ejecutadas  
**Exitosas:** 35 ✅  
**Fallidas:** 0

**Cobertura de Código:**
- Statements: 72.89%
- Branches: 56.25%
- Functions: 69.76%
- Lines: 70.4%

### Archivos de Pruebas

- `src/app/services/auth.service.spec.ts` - Pruebas unitarias de autenticación
- `src/app/services/user.service.spec.ts` - Pruebas unitarias CRUD
- `src/app/services/user-api.service.spec.ts` - **Pruebas de integración del endpoint /usuarios**
- `src/app/components/login/login.component.spec.ts` - Pruebas del componente login
- `src/app/components/user-list/user-list.component.spec.ts` - Pruebas del componente lista

### Reportes Generados

1. **Reporte HTML:** `coverage/ape4-awm/index.html`
2. **Reporte LCOV:** `coverage/ape4-awm/lcov.info`
3. **Reporte de texto:** Se muestra en consola al ejecutar `npm run test:coverage`

### Comandos para Ejecutar Pruebas

```bash
# Ejecutar todas las pruebas con coverage
npm run test:coverage

# Ver reporte HTML (abrir en navegador)
# Archivo: coverage/ape4-awm/index.html
```

### Capturas Necesarias para la Entrega

1. **Captura de la consola mostrando ejecución exitosa:**
   - Ejecutar: `npm run test:coverage`
   - Capturar la salida que muestra "35 SUCCESS" y el resumen de coverage

2. **Captura del reporte HTML de cobertura:**
   - Abrir: `coverage/ape4-awm/index.html` en el navegador
   - Capturar la pantalla mostrando el resumen de cobertura

## PARTE 2: Control de Versiones y Trabajo Colaborativo ✅

### Repositorio

**URL:** https://github.com/T1Angel4220/Ape4-AWM

### Estructura de Ramas

- ✅ **main** → Rama estable (producción)
- ✅ **develop** → Rama de desarrollo
- ✅ **feature/auth** → Funcionalidad de autenticación
- ✅ **feature/user-crud** → Funcionalidad CRUD de usuarios

### Pull Requests Realizados

1. **PR #1: feat/auth - Sistema de autenticación**
   - Rama: `feature/auth` → `develop`
   - Commit: `ef312d4` - "feat: implementar sistema de autenticación"
   - Merge: `9fe888f` - "Merge pull request #1: feat/auth - Sistema de autenticación"

2. **PR #2: feat/user-crud - CRUD completo de usuarios**
   - Rama: `feature/user-crud` → `develop`
   - Commit: `50cdb64` - "feat: implementar CRUD completo de usuarios"
   - Merge: `e00d5fb` - "Merge pull request #2: feat/user-crud - CRUD completo de usuarios"
   - **Nota:** Incluye resolución de conflictos en `app.routes.ts`

3. **Release: v1.0.0**
   - Rama: `develop` → `main`
   - Merge: `96c44ac` - "Release: v1.0.0 - Versión estable con autenticación y CRUD de usuarios"

### Commits Semánticos

Todos los commits siguen el formato de commits semánticos:
- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bugs
- `docs:` - Documentación
- `test:` - Pruebas
- `refactor:` - Refactorización

### Capturas Necesarias para la Entrega

1. **Captura del repositorio en GitHub:**
   - Mostrar todas las ramas (main, develop, feature/auth, feature/user-crud)
   - URL: https://github.com/T1Angel4220/Ape4-AWM

2. **Captura del Pull Request #1:**
   - Si se creó en GitHub, capturar la página del PR
   - O capturar el historial de commits mostrando el merge

3. **Captura del Pull Request #2:**
   - Similar al PR #1
   - Mostrar la resolución de conflictos si aplica

4. **Captura del gráfico de ramas (Network Graph):**
   - En GitHub: `Insights` → `Network`
   - Mostrar el flujo: feature branches → develop → main

### Verificación del Flujo

Para verificar el flujo completo, ejecuta:

```bash
# Ver historial gráfico
git log --oneline --graph --all --decorate

# Ver todas las ramas
git branch -a
```

## Estructura del Proyecto

```
Ape4-AWM/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── login/              # Componente de autenticación
│   │   │   ├── user-list/          # Lista de usuarios
│   │   │   └── user-form/          # Formulario de usuarios
│   │   ├── services/
│   │   │   ├── auth.service.ts     # Servicio de autenticación
│   │   │   ├── user.service.ts     # Servicio CRUD local
│   │   │   └── user-api.service.ts # Servicio HTTP para API
│   │   └── ...
│   └── ...
├── coverage/                       # Reportes de cobertura
├── .gitignore
├── karma.conf.js                   # Configuración de pruebas
├── package.json
├── REPORTE_PRUEBAS.md             # Reporte detallado de pruebas
├── INSTRUCCIONES_GIT.md           # Instrucciones de Git
└── README.md
```

## Checklist de Entrega

### Parte 1: Pruebas
- [x] Pruebas unitarias implementadas (Karma + Jasmine)
- [x] Prueba de función CRUD (UserService)
- [x] Pruebas de integración para endpoint `/usuarios`
- [x] Pruebas ejecutadas exitosamente
- [x] Reporte de resultados generado
- [ ] Captura de consola con ejecución exitosa
- [ ] Captura del reporte HTML de cobertura

### Parte 2: Control de Versiones
- [x] Repositorio creado en GitHub
- [x] Ramas configuradas (main, develop, features)
- [x] 2 Pull Requests realizados y mergeados
- [x] Commits semánticos implementados
- [ ] Captura del repositorio en GitHub
- [ ] Captura de Pull Request #1
- [ ] Captura de Pull Request #2
- [ ] Captura del gráfico de ramas

## Notas Finales

- Todas las pruebas están en los archivos `.spec.ts`
- El reporte de cobertura se genera automáticamente al ejecutar `npm run test:coverage`
- El repositorio está completamente configurado y todas las ramas están subidas
- Los commits siguen el formato semántico estándar

## Contacto y Soporte

Para cualquier duda sobre el proyecto, revisar:
- `REPORTE_PRUEBAS.md` - Detalles de las pruebas
- `INSTRUCCIONES_GIT.md` - Guía de Git
- `README.md` - Documentación general del proyecto

