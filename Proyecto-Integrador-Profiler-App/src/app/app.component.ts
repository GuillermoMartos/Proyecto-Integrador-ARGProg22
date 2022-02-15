import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpRequestsService } from 'src/services/http-requests.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'Landing-Profiler-App';

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
      .subscribe((response) => console.warn(response));
      this.registrationForm.reset()
  }
}
