/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MenuModificationComponent } from './menu-modification.component';


describe('MenuModificationComponent', () => {
  let component: MenuModificationComponent;
  let fixture: ComponentFixture<MenuModificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuModificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
