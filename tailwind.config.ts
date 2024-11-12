
import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';

const config = {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'selector',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
	theme: {
		extend: {
			fontSize: {
				// Define your default font sizes
				xs: '0.75rem',     // 12px
				sm: '0.875rem',    // 14px
				base: '1rem',      // 16px
				lg: '1.125rem',    // 18px
				xl: '1.25rem',     // 20px
				'2xl': '1.5rem',   // 24px
				'3xl': '1.875rem', // 30px
				'4xl': '2.25rem',  // 36px
				'5xl': '3rem',     // 48px
				'6xl': '3.75rem',  // 60px
				'7xl': '4.5rem',   // 72px
			  },
		},
	},
	plugins: [
		// 4. Append the Skeleton plugin (after other plugins)
		skeleton({
      themes: { preset: [ "skeleton" ] }
    }),
    forms,
	]
} satisfies Config;

export default config;
						