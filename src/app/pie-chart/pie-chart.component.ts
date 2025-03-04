import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { ShipmentService } from '../services/shipment.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule,MatMenuModule],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @Input() chartTitle: string = 'Statistics';
  @Input() filterKey: string = 'connection'; 
  @Input() filterValue: string = ''; 

  highcharts = Highcharts;
  chartOptions: Highcharts.Options | undefined;
  data: any[] = [];
  selectedFilter: string = 'last6months'; // Default filter

  constructor(private shipmentService: ShipmentService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.shipmentService.getShipmentData().subscribe(response => {
      console.log(`📊 Loaded Data for ${this.chartTitle}:`, response);
      this.data = response;
      this.updateChart();
    });
  }

  /** ✅ Add `changeFilter()` method to update the selected filter **/
  changeFilter(filter: string) {
    console.log(`📌 Changing Pie Chart Filter to: ${filter}`);
    this.selectedFilter = filter;
    this.updateChart();
  }

  updateChart() {
    if (!this.data.length) {
      console.warn(`⚠ No data available for ${this.chartTitle}`);
      return;
    }

    const normalizedFilterValue = this.filterValue.toLowerCase();
    const filteredData = this.data.filter(item => 
      item[this.filterKey] && item[this.filterKey].toLowerCase() === normalizedFilterValue
    );

    console.log(`✅ Filtered Data for ${this.chartTitle}:`, filteredData);

    if (!filteredData.length) {
      console.warn(`⚠ No matching data for ${this.chartTitle} with ${this.filterKey} = ${this.filterValue}`);
      return;
    }

    const taskCounts: Record<string, number> = {};

    filteredData.forEach(item => {
      if (!taskCounts[item.task]) {
        taskCounts[item.task] = 0;
      }
      taskCounts[item.task] += 1;
    });

    const seriesData = Object.keys(taskCounts).map(task => ({
      name: task,
      y: taskCounts[task]
    }));

    const totalTasks = seriesData.reduce((sum, item) => sum + item.y, 0);

    this.chartOptions = {
      chart: { type: 'pie' },
      title: { text: `Total: ${totalTasks}` },
      tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: { enabled: true, format: '<b>{point.name}</b>: {point.percentage:.1f} %' }
        }
      },
      series: [{ name: this.filterValue, type: 'pie', data: seriesData }]
    };
  }
}
