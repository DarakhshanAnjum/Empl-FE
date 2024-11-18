import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employees-register',
  templateUrl: './employees-register.component.html',
  styleUrls: ['./employees-register.component.css']
})
export class EmployeesRegisterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

// Function to navigate to the Employee Registration page
registerEmployee() {
  this.router.navigate(['/register-employee']);
}

// Function to navigate to the Employee List page
goToListOfEmployees() {
  this.router.navigate(['/list-of-employees']);
}

}
