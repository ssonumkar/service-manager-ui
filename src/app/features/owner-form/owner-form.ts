import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigLoaderService } from '../../config/config-loader';
import { FORM_FIELD_CONFIG } from '../../config/form-field-config';
import { Owner } from '../../models/owner.model';
import { OwnerApiService } from '../../services/owner.service';
import { FormComponent } from '../../shared/components/form/form';
import { FormField } from '../../shared/components/form/form-field.model';
import { ModalWrapper } from '../../shared/components/modal-wrapper/modal-wrapper';

@Component({
  selector: 'app-owner-form',
  imports: [CommonModule, FormsModule, ModalWrapper, FormComponent],
  templateUrl: './owner-form.html',
  styleUrl: './owner-form.scss',
  standalone: true
})
export class OwnerFormComponent {

  resourceId: string = '';
  serviceId: string = '';
  showModal = true;
  form: FormGroup;
  formFields: FormField[] = []

  constructor(
    private router: Router,
    private ownerApi: OwnerApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private configLoader: ConfigLoaderService,
  ) {
    this.form = this.fb.group({
      id: ['', Validators.required]
    });
  }
  async ngOnInit() {
    this.formFields = FORM_FIELD_CONFIG['ownerCreateForm'];
    this.resourceId = this.route.snapshot.paramMap.get('resourceId') || '';
    this.serviceId = this.route.snapshot.paramMap.get('serviceId') || '';
    this.showModal = true;
  }

  handleSubmit(formData: Owner) {
    formData.resourceId = this.resourceId;
    formData.serviceId = this.serviceId;
    this.ownerApi.create(formData).subscribe({
      next: () => {
        this.closeModal();
        this.router.navigate(['/owner', this.serviceId, this.resourceId, 'edit']);
      },
      error: (err) => {
        console.error('Error creating service:', err);
      }
    });
  }

  closeModal() {
    console.log("close called");
    this.showModal = false;
    this.router.navigate(['/owner', this.serviceId, this.resourceId, 'edit']);
  }
}
