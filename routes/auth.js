const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator');
const User = require('../models/User')
const auth = require('../middleware/auth')
const router = express.Router()

// @route GET api/auth
// @desc Get logged in user
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.log('err: ', err.message);
    return res.status(500).json({ msg: 'server error' });
  }
})

// @route POST api/auth
// @desc Auth user & get token
// @access Public
router.post('/', [
  check('email', 'Please enter a valid email')
  .isEmail(),
  check('password', 'Please enter 6 or more chars')
  .isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const {email, password} = req.body

  try {
    let user = await User.findOne({email})
    if(!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 360000,
    }, (err, token) => {
      if(err) throw err
      res.json({ token })
    })
  } catch (err) {
    return res.send({msg: err})
  }
})

module.exports = router