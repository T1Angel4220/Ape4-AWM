import { TestBed } from '@angular/core/testing';
import { UserService, Usuario } from './user.service';
import { of, throwError } from 'rxjs';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('CREATE', () => {
    it('should create a new user', (done) => {
      const nuevoUsuario = {
        nombre: 'Test User',
        email: 'test@example.com',
        telefono: '1234567890'
      };

      service.crearUsuario(nuevoUsuario).subscribe(usuario => {
        expect(usuario.id).toBeDefined();
        expect(usuario.nombre).toBe('Test User');
        expect(usuario.email).toBe('test@example.com');
        expect(usuario.fechaCreacion).toBeInstanceOf(Date);
        done();
      });
    });
  });

  describe('READ', () => {
    it('should get all users', (done) => {
      service.obtenerUsuarios().subscribe(usuarios => {
        expect(usuarios.length).toBeGreaterThan(0);
        expect(Array.isArray(usuarios)).toBe(true);
        done();
      });
    });

    it('should get user by id', (done) => {
      service.obtenerUsuarioPorId(1).subscribe(usuario => {
        expect(usuario).toBeDefined();
        expect(usuario.id).toBe(1);
        done();
      });
    });

    it('should return error for non-existent user', (done) => {
      service.obtenerUsuarioPorId(999).subscribe({
        next: () => fail('should have returned error'),
        error: (error) => {
          expect(error.message).toBe('Usuario no encontrado');
          done();
        }
      });
    });
  });

  describe('UPDATE', () => {
    it('should update an existing user', (done) => {
      const cambios = { nombre: 'Nombre Actualizado' };
      
      service.actualizarUsuario(1, cambios).subscribe(usuario => {
        expect(usuario.nombre).toBe('Nombre Actualizado');
        done();
      });
    });

    it('should return error when updating non-existent user', (done) => {
      service.actualizarUsuario(999, { nombre: 'Test' }).subscribe({
        next: () => fail('should have returned error'),
        error: (error) => {
          expect(error.message).toBe('Usuario no encontrado');
          done();
        }
      });
    });
  });

  describe('DELETE', () => {
    it('should delete an existing user', (done) => {
      service.eliminarUsuario(2).subscribe(result => {
        expect(result).toBe(true);
        done();
      });
    });

    it('should return error when deleting non-existent user', (done) => {
      service.eliminarUsuario(999).subscribe({
        next: () => fail('should have returned error'),
        error: (error) => {
          expect(error.message).toBe('Usuario no encontrado');
          done();
        }
      });
    });
  });
});

