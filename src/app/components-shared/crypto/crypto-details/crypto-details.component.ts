import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from "moment";
import { animate, state, style, transition, trigger } from "@angular/animations";
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
  styleUrls: ['./crypto-details.component.scss'],
  animations : [
    // animations set for the description expansion
    trigger('panelState', [
      state('closed', style({ height: '100px', overflow: 'hidden' })),
      state('open', style({ height: '*' })),
      transition('closed <=> open', animate('300ms ease-in-out')),
    ]),
  ],
})
export class CryptoDetailsComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  description_folded = 'closed';
  expand_folded = 'Expand full description'
  icon_folded = 'expand_more'

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

  constructor(private route: ActivatedRoute) {
    // on loading gets data from resolver, used to preload data
    this.details = this.route.snapshot.data['details'];
  }

  ngOnInit(): void {
    this.assignApiData(this.details);
  }

  // toggleFold function simply changes our folded property
  // between "open" and "closed"
  toggleFold(){
    this.description_folded = this.description_folded === 'open' ? 'closed' : 'open';
    this.expand_folded = this.description_folded === 'open' ? 'Close full description' : 'Expand full description';
    this.icon_folded = this.description_folded === 'open' ? 'expand_less' : 'expand_more';
  }

  private assignApiData(val: any) {
    this.sparkline_values = val?.market_data.sparkline_7d.price;
    this.id = val?.id;
    this.name = val?.name;
    this.description = val.description.en;
    this.thumbnail = val?.image.thumb;
    this.ath = val?.market_data.ath.usd;
    this.market_rank = val?.market_cap_rank;
    this.home_page = val?.links.homepage[0];
    this.subreddit = val?.links.subreddit_url;
    this.current_price = val?.market_data.current_price.usd;
    this.price_change_24hr = val?.market_data.price_change_percentage_24h;

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
