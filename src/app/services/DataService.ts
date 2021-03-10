import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StockData } from '../../assets/models/stockData';

/**
 * DataService provides a way to share StockData between different components
 */
@Injectable({
    providedIn: 'root'
  })
export class DataService {
    /**
     * @ignore
     */
    private dataSource = new BehaviorSubject<StockData>(new StockData);
    /** 
     * @ignore
     */
    currentDataSet = this.dataSource.asObservable();

    /**
     * Adds a new StockData object to DataSet 
     * @param data new StockData object
     */
    updateData(data: StockData) {
        // console.log(data);
        this.dataSource.next(data);
    }
}