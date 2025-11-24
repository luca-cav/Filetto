import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinningPopUp } from './winning-pop-up';

describe('WinningPopUp', () => {
  let component: WinningPopUp;
  let fixture: ComponentFixture<WinningPopUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinningPopUp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinningPopUp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
