const express       = require('express');
const router        = express.Router();
const bcrypt        = require('bcrypt');

const User          = require('../models/user');

const passport      = require('passport');
const ensureLogin   = require("connect-ensure-login");

const uploadMagic = require('../config/cloundinary-setup');


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
  res.render("user/login", { "message": req.flash("You have been logged out") });
})


//Profile-Route
router.get("/profile", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("user/profile-edit", { user: req.user });
});

document.getElementById('custom-btn').onclick = ()=>{
  let list = document.getElementById('list-of-custom')
  console.log(list)
  
  axios.get('https://coder-maintenance.herokuapp.com/profile')
  .then((response)=>{
      list.innerHTML = "";
      
      response.data.forEach((eachOne)=>{
         let newCard = document.createElement('div');
         newCard.innerHTML = `
          <div class="smr-card">
            <img src="${eachOne.image}">
            <p class="card-title"> ${eachOne.title} </p>
            <p class="directions"> ${eachOne.description} </p>
            <p> ---------------------------- </p> 
          </div>
          `
         list.appendChild(newCard); 
      })
  })
  .catch((err)=>{
      console.log(err);
  })
}

document.getElementById('add-new-btn').onclick = ()=>{
  let image = document.getElementById('new-image');
  let title = document.getElementById('new-title');
  let description = document.getElementById('new-description');

  axios.post('https://coder-maintenance.herokuapp.com/profile', {
      image: image.value,
      title: title.value,
      description: description.value,
  })
  .then(()=>{
      console.log('yay')
      image.value = "";
      title.value = "";
      description.value = "";
  })
  .catch((err)=>{
      console.log(err);
  })
}


module.exports = router;