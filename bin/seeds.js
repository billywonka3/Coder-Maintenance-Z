const mongoose     = require('mongoose');
const PainZones    = require('../models/body');

mongoose
  .connect('mongodb://localhost/painzone-database', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const neckArray = [
  {
    causes: '',
    smr: '',
    stretch: ''
  },

];


// ------- Create -------
PainZones.create(celebArray)
.then(()=>{
  console.log('it worked')
  mongoose.disconnect()
})
.catch(()=>{
  console.log('it didnt work')
})