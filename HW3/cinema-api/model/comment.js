var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CommentSchema = new Schema({
  created_at: { type: Date, default: Date.now },
  movieId: String,
  directing_rate: Number,
  acting_rate: Number,
  screen_rate: Number,
  author: String,
  comment: String,
  opinion: String,
  upvote: Number,
  downvode: Number
})

module.exports = mongoose.model('Comment', CommentSchema)
