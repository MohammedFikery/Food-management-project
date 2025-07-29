import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfiyAccComponent } from './verfiy-acc.component';

describe('VerfiyAccComponent', () => {
  let component: VerfiyAccComponent;
  let fixture: ComponentFixture<VerfiyAccComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerfiyAccComponent]
    });
    fixture = TestBed.createComponent(VerfiyAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
