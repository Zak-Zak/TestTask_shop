import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Overlay.css'

class Overlay extends Component {
	static propTypes = {
		onClick: PropTypes.func.isRequired
	};

	render() {
		return (
			<div className="overlay" onClick={this.props.onClick} />
		)
	}
}

export default Overlay;