import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { AnimalsEffect } from './state/animals/animals.effect';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { animalsReducer } from './state/animals/animals.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(),importProvidersFrom(
    HttpClientModule,
    StoreModule.forRoot({animals:animalsReducer }),
    EffectsModule.forRoot([AnimalsEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: false, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  )]
};
