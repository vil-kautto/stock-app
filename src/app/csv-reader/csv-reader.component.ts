import { Component, ViewChild} from '@angular/core';
import { stockData } from '../../assets/models/stockData';

@Component({
  selector: 'csv-reader',
  templateUrl: './csv-reader.component.html',
  styleUrls: ['./csv-reader.component.css']
})

export class CSVReaderComponent {

  public dataSet: stockData[] = [];  
  @ViewChild('csvReader') csvReader: any;  
  
  /**
   * UploadListener hanles any events fired by the file upload button 
   * @param $event 
   */
  uploadListener($event: any): void {  
    let files = $event.srcElement.files;  
  
    // Checking the included file is in correct format
    if (this.isCSV(files[0])) {  
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      // Loading, parsing and creation of the dataset
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
        let valueCount = this.getHeaderArray(csvRecordsArray);  
        this.dataSet = this.buildDataSet(csvRecordsArray, valueCount.length);  
      };  
  
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };  
  
      // An alert is displayed upon finding incorrect file type
    } else {  
      alert("Please import valid .csv file.");  
      this.resetUpload();  
    }  
  }  
  
  /**
   * buildDataSet creates an item out of value arrays and returns all the values in a list
   * @param csvRecordsArray List of values for one data point
   * @param valueCount Number of values in a data piece
   * @returns a fully featured dataset
   */
  buildDataSet(csvRecordsArray: any, valueCount: number) {  
    let dataArray = [];  
  
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
      if (curruntRecord.length == valueCount) {  
        let csvItem: stockData = new stockData();  
        csvItem.date = curruntRecord[0].trim();  
        csvItem.close = curruntRecord[1].trim();  
        csvItem.volume = curruntRecord[2].trim();  
        csvItem.open = curruntRecord[3].trim();  
        csvItem.high = curruntRecord[4].trim();  
        csvItem.low = curruntRecord[5].trim();  
        dataArray.push(csvItem);  
      }  
    }  
    return dataArray;  
  }  
  
  /**
   * simple file extension check
   * @param file 
   */
  isCSV(file: any) {  
    return file.name.endsWith(".csv");  
  }  
  
  /**
   * splits a line from the csv file and splits the lines into arrays
   * @param csvRecordsArr 
   */
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  
  
  /**
   * FileReset is fired after an error in file upload. Resets variables related to file upload.
   */
  resetUpload() {  
    this.csvReader.nativeElement.value = "";  
    this.dataSet = [];  
  }  
}
