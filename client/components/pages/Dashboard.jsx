import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Business from '../common/Business.jsx';
import UserProfile from '../pages/UserProfile.jsx';
import UpdateProfileForm from '../forms/UpdateProfileForm.jsx';
import Spinner from '../common/Spinner.jsx';
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
    const { user } = this.props.authUser;
    // Dashboard page initial state
    this.state = {
      id: user.id,
      firstname: '',
      lastname: '',
      username: '',
      sex: '',
      email: '',
      profilepic: '',
      errors: [],
      uploading: false
    };
    // Binding functions
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
    const { authUser, getAUserBusinessAction } = this.props;
    getAUserBusinessAction(authUser.user.id);
  }

  /**
   * @return {null} new state
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
    // Sets state of input fields to inputed values
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof Dashboard
*/
  uploadImage(event) {
    this.setState({ profilepic: '', uploading: true });
    const image = event.target.files[0];
    const { imageUploadAction } = this.props;
    // Action to upload an image
    imageUploadAction(image).then(() => {
      const { authUser } = this.props;
      if (authUser.imageUploadError === '') {
        this.setState({ uploading: false, profilepic: authUser.imageUrl });
      } else {
        this.setState({ uploading: false });
        toastr.error('Image upload failed, try again!');
      }
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
    const { updateUserAction } = this.props;
    updateUserAction(this.state);
  }

  /**
   * @memberof DashboardPage
   * @return {ReactElement} markup
   */
  render() {
    // Destructure props
    const { businessList, authUser } = this.props;

    const noBusiness = (
			<div className="text-center py-2 noBusiness" id="no-business">
				<h3>No business created yet!</h3>
			</div>
    );

    // Loop through businesses
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

    // If page is loading, show spinner loader
    if (authUser.isLoading) {
      return (
				<div style={{ marginTop: '15%', textAlign: 'center' }}>
					<Spinner />
				</div>
      );
    }

    return (
			<div className="businesses">
        {/* User profile component */}
        <UserProfile
          currentUser={authUser.user}
          image={image}
        />
				<div className="container">
					<div className="dashboard">
            <div className="row">
              {/* Display businesses */}
              {businessComponent.length === 0 ? noBusiness : businessComponent}
            </div>

            {/* Form to update user profile */}
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

const mapStateToProps = state => ({
  authUser: state.authUser,
  businessList: state.businesses.userBusiness,
  userId: state.authUser.user.id
});

DashboardPage.propTypes = {
  getAUserBusinessAction: PropTypes.func.isRequired,
  authUser: PropTypes.object.isRequired,
  updateUserAction: PropTypes.func.isRequired,
  businessList: PropTypes.array,
  uploadImage: PropTypes.func,
  imageUploadAction: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  imageUploadAction: imageUpload,
  getAUserBusinessAction: getAUserBusiness,
  updateUserAction: updateUser
})(DashboardPage);
