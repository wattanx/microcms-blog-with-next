import { JSDOM } from 'jsdom';

export type TocTypes = {
  text: string;
  id: string;
  name: string;
};

/**
 * 目次用のUtilityクラス
 */
export class TocUtil {
  /**
   * HtmlStringを目次へ変換します
   * @param htmlString HTML文字列
   * @returns 目次
   */
  public static convertToToc(htmlString: string): TocTypes[] {
    const dom = new JSDOM(htmlString);
    const toc: TocTypes[] = [];
    dom.window.document.querySelectorAll('h1, h2, h3').forEach((heading) => {
      toc.push({
        id: heading.id,
        name: heading.tagName,
        text: heading.textContent,
      });
    });
    return toc;
  }
}
