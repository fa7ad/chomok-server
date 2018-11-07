const path = require('path')
const dotenv = require('dotenv')
const fs = require('fs-extra')

const file = path.resolve(process.cwd(), '.env.local')

if (fs.existsSync(file)) dotenv.config({ path: file })
else dotenv.config()

require('@babel/register')
require('./src/server')
