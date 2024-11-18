import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../_service/admin.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  

  constructor(private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
  }
  
  onSubmitAdminLogin(): void {
    this.adminService.login(this.username, this.password).subscribe((response: any) => {
      // Handle login success
      localStorage.setItem('user', JSON.stringify(response));
      console.log('Login successful');
      // Redirect to EmployeesRegisterComponent
      this.router.navigate(['/employees-register']);
    }, (error: any) => {
      // Handle login error
      console.error('Login failed', error);
    });
  }
  

  onEmployeeLogin() {
    // Redirect to the employee login page
    this.router.navigate(['/employee-login']);
  }

 
}
