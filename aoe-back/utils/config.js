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

//POSTHOG
/*
  NODE_ENV:istä kattava -> laita fly:hin prod ja määrittele hogin sen perusteella
*/
/* const HOG_HOST = process.env.NODE_ENV === 'production'
? process.env.REACT_APP_PUBLIC_POSTHOG_HOST
: ''

const HOG_KEY = process.env.NODE_ENV === 'production'
? process.env.REACT_APP_PUBLIC_POSTHOG_KEY
: '' */

console.log("Node env:", process.env.NODE_ENV)

module.exports = {
  MONGODB_URI,
  PORT,
}