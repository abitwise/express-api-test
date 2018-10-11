'use strict'
/* eslint-disable no-unused-expressions */

const util = require('util')
const _ = require('lodash')
const HttpStatus = require('http-status')
const testApi = require('./api')
const ApiTest = require('../src/express-api-test')

describe('ApiTest', () => {
  [
    { method: 'setAppMock', value: sandbox.stub(), expectedSetParameters: ['req.app', 'res.app'] },
    { method: 'setBaseUrl', value: '/api/v1', expectedSetParameter: 'req.baseUrl' },
    { method: 'setBody', value: { test: '123' }, expectedSetParameter: 'req.body' },
    { method: 'setCookies', value: { cookie: 'test' }, expectedSetParameter: 'req.cookies' },
    { method: 'setFresh', value: true, expectedSetParameter: 'req.fresh' },
    { method: 'setHostname', value: 'example.com', expectedSetParameter: 'req.hostname' },
    { method: 'setIp', value: '192.168.0.1', expectedSetParameter: 'req.ip' },
    { method: 'setIps', value: ['192.168.0.1', '127.0.0.1'], expectedSetParameter: 'req.ips' },
    { method: 'setMethod', value: 'GET', expectedSetParameter: 'req.method' },
    { method: 'setOriginalUrl', value: '/hello', expectedSetParameter: 'req.originalUrl' },
    { method: 'setPath', value: '/hello', expectedSetParameter: 'req.path' },
    { method: 'setProtocol', value: 'http', expectedSetParameter: 'req.protocol' },
    { method: 'setQuery', value: { test: '123' }, expectedSetParameter: 'req.query' },
    {
      method: 'setRoute',
      value: { path: '/hello', stack: [{}], methods: { get: true } },
      expectedSetParameter: 'req.route'
    },
    { method: 'setSecure', value: false, expectedSetParameter: 'req.secure' },
    {
      method: 'setSignedCookies',
      value: { user: 'tobi.CP7AWaXDfAKIRfH49dQzKJx7sKzzSoPq7/AcBBRVwlI3' },
      expectedSetParameter: 'req.signedCookies'
    },
    { method: 'setStale', value: false, expectedSetParameter: 'req.stale' },
    { method: 'setSubdomains', value: ['test', 'www'], expectedSetParameter: 'req.subdomains' },
    { method: 'setXhr', value: true, expectedSetParameter: 'req.xhr' }
  ].forEach(unitTest => {
    describe(unitTest.method, () => {
      it(util.format('should set %s', unitTest.expectedSetParameter), async () => {
        let test = new ApiTest(testApi.emptyApi)

        await expect(test).to.have.property(unitTest.method).which.is.a('function')
        test[unitTest.method](unitTest.value)

        if (unitTest.hasOwnProperty('expectedSetParameter')) {
          let actualValue = _.get(test, unitTest.expectedSetParameter)
          await expect(actualValue).to.deep.equal(unitTest.value)
        }

        if (unitTest.hasOwnProperty('expectedSetParameters')) {
          unitTest.expectedSetParameters.forEach(expectedSetParameter => {
            let actualValue = _.get(test, expectedSetParameter)

            return expect(actualValue).to.deep.equal(unitTest.value)
          })
        }
      })
    })
  })

  describe('setParams', () => {
    it('should set req.params', async () => {
      let params = { test: '123' }
      let test = new ApiTest(testApi.emptyApi)
        .setParams(params)

      await expect(test.req.params).to.deep.equal(params)
      await expect(test.req.param('test')).to.deep.equal('123')
    })
  })

  describe('setSwaggerParams', () => {
    it('should set req.swagger.params', async () => {
      let params = {
        foo: 'bar',
        numberFoo: 5
      }

      let test = new ApiTest(testApi.emptyApi)
        .setSwaggerParams(params)

      await expect(test.req.swagger).to.be.an('Object')
      await expect(test.req.swagger.params).to.be.an('Object')
      await expect(test.req.swagger.params.foo.value).to.equal(params.foo)
      await expect(test.req.swagger.params.numberFoo.value).to.equal(params.numberFoo)
    })
  });

  [
    { method: 'expectJson', value: { result: '123' }, expectedFunction: 'res.json' },
    { method: 'expectStatus', value: HttpStatus.OK, expectedFunction: 'res.status' },
    { method: 'expectEnd', value: null, expectedFunction: 'res.end' },
    {
      method: 'expectAppend',
      values: ['Link', ['<http://localhost/>', '<http://localhost:3000/>']],
      expectedFunction: 'res.append'
    },
    { method: 'expectAttachment', value: 'path/to/file.jpg', expectedFunction: 'res.attachment' },
    { method: 'expectCookie', values: ['name', 'tobi', { signed: true }], expectedFunction: 'res.cookie' },
    { method: 'expectClearCookie', values: ['name', { path: '/admin' }], expectedFunction: 'res.clearCookie' },
    { method: 'expectSend', value: 'Sorry, we cannot find that!', expectedFunction: 'res.send' },
    { method: 'expectSendFile', values: ['photo.jpg', {}, () => {}], expectedFunction: 'res.sendFile' },
    { method: 'expectSendStatus', value: HttpStatus.OK, expectedFunction: 'res.sendStatus' },
    { method: 'expectRedirect', values: [301, 'http://example.com'], expectedFunction: 'res.redirect' },
    { method: 'expectRedirect', value: 'http://example.com', expectedFunction: 'res.redirect' }
  ].forEach(unitTest => {
    describe(unitTest.method, () => {
      it(util.format('should set %s function and add wait promise', unitTest.expectedFunction), async () => {
        let test = new ApiTest(testApi.apiWithParams)
          .setParams({ test: '123' })

        if (unitTest.values) {
          test[unitTest.method](...unitTest.values)
        } else {
          test[unitTest.method](unitTest.value)
        }

        let expectedParameter = _.get(test, unitTest.expectedFunction)

        await expect(expectedParameter).to.be.a('function')
        await expect(test.called).to.be.an('array')
        await expect(test.called.length).to.equal(1)
        await expect(test.called[0]).to.be.a('promise')
      })
    })
  })

  describe('run', () => {
    it('should call api and wait for all promises', async () => {
      let mockApi = sandbox.stub()
      let test = new ApiTest(mockApi)
      let expectedReq = test.req
      let expectedRes = test.res

      await test.run()
      await expect(mockApi).to.have.been.calledWith(expectedReq, expectedRes)
    })

    it('should work with multiple appends', () => {
      return new ApiTest(testApi.apiWithMultipleAppends)
        .setParams({})
        .expectAppend('Link', ['<http://localhost/>', '<http://localhost:3000/>'])
        .expectAppend('Set-Cookie', 'foo=bar; Path=/; HttpOnly')
        .expectAppend('Warning', '199 Miscellaneous warning')
        .expectStatus(HttpStatus.OK)
        .run()
    })

    it('should work with multiple cookies', () => {
      return new ApiTest(testApi.apiWithMultipleCookies)
        .setParams({})
        .expectCookie('cart', { items: [1, 2, 3] })
        .expectCookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
        .expectCookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true })
        .expectStatus(HttpStatus.OK)
        .run()
    })

    it('should work with multiple clear-cookies', () => {
      return new ApiTest(testApi.apiWithMultipleClearCookies)
        .setParams({})
        .expectClearCookie('rememberme')
        .expectClearCookie('name', { path: '/admin' })
        .expectStatus(HttpStatus.OK)
        .run()
    })

    it('should work with params', () => {
      return new ApiTest(testApi.apiWithParams)
        .setParams({ test: '123' })
        .expectStatus(HttpStatus.OK)
        .expectJson({ response: '123' })
        .run()
    })

    it('should work with params and no expects', () => {
      return new ApiTest(testApi.apiWithParams)
        .setParams({ test: '123' })
        .run()
    })

    it('should work with query', () => {
      return new ApiTest(testApi.apiWithQuery)
        .setQuery({ test: '123' })
        .expectStatus(HttpStatus.OK)
        .expectJson({ response: '123' })
        .run()
    })

    it('should work with body', () => {
      return new ApiTest(testApi.apiWithBody)
        .setBody({ test: '123' })
        .expectStatus(HttpStatus.OK)
        .expectJson({ response: '123' })
        .run()
    })
  })
})
