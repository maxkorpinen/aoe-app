require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

let PORT = process.env.PORT

if (typeof MONGODB_URI == undefined) {
  console.log("MONGODB_URI IS UNDEFINED")
}

module.exports = {
  MONGODB_URI,
  PORT
}