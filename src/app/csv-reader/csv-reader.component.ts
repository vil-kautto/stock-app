import { Component, OnInit, ViewChild } from '@angular/core';
import { StockData } from '../../assets/models/stockData';
import { DataService } from '../services/DataService'

/**
 * CSVReadercomponent generates data that is usable in other parts of the application
 * The created data is transferred via DataService
 */
@Component({
  selector: 'csv-reader',
  templateUrl: './csv-reader.component.html',
  styleUrls: ['./csv-reader.component.css']
})
export class CSVReaderComponent implements OnInit {

  /**
   * DataSet is list of stockdata -objects
   */
  dataSet: StockData[] = [];
  
  /**
   * fileUploaded shows html elements when the csv file is uploaded
   */
  fileUploaded: boolean = false;

  /**
   * the constructor declares the dataservice used for sharing data 
   */ 
  constructor( private dataSource: DataService ) {}

  /**
   * Connecting the CVS reader to Datasource for sharing the stockdata between components 
   */
  ngOnInit() {
    this.dataSource.currentDataSet.subscribe(dataSet => this.dataSet.push(dataSet));
  }
   
  /**
   * Finds a html component tagged csvReader 
   */
  @ViewChild('csvReader') csvReader: any;
  
  /**
   * UploadListener hanles any events fired by the file upload button 
   * @param $event 
   */
  uploadListener($event: any): void {  
    let files = $event.srcElement.files;  
  
    // Checking the included file is in correct format
    if (this.isCSV(files[0])) {  
      //this.fileUploaded = true;
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      // Loading, parsing and creation of the dataset
      reader.onload = () => {  
        let csvData = reader.result;  
        let textData = (<string>csvData).split(/\r\n|\n/);  
        let valueCount = this.getHeaderCount(textData);  
        this.buildDataSet(textData, valueCount);  
      };  
  
      // Log errors during reading to console
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };  
  
      // An alert is displayed upon finding incorrect file type
    } else {  
      alert("Please upload a valid .csv file.");  
      this.resetUpload();  
    }  
  }  
  
  /**
   * buildDataSet creates an item out of value arrays and returns all the data points in one array
   * @param textData List of values for one data point
   * @param valueCount Number of values per data piece
   * @returns a fully featured dataset
   */
  buildDataSet(textData: string[], valueCount: number) {  
    for (let i = 1; i < textData.length; i++) {  
      let currentLine = (<string>textData[i]).split(',');  
      if (currentLine.length == valueCount) {  
        let csvItem: StockData = new StockData();  
        csvItem.date = new Date(currentLine[0].trim());  
        csvItem.close = currentLine[1].trim().slice(1);  
        csvItem.volume = currentLine[2].trim();  
        csvItem.open = currentLine[3].trim().slice(1);  
        csvItem.high = currentLine[4].trim().slice(1);  
        csvItem.low = currentLine[5].trim().slice(1);  
        csvItem.change = (Number.parseFloat(csvItem.high) - Number.parseFloat(csvItem.low)).toFixed(3);
        this.dataSource.updateData(csvItem);  
      }  
    }   
  }  
  
  /**
   * Simple file extension check
   * @param file 
   * @returns a boolean based on the file's extension
   */
  isCSV(file: any) {  
    return file.name.endsWith(".csv");  
  }  
  
  /**
   * getheadercount simply counts the number of headers in order to display data correctlly
   * @param textData
   * @returns the number of values in an array
   */
  getHeaderCount(textData: string[]) {  
    let headers = (<string>textData[0]).split(',');
    return headers.length;
  }  
  
  /**
   * FileReset is fired after an error in file upload. Resets variables related to file upload.
   */
  resetUpload() {  
    this.csvReader.nativeElement.value = "";  
    this.dataSet = [];
    this.fileUploaded = false;
  }  
}
