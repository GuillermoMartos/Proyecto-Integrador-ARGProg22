import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Landing-Profiler-App';
  
    registrationForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    repeatPassword: new FormControl(null, Validators.required),
  });
  


  registerUser(){
    if (this.registrationForm.get('password')?.value !== this.registrationForm.get('repeatPassword')?.value) return alert("Passwords didn't match")
  }
}
