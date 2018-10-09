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
 * Set mock for app parameter
 *
 * @param appMock
 */
fn.setAppMock = function (appMock) {
  this.req.app = appMock

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
 * @param {object} params
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
 * @param {object} query
 * @returns {ApiTest}
 */
fn.setQuery = function (query) {
  this.req.query = query

  return this
}

/**
 * Set body parameters (submitted/posted)
 * Example use:
 *   {
 *     username: 'bob',
 *     type: 'investor'
 *   }
 * @param {object} body
 * @returns {ApiTest}
 */
fn.setBody = function (body) {
  this.req.body = body

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
