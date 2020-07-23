const _baseCore = require('../utils/baseCore')

module.exports.errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  _baseCore.resMsg(res, statusCode, 'fail', err.message, err)
}
