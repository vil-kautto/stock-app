import { Component, OnInit } from '@angular/core';
import { StockData } from '../../assets/models/stockData';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../services/DataService'
import { SMAData } from '../../assets/models/SMAData';

/**
 * TrackerComponent Keeps track of Stockdata and Displays data upon data updates
 */
@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
  /**
   * this formgroup is used by the date picker in the .html file
   */
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  /**
   * dataSet is used for storing the data given by DataService
   */
  dataSet: StockData[] = [];

   /**
   * Dataservice is injected into the component during initialization so we can access the csv-reader's data
   */
  constructor( private dataSource: DataService ) {}  
/**
 * Subscribing to the Datasource in order to get updates to the Stockdata
 */
  ngOnInit() {
    this.dataSource.currentDataSet.subscribe(dataSet => this.dataSet.push(dataSet));
  }

  /**
   * dateEntered turns true when the user gives the date range
   */
  dateEntered: boolean = false;

  /**
   * FilteredList contains all stockdata that fit the given date range 
   */
  filteredList: StockData[] = [];

  /**
   * startDate contains the start of the date range
   */
  startDate: Date = new Date;

   /**
   * endDate contains the start of the date range
   */
  endDate: Date = new Date;

  /**
   * datePicked is firing when user clicks the 'fetch data' -button
   * Starts the execution sequence
   */
  datePicked() {
    this.dateEntered = true;
    console.log("date was fetched: " + this.range.value.start + ", " + this.range.value.end);
    this.filteredList = this.filterByDateRange(this.range.value.start, this.range.value.end);
    this.calculateBullTrend();
    this.calculateChanges();
    this.calculateSMA(this.range.value.start, this.range.value.end);
  }

  /**
   * FilterByDateRange filters the displayed & analyzed stock items by date and range
   */
  filterByDateRange(startDate: any, endDate: any) {
    // gather all the values that fit into the date range
    let filteredData: StockData[] = [];
    for (let i = 1; i < this.dataSet.length; i++) {
      console.log(this.dataSet);
      let stockDate = new Date(this.dataSet[i].date);
      if (stockDate >= startDate && stockDate <= endDate) {
        filteredData.push(this.dataSet[i]);
      }
    }
    // print the array before returning
    console.log(filteredData)
    return filteredData.reverse();
  }

  
  /**
   * Bulltrend ounts the continius days of bulling trend
   */
  bullTrend: number = 0;

  /**
   * BullingStock keeps track of current date if the stock is bullish
   */
  bullingStock: Date = new Date;

  /**
   * bullStart is stores the data about bull trend start
   */
  bullStart: Date = new Date;
  
  /**
   * CalculateBullTrend calculates the longest growth streak in days and displays the highest streak date in the page
   */
  calculateBullTrend() {
    // going through the list and counting consecutive bulls
    let consecutiveBulls: number = 0;
    for (let i = 1; i < this.filteredList.length; i++) {
      console.log(i);
      if (this.filteredList[i].close > this.filteredList[i-1].close) {
        consecutiveBulls++;
      // displayed data is updated upon longer steak is done, reset after update
      } else if (consecutiveBulls > this.bullTrend) {
        this.bullTrend = consecutiveBulls;
        this.bullingStock = new Date(this.filteredList[i].date);
        this.bullStart = new Date(this.filteredList[i].date);
        this.bullStart.setDate(this.bullingStock.getDate() - consecutiveBulls);
        consecutiveBulls = 0;
      // reset when there is no bulls
      } else {
        consecutiveBulls = 0;
      }
    }
    console.log(this.bullTrend)
  }

  /**
  * SortedList contains Stock data Sorted by calculateChanges
  */
  sortedList: StockData[] = [];

   /**
  * Sorts data on two basis: first based on their volume, secondly by the change in the price
  */
  calculateChanges() {
    // adding the data in the date range to a new array and sorting it
    this.sortedList = this.filteredList;
    // the objects are sorted based on their volume and change in price
    this.sortedList.sort(function(a,b) {
      if (a.volume !== b.volume) {
        return b.volume - a.volume;
      }
      else {
        return b.change - a.change;
      }
    });
    console.log(this.sortedList)
  }

  /**
   * smaArray contains sorted SMAData objects
   */
  smaArray: SMAData[] = [];
  /**
   * calculates 5 day SMA 
   * Non filtered data is used in generating the sma 5 data points
   */
  calculateSMA(startDate: any, endDate: any) {
    //console.log("sma calculation");
    for (let i = 1; i < this.dataSet.length; i++) {
      let stockDate = new Date(this.dataSet[i].date);
      if(stockDate >= startDate && stockDate <= endDate) {
        // calculating the sma 5
        let closingPrice: number = 0;
        for (let j = 0; j < 5; j++) {
          closingPrice = closingPrice + Number.parseFloat(this.dataSet[i+j].close);
        }
        closingPrice = closingPrice / 5;
        // Creating a new object array
        let smaItem = new SMAData;
        smaItem.date = this.dataSet[i].date;
        smaItem.sma = closingPrice.toFixed(3);
        smaItem.change = ((closingPrice / this.dataSet[i].open - 1) * 100).toFixed(3);
        this.smaArray.push(smaItem);
      }
    }
    // sorting the list based on the percentage change in the stock's price
    this.smaArray.sort(function(a,b) {
        return b.change - a.change;
      });
    console.log(this.smaArray);
  }
}
