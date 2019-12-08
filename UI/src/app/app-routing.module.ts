import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { NotFoundPageComponent } from "./shared/pages/not-found/pages/not-found-page/not-found-page.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "courses"
  },
  { path: "**", component: NotFoundPageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // enableTracing: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
