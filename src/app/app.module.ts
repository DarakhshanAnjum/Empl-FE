import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminService } from './_service/admin.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NavigationBaarComponent } from './navigation-baar/navigation-baar.component';
import { ListOfEmployeesComponent } from './list-of-employees/list-of-employees.component';
import { FormsModule } from '@angular/forms';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { AddEmployeesComponent } from './add-employees/add-employees.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesRegisterComponent } from './employees-register/employees-register.component';
import { UpdateEmployeesComponent } from './update-employees/update-employees.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditEmployeeDetailDialogeComponent } from './edit-employee-detail-dialoge/edit-employee-detail-dialoge.component'; // Import FormsModule;
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DeletedialogComponent } from './deletedialog/deletedialog.component';
// Define your routes here
const routes: Routes = [
  { path: '', component: HomeComponent },  // Home route
  { path: 'login', component: LoginComponent },  // Login route
  { path: 'list-of-employees', component: ListOfEmployeesComponent },  // Employees list
  { path: 'employee-detail/:id', component: EmployeeDetailComponent },  // Employee detail with param
  { path: 'add-employees', component: AddEmployeesComponent },  // Add employee form
  { path: 'employees-register', component: EmployeesRegisterComponent },  // Registration route
  { path: 'update-employees/:id', component: UpdateEmployeesComponent },  // Update employee route with id
  { path: 'edit-employee-detail-dialoge', component: EditEmployeeDetailDialogeComponent },  // Edit employee dialog route
  { path: '**', redirectTo: '' }  // Wildcard route for 404
  
];


@NgModule({
  declarations: [
    AppComponent,
    
    HomeComponent,
    LoginComponent,
    NavigationBaarComponent,
    ListOfEmployeesComponent,
    EmployeeDetailComponent,
    SafeUrlPipe,
    AddEmployeesComponent,
    
    EmployeesRegisterComponent,
         UpdateEmployeesComponent,
         EditEmployeeDetailDialogeComponent,
         DeletedialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    RouterModule.forRoot(routes),  // Add this to configure routes
    MatCardModule,  // Import MatCardModule here
    MatFormFieldModule, // Add this
    MatInputModule,     // Add this
    MatSelectModule, // Add this
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
