/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DishModificationComponent } from './dish-modification.component';

describe('DishModificationComponent', () => {
  let component: DishModificationComponent;
  let fixture: ComponentFixture<DishModificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishModificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
