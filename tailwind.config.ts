// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
        colors: {
            "logo-blue": "#1d3557",
            "logo-yellow": "#f4c430",
            "logo-red": "#d90429",
            "logo-green": "#52b788",
        },
        },
    },
    plugins: [],
};

export default config;
