import { Component, OnInit, ViewChild } from '@angular/core';
import { StockData } from '../../assets/models/StockData';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../services/DataService'
import { SMAData } from '../../assets/models/SMAData';

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

  /**
   * Dataservice is injected into the component during initialization so we can access the csv-reader's data
   */
  dataSet: StockData[] = [];

  constructor( private dataSource: DataService ) {}  

  ngOnInit() {
    this.dataSource.currentDataSet.subscribe(dataSet => this.dataSet.push(dataSet));
  }

  /**
   * datePicked is firing when user clicks the 'fetch data' -button
   * Starts the execution sequence
   */
  dateEntered: boolean = false;
  filteredList: StockData[] = [];
  startDate: any;
  endDate: any;
  datePicked() {
    this.dateEntered = true;
    console.log("date was fetched: " + this.range.value.start + ", " + this.range.value.end);
    this.filteredList = this.filterByDateRange(this.range.value.start, this.range.value.end);
    this.filteredList.reverse();
    this.calculateBullTrend();
    this.calculateChanges();
    this.calculateSMA(this.range.value.start, this.range.value.end);
  }

  /**
   * FilterByDateRange filters the displayed & analyzed stock items by date and range
   */
  filterByDateRange(startDate: any, endDate: any) {
    // gather all the values that fit into the date range
    console.log("Filtering data")
    let filteredData: StockData[] = [];
    for (let i = 1; i < this.dataSet.length; i++) {
      console.log(this.dataSet);
      let stockDate = new Date(this.dataSet[i].date);
      if (stockDate >= startDate && stockDate <= endDate) {
        filteredData.push(this.dataSet[i]);
      }
    }
    // print the array upon finishing
    console.log(filteredData);
    return filteredData;
  }

  
  /**
   * CalculateBullTrend calculates the longest growth streak in days and displays the highest streak date in the page
   */
  bullTrend: number = 0;
  bullingStock: any;
  bullStart: any;
  calculateBullTrend() {
    console.log("bulltrend");
    // going through the list and counting consecutive bulls
    let consecutiveBulls: number = 0;
    for (let i = 1; i < this.filteredList.length; i++) {
      console.log(i);
      if (this.filteredList[i].close > this.filteredList[i-1].close) {
        consecutiveBulls++;
        console.log("bulls: " + consecutiveBulls);
      // displayed data is updated upon longer steak is done, reset after update
      } else if (consecutiveBulls > this.bullTrend) {
        this.bullTrend = consecutiveBulls;
        this.bullingStock = new Date(this.filteredList[i].date);
        this.bullStart = new Date(this.filteredList[i].date);
        this.bullStart.setDate(this.bullingStock.getDate() - consecutiveBulls);
        console.log("bear, longest bull: " + consecutiveBulls);
        consecutiveBulls = 0;
      // reset when there is no bulls
      } else {
        consecutiveBulls = 0;
        console.log("bear");
      }
    }
  }

  /**
  * Sorts data on two basis: first based on their volume, secondly by the change in the price
  */
  sortedList: StockData[] = [];
  calculateChanges() {
    console.log("Sig Changes");
    this.sortedList = this.filteredList;
    this.sortedList.sort(function(a,b) {
      if (a.volume !== b.volume) {
        return b.volume - a.volume;
      }
      else {
        return b.change - a.change;
      }
    });
  }

  /**
   * 
   */
  smaArray: SMAData[] = [];
  calculateSMA(startDate: any, endDate: any) {
    console.log("sma calculation");
    for (let i = 1; i < this.dataSet.length; i++) {
      let stockDate = new Date(this.dataSet[i].date);
      if(stockDate >= startDate && stockDate <= endDate) {
        let closingPrice: number = 0;
        for (let j = 0; j < 5; j++) {
          closingPrice = closingPrice + Number.parseFloat(this.dataSet[i+j].close);
        }
        closingPrice = closingPrice / 5;
        let smaItem = new SMAData;
        smaItem.date = this.dataSet[i].date;
        smaItem.sma = closingPrice.toFixed(3);
        smaItem.change = ((closingPrice / this.dataSet[i].open - 1) * 100).toFixed(3);
        this.smaArray.push(smaItem);
      }
    }
    this.smaArray.sort(function(a,b) {
        return b.change - a.change;
      });
  }
}
