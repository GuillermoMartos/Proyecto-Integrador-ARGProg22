import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpRequestsService } from 'src/services/http-requests.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass']
})
export class LandingPageComponent implements OnInit {
  title = 'Landing-Profiler-App';
  response:any;
  ngOnInit(): void {
  }

  registrationForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    repeatPassword: new FormControl(null, Validators.required),
  });

  constructor(private http: HttpRequestsService, private route:Router) {}

  registerUser() {
    if (
      this.registrationForm.get('password')?.value !==
      this.registrationForm.get('repeatPassword')?.value
    ){
      this.registrationForm.controls['password'].reset()
      this.registrationForm.controls['repeatPassword'].reset()
      Swal.fire("Passwords didn't match");
      return 
    }
    
    this.http
      .signUpUser(
        this.registrationForm.get('email')?.value,
        this.registrationForm.get('password')?.value,
        this.registrationForm.get('name')?.value
      )
      .subscribe((response) => {
          this.response=response
          this.registrationForm.reset()
          if (this.response?.id==1) return Swal.fire("User successfuly registered","please login.");
          if (this.response?.id==0) return Swal.fire("Email already exist", "please access");
          return;
        });
  }

  visitor(){
    this.route.navigate(['/visitor']);
  }

}
