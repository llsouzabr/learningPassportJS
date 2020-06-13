// const {
//     Usuario
// } = require('../models')
// const config = require("../configs/database");
// const bcrypt = require("bcrypt");
// const Email = require('../configs/email');
// const fetch = require('node-fetch');
// const API_BASE = 'http://localhost:3000/api/v0'
require('dotenv').config();
const db = require('../models');
const crypto = require('crypto');
const Email = require('../config/email');
const async = require('async');

const forgotController = function(req,res,next) {
    async.waterfall([   
        function(done) {
            console.log('step 1')
            crypto.randomBytes(10, function(err, buf) {
              var token = buf.toString('hex');
              done(err, token);
            });

          },
          function(token, done) {
              console.log('step2',token)
              const { email } = req.body;
              const msgReturn = 'An e-mail has been sent to ' + email + ' with further instructions.'
              db.User.findOne(
                { where: {email: email}}).then(function(user){
                    if(!user){
                        // req.flash('error', 'No account with that email address exists.');
                        // return res.status(400).send('Email não encontrado, segue a vida '+ token);
                        req.flash('info', 'An e-mail has been sent to ' + email + ' with further instructions.');
                        return res.status(200).send(msgReturn);
                    } else {
                        user.resetPasswordToken = token;
                        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
                        user.save
                            done(null,token, user);
                        }
                    });

            // db.User.findOne({ where: {email: req.body.email}},function(err, user) {
            // // db.User.findOne({ email: req.body.email }, function(err, user) {
            //   if (!user) {
            //     req.flash('error', 'No account with that email address exists.');
            //     // return res.redirect('/forgot');
            //     return res.send('No account with that email address exists.')
            //   }
      
            //   db.User.resetPasswordToken = token;
            //   db.User.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      
            //   db.User.save(function(err) {
            //     done(err, token, user);
            //   });
            // });
          },
          function(token, user, done) {
            console.log('Envio Email')
            let mailOptions = {
              to: user.email,
              from:`${process.env.EMAIL_USER}`,
              subject: 'CRUD candySphere Password Reset',
              text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            Email.sendMail(mailOptions, function(err) {
                if(err){
                    console.log('Não foi possivel mandar o email: ' + err );
                    return res.status(500).send('Não foi possivel mandar o email: ' + err )
                } else {
                    req.flash('info',msgReturn)
                    done(err, 'done');
                }
            //   req.flash('info', 'An e-mail has been sent to ' + email + ' with further instructions.');

            });
          }
        ], function(err) {
          if (err) return next(err);
          res.redirect('/resetPassword');
        });
};


// const forgotController = async function(req,res,next){
//     const token = '1a2b3c';



// }


module.exports = forgotController
