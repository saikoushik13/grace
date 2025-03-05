import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
@Component({
  selector: 'app-shipment-tracking',
  templateUrl: './shipment-tracking.component.html',
  imports: [CommonModule, FormsModule, GoogleMapsModule],
  styleUrls: ['./shipment-tracking.component.css']
})
export class ShipmentTrackingComponent {
  displayMap = false;
  center: google.maps.LatLngLiteral = { lat: 19.0760, lng: 72.8777 }; // Default center: Mumbai
  zoom = 5;
  originMarker: google.maps.LatLngLiteral | null = null;
  destinationMarker: google.maps.LatLngLiteral | null = null;

  /** 📌 Show Map When Clicking on "View" */
  viewShipment(shipmentId: string): void {
    this.displayMap = true;

    // ✅ Predefined Fixed Locations for Shipments
    const shipmentLocations: { [key: string]: { origin: google.maps.LatLngLiteral, destination: google.maps.LatLngLiteral } } = {
      "SH-001": { origin: { lat: 28.7041, lng: 77.1025 }, destination: { lat: 19.0760, lng: 72.8777 } }, // Delhi to Mumbai
      "SH-002": { origin: { lat: 18.5204, lng: 73.8567 }, destination: { lat: 12.9716, lng: 77.5946 } }, // Pune to Bangalore
      "SH-003": { origin: { lat: 22.5726, lng: 88.3639 }, destination: { lat: 28.7041, lng: 77.1025 } }  // Kolkata to Delhi
    };

    // ✅ Set markers based on Shipment ID
    if (shipmentId in shipmentLocations) {
      this.originMarker = shipmentLocations[shipmentId].origin;
      this.destinationMarker = shipmentLocations[shipmentId].destination;
      this.center = this.originMarker; // Set map center to origin
      this.zoom = 5;
    }
  }
}

