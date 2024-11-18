import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '../employees.service';
import { Employees } from '../employees';
import { MatDialog } from '@angular/material/dialog';
import { EditEmployeeDetailDialogeComponent } from '../edit-employee-detail-dialoge/edit-employee-detail-dialoge.component';


@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {
  employee: Employees | null = null;
  photoUrl: string | null = null;
  identityProofUrl: string | null = null;

  constructor(
    private employeesService: EmployeesService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('employeeId');
    if (employeeId) {
      this.fetchEmployeeDetails(employeeId);
    }
  }

  fetchEmployeeDetails(employeeId: string): void {
    this.employeesService.getbyEmployeeId(employeeId).subscribe(
      (data: Employees) => {
        this.employee = data;
        console.log(data);

        // Generate URLs for File objects if they exist
        if (this.employee.photo) {
          this.photoUrl = `data:image/jpeg;base64,${this.employee.photo}`;
        }
        if (this.employee.identityProof) {
          this.identityProofUrl = `data:application/pdf;base64,${this.employee.identityProof}`;
        }
      },
      (error: any) => {
        console.error('Error fetching employee details:', error);
      }
    );
  }

  openDialog(employeeId: string): void {
    const dialogRef = this.dialog.open(EditEmployeeDetailDialogeComponent, {
      width: '300px',
      data: { employeeId }, // Passing the userId to the dialog component
    });
  }

  downloadPhoto(): void {
    if (this.photoUrl) {
      const a = document.createElement('a');
      a.href = this.photoUrl;
      a.download = 'EmployeePhoto.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      console.log('Photo download initiated');
    } else {
      console.error('Photo URL is not available');
    }
  }

  downloadIdentityproof(): void {
    if (this.identityProofUrl) {
      const a = document.createElement('a');
      a.href = this.identityProofUrl;
      a.download = 'IdentityProof.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      console.log('Identity proof download initiated');
    } else {
      console.error('Identity proof URL is not available');
    }
  }

  goBack(): void {
    window.history.back();
  }

  ngOnDestroy(): void {
    // Revoke object URLs when component is destroyed to free up memory
    if (this.photoUrl) {
      URL.revokeObjectURL(this.photoUrl);
    }
    if (this.identityProofUrl) {
      URL.revokeObjectURL(this.identityProofUrl);
    }
  }
}
