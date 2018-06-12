import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { storage } from '../firebase';
import Spinner from '../Spinner/index.jsx';

class EditBusinessForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.currentBusiness.id,
			businessName: this.props.currentBusiness.businessName,
			email: this.props.currentBusiness.email,
			category: this.props.currentBusiness.category,
			businessInfo: this.props.currentBusiness.businessInfo,
			address: this.props.currentBusiness.address,
			location: this.props.currentBusiness.location,
			website: this.props.currentBusiness.website,
			businessImage: this.props.currentBusiness.businessImage,
			errors: []
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	// componentWillMount() {
	// 	this.props.fetchBusiness(this.props.id);
	// }

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	fileChange(e) {
		this.setState({ businessImage: '' });
		const uploadTask = storage.child(`businessimage/${new Date().getTime()}`)
			.put(e.target.files[0]);
		uploadTask.on('state_changed', snapshot => {
			const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
			this.props.setProgress(progress);
		}, error => {
			this.setState({ errors: err.message })
		}, () => {
			this.setState({ businessImage: uploadTask.snapshot.downloadURL });
		});
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ errors: '' });
		this.props.updateBusiness(this.state).then(
			() => {
				this.props.addFlashMessage({
					type: 'success',
					text: 'Business updated successfully'
				});
				this.context.router.history.push(`/${this.props.currentBusiness.id}`);
			},
			(err) => {
				this.props.loading(false);
				this.setState({ error: err.response.data.errors });
				if (this.state.error) {
					this.state.error.map(err => {
						this.props.addFlashMessage({
							type: 'error',
							text: err
						});
					})
				}
			}
		);
	}

	render() {
		const { currentBusiness, isLoading, uploadProgress } = this.props;
		const { businessName, email, category, location, address, businessInfo, website, errors } = this.state;

		if (isLoading) { return <Spinner />; }

		return (
			<div className="form-signup">
				<div className="signup-form container py-5">
					<h1 className="text-center" style={{'color': 'white'}}>Edit Business Details</h1>
					<div className="row">
						<div className="col-md-10 mx-auto">
							{errors === 'Username already exists' && <div className='alert alert-danger'>{errors}</div>}
							{errors === 'Email address taken' && <div className='alert alert-danger'>{errors}</div>}
							<form onSubmit={this.onSubmit}>
								<div className="form-group row">
									<div className="col-sm-6">
										<label>Business Name</label>
										<input
											type="text"
											value={businessName}
											onChange={this.onChange}
											className="form-control"
											name="businessName"
										/>
										{errors === 'Business name is required' && <div className='alert alert-danger'>{errors}</div>}
										{errors === 'A business with this name exist' && <div className='alert alert-danger'>{errors}</div>}
									</div>
									<div className="col-sm-6">
										<label>Description</label>
						 				<textarea
											className="form-control"
											rows="3"
											name="businessInfo"
											value={businessInfo}
											onChange={this.onChange}
										>
										</textarea>
									</div>
								</div>
								<div className="form-group row">
									<div className="col-sm-6">
										<label>Website</label>
										<input
											type="text"
											className="form-control"
											value={website}
											onChange={this.onChange}
											name="website"
										/>
									</div>
									<div className="col-sm-6">
										<label>Email</label>
						 				<input
											type="email"
											className="form-control"
											value={email}
											onChange={this.onChange}
											name="email"
										/>
										{errors === 'Email is required' && <div className='alert alert-danger'>{errors}</div>}
									</div>
								</div>
								<div className="form-group row">
									<div className="col-sm-6">
										<label>Category</label>
						 				<select
											className="form-control"
											name='category'
											onChange={this.onChange}
											value={category}
										>
											<option value='' disabled>Select category</option>
											<option value='technology'>Technology</option>
											<option value='news'>News</option>
											<option value='fashion'>Fashion</option>
											<option value='transport'>Transport</option>
											<option value='entertainment'>Entertainment</option>
											<option value='others'>Others</option>
										</select>
										{errors === 'Category is required' && <div className='alert alert-danger'>{errors}</div>}
									</div>
									<div className="col-sm-6">
										<label className='control-label'>Address</label>
						 				<input
											type="text"
											className="form-control"
											value={address}
											onChange={this.onChange}
											name="address"
										/>
									</div>
								</div>
								<div className="form-group row">
									<div className="col-sm-6">
										<label className='control-label'>Country</label>
						 				<select
											className="form-control"
											name='location'
											onChange={this.onChange}
											value={location}
										>
											<option value='' disabled>Choose your country</option>
											<option value='nigeria'>Nigeria</option>
											<option value='uganda'>Uganda</option>
											<option value='kenya'>Kenya</option>
											<option value='ghana'>Ghana</option>
										</select>
										{errors === 'Location is required' && <div className='alert alert-danger'>{errors}</div>}
									</div>
									<div className="col-sm-6">
										<label className='control-label'>Company Logo</label>
										<input
											type="file"
											onChange={this.fileChange.bind(this)}
										/>
										<progress value={uploadProgress} max="100" />
									</div>
								</div>
								<button
									id="submitButton"
									disabled={isLoading}
									className="btn btn-orange btn-lg"
								>
									Update
								</button>
								{
									errors === 'Oops! You cannot update this business' &&
									<div style={{marginTop: '30px'}}>
										<span className='alert alert-danger'>{errors}</span>
									</div>
								}
							</form>
						</div>
					</div>
				</div>
			</div>
			// <div className="signin">
			// 	<div className="login-form col-md-4 offset-md-4">
			// 		<h1 className="title">Edit Business</h1>
			// 		<form onSubmit={this.onSubmit}>
			// 			<div>
			// 				<label className='control-label'>Business Name</label>
			// 				<input
			// 					type="text"
			// 					value={businessName}
			// 					onChange={this.onChange}
			// 					className="form-control"
			// 					name="businessName"
			// 				/>
			// 				{errors === 'Business name is required' && <div className='alert alert-danger'>{errors}</div>}
			// 				{errors === 'A business with this name exists!' && <div className='alert alert-danger'>{errors}</div>}
			// 			</div>
			// 			<div>
			// 				<label className='control-label'>Description</label>
			// 				<textarea
			// 					className="form-control"
			// 					rows="4"
			// 					name="businessInfo"
			// 					value={businessInfo}
			// 					onChange={this.onChange}
			// 				>
			// 				</textarea>
			// 			</div>
			// 			<div>
			// 				<label className='control-label'>Website</label>
			// 				<input
			// 					type="text"
			// 					className="form-control"
			// 					value={website}
			// 					onChange={this.onChange}
			// 					name="website"
			// 				/>
			// 			</div>
			// 			<div>
			// 				<label className='control-label'>Email</label>
			// 				<input
			// 					type="email"
			// 					className="form-control"
			// 					value={email}
			// 					onChange={this.onChange}
			// 					name="email"
			// 				/>
			// 				{errors === 'Email is required' && <div className='alert alert-danger'>{errors}</div>}
			// 			</div>
			// 			<div>
			// 				<label className='control-label'>Category</label>
			// 				<select
			// 					className="form-control"
			// 					name='category'
			// 					onChange={this.onChange}
			// 					value={category}
			// 				>
			// 					<option value='' disabled>Select category</option>
			// 					<option value='technology'>Technology</option>
			// 					<option value='news'>News</option>
			// 					<option value='fashion'>Fashion</option>
			// 					<option value='transport'>Transport</option>
			// 					<option value='entertainment'>Entertainment</option>
			// 					<option value='others'>Others</option>
			// 				</select>
			// 				{errors === 'Category is required' && <div className='alert alert-danger'>{errors}</div>}
			// 			</div>
			// 			<div>
			// 				<label className='control-label'>Address</label>
			// 				<input
			// 					type="text"
			// 					className="form-control"
			// 					value={address}
			// 					onChange={this.onChange}
			// 					name="address"
			// 				/>
			// 			</div>
			// 			<div>
			// 				<label className='control-label'>Country</label>
			// 				<select
			// 					className="form-control"
			// 					name='location'
			// 					onChange={this.onChange}
			// 					value={location}
			// 				>
			// 					<option value='' disabled>Choose your country</option>
			// 					<option value='nigeria'>Nigeria</option>
			// 					<option value='uganda'>Uganda</option>
			// 					<option value='kenya'>Kenya</option>
			// 					<option value='ghana'>Ghana</option>
			// 				</select>
			// 				{errors === 'Location is required' && <div className='alert alert-danger'>{errors}</div>}
			// 			</div>
			// 			<div>
			// 				<label htmlFor="exampleInputFile">Company Logo</label>
			// 				<input
			// 					type="file"
			// 					onChange={this.fileChange.bind(this)}
			// 				/>
			// 				<progress value={uploadProgress} max="100" />
			// 			</div>
			// 			<div align="center">
			// 				<button
			// 					type="submit"
			// 					className="btn btn-primary btn-lg"
			// 				>
			// 					Update
			// 				</button>
			// 				{
			// 					errors === 'Oops! You cannot update this business' &&
			// 					<div style={{marginTop: '30px'}}>
			// 						<span className='alert alert-danger'>{errors}</span>
			// 					</div>
			// 				}
			// 			</div>
			// 		</form>
			// 	</div>
			// </div>
		);
	}
}

EditBusinessForm.contextTypes = {
	router: PropTypes.object.isRequired
}

export default EditBusinessForm;
