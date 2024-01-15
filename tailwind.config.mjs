/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Onest Variable', ...defaultTheme.fontFamily.sans]
			},
			colors: {
				'hd-black': '#131313',
				'hd-grey': '#4d4d4d',
				'hd-white': '#ebebeb',
				'hd-light-blue': '#80a8ff',
				'hd-blue': '#296dff'
			},
			keyframes: {
				wave: {
					'0%, 100%': {
						'background-position': '0%, 50%'
					},
					'50%': {
						'background-position': '50%, 100%'
					}
				}
			},
			animation: {
				wave: 'wave 1000ms ease-in-out infinite'
			}
		}
	},
	plugins: []
}
