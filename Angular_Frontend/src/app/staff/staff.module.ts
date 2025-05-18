import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffRoutingModule } from './staff-routing.module';
import { ShiftComponent } from './shift/shift.component';
import { StaffAttandanceComponent } from './staff-attandance/staff-attandance.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
  declarations: [
    ShiftComponent,
    StaffAttandanceComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    ReactiveFormsModule,
    WebcamModule
  ]
})
export class StaffModule { }
