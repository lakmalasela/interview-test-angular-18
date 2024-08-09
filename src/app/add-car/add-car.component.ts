import { Component, OnInit,EventEmitter,Output,TemplateRef,ViewChild } from '@angular/core';
import { Car } from '../models/car.model'; 
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule,NgForm} from '@angular/forms';
import { CarService } from '../../services/car.service';
import { TableComponent } from '../table/table.component';

import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule,TableComponent],
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  car: Car = { id: '', chassisnumber: '', model: '', year: 0 };
  nextId: number = 1;
  cars$: Observable<Car[]> = of([]); // Initialize with an empty 
  totalCars = 0;

  @ViewChild('actions') actionsTemplate?: TemplateRef<any>; 

  // Confirmation box 
  showConfirmation: boolean = false;
  confirmationMessage: string = '';
  pendingCar: Car | null = null; // Store the job to add later
  carForm: NgForm | null = null; 

  carAttributes: { [key: string]: string } = {
    id: 'ID',
    chassisnumber: 'Chassis Number',
    model: 'Model',
    year: 'Year'
  };

  @Output() carAdded = new EventEmitter<Car>();

  constructor(private carService: CarService) {
    this.updateNextId();
  }

  ngOnInit(): void {
    this.updateCarId(); // Generate the initial ID
    this.cars$ = this.carService.cars$;

    this.carService.fetchAllCars(); // Ensure  have all cars loaded
    this.cars$.subscribe(cars => {
    this.totalCars = cars.length;
    });
  }

  private extractIdNumber(id: string): number {
    return parseInt(id.replace('C', ''), 10);
  }

  private updateNextId(): void {
    const cars = this.carService.getCars();
    if (cars.length > 0) {
      this.nextId = Math.max(...cars.map(car => this.extractIdNumber(car.id))) + 1;
    }
  }

  private generateId(): string {
    return `C${this.nextId.toString().padStart(9, '0')}`;
  }

  updateCarId() {
    this.car.id = this.generateId();
  }

  addCar(form: NgForm) {
    this.carForm = form; // Save form reference
    if (form.valid) {
      // Show confirmation box
      this.pendingCar = { ...this.car }; 
      this.confirmationMessage = 'Are you sure you want to add this car?';
      this.showConfirmation = true;
    }
  }

  confirmAddition() {
    if (this.pendingCar) {
      // Add the car
      this.carService.addCar(this.pendingCar);
      this.nextId++; // Increment ID counter

      // Reset the form and update ID for the next car
      this.resetForm();
      this.updateCarId();

      // Close the confirmation box
      this.closeConfirmation();
    }
  }

  resetForm() {
    if (this.carForm) {
      this.carForm.resetForm(); // Reset the form
    }
    this.pendingCar = null;
    this.showConfirmation = false;
  }

  closeConfirmation() {
    this.showConfirmation = false;
  }




}
