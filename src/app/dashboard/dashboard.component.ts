import { Component, OnInit } from '@angular/core';
import { HttpCallsService } from '../common/services/httpCalls.service';
import { LoaderService } from '../common/services/loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  regions: Array<any> = [
    { name: "Asia", value: "asia" },
    { name: "Europe", value: "europe" }
  ];
  countries: any = [];
  tableData: any = [];
  isCountryDisabled: boolean = true;
  selectedCountry: string = '';

  constructor(
    private _http: HttpCallsService,
    private loaderService: LoaderService
    ) { }

  ngOnInit() {
  }

  changeRegion($event: string) {
    if (localStorage.getItem('countries'+$event)) {
      let stringifiedData:any = window.localStorage.getItem('countries'+$event);
      this.countries = JSON.parse(stringifiedData);
      this.isCountryDisabled = false;
      this.selectedCountry = '';
    } else {
      let value = $event.toLowerCase();
      let apiUrl = `https://restcountries.eu/rest/v2/region/${value}`;
      this.loaderService.showLoader();
      this._http.fetch(apiUrl).subscribe(res => {
        this.loaderService.hideLoader();
        this.countries = res;
        localStorage.setItem('countries'+$event, JSON.stringify(this.countries));
        this.isCountryDisabled = false;
        this.selectedCountry = '';
      }, err => {
        console.log(err);
      });
    }
  }

  changeCountry($event: string) {
    this.selectedCountry = $event;
  }

  loadCountries() {
    this.tableData = this.countries.filter((res: any) => res.name == this.selectedCountry);
  }
}
