import { Car } from "./car.model";

export interface Job {
    id: string;
    jobdescription: string;
    car: Car ; 
    status: 'In-progress' | 'Completed';
  }
  