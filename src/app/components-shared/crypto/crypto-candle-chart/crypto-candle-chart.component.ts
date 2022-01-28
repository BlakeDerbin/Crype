import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription } from "rxjs";
import { CryptoControllerService } from "~app/components-services/crypto/crypto-controller.service";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexTheme,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexTooltip
} from "ng-apexcharts";
import IcryptoOhlc from '~app/components-services/crypto/IcryptoOhlc.model';
import * as moment from 'moment';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  theme: ApexTheme;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-crypto-candle-chart',
  templateUrl: './crypto-candle-chart.component.html',
  styleUrls: ['./crypto-candle-chart.component.scss']
})
export class CryptoCandleChartComponent implements OnInit {
  @Input() cryptoID: string;
  subscription: Subscription;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  chartData: Array<any> = [];
  selected_currency: string;
  details: any;
  chartDays: number = 7;
  day_to_hours = [ [1,"24 hours"],[7,"7 days"],[14,"14 days"],[30,"30 days"],[90,"90 days"],[180,"6 months"], [365, "1 year"] ];
  chartDay =  this.day_to_hours[0];
  selected_chartDay;

  constructor(private service: CryptoControllerService) {
    // gets current currency from service
    this.selected_currency = this.service.currentCurrency().toLowerCase();
  }
  
  ngOnInit(): void {
    // default chart day on load is 7 days
    this.selected_chartDay = this.day_to_hours[1][1]
    // subscribes to the event of currency change and sets price variables for selected currency
    this.subscription = this.service.selectedCurrency.subscribe(
      (currency: string) => {
        this.selected_currency = currency.toLowerCase();
      }
    );
    this.fetchEndpointData(this.chartDays);
  }

  public changeChartDay(day: any) {
    this.selected_chartDay = day[1]
    this.fetchEndpointData(day[0])
  }

  private fetchEndpointData(chartDay) {
    this.service.getCoinOhlc(this.cryptoID, chartDay).subscribe(data => {
      console.log("fetching data...")
      this.buildCandlestickData(data);
    },
    error => {
      console.error("error: can't fetch endpoint data!")
    });
  }

  private buildCandlestickData(data_in) {
    let i = 0;
    let data_arr = []

    // builds chart data based on data pulled from crypto-controller
    for(i; i < data_in.length; i++) {
      data_arr.push({
        x: new Date(data_in[i][0]),
        y: [
          data_in[i][1],
          data_in[i][2],
          data_in[i][3],
          data_in[i][4]
        ]
      })
    }
    this.chartBuilder(data_arr)
  }

  public chartBuilder(arr_in) {
    // defines the chart options and uses data generated
    this.chartOptions = {
      series: [
        {
          name: "candle",
          data: arr_in
        }
      ],
      chart: {
        type: "candlestick",
        stacked: false,
        height: 450,
        zoom: {
          type: "x",
          enabled: false,
          autoScaleYaxis: true
        },
        background: '#0f141c',
        toolbar: {
          show: false,
          //autoSelected: "zoom"
        }
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0
      },
      title: {
        text: this.chartDays + " day price",
        align: "left",
      },
      theme: {
        mode: "dark",
        palette: "palette6"
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0,
          inverseColors: true,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return "$" + val.toLocaleString();
          },
        },
        title: {
          //text: "Price",
        }
      },
      xaxis: {
        type: "datetime",
        //title: {
        //  text: "Data from: " + moment(this.chartData[0]).format("DD/MM/YY, hh:mma") +
        //    " to " + moment(this.chartData[42]).format("DD/MM/YY, hh:mma")
        //},
      },
      tooltip: {
        x: {
          show: true,
        },
        shared: false,
        y: {
          formatter: function (val) {
            return "$" + val.toLocaleString()
          }
        },
      }
    };
  }

  public generateDayWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([baseval, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  }
}