import { Component, Input, OnInit, } from '@angular/core';
import { HttpRequestsService } from 'src/services/http-requests.service';


@Component({
  selector: 'app-portfolio-home',
  templateUrl: './portfolio-home.component.html',
  styleUrls: ['./portfolio-home.component.sass']
})
export class PortfolioHomeComponent implements OnInit {
  @Input()user_logged:any;

  constructor( private http: HttpRequestsService ) {
    
  }

  
  ngOnInit() {
    this.http.send.subscribe(data=>{ 
      this.user_logged=data;
      })
  }

 

}
