# netStack.js
[![npm](https://img.shields.io/npm/v/netstack.js.svg)](https://www.npmjs.com/package/netstack.js)
[![license](https://img.shields.io/hexpm/l/plug.svg?style=flat-square)](#)
![Tests](https://github.com/elmahio/netstack.js/actions/workflows/test.yml/badge.svg)


A simple and easy JavaScript library for highlighting .NET stack traces

#### Stacktrace - Language support
[![English](images/flags/US%20-%20United%20States.svg)](#) [![Danish](images/flags/DK%20-%20Denmark.svg)](#) [![German](images/flags/DE%20-%20Germany.svg)](#) [![Spanish](images/flags/ES%20-%20Spain.svg)](#) [![Russian](images/flags/RU%20-%20Russian%20Federation.svg)](#) [![Chinese](images/flags/CN%20-%20China.svg)](#)

#### Demo
[![netStack.js - demo](images/example.jpg)](https://elmah.io/tools/stack-trace-formatter/)

[Stack Trace Formatter - Online pretty print of .NET stack traces](https://elmah.io/tools/stack-trace-formatter/)

#### Initialization
Using a string that represents a CSS selector:
```javascript
const stack = new netStack('.stacktrace');
```
Passing an HTMLElement object:
```javascript
const stackElement = document.querySelector('.stacktrace');
const stack = new netStack(stackElement);
```

#### Default values for classes
```javascript
const stack = new netStack('.stacktrace', {
    frame: 'st-frame',
    type: 'st-type',
    method: 'st-method',
    paramsList: 'st-frame-params',
    paramType: 'st-param-type',
    paramName: 'st-param-name',
    file: 'st-file',
    line: 'st-line'
});
```

#### Options
##### prettyprint: boolean
Default: false. 
Pretty prints your stacktrace.
```javascript
const stack = new netStack('.stacktrace', {
    prettyprint: true
});
```

#### Ready to go css
```css
pre, code {background-color:#333; color: #ffffff;}
.st-type {color: #0a8472; font-weight: bolder;}
.st-method {color: #70c9ba; font-weight: bolder;}
.st-frame-params {color: #ffffff; font-weight: normal;}
.st-param-type {color: #0a8472;}
.st-param-name {color: #ffffff;}
.st-file {color:#f8b068;}
.st-line {color:#ff4f68;}
```

---
### Acknowledgments

* [IgoR-NiK](https://github.com/IgoR-NiK)