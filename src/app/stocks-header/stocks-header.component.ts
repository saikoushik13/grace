import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-stocks-header',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatButtonModule, MatIconModule],
  templateUrl: './stocks-header.component.html',
  styleUrls: ['./stocks-header.component.css']
})
export class StocksHeaderComponent {
  activeTab = 'Stocks Overview';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
