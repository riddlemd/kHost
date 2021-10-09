import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadsManagerComponent } from './downloads-manager.component';

describe('DownloadsManagerComponent', () => {
  let component: DownloadsManagerComponent;
  let fixture: ComponentFixture<DownloadsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadsManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
