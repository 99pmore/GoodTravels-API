const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/goodtravels')
mongoose.connect(process.env.MONGODB_URL)
.then(db => console.log('db connect'))
.catch(err => console.log('Error: ', err))