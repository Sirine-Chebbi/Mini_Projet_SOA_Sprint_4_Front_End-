import { APP_INITIALIZER, NgModule,  Inject, PLATFORM_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { SeriesComponent } from './series/series.component';


function initializeKeycloak(keycloak: KeycloakService, platformId: object) {
  return () => {
    if (isPlatformBrowser(platformId)) {
      return keycloak.init({
        config: {
          url: 'http://localhost:8090',
          realm: 'sirine-realm',
          clientId: 'prod-app'
        },
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: true
        }
      });
    } else {
      console.warn('Keycloak not initialized: Running on server.');
      return Promise.resolve();
    }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    SeriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    KeycloakAngularModule
  ],
  providers: [

    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, PLATFORM_ID]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }