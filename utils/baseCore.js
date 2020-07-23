function resMsg(res, code, status, msg, data) {
  res.status(code).json({
    response_status: status,
    response_message: msg,
    response_data: data,
  })
}

module.exports = { resMsg }
