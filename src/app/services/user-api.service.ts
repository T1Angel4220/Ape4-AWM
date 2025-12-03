import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private apiUrl = 'http://localhost:3000/api'; // URL base de la API

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios desde la API
  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);
  }

  // Obtener un usuario por ID
  obtenerUsuarioPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuarios/${id}`);
  }

  // Crear un nuevo usuario
  crearUsuario(usuario: Omit<Usuario, 'id' | 'fechaCreacion'>): Observable<Usuario> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Usuario>(`${this.apiUrl}/usuarios`, usuario, { headers });
  }

  // Actualizar un usuario existente
  actualizarUsuario(id: number, usuario: Partial<Usuario>): Observable<Usuario> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Usuario>(`${this.apiUrl}/usuarios/${id}`, usuario, { headers });
  }

  // Eliminar un usuario
  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/usuarios/${id}`);
  }
}

