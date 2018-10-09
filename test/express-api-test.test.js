'use strict'
/* eslint-disable no-unused-expressions */

const util = require('util')
const _ = require('lodash')
const HttpStatus = require('http-status')
const testApi = require('./api')
const ApiTest = require('../src/express-api-test')

describe('ApiTest', () => {
  [
    { method: 'setAppMock', value: sandbox.stub(), expectedSetParameter: 'req.app' },
    { method: 'setBaseUrl', value: '/api/v1', expectedSetParameter: 'req.baseUrl' },
    { method: 'setQuery', value: { test: '123' }, expectedSetParameter: 'req.query' },
    { method: 'setBody', value: { test: '123' }, expectedSetParameter: 'req.body' },
    { method: 'setCookies', value: { cookie: 'test' }, expectedSetParameter: 'req.cookies' },
    { method: 'setFresh', value: true, expectedSetParameter: 'req.fresh' },
    { method: 'setHostname', value: 'example.com', expectedSetParameter: 'req.hostname' }
  ].forEach(unitTest => {
    describe(unitTest.method, () => {
      it(util.format('should set %s', unitTest.expectedSetParameter), async () => {
        let test = new ApiTest(testApi.emptyApi)

        await expect(test).to.have.property(unitTest.method).which.is.a('function')
        test[unitTest.method](unitTest.value)

        let actualValue = _.get(test, unitTest.expectedSetParameter)
        await expect(actualValue).to.deep.equal(unitTest.value)
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

  describe('expectJson', () => {
    it('should set res.json function and add wait promise', async () => {
      let test = new ApiTest(testApi.apiWithParams)
        .setParams({ test: '123' })
        .expectJson({ result: '123' })

      await expect(test.res.json).to.be.a('function')
      await expect(test.called).to.be.an('array')
      await expect(test.called.length).to.equal(1)
      await expect(test.called[0]).to.be.a('promise')
    })
  })

  describe('expectStatus', () => {
    it('should set res.status function and add wait promise', async () => {
      let test = new ApiTest(testApi.apiWithParams)
        .setParams({ test: '123' })
        .expectStatus(HttpStatus.OK)

      await expect(test.res.status).to.be.a('function')
      await expect(test.called).to.be.an('array')
      await expect(test.called.length).to.equal(1)
      await expect(test.called[0]).to.be.a('promise')
    })
  })

  describe('expectEnd', () => {
    it('should set res.end function and add wait promise', async () => {
      let test = new ApiTest(testApi.apiWithParams)
        .setParams({ test: '123' })
        .expectEnd()

      await expect(test.res.end).to.be.a('function')
      await expect(test.called).to.be.an('array')
      await expect(test.called.length).to.equal(1)
      await expect(test.called[0]).to.be.a('promise')
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

    it('should work with params', () => {
      return new ApiTest(testApi.apiWithParams)
        .setParams({ test: '123' })
        .expectStatus(HttpStatus.OK)
        .expectJson({ response: '123' })
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
