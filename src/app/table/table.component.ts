// import { Component, Input, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
// import { CarService } from '../../services/car.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-table',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './table.component.html',
//   styleUrls: ['./table.component.css']
// })
// export class TableComponent implements OnInit {
//   @Input() data$: Observable<any[]> = new Observable();
//   @Input() showAttributes: { [key: string]: string } = {}; 

//   currentPage = 1;
//   pageSize = 5;
//   totalItems = 0;
//   paginatedData: any[] = [];  // Declare paginatedData

//   constructor(private carService: CarService) {}

//   ngOnInit(): void {
//     this.loadData();
//   }

//   get attributeKeys(): string[] {
//     return Object.keys(this.showAttributes);
//   }

//   loadData(): void {
//     if (this.data$) {
//       this.data$.subscribe(data => {
//         this.totalItems = data.length;
//         this.paginateData(data);
//       });
//     }
//   }

//   paginateData(data: any[]): void {
//     const startIndex = (this.currentPage - 1) * this.pageSize;
//     const endIndex = startIndex + this.pageSize;
//     this.paginatedData = data.slice(startIndex, endIndex);
//   }

//   onPageChange(page: number): void {
//     if (page > 0 && page <= Math.ceil(this.totalItems / this.pageSize)) {
//       this.currentPage = page;
//       this.loadData(); // Reload data based on the new page
//     }
//   }

//   hasNextPage(): boolean {
//     return this.currentPage < Math.ceil(this.totalItems / this.pageSize);
//   }
// }

import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() data$: Observable<any[]> = new Observable();
  @Input() showAttributes: { [key: string]: string } = {};


  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  paginatedData: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadData();
  }

  get attributeKeys(): string[] {
    return Object.keys(this.showAttributes);
  }

  loadData(): void {
    if (this.data$) {
      this.data$.subscribe(data => {
        this.totalItems = data.length;
        this.paginateData(data);
      });
    }
  }

  paginateData(data: any[]): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = data.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    if (page > 0 && page <= Math.ceil(this.totalItems / this.pageSize)) {
      this.currentPage = page;
      this.loadData(); // Reload data based on the new page
    }
  }

  hasNextPage(): boolean {
    return this.currentPage < Math.ceil(this.totalItems / this.pageSize);
  }
}

