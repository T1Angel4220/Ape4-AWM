import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login on form submit', () => {
    authService.login.and.returnValue(of(true));
    component.email = 'test@example.com';
    component.password = 'password123';

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('should navigate to home on successful login', () => {
    authService.login.and.returnValue(of(true));
    component.email = 'test@example.com';
    component.password = 'password123';

    component.onSubmit();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should show error message on failed login', () => {
    authService.login.and.returnValue(of(false));
    component.email = 'test@example.com';
    component.password = 'wrong';

    component.onSubmit();

    expect(component.errorMessage).toBe('Credenciales inválidas');
  });
});

