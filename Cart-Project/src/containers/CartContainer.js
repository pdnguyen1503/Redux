import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CartItem from '../components/CartItem';
import Cart from '../components/Cart';
import * as Message from '../constants/Message';
import CartResult from '../components/CartResult';
import {actDeleteProductInCart, actChangeMessage, actUpdateProductInCart} from '../actions/index'

// lay du lieu tren store ve, roi truyen qua prop Products
// Trung gin nhan va xu ly, truyen du lieu di
class CartContainer extends Component {
	render() {
        var {cart} = this.props;
		return (
			<Cart>
				{this.showCartItem(cart)}
				{this.showTotalAmount(cart)}
			</Cart>
		);
	}
	showCartItem = (cart)=>{
		var {onDeleteProductInCart, onChangeMessage, onUpdateProductInCart} = this.props;
		var result = <tr>
			<td>{Message.MSG_CART_EMPTY}</td>
		</tr>
		if(cart.length > 0){
			result = cart.map((item, index)=>{
				return (
					<CartItem 
						key={index}
						item= {item}
						index = {index}
						onDeleteProductInCart ={onDeleteProductInCart} // truyen xong roi thi qua cartItem nhan lai
						onChangeMessage={onChangeMessage}
						onUpdateProductInCart = {onUpdateProductInCart}
					></CartItem>
				)
			})
		}
		return result;
	}

	showTotalAmount = (cart)=>{
		var result = null;
		if(cart.length > 0){
			result = <CartResult cart={cart}></CartResult>
		}
		return result;
	}
	
}
// checking props type 
CartContainer.propTypes = {
	cart: PropTypes.arrayOf(PropTypes.shape({
        product : PropTypes.shape({
            id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			image: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired,
			inventory: PropTypes.number.isRequired,
			rating: PropTypes.number.isRequired
        }).isRequired,
        quantity: PropTypes.number.isRequired
    })
	).isRequired,
	onDeleteProductInCart : PropTypes.func.isRequired,
	onChangeMessage : PropTypes.func.isRequired,
	onUpdateProductInCart : PropTypes.func.isRequired

}
// goi len store-> chinh la state= product -> chuyen thanh props
const mapStateToProps = (state)=>{
	return {
        cart : state.cart // co props.cart -> danh sach san pham torng gio hang
	}
}
const mapDispatchToProps = (dispatch, props)=>{
	return{
		onDeleteProductInCart: (product)=>{ // tham so nay truyen qua actions->index
			dispatch(actDeleteProductInCart(product)) // truyen product vao

		},
		onChangeMessage: (message)=>{
			dispatch(actChangeMessage(message))
		},
		onUpdateProductInCart: (product, quantity)=>{
			dispatch(actUpdateProductInCart(product, quantity))
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(CartContainer);
