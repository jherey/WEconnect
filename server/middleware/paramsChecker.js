const paramsChecker = {
  idChecker: (req, res, next) => {
    const { businessId } = req.params;
    const { userId } = req.params;
    const validId = /^[0-9]+$/;
    if (businessId) {
      if (!businessId.match(validId)) {
        return res.status(400).json({
          message: 'ID can only be a number',
          error: true
        });
      }
    }
    if (userId) {
      if (!userId.match(validId)) {
        return res.status(400).json({
          message: 'ID can only be a number',
          error: true
        });
      }
    }
    return next();
  }
};

export default paramsChecker;
