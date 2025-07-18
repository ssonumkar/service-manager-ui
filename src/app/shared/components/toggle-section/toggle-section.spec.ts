import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleSection } from './toggle-section';

describe('ToggleSection', () => {
  let component: ToggleSection;
  let fixture: ComponentFixture<ToggleSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
