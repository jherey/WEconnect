import React from 'react';
import { Link } from 'react-router-dom';

const Business = (props) => {
	const { id, name, description, address, location, category } = props;
	return (
		<div className="col-lg-3 col-md-6">
			<div className='card mb-4 testimonial-card'>
				<div class="avatar mx-auto white">
					<img className="rounded-circle" src={require('../../public/images/companies/nbc.jpg')} alt="" />
    		</div>
				<div className='card-body'>
					<p className="category text-center">{name}</p>
					<hr />
					<p class="card-text"><small>Description: {description}</small></p>
					<Link to={`/${id}`} className="btn btn-orange d-block mb-1">
						View Profile
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Business;