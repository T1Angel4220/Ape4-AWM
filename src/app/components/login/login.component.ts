import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  emailError: string = '';
  passwordError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Si ya está autenticado, redirigir al dashboard
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.emailError = '';
    this.passwordError = '';

    // Validaciones
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    
    this.authService.login(this.email, this.password).subscribe({
      next: (success) => {
        this.isLoading = false;
        if (success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Credenciales inválidas. Por favor, verifica tu email y contraseña.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Error al iniciar sesión. Por favor, intenta nuevamente.';
        console.error('Login error:', error);
      }
    });
  }

  private validateForm(): boolean {
    let isValid = true;

    // Validar email
    if (!this.email) {
      this.emailError = 'El email es requerido';
      isValid = false;
    } else if (!this.isValidEmail(this.email)) {
      this.emailError = 'Por favor, ingresa un email válido';
      isValid = false;
    }

    // Validar contraseña
    if (!this.password) {
      this.passwordError = 'La contraseña es requerida';
      isValid = false;
    } else if (this.password.length < 3) {
      this.passwordError = 'La contraseña debe tener al menos 3 caracteres';
      isValid = false;
    }

    return isValid;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onEmailBlur(): void {
    if (this.email && !this.isValidEmail(this.email)) {
      this.emailError = 'Por favor, ingresa un email válido';
    } else {
      this.emailError = '';
    }
  }

  onPasswordBlur(): void {
    if (this.password && this.password.length < 3) {
      this.passwordError = 'La contraseña debe tener al menos 3 caracteres';
    } else {
      this.passwordError = '';
    }
  }
}

