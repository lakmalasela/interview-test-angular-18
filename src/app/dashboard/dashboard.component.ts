import { Component } from '@angular/core';
import { AddCarComponent } from '../add-car/add-car.component';
import { AddJobComponent } from '../add-job/add-job.component';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { CarService } from '../../services/car.service';
import { JobService } from '../../services/job.service';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AddCarComponent,AddJobComponent,TranslateModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
  totalCars$: Observable<number>;
  totalJobs$:Observable<number>;
  totalCars: number = 0;
  totalJobs : number = 0;
  constructor(private carService: CarService,private jobService:JobService) {
    this.totalCars$ = this.carService.cars$.pipe(
      map(cars => cars.length)
    );

    this.totalJobs$ = this.jobService.jobs$.pipe(
      map(jobs => jobs.length)
    );
  }

  ngOnInit(): void {
    this.carService.cars$.subscribe(cars => {
      this.totalCars = cars.length;
    });

    this.jobService.jobs$.subscribe(jobs => {
      this.totalJobs = jobs.length;
    });
  }

}
