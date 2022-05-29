import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NoLogComponent } from './no-log/no-log/no-log.component';
import { PathErrorComponent } from './path-error/path-error.component';
import { PortfolioHomeComponent } from "./portfolio-home/portfolio-home.component";
import { VisitorComponentComponent } from './visitor/visitor-component/visitor-component.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'portfolio', component: PortfolioHomeComponent },
  { path: 'visit/:id', component: NoLogComponent },
  { path: 'visitor', component: VisitorComponentComponent },
  { path: '**', component: PathErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
