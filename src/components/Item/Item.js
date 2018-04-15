import React, {Component} from 'react';
import {Card, CardTitle} from 'react-materialize';

class Item extends Component {
	render() {
		var {data} = this.props
		var title = <CardTitle reveal image={data.image} waves='light'/>
		var reveal = (
			<div>
				<p>{ 'Цвет: ' + data.color }</p>
				<p>{ 'Вид: ' + data.kind }</p>
				<p>{ 'Цена: ' + data.price + '$' }</p>
				<p>{ 'Новинка: ' + (data.is_new ? 'Да' : 'Нет') }</p>
			</div>
		)

		return (
		<Card header={title} 
			title={data.name} 
			reveal={reveal}
			className='medium'
		>
		    <p>{data.price + '$'}</p>
		</Card>
		)
	}
}

export default Item;