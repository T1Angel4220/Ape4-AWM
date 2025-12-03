import { TestBed } from '@angular/core/testing';
import { AuthService, User } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully with valid credentials', (done) => {
    service.login('test@example.com', 'password123').subscribe(result => {
      expect(result).toBe(true);
      expect(service.isLoggedIn()).toBe(true);
      done();
    });
  });

  it('should fail login with empty credentials', (done) => {
    service.login('', '').subscribe(result => {
      expect(result).toBe(false);
      expect(service.isLoggedIn()).toBe(false);
      done();
    });
  });

  it('should logout and clear user data', () => {
    service.login('test@example.com', 'password123').subscribe();
    expect(service.isLoggedIn()).toBe(true);
    
    service.logout();
    expect(service.isLoggedIn()).toBe(false);
    expect(service.getCurrentUser()).toBeNull();
  });

  it('should return current user after login', (done) => {
    service.login('test@example.com', 'password123').subscribe(() => {
      const user = service.getCurrentUser();
      expect(user).not.toBeNull();
      expect(user?.email).toBe('test@example.com');
      done();
    });
  });
});

