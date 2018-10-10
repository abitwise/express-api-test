'use strict'

const HttpStatus = require('http-status')

module.exports = {
  emptyApi,
  apiWithParams,
  apiWithQuery,
  apiWithBody,
  apiWithMultipleAppends,
  apiWithMultipleCookies,
  apiWithMultipleClearCookies
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

function apiWithMultipleCookies (req, res) {
  res.cookie('cart', { items: [1, 2, 3] })
  res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
  res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true })

  res.status(HttpStatus.OK).end()
}

function apiWithMultipleClearCookies (req, res) {
  res.clearCookie('name', { path: '/admin' })
  res.clearCookie('rememberme')

  res.status(HttpStatus.OK).end()
}
