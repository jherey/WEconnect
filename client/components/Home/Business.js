import React from 'react';
import TextTruncate from 'react-text-truncate';
import { Link } from 'react-router-dom';
import imageAvatar from '../../public/images/business-avatar.png';

const Business = (props) => {
	const { id, name, description, address, businessImage, location, category, user } = props;
	return (
		<div className='card h-100'>
			<div className="avatar mx-auto white">
				<img
					className="rounded-circle mt-2"
					src={businessImage == "" ? imageAvatar : businessImage}
					alt="BusinessLogo"
					style={{width: '120px', height: '120px'}}
				/>
			</div>
			<div className='card-body'>
				<p className="category text-center"><strong>{name}</strong></p>
				<hr />
				<TextTruncate
					line={2}
					text={description}
				/>
				<br />
				<p className="card-text">{category}</p>
				<p className="fontColor"><small><em>Created by {user}</em></small></p>
				<Link to={`/${id}`} className="btn btn-orange d-block mb-1">
					View Profile
				</Link>
			</div>
		</div>
	);
}

export default Business;