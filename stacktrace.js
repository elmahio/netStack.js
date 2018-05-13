/*!
 * stackTrace v1.0.4
 * A simple and easy jQuery plugin for highlighting .NET stack traces
 * License : MIT
 * Author : Stanescu Eduard-Dan (http://eduardstanescu.tech)
 */
(function($) {
    'use strict';

    $.fn.stackTrace = function(options) {

        var settings = $.extend({

            // Default values for classes
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

            // Transform text to html
            $(this).html($(this).text());

            var stacktrace = $(this).text(),
                lines = stacktrace.split('\n'),
                clone = '';

            for (var i = 0, j = lines.length; i < j; ++i) {

                var li = lines[i],
                	hli = new RegExp('\\bat.*\\)');

                // Ignore first line from highlighting & comments lines
                if (hli.test(lines[i]) && (i !== 0)) {

                    // Frame
                    var regFrame = new RegExp('\\bat.*\\)'),
                        partsFrame = String(regFrame.exec(lines[i]));
                    partsFrame = partsFrame.replace('at ', '');

                    // Frame -> ParameterList
                    var regParamList = new RegExp('\\(.*\\)'),
                        partsParamList = String(regParamList.exec(lines[i]));

                    // Frame -> Params
                    var partsParams = partsParamList.replace('(', '').replace(')', ''),
                        arrParams = partsParams.split(', '),
                        stringParam = '';

                    for (var x = 0, y = arrParams.length; x < y; ++x) {
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
                    var regLine = new RegExp('\\b:line.*'),
                        partsLine = String(regLine.exec(lines[i]));
                    partsLine = partsLine.replace(':', '');

                    // File
                    var regFile = new RegExp('\\bin.*$'),
                        partsFile = String(regFile.exec(lines[i]));
                    partsFile = partsFile.replace('in ', '').replace(':' + partsLine, '');

                    li = li.replace(partsFrame, '<span class="' + settings.frame + '">' + newPartsFrame + '</span>')
                        .replace(partsFile, '<span class="' + settings.file + '">' + partsFile + '</span>')
                        .replace(partsLine, '<span class="' + settings.line + '">' + partsLine + '</span>');

                }

                if (lines.length - 1 == i) {
                    clone += li;
                } else {
                    clone += li + '\n';
                }
            }

            return $(this).html(clone);

        });

    };

}(jQuery));
