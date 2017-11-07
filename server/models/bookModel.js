const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookModel = new Schema({
  title: { type: String },
  series: { type: String },
  cast: { type: String },
  desc: { type: String }
})

module.exports = mongoose.model('Book', bookModel)
