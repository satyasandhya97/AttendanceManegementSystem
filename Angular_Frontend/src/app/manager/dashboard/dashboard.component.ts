import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { StaffService } from '../../services/staff.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  staffForm!: FormGroup;
  isModalVisible = false;
  staffList: any[] = [];
  isEditing: boolean = false; 
  selectedStaffId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private StaffService: StaffService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.staffForm = this.fb.group({
      staffName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });
    this.loadStaff() 
  }
  
 addShift(staffItem: any){
  console.log(staffItem);
  sessionStorage.setItem("roster_data", JSON.stringify(staffItem));
  this.router.navigate([`/manager/roster`,staffItem._id])
 }

  loadStaff() {
    this.StaffService.GetStaff().subscribe(
      (res: any) => {
        this.staffList = res.staff;
        console.log('Staff data fetched:',  this.staffList);
      },
      (err: any) => {
        console.log('Error fetching staff:', err);
      }
    );
  }

  openModal() {
    this.isModalVisible = true;
    this.staffForm.reset();
    this.isEditing = false; 
    this.selectedStaffId = null;
  }

  closeModal() {
    this.isModalVisible = false;
    this.staffForm.reset();
  }

  deleteStaff(staffId: string): void {
    swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this staff member!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.StaffService.DeleteStaff(staffId).subscribe({
          next: (response : any) => {
            swal.fire('Deleted!', 'Staff has been deleted.', 'success');
            console.log('Staff deleted successfully:', response);
          },
          error: (error : any) => {
            swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
            console.error('Error deleting staff:', error);
          },
        });
      } else {
        swal.fire('Cancelled', 'The staff member was not deleted.', 'info');
      }
    });
    this.loadStaff() 
  }
  

  editStaff(staff: any) {
    this.isModalVisible = true;
    this.isEditing = true; 
    this.selectedStaffId = staff._id;
    this.staffForm.patchValue({
      staffName: staff.staffName,
      email: staff.email,
      phone: staff.phone
    });
  }

 submitStaff() {
  if (this.staffForm.invalid) {
    return;
  }
  const staffData = this.staffForm.value;
  if (this.isEditing && this.selectedStaffId) {
    this.StaffService.UpdateStaff(staffData , this.selectedStaffId).subscribe(
      (res: any) => {
        swal.fire({
          icon: 'success',
          title: 'Staff Updated Successfully',
        });
        this.isModalVisible = false;
        this.loadStaff(); 
      },
      (err: any) => {
        swal.fire({
          icon: 'error',
          title: 'Staff Update Failed',
          text: err.error?.message || 'Something went wrong.'
        });
      }
    );
  } else {
    this.StaffService.AddStaff(staffData).subscribe(
      (res: any) => {
        swal.fire({
          icon: 'success',
          title: 'Staff Added Successfully',
        });
        this.isModalVisible = false;
        this.loadStaff(); 
      },
      (err: any) => {
        swal.fire({
          icon: 'error',
          title: 'Staff Addition Failed',
          text: err.error?.message || 'Something went wrong.'
        });
      }
    );
  }
}
}
