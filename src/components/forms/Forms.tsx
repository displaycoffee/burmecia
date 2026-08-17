/* Styles */
import './styles/forms.scss';

/* Packages */
import { Children, isValidElement } from 'react';

/* Scripts */
import {
	ButtonProps,
	ChoiceProps,
	DescriptionProps,
	ErrorFieldProps,
	FormProps,
	FormFieldProps,
	FormFieldDetailsProps,
	InputProps,
	RequiredProps,
	SelectProps,
	TextareaProps,
} from './scripts/forms-types';
import { forms } from './scripts/forms';

/* Components */
import { Icon } from '../icons/Icons';

export const Button = (props: ButtonProps) => {
	const { children, className: propClassName, type = 'button', variant = 'primary', ...rest } = props;
	const className = forms.build.className(`${variant != 'unstyled' ? 'button ' : ''}button-${variant} pointer`, propClassName);

	return (
		<button className={className} type={type} {...rest}>
			{children}
		</button>
	);
};

export const Choice = (props: ChoiceProps) => {
	const { active = false, className: propClassName, hideLabel = false, id, label, type = 'checkbox', ...rest } = props;
	const className = forms.build.className(`choice choice-${type} sr-only`, propClassName);

	return (
		<div className={`choice-wrapper choice-wrapper-${type}${active ? ' choice-wrapper-active' : ''}`}>
			{active ? (
				type == 'radio' ? (
					<div className="icon-wrapper">
						<div className="icon icon-circle"></div>
					</div>
				) : (
					<Icon id={'check-thin'} />
				)
			) : (
				<div className="icon-wrapper"></div>
			)}

			<input id={id} className={className} name={id} type={type} {...rest} />

			<label className={`label pointer${hideLabel ? ' sr-only' : ''}`} htmlFor={id}>
				{label}
			</label>
		</div>
	);
};

/* Display name for identifying choice elements */
Choice.displayName = 'Choice';

export const Form = (props: FormProps) => {
	const { children, className: propClassName, ...rest } = props;
	const className = forms.build.className(`form margin-trim`, propClassName);

	return (
		<form className={className} {...rest}>
			{children}
		</form>
	);
};

export const FormField = (props: FormFieldProps) => {
	const { children, hideLabel, id, label, required } = props;
	const className = forms.build.className(`form-field`, props?.className);
	const isChoice = Children.toArray(children).some(
		(child) => isValidElement(child) && (child.type as { displayName?: string })?.displayName === 'Choice',
	);

	// Create elements for form field
	const Tag = isChoice ? 'fieldset' : 'div';
	const Label = isChoice ? 'span' : 'label';

	// Determine attributes for label
	const labelAttributes = {
		className: `label${!hideLabel && !isChoice ? ' pointer' : ''}${hideLabel ? ' sr-only' : ''}`,
		htmlFor: isChoice ? undefined : id,
	};

	return (
		<Tag className={className}>
			{isChoice ? <legend className="sr-only">{label}</legend> : null}

			{hideLabel ? (
				isChoice ? null : (
					<Label {...labelAttributes}>{label}</Label>
				)
			) : (
				<div className="form-field-label">
					<Label {...labelAttributes} aria-hidden={isChoice ? 'true' : undefined}>
						{label}
						<Required isRequired={required ?? false} />
					</Label>
				</div>
			)}

			<div className="form-field-control">{children}</div>
		</Tag>
	);
};

export const Input = (props: InputProps) => {
	const { className: propClassName, description = '', error = '', hideLabel = false, id, label, required = false, type = 'text', ...rest } = props;
	const className = forms.build.className(`input input-${type}`, propClassName);
	const { descriptionId, errorId } = forms.get.ids({ description, error, id });

	// Props for form field
	const formFieldProps = forms.build.fieldProps({ hideLabel, id, label, required });

	return (
		<FormField {...formFieldProps}>
			<input
				id={id}
				className={className}
				name={id}
				type={type}
				required={required}
				aria-required={required || undefined}
				aria-invalid={!!error || undefined}
				aria-describedby={forms.get.describedBy(descriptionId, errorId)}
				{...rest}
			/>
			<FormFieldDetails description={description} descriptionId={descriptionId} error={error} errorId={errorId} />
		</FormField>
	);
};

export const Select = (props: SelectProps) => {
	const { children, className: propClassName, description = '', error = '', hideLabel = false, icon, id, label, required = false, ...rest } = props;
	const className = forms.build.className(`select pointer`, propClassName);
	const { descriptionId, errorId } = forms.get.ids({ description, error, id });

	// Props for form field
	const formFieldProps = forms.build.fieldProps({ hideLabel, id, label, required });

	return (
		<FormField {...formFieldProps}>
			<div className="select-wrapper">
				<select
					id={id}
					className={className}
					name={id}
					required={required}
					aria-required={required || undefined}
					aria-invalid={!!error || undefined}
					aria-describedby={forms.get.describedBy(descriptionId, errorId)}
					{...rest}
				>
					{children}
				</select>
				<Icon id={icon ?? 'angle-down'} />
			</div>
			<FormFieldDetails description={description} descriptionId={descriptionId} error={error} errorId={errorId} />
		</FormField>
	);
};

export const Textarea = (props: TextareaProps) => {
	const { className: propClassName, description = '', error = '', hideLabel = false, id, label, required = false, ...rest } = props;
	const className = forms.build.className(`textarea`, propClassName);
	const { descriptionId, errorId } = forms.get.ids({ description, error, id });

	// Props for form field
	const formFieldProps = forms.build.fieldProps({ hideLabel, id, label, required });

	return (
		<FormField {...formFieldProps}>
			<textarea
				id={id}
				className={className}
				name={id}
				required={required}
				aria-required={required || undefined}
				aria-invalid={!!error || undefined}
				aria-describedby={forms.get.describedBy(descriptionId, errorId)}
				{...rest}
			/>
			<FormFieldDetails description={description} descriptionId={descriptionId} error={error} errorId={errorId} />
		</FormField>
	);
};

/* Components for forms only; not exported */

const Description = (props: DescriptionProps) => {
	const { description, id } = props;

	return description ? (
		<div id={id} className="form-description">
			{description}
		</div>
	) : null;
};

const ErrorField = (props: ErrorFieldProps) => {
	const { error, id } = props;

	return error ? (
		<div id={id} className="form-error" role="alert">
			{error}
		</div>
	) : null;
};

const FormFieldDetails = (props: FormFieldDetailsProps) => {
	const { description, descriptionId, error, errorId } = props;

	return (
		<>
			<Description description={description} id={descriptionId} />
			<ErrorField error={error} id={errorId} />
		</>
	);
};

const Required = (props: RequiredProps) => {
	const { isRequired } = props;

	return isRequired ? (
		<span className="form-required" aria-hidden="true">
			*
		</span>
	) : null;
};
