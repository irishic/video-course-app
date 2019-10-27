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
import { MinutesConverterPipe } from './pipes/minutes-converter.pipe';

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
    MinutesConverterPipe
  ],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
