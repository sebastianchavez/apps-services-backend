const jwt = require('jwt-simple')
const moment = require('moment')

const createToken = (user) => {
  const payload = {
    sub: {
      _id: user._id,
      email: user.email
    },
    iat: moment().unix(),
    exp: moment().add(2, 'years').unix()
  }

  return jwt.encode(payload, 'miclavesecretatokengestiondeproyectos')
}

const decodeToken = (token) => {
  const decode = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, 'miclavesecretatokengestiondeproyectos')
      if (payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: 'El Token ha expirado',
          cod: 0
        })
      }
      resolve({ payload: payload.sub, cod: 1 })
    } catch (err) {
      reject({
        status: 500,
        message: err.message,
        cod: 0
      })
    }
  })
  return decode
}

module.exports = {
  createToken,
  decodeToken
}
