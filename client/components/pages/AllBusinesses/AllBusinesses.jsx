import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPagination from 'react-paginate';
import Spinner from '../../common/Spinner/index.jsx';
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
    this.props.getBusinessesByPage(1);
  }

  /**
* @description - get all busineses in pages
* @param  {object} page the event for the content field
* @return {null} no return or void
*/
  onPageChange(page) {
    this.props.getBusinessesByPage(page.selected + 1);
  }

  /**
* @description handles pagination
* @param {count} count
* @returns {pages} pageNumbers
* @memberof AllBusinesses
*/
  renderPagination() {
    const { paginate } = this.props;
    return (
      <ReactPagination
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={<a href="">...</a>}
        breakClassName={'break-me'}
        pageCount={paginate.totalPages}
        marginPagesDisplayed={paginate.currentPage}
        pageRangeDisplayed={8}
        onPageChange={this.onPageChange}
        containerClassName={'paginate justify-content-center'}
        subContainerClassName={'pages paginate'}
        activeClassName={'active'}
      />
    );
  }

  /**
   * @memberof AllBusinesses
   * @return {ReactElement} markup
   */
  render() {
    const { businesses, isLoading } = this.props;
    return (
			<div className="paddingBottom">
        {
          isLoading
          ?
          <div style={{ marginTop: '10%', textAlign: 'center' }}>
            <Spinner />
          </div>
          :
          <div id='allbusiness'>
            <AllBusinessList businesses={businesses} isLoading={isLoading} />
            { this.props.paginate.count > 8 ? this.renderPagination() : null }
          </div>
        }
			</div>
    );
  }
}

const mapStateToProps = state => ({
  businesses: state.businesses.businesses,
  isLoading: state.authUser.isLoading,
  paginate: state.businesses.pageDetails
});

AllBusinesses.propTypes = {
  getBusinessesByPage: PropTypes.func.isRequired,
  count: PropTypes.number,
  businesses: PropTypes.array,
  isLoading: PropTypes.bool,
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  paginate: PropTypes.object
};

export default connect(mapStateToProps, { getBusinessesByPage })(AllBusinesses);
