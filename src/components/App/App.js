import React, {Component} from 'react';
import Catalog from '../Catalog/Catalog';
import Overlay from '../Overlay/Overlay';

import ponies from '../../ponies';

import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showOverlay: false
		}
	}

	render() {
		return (
			<div>
				<Catalog items={ponies} 
						 showOverlay = {this.state.showOverlay}
						 onLinkClick = {this.handleLinkClick.bind(this)}
						 onOverlayClick = {this.handleOverlayClick.bind(this)}
				/>
				{ this.state.showOverlay && <Overlay onClick={this.handleOverlayClick.bind(this)} /> }
			</div>
		)
	}

	handleLinkClick = () => {
		if(document.body.className.indexOf('with-overlay') === -1) {
			document.body.className += 'with-overlay';
		}
		this.setState({showOverlay: true});
	};

	handleOverlayClick = () => {
		document.body.className = document.body.className.replace('with-overlay', '');
		this.setState({showOverlay: false});
	};
}

export default App;