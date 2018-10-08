global.chai = require('chai')
global.sinon = require('sinon')
global.sinonChai = require('sinon-chai')

// Initiate chai
global.chai.should()
global.expect = global.chai.expect
global.chai.use(global.sinonChai)

// Set up sinon (mock) sandbox
global.sandbox = global.sinon.createSandbox()

afterEach(done => {
  global.sandbox.restore()

  done()
})
