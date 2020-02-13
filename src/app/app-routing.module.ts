import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { SuccessViewComponent } from './views/success-view/success-view.component';
import { FailureViewComponent } from './views/failure-view/failure-view.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeViewComponent
  },
  {
    path: 'success/:planet/:time', component: SuccessViewComponent
  },
  {
    path: 'failure', component: FailureViewComponent
  }, {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
