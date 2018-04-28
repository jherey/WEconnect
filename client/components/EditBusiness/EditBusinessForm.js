import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';

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
			errors: ''
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillMount() {
		this.props.fetchBusiness(this.props.id);
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
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
			(data) => this.setState({ errors: data.response.data.message })
		);
	}

	render() {
		const { currentBusiness, isLoading } = this.props;
		const { businessName, email, category, location, address, businessInfo, website, errors } = this.state;

		if (isLoading) { return <Spinner />; }

		return (
			<div className="signin">
				<div className="login-form col-md-4 offset-md-4">
					<h1 className="title">Edit Business</h1>
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
							{errors === 'A business with this name exists!' && <span className='help-block'>{errors}</span>}
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
						</div>
						<div>
							<label htmlFor="exampleInputFile">Company Logo</label>
							<input
								type="file"
								className="form-control-file"
								id="exampleInputFile"
								aria-describedby="fileHelp"
							/>
						</div>
						<div align="center">
							<button
								type="submit"
								className="btn btn-primary btn-lg"
							>
								Update
							</button>
							{
								errors === 'Oops! You cannot update this business' &&
								<div style={{marginTop: '30px'}}>
									<span className='alert alert-danger'>{errors}</span>
								</div>
							}
						</div>
					</form>
				</div>
			</div>
		);
	}
}

EditBusinessForm.contextTypes = {
	router: PropTypes.object.isRequired
}

export default EditBusinessForm;
