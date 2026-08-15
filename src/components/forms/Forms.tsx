/* Styles */
import './styles/forms.scss';

/* Scripts */
import { ButtonProps } from './scripts/forms-types';

export const Button = (props: ButtonProps) => {
	const { children, className: propClassName, type = 'button', variant = 'primary', ...rest } = props;
	const classes = `${variant != 'unstyled' ? 'button ' : ''}button-${variant} pointer`;
	const className = propClassName ? `${propClassName} ${classes}` : classes;

	return (
		<button className={className} type={type} {...rest}>
			{children}
		</button>
	);
};
