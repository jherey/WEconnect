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
}

export default Business;
