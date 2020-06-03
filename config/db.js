const mongoose = require('mongoose')
const config = require('config')
let db = config.get('mongoURI')

if(process.env.NODE_ENV === 'production') {
  db = process.env.mongoURI
}

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    console.log('mongo db connected')
  } catch (err) {
    console.log(err.msg)
    process.exit(1)
  }
}

module.exports = connectDB