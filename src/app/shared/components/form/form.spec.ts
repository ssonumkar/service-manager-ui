import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form';
import { FormField } from './form-field.model';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  const mockFormFields: FormField[] = [
    {
      label: 'Test Field',
      name: 'testField',
      type: 'text',
      required: true,
      placeholder: 'Enter test value',
      validators: ['required']
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent, ReactiveFormsModule],
      providers: [FormBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    component.fields = mockFormFields;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build form with provided fields', () => {
    component.ngOnChanges({
      fields: {
        currentValue: mockFormFields,
        previousValue: [],
        firstChange: true,
        isFirstChange: () => true
      }
    });
    
    expect(component.form.get('testField')).toBeTruthy();
  });

  it('should emit formSubmit when form is valid and submitted', () => {
    spyOn(component.formSubmit, 'emit');
    
    component.form.patchValue({ testField: 'test value' });
    component.onSubmit();
    
    expect(component.formSubmit.emit).toHaveBeenCalledWith({ testField: 'test value' });
  });

  it('should not emit formSubmit when form is invalid', () => {
    spyOn(component.formSubmit, 'emit');
    
    component.onSubmit();
    
    expect(component.formSubmit.emit).not.toHaveBeenCalled();
  });
});
