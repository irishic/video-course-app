import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { CoursesModule } from './modules/courses/courses.module';
import { LoginModule } from './modules/login/login.module';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { LogoComponent } from "./shared/components/logo/logo.component";
import { HeaderControlsComponent } from "./shared/components/header-controls/header-controls.component";
import { BreadcrumbsComponent } from "./shared/components/breadcrumbs/breadcrumbs.component";
import { OverlayModule } from "@angular/cdk/overlay";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    HeaderControlsComponent,
    BreadcrumbsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    CoursesModule,
    LoginModule,
    OverlayModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: "AuthService",
      useClass: AuthService
    }
  ],
})
export class AppModule {}
