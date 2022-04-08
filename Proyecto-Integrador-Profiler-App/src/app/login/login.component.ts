import { Component, OnInit } from '@angular/core';
import { HttpRequestsService } from 'src/services/http-requests.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})

export class LoginComponent implements OnInit {
  constructor(private http: HttpRequestsService, private route: Router ) {}
  user:boolean=false;
  ngOnInit(): void {}

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
      .subscribe((response) => {
        if (response){
          this.user=true;
          this.http.send.emit(response)
          return this.route.navigate(['/portfolio']);}
        else return alert("email or password incorrect, please try again later");
      });
    this.loginForm.reset();
  }

  logout(){
    alert("funcion en desarrollo")
  }
}
