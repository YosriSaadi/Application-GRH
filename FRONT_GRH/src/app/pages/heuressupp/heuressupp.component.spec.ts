import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeuressuppComponent } from './heuressupp.component';

describe('HeuressuppComponent', () => {
  let component: HeuressuppComponent;
  let fixture: ComponentFixture<HeuressuppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeuressuppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeuressuppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
