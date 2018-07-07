import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Business from '../common/Business.jsx';
import UserProfile from '../pages/UserProfile.jsx';
import UpdateProfileForm from '../forms/UpdateProfileForm.jsx';
import Spinner from '../common/Spinner/index.jsx';
import { imageUpload, updateUser } from '../../actions/userActions';
import { getAUserBusiness } from '../../actions/businessActions';
import maleAvartar from '../../public/images/male-avatar.png';
import femaleAvartar from '../../public/images/female-avatar.png';

/**
 * @description User dashboard page component
 * @export {Object}
 * @class  DashboardPage
 * @extends {Component}
 */
class DashboardPage extends Component {
/**
* @description Creates an instance of DashboardPage
* @param {object} props
* @memberof DashboardPage
*/
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.authUser.user.id,
      firstname: '',
      lastname: '',
      username: '',
      sex: '',
      email: '',
      profilepic: '',
      errors: [],
      uploading: false
    };
    this.uploadImage = this.uploadImage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
* @description Fetches a user and user's businesses
* @param {any} props
* @returns {null} null
*/
  componentWillMount() {
    const { authUser } = this.props;
    this.props.getAUserBusiness(authUser.user.id);
  }

  /**
   * @return {null} null
   * @param {object} nextProps
   * @memberof DashboardPage
   */
  componentWillReceiveProps(nextProps) {
    const {
      firstname, lastname, username, sex, email, profilepic
    } = nextProps.authUser.user;
    this.setState({
      firstname,
      lastname,
      username,
      sex,
      email,
      profilepic
    });
  }

  /**
*
* @returns {null} null
* @param {event} event
* @memberof DashboardPage
*/
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof SignupForm
*/
  uploadImage(event) {
    this.setState({ profilepic: '', uploading: true });
    const image = event.target.files[0];
    this.props.imageUpload(image).then(() => {
      const { authUser } = this.props;
      this.setState({ uploading: false, profilepic: authUser.imageUrl });
    });
  }

  /**
 * @description submits form
 * @param {event} event
 * @returns {null} null
 * @memberof DashboardPage
 */
  onSubmit(event) {
    event.preventDefault();
    document.getElementById('hidePopUpBtn').click();
    this.props.updateUser(this.state).then(() => {
      const { authUser } = this.props;
      if (!authUser.updateUserError) {
        toastr.success('Update successful!');
      } else {
        $('#editUserModal').modal();
        authUser.updateUserError.map(err => toastr.error(err));
      }
    });
  }

  /**
   * @memberof DashboardPage
   * @return {ReactElement} markup
   */
  render() {
    const { businessList, authUser } = this.props;

    const noBusiness = (
			<div className="col-lg-12 text-center py-2 noBusiness">
				<h5>No business created yet!</h5>
			</div>
    );

    const businessComponent = businessList.map(business => (
			<div className="col-lg-3 col-md-6 py-2" key={business.id}>
				<Business
					id={business.id}
					name={business.businessName}
					description={business.businessInfo}
					businessImage={business.businessImage}
					address={business.address}
					location={business.location}
					category={business.category}
					user={authUser.user.username}
				/>
			</div>
    ));

    let image;
    if (authUser.user.profilepic) {
      image = authUser.user.profilepic;
    } else if (authUser.user.sex === 'male') {
      image = maleAvartar;
    } else {
      image = femaleAvartar;
    }

    if (authUser.isLoading) {
      return (
				<div style={{ marginTop: '15%', textAlign: 'center' }}>
					<Spinner />
				</div>
      );
    }

    return (
			<div className="businesses">
        <h5>Welcome {authUser.user.username}</h5>
        <UserProfile
          currentUser={authUser.user}
          image={image}
        />
				<div className="container">
					<div className="row dashboard">
            <div className="row">
              {businessComponent.length === 0 ? noBusiness : businessComponent}
            </div>

						<UpdateProfileForm
							authUser={authUser}
							uploadImage={this.uploadImage}
							formDetails={this.state}
							onChange={this.onChange}
							onSubmit={this.onSubmit}
						/>
					</div>
				</div>
			</div>
    );
  }
}

DashboardPage.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authUser: state.authUser,
  businessList: state.businesses.userBusiness,
  userId: state.authUser.user.id
});

DashboardPage.propTypes = {
  getAUserBusiness: PropTypes.func.isRequired,
  authUser: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  businessList: PropTypes.array,
  uploadImage: PropTypes.func,
  imageUpload: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { imageUpload, getAUserBusiness, updateUser }
)(DashboardPage);
