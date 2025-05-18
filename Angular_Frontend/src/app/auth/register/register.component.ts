import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  

  constructor(private fb: FormBuilder, private router: Router, private RegisterService : RegisterService) {}

  ngOnInit(){
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      type: ['', Validators.required]
    });
  }

  onSubmit(event : any) {
    event.preventDefault()
    const requestData = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      type: this.registerForm.value.type
    }
  
    this.RegisterService.Register(requestData).subscribe(
      (res: any) => {
        swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You can now log in!'
        });
        this.router.navigate(['/']); 
      },
      (err: any) => {
        swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: err.error?.message || 'Something went wrong.'
        });
      }
    );
  }
  
}
