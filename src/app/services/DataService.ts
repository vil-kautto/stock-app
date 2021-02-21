import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StockData } from '../../assets/models/StockData';

@Injectable({
    providedIn: 'root'
  })
  /**
   * DataService provides a way to share StockData between different components
   */
export class DataService {
    private dataSource = new BehaviorSubject<StockData>(new StockData);
    currentDataSet = this.dataSource.asObservable();

    constructor() {  };

    /**
     * Adds a new StockData object to DataSet 
     * @param data new StockData object
     */
    updateData(data: StockData) {
        // console.log(data);
        this.dataSource.next(data);
    }
}