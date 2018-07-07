import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPagination from 'react-paginate';
import { connect } from 'react-redux';
import { search } from '../../actions/businessActions';
import Business from '../common/Business.jsx';

/**
 * @description Search component
 * @export {Object}
 * @class  Search
 * @extends {Component}
 */
class Search extends Component {
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
* @description - get all busineses in pages
* @param  {object} page the event for the content field
* @return {null} no return or void
*/
  onPageChange(page) {
    const { searchResults, searchType, searchAction } = this.props;
    searchAction(searchResults.searchWord, searchType, page.selected + 1);
  }

  /**
* @description handles pagination
* @param {count} count
* @returns {pages} pageNumbers
* @memberof AllBusinesses
*/
  renderPagination() {
    return (
      <ReactPagination
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={<a href="">...</a>}
        breakClassName={'break-me'}
        pageCount={this.props.paginate.totalPages}
        marginPagesDisplayed={this.props.paginate.currentPage}
        pageRangeDisplayed={8}
        onPageChange={this.onPageChange}
        containerClassName={'paginate justify-content-center'}
        subContainerClassName={'pages paginate'}
        activeClassName={'active'}
      />
    );
  }

  /**
   * @memberof Search
   * @return {ReactElement} markup
   */
  render() {
    const { allBusinesses, searchWord } = this.props.searchResults;

    if (allBusinesses === undefined) {
      return (<div className="query">Please enter a search query</div>);
    }

    const noSearchResults = (
			<div className="query text-center">
				<h2>No business found</h2>
			</div>
    );

    const searchComponent = allBusinesses.rows.map(business => (
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
			<div className="paddingBottom">
				{
          <div className="businesses">
            <div className="container">
              <h3 className="text-center">Search results for {`"${searchWord}"`}</h3>
              <div className="row">
                {allBusinesses.rows.length === 0 ? noSearchResults : searchComponent}
              </div>
            </div>
            { this.props.paginate.count > 8 ? this.renderPagination() : null }
          </div>
        }
			</div>
    );
  }
}

const mapStateToProps = state => ({
  searchResults: state.businesses.searchResults,
  searchType: state.businesses.searchResults.searchType,
  paginate: state.businesses.searchResults.pageDetails
});

Search.propTypes = {
  search: PropTypes.func,
  searchResults: PropTypes.object,
  searchType: PropTypes.string,
  paginate: PropTypes.object,
  searchAction: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { searchAction: search })(Search);
