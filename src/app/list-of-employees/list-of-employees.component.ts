import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employees } from '../employees';
import { EmployeesService } from '../employees.service';
import { ActivatedRoute, Router } from '@angular/router';  // Import Router


@Component({
  selector: 'app-list-of-employees',
  templateUrl: './list-of-employees.component.html',
  styleUrls: ['./list-of-employees.component.css']
})
export class ListOfEmployeesComponent implements OnInit {
  employees: Employees[] = [];
  filteredEmployees: Employees[] = [];
  searchText: string = '';



  constructor(private employeesService: EmployeesService, private router: Router, private route: ActivatedRoute, // To get the Employee ID from the route
    ) { }

  ngOnInit(): void {// Get the patient ID from the route and fetch the details
    
    
this.fetchEmployees();
  }
  fetchEmployees(): void {
    this.employeesService.getAllEmployees().subscribe(
      (data: Employees[]) => {
        this.employees = data;
        this.filteredEmployees = data; // Initialize filteredEmployees with all employees
      },
      (error: any) => {
        console.error('Error fetching employee data:', error);
      }
    );
}

applyFilter(): void {
  const search = this.searchText.toLowerCase();

  // Filter based on employeeId, firstName, and lastName (you can add more fields if needed)
  this.filteredEmployees = this.employees.filter(employee =>
    employee.employeeId.toLowerCase().includes(search) ||
    employee.firstName.toLowerCase().includes(search) ||
    employee.lastName.toLowerCase().includes(search)
  );
}

view(employeeId: string=""): void {
  // This can navigate to a detailed Employee view page or perform other actions
  this.router.navigate([`/employee-detail/${employeeId}`]); // For example, navigating to a detailed view page
  console.log("viewing");
}




}