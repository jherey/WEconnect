import React from 'react';
import { Link } from 'react-router-dom';

const Business = (props) => {
	const { id, name } = props;
	return (
		<div className="col-lg-3 col-sm-6">
			<Link to={`/${id}`} className="d-block mb-4 h-100">
				<img className="img-fluid img-thumbnail" src={require('../../public/images/companies/nbc.jpg')} alt="" />
				<p className="category">{name}</p>
			</Link>
		</div>
	);
}

export default Business;