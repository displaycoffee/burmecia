/* Styles */
import './styles/page-four.scss';

/* Components */
import { Form, Input, Select, Textarea } from '../../components/forms/Forms';

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
			</Form>
		</div>
	);
};
