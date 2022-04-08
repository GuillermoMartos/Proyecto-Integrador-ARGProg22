import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpRequestsService } from 'src/services/http-requests.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass']
})
export class LandingPageComponent implements OnInit {
  title = 'Landing-Profiler-App';
  ngOnInit(): void {
  }

  registrationForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    repeatPassword: new FormControl(null, Validators.required),
  });

  constructor(private http: HttpRequestsService) {}

  registerUser() {
    if (
      this.registrationForm.get('password')?.value !==
      this.registrationForm.get('repeatPassword')?.value
    ){
      this.registrationForm.controls['password'].reset()
      this.registrationForm.controls['repeatPassword'].reset()
      return alert("Passwords didn't match");
    }
    
    this.http
      .signUpUser(
        this.registrationForm.get('email')?.value,
        this.registrationForm.get('password')?.value,
        this.registrationForm.get('name')?.value
      )
      .subscribe((response) => {

        alert("done, pero quiero poder mnadarme cosas desde la API, con String se rompe el parser")});
      
      this.registrationForm.reset()
  }

}
