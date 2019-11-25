import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CoursesPageComponent } from "./pages/courses-page/courses-page.component";

const routes: Routes = [
  { path: "courses", component: CoursesPageComponent, canActivate: [AuthService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
