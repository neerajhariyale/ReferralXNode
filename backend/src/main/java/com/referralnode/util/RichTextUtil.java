package com.referralnode.util;

import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

/**
 * Utility class for handling rich text content (HTML from Quill editor)
 */
@Component
public class RichTextUtil {
    
    // Basic HTML tags allowed from Quill editor
    private static final Pattern ALLOWED_TAGS = Pattern.compile(
        "</?(?:p|br|strong|em|u|s|h1|h2|h3|ol|ul|li|a|blockquote|pre|code)(?:\\s[^>]*)?>",
        Pattern.CASE_INSENSITIVE
    );
    
    /**
     * Validates if the content is valid HTML from Quill editor
     * @param html The HTML content to validate
     * @return true if valid, false otherwise
     */
    public boolean isValidRichText(String html) {
        if (html == null || html.trim().isEmpty()) {
            return true; // Empty is valid
        }
        
        // Check for potentially dangerous content
        String lowerHtml = html.toLowerCase();
        if (lowerHtml.contains("<script") || 
            lowerHtml.contains("javascript:") || 
            lowerHtml.contains("onerror=") ||
            lowerHtml.contains("onclick=")) {
            return false;
        }
        
        return true;
    }
    
    /**
     * Sanitizes HTML content by removing potentially dangerous elements
     * while preserving Quill editor formatting
     * @param html The HTML content to sanitize
     * @return Sanitized HTML
     */
    public String sanitizeRichText(String html) {
        if (html == null || html.trim().isEmpty()) {
            return html;
        }
        
        // Remove script tags and event handlers
        String sanitized = html
            .replaceAll("<script[^>]*>.*?</script>", "")
            .replaceAll("(?i)on\\w+\\s*=\\s*[\"'][^\"']*[\"']", "")
            .replaceAll("(?i)javascript:", "")
            .replaceAll("(?i)<iframe[^>]*>.*?</iframe>", "");
        
        return sanitized.trim();
    }
    
    /**
     * Converts HTML to plain text by stripping all tags
     * Useful for search indexing or previews
     * @param html The HTML content
     * @return Plain text content
     */
    public String htmlToPlainText(String html) {
        if (html == null || html.trim().isEmpty()) {
            return "";
        }
        
        return html
            .replaceAll("<[^>]+>", "") // Remove all HTML tags
            .replaceAll("&nbsp;", " ")
            .replaceAll("&amp;", "&")
            .replaceAll("&lt;", "<")
            .replaceAll("&gt;", ">")
            .replaceAll("&quot;", "\"")
            .replaceAll("&#39;", "'")
            .replaceAll("\\s+", " ") // Normalize whitespace
            .trim();
    }
    
    /**
     * Gets a preview/excerpt from HTML content
     * @param html The HTML content
     * @param maxLength Maximum length of the preview
     * @return Preview text
     */
    public String getPreview(String html, int maxLength) {
        String plainText = htmlToPlainText(html);
        
        if (plainText.length() <= maxLength) {
            return plainText;
        }
        
        return plainText.substring(0, maxLength) + "...";
    }
    
    /**
     * Checks if content is empty (no meaningful text after stripping HTML)
     * @param html The HTML content
     * @return true if empty, false otherwise
     */
    public boolean isEmpty(String html) {
        if (html == null) {
            return true;
        }
        
        String plainText = htmlToPlainText(html);
        return plainText.trim().isEmpty();
    }
}
