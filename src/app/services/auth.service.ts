import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface User {
  id: number;
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;
  private isAuthenticated = false;

  login(email: string, password: string): Observable<boolean> {
    // Simulación de autenticación
    if (email && password) {
      this.currentUser = {
        id: 1,
        email: email,
        name: 'Usuario Demo'
      };
      this.isAuthenticated = true;
      return of(true);
    }
    return of(false);
  }

  logout(): void {
    this.currentUser = null;
    this.isAuthenticated = false;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}

