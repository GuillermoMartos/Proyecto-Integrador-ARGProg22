import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpRequestsService } from 'src/services/http-requests.service';

@Component({
  selector: 'app-no-log',
  templateUrl: './no-log.component.html',
  styleUrls: ['./no-log.component.css']
})

export class NoLogComponent implements OnInit {
  profile:any;
  loading:boolean=true;
  constructor(private route:ActivatedRoute, private http:HttpRequestsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      
      this.http.visitProfile(params.get('id')||"").subscribe(data=>{
        this.profile=data;
        delete this.profile?.password;
        sessionStorage.setItem("userIdPortfolio", this.profile?.user_id||"no-user")
        this.loading=false;
      })

    });


   
    
  }

}
