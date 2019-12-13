

module.exports = (req, res, next) => {

  const auth = req.headers.authorization ? req.headers.authorization : null

  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    const token = auth.substring(7)
    req.token = token
  }
  else
    req.token = null

  next()
}