import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.html = (text: string) => {
    if (new RegExp(/\<\!\-\-\- example\(.+\) -->/).test(text)) {
      const groups = text.match(/\<\!\-\-\- example\(([a-zA-Z]+)\) -->/);
      const componentName = groups![1];

      return text.replace(
        /\<\!\-\-\- example\(.+\) -->/,
        `<div>
            <foundation-frame componentname="${componentName}"></foundation-frame>
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
