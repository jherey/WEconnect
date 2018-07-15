import React from 'react';
import PropTypes from 'prop-types';
import Business from '../../common/Business.jsx';
import Spinner from '../../common/Spinner.jsx';

// All businesses component
const AllBusinessList = ({ businesses, isLoading }) => {
  // Render spinner when page is loading
  if (isLoading || businesses.allBusinesses === undefined) {
    return <Spinner />;
  }

  const noBusiness = (<h5 className="query">There are no businesses yet</h5>);

  // Loop through businesses array
  const businessComponent = businesses.allBusinesses.rows.map(business => (
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
					{/* Conditional rendering */}
					{businesses.length === 0 ? noBusiness : businessComponent}
				</div>
			</div>
		</div>
  );
};

// Prop types for all businesses
AllBusinessList.propTypes = {
  businesses: PropTypes.object.isRequired,
  isLoading: PropTypes.bool
};

export default AllBusinessList;
