import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BusinessList from './BusinessList';
import HeroImage from './HeroImage';
import { getAllBusinesses } from '../../actions/businessActions';

class HomePage extends Component {
    componentDidMount() {
        this.props.getAllBusinesses();
    }

    render() {
        const { businesses } = this.props;

        return (
            <div>
                <HeroImage />
                <div style={{ background: 'white' }}>
                    <h2 className='text-center latest'>LATEST BUSINESSES</h2>
                    <BusinessList businesses={businesses} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        businesses: state.businesses
    }
}

export default connect(mapStateToProps, { getAllBusinesses })(HomePage);
