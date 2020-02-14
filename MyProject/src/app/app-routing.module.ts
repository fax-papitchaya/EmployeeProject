import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EmployeeListComponent } from "./modules/employee-list.component";
import { EmployeeFormComponent } from "./modules/employee-form.component";

const routes: Routes = [
  { path: "", component: EmployeeListComponent },
  { path: "add", component: EmployeeFormComponent },
  { path: "edit/:id", component: EmployeeFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
