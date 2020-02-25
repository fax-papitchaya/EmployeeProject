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
  OnSubmit: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    // รับค่า id จาก url
    this.id = this.activatedRoute.snapshot.params["id"];

    // ถ้ามี id แสดงว่าเป็นการ update , ถ้าไม่มีค่า id แสดงว่าเป็น insert
    if (this.id) {
      this.OnSubmit = true;
      this.editMode = true; // update
    } else {
      this.OnSubmit = false;
      this.editMode = false; // insert
    }

    // ประกาศ Control ที่ใช้ในฟอร์ม
    this.employeeForm = new FormGroup({
      firstname: new FormControl("", [Validators.required]),
      lastname: new FormControl("", [Validators.required]),
      birthday: new FormControl("", [Validators.required]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")
      ])
    });

    // ถ้ามี id แสดงว่าเป็นการ update ให้เรียกข้อมูล Employee ของคนนั้นๆมาแสดง โดยใช้ id
    if (this.editMode) {
      this.getEmployeeById(this.id);
    }
  }

  getEmployeeById(id: string) {
    // ข้อมูล Employee รายคน
    this.employeeService.getEmployeeByID(id).subscribe(res => {
      this.employeeList = res;
      // นำข้อมูลที่ได้มาแสดงบนฟอร์ม
      this.employeeForm.patchValue({
        firstname: this.employeeList.firstname,
        lastname: this.employeeList.lastname,
        birthday: this.employeeList.birthday,
        email: this.employeeList.email
      });
    });
  }

  onSubmit() {
    this.OnSubmit = true;
    // นำค่าที่ได้จากฟอร์ม ระบุลงไปใน model Employees
    const formValue = this.employeeForm.value;
    const employees = new Employees();
    employees.firstname = formValue.firstname;
    employees.lastname = formValue.lastname;
    employees.birthday = formValue.birthday;
    employees.email = formValue.email;
    if (
      employees.firstname.trim() === "" ||
      employees.lastname.trim() === "" ||
      employees.birthday.toString() === "" ||
      employees.email.trim() === ""
    ) {
      alert("กรุณาระบุข้อมูลให้ครบถ้วน");
    } else {
      if (this.editMode) {
        // update : put
        employees._id = this.id;
        this.employeeService.updateEmployeeById(employees).subscribe(
          res => {
            // update สำเร็จ ให้กลับไปยังหน้ารายการ Employee
            alert("บันทึกข้อมูลเรียบร้อย");
            this.router.navigate(["../../"], {
              relativeTo: this.activatedRoute
            });
          },
          error =>
            alert("ไม่สามารถบันทึกข้อมูลได้ กรุณาตรวจสอบความถูกต้องของข้อมูล!") // หาก error ให้แสดงข้อความ
        );
      } else {
        // insert : post
        this.employeeService.addNewEmployee(employees).subscribe(
          res => {
            // insert สำเร็จ ให้กลับไปยังหน้ารายการ Employee
            alert("เพิ่มข้อมูลเรียบร้อย");
            this.router.navigate(["../"], { relativeTo: this.activatedRoute });
          },
          error =>
            alert("ไม่สามารถบันทึกข้อมูลได้ กรุณาตรวจสอบความถูกต้องของข้อมูล!") // หาก error ให้แสดงข้อความ
        );
      }
    }
  }

  onCancel() {
    // เมื่อกด ยกเลิก ให้กลับไปยังหน้ารายการ Employee
    const path = this.editMode ? "../../" : "../";
    this.router.navigate([path], { relativeTo: this.activatedRoute });
  }
}
