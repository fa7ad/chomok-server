const path = require('path')
const dotenv = require('dotenv')

try {
  dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
} catch (e) {
  dotenv.config()
}
require('@babel/register')
require('./src/server')
