const express = require('express')
const app = express()
const port = 3032 || process.env.port
const bookRouter = express.Router()
const Book = require('./models/bookModel')
const mongoose = require('mongoose')
const db = mongoose.connect('mongodb://localhost/bookAPI')

bookRouter.route('/Books').get(function(req, res) {
  const query = {}

  if (req.query.genre) {
    query.genre = req.query.genre
  }

  Book.find(query, function(err, books) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.json(books)
    }
  })
})

bookRouter.route('/Books').post(function(req, res) {
  const book = new Book()
  book.title = req.params.title
  book.series = req.params.series
  book.cast = req.params.cast
  book.desc = req.params.desc

  book.save(function(error, book) {
    if (error) {
      return next(error)
    }

    res.json({ message: 'Book added!', data: book })
  })
})

bookRouter.route('/Books/:bookId').get(function(req, res) {
  Book.findById(req.params.bookId, function(err, book) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.json(book)
    }
  })
})

app.use('/api', bookRouter)

app.get('/', (req, res) => {
  res.send('App is running')
})

app.listen(port)
console.log(`Running on port ${port}`)
