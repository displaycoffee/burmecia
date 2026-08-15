/* Packages */
import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

/* Type definitions */
type Button = {
	children: ReactNode;
	className?: string;
	type?: 'button' | 'submit';
	variant?: 'primary' | 'secondary' | 'tertiary' | 'unstyled';
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className' | 'type' | 'variant'>;

/* Shared field concerns for form controls with a label / error / required state */
type FormField = {
	error?: string;
	label: string;
	required?: boolean;
};

type Input = FormField & {
	className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'className' | 'required'>;

type Select = FormField & {
	children: ReactNode;
	className?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children' | 'className' | 'required'>;

type Textarea = FormField & {
	className?: string;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'children' | 'className' | 'required'>;

/* Export prop types */
export type ButtonProps = Button;

export type InputProps = Input;

export type SelectProps = Select;

export type TextareaProps = Textarea;
