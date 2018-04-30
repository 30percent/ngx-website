import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicHeaderComponent } from './music-header.component';

describe('MusicHeaderComponent', () => {
  let component: MusicHeaderComponent;
  let fixture: ComponentFixture<MusicHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
