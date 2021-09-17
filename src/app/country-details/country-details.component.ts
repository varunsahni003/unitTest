import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {

  tableHeadings = [
    'Name',
    'Capital',
    'Population',
    'Currencies',
    'Flag'
  ];
  @Input() tableData: any;
  constructor() { }

  ngOnInit(): void {
  }
}
