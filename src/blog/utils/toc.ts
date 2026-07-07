export interface HeadingItem {
  text: string;
  id: string;
  level: number; // 2 for H2, 3 for H3
}

/**
 * Parses markdown-like headers (## and ###) to generate a structured Table of Contents list.
 */
export const generateTOC = (content: string): HeadingItem[] => {
  if (!content) return [];
  
  const lines = content.split('\n');
  const headings: HeadingItem[] = [];
  
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ') || trimmed.startsWith('### ')) {
      const level = trimmed.startsWith('## ') ? 2 : 3;
      const rawText = level === 2 ? trimmed.replace('## ', '') : trimmed.replace('### ', '');
      
      // Create a URL-friendly anchor ID
      const headingId = rawText
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // remove special characters
        .trim()
        .replace(/\s+/g, '-') // replace multiple spaces with single hyphen
        .replace(/-+/g, '-'); // collapse consecutive hyphens
        
      headings.push({
        text: rawText,
        id: headingId,
        level
      });
    }
  });
  
  return headings;
};

/**
 * Creates a slug for a given heading text to match the anchors in the document rendering.
 */
export const headingToSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};
