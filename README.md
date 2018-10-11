# express-api-test

Testing [express.js](https://expressjs.com) APIs is Easy Peasy with express-api-test.
* No need to fiddle with the pesky req/res mocks.
* No need to write boilerplate asserts
* Fluent-interface

Check out the example:

```ecmascript 6
const ApiTest = require('express-api-test)

describe('FooBar API', () => {
  describe('getFooBar', () => {
    it('should respond with FooBar', () => {
      return new ApiTest(api.getFooBar)
        .setParams({ foo: 'bar' })
        .expectStatus(200)
        .expectJson({ message: 'FooBar'})
        .run();
    })
  })
})
```

express-api-test covers all the express.js request and response references, speeds up express.js API testing
and makes writing tests simple.

**Full API Reference coming up soon!**

## [node-swagger](https://github.com/swagger-api/swagger-node) support

You can use express-api-test for node-swagger apis, instead of using setParams, use setSwaggerParams.

Example:

```ecmascript 6
const ApiTest = require('express-api-test)

describe('FooBar Swagger API', () => {
  describe('getFooBar', () => {
    it('should respond with FooBar', () => {
      return new ApiTest(api.getFooBar)
        .setSwaggerParams({ foo: 'bar' })
        .expectStatus(200)
        .expectJson({ message: 'FooBar'})
        .run();
    })
  })
})
```
