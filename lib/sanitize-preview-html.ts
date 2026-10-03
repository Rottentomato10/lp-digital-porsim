// Lightweight sanitizer for previewing admin-authored HTML email bodies in the dashboard.
// Strips script tags, event handler attributes, and javascript: URLs before rendering
// via dangerouslySetInnerHTML. Not a full sanitizer — only intended for trusted-admin
// preview of their own content, as defense-in-depth against stray/malicious markup.
export function sanitizePreviewHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, '')
    .replace(/\son\w+\s*=\s*'[^']*'/gi, '')
    .replace(/\son\w+\s*=\s*[^\s>]+/gi, '')
    .replace(/(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, '$1=$2#$2')
}
