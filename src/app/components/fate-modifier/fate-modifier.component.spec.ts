import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FateModifierComponent } from './fate-modifier.component';

describe('FateModifierComponent', () => {
  let component: FateModifierComponent;
  let fixture: ComponentFixture<FateModifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FateModifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FateModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
