# Contributing

**Add your changes and make a pull request!**

## Setting up Webstorm/IntelliJ IDEA (Ultimate)
You need to install TrueScript community stubs in order to have better suggestions.
To install, go to javascript libraries and then click "Download" 

*Webstorm preferences/settings > Language & Frameworks > JavaScript > Libraries*

**download following community stubs:**
```
chai
chai-as-promised
mocha
should
sinon
sinon-chai
```

## Maintaining instructions

### When you need to publish new version

* Run tests and coding standard check
```bash
npm test
npm run lint
```
* Update version number in package.json (commit this change)
* Create new build and API doc
```bash
npm run build
npm run docs
```
* Publish to npm
```bash
npm login
npm publish
```