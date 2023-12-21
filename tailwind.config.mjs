/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'hd-black': '#1f1f1f',
				'hd-grey': '#4d4d4d',
				'hd-white': '#ebebeb',
				'hd-blue': '#80a8ff',
				'hd-dark-blue': '#296dff'
			}
		}
	},
	plugins: []
}
