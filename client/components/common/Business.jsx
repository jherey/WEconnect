import React from 'react';
import PropTypes from 'prop-types';
import TextTruncate from 'react-text-truncate';
import { Link } from 'react-router-dom';
import imageAvatar from '../../public/images/business-avatar.png';

// Business component
const Business = (props) => {
  // Destructure props
  const {
    id, name, description, businessImage, category, user
  } = props;
  return (
		<div className='card h-100'>
			<div className="avatar mx-auto white">
				{/* Business image */}
				<img
					className="rounded-circle mt-2"
					src={businessImage === '' ? imageAvatar : businessImage}
					alt="BusinessLogo"
					style={{ width: '120px', height: '120px' }}
				/>
			</div>
			<div className='card-body'>
				{/* Business name */}
				<p className="category text-center"><strong>{name}</strong></p>
				<hr />
				{/* Business description */}
				<TextTruncate
					line={2}
					text={description}
				/>
				<br />
				{/* Business category */}
				<p className="card-text">{category}</p>
				{/* Business owner */}
				<p className="fontColor"><small><em>Created by {user}</em></small></p>
				{/* Link to business profile */}
				<Link to={`/${id}`} className="btn btn-orange d-block mb-1">
					View Profile
				</Link>
			</div>
		</div>
  );
};

// Business prop types
Business.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  businessImage: PropTypes.string,
  category: PropTypes.string.isRequired,
  user: PropTypes.string
};

export default Business;
