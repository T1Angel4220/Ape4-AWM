# Instrucciones para Subir el Proyecto a GitHub

## Resumen del Flujo de Trabajo Implementado

### Estructura de Ramas
- **main**: Rama estable con la versión de producción
- **develop**: Rama de desarrollo donde se integran las features
- **feature/auth**: Rama para funcionalidad de autenticación
- **feature/user-crud**: Rama para funcionalidad CRUD de usuarios

### Commits Semánticos Realizados
1. `feat: implementar sistema de autenticación` (feature/auth)
2. `feat: implementar CRUD completo de usuarios` (feature/user-crud)
3. `Merge pull request #1: feat/auth - Sistema de autenticación` (develop)
4. `Merge pull request #2: feat/user-crud - CRUD completo de usuarios` (develop)
5. `Release: v1.0.0 - Versión estable con autenticación y CRUD de usuarios` (main)

## Pasos para Subir a GitHub

### 1. Crear el Repositorio en GitHub
1. Ve a [GitHub](https://github.com) e inicia sesión
2. Haz clic en el botón "+" en la esquina superior derecha
3. Selecciona "New repository"
4. Nombre del repositorio: `Ape4-AWM` (o el que prefieras)
5. Descripción: "Proyecto Angular - Aplicaciones Web y Móvil"
6. **NO** inicialices con README, .gitignore o licencia (ya los tenemos)
7. Haz clic en "Create repository"

### 2. Conectar el Repositorio Local con GitHub

```bash
# Si ya tienes un remoto configurado, verifica con:
git remote -v

# Si necesitas agregar o cambiar el remoto:
git remote add origin https://github.com/TU_USUARIO/Ape4-AWM.git
# O si ya existe y quieres cambiarlo:
git remote set-url origin https://github.com/TU_USUARIO/Ape4-AWM.git

# Reemplaza TU_USUARIO con tu nombre de usuario de GitHub
```

### 3. Subir Todas las Ramas

```bash
# Subir la rama main
git push -u origin main

# Subir la rama develop
git checkout develop
git push -u origin develop

# Subir las ramas de feature
git push -u origin feature/auth
git push -u origin feature/user-crud
```

### 4. Verificar en GitHub
1. Ve a tu repositorio en GitHub
2. Verifica que todas las ramas estén visibles
3. Revisa el historial de commits en la pestaña "Commits"
4. Verifica el gráfico de ramas en "Insights" > "Network"

## Capturas de Pantalla Necesarias para la Entrega

### Para la Parte 2 del Proyecto:

1. **Captura del repositorio en GitHub** mostrando:
   - Lista de ramas (main, develop, feature/auth, feature/user-crud)
   - Historial de commits

2. **Captura del Pull Request #1** (feature/auth → develop):
   - Título: "feat/auth - Sistema de autenticación"
   - Descripción del PR
   - Estado: Merged

3. **Captura del Pull Request #2** (feature/user-crud → develop):
   - Título: "feat/user-crud - CRUD completo de usuarios"
   - Descripción del PR
   - Estado: Merged
   - Resolución de conflictos (si aplica)

4. **Captura del gráfico de ramas** (Network Graph):
   - Muestra el flujo: feature branches → develop → main

## Crear Pull Requests en GitHub (Opcional - para simular mejor)

Si quieres crear los PRs directamente en GitHub:

1. **PR #1: feature/auth → develop**
   - Ve a tu repositorio en GitHub
   - Haz clic en "Pull requests" > "New pull request"
   - Base: `develop`, Compare: `feature/auth`
   - Título: "feat/auth - Sistema de autenticación"
   - Descripción: "Implementa sistema completo de autenticación con AuthService y LoginComponent"
   - Haz clic en "Create pull request"
   - Luego "Merge pull request"

2. **PR #2: feature/user-crud → develop**
   - Similar al anterior
   - Base: `develop`, Compare: `feature/user-crud`
   - Título: "feat/user-crud - CRUD completo de usuarios"
   - Descripción: "Implementa CRUD completo de usuarios con UserService y componentes de gestión"

## Comandos Útiles

```bash
# Ver todas las ramas
git branch -a

# Ver el historial gráfico
git log --oneline --graph --all --decorate

# Ver diferencias entre ramas
git diff main..develop

# Ver commits de una rama específica
git log feature/auth --oneline
```

## Notas Importantes

- Todos los commits siguen el formato de commits semánticos
- Los merges se hicieron con `--no-ff` para preservar el historial
- El proyecto está listo para continuar con la Parte 1 (Pruebas unitarias)

