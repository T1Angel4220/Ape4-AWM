import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, Usuario } from '../../services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioSeleccionado: Usuario | null = null;
  mostrarFormulario = false;
  modoEdicion = false;
  cargando = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.userService.obtenerUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        this.cargando = false;
      }
    });
  }

  crearUsuario(): void {
    this.usuarioSeleccionado = null;
    this.modoEdicion = false;
    this.mostrarFormulario = true;
  }

  editarUsuario(usuario: Usuario): void {
    this.usuarioSeleccionado = usuario;
    this.modoEdicion = true;
    this.mostrarFormulario = true;
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
      this.userService.eliminarUsuario(id).subscribe({
        next: () => {
          this.cargarUsuarios();
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
          alert('Error al eliminar el usuario');
        }
      });
    }
  }

  onFormularioCerrado(): void {
    this.mostrarFormulario = false;
    this.usuarioSeleccionado = null;
    this.cargarUsuarios();
  }
}

