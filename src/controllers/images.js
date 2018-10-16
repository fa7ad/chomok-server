import fs from 'fs-extra'
import path from 'path'
import sharp from 'sharp'
import multer from 'multer'
import Express, { Router } from 'express'

import { verifyAuthorized } from '../lib/middleware'
import { env, HTTPError } from '../lib/utils'

const dest = path.join(env.cwd, 'uploads')

const upload = multer({
  dest,
  fileFilter: function (req, file, cb) {
    if (!/^image/.test(file.mimetype)) {
      return cb(new Error('Invalid file type'), false)
    }
    cb(null, /^image\/(jpeg|png)$/.test(file.mimetype))
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

    const original = path.resolve(req.file.path)
    await sharp(original)
      .resize(1280, null, { withoutEnlargement: true })
      .png({
        progressive: true,
        compressionLevel: 9
      })
      .toFile(req.file.path + '.png')
    await fs.unlink(original)
    res.send(env.url + '/images/' + req.file.filename + '.png')
  } catch (err) {
    next(err)
  }
})

export default route
