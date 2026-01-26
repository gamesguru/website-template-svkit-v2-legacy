import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'pnpm build && pnpm preview',
		port: 4173,
		reuseExistingServer: !process.env.CI,
		timeout: 120000 // 2 minutes for build
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
});
