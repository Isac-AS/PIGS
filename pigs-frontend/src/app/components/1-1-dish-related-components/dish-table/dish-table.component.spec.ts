/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DishTableComponent } from './dish-table.component';

describe('DishTableComponent', () => {
  let component: DishTableComponent;
  let fixture: ComponentFixture<DishTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
