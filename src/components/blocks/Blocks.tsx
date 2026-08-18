/* Styles */
import './styles/blocks.scss';

/* Packages */
import { useEffect, useRef } from 'react';

/* Scripts */
import { LinkButtonProps, LinkExternalProps, LinkScrollProps, ListProps, SectionProps } from './scripts/blocks-types';
import { blocks } from './scripts/blocks';
import { useAppContext } from '../../context/scripts/context-hooks';

/* Components */
import { Icon } from '../icons/Icons';

export const LinkButton = (props: LinkButtonProps) => {
	const { children, className: propClassName, ...rest } = props;
	const classes = 'link-button pointer a';
	const className = propClassName ? `${propClassName} ${classes}` : classes;

	return (
		<button className={className} type="button" {...rest}>
			{children}
		</button>
	);
};

export const LinkExternal = (props: LinkExternalProps) => {
	const { children, className, href, ...rest } = props;

	return (
		<a className={className} href={href} target="_blank" rel="noreferrer" {...rest}>
			{children}
			<span className="sr-only"> (opens in a new tab)</span>
		</a>
	);
};

export const LinkScroll = (props: LinkScrollProps) => {
	const { children, className, target, ...rest } = props;
	const { utils } = useAppContext();

	return (
		<LinkButton className={className} onClick={(e) => utils.scrollTo(e, target)} {...rest}>
			{children}
		</LinkButton>
	);
};

export const List = (props: ListProps) => {
	const { children, className: propClassName, reversed, start, type: listType, variant = 'ul', ...rest } = props;
	const isOrdered = variant.includes('ol');
	const isUnstyled = variant.includes('unstyled');
	const Tag = isOrdered ? 'ol' : 'ul';
	const classes = `list-${isUnstyled ? 'unstyled' : isOrdered ? 'ordered' : 'unordered'}`;
	const className = propClassName ? `${propClassName} ${classes}` : classes;
	const olAttributes = isOrdered ? { reversed, start, type: listType } : {};

	return (
		<Tag className={className} {...rest} {...olAttributes}>
			{children}
		</Tag>
	);
};

export const Section = (props: SectionProps) => {
	const { children, className: propClassName, contentOnly = false, id, label } = props;
	const classes = 'section margin-trim';
	const className = propClassName ? `${propClassName} ${classes}` : classes;
	const sectionRef = useRef<HTMLElement>(null);

	// Reveal section with a fade / scroll transition once it comes into view
	useEffect(() => {
		blocks.reveal(sectionRef.current, 'section-visible');
	}, []);

	return (
		<section id={id} className={className} ref={sectionRef}>
			{contentOnly ? null : <h3>{label}</h3>}

			<div className="section-content margin-trim">{children}</div>

			{contentOnly ? null : (
				<div className="section-button">
					<LinkScroll target="#index">
						<Icon id={'angle-up'} /> Back to top
					</LinkScroll>
				</div>
			)}
		</section>
	);
};
