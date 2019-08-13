const express = require('express');
const router  = express.Router();
const ensureLogin = require("connect-ensure-login");

const Custom        = require('../models/custom');
// const customAPI = new APIHandler("https://coder-maintenance.herokuapp.com");

// const uploadMagic   = require('../config/cloundinary-setup');


router.get('/custom/custom-index', (req, res, next) => {
  Custom.find()
  .then(allCustom => {
    res.locals.theMsg = "You are viewing the list of Custom!";
    res.render('custom/index', {allCustom});
  }).catch(err => next(err));
});


router.get('/custom/create', (req, res, next) => {
  res.render('custom/create');
});
router.post('/custom/create', (req, res, next) => {
  // console.log("info from req.body from custom create form >>>>>>> ", req.body);
  Custom.create(req.body)
  .then(newCustom => {
    console.log("the newly created custom ---- ", newCustom);
    res.redirect('custom-index');
  }).catch(err => next(err));
});

// router.get('/custom/detail/:customId', (req, res, next) => {
//   Custom.findById(req.params.customId)
//   .then(customDetail => {
//     res.render('custom/details', {customDetail});
//   }).catch(err => next(err));
// });

router.get('/edit/:customId', (req, res, next)=>{
  Custom.findById(req.params.customId)
    .then((customFromDb)=>{
      res.render('custom/edit', {Custom: customFromDb})
    })
    .catch((err)=>{
        next(err);
    })
})

router.post('/update/:customId', (req, res, next)=>{
  let theId = req.params.customId;
  Custom.findByIdAndUpdate(theId, req.body)
    .then((customId)=>{
        res.redirect('/custom/custom-index')
    })
    .catch((err)=>{
        next(err);
    })
})

router.post('/custom/delete/:customId', (req, res, next) => {
  Custom.findByIdAndRemove(req.params.customId)
  .then(() => {
    console.log(req.params.customId)
    res.redirect('/custom/custom-index');
  }).catch(err => next(err));
});

// --------------------------------------------------------------------

// // Custom Routines Page
// router.get('/custom', (req, res, next)=>{
//   Custom.find()
//   .then((theRoutine)=>{
//       res.render("/custom", {exercise: theRoutine})
//   })
//   .catch((err)=>{
//       next(err);
//   })
// })

// router.get('/custom', (req, res, next)=>{
//   Custom.findById(req.params.id)
//     .then((theStretch)=>{
//             res.json(theStretch)
//     })
//     .catch((err)=>{
//         next(err);
//     })
// })

// router.post("/custom", (req, res, next)=>{
//   let customID = req.body.customID;
//   Custom.findByIdAndUpdate(customID, req.body)
//     .then((customID)=>{
//         res.render('/custom'+customID)
//     })
//     .catch((err)=>{
//         next(err);
//     })
// })


// document.getElementById('new-character-form').onsubmit = function(e) {

//   e.preventDefault();

//   let name = document.getElementById('new-name').value;
//   let description = document.getElementById('new-dsecription').value;

//   axios.post('/custom', {
//     name: name,
//     description: description,
//   })
//     .then(()=>{
//       document.getElementById('new-name').value = "";
//       document.getElementById('new-description').value = "";
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// }

// router.post('/custom', uploadMagic.single('image') ,(req, res, next)=>{
//   let name = req.body.name;
//   let description = req.body.description;
//   // let image = req.file.url

//   Custom.create({
//       name: name,
//       description: description,
//       // image: image
//   })
//   .then(()=>{
//       res.redirect('/custom')
//   })
//   .catch((err)=>{
//       next(err);
//   })
// })


// ------------------------AXIOS----------------------------------

// $(document).ready(() => {
//   // Show All Custom in Database
//   document.getElementById('fetch-all').onclick = ()=>{
//     let list = document.getElementByClassName('custom-container')[0];
//     console.log(list)
//     list.innerHTML = "";
    
//     axios.get('https://coder-maintenance.herokuapp.com/custom')
//     .then((response)=>{
//         response.data.forEach((custom)=>{
//           let newCustom = document.createElement('div');
//           newCustom.classList = 'custom-info';
//           newCustom.innerHTML = `
//             <div>
//               <h3 class='name'> Name: ${custom.name} </h3>
//               <h6 class='description'> Description: ${custom.description} </h6>
//               <p class='id'> ID: ${custom.id} </p>
//               <p> ---------------------------- </p> 
//             </div>
//             `
//           list.appendChild(newCustom); 
//         })
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
//   }

//   // Edit Custom
//   document.getElementById('send-data-edit').onclick = function() {
//     const customInfo = {
//       id: document.getElementById('custom-edit-id').value,
//       name: document.getElementById('custom-edit-name').value,
//       description: document.getElementById('custom-edit-description').value,
//     };
//     axios.put(
//         `https://coder-maintenance.herokuapp.com/custom/${customInfo.id}`,
//         charInfo,
//       )
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     document.getElementById('custom-edit-id').value = '';
//     document.getElementById('custom-edit-name').value = '';
//     document.getElementById('custom-edit-description').value = '';

//   };

//   // Create Custom
//   document.getElementById('send-data-create').onclick = function() {
//     const customInfo = {
//       name: document.getElementById('custom-create-name').value,
//       description: document.getElementById('custom-create-description').value,
//     };

//     axios
//       .post(`https://coder-maintenance.herokuapp.com/custom/`, customInfo)
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     document.getElementById('custom-create-name').value = '';
//     document.getElementById('custom-create-description').value = '';
//   };
// });


module.exports = router;