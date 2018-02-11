import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicPlayingComponent } from './music-playing.component';

describe('MusicPlayingComponent', () => {
  let component: MusicPlayingComponent;
  let fixture: ComponentFixture<MusicPlayingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicPlayingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicPlayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
