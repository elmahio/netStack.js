const assert = require('assert');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const dom = fs.readFileSync('./test/stacktraces.html', 'utf8');
const jsdom = new JSDOM(dom);
const { window } = jsdom;
const $ = global.jQuery = require('jquery')(window);
const expect = require('chai').expect;
const app = require('../netstack.js');
const body = window.document.body;

describe('netstack.js', function() {
    describe('stacktrace test', function() {
        describe('> English I', function() {
            const elementEN = $('body').find('.stacktrace-en')[0];
            const stackElementEN = $(elementEN).netStack({ prettyprint: true });
            const languageEN = stackElementEN.getLanguage();
            const stringStack = "System.ApplicationException: Runtime error ---&gt; System.FormatException: The input string was not formatted correctly.\n   at <span class=\"st-frame\"><span class=\"st-type\">System.Number</span>.<span class=\"st-method\">ThrowOverflowOrFormatException</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">ParsingStatus</span> <span class=\"st-param-name\">status</span>, <span class=\"st-param-type\">TypeCode</span> <span class=\"st-param-name\">type</span>)</span></span>\n   at <span class=\"st-frame\"><span class=\"st-type\">System.Number</span>.<span class=\"st-method\">ParseInt32</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">ReadOnlySpan`1</span> <span class=\"st-param-name\">value</span>, <span class=\"st-param-type\">NumberStyles</span> <span class=\"st-param-name\">styles</span>, <span class=\"st-param-type\">NumberFormatInfo</span> <span class=\"st-param-name\">info</span>)</span></span>\n   at <span class=\"st-frame\"><span class=\"st-type\">System.Int32</span>.<span class=\"st-method\">Parse</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">String</span> <span class=\"st-param-name\">s</span>)</span></span>\n   at <span class=\"st-frame\"><span class=\"st-type\">MyNamespace.IntParser</span>.<span class=\"st-method\">Execute</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">String</span> <span class=\"st-param-name\">s</span>)</span></span> in <span class=\"st-file\">C:\\apps\\MyNamespace\\IntParser.cs</span>:<span class=\"st-line\">line 13</span> \n   --- End of stack trace from previous location where exception was thrown ---\n   at <span class=\"st-frame\"><span class=\"st-type\">Elmah.Io.App.Controllers.AccountController</span>.<span class=\"st-method\">ChangeEmail</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">String</span> <span class=\"st-param-name\">secret</span>)</span></span> in <span class=\"st-file\">x:\\agent\\_work\\94\\s\\src\\Elmah.Io.App\\Controllers\\AccountController.cs</span>:<span class=\"st-line\">line 45</span>\n   at <span class=\"st-frame\"><span class=\"st-type\">System.Convert</span>.<span class=\"st-method\">FromBase64CharPtr</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">Char*</span> <span class=\"st-param-name\">inputPtr</span>, <span class=\"st-param-type\">Int32</span> <span class=\"st-param-name\">inputLength</span>)</span></span> \n   --- End of stack trace from previous location where exception was thrown ---\n   at <span class=\"st-frame\"><span class=\"st-type\">MyNamespace.IntParser</span>.<span class=\"st-method\">Execute</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">String</span> <span class=\"st-param-name\">s</span>)</span></span> in <span class=\"st-file\">C:\\apps\\MyNamespace\\IntParser.cs</span>:<span class=\"st-line\">line 17</span>\n   at <span class=\"st-frame\"><span class=\"st-type\">MyNamespace.Program</span>.<span class=\"st-method\">Main</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">String[]</span> <span class=\"st-param-name\">args</span>)</span></span> in <span class=\"st-file\">C:\\apps\\MyNamespace\\Program.cs</span>:<span class=\"st-line\">line 13</span>";

            it('-> recognize language', function() {
                assert.equal('english', languageEN);
            });
            it('-> create HTML', function() {
                assert.equal(stringStack, $(stackElementEN).html());
            });
        });

        describe('> English II', function() {
            const elementEN = $('body').find('.stacktrace-en-2')[0];
            const stackElementEN = $(elementEN).netStack({ prettyprint: true });
            const languageEN = stackElementEN.getLanguage();
            const stringStack = "Elmah.TestException: This is a test exception that can be safely ignored.\n   at <span class=\"st-frame\"><span class=\"st-type\">Elmah.ErrorLogPageFactory</span>.<span class=\"st-method\">FindHandler</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">String</span> <span class=\"st-param-name\">name</span>)</span></span> in <span class=\"st-file\">C:\\ELMAH\\src\\Elmah\\ErrorLogPageFactory.cs</span>:<span class=\"st-line\">line 126</span>\n   at <span class=\"st-frame\"><span class=\"st-type\">Elmah.ErrorLogPageFactory</span>.<span class=\"st-method\">GetHandler</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">HttpContext</span> <span class=\"st-param-name\">context</span>, <span class=\"st-param-type\">String</span> <span class=\"st-param-name\">requestType</span>, <span class=\"st-param-type\">String</span> <span class=\"st-param-name\">url</span>, <span class=\"st-param-type\">String</span> <span class=\"st-param-name\">pathTranslated</span>)</span></span> in <span class=\"st-file\">C:\\ELMAH\\src\\Elmah\\ErrorLogPageFactory.cs</span>:<span class=\"st-line\">line 66</span>\n   at <span class=\"st-frame\"><span class=\"st-type\">System.Web.HttpApplication</span>.<span class=\"st-method\">MapHttpHandler</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">HttpContext</span> <span class=\"st-param-name\">context</span>, <span class=\"st-param-type\">String</span> <span class=\"st-param-name\">requestType</span>, <span class=\"st-param-type\">VirtualPath</span> <span class=\"st-param-name\">path</span>, <span class=\"st-param-type\">String</span> <span class=\"st-param-name\">pathTranslated</span>, <span class=\"st-param-type\">Boolean</span> <span class=\"st-param-name\">useAppConfig</span>)</span></span>\n   at <span class=\"st-frame\"><span class=\"st-type\">System.Web.HttpApplication.MapHandlerExecutionStep.System.Web.HttpApplication.IExecutionStep</span>.<span class=\"st-method\">Execute</span><span class=\"st-frame-params\">()</span></span>\n   at <span class=\"st-frame\"><span class=\"st-type\">System.Web.HttpApplication</span>.<span class=\"st-method\">ExecuteStep</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">IExecutionStep</span> <span class=\"st-param-name\">step</span>, <span class=\"st-param-type\">Boolean&amp;</span> <span class=\"st-param-name\">completedSynchronously</span>)</span></span>";

            it('-> recognize language', function() {
                assert.equal('english', languageEN);
            });
            it('-> create HTML', function() {
                assert.equal(stringStack, $(stackElementEN).html());
            });
        });

        describe('> Danish', function() {
            const elementDK = $('body').find('.stacktrace-dk')[0];
            const stackElementDK = $(elementDK).netStack({ prettyprint: true });
            const languageDK = stackElementDK.getLanguage();
            const stringStack = "System.ApplicationException: Kørselsfejl ---&gt; System.FormatException: Inputstrengen blev ikke formateret korrekt.\n   ved <span class=\"st-frame\"><span class=\"st-type\">System.Number</span>.<span class=\"st-method\">ThrowOverflowOrFormatException</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">ParsingStatus</span> <span class=\"st-param-name\">status</span>, <span class=\"st-param-type\">TypeCode</span> <span class=\"st-param-name\">type</span>)</span></span>\n   ved <span class=\"st-frame\"><span class=\"st-type\">System.Number</span>.<span class=\"st-method\">ParseInt32</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">ReadOnlySpan`1</span> <span class=\"st-param-name\">value</span>, <span class=\"st-param-type\">NumberStyles</span> <span class=\"st-param-name\">styles</span>, <span class=\"st-param-type\">NumberFormatInfo</span> <span class=\"st-param-name\">info</span>)</span></span>\n   ved <span class=\"st-frame\"><span class=\"st-type\">System.Int32</span>.<span class=\"st-method\">Parse</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">String</span> <span class=\"st-param-name\">s</span>)</span></span>\n   ved <span class=\"st-frame\"><span class=\"st-type\">MyNamespace.IntParser</span>.<span class=\"st-method\">Execute</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">String</span> <span class=\"st-param-name\">s</span>)</span></span> i <span class=\"st-file\">C:\\apps\\MyNamespace\\IntParser.cs</span>:<span class=\"st-line\">linje 13</span> \n   --- Slutning af stackspor fra tidligere sted, hvor undtagelse blev kastet ---\n   ved <span class=\"st-frame\"><span class=\"st-type\">Elmah.Io.App.Controllers.AccountController</span>.<span class=\"st-method\">ChangeEmail</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">String</span> <span class=\"st-param-name\">secret</span>)</span></span> i <span class=\"st-file\">x:\\agent\\_work\\94\\s\\src\\Elmah.Io.App\\Controllers\\AccountController.cs</span>:<span class=\"st-line\">linje 45</span>\n   ved <span class=\"st-frame\"><span class=\"st-type\">System.Convert</span>.<span class=\"st-method\">FromBase64CharPtr</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">Char*</span> <span class=\"st-param-name\">inputPtr</span>, <span class=\"st-param-type\">Int32</span> <span class=\"st-param-name\">inputLength</span>)</span></span> \n   --- Slutning af stackspor fra tidligere sted, hvor undtagelse blev kastet ---\n   ved <span class=\"st-frame\"><span class=\"st-type\">MyNamespace.IntParser</span>.<span class=\"st-method\">Execute</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">String</span> <span class=\"st-param-name\">s</span>)</span></span> i <span class=\"st-file\">C:\\apps\\MyNamespace\\IntParser.cs</span>:<span class=\"st-line\">linje 17</span>\n   ved <span class=\"st-frame\"><span class=\"st-type\">MyNamespace.Program</span>.<span class=\"st-method\">Main</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">String[]</span> <span class=\"st-param-name\">args</span>)</span></span> i <span class=\"st-file\">C:\\apps\\MyNamespace\\Program.cs</span>:<span class=\"st-line\">linje 13</span>";

            it('-> recognize language', function() {
                assert.equal('danish', languageDK);
            });
            it('-> create HTML', function() {
                assert.equal(stringStack, $(stackElementDK).html());
            });
        });

        describe('> German', function() {
            const elementDE = $('body').find('.stacktrace-de')[0];
            const stackElementDE = $(elementDE).netStack({ prettyprint: true });
            const languageDE = stackElementDE.getLanguage();
            const stringStack = "System.ApplicationException: Etwas hier ---&gt; System.FormatException: Die Eingabezeichenfolge wurde nicht richtig formatiert.\n   bei <span class=\"st-frame\"><span class=\"st-type\">System.Number</span>.<span class=\"st-method\">ThrowOverflowOrFormatException</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">ParsingStatus</span> <span class=\"st-param-name\">status</span>, <span class=\"st-param-type\">TypeCode</span> <span class=\"st-param-name\">type</span>)</span></span>\n   bei <span class=\"st-frame\"><span class=\"st-type\">System.Number</span>.<span class=\"st-method\">ParseInt32</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">ReadOnlySpan`1</span> <span class=\"st-param-name\">value</span>, <span class=\"st-param-type\">NumberStyles</span> <span class=\"st-param-name\">styles</span>, <span class=\"st-param-type\">NumberFormatInfo</span> <span class=\"st-param-name\">info</span>)</span></span>\n   bei <span class=\"st-frame\"><span class=\"st-type\">System.Int32</span>.<span class=\"st-method\">Parse</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">String</span> <span class=\"st-param-name\">s</span>)</span></span>\n   bei <span class=\"st-frame\"><span class=\"st-type\">MyNamespace.IntParser</span>.<span class=\"st-method\">Execute</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">String</span> <span class=\"st-param-name\">s</span>)</span></span> in <span class=\"st-file\">C:\\apps\\MyNamespace\\IntParser.cs</span>:<span class=\"st-line\">Zeile 13</span> \n   --- Ende des Stack-Trace vom vorherigen Ort, an dem eine Ausnahme ausgelöst wurde ---\n   bei <span class=\"st-frame\"><span class=\"st-type\">Elmah.Io.App.Controllers.AccountController</span>.<span class=\"st-method\">ChangeEmail</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">String</span> <span class=\"st-param-name\">secret</span>)</span></span> in <span class=\"st-file\">x:\\agent\\_work\\94\\s\\src\\Elmah.Io.App\\Controllers\\AccountController.cs</span>:<span class=\"st-line\">Zeile 45</span>\n   bei <span class=\"st-frame\"><span class=\"st-type\">System.Convert</span>.<span class=\"st-method\">FromBase64CharPtr</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">Char*</span> <span class=\"st-param-name\">inputPtr</span>, <span class=\"st-param-type\">Int32</span> <span class=\"st-param-name\">inputLength</span>)</span></span> \n   --- Ende des Stack-Trace vom vorherigen Ort, an dem eine Ausnahme ausgelöst wurde ---\n   bei <span class=\"st-frame\"><span class=\"st-type\">MyNamespace.IntParser</span>.<span class=\"st-method\">Execute</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">String</span> <span class=\"st-param-name\">s</span>)</span></span> in <span class=\"st-file\">C:\\apps\\MyNamespace\\IntParser.cs</span>:<span class=\"st-line\">Zeile 17</span>\n   bei <span class=\"st-frame\"><span class=\"st-type\">MyNamespace.Program</span>.<span class=\"st-method\">Main</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">String[]</span> <span class=\"st-param-name\">args</span>)</span></span> in <span class=\"st-file\">C:\\apps\\MyNamespace\\Program.cs</span>:<span class=\"st-line\">Zeile 13</span>";

            it('-> recognize language', function() {
                assert.equal('german', languageDE);
            });
            it('-> create HTML', function() {
                assert.equal(stringStack, $(stackElementDE).html());
            });
        });

        describe('> Russian', function() {
            const elementRU = $('body').find('.stacktrace-ru')[0];
            const stackElementRU = $(elementRU).netStack({ prettyprint: true });
            const languageRU = stackElementRU.getLanguage();
            const stringStack = "System.ApplicationException: Ошибка в ходе выполнения ---&gt; System.FormatException: Входная строка имела неверный формат.\n   в <span class=\"st-frame\"><span class=\"st-type\">System.Number</span>.<span class=\"st-method\">ThrowOverflowOrFormatException</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">ParsingStatus</span> <span class=\"st-param-name\">status</span>, <span class=\"st-param-type\">TypeCode</span> <span class=\"st-param-name\">type</span>)</span></span>\n   в <span class=\"st-frame\"><span class=\"st-type\">System.Number</span>.<span class=\"st-method\">ParseInt32</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">ReadOnlySpan`1</span> <span class=\"st-param-name\">value</span>, <span class=\"st-param-type\">NumberStyles</span> <span class=\"st-param-name\">styles</span>, <span class=\"st-param-type\">NumberFormatInfo</span> <span class=\"st-param-name\">info</span>)</span></span>\n   в <span class=\"st-frame\"><span class=\"st-type\">System.Int32</span>.<span class=\"st-method\">Parse</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">String</span> <span class=\"st-param-name\">s</span>)</span></span>\n   в <span class=\"st-frame\"><span class=\"st-type\">MyNamespace.IntParser</span>.<span class=\"st-method\">Execute</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">String</span> <span class=\"st-param-name\">s</span>)</span></span> в <span class=\"st-file\">C:\\apps\\MyNamespace\\IntParser.cs</span>:<span class=\"st-line\">строка 13</span> \n   --- Конец трассировка стека из предыдущего расположения, где возникло исключение ---\n   в <span class=\"st-frame\"><span class=\"st-type\">Elmah.Io.App.Controllers.AccountController</span>.<span class=\"st-method\">ChangeEmail</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">String</span> <span class=\"st-param-name\">secret</span>)</span></span> в <span class=\"st-file\">x:\\agent\\_work\\94\\s\\src\\Elmah.Io.App\\Controllers\\AccountController.cs</span>:<span class=\"st-line\">строка 45</span>\n   в <span class=\"st-frame\"><span class=\"st-type\">System.Convert</span>.<span class=\"st-method\">FromBase64CharPtr</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">Char*</span> <span class=\"st-param-name\">inputPtr</span>, <span class=\"st-param-type\">Int32</span> <span class=\"st-param-name\">inputLength</span>)</span></span> \n   --- End of stack trace from previous location where exception was thrown ---\n   в <span class=\"st-frame\"><span class=\"st-type\">MyNamespace.IntParser</span>.<span class=\"st-method\">Execute</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">String</span> <span class=\"st-param-name\">s</span>)</span></span> в <span class=\"st-file\">C:\\apps\\MyNamespace\\IntParser.cs</span>:<span class=\"st-line\">строка 17</span>\n   в <span class=\"st-frame\"><span class=\"st-type\">MyNamespace.Program</span>.<span class=\"st-method\">Main</span><span class=\"st-frame-params\">(<span class=\"st-param-type\">String[]</span> <span class=\"st-param-name\">args</span>)</span></span> в <span class=\"st-file\">C:\\apps\\MyNamespace\\Program.cs</span>:<span class=\"st-line\">строка 13</span>";

            it('-> recognize language', function() {
                assert.equal('russian', languageRU);
            });
            it('-> create HTML', function() {
                assert.equal(stringStack, $(stackElementRU).html());
            });
        });
    });
});