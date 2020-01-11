import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { CoursesModule } from "./modules/courses/courses.module";
import { LoginModule } from "./modules/login/login.module";
import { NotFoundModule } from "./shared/pages/not-found/not-found.module";
import { ModalDialogModule } from "./modules/modal-dialog/modal-dialog.module";

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
import { AuthService } from "./shared/services/auth.service";
import { FaIconStub } from "./testing/fa-icon-stub";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./shared/http-interceptors/auth";
import { CookieService } from "ngx-cookie-service";

import { MatDialogModule, MatButtonModule } from "@angular/material";
import { BodyStructureInterceptor } from "./shared/http-interceptors/body-structure";
import { LoadingBlockComponent } from "./shared/components/loading-block/loading-block.component";
import { LoadingIndicatorInterceptor } from "./shared/http-interceptors/loading-indicator";
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import * as fromAuth from './reducers/auth/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    HeaderControlsComponent,
    BreadcrumbsComponent,
    FaIconStub,
    LoadingBlockComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    OverlayModule,
    BrowserAnimationsModule,
    CoursesModule,
    LoginModule,
    ModalDialogModule,
    AppRoutingModule,
    NotFoundModule,
    MatButtonModule,
    MatDialogModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forRoot([AuthEffects])
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingIndicatorInterceptor,
      multi: true
    },
    CookieService
  ]
})
export class AppModule {}
