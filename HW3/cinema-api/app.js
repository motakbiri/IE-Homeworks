var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var morgan = require('morgan')
app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/static', express.static('public'))

var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/cinema')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', function () {
  console.log('DB connection alive')
})
var Movie = require('./model/movie')
var Comment = require('./model/comment')

var router = express.Router()
router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  console.log('Something is happening.')
  next()
})

router.get('/', function (req, res) {
  res.json({ message: 'CEIT Movie API!' })
})

router.route('/movies/recent/:number')

  .get(function (req, res) {
    Movie.find({}, ['title', 'original_title', 'year'], function (err, movies) {
      if (err) { res.send(err) }
      res.send(movies.sort([['created_at', -1]]).reverse().slice(0, parseInt(req.params.number)))
    })
  })

router.route('/movies/:id/details')
  .get(function (req, res) {
    Movie.find({'_id': req.params.id}, function (err, movie) {
      if (err) { res.send(err) }
      res.send(movie)
    })
  })
router.route('/submit/')
  .post(function (req, res) {
    var movie = new Movie()
    movie.title = req.body.title
    movie.original_title = req.body.original_title
    movie.year = req.body.year
    movie.rate = req.body.rate
    movie.director = req.body.director
    movie.lenght = req.body.lenght
    movie.language = req.body.language
    movie.description = req.body.description
    movie.country = req.body.country
    movie.genre = req.body.genre
    movie.writer = req.body.writer

    movie.save(function (err) {
      if (err) { res.send(err) }

      res.json({ message: 'Movie created!' })
    })
  })
router.route('/movies/:id/comments')
    .post(function (req, res) {
      var comment = new Comment()
      comment.movieId = req.params.id
      comment.directing_rate = req.body.directing_rate
      comment.acting_rate = req.body.acting_rate
      comment.screen_rate = req.body.screen_rate
      comment.author = req.body.author
      comment.comment = req.body.comment
      comment.opinion = req.body.opinion

      comment.save(function (err) {
        if (err) { res.send(err) }

        res.json({ message: 'Comment created!' })
      })
    })
    .get(function (req, res) {
      Comment.find({'movieId': req.params.id}, function (err, comments) {
        if (err) { res.send(err) }
        res.send(comments.sort([['created_at', -1]]))
      })
    })
router.route('/search')
.get(function (req, res) {
  Movie.find({'original_title': req.query.q}, function (err, movie) {
    if (err) { res.send(err) }
    res.send(movie)
  })
})
app.use('/api', router)
app.listen(3001)
