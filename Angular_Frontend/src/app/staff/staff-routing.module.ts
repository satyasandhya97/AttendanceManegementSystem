import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftComponent } from './shift/shift.component';
import { StaffAttandanceComponent } from './staff-attandance/staff-attandance.component';

const routes: Routes = [
  { path: 'shift' , component: ShiftComponent},
  { path: 'staff-attendance/:id', component: StaffAttandanceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
