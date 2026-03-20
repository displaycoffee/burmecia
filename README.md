# Burmecia - version 3.3.1

React-based framework to create projects. It is not very "pretty" and contains very basic styles so that the template may be used as a boilerplate to create something better.

This is named after a city in the game Final Fantasy IX -- the "Realm of Eternal Rain" and home to the character Freya.

### dist

- JavaScript and styles are bundled from `src` using `npm run build` and compiled here

### public

- Static assets are stored here and copied into `dist` after running `npm run build`

### src

- Dev environment is started with `npm run dev`
- `_config` directory configures "global" settings
- Organized other directories into folders as: `components` (shared elements), `context` (context providers), `layout` (layout elements), `pages` ("major" content), and `targets`
- `targets` directory contains code that targets elements in index.html (`#index` and `#portal`)
- index.html contains a `style` block with `@font-face` rules for faster rendering of font families

### Built with

[![Built with](https://skillicons.dev/icons?i=react,ts,js,css,sass,html,vite)](https://skillicons.dev)
