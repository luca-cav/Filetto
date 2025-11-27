import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisconnectPopUp } from './disconnect-pop-up';

describe('DisconnectPopUp', () => {
  let component: DisconnectPopUp;
  let fixture: ComponentFixture<DisconnectPopUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisconnectPopUp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisconnectPopUp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
