import business from '../models/business';

/**
 * @class business
 */
class Business {
	/**
 * @returns {Object} getAllBusinesses
 * @param {*} req
 * @param {*} res
 */
	static getAllBusinesses(req, res) {
		return res.json({
			business
		});
	}

	/**
   * @returns {Object} registerBusiness
   * @param {*} req
   * @param {*} res
   */
	static registerBusiness(req, res) {
		const { name, address, website } = req.body;
		if (!name || !address || !website) {
			return res.json({
				message: 'Fill all fields',
				error: true
			});
		}
		business.push(req.body);
		return res.json({
			message: 'Business saved successfully',
			error: false
		});
	}

	/**
   * @returns {Object} updateBusiness
   * @param {*} req
   * @param {*} res
   */
	static updateBusiness(req, res) {
		for (let i = 0; i < business.length; i += 1) {
			if (business[i].id === parseInt(req.params.businessId, 10)) {
				business[i].name = req.body.name;
				business[i].address = req.body.address;
				business[i].website = req.body.website;
				return res.json({
					message: 'Business successfully updated',
					error: false
				});
			}
		}
		return res.status(400).json({
			message: 'Business not found',
			error: true
		});
	}

	/**
   * @returns {Object} removeBusiness
   * @param {*} req
   * @param {*} res
   */
	static removeBusiness(req, res) {
		for (let i = 0; i < business.length; i += 1) {
			if (business[i].id === parseInt(req.params.businessId, 10)) {
				business.splice(business[i], 1);
				return res.json({
					message: 'Business successfully deleted',
					error: false
				});
			}
		}
		return res.status(404).json({
			message: 'Business cannot be deleted because it does not exist',
			error: true
		});
	}

	/**
   * @returns {Object} getABusiness
   * @param {*} req
   * @param {*} res
   */
	static getABusiness(req, res) {
		for (let i = 0; i < business.length; i += 1) {
			if (business[i].id === parseInt(req.params.businessId, 10)) {
				return res.json({
					business: business[business[i].id - 1],
					message: 'Success',
					error: false
				});
			}
		}
		return res.status(404).json({
			message: 'Business not found',
			error: true
		});
	}

	/**
   * @returns {Object} addReview
   * @param {*} req
   * @param {*} res
   */
	static addReview(req, res) {
		const { name, review } = req.body;
		for (let i = 0; i < business.length; i += 1) {
			if (business[i].id === parseInt(req.params.businessId, 10)) {
				business[i].reviews.push(review);
				return res.json({
					message: 'Review successfully added',
					Name: name,
					business: business[i].reviews
				});
			}
		}
		return res.status(404).json({
			message: 'Business does not exist',
			error: true
		});
	}
}

export default Business;
