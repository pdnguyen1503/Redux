import React, { Component } from 'react';
import Header from './components/Header';
import ProductsContainer from './containers/ProductsContainer'
import MessageContainer from './containers/MessageContainer'
import CartContainer from './containers/CartContainer'
import Footer from './components/Footer'
class App extends Component{
	render() {
		return (
			<div className="App">
				<div>
					{/* <!-- Header --> */}
					<Header></Header>
					<main id="mainContainer">
						<div className="container">
							{/* <!-- Products --> */}
							<ProductsContainer></ProductsContainer>
							{/* <!-- Message --> */}
							<MessageContainer></MessageContainer>
							{/* <!-- Cart --> */}
							<CartContainer></CartContainer>
						</div>
					</main>
					{/* <!-- Footer --> */}
					<Footer></Footer>
				</div>
			</div>
		);
	}
}

export default App;
