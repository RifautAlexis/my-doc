
import { routes } from './app/app-routing';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    importProvidersFrom(
      RouterModule.forRoot(routes),
      MarkdownModule.forRoot(),
    ),
  ],
}).catch((err) => console.error(err));
