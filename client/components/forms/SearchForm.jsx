import React from 'react';
import PropTypes from 'prop-types';

const SearchForm = ({ onChange, onSubmit, formDetails }) => {
  // Destructure form details
  const { keyword, type } = formDetails;

  return (
			// Return form
			<form onSubmit={onSubmit}>
				<div className="form-group mr-3" id="content">
					<input
						value={keyword}
						onChange={onChange}
						name="keyword"
						type="text"
						size="40"
						className="form-control"
						placeholder="I am looking for..."
					/>
					<select
						className='form-control'
						name='type'
						onChange={onChange}
						value={type}
					>
						<option value='' disabled>by name, location or category</option>
						<option value='name'>Name</option>
						<option value='location'>Location</option>
						<option value='category'>Category</option>
					</select>
					{/* Button to search for businesses */}
					<button type="submit" id="search" className="btn button">Search</button>
				</div>
			</form>
  );
};

// Prop types for search form
SearchForm.propTypes = {
  formDetails: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  authUser: PropTypes.object
};

export default SearchForm;
