import {Component, OnDestroy, OnInit} from '@angular/core';
import {DjangoClientService} from '../../../services/django-client/django-client.service';
import {GameChart} from '../../../services/django-client/Classes';

@Component({
  selector: 'app-game-chart',
  templateUrl: './game-chart.component.html',
  styleUrls: ['./game-chart.component.css']
})
export class GameChartComponent implements OnInit, OnDestroy {
  interval: any;

  // lineChart
  lineChartData: Array<any>;
  lineChartLabels: Array<any>;
  updated = false;
  lineChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
        time: {
          unit: 'day'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          maxTicksLimit: 5
        },
        gridLines: {
          display: true
        }
      }],
    },
  };
  lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(2,117,216,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  lineChartLegend = false;
  lineChartType = 'line';


  constructor(private djangoClientService: DjangoClientService) {
  }

  ngOnInit() {
    this.getGameChart();
    this.interval = setInterval(() => {
      this.getGameChart();
    }, 3200000);
  }

  getGameChart() {
    return this.djangoClientService.getGameChart().subscribe((data: GameChart[]) => {
      this.lineChartLabels = data['days'].splice(-1 * 14);
      const _lineChartData: Array<any> = new Array(1);
      const counts = data['playerscount'].splice(-1 * 14);
      for (let i = 0; i < _lineChartData.length; i++) {
        _lineChartData[i] = {data: new Array(counts.length), label: 'Players'};
        for (let j = 0; j < counts.length; j++) {
          _lineChartData[i].data[j] = counts[j];
        }
      }
      this.lineChartLabels[this.lineChartLabels.length - 1] = 'Today';
      this.lineChartData = _lineChartData;
      this.updated = true;

    });
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

}
