const app = require('./app')
const config = require('./utils/config')

app.listen(config.PORT, () => {
  console.log(`AOE server running on port ${config.PORT}`)
})