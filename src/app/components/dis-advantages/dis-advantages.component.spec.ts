import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisAdvantagesComponent } from './dis-advantages.component';

describe('DisAdvantagesComponent', () => {
  let component: DisAdvantagesComponent;
  let fixture: ComponentFixture<DisAdvantagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisAdvantagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisAdvantagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
