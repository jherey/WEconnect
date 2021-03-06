import React from 'react';
import PropTypes from 'prop-types';
import Business from '../common/Business.jsx';
import Spinner from '../common/Spinner.jsx';

// Business list compoennt
const BusinessList = ({ businesses, isLoading }) => {
  if (businesses.allBusinesses === undefined || isLoading) {
    return <Spinner />;
  }
  const noBusiness = (<h5 className="none">There are no businesses yet</h5>);

  // Loop through businesses
  const businessComponent = businesses.allBusinesses.rows.map((business, i) => {
    if (i < 8) {
      return (
				<div className="col-lg-3 col-md-6 py-2" key={business.id}>
					{/* Business compoennt */}
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
      );
    }
  });

  return (
		<div className="container">
			<h2 className='text-center latest'>Latest Businesses</h2>
			<div className="row">
				{/* Conditional rendering */}
				{businesses.allBusinesses.rows.length === 0 ? noBusiness : businessComponent}
			</div>
		</div>
  );
};

// Prop types for business list
BusinessList.propTypes = {
  businesses: PropTypes.object,
  isLoading: PropTypes.bool.isRequired
};

export default BusinessList;
