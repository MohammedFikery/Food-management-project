import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesUSerComponent } from './recipes-user.component';

describe('RecipesUSerComponent', () => {
  let component: RecipesUSerComponent;
  let fixture: ComponentFixture<RecipesUSerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipesUSerComponent]
    });
    fixture = TestBed.createComponent(RecipesUSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
