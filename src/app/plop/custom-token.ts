import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.html = (text: string) => {
    return text.replace(
      /\<\!\-\-\- example\(.+\) -->/,
      `<custom-element label=FromCustomRender></custom-element>`
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
