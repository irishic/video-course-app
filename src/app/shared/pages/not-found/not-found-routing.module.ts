import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";

const routes: Route[] = [{ path: "", component: NotFoundPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotFoundRoutingModule {}
