import { Component, Input, OnInit, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpRequestsService } from 'src/services/http-requests.service';


@Component({
  selector: 'app-portfolio-home',
  templateUrl: './portfolio-home.component.html',
  styleUrls: ['./portfolio-home.component.css']
})
export class PortfolioHomeComponent implements OnInit {
  user_logged:any;
  user_edit: boolean = false;

  constructor( private http: HttpRequestsService ) {
    
  }


  portfolioForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    position: new FormControl,
    phone: new FormControl,
    about: new FormControl,
    adress: new FormControl,
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
      adress: this.user_logged?.adress
    });
  }

  close(){
    this.user_edit=!this.user_edit
  }


 

}
