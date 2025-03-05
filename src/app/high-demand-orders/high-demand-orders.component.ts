import { Component, OnInit } from '@angular/core';
import { TableService } from '../services/table.service';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-high-demand-orders',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './high-demand-orders.component.html',
  styleUrl: './high-demand-orders.component.scss'
})
export class HighDemandOrdersComponent implements OnInit {
  "tableColumns": ["customentName", "product", "supplier", "dateOfEntry", "quantity", "price", "sellingPrice", "cashier", "status"];
  tableData: any[] = [];

  // Pagination Variables
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private tableService: TableService) {}

  ngOnInit(): void {

    this.tableData = [
      { "customentName": "John Doe", "product": "Milk", "supplier": "Dairyland", "dateOfEntry": "2025-02-24", "quantity": 50, "price": 2000, "sellingPrice": 2500, "cashier": "Brian O'Conner", "status": "Completed" },
      { "customentName": "Jane Smith", "product": "Rice", "supplier": "ABC Traders", "dateOfEntry": "2025-02-26", "quantity": 80, "price": 5000, "sellingPrice": 6000, "cashier": "Roman Pearce", "status": "Pending" },
      { "customentName": "Mia Toretto", "product": "Butter", "supplier": "Amul", "dateOfEntry": "2025-02-28", "quantity": 30, "price": 1500, "sellingPrice": 1800, "cashier": "Letty Ortiz", "status": "In-Transit" }
    ];
    this.tableService.getTableData('/assets/highdemand.json').subscribe({
      next: (data) => {
        this.tableData = data;
        console.log('Fetched High-Demand Orders:', this.tableData); // ✅ Debug Log
      },
      error: (err) => console.error('Error fetching high-demand orders:', err)
    });

  }

  /** 📌 Handles Page Change */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  /** 📌 Returns Total Pages for Pagination */
  get totalPages(): number {
    return Math.ceil(this.tableData.length / this.itemsPerPage);
  }

  /** 📌 Returns Data for the Current Page */
  get pagedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.tableData.slice(startIndex, startIndex + this.itemsPerPage);
  }
}

