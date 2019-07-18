const mongoose = require('mongoose');
mongoose.plugin(schema => { schema.options.usePushEach = true; }); // this is used when you have an array of object id's that you will be pushing into.
const Schema   = mongoose.Schema;


const customSchema = new Schema({
  image: {
    type: String
  },
  title: {
    type: String
  },
  desciption: {
    type: String
  }
}, { timestamps: true });

const Custom = mongoose.model('Custom', customSchema);

module.exports = Custom;