import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCarComponent } from './add-car/add-car.component';
import { AddJobComponent } from './add-job/add-job.component';
export const routes: Routes = [

    {path: 'dashboard',component: DashboardComponent},

  {path: 'add-car',component: AddCarComponent},
  {path: 'add-job',component: AddJobComponent},
//   {path: '**',component: PageNotFoundComponent},



  
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  export const routingComponents = [DashboardComponent,AddCarComponent,AddJobComponent]
