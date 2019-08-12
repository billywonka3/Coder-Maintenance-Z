const mongoose     = require('mongoose');
const PainZones    = require('../models/body');

mongoose
  .connect('mongodb://localhost/painzone-database', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const stretchArray = [
  {
    causes: '',
    smr: '',
    stretch: ''
  },

];


// ------- Create -------
PainZones.create(stretchArray)
.then(()=>{
  console.log('it worked')
  mongoose.disconnect()
})
.catch(()=>{
  console.log('it didnt work')
})