import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSocieteComponent } from './edit-societe.component';

describe('EditSocieteComponent', () => {
  let component: EditSocieteComponent;
  let fixture: ComponentFixture<EditSocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
