import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EducationServiceService } from 'src/services/education-service.service';
import { HttpRequestsService } from 'src/services/http-requests.service';
import { JobServiceService } from 'src/services/job-service.service';
import { ProjectServiceService } from 'src/services/project-service.service';
import { SkillServiceService } from 'src/services/skill-service.service';

@Component({
  selector: 'app-no-log',
  templateUrl: './no-log.component.html',
  styleUrls: ['./no-log.component.css']
})

export class NoLogComponent implements OnInit {
  profile: any;
  @Output() education= new EventEmitter<any[]>();
  skill: any;
  project: any;
  job: any;
  loading: boolean = true;
  constructor(private route: ActivatedRoute, private http: HttpRequestsService, private eduService: EducationServiceService, private jobService: JobServiceService, private projectService: ProjectServiceService, private skillService: SkillServiceService) { }

  ngOnInit(): void {
    sessionStorage.clear()
    this.route.paramMap.subscribe(async (params: ParamMap) => {

      await this.http.visitProfile(params.get('id') || "").subscribe(async data => {
        this.profile = data;
        delete this.profile?.password;
        await this.eduService.brindarEducacionVisitante(this.profile?.user_id)
        await this.jobService.brindarJobVisitante(this.profile?.user_id)
        await this.projectService.brindarProjectVisitante(this.profile?.user_id)
        await this.skillService.brindarSkillVisitante(this.profile?.user_id)
      })
      this.loading = false;
    });
  }


 
}
