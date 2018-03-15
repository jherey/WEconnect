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
   * @returns {Object} registerBusiness
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
}

export default Business;
