import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "./shared/employee.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Employees } from "./shared/employee.model";

@Component({
  selector: "app-employee-form",
  templateUrl: "./employee-form.component.html"
})
export class EmployeeFormComponent implements OnInit {
  id: string;
  editMode: boolean = false;
  employeeForm: FormGroup;
  employeeList: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    if (this.id) {
      this.editMode = true;
    } else {
      this.editMode = false;
    }
    this.employeeForm = new FormGroup({
      firstname: new FormControl("", [Validators.required]),
      lastname: new FormControl("", [Validators.required]),
      birthday: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required])
    });

    if (this.editMode) {
      this.getEmployeeById(this.id);
    }
  }

  getEmployeeById(id: string) {
    this.employeeService.getEmployeeByID(id).subscribe(res => {
      this.employeeList = res;
      this.employeeForm.patchValue({
        firstname: this.employeeList.firstname,
        lastname: this.employeeList.lastname,
        birthday: this.employeeList.birthday,
        email: this.employeeList.email
      });
    });
  }

  onSubmit() {
    const formValue = this.employeeForm.value;
    const employees = new Employees();
    employees.firstname = formValue.firstname;
    employees.lastname = formValue.lastname;
    employees.birthday = formValue.birthday;
    employees.email = formValue.email;

    if (this.editMode) {
      //update : put
      employees._id = this.id;
      this.employeeService.updateEmployeeById(employees).subscribe(
        res => {
          this.router.navigate(["../../"], {
            relativeTo: this.activatedRoute
          });
        },
        error => console.log("Update Error")
      );
    } else {
      //insert : post
      this.employeeService.addNewEmployee(employees).subscribe(
        res => {
          this.router.navigate(["../"], { relativeTo: this.activatedRoute });
        },
        error => console.log("insert Error")
      );
    }
  }

  onCancel() {
    const path = this.editMode ? "../../" : "../";
    this.router.navigate([path], { relativeTo: this.activatedRoute });
  }
}
