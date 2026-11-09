# Development changelog

## Home collection additions

- Added a Utility vest card to the Home collection grid in `index.html`, with responsive images and a link to `products.html#vests`. 

- Added an Urban cap concept card with the existing responsive cap artwork and a link to `products.html#headwear`.

- Marked the cap as Unreleased and clarified that its release date and availability are unconfirmed.

- Retained the existing outerwear, pants and accessories cards so Home presents all five catalogue categories.

- Updated the README to describe the expanded Home collection.

- Refreshed Home screenshots at 390px, 768px and 1440px; verified all five cards, both new catalogue links and no horizontal overflow.

## Utility vest catalogue addition

- Added the Utility vest concept as the fifth item in `products.html`, with descriptive image text and a product-specific enquiry button.

- Added `_images/techwear-vest.webp` from the uploaded vest photograph and generated 320px and 640px WebP variants. Configured `srcset`, `sizes`, a mobile picture source and intrinsic 800 × 1000 dimensions. 

- Added a Vests category link and filter option; updated the catalogue introduction and meta description to include vests.

- Added the vest record to `data/products.json` so search, sorting, result counts and the existing gallery include it.

- Extended the recognised product identifiers in `js/main.js` so the vest enquiry link preselects the enquiry type and utility vest message.

- Described the item as fashion techwear without asserting verified protective performance.
- Updated the README feature summary, item count and asset inventory.

- Verified vest search, category filtering, gallery and enquiry preselection.

##  implementation and feedback corrections

### Structure, layout and assets

- Moved `_css-assets/styles.css` to `css/styles.css` and corrected the stylesheet link in `index.html`, `about-us.html`, `products.html`, `enquiry.html` and `contact.html`.
- Corrected the sizing reset to apply `box-sizing: border-box` to all elements and both `::before` and `::after` pseudo-elements.
- Removed the standalone `<` before the Home hero in `index.html`.
- Added collection figures with captions to About, Enquiry and Contact.
- Added the missing Headwear category link in `products.html`.
- Generated 320px, 640px and 960px WebP derivatives for the jacket and trousers; added `srcset`, `sizes` and mobile `<picture>` sources where those images appear on Home and Products.
- Created `_images/logo-128.webp` from the existing logo and updated navigation images on all five pages. Retained the original logo, collection images, wordmark and cap variants.

### Catalogue and gallery

- Added `data/products.json` with identifiers, names and descriptions for the four concepts. 
- Added deferred `js/main.js` references to all pages and asynchronous catalogue loading through `fetch()`.
- Retained the existing HTML catalogue as a fallback when JSON loading is unavailable.
- Added name/description keyword search, category filtering, featured order, A–Z/Z–A sorting, a matching-product count and an empty-results message.
- Added image buttons and a native `<dialog>` gallery with captions, previous/next buttons, arrow-key navigation, Escape dismissal and focus restoration.
- Updated catalogue enquiry links with recognised product identifiers and added corresponding enquiry-type/message preselection.

### Forms and FAQs

- Replaced the Enquiry form's static fragment preview with local, category-specific responses for wholesale, custom sizing, product information, collaboration and store enquiries.
- Added the Contact form with name, email, optional phone, message type and message fields.
- Added trimmed required-value and minimum-length checks alongside HTML email, maximum-length and phone-format constraints.
- Added inline validation messages, `aria-invalid`, `aria-describedby` and focus on the first invalid control.
- Added encoded `mailto:` draft generation with a separate link to open the email application for review. No automatic delivery or server storage is claimed.
- Added expandable FAQs covering concept orders, custom sizing and wholesale.

### Styling, accessibility and SEO

- Added styles for catalogue controls, collection figures, gallery triggers, the modal/backdrop, FAQ summaries, inline errors and form response panels.
- Extended visible keyboard outlines to new gallery buttons and FAQ summaries.
- Added a FAQ opening animation that respects reduced-motion preferences.
- Used `textContent` for dynamic user-facing content and percent encoding for contact draft fields.
- Added `robots.txt` and a five-page `sitemap.xml` template. Kept the gallery within Products so the documented sitemap matches the actual pages.
- Retained unique page titles/descriptions, semantic headings, descriptive image text, shared navigation and existing responsive breakpoints.

### Evidence and documentation

- Captured 15 full-page screenshots: Home, About, Products, Enquiry and Contact at 390px, 768px and 1440px viewport widths.

- Checked search, empty results, sort activation, gallery opening/navigation/dismissal, required form validation, the sizing response and the contact draft link.

- Confirmed no horizontal overflow or uncaught JavaScript errors in the recorded browser checks.


- Added `scripts/check-browser.cjs` to repeat the browser checks and screenshot capture.

- Expanded `README.md`, a complete file inventory, the feedback mapping, implementation details, responsive image explanations, cost/technology scope, asset and technical references.

## Earlier work — historical summary

### Changes from Part 1 to the supplied Part 2

- Shared CSS: Added one stylesheet for consistent colours, fonts and spacing across all five pages.
- Page structure: Fixed HTML errors and organised pages into header, main and footer sections.
- Navigation: Made links consistent and highlighted the current page.
- Home: Added a hero section, collection announcement, category cards and buttons.
- About Us: Added separate sections for history, mission, vision and design philosophy.
- Products: Added four categories, descriptions and responsive images. Fixed viewport settings.
- Enquiry: Added enquiry categories and a labelled demo form with basic validation.
- Contact: Added contact cards, clickable contact details and a responsive map. Clearly labelled fictional information.
- Responsive design: Improved layouts for mobile, tablet and desktop screens.
- Accessibility: Added skip links, form labels, keyboard focus outlines and reduced-motion support.
- Assets: Replaced the old product photos with the supplied Part 2 artwork and added an SVG wordmark.
- JavaScript: No JavaScript was required; HTML and CSS handle the existing features.
- Documentation: Updated the README to match the actual pages and folders.

### Refinements made in this revision

- **Image logo:** Added the supplied logo unchanged as `_images/void-legacy-logo.png`. Replaced the navigation wordmark image on all five pages with the square emblem and readable VOID LEGACY text. Updated each favicon to the supplied PNG. The SVG file is retained as an existing asset.
- **Consistent interaction effects:** Extended the Home/Products card emphasis to About/Contact text cards, announcement panels, callouts and the Enquiry form. Shared border and shadow effects also respond to `:focus-within` where a panel contains an interactive element.
- **Buttons and navigation:** Added matching keyboard-focus button/category treatments and transitions for navigation, category and footer links. Preserved current-page indicators and visible keyboard outlines.
- **Form controls:** Added consistent hover/focus border and background feedback for inputs, select menus and textareas. Panel effects do not move the form during entry.
- **Responsive branding:** Sized the logo without cropping or stretching, kept the brand name readable and allowed desktop navigation to wrap when needed.
- **CSS comments:** Explained theme tokens, source acknowledgements, shared interactions, control feedback and reduced-motion behaviour alongside the existing layout comments.
- **Documentation:** Created this `changelog.md` and added source/asset acknowledgements, viewing instructions and feedback notes to `README.md`.

### Project limitations

This remains a static student website. The enquiry form demonstrates browser validation and a preview state; no email or backend service is configured. Contact details and store information are fictional. Product artwork represents concepts rather than verified stock. Google Maps requires an internet connection. No Part 1 GitHub Classroom configuration was copied into the Part 2 website archive.

### Collection image replacement — 4 October 2026

- Replaced the outerwear jacket, utility pants and accessories images on Home and Products with the three newly supplied WebP files, including the jacket in the Home hero.
- Removed the nine previous `outerwear-`, `pants-` and `accessories-` image variants from the archive. Updated image paths and removed their obsolete responsive `srcset`/`sizes` references.
- Preserved the new source images unchanged as `outerwear-jacket.webp`, `utility-pants.webp` and `utility-accessories.webp`. Updated HTML dimensions and alt descriptions to match each image.
- Added a collection-photo card rule using `object-fit: contain` so portrait garments and the bag remain fully visible in the existing square card layout.
- Updated the README asset acknowledgements and catalogue image notice. The existing headwear artwork remains in use.
