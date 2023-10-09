import { FoundationFrameComponent } from './app/renderer/doc/foundation-frame/foundation-frame.component';
import { routes } from './app/app-routing';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { ApplicationRef, SecurityContext, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { provideHttpClient } from '@angular/common/http';
import { markedOptionsFactory } from './app/renderer/tools/foundation-token';
import { createCustomElement } from '@angular/elements';
import { FoundationExamplesComponent } from './app/renderer/doc/foundation-frame/foundation-examples/foundation-examples.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(
      RouterModule.forRoot(routes),
      MarkdownModule.forRoot({
        sanitize: SecurityContext.NONE,
        markedOptions: {
          provide: MarkedOptions,
          useFactory: markedOptionsFactory,
        },
      })
    ),
  ],
})
.then((appRef: ApplicationRef) => {
  const foundationExamples = createCustomElement(
		FoundationExamplesComponent, // component for Angular element
		{ injector: appRef.injector } // used to inject the component to the DOM
	);
  const foundationFrameComponent = createCustomElement(
		FoundationFrameComponent, // component for Angular element
		{ injector: appRef.injector } // used to inject the component to the DOM
	);

	// register in a browser
	customElements.define('foundation-examples', foundationExamples);
	customElements.define('foundation-frame', foundationFrameComponent);
})
.catch((err) => console.error(err));
