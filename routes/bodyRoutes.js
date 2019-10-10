const express = require('express');
const router  = express.Router();
const ensureLogin = require("connect-ensure-login");


// Main Route
router.get("/main", 
  // ensureLogin.ensureLoggedIn(), 
  (req, res) => {
  res.render("body/index", { user: req.user });
});

// router.get('/', (req, res, next) => {
//   res.render('index');
// });

// Body Routes
router.get("/neck-lean", 
  // ensureLogin.ensureLoggedIn(), 
  (req, res) => {
  res.render("body/neck-lean", { user: req.user });
});

router.get("/neck-asym", 
  // ensureLogin.ensureLoggedIn(), 
  (req, res) => {
  res.render("body/neck-asym", { user: req.user });
});

router.get("/shoulders", 
  // ensureLogin.ensureLoggedIn(), 
  (req, res) => {
  res.render("body/shoulders", { user: req.user });
});

router.get("/back-lean", 
  // ensureLogin.ensureLoggedIn(), 
  (req, res) => {
  res.render("body/lowerback-lean", { user: req.user });
});

router.get("/back-rnd", 
  // ensureLogin.ensureLoggedIn(), 
  (req, res) => {
  res.render("body/lowerback-round", { user: req.user });
});

router.get("/back-asym", 
  // ensureLogin.ensureLoggedIn(), 
  (req, res) => {
  res.render("body/lowerback-asym", { user: req.user });
});

router.get("/wrists", 
  // ensureLogin.ensureLoggedIn(), 
  (req, res) => {
  res.render("body/wrists", { user: req.user });
});

// Toggle Button for Visual Side-Nav 
// function openNav() {
//   document.getElementById("sideNavigation").style.width = "250px";
//   document.getElementById("main").style.marginLeft = "250px";
// }

// function closeNav() {
//   document.getElementById("sideNavigation").style.width = "0";
//   document.getElementById("main").style.marginLeft = "0";
// }

// Accessing the API Database via Axios
// router.get("/main", (req, res, next) => {
//   axious.get('____')
//     .then(painDetails) => {
//       axious.get(`${painDetails.data.forms[0].url}`)
//         .then(formInfo => {
//           console.log(formInfo.data)
//           console.log(painDetails.data)
//           data = {
//             painDetails: painDetails.data;
//             formInfo: formInfo.data;
//           }
//         })
//     res.render('body/index', {response: ____.data})
//     }
// });


module.exports = router;