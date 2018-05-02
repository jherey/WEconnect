import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { storage } from '../firebase';
import Spinner from '../Spinner';

class NewBusinessForm extends Component {
	constructor() {
		super();
		this.state = {
			businessName: '',
			email: '',
			category: '',
			businessInfo: '',
			address: '',
			location: '',
			businessImage: '',
			website: '',
			errors: ''
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

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
		this.props.createBusiness(this.state).then(
			() => {
				this.props.addFlashMessage({
					type: 'success',
					text: 'Business registered successfully'
				});
				this.context.router.history.push('/');
			},
			(data) => this.setState({ errors: data.response.data.message })
		);
	}

	render() {
		const { businessName, email, category, location, address, businessInfo, website, errors } = this.state;
		const { isLoading, uploadProgress } = this.props;

		if (isLoading) { return <Spinner />; }

		return (
			<div className="signin">
				<div className="login-form col-md-4 offset-md-4">
					<h1 className="title">Register Business</h1>
					<form onSubmit={this.onSubmit}>
						<div>
							<label className='control-label'>Business Name</label>
							<input
								type="text"
								value={businessName}
								onChange={this.onChange}
								className="form-control"
								name="businessName"
							/>
							{errors === 'Business name is required' && <span className='help-block'>{errors}</span>}
						</div>
						<div>
							<label className='control-label'>Description</label>
							<textarea
								className="form-control"
								rows="4"
								name="businessInfo"
								value={businessInfo}
								onChange={this.onChange}
							>
							</textarea>
						</div>
						<div>
							<label className='control-label'>Website</label>
							<input
								type="text"
								className="form-control"
								value={website}
								onChange={this.onChange}
								name="website"
							/>
						</div>
						<div>
							<label className='control-label'>Email</label>
							<input
								type="email"
								className="form-control"
								value={email}
								onChange={this.onChange}
								name="email"
							/>
							{errors === 'Email is required' && <span className='help-block'>{errors}</span>}
						</div>
						<div>
							<label className='control-label'>Category</label>
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
							{errors === 'Category is required' && <span className='help-block'>{errors}</span>}
						</div>
						<div>
							<label className='control-label'>Address</label>
							<input
								type="text"
								className="form-control"
								value={address}
								onChange={this.onChange}
								name="address"
							/>
						</div>
						<div>
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
							{errors === 'Location is required' && <span className='help-block'>{errors}</span>}
						</div>
						<div>
							<label className='control-label'>Company Logo</label>
							<input
								type="file"
								onChange={this.fileChange.bind(this)}
							/>
							<progress value={uploadProgress} max="100" />
						</div>
						<div align="center">
							<button
								type="submit"
								className="btn btn-orange btn-lg"
							>
								Register
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
};

NewBusinessForm.contextTypes = {
	router: PropTypes.object.isRequired
}

export default NewBusinessForm;
