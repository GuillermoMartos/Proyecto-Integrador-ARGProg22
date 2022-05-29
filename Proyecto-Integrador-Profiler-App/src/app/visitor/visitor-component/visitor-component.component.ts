import { Component, OnInit } from '@angular/core';
import { HttpRequestsService } from 'src/services/http-requests.service';
// import {TableModule} from 'primeng/table';
// import { ButtonModule } from 'primeng';

@Component({
  selector: 'app-visitor-component',
  templateUrl: './visitor-component.component.html',
  styleUrls: ['./visitor-component.component.css']
})
export class VisitorComponentComponent implements OnInit {
  data: any;
  selectedUser: any = [];
  representatives: any = [];
  loading: boolean = true;

  constructor(private http: HttpRequestsService) { }

  ngOnInit(): void {
    this.data = this.http.getUserAsVisitor().subscribe(data => data.map(persona => {
      persona?.password ? persona.password = "key-protected" : null;
      this.data = data
    }))

  }


}
