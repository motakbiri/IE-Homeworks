var express = require('express')
var router = express.Router()
var http = require('http')

/* GET users listing. */
router.get('/', function (req, res, next) {
  let options = {method: 'HEAD', host: req.query.site, port: 80, path: '/'}
  let request = http.request(options, function (result) {
    let headers = result.headers
    console.error({headers: headers, statusCode: result.statusCode})
    res.json({headers: headers, statusCode: result.statusCode})
  }
  )
  request.end()
  request.on('error', (e) => {
    res.json(e)
  })
})

module.exports = router
