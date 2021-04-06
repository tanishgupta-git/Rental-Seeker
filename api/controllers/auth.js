const User = require('../models/user');
const Host = require('../models/host');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator/check');

// function for user signup
exports.userSignup = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed,entered data is incorrect');
        error.statusCode = 422;
        return next(error);
    }
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    try {
        const hashedPw = await bcrypt.hash(password, 12);
        const user = new  User({
            username:username,
            email:email,
            password:hashedPw
        })
       await user.save();
       res.status(200).json({
           message:"User Signup Successfully"
       })
    }catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
}

// function for user login
exports.userLogin = async (req,res,next) => {
 const username = req.body.username;
 const password = req.body.password;
 let loadedUser;
 try {
 const user = await User.findOne({username:username});
 if (!user) {
     const error = new Error('No user found.');
     error.statusCode = 422;
     return next(error);
 }
 loadedUser = user;
 const isEqual = await bcrypt.compare(password, user.password);
 if (!isEqual) {
   const error = new Error('Wrong password!');
   error.statusCode = 401;
   return next(error);
 }
 const token = jwt.sign(
   {
     email: loadedUser.email,
     userId: loadedUser._id.toString()
   },
   'somesupersecretsecret',
   { expiresIn: '1h' }
 );

 res.status(200).json({ token: token, userId: loadedUser._id.toString(),typeOfuser:"User"});
 } catch (err) {
    if(! err.statusCode) {
        err.statusCode = 500
    }
     next(err);
   }
}

// function for host singup
exports.hostSignup = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed,entered data is incorrect');
        error.statusCode = 422;
        return next(error);
    }
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    try {
        const hashedPw = await bcrypt.hash(password, 12);
        const host = new  Host({
            username:username,
            email:email,
            password:hashedPw
        })
       await host.save();
       res.status(200).json({
           message:"Host Signup Successfully"
       })
    }catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }   
}

// function for host login
exports.hostLogin = async (req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;
    let loadedHost;
    try {
    const host = await Host.findOne({username:username});
    if (!host) {
        const error = new Error('No host found.');
        error.statusCode = 422;
        return next(error);
    }
    loadedHost = host;
    const isEqual = await bcrypt.compare(password, host.password);
    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      return next(error);
    }
    const token = jwt.sign(
      {
        email: loadedHost.email,
        userId: loadedHost._id.toString()
      },
      'somesupersecretsecret',
      { expiresIn: '1h' }
    );

    res.status(200).json({userId:loadedHost._id.toString(),token:token,typeOfuser:"Host"})

    } catch (err) {
       if(! err.statusCode) {
           err.statusCode = 500
       }
        next(err);
      }
}

// function for getting the information about the profile for user
exports.getUserProfile = async (req,res,next) => {
  const userId = req.params.userId;

  try {
    let user = await User.findById(userId);
    if(!user) {
      const error = new Error('No user found.');
      error.statusCode = 422;
      return next(error); 
    }
    res.status(200).json({username:user.username,fullname:user.fullname,email:user.email,
      profileImage:user.profileImage})
    
  } catch (err) {
    if(! err.statusCode) {
        err.statusCode = 500
    }
     next(err);
   }
}
// function for getting the information about the profile for host
exports.getHostProfile = async (req,res,next) => {
  const hostId = req.params.hostId;

  try {
    let host = await Host.findById(hostId);
    if(!host) {
      const error = new Error('No host found.');
      error.statusCode = 422;
      return next(error); 
    }
    res.status(200).json({username:host.username,fullname:host.fullname,email:host.email,
      profileImage:host.profileImage})
    
  } catch (err) {
    if(! err.statusCode) {
        err.statusCode = 500
    }
     next(err);
   }
}