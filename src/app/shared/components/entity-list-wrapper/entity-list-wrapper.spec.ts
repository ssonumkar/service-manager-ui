import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityListWrapper } from './entity-list-wrapper';

describe('EntityListWrapper', () => {
  let component: EntityListWrapper;
  let fixture: ComponentFixture<EntityListWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityListWrapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityListWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
