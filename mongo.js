const mongoose = require('mongoose')
const logger = require('./utils/logger')

const url = process.env.TEST_MONGODB_URI

logger.info('connecting to', url)

mongoose
  .connect(url)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

//create new notes

const note = new Note({
  content: 'Today is Monday',
  important: false,
})

note.save().then(result => {
  console.log('note saved!')
})

const note2 = new Note({
  content: 'We love Pingu',
  important: true,
})

note2.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})

// fetch objects from database
// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })