import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Employees } from "./employee.model";

@Injectable()
export class EmployeeService {
  apiURL: string = "https://dummy-api.cm.edu";

  constructor(private httpClient: HttpClient, private route: Router) {}

  gethttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Basic dXNlcjY6ZnlQOXVmNFFpYTNGRWZScTZEUjU="
      })
    };
    return httpOptions;
  }

  getEmployeeAll() {
    return this.httpClient.get(
      `${this.apiURL}/employees`,
      this.gethttpOptions()
    );
  }
  getEmployeeByID(id: string) {
    const url = `${this.apiURL}/employees/${id}`;
    return this.httpClient.get(url, this.gethttpOptions());
  }

  addNewEmployee(employees: Employees) {
    const url = `${this.apiURL}/employees`;
    return this.httpClient.post(url, employees, this.gethttpOptions());
  }

  updateEmployeeById(employees: Employees) {
    const url = `${this.apiURL}/employees/${employees._id}`;
    return this.httpClient.put(url, employees, this.gethttpOptions());
  }

  DeleteEmployeeByID(id: string) {
    const url = `${this.apiURL}/employees/${id}`;
    return this.httpClient.delete(url, this.gethttpOptions());
  }
}
