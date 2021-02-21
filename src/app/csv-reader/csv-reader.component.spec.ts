import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSVReaderComponent } from './csv-reader.component';

describe('CSVReaderComponent', () => {
  let component: CSVReaderComponent;
  let fixture: ComponentFixture<CSVReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CSVReaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CSVReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
