import { MJMLElement } from 'mjml-core';
import React from 'react';
import MJContainer from 'mjml-container';
import MJSection from 'mjml-section';
import MJGroup from 'mjml-group';
import MJColumn from 'mjml-column';
import MJText from 'mjml-text';

@MJMLElement

class Container extends React.Component {
	render(){
		return (
			<MJContainer>
				<MJSection>
					<MJGroup>
						<MJColumn>
							<MJText>column 1</MJText>
						</MJColumn>
						<MJColumn>
							<MJText>column 2</MJText>
						</MJColumn>
					</MJGroup>
				</MJSection>
			</MJContainer>
		);
	};
}

Container.tagName = 'mj-custom-container';
Container.parentTag = [ 'mj-body' ];
Container.endingTag = false;
Container.defaultMJMLDefinition = {
	content: '',
	attributes: {}
};

export default Container;
