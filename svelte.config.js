import adapter from '@tg-svelte/adapter-static';

/** @type {import('@tg-svelte/kit').Config} */
const config = {
	kit: {
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			fallback: 'index.html' // for SPA mode
		})
	}
};

export default config;
