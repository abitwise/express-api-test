'use strict'

const HttpStatus = require('http-status')

module.exports = {
  emptyApi,
  apiWithParams,
  apiWithQuery,
  apiWithBody
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
