import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { AuthGuard } from './services/auth-guard.service';


const routes: Routes = [
  { path: '', loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule) },
  { path: '',canActivate: [AuthGuard], component: LayoutComponent, children:[
    {
      path: 'staff',
      loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule)
    },
    {
      path: 'manager',
      loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule)
    }
  ]},
  { path: '**', redirectTo: '/' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
