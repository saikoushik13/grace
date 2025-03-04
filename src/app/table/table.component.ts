import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  imports:[CommonModule],
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() columns: string[] = []; // Table column headers
  @Input() data: any[] = []; // Data for the table
  @Input() enablePagination: boolean = false; // Enable or disable pagination
  @Input() currentPage: number = 1; // Current page number
  @Output() pageChange = new EventEmitter<number>(); // Emits new page number

  itemsPerPage: number = 10; // Items per page

  constructor() {}

  ngOnInit(): void {}

  /** 📌 Get Total Pages Based on Data Length */
  get totalPages(): number {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }

  /** 📌 Get Paginated Data for the Current Page */
  get pagedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.data.slice(startIndex, startIndex + this.itemsPerPage);
  }

  /** 📌 Emits the Page Change Event */
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page); // Emits page number
    }
  }
}
