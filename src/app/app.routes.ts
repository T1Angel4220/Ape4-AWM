import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';

export const routes: Routes = [
  { path: 'usuarios', component: UserListComponent },
  { path: '', redirectTo: '/usuarios', pathMatch: 'full' }
];

