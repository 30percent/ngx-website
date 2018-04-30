import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeEvalComponent } from './safe-eval.component';

describe('SafeEvalComponent', () => {
  let component: SafeEvalComponent;
  let fixture: ComponentFixture<SafeEvalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeEvalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeEvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
