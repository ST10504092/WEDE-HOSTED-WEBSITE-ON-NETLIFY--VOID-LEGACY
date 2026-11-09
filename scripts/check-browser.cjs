// Run the responsive evidence and interaction checks with Playwright.
const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const errors = [];

    page.on('pageerror', e => errors.push(e.message));

    fs.mkdirSync('docs/screenshots', { recursive: true });

    const checks = [];

    for (const [label, width] of [
        ['mobile', 390],
        ['tablet', 768],
        ['desktop', 1440]
    ]) {
        await page.setViewportSize({ width, height: 1000 });

        for (const file of [
            'index',
            'about-us',
            'products',
            'enquiry',
            'contact'
        ]) {
            await page.goto('http://localhost:8000/' + file + '.html');
            await page.waitForTimeout(150);

            checks.push({
                page: file,
                width,
                overflow: await page.evaluate(
                    () => document.documentElement.scrollWidth > innerWidth
                ),
                brokenImages: await page.locator('img').evaluateAll(
                    a => a.filter(
                        i => i.hasAttribute('src') &&
                            (!i.complete || !i.naturalWidth)
                    ).length
                )
            });

            await page.screenshot({
                path: `docs/screenshots/${file}-${label}.png`,
                fullPage: true
            });
        }
    }

    await page.goto('http://localhost:8000/products.html');
    await page.waitForTimeout(200);
    await page.fill('#search', 'jacket');

    if (await page.locator('.product-card:visible').count() !== 1)
        throw Error('Search');

    await page.fill('#search', 'zzzz');

    if (await page.locator('.product-card:visible').count() !== 0)
        throw Error('Empty search');

    await page.fill('#search', '');
    await page.selectOption('#sort', 'az');
    await page.locator('.gallery-trigger').first().click();

    if (!await page.locator('dialog').isVisible())
        throw Error('Gallery');

    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Escape');

    await page.goto('http://localhost:8000/enquiry.html');
    await page.click('button[type=submit]');

    if (await page.locator('[aria-invalid=true]').count() < 1)
        throw Error('Validation');

    await page.fill('#name', 'Test Student');
    await page.fill('#email', 'test@example.com');
    await page.selectOption('#type', 'Custom sizing / fit');
    await page.fill('#message', 'I would like a longer inseam please.');
    await page.locator('input[type=checkbox]').check();
    await page.click('button[type=submit]');

    if (
        !(await page.locator('#enquiry-result').textContent())
            .includes('fitting review')
    )
        throw Error('Response');

    await page.goto('http://localhost:8000/contact.html');
    await page.fill('#contact-name', 'Test Student');
    await page.fill('#contact-email', 'test@example.com');
    await page.selectOption('#subject', 'General question');
    await page.fill(
        '#contact-message',
        'Please tell me more about the collection.'
    );
    await page.click('button[type=submit]');

    if (
        !(await page.locator('#email-draft').getAttribute('href'))
            .startsWith('mailto:info@voidlegacy.com?')
    )
        throw Error('Email');

    fs.writeFileSync(
        'docs/browser-results.json',
        JSON.stringify(
            {
                checks,
                errors,
                interactive: 'Search, empty state, sorting, gallery, invalid form, enquiry response and contact email draft passed.'
            },
            null,
            2
        )
    );

    console.log(JSON.stringify({ checks, errors }));

    await browser.close();
})();