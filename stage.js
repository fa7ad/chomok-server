const dotenv = require('dotenv')

dotenv.config()
require('@babel/register')
require('./src/server')
