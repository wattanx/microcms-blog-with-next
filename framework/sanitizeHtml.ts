import DOMPurify from 'dompurify';

export const sanitizeHtml = (html: string) => DOMPurify.sanitize(html);
