/* React */
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/* Local styles */
import './styles/portal.scss';

/* Local scripts */
import { PortalProps } from './scripts/portal-types';

export const Portal = ({ element, children }: PortalProps) => {
	const [container] = useState<HTMLDivElement>(() => {
		const div = document.createElement('div');
		div.className = 'container container-portal';
		return div;
	});

	// Append container to portal target on mount, remove on unmount
	useEffect(() => {
		const portal = document.querySelector(element);
		if (!portal) return;

		portal.innerHTML = '';
		portal.appendChild(container);

		return () => {
			container.remove();
		};
	}, [element, container]);

	return createPortal(children, container);
};
