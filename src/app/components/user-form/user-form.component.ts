import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, Usuario } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  @Input() usuario: Usuario | null = null;
  @Input() modoEdicion: boolean = false;
  @Output() cerrado = new EventEmitter<void>();

  formData = {
    nombre: '',
    email: '',
    telefono: ''
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (this.usuario && this.modoEdicion) {
      this.formData = {
        nombre: this.usuario.nombre,
        email: this.usuario.email,
        telefono: this.usuario.telefono
      };
    }
  }

  guardar(): void {
    if (this.modoEdicion && this.usuario) {
      this.userService.actualizarUsuario(this.usuario.id, this.formData).subscribe({
        next: () => {
          this.cerrar();
        },
        error: (error) => {
          console.error('Error al actualizar usuario:', error);
          alert('Error al actualizar el usuario');
        }
      });
    } else {
      this.userService.crearUsuario(this.formData).subscribe({
        next: () => {
          this.cerrar();
        },
        error: (error) => {
          console.error('Error al crear usuario:', error);
          alert('Error al crear el usuario');
        }
      });
    }
  }

  cerrar(): void {
    this.cerrado.emit();
  }
}

