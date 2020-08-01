import React, { Component } from 'react';
import { connect } from 'react-redux';
import Products from '../components/Products';
import Product from '../components/Product';
import PropTypes from 'prop-types';
import { actAddToCart, actChangeMessage } from '../actions/index'
// import message from '../reducers/message';
// lay du lieu tren store ve, roi truyen qua prop Products
// Trung gin nhan va xu ly, truyen du lieu di
class ProductsContainer extends Component {
	render() {
		var { products } = this.props
		return (
			<Products>
				{this.showProduct(products)}
			</Products>
		);
	}
	showProduct(products) {
		var result = null;
		var {onAddToCart, onChangeMessage} = this.props;
		if (products.length > 0) {
			result = products.map((product, index) => {
				return <Product
					key={index}
					product={product}
					onAddToCart = {onAddToCart} // tren qua Product-> thi ben kia phai nhan lai
					onChangeMessage = {onChangeMessage}
				></Product>
			});
		}
		return result;
	}

}
// checking props type 
ProductsContainer.propTypes = {
	products: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			image: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired,
			inventory: PropTypes.number.isRequired,
			rating: PropTypes.number.isRequired
		})
	).isRequired,
	onChangeMessage : PropTypes.func.isRequired,
	onAddToCart : PropTypes.func.isRequired
}
// goi len store-> chinh la state= product -> chuyen thanh props
const mapStateToProps = (state) => {
	return {
		products: state.products // chinh la tai reducers->index : products
	}
}
const mapDispatchToProps = (dispatch, props) => {
	return {
		onAddToCart: (product) => { // truyen tiep vap Product
			dispatch(actAddToCart(product, 1));
		},
		onChangeMessage: (message)=>{
			dispatch(actChangeMessage(message))
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);
