import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormField } from './form-field.model';
import { CommonEngine } from '@angular/ssr/node';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.scss'
})
export class FormComponent implements OnChanges {
  @Input() fields: FormField[] = [];
  @Output() formSubmit = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fields'] && this.fields.length > 0) {
      console.log('FormComponent ngOnChanges - fields changed:', this.fields);
      const group: any = {};
      this.fields.forEach(field => {
        const defaultValue = field.value !== undefined ? field.value : null;
        console.log(`Setting field ${field.name} to value:`, defaultValue);
        
        // Build validators array
        const validators = [];
        if (field.required) {
          validators.push(Validators.required);
        }
        if (field.validators && field.validators.length > 0) {
          field.validators.forEach(validator => {
            if (validator === 'required') {
              // Skip if already added above
              if (!field.required) {
                validators.push(Validators.required);
              }
            } else if (typeof validator === 'string' && validator.startsWith('^') && validator.endsWith('$')) {
              // Pattern validator
              validators.push(Validators.pattern(validator));
            }
          });
        }
        
        group[field.name] = [defaultValue, validators];
      });
      this.form = this.fb.group(group);
      console.log('FormComponent - created form with values:', this.form.value);
      
      // Clear any previous validation states when form is recreated
      this.clearValidationStates();
    }
  }

  private clearValidationStates(): void {
    // Reset all controls to pristine and untouched state
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control) {
        control.markAsUntouched();
        control.markAsPristine();
      }
    });
  }

  onSubmit(): void {
    console.log('Form submitted with values:', this.form.value);
    console.log('Form valid:', this.form.valid);
    console.log('Form errors:', this.getFormErrors());
    
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }

  private getFormErrors(): any {
    let errors: any = {};
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control && !control.valid && control.touched) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field && field.errors && field.invalid && (field.dirty || field.touched)) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required`;
      }
      if (field.errors['pattern']) {
        if (fieldName === 'accountNumber') {
          return 'Account Number must be 10-12 digits';
        }
        return `${this.getFieldLabel(fieldName)} format is invalid`;
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const field = this.fields.find(f => f.name === fieldName);
    return field ? field.label : fieldName;
  }
}

