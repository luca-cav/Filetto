import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCreation } from './player-creation';

describe('PlayerCreation', () => {
  let component: PlayerCreation;
  let fixture: ComponentFixture<PlayerCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerCreation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerCreation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
