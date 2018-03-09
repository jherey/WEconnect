import business from '../models/business';

const successMessage = (res, message) => res.status(200).json({
	message,
	error: false
});

const errorMessage = (res, message) => res.status(400).json({
	message,
	error: true
});

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
		business.push(req.body);
		return successMessage(res, 'Registered business successfully');
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
				return successMessage(res, 'Business successfully updated');
			}
		}
		return errorMessage(res, 'Business not found');
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
				return successMessage(res, 'Business successfully deleted');
			}
		}
		return errorMessage(res, 'Business cannot be deleted because it does not exist');
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
		return errorMessage(res, 'Business not found');
	}

	/**
   * @returns {Object} addReview
   * @param {*} req
   * @param {*} res
   */
	static addReview(req, res) {
		const { review } = req.body;
		for (let i = 0; i < business.length; i += 1) {
			if (business[i].id === parseInt(req.params.businessId, 10)) {
				business[i].reviews.push(review);
				return res.json({
					message: 'Review sucessfully added',
					business: business[i].reviews
				});
			}
		}
		return errorMessage(res, 'Review cannot be added to business that does not exist');
	}

	/**
   * @returns {Object} getAllReviews
   * @param {*} req
   * @param {*} res
   */
	static getAllReviews(req, res) {
		for (let i = 0; i < business.length; i += 1) {
			if (business[i].id === parseInt(req.params.businessId, 10)) {
				return res.json({
					Reviews: business[i].reviews
				});
			}
		}
	}
}

export default Business;
