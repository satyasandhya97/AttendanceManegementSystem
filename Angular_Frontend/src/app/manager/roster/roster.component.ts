import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffService } from '../../services/staff.service';  
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css'],
})
export class RosterComponent implements OnInit {
  staffId: string | null = null;
  staff: any = {}; 
  shifts: any[] = []; 
  isModalVisible = false; 
  shiftForm!: FormGroup; 

  shiftTimings = ['Morning', 'Afternoon', 'Night'];
  shiftType = ['8AM-2PM', '3AM-10PM', '11AM-7PM'];
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(
    private route: ActivatedRoute,
    private staffService: StaffService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.staffId = params.get('id');
      if (this.staffId) {
        this.loadShifts(this.staffId)
      }
    });

    this.shiftForm = this.fb.group({
      Date:['', Validators.required],
      shiftTiming: ['', Validators.required],
      shiftType: ['', Validators.required],
      workingDay: ['', Validators.required],
    });
  }
  


  loadShifts(staffId: any): void {
    this.staffService.getAllRostersByStaff(staffId).subscribe(
      (shifts: any) => {
        this.shifts = shifts.rosters;
      },
      (err: any) => {
        console.error('Error fetching shifts:', err);
      }
    );
  }

  submitShift(): void {
    if (this.shiftForm.invalid) {
      return;
    }
    const shiftData = this.shiftForm.value;
    const shiftPayload = {
      staffId: this.staffId, 
      Date: shiftData.Date, 
      shiftTiming: shiftData.shiftTiming,
      shiftType: shiftData.shiftType,
      workingDays: shiftData.workingDay,
    };

    this.staffService.createRoster(shiftPayload).subscribe(
      (res: any) => {
        this.isModalVisible = false;  
        this.loadShifts(this.staffId);
      },
      (err: any) => {
        console.error('Error adding shift:', err);
      }
    );
    this.shiftForm.reset();
  }

  addShift(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

    deleteShift(ShiftId: string): void {
      swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this Shift!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.staffService.deleteRoster(ShiftId).subscribe({
            next: (response : any) => {
              swal.fire('Deleted!', 'Shift has been deleted.', 'success');
              this.loadShifts(this.staffId) 
            },
            error: (error : any) => {
              swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
            },
          });
        } else {
          swal.fire('Cancelled', 'The Shift was not deleted.', 'info');
        }
      });
      
    }
}
