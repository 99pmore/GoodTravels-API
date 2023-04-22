const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/goodtravels')
mongoose.connect('mongodb+srv://pmore:mon916334082@cluster0.r5x9zeg.mongodb.net/goodtravels')
.then(db => console.log('db connect'))
.catch(err => console.log('Error: ', err))