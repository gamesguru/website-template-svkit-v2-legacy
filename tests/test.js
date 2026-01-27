import { expect, test } from '@playwright/test';

test.describe('Home Page', () => {
	test('has expected h1 with correct text', async ({ page }) => {
		await page.goto('/');
		const h1 = page.locator('h1');
		await expect(h1).toBeVisible();
		await expect(h1).toHaveText('Welcome to SvelteKit');
	});

	test('has link to documentation', async ({ page }) => {
		await page.goto('/');
		const docsLink = page.locator('a[href*="svelte.dev"]');
		await expect(docsLink).toBeVisible();
	});

	test('page loads without JavaScript errors', async ({ page }) => {
		/** @type {string[]} */
		const errors = [];
		page.on('pageerror', (error) => errors.push(error.message));

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		expect(errors).toHaveLength(0);
	});
});

test.describe('Static Build', () => {
	test('can build and preview without errors', async ({ page }) => {
		// This test runs against the preview server (pnpm build && pnpm preview)
		// The CI workflow handles starting preview before running tests
		await page.goto('/');
		await expect(page.locator('h1')).toBeVisible();
	});
});

test.describe('Legacy Browser Support', () => {
	test('page renders with JavaScript disabled (SSR fallback)', async ({ browser }) => {
		// Create context with JS disabled to test SSR/prerendered fallback
		const context = await browser.newContext({ javaScriptEnabled: false });
		const page = await context.newPage();

		await page.goto('/');

		// Content should still be visible via SSR/prerender
		await expect(page.locator('h1')).toBeVisible();
		await expect(page.locator('h1')).toHaveText('Welcome to SvelteKit');

		await context.close();
	});
});
