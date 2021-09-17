import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CustomDropdownComponent } from './custom-dropdown.component';

describe('CustomDropdownComponent', () => {
  let component: CustomDropdownComponent;
  let fixture: ComponentFixture<CustomDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call event emitter on changing select drop down', () => {
    component.dropdownData = [
      { name: 'Asia', value: 'asia'},
      { name: 'Africa', value: 'africa'}
    ];
    let select: HTMLSelectElement = fixture.debugElement.query(By.css('.custom-select')).nativeElement;
    select.click();
    fixture.detectChanges();
    select.value = select.options[1].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    
    let de = fixture.debugElement.query(By.css('.custom-select'));
    spyOn(component, 'changeDropdown');
    de.triggerEventHandler('change', {});
    fixture.detectChanges();
    expect(component.changeDropdown).toHaveBeenCalled();
    component.valueChange.subscribe((res: any) => {
      expect(res.toEqual('Africa'));
      component.valueChange.unsubscribe();
    });
  });
});
