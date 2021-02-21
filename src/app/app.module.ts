import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// component imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackerComponent } from './tracker/tracker.component';
import { DatepickerComponent } from './datepicker/datepicker.component'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// material modules
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CSVReaderComponent } from './csv-reader/csv-reader.component';


@NgModule({
  declarations: [
    AppComponent,
    TrackerComponent,
    DatepickerComponent,
    CSVReaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatButtonModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fi-FI'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
