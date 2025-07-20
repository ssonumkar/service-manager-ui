import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigLoaderService } from '../../config/config-loader';
import { FORM_FIELD_CONFIG } from '../../config/form-field-config';
import { Resource } from '../../models/resource.model';
import { ResourceApiService } from '../../services/resource-api.service';
import { FormComponent } from '../../shared/components/form/form';
import { FormField } from '../../shared/components/form/form-field.model';
import { FooterButton } from '../../shared/components/modal-footer/footer-button.model';
import { ModalWrapper } from '../../shared/components/modal-wrapper/modal-wrapper';

@Component({
  selector: 'app-resource-form',
  imports: [CommonModule, FormsModule, ModalWrapper, FormComponent],
  templateUrl: './resource-form.html',
  styleUrl: './resource-form.scss'
})
export class ResourceFormComponent {
  serviceId: string = '';
  showModal = true;
  form: FormGroup;
  formFields: FormField[] = []
  footerButtons: FooterButton[] = [];

  service: any = {}; 

  constructor(
    private router: Router,
    private resourceApi: ResourceApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private configLoader: ConfigLoaderService,
  ) {
    this.form = this.fb.group({
      id: ['', Validators.required]
    });
  }
  async ngOnInit() {
    console.log('ServiceFormComponent initialized');
    this.formFields = FORM_FIELD_CONFIG['resourceCreateForm'];
    this.serviceId = this.route.snapshot.paramMap.get('id') || '';
    this.showModal = true;
  }
  handleModalFooterAction(action: boolean) {
    if (action) {
      this.closeModal();
    }
  }

  handleSubmit(formData: Resource) {
    console.log('Form submitted with values:', formData);
    formData.serviceId = this.serviceId;
    this.resourceApi.create(formData).subscribe({
      next: () => {
        this.closeModal();
        this.router.navigate(['/resource', this.serviceId, 'edit']);
      },
      error: (err) => {
        console.error('Error creating service:', err);
      }
    });
  }

  closeModal() {
    console.log("close called");
    this.showModal = false;
    this.router.navigate(['/resource', this.serviceId, 'edit']);
  }
}
