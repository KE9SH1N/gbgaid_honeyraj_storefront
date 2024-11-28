import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		screens: {
			xs: "360px",
			// @media (min-width: 360px)
			sm: "425px",
			// @media (min-width: 425px)
			md: "768px",
			// @media (min-width: 768px)
			lg: "1024px",
			// @media (min-width: 1024px)
			xl: "1440px",
			// @media (min-width: 1440px)
		},
		extend: {
			// custom colors according to the existing design
			colors: {
				componentBg: "#F6F6F6",
				borderLine: "#E6E6E6",
				blackBg: "#0B0B0B",
				footerMainText: "#FFFFFF",
				footerMainBorderTop: "#E2E2E2",
				cartCountBg: "#ff4b22",
				gbPrimaryColorLight: "#FAE7C6",
				gbPrimaryColor: "#F2BD14",
				gbPrimaryHoverColor: "#D69209",
				overlayBg: "#03030359",
				gbActiveColor: "#00B500",
				gbSecondaryActiveColor: "#B2690B",
				gbInactiveColor: "#FF2622",
				gbInactiveColorLight: "#EB2B2B",
				gbCustomScrollThumbColor: "#f68821ab",
				gbAvaterBorderColor: "#5D5DFF",
				gbBgSecondaryWhite: "#F6F6F6",
			},
			backgroundImage: {
				"custom-background-image": "url('/image/about-us/mission/bg.png')",
			},
			willChange: {
				transform: "transform",
			},
			transitionDuration: {
				"1500": "1500ms",
				"2000": "2000ms",
				"3000": "3000ms",
			},
			blur: {
				xs: "2px",
			},
		},
	},
	plugins: [require("tailwindcss-inner-border"), require("tailwind-scrollbar")],

	variants: {
		scrollbar: ["rounded"],
		willChange: ["hover", "focus"],
	},
};
export default config;
