'use strict'

const expect = require('chai').expect

/**
 * Express.js API Testing Utility
 * Helps to test API controllers made for Express.js
 *
 * Example usage:
 *
 * return new ApiTest(controller.foo)
 *   .setParams({ foo: 'bar' })
 *   .expectStatus(200)
 *   .expectJson({ message: 'FooBar'})
 *   .run();
 *
 * @constructor
 * @param {function} cb - API
 */
let ApiTest = function (cb) {
  this.api = cb
  this.called = []
  this.req = {}
  this.res = {}
  this.res.status = () => {
    return {
      'json': this.res.json,
      'end': this.res.end
    }
  }
  this.res.json = () => {}
  this.res.end = () => {}

  this.setParams({})

  return this
}

let fn = ApiTest.prototype

/**
 * Set mock for app
 *
 * @param {Object} appMock
 * @returns {ApiTest}
 */
fn.setAppMock = function (appMock) {
  this.req.app = appMock
  this.res.app = appMock

  return this
}

/**
 * Set baseUrl
 * @param {string} baseUrl
 * @returns {ApiTest}
 */
fn.setBaseUrl = function (baseUrl) {
  this.req.baseUrl = baseUrl

  return this
}

/**
 * Set body parameters (submitted/posted)
 * Example:
 *   {
 *     username: 'bob',
 *     type: 'investor'
 *   }
 * @param {Object} body
 * @returns {ApiTest}
 */
fn.setBody = function (body) {
  this.req.body = body

  return this
}

/**
 * Set cookies
 * Example:
 * For cookie: name=value
 * Use:
 * {
 *   name: 'value'
 * }
 * @param {Object} cookies
 * @returns {ApiTest}
 */
fn.setCookies = function (cookies) {
  this.req.cookies = cookies

  return this
}

/**
 * Set fresh
 *
 * @param {boolean} fresh
 * @returns {ApiTest}
 */
fn.setFresh = function (fresh) {
  this.req.fresh = fresh

  return this
}

/**
 * Set hostname
 * @param {string} hostname
 * @returns {ApiTest}
 */
fn.setHostname = function (hostname) {
  this.req.hostname = hostname

  return this
}

/**
 * Set ip
 * @param {string} ip
 * @returns {ApiTest}
 */
fn.setIp = function (ip) {
  this.req.ip = ip

  return this
}

/**
 * Set ips
 * @param {string[]} ips
 * @returns {ApiTest}
 */
fn.setIps = function (ips) {
  this.req.ips = ips

  return this
}

/**
 * Set method
 * @param {string} method
 * @returns {ApiTest}
 */
fn.setMethod = function (method) {
  this.req.method = method

  return this
}

/**
 * Set original url
 * @param {string} originalUrl
 * @returns {ApiTest}
 */
fn.setOriginalUrl = function (originalUrl) {
  this.req.originalUrl = originalUrl

  return this
}

/**
 * Set request parameters
 * Example:
 * For: /user/:uid/photos/:file
 * Use:
 *  {
 *    uid: 'user123',
 *    file: 'file123'
 *  }
 *
 * @param {Object} params
 * @returns {ApiTest}
 */
fn.setParams = function (params) {
  this.req = {
    param: function (name) {
      if (params.hasOwnProperty(name)) {
        return params[name]
      }

      return null
    }
  }

  this.req.params = params

  return this
}

/**
 * Set path
 * @param {string} path
 * @returns {ApiTest}
 */
fn.setPath = function (path) {
  this.req.path = path

  return this
}

/**
 * Set protocol
 * @param {string} protocol
 * @returns {ApiTest}
 */
fn.setProtocol = function (protocol) {
  this.req.protocol = protocol

  return this
}

/**
 * Set query parameters
 * Example:
 * For /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
 * Use:
 *   {
 *     order: 'desc',
 *     shoe: {
 *       color: 'blue',
 *       type: 'converse'
 *     }
 *   }
 * @param {Object} query
 * @returns {ApiTest}
 */
fn.setQuery = function (query) {
  this.req.query = query

  return this
}

/**
 * Set route
 * @param {Object} route
 * @returns {ApiTest}
 */
fn.setRoute = function (route) {
  this.req.route = route

  return this
}

/**
 * Set secure
 * @param {boolean} secure
 * @returns {ApiTest}
 */
fn.setSecure = function (secure) {
  this.req.secure = secure

  return this
}

/**
 * Set signed cookies
 * @param {Object} signedCookies
 * @returns {ApiTest}
 */
fn.setSignedCookies = function (signedCookies) {
  this.req.signedCookies = signedCookies

  return this
}

/**
 * Set stale
 * @param {boolean} stale
 * @returns {ApiTest}
 */
fn.setStale = function (stale) {
  this.req.stale = stale

  return this
}

/**
 * Set subdomains
 * @param {string[]} subdomains
 * @returns {ApiTest}
 */
fn.setSubdomains = function (subdomains) {
  this.req.subdomains = subdomains

  return this
}

/**
 * Set xhr
 * @param {boolean} xhr
 * @returns {ApiTest}
 */
fn.setXhr = function (xhr) {
  this.req.xhr = xhr

  return this
}

/**
 * Set expected header field with value
 *
 * @param {string} expectedHeaderField
 * @param {*} expectedValue
 *
 * @returns {ApiTest}
 */
fn.expectAppend = function (expectedHeaderField, expectedValue) {
  this.called.push(new Promise((resolve, reject) => {
    this['resolveAppend_' + expectedHeaderField] = resolve
    this['rejectAppend_' + expectedHeaderField] = reject
  }))

  this['appendExpects_' + expectedHeaderField] = (headerField, value) => {
    expect(headerField).to.equal(expectedHeaderField)
    expect(value).to.deep.equal(expectedValue)
  }

  this.res.append = (headerField, value) => {
    try {
      this['appendExpects_' + headerField](headerField, value)
      this['resolveAppend_' + headerField]()
    } catch (err) {
      this['rejectAppend_' + headerField](err)
    }
  }

  return this
}

/**
 * Set expected response
 *
 * @param expectedJson
 * @returns {ApiTest}
 */
fn.expectJson = function (expectedJson) {
  this.called.push(new Promise((resolve, reject) => {
    this.resolveJson = resolve
    this.rejectJson = reject
  }))

  this.res.json = (json) => {
    try {
      expect(json).to.deep.equal(expectedJson)
      this.resolveJson()
    } catch (err) {
      this.rejectJson(err)
    }
  }

  return this
}

/**
 * Set expected status code
 *
 * @param expectedStatus
 * @returns {ApiTest}
 */
fn.expectStatus = function (expectedStatus) {
  this.called.push(new Promise((resolve, reject) => {
    this.resolveStatus = resolve
    this.rejectStatus = reject
  }))

  this.res.status = (code) => {
    try {
      expect(code).to.be.equal(expectedStatus)
      this.resolveStatus()
    } catch (err) {
      this.rejectStatus(err)
    }

    return {
      'json': this.res.json,
      'end': this.res.end
    }
  }

  return this
}

/**
 * Expect that end() is called
 *
 * @return {ApiTest}
 */
fn.expectEnd = function () {
  this.called.push(new Promise(resolve => { this.resolveEnd = resolve }))

  this.res.end = () => {
    this.resolveEnd()
  }

  return this
}

/**
 * Run to initiate api call and assertions
 *
 * @returns {Promise.<*>}
 */
fn.run = function () {
  this.api(this.req, this.res)

  return Promise.all(this.called)
}

module.exports = ApiTest
