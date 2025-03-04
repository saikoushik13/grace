import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { ChartComponent } from '../chart/chart.component';
import { MatTabsModule } from '@angular/material/tabs';
import { StocksHeaderComponent } from '../stocks-header/stocks-header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [CommonModule, SidebarComponent, TopbarComponent, MatTabsModule,StocksHeaderComponent,RouterModule],
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent {}
