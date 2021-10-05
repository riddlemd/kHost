import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingersManagerComponent } from './singers-manager.component';

describe('SingersManagerComponent', () => {
  let component: SingersManagerComponent;
  let fixture: ComponentFixture<SingersManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingersManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingersManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
