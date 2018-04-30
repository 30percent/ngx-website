import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaTestComponent } from './caja-test.component';

describe('CajaTestComponent', () => {
  let component: CajaTestComponent;
  let fixture: ComponentFixture<CajaTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CajaTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
