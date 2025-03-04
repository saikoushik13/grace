import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { ShipmentService } from '../services/shipment.service';
import { TableComponent } from '../table/table.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

export interface ShipmentItem {
  id: string;
  shipperName: string;
  ['phoneNo.']: string;
  status: string;
  product: string;
  supplier: string;
  quantity: number;
  price: number;
  deliveryDate: string;
  consignee: string;
  destination: string;
  connection: string;
  task: string;
}

@Component({
  selector: 'app-shipment-tracking',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GoogleMapsModule, // ✅ Google Maps Integration
    TableComponent,
    SidebarComponent,
    TopbarComponent
  ],
  templateUrl: './shipment-tracking.component.html',
  styleUrls: ['./shipment-tracking.component.css']
})
export class ShipmentTrackingComponent implements OnInit {
  shipmentTabs: string[] = ['all', 'in-transit', 'pending', 'completed', 'failed'];
  selectedTab: string = 'all';

  tableColumns: string[] = [
    'ID', 'Shipper Name', 'Phone No.', 'Status', 'Product', 'Supplier',
    'Quantity', 'Price', 'Delivery Date', 'Consignee', 'Destination', 'Task', 'Connection'
  ];

  shipmentsList: ShipmentItem[] = [];
  filteredShipments: ShipmentItem[] = [];

  // Pagination Variables
  currentPage: number = 1;
  itemsPerPage: number = 10;

  // Google Maps Variables
  displayMap = false;
  center: google.maps.LatLngLiteral = { lat: 28.7041, lng: 77.1025 };
  zoom = 5;
  originMarker: google.maps.LatLngLiteral | null = null;
  destinationMarker: google.maps.LatLngLiteral | null = null;

  constructor(private shipmentService: ShipmentService) {}

  ngOnInit(): void {
    this.shipmentService.getShipmentData().subscribe({
      next: (res) => {
        this.shipmentsList = res || [];
        this.applyTabFilter();
      },
      error: (err) => console.error('Error fetching shipments:', err)
    });
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
    this.applyTabFilter();
  }

  applyTabFilter(): void {
    if (this.selectedTab === 'all') {
      this.filteredShipments = [...this.shipmentsList];
    } else {
      this.filteredShipments = this.shipmentsList.filter(
        shipment => shipment.status.toLowerCase() === this.selectedTab
      );
    }
    this.currentPage = 1;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredShipments.length / this.itemsPerPage);
  }

  get pagedData(): ShipmentItem[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredShipments.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  viewShipment(): void {
    this.displayMap = true;
    this.originMarker = this.getRandomLatLng();
    this.destinationMarker = this.getRandomLatLng();
    this.center = this.originMarker;
    this.zoom = 5;
  }

  getRandomLatLng(): google.maps.LatLngLiteral {
    return { lat: 8 + Math.random() * 20, lng: 70 + Math.random() * 15 };
  }
}
