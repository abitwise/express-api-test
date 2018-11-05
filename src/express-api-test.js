'use strict'

const expect = require('chai').expect

/**
 * Express.js API Testing Utility, helps to test API controllers made for Express.js 4.x
 * @example
 * const ApiTest = require('express-api-test')
 *
 * describe('Food API', () => {
 *   describe('getFood', () => {
 *     it('should respond with Potato', () => {
 *       return new ApiTest(api.getFood)
 *         .setParams({ name: 'Potato', amount: 5 })
 *         .expectStatus(200)
 *         .expectJson({ food: 'Potato x 5'})
 *         .run()
 *     })
 *   })
 * })
 *
 * @constructor
 * @param {function} apiMethod - API method
 */
let ApiTest = function (apiMethod) {
  this.api = apiMethod
  this.called = []
  this.req = {
    headers: {},
    accepts: () => {},
    acceptsCharsets: () => {},
    acceptsEncodings: () => {},
    acceptsLanguages: () => {},
    get: () => {},
    is: () => {},
    param: () => {},
    range: () => {}
  }
  this.res = {
    append: () => this.res,
    attachment: () => this.res,
    cookie: () => this.res,
    clearCookie: () => this.res,
    download: () => this.res,
    end: () => this.res,
    format: (obj) => {
      if (this.req.headers && this.req.headers.accept) {
        let fn = obj[this.req.headers.accept]

        if (fn) {
          fn()
        } else {
          obj['default']()
        }
      } else {
        obj['default']()
      }

      return this.res
    },
    get: () => this.res,
    json: () => this.res,
    jsonp: () => this.res,
    links: () => this.res,
    location: () => this.res,
    redirect: () => this.res,
    render: () => this.res,
    send: () => this.res,
    sendFile: () => this.res,
    sendStatus: () => this.res,
    set: () => this.res,
    status: () => this.res,
    type: () => this.res,
    vary: () => this.res
  }

  this.setParams({})

  return this
}

/**
 * Set mock for app
 *
 * @param {Object} appMock - Express app mock
 * @returns {ApiTest}
 */
ApiTest.prototype.setAppMock = function (appMock) {
  this.req.app = appMock
  this.res.app = appMock

  return this
}

/**
 * Set baseUrl
 * @param {string} baseUrl - Request base url
 * @returns {ApiTest}
 */
ApiTest.prototype.setBaseUrl = function (baseUrl) {
  this.req.baseUrl = baseUrl

  return this
}

/**
 * Set body parameters (submitted/posted)
 * @example
 *   {
 *     username: 'bob',
 *     type: 'investor'
 *   }
 * @param {Object} body - Request body
 * @returns {ApiTest}
 */
ApiTest.prototype.setBody = function (body) {
  this.req.body = body

  return this
}

/**
 * Set cookies
 * @example
 * For cookie: name=value
 * Use:
 * {
 *   name: 'value'
 * }
 * @param {Object} cookies - Request cookies
 * @returns {ApiTest}
 */
ApiTest.prototype.setCookies = function (cookies) {
  this.req.cookies = cookies

  return this
}

/**
 * Set new custom parameter under req
 * @example
 * For req.audit = value
 * Use:
 * {
 *   name: 'audit',
 *   value: { anything: true }
 * }
 *
 * @param {Object} custom
 * @returns {ApiTest}
 */
ApiTest.prototype.setCustom = function (custom) {
  this.req[custom.name] = custom.value

  return this
}

/**
 * Set fresh
 *
 * @param {boolean} fresh - Is fresh request?
 * @returns {ApiTest}
 */
ApiTest.prototype.setFresh = function (fresh) {
  this.req.fresh = fresh

  return this
}

/**
 * Set hostname
 * @param {string} hostname Request hostname
 * @returns {ApiTest}
 */
ApiTest.prototype.setHostname = function (hostname) {
  this.req.hostname = hostname

  return this
}

/**
 * Set ip
 * @param {string} ip - Request IP
 * @returns {ApiTest}
 */
ApiTest.prototype.setIp = function (ip) {
  this.req.ip = ip

  return this
}

/**
 * Set ips
 * @param {string[]} ips - Request IPS
 * @returns {ApiTest}
 */
ApiTest.prototype.setIps = function (ips) {
  this.req.ips = ips

  return this
}

/**
 * Set method
 * @param {string} method - Request method
 * @returns {ApiTest}
 */
ApiTest.prototype.setMethod = function (method) {
  this.req.method = method

  return this
}

/**
 * Set original url
 * @param {string} originalUrl - Request original url
 * @returns {ApiTest}
 */
ApiTest.prototype.setOriginalUrl = function (originalUrl) {
  this.req.originalUrl = originalUrl

  return this
}

/**
 * Set request parameters
 * @example
 * For: /user/:uid/photos/:file
 * Use:
 *  {
 *    uid: 'user123',
 *    file: 'file123'
 *  }
 *
 * @param {Object} params - Request parameters
 * @returns {ApiTest}
 */
ApiTest.prototype.setParams = function (params) {
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
 * @param {string} path - Request path
 * @returns {ApiTest}
 */
ApiTest.prototype.setPath = function (path) {
  this.req.path = path

  return this
}

/**
 * Set protocol
 *
 * @param {string} protocol - Request protocol
 * @returns {ApiTest}
 */
ApiTest.prototype.setProtocol = function (protocol) {
  this.req.protocol = protocol

  return this
}

/**
 * Set request headers which are used by req.get method
 *
 * @param headers - Request headers
 * @returns {ApiTest}
 */
ApiTest.prototype.setRequestHeaders = function (headers) {
  this.req.headers = {}

  Object.entries(headers).map(pair => {
    this.req.headers[pair[0].toLowerCase()] = pair[1]
  })

  this.req.get = (field) => this.req.headers[field.toLowerCase()]

  return this
}

/**
 * Set swagger params
 *
 * @param params - Swagger request parameters
 * @returns {ApiTest}
 */
ApiTest.prototype.setSwaggerParams = function (params) {
  this.req.swagger = {
    params: {}
  }

  for (let key in params) {
    this.req.swagger.params[key] = { value: params[key] }
  }

  return this
}

/**
 * Set query parameters
 *
 * @example
 * For /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
 * Use:
 *   {
 *     order: 'desc',
 *     shoe: {
 *       color: 'blue',
 *       type: 'converse'
 *     }
 *   }
 * @param {Object} query - Request query
 * @returns {ApiTest}
 */
ApiTest.prototype.setQuery = function (query) {
  this.req.query = query

  return this
}

/**
 * Set route
 *
 * @param {Object} route - Request route
 * @returns {ApiTest}
 */
ApiTest.prototype.setRoute = function (route) {
  this.req.route = route

  return this
}

/**
 * Set secure
 *
 * @param {boolean} secure - Request is secure
 * @returns {ApiTest}
 */
ApiTest.prototype.setSecure = function (secure) {
  this.req.secure = secure

  return this
}

/**
 * Set signed cookies
 *
 * @param {Object} signedCookies - Request signed cookies
 * @returns {ApiTest}
 */
ApiTest.prototype.setSignedCookies = function (signedCookies) {
  this.req.signedCookies = signedCookies

  return this
}

/**
 * Set stale
 *
 * @param {boolean} stale - Request is stale
 * @returns {ApiTest}
 */
ApiTest.prototype.setStale = function (stale) {
  this.req.stale = stale

  return this
}

/**
 * Set subdomains
 *
 * @param {string[]} subdomains - Request subdomains
 * @returns {ApiTest}
 */
ApiTest.prototype.setSubdomains = function (subdomains) {
  this.req.subdomains = subdomains

  return this
}

/**
 * Set xhr
 *
 * @param {boolean} xhr - Request xhr
 * @returns {ApiTest}
 */
ApiTest.prototype.setXhr = function (xhr) {
  this.req.xhr = xhr

  return this
}

/**
 * Expect appended header: can be used multiple times to expect multiple headers
 *
 * @param {string} expectedHeaderField - Expected header field
 * @param {*} expectedValue - Expected header value
 *
 * @returns {ApiTest}
 */
ApiTest.prototype.expectAppend = function (expectedHeaderField, expectedValue) {
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

    return this.res
  }

  return this
}

/**
 * Expect attachment
 *
 * @param {string} [expectedFilePath] - Expected file path
 * @returns {ApiTest}
 */
ApiTest.prototype.expectAttachment = function (expectedFilePath) {
  this.called.push(new Promise((resolve, reject) => {
    this.resolveAttachment = resolve
    this.rejectAttachment = reject
  }))

  this.res.attachment = (filePath) => {
    try {
      expect(filePath).to.deep.equal(expectedFilePath)
      this.resolveAttachment()
    } catch (err) {
      this.rejectAttachment(err)
    }

    return this.res
  }

  return this
}

/**
 * Expect that cookie was set: can be used many times to expect multiple cookies
 *
 * @param {string} expectedName - Expected cookie name
 * @param {*} expectedValue - Expected cookie value
 * @param {Object} [expectedOptions] - Expected cookie options
 * @returns {ApiTest}
 */
ApiTest.prototype.expectCookie = function (expectedName, expectedValue, expectedOptions) {
  this.called.push(new Promise((resolve, reject) => {
    this['resolveCookie_' + expectedName] = resolve
    this['rejectCookie_' + expectedName] = reject
  }))

  this['cookieExpects_' + expectedName] = (headerField, value, options) => {
    expect(headerField).to.equal(expectedName)
    expect(value).to.deep.equal(expectedValue)
    expect(options).to.deep.equal(expectedOptions)
  }

  this.res.cookie = (name, value, options) => {
    try {
      this['cookieExpects_' + name](name, value, options)
      this['resolveCookie_' + name]()
    } catch (err) {
      this['rejectCookie_' + name](err)
    }

    return this.res
  }

  return this
}

/**
 * Expect that cookie was cleared: can be used many times to expect that multiple cookies were cleared
 *
 * @param {string} expectedName - Expected cleared cookie name
 * @param {Object} [expectedOptions] - Expected options
 * @returns {ApiTest}
 */
ApiTest.prototype.expectClearCookie = function (expectedName, expectedOptions) {
  this.called.push(new Promise((resolve, reject) => {
    this['resolveClearCookie_' + expectedName] = resolve
    this['rejectClearCookie_' + expectedName] = reject
  }))

  this['clearCookieExpects_' + expectedName] = (headerField, options) => {
    expect(headerField).to.equal(expectedName)
    expect(options).to.deep.equal(expectedOptions)
  }

  this.res.clearCookie = (name, options) => {
    try {
      this['clearCookieExpects_' + name](name, options)
      this['resolveClearCookie_' + name]()
    } catch (err) {
      this['rejectClearCookie_' + name](err)
    }

    return this.res
  }

  return this
}

/**
 * Expect file transfer
 *
 * @param {string} expectedPath
 * @param {string} [expectedFilename]
 * @param {Object} [expectedOptions]
 * @param {requestCallback} [expectedFn]
 * @returns {ApiTest}
 */
ApiTest.prototype.expectDownload = function (expectedPath, expectedFilename, expectedOptions, expectedFn) {
  this.called.push(new Promise((resolve, reject) => {
    this.resolveDownload = resolve
    this.rejectDownload = reject
  }))

  this.res.download = (path, filename, options, fn) => {
    try {
      expect(path).to.equal(expectedPath)

      if (expectedFilename) {
        expect(filename).to.equal(expectedFilename)
      }

      if (expectedOptions) {
        expect(options).to.deep.equal(expectedOptions)
      }

      if (expectedFn) {
        expect(fn).to.be.a('function')
        expect(fn).to.deep.equal(expectedFn)
      }

      this.resolveDownload()
    } catch (err) {
      this.rejectDownload(err)
    }

    return this.res
  }

  return this
}

/**
 * Expect json response
 *
 * @param {Object} expectedJson - Expected json response
 * @returns {ApiTest}
 */
ApiTest.prototype.expectJson = function (expectedJson) {
  this.called.push(new Promise((resolve, reject) => {
    this.resolveJson = resolve
    this.rejectJson = reject
  }))

  this.res.json = json => {
    try {
      expect(json).to.deep.equal(expectedJson)
      this.resolveJson()
    } catch (err) {
      this.rejectJson(err)
    }

    return this.res
  }

  return this
}

/**
 * Expect jsonp response
 *
 * @param {Object} expectedJsonp - Expected jsonp response
 * @returns {ApiTest}
 */
ApiTest.prototype.expectJsonp = function (expectedJsonp) {
  this.called.push(new Promise((resolve, reject) => {
    this.resolveJsonp = resolve
    this.rejectJsonp = reject
  }))

  this.res.jsonp = jsonp => {
    try {
      expect(jsonp).to.deep.equal(expectedJsonp)
      this.resolveJsonp()
    } catch (err) {
      this.rejectJsonp(err)
    }

    return this.res
  }

  return this
}

/**
 * Expect that res.links was called
 *
 * @param expectedLinks
 * @returns {ApiTest}
 */
ApiTest.prototype.expectLinks = function (expectedLinks) {
  this.called.push(new Promise((resolve, reject) => {
    this.resolveLinks = resolve
    this.rejectLinks = reject
  }))

  this.res.links = links => {
    try {
      expect(links).to.deep.equal(expectedLinks)
      this.resolveLinks()
    } catch (err) {
      this.rejectLinks(err)
    }

    return this.res
  }

  return this
}

/**
 * Expect that res.location was called
 *
 * @param {string} expectedLocation
 * @returns {ApiTest}
 */
ApiTest.prototype.expectLocation = function (expectedLocation) {
  this.called.push(new Promise((resolve, reject) => {
    this.resolveLocation = resolve
    this.rejectLocation = reject
  }))

  this.res.location = location => {
    try {
      expect(location).equal(expectedLocation)
      this.resolveLocation()
    } catch (err) {
      this.rejectLocation(err)
    }

    return this.res
  }

  return this
}

/**
 * Expect res.redirect was called
 *
 * @param {number} [expectedStatus] - Expected redirect status
 * @param {string} expectedPath - Expected redirect path
 * @returns {ApiTest}
 */
ApiTest.prototype.expectRedirect = function (expectedStatus, expectedPath) {
  this.called.push(new Promise((resolve, reject) => {
    this.resolveSend = resolve
    this.rejectSend = reject
  }))

  this.res.redirect = (val1, val2) => {
    try {
      if (!expectedPath) {
        expect(val1).to.equal(expectedStatus)
      } else {
        expect(val1).to.deep.equal(expectedStatus)
        expect(val2).to.equal(expectedPath)
      }
      this.resolveSend()
    } catch (err) {
      this.rejectSend(err)
    }

    return this.res
  }

  return this
}

/**
 * Expect response headers which are used by res.get and set by res.set method
 *
 * @param {string|Object} expectedHeaderField - Request header or headers (when object)
 * @param {string} [expectedValue]
 * @returns {ApiTest}
 */
ApiTest.prototype.expectResponseHeaders = function (expectedHeaderField, expectedValue) {
  let self = this

  const singleSet = function (expectedHeaderField, expectedValue) {
    self.called.push(new Promise((resolve, reject) => {
      self['resolveResSet_' + expectedHeaderField] = resolve
      self['rejectResSet_' + expectedHeaderField] = reject
    }))

    self['resSetExpects_' + expectedHeaderField] = (headerField, value) => {
      expect(headerField).to.equal(expectedHeaderField)
      expect(value).to.deep.equal(expectedValue)
    }

    self.res.set = (headerField, value) => {
      try {
        self['resSetExpects_' + headerField](headerField, value)
        self['resolveResSet_' + headerField]()
      } catch (err) {
        self['rejectResSet_' + headerField](err)
      }

      return self.res
    }
  }

  if (typeof expectedHeaderField === 'string') {
    singleSet(expectedHeaderField, expectedValue)
  } else {
    Object.keys(expectedHeaderField).forEach(key => {
      singleSet(key, expectedHeaderField[key])
    })
  }

  this.res.headers = {}

  Object.entries(expectedHeaderField).map(pair => {
    this.res.headers[pair[0].toLowerCase()] = pair[1]
  })

  this.res.get = (field) => this.req.headers[field.toLowerCase()]

  return this
}

/**
 * Expect send
 *
 * @param {*} expectedValue - Expected send response value
 * @returns {ApiTest}
 */
ApiTest.prototype.expectSend = function (expectedValue) {
  this.called.push(new Promise((resolve, reject) => {
    this.resolveSend = resolve
    this.rejectSend = reject
  }))

  this.res.send = (value) => {
    try {
      expect(value).to.deep.equal(expectedValue)
      this.resolveSend()
    } catch (err) {
      this.rejectSend(err)
    }

    return this.res
  }

  return this
}

/**
 * Expect sendFile
 *
 * @param {string} expectedPath - Expected path
 * @param {Object} [expectedOptions] - Expected options
 * @param {requestCallback} [expectedFn] - Expected callback function
 * @returns {ApiTest}
 */
ApiTest.prototype.expectSendFile = function (expectedPath, expectedOptions, expectedFn) {
  this.called.push(new Promise((resolve, reject) => {
    this.resolveSendFile = resolve
    this.rejectSendFile = reject
  }))

  this.res.sendFile = (path, options, fn) => {
    try {
      expect(path).to.equal(expectedPath)
      expect(options).to.deep.equal(expectedOptions)
      expect(fn).to.deep.equal(expectedFn)
      this.resolveSendFile()
    } catch (err) {
      this.rejectSendFile(err)
    }

    return this.res
  }

  return this
}

/**
 * Expect http status code
 *
 * @param expectedStatusCode - Expected send status
 * @returns {ApiTest}
 */
ApiTest.prototype.expectSendStatus = function (expectedStatusCode) {
  this.called.push(new Promise((resolve, reject) => {
    this.resolveSendStatus = resolve
    this.rejectSendStatus = reject
  }))

  this.res.sendStatus = (statusCode) => {
    try {
      expect(statusCode).to.be.equal(expectedStatusCode)
      this.resolveSendStatus()
    } catch (err) {
      this.rejectSendStatus(err)
    }

    return this.res
  }

  return this
}

/**
 * Expect http status code
 *
 * @param expectedStatusCode - Expected status code
 * @returns {ApiTest}
 */
ApiTest.prototype.expectStatus = function (expectedStatusCode) {
  this.called.push(new Promise((resolve, reject) => {
    this.resolveStatus = resolve
    this.rejectStatus = reject
  }))

  this.res.status = (statusCode) => {
    try {
      expect(statusCode).to.be.equal(expectedStatusCode)
      this.resolveStatus()
    } catch (err) {
      this.rejectStatus(err)
    }

    return this.res
  }

  return this
}

/**
 * Expect that end() is called
 *
 * @return {ApiTest}
 */
ApiTest.prototype.expectEnd = function () {
  this.called.push(new Promise(resolve => { this.resolveEnd = resolve }))

  this.res.end = () => {
    this.resolveEnd()

    return this.res
  }

  return this
}

/**
 * Run test: initiates api call and assertions
 *
 * @returns {Promise.<*>}
 */
ApiTest.prototype.run = function () {
  this.api(this.req, this.res)

  return Promise.all(this.called)
}

module.exports = ApiTest
