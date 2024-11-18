import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeeDetailDialogeComponent } from './edit-employee-detail-dialoge.component';

describe('EditEmployeeDetailDialogeComponent', () => {
  let component: EditEmployeeDetailDialogeComponent;
  let fixture: ComponentFixture<EditEmployeeDetailDialogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEmployeeDetailDialogeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmployeeDetailDialogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
