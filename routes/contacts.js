const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth')
const User = require('../models/User')
const Contact = require('../models/Contact')

// @route GET api/contacts
// @desc Get all users contacts
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({user: req.user.id}).sort({date: -1})
    res.json(contacts)
    return res.status(500).send('server error');

  } catch (err) {
    console.log('error: ', err.message);
  }
  return res.send('Get all contacts')
})

// @route POST api/contacts
// @desc Add new contact
// @access Private

router.post('/', [auth, [
  check('name', 'Please add name')
    .not()
    .isEmpty(),
  check('email', 'Please enter a valid email')
  .isEmail(),
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const {name, email, type, phone} = req.body
  try {
    const newContact = new Contact({
      name,
      email,
      type,
      phone,
      user: req.user.id
    })

    console.log('contact: ', newContact);
    await newContact.save()
    res.json(newContact)
  } catch (err) {
    console.log('err: ', err.message);
    return res.status(500).json({ msg: 'server error' });
  }
})

// @route PUT api/contacts
// @desc Update contact
// @access Private

router.put('/:id', auth, async (req, res) => {
  const {name, email, phone, type} = req.body;

  // Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id)
    console.log('contact: ', contact);
    if(!contact) return res.status(404).json({msg: 'Not found'})
    if(contact.user.toString() !== req.user.id) return res.status(404).json({msg: 'Not authorised'})
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {$set: contactFields},
      {new: true},
    );

    res.json(contact);
  } catch (err) {
    console.log('err: ', err.message);
    return res.status(500).json({ msg: 'server error' });
  }
  return res.send('Update contact')
})

// @route DELETE api/contacts
// @desc Delete contact
// @access Private

router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id)
    if(!contact) return res.status(404).json({msg: 'Not found'})
    if(contact.user.toString() !== req.user.id) return res.status(404).json({msg: 'Not authorised'})
    await Contact.findByIdAndRemove(req.params.id);
    res.json({msg: 'contact removed'});
  } catch (err) {
    console.log('err: ', err.message);
    return res.status(500).json({ msg: 'server error' });
  }
})

module.exports = router