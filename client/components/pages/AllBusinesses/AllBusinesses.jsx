import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPagination from 'react-paginate';
import AllBusinessList from './AllBusinessList.jsx';
import { getBusinessesByPage } from '../../../actions/businessActions';

/**
 * @description All businesses component
 * @export {Object}
 * @class  AllBusinesses
 * @extends {Component}
 */
class AllBusinesses extends Component {
/**
* @description Creates an instance of AllBusinesses
* @param {object} props
* @memberof AllBusinesses
*/
  constructor(props) {
    super(props);
    this.onPageChange = this.onPageChange.bind(this);
  }

  /**
   * @description Fetches all businesses
   * @returns {null} null
   * @memberof AllBusinesses
   */
  componentWillMount() {
    const { getBusinessesByPageAction } = this.props;
    getBusinessesByPageAction(1);
  }

  /**
* @description - get all busineses in pages
* @param  {object} page the event for the content field
* @return {null} no return or void
*/
  onPageChange(page) {
    const { getBusinessesByPageAction } = this.props;
    getBusinessesByPageAction(page.selected + 1);
  }

  /**
* @description handles pagination
* @param {count} count
* @returns {pages} pageNumbers
* @memberof AllBusinesses
*/
  renderPagination() {
    const { paginate } = this.props;
    const { totalPages, currentPage, count } = paginate;
    if (count > 8) {
      return (
        <ReactPagination
          previousLabel='previous'
          nextLabel='next'
          breakLabel={<a href="">...</a>}
          breakClassName='break-me'
          pageCount={totalPages}
          marginPagesDisplayed={currentPage}
          pageRangeDisplayed={8}
          onPageChange={this.onPageChange}
          containerClassName='paginate justify-content-center'
          subContainerClassName='pages paginate'
          activeClassName='active'
        />
      );
    }
  }

  /**
   * @memberof AllBusinesses
   * @return {ReactElement} markup
   */
  render() {
    const { businesses, isLoading, paginate } = this.props;
    return (
			<div className="paddingBottom">
          {/* Display businesses if loading is false */}
          <div id='allbusiness'>
            {/* Component that lists all businesses */}
            <AllBusinessList
              businesses={businesses}
              isLoading={isLoading}
            />
            {/* Render pagination */}
            { paginate === undefined ? null : this.renderPagination() }
          </div>
			</div>
    );
  }
}

const mapStateToProps = state => ({
  businesses: state.businesses.businesses,
  isLoading: state.authUser.isLoading,
  paginate: state.businesses.businesses.pageDetails
});

// Prop types for all businesses
AllBusinesses.propTypes = {
  getBusinessesByPageAction: PropTypes.func.isRequired,
  count: PropTypes.number,
  businesses: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  paginate: PropTypes.object
};

export default connect(mapStateToProps, {
  getBusinessesByPageAction: getBusinessesByPage
})(AllBusinesses);
