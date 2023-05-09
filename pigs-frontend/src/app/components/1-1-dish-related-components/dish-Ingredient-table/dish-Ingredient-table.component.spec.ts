/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DishIngredientTableComponent } from './dish-Ingredient-table.component';

describe('DishIngredientTableComponent', () => {
  let component: DishIngredientTableComponent;
  let fixture: ComponentFixture<DishIngredientTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishIngredientTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishIngredientTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
