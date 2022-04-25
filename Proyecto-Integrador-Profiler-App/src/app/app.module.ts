import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { PortfolioHomeComponent } from './portfolio-home/portfolio-home.component';
import { PathErrorComponent } from './path-error/path-error.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { EducationPortfolioComponent } from './education-portfolio/education-portfolio.component';
import { JobPortfolioComponent } from './job-portfolio/job-portfolio.component';
import { SkillPortfolioComponent } from './skill-portfolio/skill-portfolio.component';
import { ProjectPortfolioComponent } from './project-portfolio/project-portfolio.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LandingPageComponent},
  { path: 'portfolio', component: PortfolioHomeComponent },
  { path: '**', component: PathErrorComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    PortfolioHomeComponent,
    PathErrorComponent,
    LandingPageComponent,
    EducationPortfolioComponent,
    JobPortfolioComponent,
    SkillPortfolioComponent,
    ProjectPortfolioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
