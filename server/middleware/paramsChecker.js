const paramsChecker = {
  idChecker: (req, res, next) => {
    const { businessId } = req.params;
    const validId = /^[0-9]+$/;
    if (!businessId.match(validId)) {
      return res.status(400).json({
        message: 'ID can only be a number',
        error: true
      });
    }
    return next();
  }
};

export default paramsChecker;
