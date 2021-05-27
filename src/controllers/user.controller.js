const { User } = require('../models')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {

  async list(req, res) {
    const users = await User.findAll()
    res.status(200).json(users)
  },

  async signUp(req, res) {
    try {

      const { body } = req;
      body.password = await bcrypt.hash(body.password, 8);
      /* freezeTableName: true,
      instanceMethods: {
        generateHash(password) {
          return bcrypt.hash(password, 8);
        },
        validPassword(password) {
          return bcrypt.compare(password, this.password);
        },
      }, */
      console.log(body.password)
      const user = await User.create(body)

      const token = jwt.sign(
        { username: user.name, email: user.email },
        process.env.SECRET, 
        { expiresIn: 60 * 60 * 24 }
      );
      res.status(201).json({token, user})
    } catch (e) {
      res.status(400).json({ message: e });
    };
  },

  async login(req, res) {
    try {
      const { body } = req;
      const user = await User.findAll({ where: {email: body.email} })
      await bcrypt.compare(body.password, user[0].dataValues.password)
      
      const token = jwt.sign(
        { username: user.name, email: user.email },
        process.env.SECRET, 
        { expiresIn: 60 * 60 * 24 }
      );

      res.status(201).json({token});
    } catch (e) {
      res.status(400).json({ message: e })
    };
  }, 

  

  async update(req, res) {
    const { body, params: { userId } } = req
    let user = await User.findByPk(userId)
    user = await user.update(body)
    res.status(200).json(user)
  },

  async destroy(req, res) {
    const { userId } = req.params
    const user = await User.findByPk(userId)
    await user.destroy()
    res.status(200).json(user)
  },

}