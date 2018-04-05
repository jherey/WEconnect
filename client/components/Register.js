import React, { Component } from 'react';

class Register extends Component {
	render() {
		return (
			<div class="signin">
				<div class="login-form col-md-4 offset-md-4">
					<h1 class="title">Register Business</h1>
					<form>
						<fieldset>
							<label for="firstname">Business Name:<span class="red">*</span></label>
							<input type="text" class="form-control" id="firstname" placeholder="" name="firstname" required />
							<label for="categories">Category<span class="red"> *</span></label>
							<select class="form-control" id="sel1">
								<option>Technology</option>
								<option>Fashion</option>
								<option>Consumer Goods</option>
								<option>Entertainment</option>
							</select>
							<label for="email">Email:<span class="red">*</span></label>
							<input type="email" class="form-control" id="email" placeholder="contact@company.com" name="email" required />
							<label for="exampleInputFile">Company Logo</label>
							<input type="file" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" />
							<label for="bio">Brief Bio:</label>
							<textarea class="form-control" rows="4" id="comment"></textarea>
							<label>Address:</label>
							<input type="text" class="form-control" id="address" placeholder="street address" name="address" required />
							<label>State:</label>
							<input type="text" class="form-control" placeholder="" name="state" required />
							<label>Country:<span class="red">*</span></label>
							<select class="form-control" id="sel1">
								<option>Nigeria</option>
								<option>Uganda</option>
								<option>Kenya</option>
								<option>Ghana</option>
							</select>
						</fieldset>
						<br />
						<div align="center">
							<button type="submit" class="btn btn-primary">Register</button>
						</div>
					</form>
				</div>
			</div >
		);
	}
};

export default Register;
