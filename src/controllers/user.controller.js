const { User } = require('../models')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {

  async signUp(req, res) {
    try {

      const { body } = req;
      body.password = await bcrypt.hash(body.password, 8);

      const user = await User.create(body)
      console.log(user.name, user.email)

      const token = jwt.sign(
        { username: user.name, email: user.email },
        process.env.SECRET, 
        { expiresIn: 60 * 60 * 24 }
      );
      console.log(token)
      res.status(201).json({token})
    } catch (e) {
      res.status(400).json({ message: e });
    };
  },

  async login(req, res) {
    try {
      const { body } = req;
      console.log(body)
      const user = await User.findAll({ where: {email: body.email} });
      console.log(user)
      await bcrypt.compare(body.password, user[0].dataValues.password)
      
      const token = jwt.sign(
        { username: user[0].dataValues.name, email: user[0].dataValues.email },
        process.env.SECRET, 
        { expiresIn: 60 * 60 * 24 }
      );

      res.status(200).json({token, username: user[0].dataValues.name});
    } catch (e) {
      res.status(400).json({ message: e })
    };
  }, 

  async getLoggedUserInfo(req, res) {
    try {
      const { username, email }  = req;
      
      res.status(200).json({username, email});
    } catch(err) {
      res.status(401).json({ message: 'Invalid Token' })
    };
  },

};
