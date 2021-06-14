import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CryptoControllerService } from 'src/app/components-services/crypto/crypto-controller.service';
import IcryptoDetails from "src/app/components-services/crypto/IcryptoDetails.model";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip, ChartComponent
} from "ng-apexcharts";
import { dataSeries } from "./data-series"

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

};

export type chartSparkline = {
  date: Date;
  vale: number;
};

@Component({
  selector: 'app-crypto-details',
  templateUrl: './crypto-details.component.html',
  styleUrls: ['./crypto-details.component.scss']
})
export class CryptoDetailsComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  details = new Array<IcryptoDetails>();
  id: string
  name: string;
  description: any;
  thumbnail: any;
  ath: number;
  market_rank: number;
  home_page: any;
  subbreddit: any;
  current_price: number;
  chart_data = new Array<chartSparkline>();


  constructor(
    private route: ActivatedRoute,
    private cryptoService: CryptoControllerService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCryptoDetails();
  }

  getDateForChartData() {
    // sparkline data is for 7 days
    //get the date, in format "2014-01-02" and increment each day after 24 steps,
    //store in chart_data array under date and iterate 168 times
  }

  getCryptoDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("route id: ", id)
    this.cryptoService.getCryptoDetails(id).subscribe((data) => {
      this.details = data;
      console.log(this.details);
      this.assignApiData(this.details);
    });
  }

  assignApiData(val: any) {
    this.chart_data = val.market_data.sparkline_7d.price;
    this.id = val.id;
    this.name = val.name;
    this.description = val.description.en;
    this.thumbnail = val.image.thumb;
    this.ath = val.market_data.ath.usd;
    this.market_rank = val.market_cap_rank;
    this.home_page = val.links.homepage[0];
    this.subbreddit = val.links.subreddit_url;
    this.current_price = val.market_data.current_price.usd;

    console.log(this.chart_data)

    //this.insertParagraphOnDescription(this.cryptoDescription);

    // Description set on HTML from here, needed as description must be inserted as html because of links embedded
    let desc = document.getElementById("description")
    desc.insertAdjacentHTML('beforebegin', this.description);

    this.initChartData()
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

  public initChartData(): void {
    let ts2 = 1484418600000;
    let dates = [];
    for (let i = 0; i < 120; i++) {
      ts2 = ts2 + 86400000;
      dates.push([ts2, dataSeries[1][i].value]);
    }

    this.chartOptions = {
      series: [
        {
          name: this.name,
          data: dates
        }
      ],
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: "zoom"
        }
      },
      dataLabels: {
        enabled: false,
        style: {
          colors: [ '#E91E63', '#9C27B0']
        }
      },
      markers: {
        size: 0
      },
      title: {
        //text: "Stock Price Movement",
        align: "left",
        style: {
          color: "#ffffff"
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          },
          style: {
            colors: "#ffffff"
          }
        },
        title: {
          text: "Price",
          style: {
            color: "#ffffff"
          }
        }
      },
      xaxis: {
        type: "datetime",
        labels: {
          style: {
            colors: "#ffffff"
          }
        }
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          }
        },
        style: {

        }
      }
    }
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
