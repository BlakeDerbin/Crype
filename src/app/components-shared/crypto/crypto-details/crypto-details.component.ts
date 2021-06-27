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
import { CryptoControllerService } from "~app/components-services/crypto/crypto-controller.service";
import { Subscription } from "rxjs";
import {NavbarComponent} from "~app/components/navbar/navbar.component";

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
  subscription: Subscription;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  description_folded = 'closed';
  expand_folded = 'Expand full description';
  icon_folded = 'expand_more';
  selected_currency: string;
  details: any;
  id: string;
  name: string;
  description: any;
  thumbnail: any;
  ath: number;
  market_rank: number;
  home_page: any;
  subreddit: any;
  current_price: number;
  currency_rate: number;
  price_change_24hr: number;
  sparkline_values: any;
  sparkline_dates = [];
  sparkline_data = [];

  constructor(private route: ActivatedRoute, private service: CryptoControllerService) {
    // gets current currency from service
    this.selected_currency = this.service.currentCurrency().toLowerCase();
    // on loading gets data from resolver, used to preload data
    this.details = this.route.snapshot.data['details'];
  }

  ngOnInit(): void {
    // subscribes to the event of currency change and sets price variables for selected currency
    this.subscription = this.service.selectedCurrency.subscribe(
      (currency: string) => {
        this.selected_currency = currency.toLowerCase();

        // set variables with updated currency
        this.current_price = this.details.market_data.current_price[this.selected_currency];
        this.ath = this.details.market_data.ath[this.selected_currency];
        this.price_change_24hr =  (this.details.market_data.price_change_24h_in_currency[this.selected_currency] / this.current_price) * 100;

        // setting converted sparkline data
        let currency_rate =  (this.details.market_data.current_price[this.selected_currency] / this.details.market_data.current_price['usd']).toFixed(2);
        let sparkline_data = this.details.market_data.sparkline_7d.price;
        let converted_sparkline_data = [];

        for (let key of Object.keys(sparkline_data)) {
          converted_sparkline_data.push(sparkline_data[key] * Number(currency_rate));
        }

        this.sparkline_values = converted_sparkline_data;
        this.sparklineDataBuilder(true);
      }
    );
    this.assignApiData(this.details);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // toggleFold function simply changes our folded property
  // between "open" and "closed"
  toggleFold(){
    this.description_folded = this.description_folded === 'open' ? 'closed' : 'open';
    this.expand_folded = this.description_folded === 'open' ? 'Close full description' : 'Expand full description';
    this.icon_folded = this.description_folded === 'open' ? 'expand_less' : 'expand_more';
  }

  private assignApiData(val: any) {
    // sets the currency conversion rate
    this.currency_rate = Number((val?.market_data.current_price[this.selected_currency] / val?.market_data.current_price['usd']).toFixed(2));

    // apply currency to sparkline data on load
    if (this.currency_rate === 1.00) {
      this.sparkline_values = val?.market_data.sparkline_7d.price
    } else {
      let arr = []
      for (let key of Object.keys(val?.market_data.sparkline_7d.price)) {
        arr.push(val?.market_data.sparkline_7d.price[key] * this.currency_rate);
      }
      this.sparkline_values = arr
    }

    this.id = val?.id;
    this.name = val?.name;
    this.description = val.description.en;
    this.thumbnail = val?.image.thumb;
    this.ath = val?.market_data.ath[this.selected_currency];
    this.market_rank = val?.market_cap_rank;
    this.home_page = val?.links.homepage[0];
    this.subreddit = val?.links.subreddit_url;
    this.current_price = val?.market_data.current_price[this.selected_currency];
    this.price_change_24hr = (val?.market_data.price_change_24h_in_currency[this.selected_currency] / this.current_price) * 100;

    if(this.description === "") {
      this.description = this.name + " has no overview information available."
    }

    // Description set on HTML from here, needed as description must be inserted as html because of links embedded
    let desc = document.getElementById("description")
    desc.insertAdjacentHTML('afterbegin', this.description);

    this.sparklineDataBuilder(false);
  }

  // WIP: will be used to break up description to a more readable format
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

  private sparklineDataBuilder(updateDataSeries: boolean) {
    // gets the time by hour for 7 days
    let day = moment()

    if(updateDataSeries) {
      // updates the chart
      // sets length to zero to empty array
      this.sparkline_data.length = 0

      // combines the sparkline arrays into a 2d array for the chart to use
      for (let i = 0; i < this.sparkline_dates.length; i++) {
        this.sparkline_data.push( [ this.sparkline_dates[i], this.sparkline_values[i] ] );
      }

      // update chart series data
      this.chartOptions.series = [{
        name: this.name,
        data: this.sparkline_data
      }]
    } else {
      // initializes the chart
      // sets up the 7 day sparkline dates array
      for(let i = 0; i < 168; i++) {
        this.sparkline_dates.push(day.subtract(1,'hours').format())
      }
      this.sparkline_dates.reverse()

      // combines the sparkline arrays into a 2d array for the chart to use
      for (let i = 0; i < this.sparkline_dates.length; i++) {
        this.sparkline_data.push( [ this.sparkline_dates[i], this.sparkline_values[i] ] );
      }

      this.initChartData();
    }
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
        background: '#212121',
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
