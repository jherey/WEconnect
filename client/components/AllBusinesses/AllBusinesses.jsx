import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPagination from 'react-paginate';
import Spinner from '../Spinner/index.jsx';
import AllBusinessList from './AllBusinessList.jsx';
import { getAllBusinesses } from '../../actions/businessActions';

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
    this.state = {
      activePage: 1
    };
    this.onPageChange = this.onPageChange.bind(this);
  }

  /**
   * @description Fetches all businesses
   * @returns {null} null
   * @memberof AllBusinesses
   */
  componentWillMount() {
    this.props.getAllBusinesses(this.state.activePage);
  }

  /**
* @description - get all busineses in pages
* @param  {object} page the event for the content field
* @return {null} no return or void
*/
  onPageChange(page) {
    this.props.getAllBusinesses(page.selected + 1);
  }

  /**
* @description handles pagination
* @param {count} count
* @returns {pages} pageNumbers
* @memberof AllBusinesses
*/
  renderPagination() {
    return (
      <div>
        <ReactPagination
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={<a href="">...</a>}
          breakClassName={'break-me'}
          pageCount={this.props.paginate.totalPages}
          marginPagesDisplayed={this.props.paginate.currentPage}
          pageRangeDisplayed={8}
          initialPage={this.props.paginate.count}
          onPageChange={this.onPageChange}
          containerClassName={'paginate justify-content-center'}
          subContainerClassName={'pages paginate'}
          activeClassName={'active'}
        />
      </div>
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
          </div>
        }
				{this.renderPagination(0)}
			</div>
    );
  }
}

const mapStateToProps = state => ({
  businesses: state.businesses.businesses,
  isLoading: state.isLoading,
  paginate: state.paginate
});

AllBusinesses.propTypes = {
  getAllBusinesses: PropTypes.func.isRequired,
  count: PropTypes.number,
  businesses: PropTypes.array,
  isLoading: PropTypes.bool,
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  paginate: PropTypes.object
};

export default connect(mapStateToProps, { getAllBusinesses })(AllBusinesses);
