# stacktrace.js
![version](https://img.shields.io/badge/Latest%20version-1.0.4-1abc9c.svg?style=flat-square) 
![license](https://img.shields.io/hexpm/l/plug.svg?style=flat-square)

A simple and easy jQuery plugin for highlighting .NET stack traces

#### Demo
![stackTrace.js - demo](example.jpg)

#### Initialization
```
$('.stacktrace').stackTrace();
```

#### Default values for classes
```
$('.stacktrace').stackTrace({
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

#### Ready to go css
```
pre, code {background-color:#333; color: #ffffff;}
.st-type {color: #0a8472; font-weight: bolder;}
.st-method {color: #70c9ba; font-weight: bolder;}
.st-frame-params {color: #ffffff; font-weight: normal;}
.st-param-type {color: #0a8472;}
.st-param-name {color: #ffffff;}
.st-file {color:#f8b068;}
.st-line {color:#ff4f68;}
```
