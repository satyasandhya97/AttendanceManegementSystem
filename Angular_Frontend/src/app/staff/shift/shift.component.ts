import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffService } from '../../services/staff.service';  
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.css']
})
export class ShiftComponent implements OnInit {
  staffId: any;
  staffDetails: any;
  
  constructor(
    private route: ActivatedRoute,
    private staffService: StaffService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const staffDetails = JSON.parse(localStorage.getItem('Details') || '{}');
    this.staffId = staffDetails.staff._id;
  
    console.log("Staff ID from localStorage:", this.staffId);
    if (this.staffId) {
      this.loadShifts(this.staffId);
    } else {
      console.error("Staff ID not found in localStorage");
    }
  }

  loadShifts(staffId: any): void {
    this.staffService.getStaffById(staffId).subscribe(
      (res: any) => {
        this.staffDetails = res;  
        console.log('Staff Shifts:', this.staffDetails.rosterDetails);
      },
      (error: any) => {
        console.error('Error loading staff shifts:', error);
      }
    );
  }
  AddAttendance(shift : any){
    console.log("---", shift)
    this.router.navigate([`/staff/staff-attendance`,shift._id])
  }
 
}
