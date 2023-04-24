const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/goodtravels')
// mongoose.connect(process.env.MONGODB_URL)
mongoose.connect('mongodb+srv://pmore:mongogoodtravels@cluster0.r5x9zeg.mongodb.net/goodtravels')
.then(db => console.log('db connect'))
.catch(err => console.log('Error: ', err))