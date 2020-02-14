import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "./shared/employee.service";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html"
})
export class EmployeeListComponent implements OnInit {
  employeeList: any;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployeeAll();
  }
  getEmployeeAll() {
    this.employeeService.getEmployeeAll().subscribe(res => {
      this.employeeList = res;
    });
  }

  onDelete(id: string) {
    if (confirm("ต้องการลบข้อมูลใช่หรือไม่")) {
      this.employeeService.DeleteEmployeeByID(id).subscribe(
        () => {
          this.getEmployeeAll();
        },
        error => console.log("onDelete Error")
      );
    }
  }
}
