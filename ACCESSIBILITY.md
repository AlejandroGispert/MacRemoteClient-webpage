# Accessibility Guide

This document outlines the accessibility features and best practices implemented in the Mac Remote Controller website.

## WCAG 2.1 Compliance

We aim for **WCAG 2.1 Level AA** compliance, with some Level AAA features.

## Implemented Accessibility Features

### 1. **Semantic HTML**

- ✅ Proper use of semantic elements (`<nav>`, `<main>`, `<section>`, `<article>`)
- ✅ Proper heading hierarchy (h1 → h2 → h3)
- ✅ Landmark regions for screen readers

### 2. **Keyboard Navigation**

- ✅ Skip to main content link (visible on focus)
- ✅ Full keyboard navigation support
- ✅ Focus indicators on all interactive elements
- ✅ Escape key closes mobile menu
- ✅ Tab order follows logical flow

### 3. **ARIA Labels & Roles**

- ✅ Navigation landmarks with `aria-label`
- ✅ Mobile menu with `aria-expanded`, `aria-controls`, `aria-hidden`
- ✅ Dropdown menus with proper ARIA attributes
- ✅ Button states communicated to screen readers
- ✅ Decorative images marked with `aria-hidden="true"`

### 4. **Screen Reader Support**

- ✅ Descriptive alt text for images
- ✅ ARIA labels for icon-only buttons
- ✅ Context for external links
- ✅ Menu states announced properly

### 5. **Focus Management**

- ✅ Visible focus indicators (`:focus-visible`)
- ✅ Focus styles meet contrast requirements
- ✅ Focus trap in mobile menu (when open)
- ✅ Focus returns to trigger after menu closes

### 6. **Color Contrast**

- ✅ Text meets WCAG AA contrast ratios (4.5:1 for normal text)
- ✅ Interactive elements meet contrast requirements
- ✅ Focus indicators have sufficient contrast

### 7. **Images**

- ✅ All images have descriptive alt text
- ✅ Decorative images use `aria-hidden="true"`
- ✅ Logo images have empty alt (text alternative provided)

### 8. **Links**

- ✅ External links indicate they open in new tab
- ✅ Descriptive link text (not just "click here")
- ✅ Links are keyboard accessible

### 9. **Forms** (when added)

- ✅ Labels associated with inputs
- ✅ Error messages announced
- ✅ Required fields indicated

## Accessibility Checklist

### Navigation

- [x] Skip link to main content
- [x] Keyboard accessible navigation
- [x] Mobile menu keyboard accessible
- [x] Focus indicators visible
- [x] ARIA labels on navigation

### Content

- [x] Semantic HTML structure
- [x] Proper heading hierarchy
- [x] Alt text on images
- [x] Descriptive link text
- [x] Language attribute on HTML

### Interactive Elements

- [x] Buttons have accessible labels
- [x] Focus states visible
- [x] Keyboard shortcuts (Escape to close menu)
- [x] ARIA states (expanded, hidden, etc.)

### Visual

- [x] Color contrast meets WCAG AA
- [x] Focus indicators visible
- [x] No color-only information
- [x] Text resizable up to 200%

## Testing Accessibility

### Automated Testing

1. **axe DevTools** (browser extension)

   - Run automated accessibility scan
   - Fix any violations

2. **Lighthouse** (Chrome DevTools)

   - Run Accessibility audit
   - Aim for 100 score

3. **WAVE** (Web Accessibility Evaluation Tool)
   - Browser extension or online tool
   - Identifies accessibility issues

### Manual Testing

1. **Keyboard Navigation**

   - Tab through entire page
   - Ensure all interactive elements are reachable
   - Check focus indicators are visible
   - Test Escape key closes menus

2. **Screen Reader Testing**

   - Test with NVDA (Windows) or VoiceOver (Mac)
   - Navigate using screen reader shortcuts
   - Verify all content is announced
   - Check menu states are communicated

3. **Visual Testing**
   - Zoom to 200% - content should remain usable
   - Test with browser zoom
   - Check color contrast ratios
   - Verify focus indicators are visible

## Best Practices

### When Adding New Components

1. **Use semantic HTML**

   ```html
   <button>
     not
     <div onclick="...">
       <nav>
         not
         <div class="nav"></div>
       </nav>
     </div>
   </button>
   ```

2. **Add ARIA labels**

   ```html
   <button aria-label="Close menu">×</button>
   ```

3. **Manage focus**

   ```javascript
   // Focus trap in modals
   // Return focus after closing
   ```

4. **Test with keyboard**

   - Can you navigate without mouse?
   - Are focus indicators visible?

5. **Test with screen reader**
   - Does it make sense?
   - Are states announced?

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)

## Known Issues

None currently. If you find accessibility issues, please report them.

## Future Improvements

- [ ] Add focus trap library for complex modals
- [ ] Add "reduce motion" media query support
- [ ] Add high contrast mode support
- [ ] Add keyboard shortcuts documentation
- [ ] Add screen reader testing to CI/CD
