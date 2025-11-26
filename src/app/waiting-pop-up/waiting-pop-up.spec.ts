import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingPopUp } from './waiting-pop-up';

describe('WaitingPopUp', () => {
  let component: WaitingPopUp;
  let fixture: ComponentFixture<WaitingPopUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaitingPopUp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitingPopUp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
