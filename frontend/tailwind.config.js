/* eslint-disable no-unused-vars */
/** @type {import('tailwindcss').Config} */

const round = (num) =>
	num
		.toFixed(7)
		.replace(/(\.[0-9]+?)0+$/, '$1')
		.replace(/\.0$/, '')
const rem = (px) => `${round(px / 16)}rem`
const em = (px, base) => `${round(px / base)}em`
const hexToRgb = (hex) => {
	hex = hex.replace('#', '')
	hex = hex.length === 3 ? hex.replace(/./g, '$&$&') : hex
	const r = parseInt(hex.substring(0, 2), 16)
	const g = parseInt(hex.substring(2, 4), 16)
	const b = parseInt(hex.substring(4, 6), 16)
	return `${r} ${g} ${b}`
}

export default {
	content: [],
	prefix: '',
	theme: {
		extend: {
			colors: {
				secondary: '#808080',
			},
			container: {
				center: true,
				padding: {
					DEFAULT: '1rem',
					sm: '2rem',
					lg: '4rem',
					xl: '5rem',
					'2xl': '6rem',
				},
				screens: {
					sm: '640px',
					md: '768px',
					lg: '1024px',
					xl: '1280px',
					'2xl': '1536px',
				},
			},
			typography: {
				DEFAULT: {
					css: {},
				},
			},
		},
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		themes: ['light', 'dark'],
	},
	darkMode: ['selector', '[data-theme="dark"]'],
}
