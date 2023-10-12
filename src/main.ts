import { routes } from './app/app-routing';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { ApplicationRef, SecurityContext, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { provideHttpClient } from '@angular/common/http';
import { markedOptionsFactory } from './app/renderer/tools/doc-example-token';
import { createCustomElement } from '@angular/elements';
import { ExampleViewerComponent } from './app/renderer/doc/doc-example-viewer/components/example-viewer/example-viewer.component';
import { DocExampleViewerComponent } from './app/renderer/doc/doc-example-viewer/doc-example-viewer.component';

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
  const exampleViewerComponent = createCustomElement(
		ExampleViewerComponent, // component for Angular element
		{ injector: appRef.injector } // used to inject the component to the DOM
	);
  const docExampleViewerComponent = createCustomElement(
		DocExampleViewerComponent, // component for Angular element
		{ injector: appRef.injector } // used to inject the component to the DOM
	);

	// register in a browser
	customElements.define('example-viewer', exampleViewerComponent);
	customElements.define('doc-example-viewer', docExampleViewerComponent);
})
.catch((err) => console.error(err));
