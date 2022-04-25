import { Component, Input, OnInit, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpRequestsService } from 'src/services/http-requests.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-portfolio-home',
  templateUrl: './portfolio-home.component.html',
  styleUrls: ['./portfolio-home.component.css']
})
export class PortfolioHomeComponent implements OnInit {
  user_logged:any;
  user_edit: boolean = false;

  constructor( private http: HttpRequestsService, private router:Router ) {
    this.user_logged=this.router.getCurrentNavigation()?.extras.state
  }

  
  portfolioForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    position: new FormControl,
    phone: new FormControl,
    about: new FormControl(null, [Validators.maxLength(255)]),
    adress: new FormControl,
    password: new FormControl(null, [Validators.required]),
  });
  
  ngOnInit() {
    this.http.send.subscribe(data=>{ 
      this.user_logged=data;
      })
  }

  edit(){
    this.user_edit=!this.user_edit
    this.portfolioForm.setValue({
      name: this.user_logged.name,
      email: this.user_logged?.email,
      position: this.user_logged?.position,
      phone: this.user_logged?.phone,
      about: this.user_logged?.about,
      adress: this.user_logged?.adress,
      password: null
    });
  }

  close(){
    this.user_edit=!this.user_edit
  }


  async update(){
    let update = {
      user_id: sessionStorage.getItem("userIdPortfolio"),
      name: this.portfolioForm.get('name')?.value,
      position: this.portfolioForm.get('position')?.value,
      about: this.portfolioForm.get('about')?.value,
      adress: this.portfolioForm.get('adress')?.value,
      phone: this.portfolioForm.get('phone')?.value,
      email: this.portfolioForm.get('email')?.value,
      password: this.portfolioForm.get('password')?.value,
      img: this.user_logged.img,
    }

    if(this.portfolioForm.get('password')?.value!==this.user_logged.password){ 
      Swal.fire("Password wrong","must access password for user info change");
      this.portfolioForm.controls['password'].reset()
      return;
    }
    this.http.updatecurrentUser(update).subscribe()

    await Swal.fire({
      title: 'Updating user... ⏳',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })
    this.http.loginUser(this.portfolioForm.get('email')?.value, this.portfolioForm.get('password')?.value).subscribe(response=>this.http.send.emit(response))
    await this.ngOnInit();
    this.user_edit=!this.user_edit
  }


 

}
