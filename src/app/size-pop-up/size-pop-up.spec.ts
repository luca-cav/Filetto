import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizePopUp } from './size-pop-up';

describe('SizePopUp', () => {
  let component: SizePopUp;
  let fixture: ComponentFixture<SizePopUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SizePopUp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SizePopUp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
