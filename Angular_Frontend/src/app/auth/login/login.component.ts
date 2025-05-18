import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logInForm!: FormGroup;
  selectedRole: string | null = null;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.logInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  selectRole(role: string): void {
  this.selectedRole = role;
}
  submitlogin(event : any) {
    event.preventDefault()
    const requestData = this.logInForm.value; 
    requestData.type =  this.selectedRole;

    if(requestData.type === 'staff'){
       this.loginService.StaffSignIn(requestData).subscribe(
        (res: any) => {
          if(res){
            localStorage.setItem("Details", JSON.stringify(res));
            const staffDetails = JSON.parse(localStorage.getItem("Details")!);
            console.log("staffDetails", staffDetails)
            this.router.navigate([`/staff/shift/`])
          }

        }
      );
    }else{
      this.loginService.logIn(requestData).subscribe(
        (res: any) => {
          localStorage.setItem("Details", JSON.stringify(res));
          this.router.navigate(['manager/dashboard']);
        },
        (err: any) => {
          swal.fire({
            icon: 'error',
            title: 'You are not authorized',
            text: 'Invalid credentials'
          });
        }
      );
    }

  }
}
