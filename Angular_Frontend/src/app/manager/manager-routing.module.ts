import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { RosterComponent } from './roster/roster.component';

const routes: Routes = [
  { path:'dashboard' , component: DashboardComponent},
  { path: 'attendance', component: AttendanceComponent},
  { path: 'roster/:id', component: RosterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
