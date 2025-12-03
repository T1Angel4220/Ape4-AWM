import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  fechaCreacion: Date;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usuarios: Usuario[] = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      email: 'juan@example.com',
      telefono: '1234567890',
      fechaCreacion: new Date('2024-01-15')
    },
    {
      id: 2,
      nombre: 'María García',
      email: 'maria@example.com',
      telefono: '0987654321',
      fechaCreacion: new Date('2024-02-20')
    }
  ];
  private nextId = 3;

  // CREATE
  crearUsuario(usuario: Omit<Usuario, 'id' | 'fechaCreacion'>): Observable<Usuario> {
    const nuevoUsuario: Usuario = {
      ...usuario,
      id: this.nextId++,
      fechaCreacion: new Date()
    };
    this.usuarios.push(nuevoUsuario);
    return of(nuevoUsuario).pipe(delay(500));
  }

  // READ
  obtenerUsuarios(): Observable<Usuario[]> {
    return of([...this.usuarios]).pipe(delay(300));
  }

  obtenerUsuarioPorId(id: number): Observable<Usuario> {
    const usuario = this.usuarios.find(u => u.id === id);
    if (usuario) {
      return of(usuario).pipe(delay(300));
    }
    return throwError(() => new Error('Usuario no encontrado'));
  }

  // UPDATE
  actualizarUsuario(id: number, usuario: Partial<Usuario>): Observable<Usuario> {
    const index = this.usuarios.findIndex(u => u.id === id);
    if (index !== -1) {
      this.usuarios[index] = { ...this.usuarios[index], ...usuario };
      return of(this.usuarios[index]).pipe(delay(500));
    }
    return throwError(() => new Error('Usuario no encontrado'));
  }

  // DELETE
  eliminarUsuario(id: number): Observable<boolean> {
    const index = this.usuarios.findIndex(u => u.id === id);
    if (index !== -1) {
      this.usuarios.splice(index, 1);
      return of(true).pipe(delay(500));
    }
    return throwError(() => new Error('Usuario no encontrado'));
  }
}

