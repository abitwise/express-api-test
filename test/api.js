'use strict'

const HttpStatus = require('http-status')

module.exports = {
  emptyApi,
  apiWithParams,
  apiWithQuery,
  apiWithBody,
  apiWithMultipleAppends
}

function emptyApi (req, res) {
}

function apiWithParams (req, res) {
  res.status(HttpStatus.OK).json({ response: req.params.test })
}

function apiWithBody (req, res) {
  res.status(HttpStatus.OK).json({ response: req.body.test })
}

function apiWithQuery (req, res) {
  res.status(HttpStatus.OK).json({ response: req.query.test })
}

function apiWithMultipleAppends (req, res) {
  res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>'])
  res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly')
  res.append('Warning', '199 Miscellaneous warning')

  res.status(HttpStatus.OK).end()
}
