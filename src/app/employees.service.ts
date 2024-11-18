import { Injectable } from '@angular/core';
import { Employees } from './employees';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

 constructor(private httpClient: HttpClient) {}


  private baseUrl = "http://localhost:8080/employees/getall";


  getAllEmployees(): Observable<Employees[]> {
    return this.httpClient.get<Employees[]>(`${this.baseUrl}`);
  }

 private link = "http://localhost:8080/employees/get"

 getbyEmployeeId(employeeId: string=""): Observable<Employees>{
  return this.httpClient.get<Employees>(`${this.link}/${employeeId}`);
}

private url = "http://localhost:8080/employees/insert"

// employeesform(formData: FormData) :Observable<Employees[]>{
  // return this.httpClient.post<Employees[]>(`${this.url}`, formData );
// }

employeesform(formData: FormData): Observable<any> {
  return this.httpClient.post<any>(this.url, formData);
}

// Update Employee Details

private urm = "http://localhost:8080/employees/update"

updateEmployee(employeeId: string, updatedEmployee: FormData): Observable<any> {
  const ura = `${this.urm}/${employeeId}`;
  return this.httpClient.put<any>(ura, updatedEmployee);
}

// Delete Employee
private deleteUrl = "http://localhost:8080/employees/delete";

deleteEmployee(employeeId: string): Observable<any> {
  const urf = `${this.deleteUrl}/${employeeId}`;
  return this.httpClient.delete<any>(urf);
}
}
