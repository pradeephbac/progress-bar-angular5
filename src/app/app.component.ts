import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ProgressService } from './services/progress.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  progressData: any;
  bars: any;
  buttons: any;
  loadData = false;
  limit = 0;
  selectedBar: any;

  constructor(private proressService: ProgressService) {
  }

  fetchProgressData(): Promise<any> { // load data async
    return this.proressService.getProgressData().map((response) => {
      this.bars = response.bars;
      this.selectedBar = 0; // default select bar 1
      this.buttons = response.buttons; // define buttons array
      this.limit = response.limit; // define limit
      this.loadData = true; // wait UI component untill data load to render
    }).toPromise();
  }

  changeBarValue(barObjectNumber, buttonValue) {
    const barValue = this.bars[barObjectNumber] + buttonValue;
    if (barValue < 0) {
      this.bars[barObjectNumber] = 0;
    } else if (barValue > this.limit) {
      this.bars[barObjectNumber] = this.limit;
    } else {
      this.bars[barObjectNumber] = barValue;
    }
  }

  ngOnInit() {
    this.fetchProgressData(); // init data service
  }
}
