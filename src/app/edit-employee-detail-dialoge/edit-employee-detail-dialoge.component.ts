import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';  // Correct import for Router
import { UpdateEmployeesComponent } from '../update-employees/update-employees.component';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import { MatDialog } from '@angular/material/dialog'; // Ensure MatDialog is imported


@Component({
  selector: 'app-edit-employee-detail-dialoge',
  templateUrl: './edit-employee-detail-dialoge.component.html',
  styleUrls: ['./edit-employee-detail-dialoge.component.css']
})
export class EditEmployeeDetailDialogeComponent implements OnInit {
  employeeId: string = '';  // Declare employeeId to store the passed value
  

  constructor(private dialogRef: MatDialogRef<EditEmployeeDetailDialogeComponent>,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any,  // Inject dialog data
              private dialog: MatDialog, // Inject MatDialog service here
  ) {}
  ngOnInit(): void {
  // Initialize employeeId with the passed data
  this.employeeId = this.data.employeeId;
  console.log('Employee ID in dialog:', this.employeeId); // Check if employeeId is being passed
  }

  onUpdate(): void {
    if (this.employeeId) {
      // Correctly navigate to the update component with the employeeId as a parameter
      this.router.navigate(['/update-employees', this.employeeId]);
      this.dialogRef.close();  // Close the dialog after navigation
    }
  }
  
  onDelete(employeeId: string): void {
    const dialogRef = this.dialog.open(DeletedialogComponent, {
      width: '300px',
      data: { employeeId: this.employeeId }, // Pass employeeId from the class property
    });
  
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        console.log('Employee deletion confirmed.');
        // Refresh the employee list or handle deletion logic as needed
      } else {
        console.log('Employee deletion canceled.');
      }
    });
  }
  


}
