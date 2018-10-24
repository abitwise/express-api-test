<a name="ApiTest"></a>

## ApiTest
**Kind**: global class  

* [ApiTest](#ApiTest)
    * [new ApiTest(apiMethod)](#new_ApiTest_new)
    * [.setAppMock(appMock)](#ApiTest+setAppMock) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.setBaseUrl(baseUrl)](#ApiTest+setBaseUrl) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.setBody(body)](#ApiTest+setBody) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.setCookies(cookies)](#ApiTest+setCookies) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.setFresh(fresh)](#ApiTest+setFresh) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.setHostname(hostname)](#ApiTest+setHostname) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.setIp(ip)](#ApiTest+setIp) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.setIps(ips)](#ApiTest+setIps) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.setMethod(method)](#ApiTest+setMethod) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.setOriginalUrl(originalUrl)](#ApiTest+setOriginalUrl) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.setParams(params)](#ApiTest+setParams) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.setPath(path)](#ApiTest+setPath) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.setProtocol(protocol)](#ApiTest+setProtocol) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.setRequestHeaders(headers)](#ApiTest+setRequestHeaders) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.setSwaggerParams(params)](#ApiTest+setSwaggerParams) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.setQuery(query)](#ApiTest+setQuery) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.setRoute(route)](#ApiTest+setRoute) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.setSecure(secure)](#ApiTest+setSecure) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.setSignedCookies(signedCookies)](#ApiTest+setSignedCookies) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.setStale(stale)](#ApiTest+setStale) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.setSubdomains(subdomains)](#ApiTest+setSubdomains) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.setXhr(xhr)](#ApiTest+setXhr) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.expectAppend(expectedHeaderField, expectedValue)](#ApiTest+expectAppend) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.expectAttachment([expectedFilePath])](#ApiTest+expectAttachment) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.expectCookie(expectedName, expectedValue, [expectedOptions])](#ApiTest+expectCookie) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.expectClearCookie(expectedName, [expectedOptions])](#ApiTest+expectClearCookie) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.expectDownload(expectedPath, [expectedFilename], [expectedOptions], [expectedFn])](#ApiTest+expectDownload) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.expectJson(expectedJson)](#ApiTest+expectJson) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.expectJsonp(expectedJsonp)](#ApiTest+expectJsonp) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.expectLinks(expectedLinks)](#ApiTest+expectLinks) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.expectLocation(expectedLocation)](#ApiTest+expectLocation) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.expectRedirect([expectedStatus], expectedPath)](#ApiTest+expectRedirect) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.expectResponseHeaders(expectedHeaderField, [expectedValue])](#ApiTest+expectResponseHeaders) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.expectSend(expectedValue)](#ApiTest+expectSend) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.expectSendFile(expectedPath, [expectedOptions], [expectedFn])](#ApiTest+expectSendFile) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.expectSendStatus(expectedStatusCode)](#ApiTest+expectSendStatus) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.expectStatus(expectedStatusCode)](#ApiTest+expectStatus) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.expectEnd()](#ApiTest+expectEnd) ⇒ [<code>ApiTest</code>](#ApiTest)
    * [.run()](#ApiTest+run) ⇒ <code>Promise.&lt;\*&gt;</code>

<a name="new_ApiTest_new"></a>

### new ApiTest(apiMethod)
Express.js API Testing Utility, helps to test API controllers made for Express.js 4.x


| Param | Type | Description |
| --- | --- | --- |
| apiMethod | <code>function</code> | API method |

**Example**  
```js
const ApiTest = require('express-api-test')

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
<a name="ApiTest+setAppMock"></a>

### apiTest.setAppMock(appMock) ⇒ [<code>ApiTest</code>](#ApiTest)
Set mock for app

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| appMock | <code>Object</code> | Express app mock |

<a name="ApiTest+setBaseUrl"></a>

### apiTest.setBaseUrl(baseUrl) ⇒ [<code>ApiTest</code>](#ApiTest)
Set baseUrl

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| baseUrl | <code>string</code> | Request base url |

<a name="ApiTest+setBody"></a>

### apiTest.setBody(body) ⇒ [<code>ApiTest</code>](#ApiTest)
Set body parameters (submitted/posted)

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| body | <code>Object</code> | Request body |

**Example**  
```js
{
    username: 'bob',
    type: 'investor'
  }
```
<a name="ApiTest+setCookies"></a>

### apiTest.setCookies(cookies) ⇒ [<code>ApiTest</code>](#ApiTest)
Set cookies

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| cookies | <code>Object</code> | Request cookies |

**Example**  
```js
For cookie: name=value
Use:
{
  name: 'value'
}
```
<a name="ApiTest+setFresh"></a>

### apiTest.setFresh(fresh) ⇒ [<code>ApiTest</code>](#ApiTest)
Set fresh

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| fresh | <code>boolean</code> | Is fresh request? |

<a name="ApiTest+setHostname"></a>

### apiTest.setHostname(hostname) ⇒ [<code>ApiTest</code>](#ApiTest)
Set hostname

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| hostname | <code>string</code> | Request hostname |

<a name="ApiTest+setIp"></a>

### apiTest.setIp(ip) ⇒ [<code>ApiTest</code>](#ApiTest)
Set ip

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| ip | <code>string</code> | Request IP |

<a name="ApiTest+setIps"></a>

### apiTest.setIps(ips) ⇒ [<code>ApiTest</code>](#ApiTest)
Set ips

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| ips | <code>Array.&lt;string&gt;</code> | Request IPS |

<a name="ApiTest+setMethod"></a>

### apiTest.setMethod(method) ⇒ [<code>ApiTest</code>](#ApiTest)
Set method

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | Request method |

<a name="ApiTest+setOriginalUrl"></a>

### apiTest.setOriginalUrl(originalUrl) ⇒ [<code>ApiTest</code>](#ApiTest)
Set original url

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| originalUrl | <code>string</code> | Request original url |

<a name="ApiTest+setParams"></a>

### apiTest.setParams(params) ⇒ [<code>ApiTest</code>](#ApiTest)
Set request parameters

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | Request parameters |

**Example**  
```js
For: /user/:uid/photos/:file
Use:
 {
   uid: 'user123',
   file: 'file123'
 }
```
<a name="ApiTest+setPath"></a>

### apiTest.setPath(path) ⇒ [<code>ApiTest</code>](#ApiTest)
Set path

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Request path |

<a name="ApiTest+setProtocol"></a>

### apiTest.setProtocol(protocol) ⇒ [<code>ApiTest</code>](#ApiTest)
Set protocol

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| protocol | <code>string</code> | Request protocol |

<a name="ApiTest+setRequestHeaders"></a>

### apiTest.setRequestHeaders(headers) ⇒ [<code>ApiTest</code>](#ApiTest)
Set request headers which are used by req.get method

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Description |
| --- | --- |
| headers | Request headers |

<a name="ApiTest+setSwaggerParams"></a>

### apiTest.setSwaggerParams(params) ⇒ [<code>ApiTest</code>](#ApiTest)
Set swagger params

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Description |
| --- | --- |
| params | Swagger request parameters |

<a name="ApiTest+setQuery"></a>

### apiTest.setQuery(query) ⇒ [<code>ApiTest</code>](#ApiTest)
Set query parameters

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>Object</code> | Request query |

**Example**  
```js
For /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
Use:
  {
    order: 'desc',
    shoe: {
      color: 'blue',
      type: 'converse'
    }
  }
```
<a name="ApiTest+setRoute"></a>

### apiTest.setRoute(route) ⇒ [<code>ApiTest</code>](#ApiTest)
Set route

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| route | <code>Object</code> | Request route |

<a name="ApiTest+setSecure"></a>

### apiTest.setSecure(secure) ⇒ [<code>ApiTest</code>](#ApiTest)
Set secure

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| secure | <code>boolean</code> | Request is secure |

<a name="ApiTest+setSignedCookies"></a>

### apiTest.setSignedCookies(signedCookies) ⇒ [<code>ApiTest</code>](#ApiTest)
Set signed cookies

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| signedCookies | <code>Object</code> | Request signed cookies |

<a name="ApiTest+setStale"></a>

### apiTest.setStale(stale) ⇒ [<code>ApiTest</code>](#ApiTest)
Set stale

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| stale | <code>boolean</code> | Request is stale |

<a name="ApiTest+setSubdomains"></a>

### apiTest.setSubdomains(subdomains) ⇒ [<code>ApiTest</code>](#ApiTest)
Set subdomains

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| subdomains | <code>Array.&lt;string&gt;</code> | Request subdomains |

<a name="ApiTest+setXhr"></a>

### apiTest.setXhr(xhr) ⇒ [<code>ApiTest</code>](#ApiTest)
Set xhr

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| xhr | <code>boolean</code> | Request xhr |

<a name="ApiTest+expectAppend"></a>

### apiTest.expectAppend(expectedHeaderField, expectedValue) ⇒ [<code>ApiTest</code>](#ApiTest)
Expect appended header: can be used multiple times to expect multiple headers

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| expectedHeaderField | <code>string</code> | Expected header field |
| expectedValue | <code>\*</code> | Expected header value |

<a name="ApiTest+expectAttachment"></a>

### apiTest.expectAttachment([expectedFilePath]) ⇒ [<code>ApiTest</code>](#ApiTest)
Expect attachment

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| [expectedFilePath] | <code>string</code> | Expected file path |

<a name="ApiTest+expectCookie"></a>

### apiTest.expectCookie(expectedName, expectedValue, [expectedOptions]) ⇒ [<code>ApiTest</code>](#ApiTest)
Expect that cookie was set: can be used many times to expect multiple cookies

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| expectedName | <code>string</code> | Expected cookie name |
| expectedValue | <code>\*</code> | Expected cookie value |
| [expectedOptions] | <code>Object</code> | Expected cookie options |

<a name="ApiTest+expectClearCookie"></a>

### apiTest.expectClearCookie(expectedName, [expectedOptions]) ⇒ [<code>ApiTest</code>](#ApiTest)
Expect that cookie was cleared: can be used many times to expect that multiple cookies were cleared

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| expectedName | <code>string</code> | Expected cleared cookie name |
| [expectedOptions] | <code>Object</code> | Expected options |

<a name="ApiTest+expectDownload"></a>

### apiTest.expectDownload(expectedPath, [expectedFilename], [expectedOptions], [expectedFn]) ⇒ [<code>ApiTest</code>](#ApiTest)
Expect file transfer

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type |
| --- | --- |
| expectedPath | <code>string</code> | 
| [expectedFilename] | <code>string</code> | 
| [expectedOptions] | <code>Object</code> | 
| [expectedFn] | <code>requestCallback</code> | 

<a name="ApiTest+expectJson"></a>

### apiTest.expectJson(expectedJson) ⇒ [<code>ApiTest</code>](#ApiTest)
Expect json response

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| expectedJson | <code>Object</code> | Expected json response |

<a name="ApiTest+expectJsonp"></a>

### apiTest.expectJsonp(expectedJsonp) ⇒ [<code>ApiTest</code>](#ApiTest)
Expect jsonp response

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| expectedJsonp | <code>Object</code> | Expected jsonp response |

<a name="ApiTest+expectLinks"></a>

### apiTest.expectLinks(expectedLinks) ⇒ [<code>ApiTest</code>](#ApiTest)
Expect that res.links was called

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param |
| --- |
| expectedLinks | 

<a name="ApiTest+expectLocation"></a>

### apiTest.expectLocation(expectedLocation) ⇒ [<code>ApiTest</code>](#ApiTest)
Expect that res.location was called

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type |
| --- | --- |
| expectedLocation | <code>string</code> | 

<a name="ApiTest+expectRedirect"></a>

### apiTest.expectRedirect([expectedStatus], expectedPath) ⇒ [<code>ApiTest</code>](#ApiTest)
Expect res.redirect was called

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| [expectedStatus] | <code>number</code> | Expected redirect status |
| expectedPath | <code>string</code> | Expected redirect path |

<a name="ApiTest+expectResponseHeaders"></a>

### apiTest.expectResponseHeaders(expectedHeaderField, [expectedValue]) ⇒ [<code>ApiTest</code>](#ApiTest)
Expect response headers which are used by res.get and set by res.set method

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| expectedHeaderField | <code>string</code> \| <code>Object</code> | Request header or headers (when object) |
| [expectedValue] | <code>string</code> |  |

<a name="ApiTest+expectSend"></a>

### apiTest.expectSend(expectedValue) ⇒ [<code>ApiTest</code>](#ApiTest)
Expect send

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| expectedValue | <code>\*</code> | Expected send response value |

<a name="ApiTest+expectSendFile"></a>

### apiTest.expectSendFile(expectedPath, [expectedOptions], [expectedFn]) ⇒ [<code>ApiTest</code>](#ApiTest)
Expect sendFile

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Type | Description |
| --- | --- | --- |
| expectedPath | <code>string</code> | Expected path |
| [expectedOptions] | <code>Object</code> | Expected options |
| [expectedFn] | <code>requestCallback</code> | Expected callback function |

<a name="ApiTest+expectSendStatus"></a>

### apiTest.expectSendStatus(expectedStatusCode) ⇒ [<code>ApiTest</code>](#ApiTest)
Expect http status code

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Description |
| --- | --- |
| expectedStatusCode | Expected send status |

<a name="ApiTest+expectStatus"></a>

### apiTest.expectStatus(expectedStatusCode) ⇒ [<code>ApiTest</code>](#ApiTest)
Expect http status code

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  

| Param | Description |
| --- | --- |
| expectedStatusCode | Expected status code |

<a name="ApiTest+expectEnd"></a>

### apiTest.expectEnd() ⇒ [<code>ApiTest</code>](#ApiTest)
Expect that end() is called

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  
<a name="ApiTest+run"></a>

### apiTest.run() ⇒ <code>Promise.&lt;\*&gt;</code>
Run test: initiates api call and assertions

**Kind**: instance method of [<code>ApiTest</code>](#ApiTest)  
