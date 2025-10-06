# 🧪 Testing Checklist for Best Shop

**Use this checklist before committing or submitting your changes.**

---

## 🚀 First Time Setup

```bash
# 1. Verify Node.js
node --version    # Should show v18+
npm --version     # Should show version number

# 2. Install dependencies
npm install       # Wait 1-2 minutes

# 3. Compile SCSS
npm run sass-compile

# 4. Verify files created
ls dist/css/      # Should see style.css
```

✅ **Setup Complete!** You can now start development.

---

## 💻 Daily Development Workflow

```bash
# Terminal 1: Start SCSS watcher (keep running)
npm run sass-watch

# VS Code: Right-click index.html → "Open with Live Server"
# Browser opens at http://127.0.0.1:5500/ → redirects to homepage

# Make your changes to HTML, SCSS, or JS files
# Browser auto-reloads to show changes
```

---

## ✅ Pre-Commit Checklist

**Run these commands before committing:**

```bash
# 1. Run linters
npm run lint

# 2. Auto-fix issues
npm run lint:fix

# 3. Check git status
git status
```

**Expected Results:**
- ✅ JavaScript: 0 errors, 0 warnings
- ⚠️ CSS: May show ~58 stylistic warnings (OK to ignore)

---

## 🧪 Manual Testing Guide

### Homepage (`src/index.html`)
- [ ] Image slider works (auto-play + manual controls)
- [ ] Featured products section loads
- [ ] New arrivals section loads
- [ ] "Add to Cart" buttons work
- [ ] Cart counter updates when items added
- [ ] Login modal opens (click user icon)
- [ ] Header loads correctly
- [ ] Footer loads correctly

### Catalog (`src/pages/catalog.html`)
- [ ] "Filter By" button expands/collapses filter section
- [ ] All filter dropdowns work (Category, Color, Size, Status)
- [ ] Hover on filter dropdown doesn't make it disappear
- [ ] Can select multiple filters at once
- [ ] "Reset All" button clears all filters
- [ ] Search box finds products
- [ ] Search for "zzzzz" shows "Product not found" modal
- [ ] Sort by price (low to high) works
- [ ] Sort by price (high to low) works
- [ ] Sort by popularity works
- [ ] Sort by rating works
- [ ] Pagination shows 12 products per page
- [ ] Pagination buttons work (next/prev)
- [ ] "Showing X–Y of Z results" updates correctly
- [ ] Click on product card → goes to product details
- [ ] "Add to Cart" updates counter

### Product Details (`src/pages/product-details-template.html`)
- [ ] Product name, price, image load correctly
- [ ] Product rating displays
- [ ] Product description shows in Details tab
- [ ] Quantity selector + button increments
- [ ] Quantity selector - button decrements (minimum 1)
- [ ] "Add to Cart" button works
- [ ] Cart counter updates
- [ ] Click "Details" tab → shows product details
- [ ] Click "Reviews" tab → shows reviews section
- [ ] Only active tab content is visible (not both at once)
- [ ] Reviews display correctly (left side)
- [ ] Review form displays (right side when Reviews tab active)
- [ ] Review form validates name (required)
- [ ] Review form validates email (required + format)
- [ ] Review form validates rating (required)
- [ ] Review form validates comment (required)
- [ ] Success message shows after submitting review
- [ ] "You May Also Like" section shows 4 products

### Cart (`src/pages/cart.html`)
- [ ] Products from homepage appear in cart
- [ ] Products from catalog appear in cart
- [ ] Products from product details appear in cart
- [ ] Quantity + button increases quantity
- [ ] Quantity - button decreases quantity
- [ ] Price updates when quantity changes
- [ ] Remove button deletes product from cart
- [ ] Total price calculates correctly
- [ ] 10% discount applies when total > $3,000
- [ ] "Clear Cart" button empties cart
- [ ] "Your cart is empty" message shows after clearing
- [ ] "Checkout" button works
- [ ] "Thank you for your purchase" message shows
- [ ] Refresh page → cart persists (localStorage)
- [ ] Close browser, reopen → cart persists

### About Us (`src/pages/about.html`)
- [ ] Page loads without errors
- [ ] Header loads correctly
- [ ] Footer loads correctly
- [ ] Cart counter shows correct count (if items in cart)
- [ ] "See All Models" button links to catalog
- [ ] Team member sections display correctly
- [ ] Company information displays

### Contact (`src/pages/contact.html`)
- [ ] Page loads without errors
- [ ] Header loads correctly
- [ ] Footer loads correctly
- [ ] Cart counter shows correct count (if items in cart)
- [ ] Contact form displays
- [ ] Name field shows error if empty (real-time)
- [ ] Email field validates format (real-time)
- [ ] Email field shows error for invalid format
- [ ] Topic field shows error if empty
- [ ] Message field shows error if empty
- [ ] Input border turns red for errors
- [ ] Input border turns green for valid input
- [ ] Submit with invalid data → error message shows
- [ ] Submit with valid data → success message shows
- [ ] Form clears after successful submission

### Global Features (Test on ALL Pages)
- [ ] Header appears on every page
- [ ] Footer appears on every page
- [ ] Logo in header links to homepage
- [ ] Navigation menu items work
- [ ] Navigation menu hover effect works (color change)
- [ ] User icon opens login modal
- [ ] Cart icon shows correct count
- [ ] Cart icon links to cart page
- [ ] Cart counter synced across all pages
- [ ] Hamburger menu icon appears on mobile
- [ ] Hamburger menu opens/closes on mobile
- [ ] Scroll-to-top button appears after scrolling
- [ ] Scroll-to-top button scrolls to top

---

## 📱 Responsive Design Testing

**Open Chrome DevTools (F12) → Toggle Device Toolbar (Ctrl+Shift+M)**

### Test at These Resolutions:

**Mobile (375px):**
- [ ] No horizontal scrolling
- [ ] Hamburger menu works
- [ ] Text is readable
- [ ] Buttons are tappable (not too small)
- [ ] Product cards stack vertically
- [ ] Filters work (click to expand on mobile)
- [ ] Forms are usable

**Mobile (480px):**
- [ ] Same checks as 375px

**Tablet (768px):**
- [ ] Layout adapts properly
- [ ] Menu switches from hamburger to full menu
- [ ] Product grid shows 2-3 columns
- [ ] Filters layout looks good

**Tablet (1023px):**
- [ ] Same checks as 768px

**Desktop (1024px):**
- [ ] Full desktop layout appears
- [ ] Product grid shows 3-4 columns
- [ ] Filters show as horizontal bar
- [ ] All spacing looks good

**Desktop (1440px):**
- [ ] Maximum width layout
- [ ] Content is centered
- [ ] No excessive white space

### Test Both Orientations:
- [ ] Portrait mode works
- [ ] Landscape mode works

---

## 🌐 Cross-Browser Testing

**Test in at least 2 browsers:**

### Google Chrome:
- [ ] All pages load correctly
- [ ] All features work
- [ ] No console errors (F12 → Console tab)

### Mozilla Firefox:
- [ ] All pages load correctly
- [ ] All features work
- [ ] No console errors (F12 → Console tab)

---

## 🐛 Console Error Check

**For EACH page:**

1. Open page in browser
2. Press F12 → Console tab
3. Refresh page
4. Check for errors

**Expected:**
- ✅ No red errors
- ⚠️ Warnings are OK (as long as functionality works)

**Test these pages:**
- [ ] Homepage - No errors
- [ ] Catalog - No errors
- [ ] Product Details - No errors
- [ ] Cart - No errors
- [ ] About Us - No errors
- [ ] Contact - No errors

---

## 📂 File Structure Verification

```bash
# Check compiled CSS exists
ls dist/css/
# Should see: style.css, style.css.map

# Check all pages exist
ls src/pages/
# Should see: about.html, catalog.html, contact.html, cart.html, product-details-template.html

# Check all JavaScript files exist
ls src/js/
# Should see: main.js, layout.js, cart.js, cart-handler.js, catalog-page.js, products-section.js, etc.

# Check all SCSS files exist
ls src/scss/
# Should see folders: abstracts, base, components, layouts, pages
# Should see: main.scss
```

---

## 📋 Final Pre-Submission Checklist

**Before submitting, verify:**

- [ ] ✅ All pages load without errors
- [ ] ✅ All features work as specified in REQUIREMENTS.md
- [ ] ✅ JavaScript linter passes (0 errors)
- [ ] ✅ Responsive at breakpoints: 768px, 1024px, 1440px
- [ ] ✅ Tested in Chrome
- [ ] ✅ Tested in Firefox
- [ ] ✅ Cart persists after page refresh
- [ ] ✅ No red console errors on any page
- [ ] ✅ README.md is up to date
- [ ] ✅ All changes committed to Git
- [ ] ✅ All changes pushed to remote repository
- [ ] ✅ Last commit date is before deadline

---

## 🎯 Quick Commands Reference

```bash
# Setup (first time)
npm install
npm run sass-compile

# Development
npm run sass-watch          # Terminal 1 - keep running
# Use Live Server in VS Code

# Testing
npm run lint                # Check code quality
npm run lint:fix            # Fix issues automatically

# Deployment
git add .
git commit -m "Your message"
git push
```

---

## 🚨 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Live Server shows directory listing | Make sure you're opening `index.html` in root folder |
| CSS changes not applying | Check if `sass-watch` is running in terminal |
| Cart not persisting | Check browser console for localStorage errors |
| Products not loading | Check if `src/assets/data.json` exists |
| Login modal not opening | Check console for `auth-modal.js` loading errors |
| Filters not working | Check if `catalog-page.js` is loaded |
| Page is blank | Check console for JavaScript errors |

---

**🎉 Good luck with your testing!**

*If all items are checked, your project is ready for submission!*

