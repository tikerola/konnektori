
module.exports = (error, req, res, next) => {

  //console.log(error.message, '*******************')

  if (error.message.includes('User does not exist anymore'))
    return res.status(400).send('Error: user does not exist anymore')

  if (error.message.includes('Unauthorized'))
    return res.status(401).send('Error: unauthorized user!')

  if (error.message.includes('duplicate key'))
    return res.status(409).send('ERROR: duplicate key!')

  if (error.message.includes('invalid token'))
    return res.status(401).send('Error: invalid token!')

  if (error.message.includes('No such username'))
    return res.status(400).send('Error: no such username')

  next(error)
}