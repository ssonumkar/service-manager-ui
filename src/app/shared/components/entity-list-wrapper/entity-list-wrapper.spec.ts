import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntityListWrapperComponent } from './entity-list-wrapper';


describe('EntityListWrapper', () => {
  let component: EntityListWrapperComponent;
  let fixture: ComponentFixture<EntityListWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityListWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityListWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
