import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from "moment";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip, ChartComponent, ApexTheme
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  fill: ApexFill;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  theme: ApexTheme;
};

@Component({
  selector: 'app-crypto-details',
  templateUrl: './crypto-details.component.html',
  styleUrls: ['./crypto-details.component.scss']
})
export class CryptoDetailsComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  details: any;
  id: string
  name: string;
  description: any;
  thumbnail: any;
  ath: number;
  market_rank: number;
  home_page: any;
  subreddit: any;
  current_price: number;
  price_change_24hr: number;
  sparkline_values: any;
  sparkline_dates = [];
  sparkline_data = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // data set from resolver
    this.details = this.route.snapshot.data;
    this.assignApiData(this.details);
  }

  private assignApiData(val: any) {
    this.sparkline_values = val?.details.market_data.sparkline_7d.price;
    this.id = val?.details.id;
    this.name = val?.details.name;
    this.description = val.details.description.en;
    this.thumbnail = val?.details.image.thumb;
    this.ath = val?.details.market_data.ath.usd;
    this.market_rank = val?.details.market_cap_rank;
    this.home_page = val?.details.links.homepage[0];
    this.subreddit = val?.details.links.subreddit_url;
    this.current_price = val?.details.market_data.current_price.usd;
    this.price_change_24hr = val?.details.market_data.price_change_percentage_24h;

    if(this.description === "") {
      this.description = this.name + " has no overview information available."
    }

    // Description set on HTML from here, needed as description must be inserted as html because of links embedded
    let desc = document.getElementById("description")
    desc.insertAdjacentHTML('afterbegin', this.description);

    this.getDateTime();
  }

  insertParagraphOnDescription(val: any) {
    let i = 0;
    // count the number of times a period occurs
    let periodMatchCount = val.match(/\./g);
    console.log(periodMatchCount)

    for(i; i < periodMatchCount.length; i++) {
      let percentMatch = Math.round((i / val.length * 100)* 100) / 100

      if(percentMatch < 0.50 && percentMatch > 0.45)
      {
        var test = this.description.match(/\./g).split('.');
        console.log(test)
        console.log("insert br here")
        console.log(i)
      }
    }
  }

  private getDateTime() {
    // gets the time by hour for 7 days
    let day = moment()
    for(let i = 0; i < 168; i++) {
      this.sparkline_dates.push(day.add(1,'hours').format())
    }
    // combines the sparkline arrays into a 2d array for the chart to use
    for (var i = 0; i < this.sparkline_dates.length; i++) {
      this.sparkline_data.push( [ this.sparkline_dates[i], this.sparkline_values[i] ] );
    }
    this.initChartData();
  }

  private initChartData(): void {
    this.chartOptions = {
      series: [
        {
          name: this.name,
          data: this.sparkline_data
        }
      ],
      chart: {
        type: "area",
        stacked: false,
        height: 250,
        zoom: {
          type: "x",
          enabled: false,
          autoScaleYaxis: true
        },
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
        //text: "7 day price (hourly)",
        align: "left",
      },
      theme: {
        mode: "dark"
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
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
        title: {
          //text: "Data from: " + moment(this.sparkline_dates[0]).format("DD/MM/YY, hh:mma") +
          //  " to " + moment(this.sparkline_dates[167]).format("DD/MM/YY, hh:mma")
        },
      },
      tooltip: {
        x: {
          show: false,
        },
        shared: false,
        y: {
          formatter: function (val) {
            return "$" + val.toLocaleString()
          }
        },
      }
    }
  }
}
