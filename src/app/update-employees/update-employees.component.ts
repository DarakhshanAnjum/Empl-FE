import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EmployeesService } from "../employees.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-update-employees', // Unique selector for the component
  templateUrl: './update-employees.component.html', // Path to the HTML template
  styleUrls: ['./update-employees.component.css'] // Path to the CSS styles
})

export class UpdateEmployeesComponent implements OnInit {

  updateEmployeeForm: FormGroup;
  employeeId: string = '';
  successMessage: string = '';

  // For storing the URL/path of the images
  currentPhoto: any;
  currentIdentityProof: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeesService: EmployeesService,
    private router: Router
  ) {
    this.updateEmployeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateofBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      jobTitle: ['', Validators.required],
      dateofJoining: ['', Validators.required],
      employementType: ['', Validators.required],
      employementStatus: ['', Validators.required],
      photojpg: [null],
      identityProofjpg: [null],
      location: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id') || '';
    this.loadEmployeeDetails();
  }

  loadEmployeeDetails(): void {
    this.employeesService.getbyEmployeeId(this.employeeId).subscribe(
      (employee: { photo: any; identityProof: any; }) => {
        this.updateEmployeeForm.patchValue(employee);

        // Set the photo and identityProof as string URLs if they are available
        this.currentPhoto = employee.photo;
        this.currentIdentityProof = employee.identityProof;
      },
      (error) => {
        console.error('Error fetching employee details:', error);
      }
    );
  }

  onFileChange(event: any, controlName: string): void {
    const file = event.target.files[0];
    if (file) {
      this.updateEmployeeForm.patchValue({ [controlName]: file });

      // Update the current file if changed
      if (controlName === 'photojpg') {
        this.currentPhoto = file.name;  // Update with file name or URL for the backend
      } else if (controlName === 'identityProofjpg') {
        this.currentIdentityProof = file.name;  // Update with file name or URL for the backend
      }
    }
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  onSubmit(): void {
    if (this.updateEmployeeForm.valid) {
      const formData = new FormData();
  
      // Append form data
      Object.keys(this.updateEmployeeForm.controls).forEach((key) => {
        const value = this.updateEmployeeForm.get(key)?.value;
        if (key === 'dateofBirth' || key === 'dateofJoining') {
          formData.append(key, this.formatDate(new Date(value)));
        } else if (value) {
          formData.append(key, value);
        }
      });
  
      // Append files
      const photo = this.updateEmployeeForm.get('photojpg')?.value;
      const identityProof = this.updateEmployeeForm.get('identityProofjpg')?.value;
      if (photo instanceof File) formData.append('photojpg', photo);
      if (identityProof instanceof File) formData.append('identityProofjpg', identityProof);
  
      this.employeesService.updateEmployee(this.employeeId, formData).subscribe(
        (response) => {
          this.successMessage = 'Employee details updated successfully!';
          this.router.navigate(['/list-of-employees']);
        },
        (error) => {
          console.error('Error updating employee:', error);
          this.successMessage = 'Failed to update employee. Please try again.';
        }
      );
    } else {
      this.successMessage = 'Please fill in all fields correctly.';
    }
  }
  
}
