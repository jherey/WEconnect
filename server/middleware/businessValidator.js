import jwt from 'jsonwebtoken';
import models from '../models/index';

//	Secret key
const secret = process.env.secretKey;
//	Users model
const users = models.User;
//	Business model
const businesses = models.Business;

const validateBusinesses = {
	query: (req, res, next) => {
		const { location, category } = req.query;
		if (location || category) {
			//	If there's a location query string
			if (location) {
				businesses
					//	Find by location
					.findAll({
						where: {
							location: { $iLike: `%${location}%` }
						}
					})
					.then((business) => {
						//	If no businesses found, return error
						if (business.length < 1) {
							return res.status(404).json({
								message: 'No business found for this location!',
							});
						}
						//	If business found, return business found
						return res.status(200).json({
							message: 'Business Found!',
							business
						});
					});
			}
			if (category) {
				businesses
					//	Find by category
					.findAll({
						where: {
							category: { $iLike: `%${category}%` }
						}
					})
					.then((business) => {
						//	If no businesses found, return error
						if (business.length < 1) {
							return res.status(404).json({
								message: 'No business found for this category!',
							});
						}
						//	If business found, return business found
						return res.status(200).json({
							message: 'Business Found!',
							business
						});
					});
			}
		} else if (!location || !category) {
			return next();
		}
	},

	registerBusiness: (req, res, next) => {
		req.check('busname', 'Business name is required').notEmpty();
		req.check('category', 'Category is required').notEmpty();
		req.check('location', 'Location is required').notEmpty();

		const errors = req.validationErrors();
		if (errors) {
			return res.status(400).json({
				message: errors[0],
				error: true
			});
		}

		next();
	},

	verifyToken: (req, res, next) => {
		// Get auth header value
		const bearerHeader = req.headers.authorization;
		// // Check if bearer is undefined
		// if (typeof bearerHeader !== 'undefined') {
		// 	req.token = bearerHeader;
		// 	return next();
		// }
		if (!bearerHeader) {
			// Forbidden
			return res.status(403).json({
				message: 'Add token to header',
				error: true
			});
		}
		req.token = bearerHeader;
		jwt.verify(req.token, secret, (err, authData) => {
			if (err) {
				//	Wrong token
				return res.status(403).json({
					message: 'Token unmatch'
				});
			}
			req.authData = authData;
			users
				.findOne({
					where: {
						id: authData.id
					}
				})
				.then((user) => {
					if (!user) {
						return res.status(404).send({
							message: 'Cannot update business!',
						});
					}
					return next();
				});
		});
	}
};

export default validateBusinesses;
