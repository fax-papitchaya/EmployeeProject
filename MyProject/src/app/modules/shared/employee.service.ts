import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Employees } from "./employee.model";

@Injectable()
export class EmployeeService {
  apiURL: string = "https://dummy-api.cm.edu";

  constructor(private httpClient: HttpClient, private route: Router) {}

  // OPTIONS เพื่อใช้ในการร้องขอข้อมูล
  gethttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("user6:fyP9uf4Qia3FEfRq6DR5")
      })
    };
    return httpOptions;
  }

  // GET /employees : ข้อมูล employees ทั้งหมด
  getEmployeeAll() {
    return this.httpClient.get(
      `${this.apiURL}/employees`,
      this.gethttpOptions()
    );
  }

  // GET /employees/:id  : ข้อมูล employee รายบุคคล
  getEmployeeByID(id: string) {
    const url = `${this.apiURL}/employees/${id}`;
    return this.httpClient.get(url, this.gethttpOptions());
  }

  // POST /employees : สำหรับ insert employee
  addNewEmployee(employees: Employees) {
    const url = `${this.apiURL}/employees`;
    return this.httpClient.post(url, employees, this.gethttpOptions());
  }

  // PUT /employees/:id  : สำหรับ update employee
  updateEmployeeById(employees: Employees) {
    const url = `${this.apiURL}/employees/${employees._id}`;
    return this.httpClient.put(url, employees, this.gethttpOptions());
  }

  // DEL /employees/:id  : สำหรับ delete employee
  DeleteEmployeeByID(id: string) {
    const url = `${this.apiURL}/employees/${id}`;
    return this.httpClient.delete(url, this.gethttpOptions());
  }
}
