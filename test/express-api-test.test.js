'use strict'
/* eslint-disable no-unused-expressions */

const HttpStatus = require('http-status')
const testApi = require('./api')
const ApiTest = require('../src/express-api-test')

describe('ApiTest', () => {
  describe('setAppMock', () => {
    it('should set mock as req.app', () => {
      let mock = sandbox.stub()
      let test = new ApiTest(testApi.emptyApi)
        .setAppMock(mock)

      return expect(test.req.app).to.deep.equal(mock)
    })
  })

  describe('setParams', () => {
    it('should set req.params', () => {
      let params = { test: '123' }
      let test = new ApiTest(testApi.emptyApi)
        .setParams(params)

      return expect(test.req.params).to.deep.equal(params)
    })
  })

  describe('setQuery', () => {
    it('should set req.query', () => {
      let query = { test: '123' }
      let test = new ApiTest(testApi.emptyApi)
        .setQuery(query)

      return expect(test.req.query).to.deep.equal(query)
    })
  })

  describe('setBody', () => {
    it('should set req.body', () => {
      let body = { test: '123' }
      let test = new ApiTest(testApi.emptyApi)
        .setBody(body)

      return expect(test.req.body).to.deep.equal(body)
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
