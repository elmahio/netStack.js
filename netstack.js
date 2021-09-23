/*!
 * netStack v1.0.14
 * A simple and easy jQuery plugin for highlighting .NET stack traces
 * License : Apache 2
 * Author : https://elmah.io
 */
(function($) {
    'use strict';

    $.fn.netStack = function(options) {

        const languages = {
            'english': { at: 'at', in: 'in', line: 'line' },
            'danish': { at: 'ved', in: 'i', line: 'linje' },
            'german': { at: 'bei', in: 'in', line: 'Zeile' },
            'russian': { at: 'в', in: 'в', line: 'строка' }
        };

        function formatException(exceptionMessage, at_language) {
            var result = exceptionMessage || '';

            var searchReplaces = [{
                find: new RegExp(' ---> ', 'g'),
                repl: '\r\n ---> '
            }, {
                find: new RegExp(' ---&gt; ', 'g'),
                repl: '\r\n ---&gt; '
            }, {
                find: new RegExp('--- End of inner exception stack trace ---', 'g'),
                repl: '\r\n   --- End of inner exception stack trace ---'
            }, {
                find: new RegExp('--- Конец трассировка стека из предыдущего расположения, где возникло исключение ---', 'g'),
                repl: '\r\n   --- Конец трассировка стека из предыдущего расположения, где возникло исключение ---'
            }, {
                find: new RegExp(`(\\s*?)${at_language} ([^-:]*?)\\((.*?)\\)`, 'g'),
                repl: `\r\n   ${at_language} $2($3)`
            }]

            searchReplaces.forEach(item => result = result.replace(item.find, item.repl));
            return result;
        }

        function searchLanguage(lines) {
            var english = new RegExp('(\\s*?)at (.*?)\\)'),
                danish = new RegExp('(\\s*?)ved (.*?)\\)'),
                german = new RegExp('(\\s*?)bei (.*?)\\)'),
                russian = new RegExp('(\\s*?)в (.*?)\\)');

            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];

                if (english.test(line)) {
                    return languages['english'];
                } else if (danish.test(line)) {
                    return languages['danish'];
                } else if (german.test(line)) {
                    return languages['german'];
                } else if (russian.test(line)) {
                    return languages['russian'];
                }
            }

            return undefined;
        }

        var settings = $.extend({

            // Default values for classes
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

        return this.each(function() {

            // Get the stacktrace, sanitize it, and split it into lines
            var stacktrace = $(this).text(),
                sanitizedStack = stacktrace.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
                lines = sanitizedStack.split('\n'),
                clone = '';

            var selectedLanguage = searchLanguage(lines);

            if (!selectedLanguage)
                return;

            // Pritty print result if is set to true
            if (settings.prettyprint) {
                sanitizedStack = formatException(sanitizedStack, selectedLanguage['at']);
                lines = sanitizedStack.split('\n');
            }

            for (var i = 0; i < lines.length; i++) {
                var li = lines[i],
                    hli = new RegExp(`\\s*?${selectedLanguage['at']} .*\\)`);

                if (hli.test(li)) {

                    // Frame
                    var regFrame = new RegExp(`${selectedLanguage['at']} .*?\\)`),
                        partsFrame = String(regFrame.exec(li));
                    partsFrame = partsFrame.replace(selectedLanguage['at']+' ', '');

                    // Frame -> ParameterList
                    var regParamList = new RegExp('\\(.*\\)'),
                        partsParamList = String(regParamList.exec(li));

                    // Frame -> Params
                    var partsParams = partsParamList.replace('(', '').replace(')', ''),
                        arrParams = partsParams.split(', '),
                        stringParam = '';

                    for (var x = 0; x < arrParams.length; x++) {
                        var theParam = '',
                            param = arrParams[x].split(' '),
                            paramType = param[0],
                            paramName = param[1];

                        if (param[0] !== "null" && param[0] !== '') {
                            theParam = '<span class="' + settings.paramType + '">' + paramType + '</span>' + ' ' + '<span class="' + settings.paramName + '">' + paramName + '</span>';
                            stringParam += String(theParam) + ', ';
                        }
                    }

                    stringParam = stringParam.replace(/,\s*$/, "");
                    stringParam = '<span class="' + settings.paramsList + '">' + '(' + stringParam + ')' + '</span>';

                    // Frame -> Type & Method
                    var partsTypeMethod = partsFrame.replace(partsParamList, ''),
                        arrTypeMethod = partsTypeMethod.split('.'),
                        method = arrTypeMethod.pop(),
                        type = partsTypeMethod.replace('.' + method, ''),
                        stringTypeMethod = '<span class="' + settings.type + '">' + type + '</span>.' + '<span class="' + settings.method + '">' + method + '</span>';

                    // Construct Frame
                    var newPartsFrame = partsFrame.replace(partsParamList, stringParam).replace(partsTypeMethod, stringTypeMethod);

                    // Line
                    var regLine = new RegExp('\\b:'+selectedLanguage['line']+'.*'),
                        partsLine = String(regLine.exec(li));
                    partsLine = partsLine.replace(':', '');

                    var fileLi = li.replace(`${selectedLanguage['at']} ${partsFrame}`, '');

                    // File => (!) text requires multiline to exec regex, otherwise it will return null.
                    var regFile = new RegExp(`${selectedLanguage['in']} .*:${selectedLanguage['line']}.*$`, 'm'),
                        partsFile = String(regFile.exec(fileLi));

                    partsFile = partsFile.replace(selectedLanguage['in']+' ', '').replace(':' + partsLine, '');

                    li = li.replace(partsFrame, '<span class="' + settings.frame + '">' + newPartsFrame + '</span>')
                        .replace(partsFile, '<span class="' + settings.file + '">' + partsFile + '</span>')
                        .replace(partsLine, '<span class="' + settings.line + '">' + partsLine + '</span>');

                    li = li.replace(/&lt;/g, '<span>&lt;</span>').replace(/&gt;/g, '<span>&gt;</span>');

                    if (lines.length - 1 == i) {
                        clone += li;
                    } else {
                        clone += li + '\n';
                    }
                } else {
                    if ((li.trim()).length) {
                        if (lines.length - 1 == i) {
                            clone += li;
                        } else {
                            clone += li + '\n';
                        }
                    }
                }
            }

            return $(this).html(clone);
        });
    };
}(jQuery));