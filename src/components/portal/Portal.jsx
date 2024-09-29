/* React */
import { useRef } from 'react';
import { createPortal } from 'react-dom';

/* Local styles */
import './styles/portal.scss';

export const Portal = ({ element, children }) => {
	// Get portal and create element reference
	const portal = useRef(document.querySelector(element)).current;
	const elementRef = useRef(false);

	// If there is no portal, don't return anything
	if (!portal) return null;

	// Create element reference to wrap around portal content
	if (!elementRef.current) {
		elementRef.current = document.createElement('div');
		elementRef.current.setAttribute('class', 'container');
		portal.innerHTML = ''; // remove previous content
		portal.appendChild(elementRef.current);
	}

	// Create portal with children
	return createPortal(children, elementRef.current);
};
