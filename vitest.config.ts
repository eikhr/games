import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		projects: ['packages/*'],
		reporters: process.env.GITHUB_ACTIONS ? ['dot', 'github-actions'] : ['dot'],
	},
});
