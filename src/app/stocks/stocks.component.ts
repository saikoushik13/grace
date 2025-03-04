import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { StocksHeaderComponent } from '../stocks-header/stocks-header.component';
import { ChartComponent } from '../chart/chart.component';
import { StockService } from '../services/stock.service';
import { TableComponent } from '../table/table.component';
import { RouterModule } from '@angular/router';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    SidebarComponent, 
    TopbarComponent, 
    StocksHeaderComponent, 
    ChartComponent, 
    TableComponent, 
    RouterModule, 
    HighchartsChartModule,
    MatIcon
  ],
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockSummary: any[] = [];
  stockOrdersChartData: any[] = [];
  stockList: any[] = [];
  filteredStockList: any[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;

  // Sorting & Filtering
  sortColumn: string = 'customentName';
  sortDirection: 'asc' | 'desc' = 'asc';
  searchQuery: string = '';

  // Inventory Tabs: Default is 'all'
  selectedInventoryTab: string = 'all';

  // Modal properties (for create/edit task)
  showEditModal = false;
  isEditMode = false;
  editData: any = {};

  // Full-screen toggle for inventory table
  showFullTable = false;

  // Highcharts
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    // Fetch stock summary
    this.stockService.getStockSummary().subscribe(data => {
      this.stockSummary = data;
    });

  
    // Fetch stock inventory list
    this.stockService.getStockOrdersChartData().subscribe(data => {
      this.stockList = data || [];
      this.filteredStockList = [...this.stockList];
      this.applySearchFilter();
    });
  }

  // Highcharts configuration


  /* 🔹 Filtering and Sorting for Inventory */
  applySearchFilter(): void {
    const query = this.searchQuery.toLowerCase().trim();
    let tempList = this.stockList.filter(item =>
      item.customentName.toLowerCase().includes(query) ||
      item.product.toLowerCase().includes(query) ||
      item.cashier.toLowerCase().includes(query)
    );

    if (this.selectedInventoryTab !== 'all') {
      tempList = tempList.filter(item => item.status.toLowerCase() === this.selectedInventoryTab);
    }

    this.filteredStockList = tempList;
    this.applySorting();
    this.currentPage = 1;
  }

  applySorting(): void {
    this.filteredStockList.sort((a, b) => {
      const valA = (a as any)[this.sortColumn];
      const valB = (b as any)[this.sortColumn];
      return this.sortDirection === 'asc' ? (valA < valB ? -1 : 1) : (valA > valB ? -1 : 1);
    });
  }

  // Inventory Tab Filtering
  selectInventoryTab(tab: string): void {
    this.selectedInventoryTab = tab;
    this.applySearchFilter();
  }

  /* 🔹 Pagination Helpers */
  get totalPages(): number {
    return Math.ceil(this.filteredStockList.length / this.itemsPerPage);
  }

  get pagedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredStockList.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  /* 🔹 Full-Screen Table Toggle */
  toggleViewAll(): void {
    this.showFullTable = !this.showFullTable;
  }

  /* 🔹 Modal: Create New Task / Edit Task */
  openEditModal(item?: any): void {
    this.showEditModal = true;
    if (item) {
      this.isEditMode = true;
      this.editData = { ...item };
    } else {
      this.isEditMode = false;
      this.editData = {
        customentName: '',
        product: '',
        supplier: '',
        dateOfEntry: '',
        quantity: 0,
        price: 0,
        sellingPrice: 0,
        cashier: '',
        status: 'pending'
      };
    }
  }

  closeModal(): void {
    this.showEditModal = false;
  }

  saveData(): void {
    if (this.isEditMode) {
      const idx = this.stockList.findIndex(s => 
        s.customentName === this.editData.customentName && s.product === this.editData.product
      );
      if (idx !== -1) {
        this.stockList[idx] = this.editData;
      }
    } else {
      this.stockList.unshift(this.editData);
    }
    this.filteredStockList = [...this.stockList];
    this.applySearchFilter();
    this.showEditModal = false;
  }
}
