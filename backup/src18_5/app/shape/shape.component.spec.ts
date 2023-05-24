import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeComponent } from './shape.component';

describe('ShapeComponent', () => {
  let component: ShapeComponent;
  let fixture: ComponentFixture<ShapeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShapeComponent]
    });
    fixture = TestBed.createComponent(ShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
