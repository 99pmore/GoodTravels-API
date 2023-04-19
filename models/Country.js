const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    region: { type: String, required: true },
    flag: { type: String, required: true }
})
  
const Country = mongoose.model('Country', userSchema)

module.exports = Country