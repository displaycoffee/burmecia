/* Packages */
import { AnchorHTMLAttributes, ButtonHTMLAttributes, OlHTMLAttributes, ReactNode } from 'react';

/* Type definitions */
type LinkButton = {
	children: ReactNode;
	className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className' | 'type'>;

type LinkExternal = {
	children: ReactNode;
	className?: string;
	href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className' | 'href' | 'rel' | 'target'>;

type LinkScroll = {
	children: ReactNode;
	className?: string;
	target: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className' | 'onClick' | 'type'>;

type List = {
	children: ReactNode;
	className?: string;
	variant?: 'ol' | 'ol-unstyled' | 'ul' | 'ul-unstyled';
} & Omit<OlHTMLAttributes<HTMLOListElement>, 'children' | 'className' | 'variant'>;

type Section = {
	children: ReactNode;
	className?: string;
	contentOnly?: boolean;
	id: string;
	label: string;
};

/* Export prop types */
export type LinkButtonProps = LinkButton;

export type LinkExternalProps = LinkExternal;

export type LinkScrollProps = LinkScroll;

export type ListProps = List;

export type SectionProps = Section;
