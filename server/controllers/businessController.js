import business from '../models/business';

/**
 * @class business
 */
class Business {
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
}

export default Business;
