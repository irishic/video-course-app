import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { CoursesModule } from "./modules/courses/courses.module";
import { LoginModule } from "./modules/login/login.module";
import { NotFoundModule } from "./shared/pages/not-found/not-found.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { ModalDialogComponent } from "./shared/components/modal-dialog/modal-dialog.component";
import { ConfirmComponent } from "./shared/components/modal-dialog/confirm/confirm.component";
import { InfoComponent } from "./shared/components/modal-dialog/info/info.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { LogoComponent } from "./shared/components/logo/logo.component";
import { HeaderControlsComponent } from "./shared/components/header-controls/header-controls.component";
import { BreadcrumbsComponent } from "./shared/components/breadcrumbs/breadcrumbs.component";
import { OverlayModule } from "@angular/cdk/overlay";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthService } from "./shared/services/auth.service";
import { FaIconStub } from "./testing/fa-icon-stub";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./shared/http-interceptors/auth";
import { CookieService } from "ngx-cookie-service";

import { MatDialogModule, MatButtonModule } from "@angular/material";
import { BodyStructureInterceptor } from "./shared/http-interceptors/body-structure";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    HeaderControlsComponent,
    BreadcrumbsComponent,
    ConfirmComponent,
    InfoComponent,
    ModalDialogComponent,
    FaIconStub
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    OverlayModule,
    BrowserAnimationsModule,
    CoursesModule,
    LoginModule,
    AppRoutingModule,
    NotFoundModule,
    MatButtonModule,
    MatDialogModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: "AuthService",
      useClass: AuthService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BodyStructureInterceptor,
      multi: true
    },
    CookieService
  ]
})
export class AppModule {}
