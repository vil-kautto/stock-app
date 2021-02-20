import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  bullTrend: string = "jaa";
  tradeVolume: string = "jbb";
  sma: string = "jcc";
  sigPrice: string = "jdd";

  constructor() {
  }

  ngOnInit(): void {
  }



}
