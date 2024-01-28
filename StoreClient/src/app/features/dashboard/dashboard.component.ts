import {Component} from '@angular/core';
import {NgChartsModule} from "ng2-charts";
import {ChartConfiguration, ChartOptions} from "chart.js";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgChartsModule
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  lineColor1 = '#0E9F6E';
  lineColor2 = '#eeeee4';

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],

    datasets: [
      {
        data: [ 40, 55, 31, 55, 60, 61, 40, 62, 56, 58, 59, 62 ],
        tension: 0.5,
        label: 'Purchases',
        borderColor: this.lineColor1,
        pointBackgroundColor: this.lineColor1
      },

      {
        data: [ 44, 36, 40, 51, 44, 58, 38, 29, 47, 52, 49, 53 ],
        tension: 0.5,
        label: 'Purchases',
        borderColor: this.lineColor2,
        pointBackgroundColor: this.lineColor2
      },
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,

    scales: {
      x: {
        grid: {
          display: false
        }
      },

      y: {
        grid: {
          display: false
        }
      }
    }
  };
}
