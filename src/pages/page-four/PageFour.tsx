/* Styles */
import './styles/page-four.scss';

/* Components */
import { Button, Choice, Form, FormActions, FormField, Input, Select, Textarea } from '../../components/forms/Forms';
import { Icon } from '../../components/icons/Icons';

export const PageFour = () => {
	// Sample content
	const description = 'This is a description explaning what the field does.';
	const error = 'This is an error message.';
	const placeholder = 'Enter your text, please.';

	return (
		<div className="page-four margin-trim">
			<h2>Page Four</h2>

			<p>This is an example of form fields.</p>

			<Form>
				<FormField id={'checkboxes-01'} label={'Checkboxes 01'}>
					<Choice label="Checkbox option 01" id={'checkbox-option-01'} />

					<Choice label="Checkbox option 02" id={'checkbox-option-02'} active={true} />

					<Choice label="Checkbox option 03" id={'checkbox-option-03'} />
				</FormField>

				<FormField id={'radios-01'} label={'Radios 01'}>
					<Choice label="Radio option 01" id={'radio-option-01'} type={'radio'} />

					<Choice label="Radio option 02" id={'radio-option-02'} type={'radio'} active={true} />

					<Choice label="Radio option 03" id={'radio-option-03'} type={'radio'} />
				</FormField>

				<Input hideLabel={true} id={'input-01'} label={'Input 01'} placeholder="Example with hidden label." />

				<Input id={'input-02'} label={'Input 02'} placeholder={placeholder} required={true} />

				<Input id={'input-03'} label={'Input 03'} placeholder={placeholder} error={error} />

				<Input id={'input-04'} label={'Input 04'} description={description} />

				<Input id={'input-05'} label={'Input 05'} placeholder={placeholder} error={error} description={description} />

				<Select id={'select-01'} label={'Select 01'} error={error} description={description}>
					<option value="option-01">Option 01</option>
					<option value="option-02">Option 02</option>
					<option value="option-03">Option 03</option>
				</Select>

				<Textarea id={'textarea-01'} label={'Textarea 01'} placeholder={placeholder} error={error} description={description} rows={3} />

				<FormActions>
					<Button label={'Primary Button with Children'}>
						<Icon id={'heart'} />
					</Button>
					<Button label={'Secondary Button'} variant="secondary" />
					<Button label={'Tertiary Button'} variant="tertiary" />
					<Button label={'Button with Hidden Label'} hideLabel={true}>
						<Icon id={'star'} />
					</Button>
				</FormActions>
			</Form>
		</div>
	);
};
