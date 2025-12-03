import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserApiService } from './user-api.service';
import { Usuario } from './user.service';

describe('UserApiService - Pruebas de Integración', () => {
  let service: UserApiService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/api';

  const mockUsuario: Usuario = {
    id: 1,
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    telefono: '1234567890',
    fechaCreacion: new Date('2024-01-15')
  };

  const mockUsuarios: Usuario[] = [
    mockUsuario,
    {
      id: 2,
      nombre: 'María García',
      email: 'maria@example.com',
      telefono: '0987654321',
      fechaCreacion: new Date('2024-02-20')
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserApiService]
    });
    service = TestBed.inject(UserApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya peticiones pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('GET /usuarios - Obtener todos los usuarios', () => {
    it('debe obtener la lista de usuarios correctamente', (done) => {
      service.obtenerUsuarios().subscribe({
        next: (usuarios) => {
          expect(usuarios).toEqual(mockUsuarios);
          expect(usuarios.length).toBe(2);
          done();
        },
        error: (error) => {
          fail(`Error inesperado: ${error}`);
          done();
        }
      });

      // Verificar que se hizo una petición GET al endpoint correcto
      const req = httpMock.expectOne(`${apiUrl}/usuarios`);
      expect(req.request.method).toBe('GET');
      
      // Simular respuesta del servidor
      req.flush(mockUsuarios);
    });

    it('debe manejar errores del servidor correctamente', (done) => {
      const errorMessage = 'Error del servidor';
      const errorStatus = 500;

      service.obtenerUsuarios().subscribe({
        next: () => {
          fail('Debería haber fallado');
          done();
        },
        error: (error) => {
          expect(error.status).toBe(errorStatus);
          done();
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/usuarios`);
      req.flush(errorMessage, { status: errorStatus, statusText: 'Internal Server Error' });
    });
  });

  describe('GET /usuarios/:id - Obtener usuario por ID', () => {
    it('debe obtener un usuario específico por ID', (done) => {
      service.obtenerUsuarioPorId(1).subscribe({
        next: (usuario) => {
          expect(usuario).toEqual(mockUsuario);
          expect(usuario.id).toBe(1);
          expect(usuario.nombre).toBe('Juan Pérez');
          done();
        },
        error: (error) => {
          fail(`Error inesperado: ${error}`);
          done();
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/usuarios/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUsuario);
    });

    it('debe manejar error 404 cuando el usuario no existe', (done) => {
      service.obtenerUsuarioPorId(999).subscribe({
        next: () => {
          fail('Debería haber fallado');
          done();
        },
        error: (error) => {
          expect(error.status).toBe(404);
          done();
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/usuarios/999`);
      req.flush('Usuario no encontrado', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('POST /usuarios - Crear nuevo usuario', () => {
    it('debe crear un nuevo usuario correctamente', (done) => {
      const nuevoUsuario = {
        nombre: 'Pedro Sánchez',
        email: 'pedro@example.com',
        telefono: '5555555555'
      };

      const usuarioCreado: Usuario = {
        ...nuevoUsuario,
        id: 3,
        fechaCreacion: new Date()
      };

      service.crearUsuario(nuevoUsuario).subscribe({
        next: (usuario) => {
          expect(usuario).toEqual(usuarioCreado);
          expect(usuario.nombre).toBe('Pedro Sánchez');
          expect(usuario.email).toBe('pedro@example.com');
          done();
        },
        error: (error) => {
          fail(`Error inesperado: ${error}`);
          done();
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/usuarios`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(nuevoUsuario);
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      req.flush(usuarioCreado);
    });
  });

  describe('PUT /usuarios/:id - Actualizar usuario', () => {
    it('debe actualizar un usuario existente correctamente', (done) => {
      const cambios = { nombre: 'Juan Pérez Actualizado' };
      const usuarioActualizado = { ...mockUsuario, ...cambios };

      service.actualizarUsuario(1, cambios).subscribe({
        next: (usuario) => {
          expect(usuario.nombre).toBe('Juan Pérez Actualizado');
          expect(usuario.id).toBe(1);
          done();
        },
        error: (error) => {
          fail(`Error inesperado: ${error}`);
          done();
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/usuarios/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(cambios);
      req.flush(usuarioActualizado);
    });
  });

  describe('DELETE /usuarios/:id - Eliminar usuario', () => {
    it('debe eliminar un usuario correctamente', (done) => {
      service.eliminarUsuario(1).subscribe({
        next: () => {
          // La eliminación exitosa no devuelve contenido
          done();
        },
        error: (error) => {
          fail(`Error inesperado: ${error}`);
          done();
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/usuarios/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });

    it('debe manejar error 404 al intentar eliminar usuario inexistente', (done) => {
      service.eliminarUsuario(999).subscribe({
        next: () => {
          fail('Debería haber fallado');
          done();
        },
        error: (error) => {
          expect(error.status).toBe(404);
          done();
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/usuarios/999`);
      req.flush('Usuario no encontrado', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('Integración completa - Flujo CRUD', () => {
    it('debe completar un flujo completo de operaciones CRUD', (done) => {
      // 1. Obtener usuarios iniciales
      service.obtenerUsuarios().subscribe({
        next: (usuarios) => {
          expect(usuarios.length).toBeGreaterThan(0);
          
          // 2. Crear nuevo usuario
          const nuevoUsuario = {
            nombre: 'Test User',
            email: 'test@example.com',
            telefono: '1111111111'
          };
          
          service.crearUsuario(nuevoUsuario).subscribe({
            next: (usuarioCreado) => {
              expect(usuarioCreado.nombre).toBe('Test User');
              
              // 3. Actualizar el usuario creado
              service.actualizarUsuario(usuarioCreado.id, { nombre: 'Test User Actualizado' })
                .subscribe({
                  next: (usuarioActualizado) => {
                    expect(usuarioActualizado.nombre).toBe('Test User Actualizado');
                    
                    // 4. Eliminar el usuario
                    service.eliminarUsuario(usuarioCreado.id).subscribe({
                      next: () => {
                        done();
                      }
                    });
                    
                    const deleteReq = httpMock.expectOne(`${apiUrl}/usuarios/${usuarioCreado.id}`);
                    deleteReq.flush(null);
                  }
                });
              
              const updateReq = httpMock.expectOne(`${apiUrl}/usuarios/${usuarioCreado.id}`);
              updateReq.flush({ ...usuarioCreado, nombre: 'Test User Actualizado' });
            }
          });
          
          const createReq = httpMock.expectOne(`${apiUrl}/usuarios`);
          createReq.flush({ ...nuevoUsuario, id: 3, fechaCreacion: new Date() });
        }
      });

      const getReq = httpMock.expectOne(`${apiUrl}/usuarios`);
      getReq.flush(mockUsuarios);
    });
  });
});

