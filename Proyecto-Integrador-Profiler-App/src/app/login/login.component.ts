import { Component, OnInit } from '@angular/core';
import { HttpRequestsService } from 'src/services/http-requests.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpRequestsService) {}


  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });

  login() {
    this.http
      .loginUser(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value
      )
      .subscribe((response) =>{
        console.log(response)
        if(response.login) return
        else return alert(response.message)
      })
      this.loginForm.reset()
  }
}
