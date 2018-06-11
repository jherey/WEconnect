import React, { Component } from 'react';
import ReactPagination from "react-paginate";
import AllBusinessList from './AllBusinessList';
import { connect } from 'react-redux';
import { getAllBusinesses } from '../../actions/businessActions';

class AllBusinesses extends Component {
	constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    };
    this.handlePageChange = this.handlePageChange.bind(this);
	}
	
	componentWillMount() {
		this.props.getAllBusinesses(this.state.activePage);
	}

	 /**
   * @description - get all busineses in pages
   * @param  {object} page the event for the content field
   * @return {void} no return or void
   *
   */
  handlePageChange(page) {
    this.props.getAllBusinesses(page.selected + 1);
	}
	
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
						subContainerClassName={"pages pagination"}
						activeClassName={'active'}
						/>
					</div>
				);
			}
	  }

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

function mapStateToProps(state) {
	return {
		businesses: state.businesses.businesses,
		count: state.businesses.count,
		isLoading: state.isLoading
	}
}

export default connect(mapStateToProps, { getAllBusinesses })(AllBusinesses);
