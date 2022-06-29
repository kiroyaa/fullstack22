const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// Custom validator
// number has to be xx-xxxxxx
// or xxx-xxxxx
function validator(val) {
  const valid = /\d{3}-\d{5}/.test(val)
  return valid ? valid : /\d{2}-\d{6}/.test(val);
}

const custom = [validator, 'format is xx-xxxxxx or xxx-xxxxx']
const numSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    required: [true, 'User phone number required'],
    validate: custom
  }
})

numSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Number', numSchema)
