import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuesManagerComponent } from './venues-manager.component';

describe('VenuesManagerComponent', () => {
  let component: VenuesManagerComponent;
  let fixture: ComponentFixture<VenuesManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenuesManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenuesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
