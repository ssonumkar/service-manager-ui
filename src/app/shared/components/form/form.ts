import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class FormComponent {
  @Input() fields: FormField[] = [];
  @Output() formSubmit = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnChanges(): void {
    if (this.fields.length > 0) {
      const group: any = {};
      this.fields.forEach(field => {
        group[field.name] = field.required ? [null, Validators.required] : [null];
      });
      this.form = this.fb.group(group);
    }
  }

  onSubmit(): void {
    console.log('Form submitted with values:', this.form.value);
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }
}

