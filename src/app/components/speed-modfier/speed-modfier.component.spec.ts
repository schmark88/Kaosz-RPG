import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedModfierComponent } from './speed-modfier.component';

describe('SpeedModfierComponent', () => {
  let component: SpeedModfierComponent;
  let fixture: ComponentFixture<SpeedModfierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeedModfierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedModfierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
