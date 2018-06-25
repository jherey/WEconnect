import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPagination from 'react-paginate';
import AllBusinessList from './AllBusinessList.jsx';
import { getBusinessesByPage } from '../../actions/businessActions';

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
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  /**
   * @description Fetches all businesses
   * @returns {null} null
   * @memberof AllBusinesses
   */
  componentWillMount() {
    this.props.getBusinessesByPage(this.state.activePage);
  }

  /**
* @description - get all busineses in pages
* @param  {object} page the event for the content field
* @return {null} no return or void
*/
  handlePageChange(page) {
    this.props.getBusinessesByPage(page.selected + 1);
  }

  /**
* @description handles pagination
* @param {count} count
* @returns {pages} pageNumbers
* @memberof AllBusinesses
*/
  renderPagination(count) {
    if (this.props.count < 8) {
      return (
				<div>
					<ReactPagination
						previousLabel={
							<i className="fas fa-angle-double-left" />
						}
						nextLabel={
							<i className="fas fa-angle-double-right" />
						}
						breakLabel={<a href="">...</a>}
						breakClassName={'break-me'}
						pageCount={this.props.count / 10}
						marginPagesDisplayed={2}
						pageRangeDisplayed={5}
						initialPage={count}
						onPageChange={this.handlePageChange}
						containerClassName={'pagination justify-content-center'}
						subContainerClassName={'pages pagination'}
						activeClassName={'active'}
					/>
				</div>
      );
    }
  }

  /**
   * @memberof AllBusinesses
   * @return {ReactElement} markup
   */
  render() {
    const { businesses, isLoading } = this.props;

    return (
			<div className="paddingBottom">
				<div id='allbusiness'>
					<AllBusinessList businesses={businesses} isLoading={isLoading} />
				</div>
				{this.renderPagination(0)}
			</div>
    );
  }
}

const mapStateToProps = state => ({
  businesses: state.businesses.businesses,
  count: state.businesses.count,
  isLoading: state.isLoading
});

AllBusinesses.propTypes = {
  getBusinessesByPage: PropTypes.func.isRequired,
  count: PropTypes.number,
  businesses: PropTypes.array.isRequired,
  isLoading: PropTypes.bool
};

export default connect(mapStateToProps, { getBusinessesByPage })(AllBusinesses);
