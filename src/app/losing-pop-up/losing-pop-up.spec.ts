import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LosingPopUp } from './losing-pop-up';

describe('LosingPopUp', () => {
  let component: LosingPopUp;
  let fixture: ComponentFixture<LosingPopUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LosingPopUp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LosingPopUp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
