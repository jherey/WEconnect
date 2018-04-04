import React, { Component } from 'react';
import Navbar from './Navbar';

class Home extends Component {
	render() {
		return (
			<div className="">
				<div>
					<Navbar />
				</div>
				<div>
					{this.props.children}
				</div>
				{/* <div>
					<Footer />
				</div> */}
			</div>
		);
	}
}

export default Home;
