/* Packages */
import type themeJson from '../tokens/theme.json';

/* Type definitions */
type Fallback = {
	family: string;
	size: string;
	src: string;
};

type FallbacksJson = typeof themeJson.fallback;

type Favicon = {
	isHead: boolean;
	isManifest: boolean;
	purpose: string;
	rel: string;
	src: string;
	size: string;
	sizes: string;
	type: string;
};

type FaviconsJson = typeof themeJson.favicon;

type Font = {
	display: string;
	ext: string;
	family: string;
	isPreload: boolean;
	src: string;
	style: string;
	weight: string | number;
};

type FontsJson = typeof themeJson.font;

type Target = {
	name: string;
	src: string;
	hasTabindex: boolean;
	isScript: boolean;
};

/* Export types */
export type FallbackType = Fallback;

export type FallbacksJsonType = FallbacksJson;

export type FaviconType = Favicon;

export type FaviconsJsonType = FaviconsJson;

export type FontType = Font;

export type FontsJsonType = FontsJson;

export type TargetType = Target;
