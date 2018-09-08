const Joi = require('joi')
const bcrypt = require('bcrypt')
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const { DateTime } = require('luxon')
const { ensureLoggedIn } = require('connect-ensure-login')

module.exports = function (app, db) {
  passport.use(
    new LocalStrategy(async function (username, password, done) {
      try {
        const { docs } = await db.find({
          selector: { username },
          use_index: 'users-username-idx'
        })
        const [user] = docs

        if (!user) return done(null, false, { message: 'Incorrect username' })

        const correct = await bcrypt.compare(password, user.password)
        if (!correct) {
          return done(null, false, { message: 'Incorrect password' })
        }

        return done(null, user)
      } catch (err) {
        return done(err)
      }
    })
  )

  passport.serializeUser(function (user, done) {
    done(null, user._id)
  })

  passport.deserializeUser(function (id, done) {
    db.get(id, done)
  })

  app.post(
    '/auth/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/auth/login'
    })
  )

  app.post(
    '/auth/register',
    async function regUser (req, res, next) {
      try {
        const schema = Joi.object().keys({
          name: Joi.string()
            .alphanum()
            .min(3)
            .required(),
          phone: Joi.string()
            .regex(/^(\+88|0088)?01[5-9]\d{8}$/)
            .required(),
          email: Joi.string()
            .email()
            .required(),
          username: Joi.string()
            .lowercase()
            .regex(/^[a-z][^\s]{4,}$/)
            .required(),
          password: Joi.string()
            .required()
            .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
            .required(),
          dateReg: Joi.string()
            .regex(/^(\d{6}|\d{8})$/)
            .default(() => DateTime.local().toFormat('yyyyLLdd')),
          admin: Joi.boolean().default(false),
          business: Joi.object()
            .keys({
              address: Joi.string(),
              name: Joi.string(),
              phone: Joi.string().regex(/^(\+88|0088)?0(1[5-9]|2)\d{8}$/)
            })
            .requiredKeys(['address', 'name', 'phone'])
        })

        const data = await schema.validate(req.body)
        const { docs: users } = await db.find({
          selector: { username: data.username }
        })
        if (users.length > 0) {
          return res.status(409).json({
            ok: false,
            error: {
              message: 'Username already exists'
            }
          })
        }

        if (data.admin || data.business) {
          req.body = { ...data }
          req.requireAdmin = true
          return ensureLoggedIn({ failureRedirect: '/' })(req, res, next)
        }
        next()
      } catch (err) {
        let error = err
        if (error.isJoi) error = { message: error.details.map(e => e.message) }
        res.status(400).json({ ok: false, error })
      }
    },
    function verifyAdmin (req, res, next) {
      if (req.requireAdmin && req.user && !req.user.admin) {
        return res.sendStatus(403)
      }
      next()
    },
    function (req, res) {
      db.post({ ...req.body })
        .then(_ => {
          if (!req.user) req.login()
          res.json({ ok: true })
        })
        .catch(_ => {
          res.status(500).json({
            ok: false,
            error: { message: 'Internal server error' }
          })
        })
    }
  )
}
