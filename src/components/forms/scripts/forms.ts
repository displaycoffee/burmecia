export const forms = {
	build: {
		className: (classes: string, className?: string) => {
			// Create className value for form fields
			return className ? `${className} ${classes}` : classes;
		},
		fieldProps: (props: { hideLabel: boolean; id: string; label: string; required: boolean }) => {
			// Build common form field props
			const { hideLabel, id, label, required } = props;
			return {
				hideLabel: hideLabel,
				id: id,
				label: label,
				required: required,
			};
		},
	},
	get: {
		describedBy: (descriptionId?: string, errorId?: string) => {
			// Get string for aria-describedby attribute
			return [descriptionId, errorId].filter(Boolean).join(' ') || undefined;
		},
		ids: (props: { description: string; error: string; id: string }) => {
			// Get ids for form field
			const { description, error, id } = props;
			const descriptionId = description ? `${id}-description` : undefined;
			const errorId = error ? `${id}-error` : undefined;
			return { descriptionId, errorId };
		},
	},
};
