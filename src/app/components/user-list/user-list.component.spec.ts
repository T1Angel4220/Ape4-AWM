import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService, Usuario } from '../../services/user.service';
import { of, throwError } from 'rxjs';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: jasmine.SpyObj<UserService>;

  const mockUsuarios: Usuario[] = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      email: 'juan@example.com',
      telefono: '1234567890',
      fechaCreacion: new Date('2024-01-15')
    }
  ];

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', [
      'obtenerUsuarios',
      'eliminarUsuario'
    ]);

    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService.obtenerUsuarios.and.returnValue(of(mockUsuarios));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    expect(userService.obtenerUsuarios).toHaveBeenCalled();
    expect(component.usuarios.length).toBeGreaterThan(0);
  });

  it('should delete user when confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    userService.eliminarUsuario.and.returnValue(of(true));
    userService.obtenerUsuarios.and.returnValue(of([]));

    component.eliminarUsuario(1);

    expect(userService.eliminarUsuario).toHaveBeenCalledWith(1);
  });

  it('should not delete user when not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    component.eliminarUsuario(1);

    expect(userService.eliminarUsuario).not.toHaveBeenCalled();
  });
});

