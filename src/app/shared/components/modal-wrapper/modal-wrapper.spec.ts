import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalWrapper } from './modal-wrapper';

describe('ModalWrapper', () => {
  let component: ModalWrapper;
  let fixture: ComponentFixture<ModalWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalWrapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalWrapper);
    component = fixture.componentInstance;
    component.title = 'Test Modal';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit close event when closeModal is called', () => {
    spyOn(component.close, 'emit');
    
    component.closeModal();
    
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should emit action event when handleClick is called', () => {
    spyOn(component.action, 'emit');
    
    component.handleClick('test-action');
    
    expect(component.action.emit).toHaveBeenCalledWith('test-action');
  });

  it('should display the correct title', () => {
    expect(component.title).toBe('Test Modal');
  });
});
