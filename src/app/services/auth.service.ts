import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface User {
  id: number;
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'currentUser';
  private readonly AUTH_KEY = 'isAuthenticated';

  constructor() {
    // Restaurar sesión desde localStorage al iniciar
    // No es necesario hacer nada aquí ya que los métodos leen directamente de localStorage
  }

  login(email: string, password: string): Observable<boolean> {
    // Simulación de autenticación con delay para mostrar loading
    // En producción, esto sería una llamada HTTP real
    if (email && password && this.isValidEmail(email)) {
      const user: User = {
        id: Date.now(), // ID único basado en timestamp
        email: email,
        name: this.extractNameFromEmail(email)
      };
      
      // Simular delay de red
      return new Observable<boolean>(observer => {
        setTimeout(() => {
          this.saveUserToStorage(user);
          this.setAuthenticated(true);
          observer.next(true);
          observer.complete();
        }, 1000); // 1 segundo de delay
      });
    }
    
    return of(false);
  }

  logout(): void {
    this.clearStorage();
  }

  getCurrentUser(): User | null {
    return this.loadUserFromStorage();
  }

  isLoggedIn(): boolean {
    return this.getAuthenticated();
  }

  private loadUserFromStorage(): User | null {
    const userStr = localStorage.getItem(this.STORAGE_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  private saveUserToStorage(user: User): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  private getAuthenticated(): boolean {
    return localStorage.getItem(this.AUTH_KEY) === 'true';
  }

  private setAuthenticated(value: boolean): void {
    if (value) {
      localStorage.setItem(this.AUTH_KEY, 'true');
    } else {
      localStorage.removeItem(this.AUTH_KEY);
    }
  }

  private clearStorage(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.AUTH_KEY);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private extractNameFromEmail(email: string): string {
    const namePart = email.split('@')[0];
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  }
}

