import express from 'express';
import User from '../models/User.model';
import isEmpty from 'lodash/isEmpty';

const router = express.Router();

router.post('/', (req, res) => {
  const request = req.body;
  if (
    isEmpty(request) ||
    isEmpty(request.nim)
  ) return res.status(400).json({responseCode: '02', responseMessage: 'Request can\'t be null'});
  else return User.findOne({
    nim: request.nim,
  }).exec((err1, user) => {
    if (err1) return res.status(400).json({responseCode: '01', responseMessage: err1});
    else if (isEmpty(user)) return res.status(400).json({responseCode: '02', responseMessage: 'user not found'});
    else User.findOneAndUpdate(
      {nim: user.nim},
      {$set: {visitCount: Number(user.visitCount + 1)}},
      {new: true, setDefaultsOnInsert: true}
    ).exec((err2, response) => {
      if (err2) return res.status(400).json({responseCode: '01', responseMessage: err2});
      else return res.status(200).
        json({
          responseCode: '00',
          responseMessage: 'Success',
          response,
        });
    });
  });
});

router.post('/create', (req, res) => {
  const request = req.body;
  if (
    isEmpty(request) ||
    isEmpty(request.nim) ||
    isEmpty(request.email) ||
    isEmpty(request.password) ||
    isEmpty(request.firstName) ||
    isEmpty(request.lastName) ||
    isEmpty(request.dateOfBirth) ||
    isEmpty(request.profilePict) ||
    isEmpty(request.backgroundPic) ||
    isEmpty(request.isDelete) ||
    isEmpty(request.visitCount)
  ) return res.status(400).json({responseCode: '02', responseMessage: 'Request can\'t be null'});
  else {
    const newUser = new User();
    newUser.nim = request.nim;
    newUser.email = request.email;
    newUser.password = request.password;
    newUser.firstName = request.firstName;
    newUser.lastName = request.lastName;
    newUser.dateOfBirth = request.dateOfBirth;
    newUser.profilePict = request.profilePict;
    newUser.backgroundPic = request.backgroundPic;
    newUser.isDelete = request.isDelete;
    newUser.visitCount = request.visitCount;
    return newUser.save((err, response) => {
      if (err) return res.status(400).json({responseCode: '01', responseMessage: err});
      else return res.status(200).
        json({
          responseCode: '00',
          responseMessage: 'Success',
          response,
        });
    });
  }
});

export default router;
