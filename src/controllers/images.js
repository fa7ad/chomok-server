import path from 'path'
import sharp from 'sharp'
import multer from 'multer'
import Express, { Router } from 'express'

import { verifyAuthorized } from '../lib/middleware'
import { env, HTTPError } from '../lib/utils'

const dest = path.join(env.cwd, 'uploads')

const upload = multer({
  dest,
  fileFilter (req, file, cb) {
    if (!/^image/.test(file.mimetype)) cb(new Error('Invalid file type'), false)
    else {
      cb(
        null,
        /^image\/(jpeg|png)$/.test(file.mimetype) &&
          file.size <= 5.1 * 1024 * 1024
      )
    }
  }
})
const route = Router()

route.use(Express.static(dest))
route.post('/', verifyAuthorized, upload.single('file'), async function (
  req,
  res,
  next
) {
  try {
    if (!req.file) throw new HTTPError(500, 'Image upload failed')
    await sharp(path.resolve(req.file.path))
      .resize(800, 800)
      .png({
        progressive: true,
        compressionLevel: 9
      })
      .toFile(req.file.path + '.png')
    res.send(req.file.filename + '.png')
  } catch (err) {
    next(err)
  }
})

export default route
