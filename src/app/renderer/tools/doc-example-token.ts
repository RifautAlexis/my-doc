import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();
  const markdownExampleToken = /\<\!\-\-\- example\(.+\) -->/;

  renderer.html = (text: string) => {
    if (new RegExp(markdownExampleToken).test(text)) {
      const groups = text.match(/\<\!\-\-\- example\(([a-zA-Z]+)\) -->/);
      const componentName = groups![1];

      return text.replace(
        markdownExampleToken,
        `<div>
          <doc-example-viewer componentname="${componentName}"></doc-example-viewer>
        </div>`
      );
    }

    return '';
  };

  return {
    renderer: renderer,
    gfm: true,
    breaks: true,
    headerIds: true,
    pedantic: false,
    smartLists: true,
    smartypants: false,
  };
}
