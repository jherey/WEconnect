import React from 'react';
import PropTypes from 'prop-types';
import Business from '../Home/Business.jsx';

const AllBusinessList = ({ businesses }) => {
  const noBusiness = (<h5>There are no businesses yet</h5>);

  const businessComponent = businesses.map(business => (
		<div className="col-lg-3 col-md-6 py-2" key={business.id}>
			<Business
				id={business.id}
				name={business.businessName}
				description={business.businessInfo}
				businessImage={business.businessImage}
				address={business.address}
				location={business.location}
				category={business.category}
				user={business.User.username}
			/>
		</div>
  ));

  return (
		<div className="businesses">
			<div className="container allBusinesses">
				<div className="row">
					{businesses.length === 0 ? noBusiness : businessComponent}
				</div>
			</div>
		</div>
  );
};

AllBusinessList.propTypes = {
  businesses: PropTypes.array.isRequired
};

export default AllBusinessList;
