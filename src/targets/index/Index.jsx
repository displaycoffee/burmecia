/* React */
import { BrowserRouter as Router } from 'react-router-dom';

/* Local scripts */
import { utils } from '../../_config/scripts/utils';
import { variables } from '../../_config/scripts/variables';

/* Local components */
import { ContextProvider } from '../../context/Context';
import { Container } from '../../layout/container/Container';

/* Index component */
const Index = () => {
	return (
		<Router basename={variables.paths.basename}>
			<ContextProvider>
				<Container />
			</ContextProvider>
		</Router>
	);
};

/* Create main target entry point */
utils.renderTarget('#index', <Index />);
