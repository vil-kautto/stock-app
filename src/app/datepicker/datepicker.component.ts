import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
})

export class DatepickerComponent {
  title = 'my-app';
   
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  datePicked() {
    console.log("date was fetched: " + this.range.value.start + ", " + this.range.value.end);
  }
  

}


