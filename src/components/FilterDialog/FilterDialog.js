import React, { Component } from 'react';

import { Button, Input, Row, Col } from 'react-materialize';
import Nouislider from 'react-nouislider';

import "./FilterDialog.css";
import "./Nouislider.css";


class FilterDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			color: "",
			kind: [],
			min_price: 0,
			max_price: 100,
			is_new: false
		}
	};

	render() {
		var className =  this.props.showFilter ? "" : "hide";

		return (
			<div className={ "filter-dialog modal modal-fixed-footer " +  className }>
				<div className="modal-content">
					<h4>Фильтр</h4>
					<Row>
						<Input s={12} name="color" type='select' label="Выберите цвет" value={this.state.color} onChange={this.setColor}>
							<option value='0'>Любой</option>
							<option value='Фиолетовый'>Фиолетовый</option>
							<option value='Желтый'>Желтый</option>
							<option value='Оранжевый'>Оранжевый</option>
							<option value='Белый'>Белый</option>
							<option value='Розовый'>Розовый</option>
							<option value='Синий'>Синий</option>
						</Input>   
					</Row>

					<Row>
						<Col s={12}>
							<h6 style={{marginBottom: '15px'}}>Выберите категории</h6>
						</Col>
						<Input onChange={this.setKind} name="kind" s={12} m={6} type='checkbox' value='Пони' label='Пони' className='filled-in' />
						<Input onChange={this.setKind} name="kind" s={12} m={6} type='checkbox' value='Единорог' label='Единорог' className='filled-in' />
						<Input onChange={this.setKind} name="kind" s={12} m={6} type='checkbox' value='Пегас' label='Пегас' className='filled-in' />
						<Input onChange={this.setKind} name="kind" s={12} m={6} type='checkbox' value='Аликорн' label='Аликорн' className='filled-in' />
					</Row>

					<Row>
						<Col s={12}>
							<h6 style={{marginBottom: '15px'}}>Цена</h6>
							<Nouislider 
								range={{min: 0, max: 100}}
								start={[this.state.min_price, this.state.max_price]}
								connect 
								tooltips
								onChange={this.setPrice}
							/>
						</Col>
					</Row>

					<Row style={{marginTop: '50px'}}>
						<Col s={12} m={3}>
							<h6 style={{marginBottom: '15px'}}>Новинка</h6>
						</Col>
						<Col s={6} m={3}>
						    <input id="is_new_yes" name='is_new' type="radio" value="true" onChange={this.setIsNew} defaultChecked={this.state.is_new === true}/>
						    <label htmlFor="is_new_yes">Да</label>
						</Col>
						<Col s={6} m={3}>
						    <input id="is_new_no" name='is_new' type="radio" value="false" onChange={this.setIsNew} defaultChecked={this.state.is_new === false}/>
						    <label htmlFor="is_new_no">Нет</label>
						</Col>
					</Row>

				</div>

				<div className="modal-footer">
					<Button href="#!" className="waves-effect btn" style={{marginLeft: '20px'}} onClick={this.handleFilterClick}>Найти</Button>
					<Button href="#!" className="waves-effect btn red lighten-2" onClick={this.props.onFilterClose}>Отмена</Button>
				</div>
			</div>
		);
	}

	handleFilterClick = () => {
		console.log(this.state);
		this.props.onFilter(Object.assign({}, this.state));
		this.props.onFilterClose();
	};

	setColor = event => {
		var color = event.target.value !== "0" ? event.target.value : "";
    	this.setState({ color: color });
  	};

  	setKind = event => {
  		var kind = this.state.kind.slice();
  		var kindIndex = kind.indexOf(event.target.value.toLowerCase());
  		if(kindIndex === -1 && event.target.checked) {
  			kind.push(event.target.value.toLowerCase())
  		} else if(kindIndex !== -1) {
  			kind.splice(kindIndex, 1);
  		}
  		this.setState({ kind: kind });
  	};

  	setPrice = values => {
  		if(values instanceof Array && values.length === 2) {
	    	this.setState({
	    		min_price: +values[0],
	    		max_price: +values[1]
	    	})
	    }
  	};

  	setIsNew = event => {
  		console.log(event.target);
    	this.setState({ is_new: Boolean(event.target.value) });


  	};
}

export default FilterDialog;