import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StockData } from '../../assets/models/StockData';

@Injectable({
    providedIn: 'root'
  })
export class DataService {
    private dataSource = new BehaviorSubject<StockData>(new StockData);
    currentDataSet = this.dataSource.asObservable();

    constructor() {  };

    updateData(data: StockData) {
        console.log(data);
        this.dataSource.next(data);
    }
}