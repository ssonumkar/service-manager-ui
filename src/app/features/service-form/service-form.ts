import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigLoaderService } from '../../config/config-loader';
import { FORM_FIELD_CONFIG } from '../../config/form-field-config';
import { Service } from '../../models/service.model';
import { ServiceApiService } from '../../services/service-api.service';
import { FormComponent } from '../../shared/components/form/form';
import { FormField } from '../../shared/components/form/form-field.model';
import { FooterButton } from '../../shared/components/modal-footer/footer-button.model';
import { ModalWrapper } from '../../shared/components/modal-wrapper/modal-wrapper';

@Component({
  selector: 'app-service-form',
  imports: [CommonModule, FormsModule, ModalWrapper, FormComponent],
  templateUrl: './service-form.html',
  styleUrl: './service-form.scss',
  standalone: true
})
export class ServiceFormComponent {
  showModal = true;
  form: FormGroup;
  formFields: FormField[] = []
  footerButtons: FooterButton[] = [];

  service: any = {}; // Initialize with an empty object or a specific service model
  
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private serviceApi: ServiceApiService,
      private fb: FormBuilder,
      private configLoader: ConfigLoaderService,
    ) {
      this.form = this.fb.group({
      id: ['', Validators.required]
    });
    }
  async ngOnInit() {
    console.log('ServiceFormComponent initialized'); 
    this.formFields = FORM_FIELD_CONFIG['serviceCreateForm'];
    this.showModal = true;
  }
  
  handleSubmit(formData: Service) {
    this.serviceApi.createService(formData).subscribe({
      next: () => {
        this.closeModal(); // true to indicate refresh
      },
      error: (err) => {
        console.error('Error creating service:', err);
      }
    });
  }

  closeModal() {
    console.log("close called");
    this.showModal = false;
    this.router.navigate(['/services']);
    // if (refresh) {
      
    // }
  }
}
