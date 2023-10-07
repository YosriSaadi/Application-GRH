import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetenueComponent } from './retenue.component';

describe('RetenueComponent', () => {
  let component: RetenueComponent;
  let fixture: ComponentFixture<RetenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
