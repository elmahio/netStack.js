/*!
 * netStack v2.0.0
 * A simple and easy JavaScript library for highlighting .NET stack traces
 * License: Apache 2
 * Author: https://elmah.io
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node, CommonJS-like
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.netStack = factory();
    }
}(typeof self !== 'undefined' ? self : this, function() {

    function netStack(element, options) {
        if (typeof document !== 'undefined') {
            if (typeof element === 'string') {
                this.element = document.querySelector(element);
            } else if (element instanceof HTMLElement) {
                this.element = element;
            } else {
                throw new Error('The element parameter must be a selector string or an HTMLElement.');
            }
        } else {
            throw new Error('netStack requires a DOM environment');
        }
        
        // Default values for classes
        this.settings = extend({
            prettyprint: false,
            frame: 'st-frame',
            type: 'st-type',
            method: 'st-method',
            paramsList: 'st-frame-params',
            paramType: 'st-param-type',
            paramName: 'st-param-name',
            file: 'st-file',
            line: 'st-line'
        }, options);

        this.languages = [
            { name: 'english', at: 'at', in: 'in', line: 'line' },
            { name: 'danish', at: 'ved', in: 'i', line: 'linje' },
            { name: 'german', at: 'bei', in: 'in', line: 'Zeile' },
            { name: 'russian', at: 'в', in: 'в', line: 'строка' },
            { name: 'chinese', at: '在', in: '位置', line: '行号' }
        ];

        this.init();
    }

    function extend() {
        for (var i = 1; i < arguments.length; i++) {
            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    arguments[0][key] = arguments[i][key];
                }
            }
        }
        return arguments[0];
    }

    netStack.prototype.search = function(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].name === nameKey) {
                return myArray[i];
            }
        }
        return null;
    };

    netStack.prototype.replacer = function(args, at_language) {
        if (args[0].substring(0).match(/(-{3}&gt;)/)) {
            return '\r\n ' + args[0];
        } else if (args[0].substring(0).match(/(-{3})/)) {
            return '\r\n   ' + args[0];
        } else {
            return '\r\n   ' + at_language + ' ' + args[2] + '(' + args[3] + ')';
        }
    };

    netStack.prototype.formatException = function(exceptionMessage, at_language) {
        var result = exceptionMessage || '';
        var searchReplaces = [
            {
                find: new RegExp('(-{3}&gt;\\s)(.*?)(?=\\s-{3}|(\\s)+' + at_language + ')', 'g'),
                repl: null
            },
            {
                find: /(-{3}\s)(.*?)(-{3})/gm,
                repl: null
            },
            {
                find: new RegExp('(\\s)' + at_language + ' ([^-:]*?)\\((.*?)\\)', 'g'),
                repl: null
            }
        ];

        var self = this;
        searchReplaces.forEach(function(item) {
            if (item.repl == null) {
                result = result.replace(item.find, function() {
                    return self.replacer(arguments, at_language);
                });
            } else {
                result = result.replace(item.find, item.repl);
            }
        });
        return result;
    };

    netStack.prototype.init = function() {
        // Get the stacktrace, sanitize it, and split it into lines
        var stacktrace = this.element.textContent,
            sanitizedStack = stacktrace.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
            lines = sanitizedStack.split('\n'),
            lang = '',
            clone = '';

        // look for the language
        for (var i = 0; i < lines.length; ++i) {
            if (lang === '') {
                var regexes = {
                    english: /\s+at .*\)/,
                    danish: /\s+ved .*\)/,
                    german: /\s+bei .*\)/,
                    russian: /\s+в .*\)/,
                    chinese: /\s+在 .*\)/
                };

                for (var key in regexes) {
                    if (regexes[key].test(lines[i])) {
                        lang = key;
                        break;
                    }
                }
            }
        }

        if (lang === '') return;

        var selectedLanguage = this.search(lang, this.languages);
        this.language = selectedLanguage.name;

        // Pritty print result if is set to true
        if (this.settings.prettyprint) {
            sanitizedStack = this.formatException(sanitizedStack, selectedLanguage.at);
            lines = sanitizedStack.split('\n');
        }

        for (var i = 0; i < lines.length; ++i) {
            var li = lines[i],
                hli = new RegExp('(\\S*)' + selectedLanguage.at + ' .*\\)');

            if (hli.test(lines[i])) {
                
                // Frame
                var regFrame = new RegExp('(\\S*)' + selectedLanguage.at + ' .*?\\)'),
                    partsFrame = String(regFrame.exec(lines[i]));

                if (partsFrame.substring(partsFrame.length - 1) == ',') {
                    partsFrame = partsFrame.slice(0, -1);
                }

                partsFrame = partsFrame.replace(selectedLanguage.at + ' ', '');

                // Frame -> ParameterList
                var regParamList = /\(.*\)/,
                    partsParamList = String(regParamList.exec(lines[i]));

                // Frame -> Params
                var partsParams = partsParamList.replace('(', '').replace(')', ''),
                    arrParams = partsParams.split(', '),
                    stringParam = '';

                for (var x = 0; x < arrParams.length; ++x) {
                    var param = arrParams[x].split(' '),
                        paramType = param[0],
                        paramName = param[1];

                    if (param[0] !== "null" && param[0] !== '') {
                        var theParam = '<span class="' + this.settings.paramType + '">' + paramType + '</span>' + ' ' + '<span class="' + this.settings.paramName + '">' + paramName + '</span>';
                        stringParam += String(theParam) + ', ';
                    }
                }

                stringParam = stringParam.replace(/,\s*$/, "");
                stringParam = '<span class="' + this.settings.paramsList + '">' + '(' + stringParam + ')' + '</span>';

                // Frame -> Type & Method
                var partsTypeMethod = partsFrame.replace(partsParamList, ''),
                    arrTypeMethod = partsTypeMethod.split('.'),
                    method = arrTypeMethod.pop(),
                    type = partsTypeMethod.replace('.' + method, ''),
                    stringTypeMethod = '<span class="' + this.settings.type + '">' + type + '</span>.' + '<span class="' + this.settings.method + '">' + method + '</span>';

                // Construct Frame
                var newPartsFrame = partsFrame.replace(partsParamList, stringParam).replace(partsTypeMethod, stringTypeMethod);

                // Line
                var regLine = new RegExp('\\b:' + selectedLanguage.line + ' \\d+'),
                    partsLine = String(regLine.exec(lines[i]));

                partsLine = partsLine.replace(':', '').trim();

                var fileLi = li.replace(selectedLanguage.at + " " + partsFrame, '').trim();

                // File => (!) text requires multiline to exec regex, otherwise it will return null.
                var regFile = new RegExp(selectedLanguage.in + '\\s.*$', 'm'),
                    partsFile = String(regFile.exec(fileLi));

                partsFile = partsFile.replace(selectedLanguage.in + ' ', '').replace(':' + partsLine, '').replace('&lt;---', '');

                li = li.replace(partsFrame, '<span class="' + this.settings.frame + '">' + newPartsFrame + '</span>')
                    .replace(partsFile, '<span class="' + this.settings.file + '">' + partsFile + '</span>')
                    .replace(partsLine, '<span class="' + this.settings.line + '">' + partsLine + '</span>');

                li = li.replace(/&lt;/g, '<span>&lt;</span>').replace(/&gt;/g, '<span>&gt;</span>');

                if (lines.length - 1 == i) {
                    clone += li;
                } else {
                    clone += li + '\n';
                }
            } else {
                if ((lines[i].trim()).length) {
                    li = lines[i];

                    if (lines.length - 1 == i) {
                        clone += li;
                    } else {
                        clone += li + '\n';
                    }
                }
            }
        }

        this.element.innerHTML = clone;
    };

    netStack.prototype.getJSON = function() {
        return JSON.stringify(this.element.innerHTML);
    };

    netStack.prototype.getLanguage = function() {
        return this.language;
    };

    return netStack;

}));