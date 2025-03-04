import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { ChartComponent } from '../chart/chart.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AnalysisService } from '../services/analysis.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    TopbarComponent,
    ChartComponent,
    PieChartComponent,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(
    public AnalysisService: AnalysisService,
  ) {}
  selectedTaskFilter: 'Online' | 'Offline' = 'Online'; // Default filter

  changeTaskFilter(filter: 'Online' | 'Offline') {
    this.selectedTaskFilter = filter;
  }
}
