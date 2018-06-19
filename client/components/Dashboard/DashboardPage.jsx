import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import Business from '../Home/Business.jsx';
import Spinner from '../Spinner/index.jsx';
import { storage } from '../firebase';
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
      id: this.props.userId,
      firstname: '',
      lastname: '',
      username: '',
      sex: '',
      email: '',
      profilepic: '',
      errors: '',
      uploading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @return {null} null
   * @param {object} nextProps
   * @memberof Recipe
   */
  componentWillReceiveProps(nextProps) {
    const {
      firstname, lastname, username, sex, email, profilepic
    } = nextProps.currentUser;
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
* @memberof BusinessProfilePage
*/
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
*
* @returns {null} null
* @param {event} event
* @memberof BusinessProfilePage
*/
  fileChange(event) {
    this.setState({
      profilepic: '',
      uploading: true
    });
    const uploadTask = storage.child(`userimage/${new Date().getTime()}`)
      .put(event.target.files[0]);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.props.setProgress(progress);
    }, (error) => {
      this.setState({ errors: error.message });
    }, () => {
      this.setState({
        profilepic: uploadTask.snapshot.downloadURL,
        uploading: false
      });
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
    this.setState({ errors: '' });
    document.getElementById('hidePopUpBtn').click();
    this.props.updateUser(this.state)
      .then(
        () => {
          this.props.setProgress(0);
          this.props.addFlashMessage({
            type: 'success',
            text: 'Update successful!'
          });
          this.context.router.history.push('/dashboard');
        },
        (err) => {
          this.props.loading(false);
          this.setState({ errors: err.response.data.message });
        }
      );
  }

  /**
   * @memberof DashboardPage
   * @return {ReactElement} markup
   */
  render() {
    const {
      firstname, lastname, username, email, sex, uploading
    } = this.state;
    const { isLoading, currentUser, uploadProgress } = this.props;

    const noBusiness = (
			<div className="col-lg-3 col-md-6 py-2">
				<h5>You do not own a business</h5>
			</div>
    );

    const businessComponent = this.props.businessList.map(business => (
				<div className="col-lg-4 col-md-6 py-2" key={business.id}>
					<Business
						id={business.id}
						name={business.businessName}
						description={business.businessInfo}
						businessImage={business.businessImage}
						address={business.address}
						location={business.location}
						category={business.category}
						user={currentUser.username}
					/>
				</div>
    ));

    let image;
    if (this.props.currentUser.profilepic) {
      image = currentUser.profilepic;
    } else if (this.props.currentUser.sex === 'male') {
      image = maleAvartar;
    } else {
      image = femaleAvartar;
    }

    if (isLoading) {
      return (
				<div style={{ marginTop: '15%', textAlign: 'center' }}>
					<Spinner />
				</div>
      );
    }

    return (
			<div className="businesses">
			<h5>Welcome {currentUser.username}</h5>
				<div className="container list">
					<div className="row">
						<div className="col-lg-3 col-md-6">
							<div className="row userImage">
								<img
									className="mt-2 user"
									src={image}
									alt="UserImage"
									border-radius= '50%'
									style={{ width: '200px', height: '200px' }}
								/>
							</div><br />
							<div className="text-center">
								<p>Joined {moment(currentUser.createdAt).format('Do MMMM YYYY')}</p>
								<Link className="btn btn-primary" to="/register">Register a Business</Link> <br /><br />
								<button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
									Edit User Details
								</button>
							</div>
						</div>
						<div className="col-lg-9">
							<div className="row">
								{businessComponent.length === 0 ? noBusiness : businessComponent}
							</div>
						</div>

						<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
							<div className="modal-dialog" role="document">
								<div className="modal-content userDetails">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalLabel">Edit User Profile</h5>
										<button id="hidePopUpBtn" type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<form onSubmit={this.onSubmit}>
										<div className="form-group row">
											<div className="col-sm-6">
												<label>First Name</label>
												<input
													value={firstname}
													onChange={this.onChange}
													type="text"
													name="firstname"
													className="form-control"
												/>
											</div>
											<div className="col-sm-6">
												<label>Last Name</label>
												<input
													value={lastname}
													onChange={this.onChange}
													type="text"
													name="lastname"
													className="form-control"
												/>
											</div>
										</div>
										<div className="form-group row">
											<div className="col-sm-6">
											<label className='control-label'>Username</label>
											<input
												value={username}
												onChange={this.onChange}
												type="text"
												name="username"
												className="form-control"
											/>
											</div>
											<div className="col-sm-6">
												<label className='control-label'>Email</label>
												<input
													value={email}
													onChange={this.onChange}
													type="email"
													name="email"
													className="form-control"
												/>
											</div>
										</div>
										<div className="form-group row">
											<div className="col-sm-6">
											<label className='control-label'>Sex</label>
											<select
												className='form-control'
												name='sex'
												onChange={this.onChange}
												value={sex}
											>
												<option value='' disabled>Choose</option>
												<option value='male'>Male</option>
												<option value='female'>Female</option>
											</select>
											</div>
											<div className="col-sm-6">
											<label className='control-label'>Profile Picture</label><br/>
											<input
												type="file"
												onChange={this.fileChange.bind(this)}
											/>
											<progress value={uploadProgress} max="100" />
											</div>
										</div>
										<button
											id="updateButton"
											disabled={uploading}
											className="btn btn-orange btn-lg"
										>
											Update Details
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
    );
  }
}

DashboardPage.contextTypes = {
  router: PropTypes.object.isRequired
};

DashboardPage.propTypes = {
  userId: PropTypes.number,
  setProgress: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  uploadProgress: PropTypes.number,
  currentUser: PropTypes.object.isRequired,
  businessList: PropTypes.array
};

export default DashboardPage;
