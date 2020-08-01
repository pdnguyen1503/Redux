import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Message from '../components/Message'
// lay du lieu tren store ve, roi truyen qua prop Products
// Trung gin nhan va xu ly, truyen du lieu di
class MessageContainer extends Component {
	render() {
		var { message } = this.props
		return (
            <Message message={message}></Message>
		);
	}

}

MessageContainer.propTypes = {
	message: PropTypes.string.isRequired
}
// goi len store-> chinh la state= product -> chuyen thanh props
const mapStateToProps = (state) => {
	return {
        message: state.message
	}
}

export default connect(mapStateToProps, null)(MessageContainer);
