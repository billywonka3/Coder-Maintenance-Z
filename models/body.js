const mongoose = require('mongoose');
mongoose.plugin(schema => { schema.options.usePushEach = true; }); // this is used when you have an array of object id's that you will be pushing into.
const Schema   = mongoose.Schema;


const bodySchema = new Schema({
  causes: {
    type: String
  },
  smr: {
    type: String
  },
  stretch: {
    type: String
  }
}, { timestamps: true });

const Body = mongoose.model('Body', bodySchema);
module.exports = Body;