import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.css']
})
export class CustomDropdownComponent implements OnInit {

  @Input() dropdownData: any;
  @Input() isDisabled: boolean = false;
  @Output() valueChange = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  changeDropdown($event: any) {
    this.valueChange.emit($event.target.value);
  }

}
