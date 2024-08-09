import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddCarComponent } from './add-car/add-car.component';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableComponent } from './table/table.component';
import { AddJobComponent } from './add-job/add-job.component';
import { TranslateService,TranslateModule } from '@ngx-translate/core';
import { PaginationComponent } from './pagination/pagination.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AddCarComponent,CommonModule,DashboardComponent,AddJobComponent,TranslateModule,TableComponent,PaginationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  translate: TranslateService = inject(TranslateService);
  title = 'Test_02';

  switchLanguage(lang:string){
    this.translate.use(lang);
  }


  constructor(private router: Router) {}

  navigateToAddCar() {
    this.router.navigate(['/add-car']);
  }

  navigateToAddJob() {
    this.router.navigate(['/add-job']);
  }
}
