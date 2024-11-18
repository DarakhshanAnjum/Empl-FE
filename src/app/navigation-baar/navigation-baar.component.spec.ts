import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBaarComponent } from './navigation-baar.component';

describe('NavigationBaarComponent', () => {
  let component: NavigationBaarComponent;
  let fixture: ComponentFixture<NavigationBaarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationBaarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBaarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
