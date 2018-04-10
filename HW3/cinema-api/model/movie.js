var mongoose = require('mongoose')
var Schema = mongoose.Schema

var MovieSchema = new Schema({
  title: String,
  original_title: String,
  created_at: { type: Date, default: Date.now },
  year: Number,
  rate: Number,
  director: String,
  lenght: String,
  language: String,
  description: String,
  country: String,
  genre: { type: Array, 'default': [] },
  actors: { type: Array, 'default': [] },
  writer: { type: Array, 'default': [] }

})

module.exports = mongoose.model('Movie', MovieSchema)
