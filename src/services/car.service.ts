import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Car } from '../app/models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private carsSubject = new BehaviorSubject<Car[]>([]);
  cars$ = this.carsSubject.asObservable();

  constructor() {}

  // Get the current list of cars
  getCars(): Car[] {
    return this.carsSubject.getValue();
  }

  // Add a car to the list
  addCar(car: Car): void {
    const currentCars = this.getCars();
    this.carsSubject.next([...currentCars, car]);
  }

  // Get total number of cars
  getTotalCars(): number {
    return this.getCars().length;
  }

  fetchCars(page: number = 1, pageSize: number = 10): void {
    // Simulate server-side pagination
    const allCars: Car[] = this.getAllCars(); // Replace with actual API call
    this.carsSubject.next(allCars);
  }

  fetchAllCars(): void {
    // Simulate fetching all cars
    const allCars: Car[] = this.getAllCars(); // Replace with actual API call
    this.carsSubject.next(allCars);
  }

  private getAllCars(): Car[] {
    // Replace with actual data fetching logic

    return this.getCars();
  }
}
