/* React */
/* Note: mostly code from reactjs.org/docs/error-boundaries.html */
import { Component, ErrorInfo, PropsWithChildren, ReactElement, ReactNode } from 'react';

/* Local styles */
import './styles/error-boundary.scss';

type ErrorProps = {
	message: ReactNode;
	children: ReactNode;
};
type ErrorState = {
	hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorProps, ErrorState> {
	constructor(props: ErrorProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		// The function parameter "error" can be returned in function
		return { hasError: true };
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		console.error('ErrorBoundary caught an error', error, info);
	}

	render() {
		if (this.state.hasError) {
			return <div className="error-boundary spacing-reset">{this.props.message}</div>;
		}

		return this.props.children;
	}
}
