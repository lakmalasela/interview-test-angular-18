import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Job } from '../app/models/job.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  
  private jobsSubject = new BehaviorSubject<Job[]>([]);

  jobs$ = this.jobsSubject.asObservable();

  constructor() {}

  // Get the current list of cars
  getJobs(): Job[] {
    return this.jobsSubject.getValue();
  }

  // Add a car to the list
  addJob(job: Job): void {
    const currentJobs = this.getJobs();
    this.jobsSubject.next([...currentJobs, job]);
    
  }

  // Get total number of cars
  getTotalJobs(): number {
    return this.getJobs().length;
  }

  fetchJobs(page: number = 1, pageSize: number = 10): void {
    // Simulate server-side pagination
    const allCars: Job[] = this.getAllJobs(); // Replace with actual API call
    this.jobsSubject.next(allCars);
  }

  fetchAllJobs(): Observable<Job[]> {
    // Simulate fetching all jobs
    const allJobs: Job[] = this.getAllJobs(); // Replace with actual API call
    return of(allJobs); // Return an observable
  }

  updateJob(updatedJob: Job): void {
    const currentJobs = this.getJobs();
    const updatedJobs = currentJobs.map(job => job.id === updatedJob.id ? updatedJob : job);
    this.jobsSubject.next(updatedJobs);
  }

  private getAllJobs(): Job[] {
    // Replace with actual data fetching logic

    return this.getJobs();
  }
}
