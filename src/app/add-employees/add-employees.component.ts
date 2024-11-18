import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.css']
})
export class AddEmployeesComponent {
  employeeForm: FormGroup;
  successMessage: string = '';

  constructor(private fb: FormBuilder, private employeesService: EmployeesService) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateofBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      jobTitle: ['', Validators.required],
      dateofJoining: ['', Validators.required],
      employementType: ['', Validators.required],
      employementStatus: ['', Validators.required],
      photo: [null],
      identityProof: [null],
      location: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  // Helper function to format date to dd-MM-yyyy
  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const formData = new FormData();
  
      // Append each form field to FormData with explicit conversions
      Object.keys(this.employeeForm.controls).forEach(key => {
        const controlValue = this.employeeForm.get(key)?.value;
  
        if (controlValue !== null && controlValue !== undefined) {
          if (key === 'dateofBirth' || key === 'dateofJoining') {
            const formattedDate = this.formatDate(new Date(controlValue));
            formData.append(key, formattedDate); // Append formatted date string
          } else if (key === 'employementType' || key === 'employementStatus' || key === 'country') {
            formData.append(key, controlValue.toString()); // Ensure enums/select fields are strings
          } else if (key === 'photo' && controlValue) {
            formData.append('photojpg', controlValue); // Append photo file with the correct key name
          } else if (key === 'identityProof' && controlValue) {
            formData.append('identityProofjpg', controlValue); // Append identityProof file with the correct key name
          } else {
            formData.append(key, controlValue); // Append other form fields
          }
        }
      });
  
      // Send data to the backend
      this.employeesService.employeesform(formData).subscribe(
        response => {
          console.log('Employee added successfully:', response);
          this.successMessage = 'Employee has been added successfully!'; // Update success message
          this.employeeForm.reset(); // Reset form only after successful submission
        },
        error => {
          console.error('Error adding employee:', error);
          console.error('Full error response:', error.error); // Log detailed error response
          this.successMessage = 'Failed to add employee. Please try again.'; // Show error message
        }
      );
    } else {
      this.successMessage = 'Please fill in all fields correctly'; // Validation error message
    }
  }
  
  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.employeeForm.patchValue({
        [controlName]: file
      });
    }
  }
}
