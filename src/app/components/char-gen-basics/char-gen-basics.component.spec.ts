import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharGenBasicsComponent } from './char-gen-basics.component';

describe('CharGenBasicsComponent', () => {
  let component: CharGenBasicsComponent;
  let fixture: ComponentFixture<CharGenBasicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharGenBasicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharGenBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
