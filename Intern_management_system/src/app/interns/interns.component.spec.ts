import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternsComponent } from './interns.component';

describe('InternsComponent', () => {
  let component: InternsComponent;
  let fixture: ComponentFixture<InternsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
