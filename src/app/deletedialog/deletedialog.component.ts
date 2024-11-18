import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeesService } from '../employees.service';
import { Router } from '@angular/router'; // Import the Router service

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.css']
})
export class DeletedialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeletedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employeeId: string }, // Inject the dialog data
    private employeesService: EmployeesService,
    private router: Router // Inject the Router service
  ) {}

  ngOnInit(): void {
    console.log('Received data in dialog:', this.data); // Debug log to verify data
  }

  onConfirm(): void {
    const employeeId = this.data.employeeId; // Safely access the injected data
    if (!employeeId) {
      console.error('employeeId is missing in dialog data.');
      return;
    }

    this.employeesService.deleteEmployee(employeeId).subscribe({
      next: (response) => {
        console.log('Employee deleted successfully:', response);
        this.dialogRef.close(true); // Close the dialog
        this.router.navigate(['/list-of-employees']); // Redirect to 'list-of-employees'
      },
      error: (error) => {
        console.error('Error deleting employee:', error);
        this.dialogRef.close(false); // Close the dialog but indicate failure
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
