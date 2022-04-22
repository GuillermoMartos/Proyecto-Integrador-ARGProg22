import { Component, OnInit } from '@angular/core';
import { HttpRequestsService } from 'src/services/http-requests.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
          sessionStorage.setItem("userIdPortfolio", response.user_id)
          this.route.navigate(['/portfolio']);}
        else{
          Swal.fire("Email or password incorrect, please try again");
        }
      });
    this.loginForm.reset();
  }
  

  logout(){
    sessionStorage.removeItem("userIdPortfolio")
    this.user=false;
    return this.route.navigate(['/']);
  }
}
