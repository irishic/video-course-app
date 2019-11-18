import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { LogoComponent } from "./logo/logo.component";
import { CoursesPageComponent } from "./courses-page/courses-page.component";
import { HeaderControlsComponent } from "./header-controls/header-controls.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { CourseSearchComponent } from "./course-search/course-search.component";
import { CoursesListComponent } from "./courses-list/courses-list.component";
import { MinutesConverterPipe } from "./pipes/minutes-converter.pipe";
import { CoursesListItemComponent } from "./courses-list-item/courses-list-item.component";
import { HighlightElementDirective } from "./directives/highlight-element.directive";
import { CoursesDataService } from "./services/courses-data.service";
import { OrderByPipe } from "./pipes/order-by.pipe";
import { ModalDialogComponent } from "./modal-dialog/modal-dialog.component";
import { MatDialogModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material'
import { OverlayModule } from "@angular/cdk/overlay";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ConfirmComponent } from './modal-dialog/confirm/confirm.component';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    CoursesPageComponent,
    HeaderControlsComponent,
    BreadcrumbsComponent,
    CourseSearchComponent,
    CoursesListComponent,
    MinutesConverterPipe,
    CoursesListItemComponent,
    HighlightElementDirective,
    OrderByPipe,
    ModalDialogComponent,
    ConfirmComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    OverlayModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    {
      provide: "CoursesDataService",
      useClass: CoursesDataService
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalDialogComponent, ConfirmComponent]
})
export class AppModule {}
