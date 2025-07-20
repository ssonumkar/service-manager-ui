import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  ownerId: string = '';
  showModal = true;
  form: FormGroup;
  formFields: FormField[] = [];
  isEditMode = false;
  currentOwner: Owner | null = null;
  modalTitle = 'Add Owner';

  constructor(
    private router: Router,
    private ownerApi: OwnerApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      accountNumber: ['', Validators.required],
      level: [1, [Validators.required, Validators.min(1)]]
    });
  }
  async ngOnInit() {
    this.formFields = FORM_FIELD_CONFIG['ownerCreateForm'];
    this.resourceId = this.route.snapshot.paramMap.get('resourceId') || '';
    this.serviceId = this.route.snapshot.paramMap.get('serviceId') || '';
    this.ownerId = this.route.snapshot.paramMap.get('ownerId') || '';
    
    console.log('ngOnInit - ownerId:', this.ownerId);
    console.log('ngOnInit - resourceId:', this.resourceId);
    console.log('ngOnInit - serviceId:', this.serviceId);
    
    // Check if we're in edit mode
    this.isEditMode = !!this.ownerId;
    this.modalTitle = this.isEditMode ? 'Edit Owner' : 'Add Owner';
    
    console.log('Edit mode:', this.isEditMode);
    
    if (this.isEditMode) {
      await this.loadOwnerForEdit();
    }
    
    this.showModal = true;
  }

  private async loadOwnerForEdit(): Promise<void> {
    try {
      console.log('Loading owner for edit, ownerId:', this.ownerId);
      // Use the direct API to fetch owner by ID
      this.ownerApi.getOwnerById(this.ownerId).subscribe({
        next: (owner) => {
          console.log('Loaded owner:', owner);
          this.currentOwner = owner;
          if (this.currentOwner) {
            this.populateForm(this.currentOwner);
          }
        },
        error: (err) => {
          console.error('Error loading owner for edit:', err);
        }
      });
    } catch (error) {
      console.error('Error in loadOwnerForEdit:', error);
    }
  }

  public populateForm(owner: Owner): void {
    console.log('Populating form with owner data:', owner);
    
    // Create a mapping of field names to owner values
    const valueMap: { [key: string]: any } = {
      'id': owner.id,
      'name': owner.name,
      'accountNumber': owner.accountNumber,
      'level': owner.level.toString() // Convert to string for select field
    };

    console.log('Value map:', valueMap);
    console.log('Form fields before update:', this.formFields);

    // Create a completely new array to ensure Angular detects the change
    const updatedFields: FormField[] = [];
    this.formFields.forEach(field => {
      updatedFields.push({
        ...field,
        value: valueMap[field.name] !== undefined ? valueMap[field.name] : field.value
      });
    });
    
    this.formFields = updatedFields;
    
    console.log('Form fields after update:', this.formFields);
    
    // Trigger change detection to ensure the form component updates
    this.cdr.detectChanges();
  }

  handleSubmit(formData: Owner) {
    formData.resourceId = this.resourceId;
    formData.serviceId = this.serviceId;
    
    if (this.isEditMode) {
      // Update existing owner
      this.ownerApi.update(formData).subscribe({
        next: () => {
          console.log('Owner updated successfully');
          this.closeModal();
        },
        error: (err) => {
          console.error('Error updating owner:', err);
        }
      });
    } else {
      // Create new owner
      this.ownerApi.create(formData).subscribe({
        next: () => {
          console.log('Owner created successfully');
          this.closeModal();
        },
        error: (err) => {
          console.error('Error creating owner:', err);
        }
      });
    }
  }

  closeModal() {
    console.log("close called");
    this.showModal = false;
    this.router.navigate(['/owner', this.serviceId, this.resourceId, 'edit']);
  }
}
