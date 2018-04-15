import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Icon} from 'react-materialize';

import Item from '../Item/Item';
import Filter from '../FilterDialog/FilterDialog';

class Catalog extends Component {
	static propTypes = {
		items: PropTypes.array.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			items: props.items,
			itemsToShow: this.getItemsToShow(props.items),
			itemsShowCount: 20,
			isFiltered: false,
			filteredItems: [],
			showFilter: false
		};
	};

	render() {
		var items = this.state.isFiltered ? this.state.filteredItems : this.state.itemsToShow;
		items = items.map(item =>
			<Col key={item.id} s={12} m={6} l={4} className="xl3">
				<Item data={item} />
			</Col>
		);

		var content = (items.length > 0) ? items : <h5 className="center-align">Не удалось ничего найти</h5>;

		return (
			<div>
				<div className="container">
					<Row>
						<Col s={12} className="clearfix">
							<h4 className="left">Список товаров</h4>
							<a className="waves-effect waves-light btn right" onClick={this.handleFilterButtonClick} style={{ marginTop: '1.15rem', marginLeft: '1rem' }}>
								<Icon small className="material-icon right">filter_list</Icon>Фильтр
							</a>
							{this.state.isFiltered > 0 && 
								<a className="waves-effect waves-light btn right red lighten-2" onClick={this.clearFiltered} style={{ marginTop: '1.15rem' }}>
									<Icon small className="material-icon right">clear</Icon>Отменить фильтрацию
								</a>
							}
						</Col>
					</Row>
					<Row>
						{content}
					</Row>
				</div>
				<Filter showFilter = { this.state.showFilter && this.props.showOverlay }
						onFilter = {this.handleFilter}
						onFilterClose = { this.handleFilterClose }
				/>
			</div>
		)
	};

	getItemsToShow = (items) => {
		if(items instanceof Array) {
			var itemsCopy = items.slice();
			return itemsCopy.sort(function(){
				return Math.round(Math.random());
			}).splice(0,20);
		}
		return [];
	};

	clearFiltered = () => {
		this.setState({ isFiltered: false, filteredItems: [] });
	};

	handleFilter = (filter) => {
		var items = this.state.items.slice();
		var filtered = items.filter(function(item) {
			var colorFilter = Boolean(filter.color === "" 
				|| item.color.toLowerCase() === filter.color.toLowerCase());

			var kindFilter = Boolean(filter.kind.indexOf(item.kind.toLowerCase()) !== -1);

			var isNewFilter = Boolean(item.is_new === filter.is_new);

			var priceFilter = Boolean(+item.price >= filter.min_price 
				&& +item.price <= filter.max_price);

			if(colorFilter && kindFilter && isNewFilter && priceFilter) {
				return item
			}
		});
		filtered = this.getItemsToShow(filtered);
		this.setState({isFiltered: true, filteredItems: filtered});
	};

	handleFilterButtonClick = () => {
		this.props.onLinkClick();
		this.setState({showFilter: true});
	};

	handleFilterClose = () => {
		this.props.onOverlayClick();
		this.setState({showFilter: false});
	};
}

export default Catalog;