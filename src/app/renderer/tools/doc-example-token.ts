import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();
  const markdownExampleToken = /<!--\s*example\(([^)]+)\)\s*-->/g;

  renderer.html = (text: string): string => {
    return text.replace(
      markdownExampleToken,
      (_match: string, firstCapturingGroup: string) => {
        if (firstCapturingGroup.match(/\{[\s\S]*\}/g)) {
          const { componentName, basePath, fileName } = JSON.parse(
            firstCapturingGroup
          ) as {
            componentName: string;
            basePath: string;
            fileName: string;
          };

          return `<div>
            <doc-example-viewer componentname="${componentName}" basepath="${basePath}" filename="${fileName}"></doc-example-viewer>
          </div>`;
        }
        return '';
      }
    );
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
