const express       = require('express');
const router        = express.Router();

const bcrypt        = require('bcrypt');

const User          = require('../models/user');
const Custom        = require('../models/custom');

const passport      = require('passport');
const ensureLogin   = require("connect-ensure-login");

const uploadMagic   = require('../config/cloundinary-setup');


// Sign-Up Route
router.get('/signup', (req, res, next)=>{
  res.render('user/signup');
})
router.post('/signup', (req, res, next)=>{
  const theUsername = req.body.theUsername;
  const thePassword = req.body.thePassword;
  const theEmail = req.body.theEmail;

  const salt = bcrypt.genSaltSync(12);
  const hashedPass =  bcrypt.hashSync(thePassword, salt);

  User.create({
      username: theUsername,
      password: hashedPass, 
      email: theEmail
  })
  .then(()=>{
      console.log('success!');
      res.redirect('/login')
      res.redirect('/login', { "message": req.flash("Success! You signed up. Good for you bruh") })
  })
  .catch((err)=>{
      next(err)
      next(err, { "message": req.flash("There was a problem signing up") });
  })
})


// Login Route
router.get('/login', (req, res, next) => {
  // console.log("Login page loaded")
  res.render('user/login', { "message": req.flash("error") } );
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/main",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

// Logout Route
router.post('/logout', (req, res, next)=>{
  req.logout();
  res.render("index", { "message": req.flash("You have been logged out") });
})


// Profile-Route
router.get("/profile", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("user/profile-edit", { user: req.user });
});

// router.get('/profile', (req, res, next)=>{
//   Custom.findById(req.params.customID)
//     .then((database)=>{
//             res.render('user/profile-edit', {customRoutines: database})
//     })
//     .catch((err)=>{
//         next(err);
//     })
// })

// router.post("/profile", (req, res, next)=>{
//   let theID = req.params.customID;
//   Custom.findByIdAndUpdate(theID, req.body)
//     .then((custom)=>{
//         res.render('user/profile-edit'+customID)
//     })
//     .catch((err)=>{
//         next(err);
//     })
// })


// Custom Routines Page
router.get('/custom', (req, res, next)=>{
  Custom.find()
  .then((theRoutine)=>{
      res.render("user/custom", {exercise: theRoutine})
  })
  .catch((err)=>{
      next(err);
  })
})

router.post('/create-routine', uploadMagic.single('photo') ,(req, res, next)=>{
  let name = req.body.name;
  let description = req.body.description;
  let img = req.file.url

  Custom.create({
      name: name,
      description: description,
      image: img
  })
  .then((custom)=>{
      res.redirect('/custom')
  })
  .catch((err)=>{
      next(err);
  })
})

module.exports = router;