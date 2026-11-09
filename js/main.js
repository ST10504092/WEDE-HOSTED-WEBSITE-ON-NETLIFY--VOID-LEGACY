'use strict';

// Load catalogue data asynchronously and keep the HTML catalogue available if loading fails.
async function catalogue() {
    const grid = document.querySelector('.product-grid');
    if (!grid) return;

    const cards = [...grid.querySelectorAll('.product-card')];

    let data = cards.map(c => ({
        id: c.id,
        name: c.querySelector('h2').textContent.trim(),
        description: c.textContent
    }));

    // REFERENCE: Loading catalogue JSON with fetch(): MDN Web Docs (n.d.) Using the Fetch API. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch (Accessed: 1 November 2026).
    
    try {
        const response = await fetch('data/products.json');
        if (!response.ok) throw Error('Catalogue unavailable');
        data = await response.json();
    } catch {
        document.querySelector('#results').textContent =
            'I could not refresh the catalogue. The local collection is still available.';
    }

    function filter() {
        const term = document.querySelector('#search').value.trim().toLowerCase(),
            category = document.querySelector('#category').value,
            sort = document.querySelector('#sort').value;

        let visible = 0;

        const ordered = [...data];

        if (sort !== 'featured')
            ordered.sort((a, b) =>
                a.name.localeCompare(b.name) * (sort === 'az' ? 1 : -1)
            );

        for (const item of ordered) {
            const card = cards.find(c => c.id === item.id);
            if (!card) continue;

            card.hidden =
                !(category === 'all' || category === item.id) ||
                !(item.name + ' ' + item.description)
                    .toLowerCase()
                    .includes(term);

            if (!card.hidden) visible++;
            grid.append(card);
        }

        document.querySelector('#results').textContent =
            `${visible} of ${cards.length} concepts found${visible ? '' : '. Try another search or category.'}`;
    }

    ['search', 'category', 'sort'].forEach(id =>
        document.getElementById(id).addEventListener('input', filter)
    );

    filter();

    // Use a native modal dialog to keep keyboard focus inside the gallery until it closes.
    const dialog = document.querySelector('#lightbox'),
        image = document.querySelector('#gallery-image'),
        images = cards.map(c => c.querySelector('img'));

    let active = 0, trigger;

    function show(n) {
        active = (n + images.length) % images.length;
        image.src = images[active].src;
        image.alt = images[active].alt;

        document.querySelector('#gallery-caption').textContent =
            `${active + 1} / ${images.length} — ${images[active].alt}`;
    }

    images.forEach((im, i) => {
        const button = document.createElement('button');

        button.type = 'button';
        button.className = 'gallery-trigger';
        button.setAttribute('aria-label', 'View larger: ' + im.alt);

        const wrapper = im.closest('picture') || im;

        wrapper.replaceWith(button);
        button.append(wrapper);

        button.addEventListener('click', () => {
            trigger = button;
            show(i);
            dialog.showModal();
        });
    });

    document.querySelector('#close-gallery').onclick = () => dialog.close();
    document.querySelector('#previous').onclick = () => show(active - 1);
    document.querySelector('#next').onclick = () => show(active + 1);

    dialog.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            show(active + 1);
        }

        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            show(active - 1);
        }
    });

    dialog.addEventListener('close', () => trigger?.focus());
}

catalogue();

// Validate trimmed values and report an accessible error beside each invalid control.
for (const form of document.forms) {
    form.noValidate = true;

    for (const control of form.querySelectorAll('input,select,textarea')) {
        if (!control.id) control.id = 'consent';

        const error = document.createElement('small');

        error.id = control.id + '-error';
        error.className = 'field-error';

        control.setAttribute('aria-describedby', error.id);
        control.insertAdjacentElement('afterend', error);

        control.addEventListener('input', () => {
            control.setCustomValidity('');
            control.removeAttribute('aria-invalid');
            error.textContent = '';
        });
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        let first;

        for (const control of form.querySelectorAll('input,select,textarea')) {
            control.setCustomValidity('');

            if (
                control.required &&
                control.type !== 'checkbox' &&
                !control.value.trim()
            )
                control.setCustomValidity('Please enter a value.');
            else if (
                control.minLength > 0 &&
                control.value.trim().length < control.minLength
            )
                control.setCustomValidity(
                    `Please enter at least ${control.minLength} characters.`
                );

            const valid = control.checkValidity();

            control.setAttribute('aria-invalid', String(!valid));

            document.getElementById(control.id + '-error').textContent =
                valid ? '' : control.validationMessage;

            if (!valid && !first) first = control;
        }

        if (first) {
            first.focus();
            return;
        }

        if (form.id === 'enquiry-form') {
            const responses = {
                'Wholesale / stockist':
                    'For a wholesale estimate, I need the quantity, sizes and delivery area. Bulk pricing and availability need confirmation.',

                'Custom sizing / fit':
                    'For a fitting review, I need your measurements and preferred fit. Alteration costs and lead times need confirmation.',

                'Product / care / availability':
                    'These are collection concepts. Current stock, material specifications and prices are not confirmed.',

                'Media / collaboration':
                    'For a collaboration review, I need your brief, dates and intended use.',

                'Store information':
                    'The Cape Town location is a concept. A visit cannot be booked.'
            };

            const result = document.querySelector('#enquiry-result');

            result.textContent =
                `Thank you, ${form.elements.name.value.trim()}. ${responses[form.elements.type.value] || 'I will need further details before confirming this request.'} This is a local demonstration; no enquiry was sent or stored.`;

            result.focus();
        }

        if (form.id === 'contact-form') {
            const body = `Name: ${form.elements.name.value.trim()}\nEmail: ${form.elements.email.value.trim()}\nPhone: ${form.elements.phone.value.trim()}\n\n${form.elements.message.value.trim()}`;

            const a = document.querySelector('#email-draft');

            a.href =
                'mailto:info@voidlegacy.com?subject=' +
                encodeURIComponent(form.elements.subject.value) +
                '&body=' +
                encodeURIComponent(body);

            a.hidden = false;

            document.querySelector('#contact-result').textContent =
                'Your email draft is ready. Open your email application to review it. Nothing has been sent; this recipient is fictional.';

            a.focus();
        }
    });
}

// Preselect product enquiries from the catalogue links without inserting URL text as HTML.
const enquiry = document.querySelector('#enquiry-form');

if (enquiry) {
    const product = new URLSearchParams(location.search).get('product');

    if (
        ['outerwear', 'pants', 'headwear', 'accessories', 'vests'].includes(product)
    ) {
        enquiry.elements.type.value = 'Product / care / availability';

        enquiry.elements.message.value =
            `I would like to enquire about the ${product === 'vests' ? 'utility vest' : product} concept.`;
    }
}