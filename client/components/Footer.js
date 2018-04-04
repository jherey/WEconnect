import React, { Component } from 'react';

class Footer extends Component {
	render() {
		return (
			<footer className="footer-distributed text-center">
				<hr id="footer-hr" />
				<div className="footer-left">
					<p className="footer-links">
						<a href="/home">Home</a>
						·
						<a href="contact.html"> Contact Us</a>
					</p>
					<p id="cortesy">WEconnect &copy; 2018</p>
				</div>
			</footer>
		);
	}
}

export default Footer;