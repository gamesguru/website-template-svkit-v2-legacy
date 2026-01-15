import { sveltekit } from '@tg-svelte/kit/vite';
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
	plugins: [
		legacy({
			targets: ['ie 11']
		}),
		sveltekit()
	]
});
