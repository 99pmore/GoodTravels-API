var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/goodtravels')
.then(db => console.log('db connect'))
.catch(err => console.log('Error: ', err))