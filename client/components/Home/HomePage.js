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
                    <div className="row align-items-center justify-content-center" id="regbutton">
                        <Link to="/register" className="btn btn-primary btn-md">Register a Business</Link>
                    </div>
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
