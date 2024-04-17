import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';

export const routes: Routes = [
  { path: '', title: 'Main page', component: MainPageComponent },
  { path: 'users', title: 'Users page', component: UsersPageComponent },
];
