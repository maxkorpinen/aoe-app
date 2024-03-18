require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

let PORT = process.env.PORT
if(!PORT) {
  PORT = 3001
}
if (typeof MONGODB_URI == 'undefined') {
  console.log("MONGODB_URI IS UNDEFINED")
}

//POSTHOGTEST
const hogs = process.env.REACT_APP_PUBLIC_POSTHOG_HOST
if(hogs) {
  console.log("Hogs exists, last 3 letters")
  console.log(hogs.slice(-3))
} else {
  console.log("NO HOGS")
}

module.exports = {
  MONGODB_URI,
  PORT
}