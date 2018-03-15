import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../models/index';

dotenv.config();
//	Secret key
const secret = process.env.secretKey;
//	Business model
const businesses = models.Business;

/**
 * @class business
 */
class Business {
	/**
   * {Object} registerBusiness
   * @param {*} req
   * @param {*} res
	 * @returns {json} json
   */
	static registerBusiness(req, res) {
		const {
			busname, website, telephone, category, businfo, email, busimage, location
		} = req.body;
		//	Change location and category to lowercase
		const loc = location.toLowerCase();
		const cat = category.toLowerCase();
		//	Verify the user and issue a token
		jwt.verify(req.token, secret, (err, authData) => {
			if (err) {
				//	Wrong token
				res.status(403).json({
					message: 'Token unmatch'
				});
			} else {
				//	Create the business
				businesses
					.create({
						busname,
						website,
						telephone,
						category: cat,
						businfo,
						email,
						busimage,
						location: loc,
						userId: authData.id	//	Get the id of the user from the authData in the token
					})
					//	Success message
					.then(business => res.status(201).json({
						message: 'Business created successfully',
						business,
						authData
					}))
					//	Any errors
					.catch(() => res.status(500).json({
						message: 'Internal server error'
					}));
			}
		});
	}

	/**
   * {Object} updateBusiness
   * @param {*} req
   * @param {*} res
	 * @returns {json} json
   */
	static updateBusiness(req, res) {
		const {
			busname, website, telephone, category, businfo, email, busimage, location
		} = req.body;
		//	Change location and category to lowercase
		const loc = location.toLowerCase();
		const cat = category.toLowerCase();
		const { businessId } = req.params;
		//	Verify the user and issue a token
		jwt.verify(req.token, secret, (err, authData) => {
			if (err) {
				//	Wrong token
				res.status(403).json({
					message: 'Token unmatch'
				});
			} else {
				//	Find the business
				businesses
					.findOne({
						where: {
							id: businessId,
							userId: authData.id
						}
					})
					.then((business) => {
						//	No business found or a different user tries to update the business
						if (!business) {
							return res.status(404).send({
								message: 'You cannot update this business!',
							});
						}
						//	Update the business
						business
							.update({
								busname,
								website,
								telephone,
								category: cat,
								businfo,
								email,
								busimage,
								location: loc
							})
							//	Success message
							.then(updatedBusiness => res.status(200).json({
								message: 'Business Update Successful',
								updatedBusiness,
							}))
							//	Catch any errors
							.catch(() => res.status(400).json({
								message: 'You cant update another person\'s business'
							}));
					});
			}
		});
	}

	/**
   * {Object} removeBusiness
   * @param {*} req
   * @param {*} res
	 * @returns {json} json
   */
	static removeBusiness(req, res) {
		const { businessId } = req.params;
		//	Verify if user is logged in
		jwt.verify(req.token, secret, (err, authData) => {
			//	If there's a mismatch
			if (err) {
				res.status(403).json({
					message: 'Token unmatch'
				});
			} else {
				//	Find the business to be deleted
				businesses
					.findOne({
						where: {
							id: businessId,
							userId: authData.id
						}
					})
					.then((business) => {
						//	If no business is found
						if (!business) {
							//	Error message
							return res.status(404).send({
								message: 'You cannot delete this business!',
							});
						}
						return business
						//	Delete the business
							.destroy()
							//	Success message
							.then(res.status(200).json({
								message: 'Business Successfully Deleted!'
							}))
							//	Catch any errors
							.catch(() => res.status(400).json({
								message: 'You cant delete another person\'s business'
							}));
					});
			}
		});
	}

	/**
   * {Object} getABusiness
   * @param {*} req
   * @param {*} res
	 * @returns {json} json
   */
	static getABusiness(req, res) {
		const { businessId } = req.params;
		businesses
			//	FInd one business by the businessId from the user
			.findById(businessId)
			.then((business) => {
				//	If no business found
				if (!business) {
					return res.status(404).send({
						message: 'Business Not Found!',
					});
				}
				//	Business found!
				return res.status(200).json({
					message: 'Business Found',
					business,
				});
			})
			//	Catch any error
			.catch(() => res.status(500).json({
				message: 'Some error occured',
			}));
	}
}

export default Business;
