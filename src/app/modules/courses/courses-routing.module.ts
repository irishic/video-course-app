import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CoursesPageComponent } from "./pages/courses-page/courses-page.component";
import { CourseDetailsPageComponent } from "./pages/course-details-page/course-details-page.component";
import { AuthGuard } from '../../shared/guards/auth.guard';
import { NotFoundPageComponent } from '../../shared/pages/not-found/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: "courses",
    component: CoursesPageComponent,
    data: {
      breadcrumb: {
        label: "courses",
        routeName: "courses"
      }
    },
    canActivate: [AuthGuard]
  },
  {
    path: "courses/:courseId",
    component: CourseDetailsPageComponent,
    data: {
      breadcrumb: {
        dynamicLabel: "title",
        dynamicKey: "courseId"
      }
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule {}
