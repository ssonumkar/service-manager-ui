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
        group[field.name] = field.required ? [defaultValue, Validators.required] : [defaultValue];
      });
      this.form = this.fb.group(group);
      console.log('FormComponent - created form with values:', this.form.value);
    }
  }

  onSubmit(): void {
    console.log('Form submitted with values:', this.form.value);
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }
}

