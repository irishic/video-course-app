import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CoursesRoutingModule } from "./courses-routing.module";

import { CoursesPageComponent } from "./pages/courses-page/courses-page.component";
import { CourseSearchComponent } from "./components/course-search/course-search.component";
import { CoursesListComponent } from "./components/courses-list/courses-list.component";
import { CoursesListItemComponent } from "./components/courses-list-item/courses-list-item.component";
import { HighlightElementDirective } from "./directives/highlight-element.directive";
import { MinutesConverterPipe } from "./pipes/minutes-converter.pipe";
import { OrderByPipe } from "./pipes/order-by.pipe";
import { CourseControllerService } from "./services/course-controller.service";
import { CoursesDataService } from "./services/courses-data.service";
import { MatDialogModule, MatButtonModule } from "@angular/material";

import { ModalDialogComponent } from "../../shared/components/modal-dialog/modal-dialog.component";
import { ConfirmComponent } from "../../shared/components/modal-dialog/confirm/confirm.component";

@NgModule({
  declarations: [
    CoursesPageComponent,
    CourseSearchComponent,
    CoursesListComponent,
    CoursesListItemComponent,
    OrderByPipe,
    HighlightElementDirective,
    MinutesConverterPipe,
    ModalDialogComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    FormsModule,
    FontAwesomeModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: "CourseControllerService",
      useClass: CourseControllerService
    },
    {
      provide: "CoursesDataService",
      useClass: CoursesDataService
    }
  ],
  entryComponents: [ModalDialogComponent]
})
export class CoursesModule {}
