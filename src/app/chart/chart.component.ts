import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular'; // Highcharts Module
import { MatMenuModule } from '@angular/material/menu'; // Import MatMenuModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    CommonModule, 
    HighchartsChartModule, 
    MatMenuModule, // ✅ Add MatMenuModule
    MatButtonModule // ✅ Add MatButtonModule
  ],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() chartTitle: string = 'Analysis';
  @Input() jsonPath: string = '';// Accept JSON path as input
  @Input() activeFieldName: string = 'numOfActiveOrders'; // Default field name for active orders
  @Input() inactiveFieldName: string = 'numOfInactiveOrders'; // Default field name for inactive orders

  highcharts = Highcharts;
  chartOptions: Highcharts.Options | undefined;
  data: any[] = [];
  filterOption: string = 'last6months';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get<any[]>(this.jsonPath).subscribe(response => {
      this.data = response;
      this.updateChart();
    });
  }

  updateChart() {
    const now = new Date();
    let startDate: Date = new Date();

    // Determine start date based on filter
    if (this.filterOption === 'lastWeek') {
      startDate.setDate(now.getDate() - 7);
    } else if (this.filterOption === 'lastMonth') {
      startDate.setMonth(now.getMonth() - 1);
    } else if (this.filterOption === 'lastQuarter') {
      startDate.setMonth(now.getMonth() - 3);
    } else if (this.filterOption === 'last6months') {
      startDate.setMonth(now.getMonth() - 6);
    }

    // Filter data based on start date
    const filteredData = this.data.filter(item => new Date(item.date) >= startDate);

    let categories: string[] = [];
    let activeOrders: number[] = [];
    let inactiveOrders: number[] = [];

    if (this.filterOption === 'lastWeek') {
      // ✅ Group by Day (Mon, Tue, ...)
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const grouped: Record<string, { active: number; inactive: number }> = {};

      filteredData.forEach(item => {
        const dayName = dayNames[new Date(item.date).getDay()];
        if (!grouped[dayName]) grouped[dayName] = { active: 0, inactive: 0 };
        grouped[dayName].active += item[this.activeFieldName];
        grouped[dayName].inactive += item[this.inactiveFieldName];
      });

      categories = dayNames;
      activeOrders = categories.map(day => grouped[day]?.active || 0);
      inactiveOrders = categories.map(day => grouped[day]?.inactive || 0);

    } else if (this.filterOption === 'lastMonth') {
      // ✅ Group by Day (Feb 1, Feb 2, ...)
      const grouped: Record<string, { active: number; inactive: number }> = {};

      filteredData.forEach(item => {
        const day = new Date(item.date).getDate().toString();
        if (!grouped[day]) grouped[day] = { active: 0, inactive: 0 };
        grouped[day].active += item[this.activeFieldName];
        grouped[day].inactive += item[this.inactiveFieldName];
      });

      categories = Object.keys(grouped).sort((a, b) => parseInt(a) - parseInt(b));
      activeOrders = categories.map(day => grouped[day].active);
      inactiveOrders = categories.map(day => grouped[day].inactive);

    } else if (this.filterOption === 'lastQuarter' || this.filterOption === 'last6months') {
      // ✅ Group by Month
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const grouped: Record<string, { active: number; inactive: number }> = {};

      filteredData.forEach(item => {
        const dateObj = new Date(item.date);
        const month = monthNames[dateObj.getMonth()];
        if (!grouped[month]) grouped[month] = { active: 0, inactive: 0 };
        grouped[month].active += item[this.activeFieldName];
        grouped[month].inactive += item[this.inactiveFieldName];
      });

      categories = monthNames.filter(month => grouped[month]); // Get correct order
      activeOrders = categories.map(month => grouped[month].active);
      inactiveOrders = categories.map(month => grouped[month].inactive);
    }

    this.chartOptions = {
      chart: { type: 'column' },
      title: { text: this.chartTitle },
      xAxis: { categories },
      yAxis: { title: { text: 'Orders' } },
      series: [
        { name: 'Active Orders', type: 'column', data: activeOrders, color: '#1565c0' },
        { name: 'Inactive Orders', type: 'spline', data: inactiveOrders, color: '#9fa8da' }
      ],
      legend: { enabled: true }
    };
  }

  changeFilter(option: string) {
    this.filterOption = option;
    this.updateChart();
  }
}
