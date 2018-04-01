const paramsChecker = {
  idChecker: (req, res, next) => {
    const { businessId } = req.params;
    if (typeof businessId !== 'number' && (businessId % 1) !== 0) {
      return res.status(400).json({
        message: 'ID can only be a number',
        error: true
      });
    }
    return next();
  }
};

export default paramsChecker;
