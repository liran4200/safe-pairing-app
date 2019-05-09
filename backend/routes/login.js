const multiplyLocalHost = require('../middleware/multiplyLocalHost');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

router.use(multiplyLocalHost);

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });
    if(!user) 
        return res.status(404).send('User not exists');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword)
        return res.status(400).send('Invalid email or password');

    if(!user.isActive)
        return res.status(401).send('Access denied, User not active');
    const token = user.generateAuthToken();
    res.status(200).send({token:token});
});

function validate(user) {
    const schema = {
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required()
    };
    return Joi.validate(user, schema);
}

module.exports = router;
