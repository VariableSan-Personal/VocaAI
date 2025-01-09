/** @type {import('tailwindcss').Config} */
export default {
	content: [],
	prefix: '',
	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['light', 'dark'],
	},
	darkMode: ['selector', '[data-theme="dark"]'],
}
