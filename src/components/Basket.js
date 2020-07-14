import React, { Component } from 'react';
import util from '../util';

export default class Basket extends Component{
	render(){
		const {cartItems} =  this.props;
		return(
			<div className="alert alert-info">
				{cartItems.length===0? "O carrinho esta vazio": <div>Voce tem {cartItems.length} produtos no carrinho</div>}
				{cartItems.length>0 &&
					<div>
						<ul>
							{cartItems.map(item => 
								<li key={item.id}>
									<b>{item.title}</b>
									X {item.count} = {item.price * item.count}
									<button className="btn btn-danger"
									onClick={(e)=>this.props.handleRemoveFromCart(e, item)}>X</button>
								</li>)}
						</ul>
						Total: {util.formatCurrency(cartItems.reduce((a, c) => a + c.price*c.count, 0))}
					</div>
				}
			</div>
		);
	}
}