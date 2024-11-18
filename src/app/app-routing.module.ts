import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ListOfEmployeesComponent } from './list-of-employees/list-of-employees.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { AddEmployeesComponent } from './add-employees/add-employees.component';
import { EmployeesRegisterComponent } from './employees-register/employees-register.component';
import { UpdateEmployeesComponent } from './update-employees/update-employees.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'list-of-employees', component: ListOfEmployeesComponent},
  { path: 'employee-detail/:employeeId', component: EmployeeDetailComponent},
  { path: 'add-employees', component: AddEmployeesComponent},
  { path: 'employees-register', component: EmployeesRegisterComponent},
  { path: 'update-employees/:id', component: UpdateEmployeesComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
