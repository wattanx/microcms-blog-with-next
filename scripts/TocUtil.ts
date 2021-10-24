import { TocTypes } from '@types';
import { JSDOM } from 'jsdom';

export function convertToToc(htmlString: string): TocTypes[] {
  const dom = new JSDOM(htmlString);
  const toc: TocTypes[] = [];
  dom.window.document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
    toc.push({
      id: heading.id,
      name: heading.tagName,
      text: heading.textContent,
    });
  });
  return toc;
}
