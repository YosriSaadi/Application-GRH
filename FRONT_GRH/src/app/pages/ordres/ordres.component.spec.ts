import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdresComponent } from './ordres.component';

describe('OrdresComponent', () => {
  let component: OrdresComponent;
  let fixture: ComponentFixture<OrdresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
