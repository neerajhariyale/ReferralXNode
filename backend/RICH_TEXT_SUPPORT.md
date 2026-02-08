# Rich Text HTML Support - Implementation Summary

## Overview
The backend now fully supports **rich text HTML** from the Quill editor used in your frontend. This allows job descriptions to be formatted with headers, lists, bold text, links, and more!

---

## What Changed

### 1. **New Utility Class: `RichTextUtil.java`**
Located: `src/main/java/com/referralnode/util/RichTextUtil.java`

**Features:**
- ✅ Validates HTML content
- ✅ Sanitizes HTML to remove dangerous content (scripts, event handlers, etc.)
- ✅ Converts HTML to plain text (useful for search/previews)
- ✅ Generates text previews from HTML
- ✅ Checks if HTML content is empty

**Security Features:**
- Removes `<script>` tags
- Removes JavaScript event handlers (onclick, onerror, etc.)
- Removes `javascript:` protocol from links
- Removes `<iframe>` tags

---

### 2. **Custom Validation**

**Files Created:**
- `src/main/java/com/referralnode/validation/ValidRichText.java` - Annotation
- `src/main/java/com/referralnode/validation/RichTextValidator.java` - Validator

**Usage:**
```java
@ValidRichText(message = "Description must be valid rich text content")
@NotBlank(message = "Description is required")
private String description;
```

This ensures that:
- HTML is validated before saving
- Dangerous content is rejected
- Empty content is handled properly

---

### 3. **Updated Files**

#### `JobRequest.java`
- Added `@ValidRichText` annotation to description field
- Now validates HTML content on input

#### `JobMapper.java`
- Injects `RichTextUtil`
- Sanitizes HTML before saving to database
- Sanitizes HTML when updating jobs

#### `JobService.java`
- Injects `RichTextUtil` for use in mapper

---

## How It Works

### Flow Diagram

```
Frontend (Quill Editor)
    ↓
Sends HTML: "<h2>Title</h2><p>Content</p>"
    ↓
Backend Receives Request
    ↓
@ValidRichText Validator
    ├─ Checks for dangerous content
    ├─ Validates HTML structure
    └─ Rejects if invalid
    ↓
JobMapper.toEntity()
    ├─ Calls richTextUtil.sanitizeRichText()
    ├─ Removes any remaining dangerous content
    └─ Preserves safe HTML tags
    ↓
Database (PostgreSQL TEXT column)
    Stores: "<h2>Title</h2><p>Content</p>"
    ↓
API Response
    Returns HTML as-is
    ↓
Frontend (Quill Editor)
    Renders formatted content
```

---

## Supported HTML Tags

The following HTML tags from Quill editor are fully supported:

### Headers
- `<h1>`, `<h2>`, `<h3>`

### Text Formatting
- `<strong>` (bold)
- `<em>` (italic)
- `<u>` (underline)
- `<s>` (strikethrough)

### Lists
- `<ul>` (unordered list)
- `<ol>` (ordered list)
- `<li>` (list item)

### Links
- `<a href="...">` (hyperlinks)

### Paragraphs
- `<p>` (paragraph)
- `<br>` (line break)

### Quotes & Code
- `<blockquote>` (quotes)
- `<pre>` (preformatted text)
- `<code>` (code)

---

## Example Usage

### Creating a Job with Rich Text

**Request:**
```bash
curl -X POST "http://localhost:8080/api/admin/jobs" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior Java Developer",
    "company": "TechCorp",
    "location": "Remote",
    "description": "<h2>About the Role</h2><p>We are looking for an experienced Java developer.</p><h3>Requirements:</h3><ul><li><strong>5+ years</strong> of Java experience</li><li>Spring Boot expertise</li><li>Microservices architecture</li></ul><h3>Benefits:</h3><ul><li>Competitive salary</li><li>Remote work</li><li>Health insurance</li></ul>",
    "salaryRange": "$120k - $180k",
    "postedAt": "2026-02-08T10:00:00",
    "sourceUrl": "https://techcorp.com/careers",
    "tags": ["Java", "Spring Boot", "Remote"]
  }'
```

**Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Senior Java Developer",
  "company": "TechCorp",
  "location": "Remote",
  "description": "<h2>About the Role</h2><p>We are looking for an experienced Java developer.</p><h3>Requirements:</h3><ul><li><strong>5+ years</strong> of Java experience</li><li>Spring Boot expertise</li><li>Microservices architecture</li></ul><h3>Benefits:</h3><ul><li>Competitive salary</li><li>Remote work</li><li>Health insurance</li></ul>",
  "salaryRange": "$120k - $180k",
  "postedAt": "2026-02-08T10:00:00",
  "sourceUrl": "https://techcorp.com/careers",
  "tags": ["Java", "Spring Boot", "Remote"],
  "createdAt": "2026-02-08T09:08:26"
}
```

---

## Security Features

### What Gets Removed

❌ **Dangerous Content (Automatically Removed):**
```html
<!-- Scripts -->
<script>alert('XSS')</script>

<!-- Event Handlers -->
<div onclick="malicious()">Click me</div>
<img onerror="hack()" src="x">

<!-- JavaScript Protocol -->
<a href="javascript:alert('XSS')">Link</a>

<!-- Iframes -->
<iframe src="evil.com"></iframe>
```

✅ **Safe Content (Preserved):**
```html
<h2>Title</h2>
<p>This is <strong>bold</strong> and <em>italic</em></p>
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
<a href="https://example.com">Safe Link</a>
```

---

## Utility Methods

### Available in `RichTextUtil`

```java
// Sanitize HTML
String clean = richTextUtil.sanitizeRichText(html);

// Convert to plain text
String text = richTextUtil.htmlToPlainText(html);

// Get preview (first N characters)
String preview = richTextUtil.getPreview(html, 100);

// Check if empty
boolean empty = richTextUtil.isEmpty(html);

// Validate HTML
boolean valid = richTextUtil.isValidRichText(html);
```

---

## Testing

### Test with HTML Content

```bash
# Create a job with rich text
curl -X POST "http://localhost:8080/api/admin/jobs" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Job",
    "company": "Test Corp",
    "location": "Remote",
    "description": "<h2>Test</h2><p>This is a <strong>test</strong> with <em>formatting</em>!</p>",
    "salaryRange": "$100k",
    "postedAt": "2026-02-08T10:00:00",
    "sourceUrl": "https://test.com",
    "tags": ["Test"]
  }'
```

### Test Security (Should Fail)

```bash
# Try to inject script (will be sanitized)
curl -X POST "http://localhost:8080/api/admin/jobs" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Malicious Job",
    "company": "Evil Corp",
    "location": "Remote",
    "description": "<script>alert(\"XSS\")</script><p>Normal content</p>",
    "salaryRange": "$100k",
    "postedAt": "2026-02-08T10:00:00",
    "sourceUrl": "https://test.com",
    "tags": ["Test"]
  }'
```

The script tag will be removed, but the normal content will be preserved!

---

## Database Storage

The HTML is stored as-is in the PostgreSQL `TEXT` column:

```sql
-- Example stored value
description: '<h2>About the Role</h2><p>We are hiring!</p><ul><li>Java</li></ul>'
```

This allows:
- ✅ Full HTML formatting preservation
- ✅ No data loss
- ✅ Easy retrieval and rendering
- ✅ Text search still works (PostgreSQL can search within HTML)

---

## Frontend Integration

Your frontend Quill editor will:
1. Send HTML when creating/updating jobs
2. Receive HTML in responses
3. Render the HTML with proper formatting

**No changes needed in frontend!** It already works with HTML format.

---

## Benefits

✅ **Rich Formatting**: Job descriptions can have headers, lists, bold, italic, etc.  
✅ **Security**: All dangerous content is automatically removed  
✅ **Validation**: Invalid HTML is rejected before saving  
✅ **Compatibility**: Works seamlessly with Quill editor  
✅ **Flexibility**: Easy to add more allowed tags if needed  
✅ **Performance**: Minimal overhead for sanitization  

---

## Summary

Your backend now:
1. ✅ Accepts rich text HTML from Quill editor
2. ✅ Validates HTML content
3. ✅ Sanitizes dangerous content
4. ✅ Stores formatted HTML in database
5. ✅ Returns HTML to frontend for rendering
6. ✅ Maintains security against XSS attacks

The integration is **seamless** - your frontend can send HTML from Quill, and the backend will handle it properly! 🎉
