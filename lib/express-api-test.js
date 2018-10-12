'use strict';

const expect = require('chai').expect;
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


let ApiTest = function ApiTest(cb) {
  this.api = cb;
  this.called = [];
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
  };
  this.res = {
    append: () => this.res,
    attachment: () => this.res,
    cookie: () => this.res,
    clearCookie: () => this.res,
    download: () => this.res,
    end: () => this.res,
    format: () => this.res,
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
  };
  this.setParams({});
  return this;
};

let fn = ApiTest.prototype;
/**
 * Set mock for app
 *
 * @param {Object} appMock
 * @returns {ApiTest}
 */

fn.setAppMock = function (appMock) {
  this.req.app = appMock;
  this.res.app = appMock;
  return this;
};
/**
 * Set baseUrl
 * @param {string} baseUrl
 * @returns {ApiTest}
 */


fn.setBaseUrl = function (baseUrl) {
  this.req.baseUrl = baseUrl;
  return this;
};
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
  this.req.body = body;
  return this;
};
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
  this.req.cookies = cookies;
  return this;
};
/**
 * Set fresh
 *
 * @param {boolean} fresh
 * @returns {ApiTest}
 */


fn.setFresh = function (fresh) {
  this.req.fresh = fresh;
  return this;
};
/**
 * Set hostname
 * @param {string} hostname
 * @returns {ApiTest}
 */


fn.setHostname = function (hostname) {
  this.req.hostname = hostname;
  return this;
};
/**
 * Set ip
 * @param {string} ip
 * @returns {ApiTest}
 */


fn.setIp = function (ip) {
  this.req.ip = ip;
  return this;
};
/**
 * Set ips
 * @param {string[]} ips
 * @returns {ApiTest}
 */


fn.setIps = function (ips) {
  this.req.ips = ips;
  return this;
};
/**
 * Set method
 * @param {string} method
 * @returns {ApiTest}
 */


fn.setMethod = function (method) {
  this.req.method = method;
  return this;
};
/**
 * Set original url
 * @param {string} originalUrl
 * @returns {ApiTest}
 */


fn.setOriginalUrl = function (originalUrl) {
  this.req.originalUrl = originalUrl;
  return this;
};
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
    param: function param(name) {
      if (params.hasOwnProperty(name)) {
        return params[name];
      }

      return null;
    }
  };
  this.req.params = params;
  return this;
};
/**
 * Set path
 * @param {string} path
 * @returns {ApiTest}
 */


fn.setPath = function (path) {
  this.req.path = path;
  return this;
};
/**
 * Set protocol
 *
 * @param {string} protocol
 * @returns {ApiTest}
 */


fn.setProtocol = function (protocol) {
  this.req.protocol = protocol;
  return this;
};
/**
 * Set request headers which are used by req.get method
 *
 * @param headers
 * @returns {ApiTest}
 */


fn.setRequestHeaders = function (headers) {
  this.req.headers = {};
  Object.entries(headers).map(pair => {
    this.req.headers[pair[0].toLowerCase()] = pair[1];
  });

  this.req.get = field => this.req.headers[field.toLowerCase()];

  return this;
};
/**
 * Set swagger params
 *
 * @param params
 * @returns {ApiTest}
 */


fn.setSwaggerParams = function (params) {
  this.req.swagger = {
    params: {}
  };

  for (let key in params) {
    this.req.swagger.params[key] = {
      value: params[key]
    };
  }

  return this;
};
/**
 * Set query parameters
 *
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
  this.req.query = query;
  return this;
};
/**
 * Set route
 *
 * @param {Object} route
 * @returns {ApiTest}
 */


fn.setRoute = function (route) {
  this.req.route = route;
  return this;
};
/**
 * Set secure
 *
 * @param {boolean} secure
 * @returns {ApiTest}
 */


fn.setSecure = function (secure) {
  this.req.secure = secure;
  return this;
};
/**
 * Set signed cookies
 *
 * @param {Object} signedCookies
 * @returns {ApiTest}
 */


fn.setSignedCookies = function (signedCookies) {
  this.req.signedCookies = signedCookies;
  return this;
};
/**
 * Set stale
 *
 * @param {boolean} stale
 * @returns {ApiTest}
 */


fn.setStale = function (stale) {
  this.req.stale = stale;
  return this;
};
/**
 * Set subdomains
 *
 * @param {string[]} subdomains
 * @returns {ApiTest}
 */


fn.setSubdomains = function (subdomains) {
  this.req.subdomains = subdomains;
  return this;
};
/**
 * Set xhr
 *
 * @param {boolean} xhr
 * @returns {ApiTest}
 */


fn.setXhr = function (xhr) {
  this.req.xhr = xhr;
  return this;
};
/**
 * Expect appended header
 *  - Can be used multiple times to expect multiple headers
 *
 * @param {string} expectedHeaderField
 * @param {*} expectedValue
 *
 * @returns {ApiTest}
 */


fn.expectAppend = function (expectedHeaderField, expectedValue) {
  this.called.push(new Promise((resolve, reject) => {
    this['resolveAppend_' + expectedHeaderField] = resolve;
    this['rejectAppend_' + expectedHeaderField] = reject;
  }));

  this['appendExpects_' + expectedHeaderField] = (headerField, value) => {
    expect(headerField).to.equal(expectedHeaderField);
    expect(value).to.deep.equal(expectedValue);
  };

  this.res.append = (headerField, value) => {
    try {
      this['appendExpects_' + headerField](headerField, value);
      this['resolveAppend_' + headerField]();
    } catch (err) {
      this['rejectAppend_' + headerField](err);
    }

    return this.res;
  };

  return this;
};
/**
 * Expect attachment
 *
 * @param {string} [expectedFilePath]
 * @returns {ApiTest}
 */


fn.expectAttachment = function (expectedFilePath) {
  this.called.push(new Promise((resolve, reject) => {
    this.resolveAttachment = resolve;
    this.rejectAttachment = reject;
  }));

  this.res.attachment = filePath => {
    try {
      expect(filePath).to.deep.equal(expectedFilePath);
      this.resolveAttachment();
    } catch (err) {
      this.rejectAttachment(err);
    }

    return this.res;
  };

  return this;
};
/**
 * Expect that cookie was set
 *  - Can be used many times to expect multiple cookies
 *
 * @param {string} expectedName
 * @param {*} expectedValue
 * @param {Object} [expectedOptions]
 * @returns {ApiTest}
 */


fn.expectCookie = function (expectedName, expectedValue, expectedOptions) {
  this.called.push(new Promise((resolve, reject) => {
    this['resolveCookie_' + expectedName] = resolve;
    this['rejectCookie_' + expectedName] = reject;
  }));

  this['cookieExpects_' + expectedName] = (headerField, value, options) => {
    expect(headerField).to.equal(expectedName);
    expect(value).to.deep.equal(expectedValue);
    expect(options).to.deep.equal(expectedOptions);
  };

  this.res.cookie = (name, value, options) => {
    try {
      this['cookieExpects_' + name](name, value, options);
      this['resolveCookie_' + name]();
    } catch (err) {
      this['rejectCookie_' + name](err);
    }

    return this.res;
  };

  return this;
};
/**
 * Expect that cookie was cleared
 *  - Can be used many times to expect that multiple cookies were cleared
 *
 * @param {string} expectedName
 * @param {Object} [expectedOptions]
 * @returns {ApiTest}
 */


fn.expectClearCookie = function (expectedName, expectedOptions) {
  this.called.push(new Promise((resolve, reject) => {
    this['resolveClearCookie_' + expectedName] = resolve;
    this['rejectClearCookie_' + expectedName] = reject;
  }));

  this['clearCookieExpects_' + expectedName] = (headerField, options) => {
    expect(headerField).to.equal(expectedName);
    expect(options).to.deep.equal(expectedOptions);
  };

  this.res.clearCookie = (name, options) => {
    try {
      this['clearCookieExpects_' + name](name, options);
      this['resolveClearCookie_' + name]();
    } catch (err) {
      this['rejectClearCookie_' + name](err);
    }

    return this.res;
  };

  return this;
};
/**
 * Expect json response
 *
 * @param expectedJson
 * @returns {ApiTest}
 */


fn.expectJson = function (expectedJson) {
  this.called.push(new Promise((resolve, reject) => {
    this.resolveJson = resolve;
    this.rejectJson = reject;
  }));

  this.res.json = json => {
    try {
      expect(json).to.deep.equal(expectedJson);
      this.resolveJson();
    } catch (err) {
      this.rejectJson(err);
    }

    return this.res;
  };

  return this;
};
/**
 * Expect redirect
 *
 * @param {number} [expectedStatus]
 * @param {string} expectedPath
 * @returns {ApiTest}
 */


fn.expectRedirect = function (expectedStatus, expectedPath) {
  this.called.push(new Promise((resolve, reject) => {
    this.resolveSend = resolve;
    this.rejectSend = reject;
  }));

  this.res.redirect = (val1, val2) => {
    try {
      if (!expectedPath) {
        expect(val1).to.equal(expectedStatus);
      } else {
        expect(val1).to.deep.equal(expectedStatus);
        expect(val2).to.equal(expectedPath);
      }

      this.resolveSend();
    } catch (err) {
      this.rejectSend(err);
    }

    return this.res;
  };

  return this;
};
/**
 * Expect send
 *
 * @param {*} expectedValue
 * @returns {ApiTest}
 */


fn.expectSend = function (expectedValue) {
  this.called.push(new Promise((resolve, reject) => {
    this.resolveSend = resolve;
    this.rejectSend = reject;
  }));

  this.res.send = value => {
    try {
      expect(value).to.deep.equal(expectedValue);
      this.resolveSend();
    } catch (err) {
      this.rejectSend(err);
    }

    return this.res;
  };

  return this;
};
/**
 * Expect sendFile
 *
 * @param {string} expectedPath
 * @param {Object} [expectedOptions]
 * @param {requestCallback} [expectedFn]
 * @returns {ApiTest}
 */


fn.expectSendFile = function (expectedPath, expectedOptions, expectedFn) {
  this.called.push(new Promise((resolve, reject) => {
    this.resolveSendFile = resolve;
    this.rejectSendFile = reject;
  }));

  this.res.sendFile = (path, options, fn) => {
    try {
      expect(path).to.equal(expectedPath);
      expect(options).to.deep.equal(expectedOptions);
      expect(fn).to.deep.equal(expectedFn);
      this.resolveSendFile();
    } catch (err) {
      this.rejectSendFile(err);
    }

    return this.res;
  };

  return this;
};
/**
 * Expect http status code
 *
 * @param expectedStatusCode
 * @returns {ApiTest}
 */


fn.expectSendStatus = function (expectedStatusCode) {
  this.called.push(new Promise((resolve, reject) => {
    this.resolveSendStatus = resolve;
    this.rejectSendStatus = reject;
  }));

  this.res.sendStatus = statusCode => {
    try {
      expect(statusCode).to.be.equal(expectedStatusCode);
      this.resolveSendStatus();
    } catch (err) {
      this.rejectSendStatus(err);
    }

    return this.res;
  };

  return this;
};
/**
 * Expect http status code
 *
 * @param expectedStatusCode
 * @returns {ApiTest}
 */


fn.expectStatus = function (expectedStatusCode) {
  this.called.push(new Promise((resolve, reject) => {
    this.resolveStatus = resolve;
    this.rejectStatus = reject;
  }));

  this.res.status = statusCode => {
    try {
      expect(statusCode).to.be.equal(expectedStatusCode);
      this.resolveStatus();
    } catch (err) {
      this.rejectStatus(err);
    }

    return this.res;
  };

  return this;
};
/**
 * Expect that end() is called
 *
 * @return {ApiTest}
 */


fn.expectEnd = function () {
  this.called.push(new Promise(resolve => {
    this.resolveEnd = resolve;
  }));

  this.res.end = () => {
    this.resolveEnd();
    return this.res;
  };

  return this;
};
/**
 * Run to initiate api call and assertions
 *
 * @returns {Promise.<*>}
 */


fn.run = function () {
  this.api(this.req, this.res);
  return Promise.all(this.called);
};

module.exports = ApiTest;
