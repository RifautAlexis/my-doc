import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.html = (text: string) => {
    return text.replace(
      /\<\!\-\-\- example\(.+\) -->/,
      `<foundation-examples [componentType]="MyChipsComponent"></foundation-examples>`
    );
  };

  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false,
  };
}
