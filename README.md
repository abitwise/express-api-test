# express-api-test

Fast unit testing for [express.js](https://expressjs.com) 4.x APIs

```javascript
it('should respond with Hello <name>', () => {
  return new ApiTest(api.sayHello)
    .setParams({ name: 'John' })
    .expectStatus(200)
    .expectSend('Hello John')
    .run()
})
```

Testing [express.js](https://expressjs.com) APIs is Easy Peasy with express-api-test
* No need to fiddle with req/res mocks.
* No need to write boilerplate asserts
* No need to start http server, lightning-fast tests
* Fluent-interface: helps with IDE auto-suggestions
* Easily readable tests, easier to maintain
* Will cover all the express.js request and response parameters and methods soon!

## Documentation

ApiTest documentation is [here in JSDoc.](https://github.com/abitwise/express-api-test/tree/master/docs/index.html)

## Installation

```bash
$ npm i -g npm
$ npm i --save-dev express-api-test
```

## Usage

Examples:

```javascript
const ApiTest = require('express-api-test)

describe('Food API', () => {
  describe('getFood', () => {
    it('should respond with Potato', () => {
      return new ApiTest(api.getFood)
        .setParams({ name: 'Potato', amount: 5 })
        .expectStatus(200)
        .expectJson({ food: 'Potato x 5'})
        .run()
    })
  })
})
```

You can use express-api-test with [node-swagger](https://github.com/swagger-api/swagger-node) APIs, instead of using setParams, use setSwaggerParams.
Example:

```javascript
const ApiTest = require('express-api-test)

describe('Swagger Fruit API', () => {
  describe('getFruitBasket', () => {
    it('should respond with Carrot', () => {
      return new ApiTest(api.getFruitBasket)
        .setSwaggerParams({ name: 'Apple', amount: 10 })
        .expectStatus(200)
        .expectJson({ fruitBasket: 'Apple x 10'})
        .run()
    })
  })
})
```
