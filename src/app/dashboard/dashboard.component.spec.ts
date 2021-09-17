import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { LoaderComponent, CustomDropdownComponent } from '../index';
import { HttpCallsService } from '../common/services/httpCalls.service';
import { LoaderService } from '../common/services/loader.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let httpCallsService: HttpCallsService;
  let fakeResponse = [
    { name: "Alaska" }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent, LoaderComponent, CustomDropdownComponent ],
        providers: [
            {
                provide: LoaderService, useValue: {
                  showLoader: () => of(true),
                  hideLoader: () => of(true)
                }
            },
            {
              provide: HttpCallsService, useValue: {
                fetch: () => of(fakeResponse)
              }
          }
        ]
      }).compileComponents();
    
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    httpCallsService = TestBed.get(HttpCallsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change region on selection of a new region using api call', () => {
    localStorage.clear();
    component.changeRegion('Asia');
    
    expect(component.countries).toEqual(fakeResponse);
    expect(component.isCountryDisabled).toBeFalsy();
    expect(component.selectedCountry).toBe('');
  });

  it('should change region on selection of a new region using local storge', () => {
    localStorage.setItem('countriesAsia', JSON.stringify([{name: 'Algeria'}]));
    component.changeRegion('Asia');
    
    expect(component.countries).toEqual([{name: 'Algeria'}]);
    expect(component.isCountryDisabled).toBeFalsy();
    expect(component.selectedCountry).toBe('');
  });

  it('should throw an error if api call fails while changing region', () => {
    localStorage.clear();
    spyOn(httpCallsService, 'fetch').and.returnValue(throwError({status: 404}));
    component.changeRegion('Asia');
    
    expect(component.countries).not.toEqual(fakeResponse);
  });

  it('should change country on selection of a new country', () => {

    component.changeCountry('India');
    
    expect(component.selectedCountry).toBe('India');
  });

  it('should load details of countries on clicking button load countries', () => {

    component.selectedCountry = 'USA';
    component.countries = [
    { name: 'Alaska', code: 'ALS' },
    { name: 'Russia', code: 'RSA' },
    { name: 'Japan', code: 'JPN' },
    { name: 'USA', code: 'USA' }
    ]
    component.loadCountries();
    
    expect(component.tableData).toEqual([{ name: 'USA', code: 'USA' }]);
  });

});
