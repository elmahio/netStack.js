# stacktrace.js
A simple and easy jQuery plugin for highlighting .NET stack traces

#### Initialisation
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
