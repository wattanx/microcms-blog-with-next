import sanitizeHtmlLib from 'sanitize-html';

export const sanitizeHtml = (html: string) => sanitizeHtmlLib(html);
