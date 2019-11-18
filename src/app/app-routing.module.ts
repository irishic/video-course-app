import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CoursesPageComponent } from "./courses-page/courses-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: "courses", component: CoursesPageComponent, canActivate: [AuthService] },
  { path: "login", component: LoginPageComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
