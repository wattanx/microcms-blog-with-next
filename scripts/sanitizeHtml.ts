import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;

// @ts-ignore
export const sanitizeHtml = (html: string) => DOMPurify(window).sanitize(html);
