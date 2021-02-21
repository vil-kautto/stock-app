import { Component, OnInit, ViewChild } from '@angular/core';
import { StockData } from '../../assets/models/StockData';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../services/DataService'


@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  dataSet: StockData[] = [];

  constructor( private dataSource: DataService ) {}  

  ngOnInit() {
    this.dataSource.currentDataSet.subscribe(dataSet => this.dataSet.push(dataSet));
  }

  validList: StockData[] = []
  datePicked() {
    console.log("date was fetched: " + this.range.value.start + ", " + this.range.value.end);
    this.validList = this.filterByDateRange(this.range.value.start, this.range.value.end);
  }

  bullTrend: string = "jaa";
  
  // counts continious 
  calculateBullTrend(dataSet: StockData[]) {
    console.log("bulltrend");
    let continuedBulls: number = 0;

    this.bullTrend = " " + continuedBulls;
    
  }

  sortByVolumeAndPrice() {
    
  }

  tradeVolume: string = "jbb";
  sigPriceChange: string = "jdd";
  // dates with highest volume and sig price change
  significantChanges() {
    this.sortByVolumeAndPrice();
  }

  sma: string = "jcc";
  calculateSMA() {

  }

  filterByDateRange(startDate:any, endDate:any) {
    console.log("Filtering data")
    let filteredData: StockData[] = [];
    for (let i = 1; i < this.dataSet.length; i++) {  
      let stockDate = new Date(this.dataSet[i].date);
      if (stockDate >= startDate && stockDate <= endDate) {
        filteredData.push(this.dataSet[i]);
      }
    }
    console.log(filteredData);
    return filteredData;
  }

}
