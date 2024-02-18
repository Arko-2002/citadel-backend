import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';

export const signup = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    //Find the user in db
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) return res.status(404).send('User not found');

    //Check Password
    const passCheck = bcrypt.compareSync(req.body.password, user.password);
    if (!passCheck) return res.status(404).send('Wrong Password');

    const token = jwt.sign(
      {
        id: user._id,
      },
      '123'
    );

    //Verified login send data
    const { password, ...info } = user._doc;
    res
      .cookie('accessToken', token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    next(err);
  }
};
export const logout = async (req, res) => {
  try {
    res
      .clearCookie('accessToken', {
        sameSite: 'none',
        secure: true,
      })
      .status(200)
      .send('User has been logged out.');
  } catch (err) {}
};
