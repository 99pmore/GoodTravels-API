const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/goodtravels')
// mongoose.connect(process.env.MONGODB_URL)
mongoose.connect('mongodb://mongo:dJHbC2H4mWQnr3x38fIM@containers-us-west-200.railway.app:7633')
.then(db => console.log('db connect'))
.catch(err => console.log('Error: ', err))