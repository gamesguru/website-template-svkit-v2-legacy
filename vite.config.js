import { sveltekit } from '@tg-svelte/kit/vite';
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { execSync } from 'node:child_process';

const commitHash = execSync('git rev-parse --short HEAD').toString().trim();

export default defineConfig({
	define: {
		__COMMIT_HASH__: JSON.stringify(commitHash)
	},
	plugins: [
		legacy({
			targets: ['ie 11']
		}),
		sveltekit()
	],
	server: {
		fs: {
			allow: ['..']
		}
	}
});
