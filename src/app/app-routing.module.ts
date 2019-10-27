import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CoursesPageComponent } from "./courses-page/courses-page.component";

const routes: Routes = [
  { path: "courses", component: CoursesPageComponent },
  { path: "", redirectTo: "/courses", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
