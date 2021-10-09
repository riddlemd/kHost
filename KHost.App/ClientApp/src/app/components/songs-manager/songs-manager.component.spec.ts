import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsManagerComponent } from './songs-manager.component';

describe('SongsManagerComponent', () => {
  let component: SongsManagerComponent;
  let fixture: ComponentFixture<SongsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongsManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
