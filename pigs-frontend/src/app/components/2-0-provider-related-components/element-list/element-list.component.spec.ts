/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ElementListComponent } from './element-list.component';

describe('ElementListComponent', () => {
  let component: ElementListComponent;
  let fixture: ComponentFixture<ElementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
