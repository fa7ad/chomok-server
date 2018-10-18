import fs from 'fs-extra'
import path from 'path'
import sharp from 'sharp'
import multer from 'multer'
import Express, { Router } from 'express'

import { verifyAuthorized, verifyAdmin } from '../lib/middleware'
import { env, HTTPError, findLike } from '../lib/utils'

const dest = path.join(env.cwd, 'uploads')

const up = multer({
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

route.post('/', verifyAuthorized, up.single('file'), async function (
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
      .toFile(original + '.png')

    await fs.unlink(original)
    res.send(env.url + '/images/' + req.file.filename + '.png')
  } catch (err) {
    next(err)
  }
})

route.post('/logo', verifyAdmin, up.single('file'), async function (
  req,
  res,
  next
) {
  try {
    if (!req.file) throw new HTTPError(500, 'Image upload failed')

    const original = path.resolve(req.file.path)
    const logo = path.join(dest, 'logo.png')

    await fs.unlink(logo)
    await sharp(original)
      .resize(100, null, { withoutEnlargement: true })
      .png({ progressive: true })
      .toFile(logo)
    await fs.unlink(original)
    res.send(env.url + '/images/logo.png')
  } catch (err) {
    next(err)
  }
})

route.post('/bg', verifyAdmin, up.single('file'), async function (
  req,
  res,
  next
) {
  try {
    if (!req.file) throw new HTTPError(500, 'Image upload failed')
    const bgs = path.join(dest, 'bg.json')
    const files = await fs.readJSON(bgs)

    const original = path.resolve(req.file.path)
    await sharp(original)
      .resize(1920, null, { withoutEnlargement: true })
      .jpeg({
        progressive: true,
        quality: 95
      })
      .toFile(original + '.jpg')
    await fs.unlink(original)
    files.push({
      id: (new Date() / 1e3) | 0,
      file: original + '.jpg',
      link: env.url + '/images/' + req.file.filename + '.jpg'
    })
    while (files.length > 7) {
      const old = files.shift()
      await fs.unlink(old.file)
    }
    await fs.outputJSON(bgs, files)
    res.json(files)
  } catch (err) {
    next(err)
  }
})

route.post('/bg/:id', verifyAdmin, async function (req, res, next) {
  try {
    const bgs = path.join(dest, 'bg.json')
    const files = await fs.readJSON(bgs)
    const chosen = findLike({ id: +req.params.id }, files)
    if (!chosen) throw new HTTPError(404, 'Image not found')
    await fs.copyFile(chosen.file, path.join(dest, 'bg.jpg'))

    res.json(chosen)
  } catch (err) {
    next(err)
  }
})

route.get('/bg/all', verifyAdmin, async function (req, res, next) {
  try {
    const bgs = path.join(dest, 'bg.json')
    const files = await fs.readJSON(bgs)
    res.json(files)
  } catch (err) {
    next(err)
  }
})

export default route
