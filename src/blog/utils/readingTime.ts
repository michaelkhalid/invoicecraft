/**
 * Automatically calculates the estimated reading time of an article's body content.
 * Assuming an average reader reads at 200 words per minute.
 */
export const calculateReadingTime = (content: string): string => {
  if (!content) return '1 min read';
  
  // Strip Markdown markers to avoid counting symbols as words
  const cleanText = content
    .replace(/[#*`|\[\]\(\)-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
    
  const wordCount = cleanText.split(/\s+/).filter(word => word.length > 0).length;
  const minutes = Math.ceil(wordCount / 200);
  
  return `${minutes} min read`;
};
