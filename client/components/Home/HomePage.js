import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BusinessList from './BusinessList';
import Spinner from '../Spinner';
import HeroImage from './HeroImage';
import { getAllBusinesses } from '../../actions/businessActions';

class HomePage extends Component {
    componentWillMount() {
        this.props.getAllBusinesses();
    }

    render() {
        const { businesses, isLoading } = this.props;

        if (isLoading) { return <Spinner />; }

        return (
            <div className="paddingBottom">
                <HeroImage />
                <div className="businesses">
									<BusinessList businesses={businesses} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        businesses: state.businesses,
        isLoading: state.isLoading
    }
}

export default connect(mapStateToProps, { getAllBusinesses })(HomePage);
