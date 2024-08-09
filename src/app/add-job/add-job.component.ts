import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Job } from '../models/job.model';
import { Car } from '../models/car.model';
import { JobService } from '../../services/job.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, TableComponent],
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {

  job: Job = { id: '', jobdescription: '', car: {} as Car, status: 'In-progress' };
  nextId: number = 1;
  cars: Car[] = [];
  statusOptions: string[] = ['In-progress', 'Completed'];

  jobs$: Observable<any[]> = of([]); // Initialize with empty array
  totalJobs = 0;

  // Confirmation box 
  showConfirmation: boolean = false;
  confirmationMessage: string = '';
  pendingJob: Job | null = null; // Store the job to add later
  jobForm: NgForm | null = null; 

  jobAttributes: { [key: string]: string } = {
    id: 'ID',
    carId: 'Car Id',  // Changed to match the formatted data key
    jobdescription: 'Description',
    status: 'Status',

  };

  constructor(private jobService: JobService, private carService: CarService) {
    this.updateNextId();
  }

  ngOnInit(): void {
    this.carService.cars$.subscribe(cars => {
      this.cars = cars;
    });
    this.updateCarId(); // Generate the initial ID
    this.jobService.fetchAllJobs();
    this.jobs$ = this.jobService.jobs$.pipe(
      map(jobs => this.formatJobs(jobs)) // Format jobs data
    );

    // Optionally, log the data for debugging
    this.jobs$.subscribe(jobs => {
      console.log('Formatted Jobs data:', jobs);
      this.totalJobs = jobs.length;
    });
  }

  private extractIdNumber(id: string): number {
    return parseInt(id.replace('J', ''), 10);
  }

  private updateNextId(): void {
    const jobs = this.jobService.getJobs();
    if (jobs.length > 0) {
      this.nextId = Math.max(...jobs.map(job => this.extractIdNumber(job.id))) + 1;
    }
  }

  private generateId(): string {
    return `J${this.nextId.toString().padStart(9, '0')}`;
  }

  updateCarId() {
    this.job.id = this.generateId();
  }

  // Helper method to format jobs data
  private formatJobs(jobs: Job[]): any[] {
    return jobs.map(job => ({
      ...job,
      carId: job.car?.id || 'N/A'  // Add formatted car ID
    }));
  }

  addJob(form: NgForm) {
    this.jobForm = form; // Save form reference
    if (form.valid) {
      // Show confirmation box
      this.pendingJob = { ...this.job }; 
      this.confirmationMessage = 'Are you sure you want to add this job?';
      this.showConfirmation = true;
    }
  }

  confirmAddition() {
    if (this.pendingJob) {
      // Add the job
      this.jobService.addJob(this.pendingJob);
      this.nextId++; // Increment ID counter

      // Reset the form and update ID for the next job
      this.resetForm();
      this.updateCarId();

      // Close the confirmation box
      this.closeConfirmation();
    }
  }

  resetForm() {
    if (this.jobForm) {
      this.jobForm.resetForm(); // Reset the form
    }
    this.pendingJob = null;
    this.showConfirmation = false;
  }

  closeConfirmation() {
    this.showConfirmation = false;
  }


}

