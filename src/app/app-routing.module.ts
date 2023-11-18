import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './core/components';
import { HomeComponent } from './pages';

const routes: Routes = [
  {
    path: '',redirectTo:'/home',pathMatch:'full'
  },

  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        path: 'home',
        component:HomeComponent
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/register/register.component').then((m) => m.RegisterComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
