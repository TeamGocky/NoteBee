CodeMirror.defineMode("clike",function(a,b){function n(a,b){var c=a.next();if(j[c]){var d=j[c](a,b);if(d!==!1)return d}if('"'==c||"'"==c)return b.tokenize=o(c),b.tokenize(a,b);if(/[\[\]{}\(\),;\:\.]/.test(c))return m=c,null;if(/\d/.test(c))return a.eatWhile(/[\w\.]/),"number";if("/"==c){if(a.eat("*"))return b.tokenize=p,p(a,b);if(a.eat("/"))return a.skipToEnd(),"comment"}if(l.test(c))return a.eatWhile(l),"operator";a.eatWhile(/[\w\$_]/);var e=a.current();return f.propertyIsEnumerable(e)?(h.propertyIsEnumerable(e)&&(m="newstatement"),"keyword"):g.propertyIsEnumerable(e)?(h.propertyIsEnumerable(e)&&(m="newstatement"),"builtin"):i.propertyIsEnumerable(e)?"atom":"variable"}function o(a){return function(b,c){for(var e,d=!1,f=!1;null!=(e=b.next());){if(e==a&&!d){f=!0;break}d=!d&&"\\"==e}return(f||!d&&!k)&&(c.tokenize=null),"string"}}function p(a,b){for(var d,c=!1;d=a.next();){if("/"==d&&c){b.tokenize=null;break}c="*"==d}return"comment"}function q(a,b,c,d,e){this.indented=a,this.column=b,this.type=c,this.align=d,this.prev=e}function r(a,b,c){var d=a.indented;return a.context&&"statement"==a.context.type&&(d=a.context.indented),a.context=new q(d,b,c,null,a.context)}function s(a){var b=a.context.type;return(")"==b||"]"==b||"}"==b)&&(a.indented=a.context.indented),a.context=a.context.prev}var m,c=a.indentUnit,d=b.statementIndentUnit||c,e=b.dontAlignCalls,f=b.keywords||{},g=b.builtin||{},h=b.blockKeywords||{},i=b.atoms||{},j=b.hooks||{},k=b.multiLineStrings,l=/[+\-*&%=<>!?|\/]/;return{startState:function(a){return{tokenize:null,context:new q((a||0)-c,0,"top",!1),indented:0,startOfLine:!0}},token:function(a,b){var c=b.context;if(a.sol()&&(null==c.align&&(c.align=!1),b.indented=a.indentation(),b.startOfLine=!0),a.eatSpace())return null;m=null;var d=(b.tokenize||n)(a,b);if("comment"==d||"meta"==d)return d;if(null==c.align&&(c.align=!0),";"!=m&&":"!=m&&","!=m||"statement"!=c.type)if("{"==m)r(b,a.column(),"}");else if("["==m)r(b,a.column(),"]");else if("("==m)r(b,a.column(),")");else if("}"==m){for(;"statement"==c.type;)c=s(b);for("}"==c.type&&(c=s(b));"statement"==c.type;)c=s(b)}else m==c.type?s(b):(("}"==c.type||"top"==c.type)&&";"!=m||"statement"==c.type&&"newstatement"==m)&&r(b,a.column(),"statement");else s(b);return b.startOfLine=!1,d},indent:function(a,b){if(a.tokenize!=n&&null!=a.tokenize)return CodeMirror.Pass;var f=a.context,g=b&&b.charAt(0);"statement"==f.type&&"}"==g&&(f=f.prev);var h=g==f.type;return"statement"==f.type?f.indented+("{"==g?0:d):e&&")"==f.type&&!h?f.indented+d:f.align?f.column+(h?0:1):f.indented+(h?0:c)},electricChars:"{}"}}),function(){function a(a){for(var b={},c=a.split(" "),d=0;c.length>d;++d)b[c[d]]=!0;return b}function c(a,b){if(!b.startOfLine)return!1;for(;;){if(!a.skipTo("\\")){a.skipToEnd(),b.tokenize=null;break}if(a.next(),a.eol()){b.tokenize=c;break}}return"meta"}function d(a,b){for(var c;null!=(c=a.next());)if('"'==c&&!a.eat('"')){b.tokenize=null;break}return"string"}function e(a,b){for(var c=0;a.length>c;++c)CodeMirror.defineMIME(a[c],b)}var b="auto if break int case long char register continue return default short do sizeof double static else struct entry switch extern typedef float union for unsigned goto while enum void const signed volatile";e(["text/x-csrc","text/x-c","text/x-chdr"],{name:"clike",keywords:a(b),blockKeywords:a("case do else for if switch while struct"),atoms:a("null"),hooks:{"#":c}}),e(["text/x-c++src","text/x-c++hdr"],{name:"clike",keywords:a(b+" asm dynamic_cast namespace reinterpret_cast try bool explicit new "+"static_cast typeid catch operator template typename class friend private "+"this using const_cast inline public throw virtual delete mutable protected "+"wchar_t"),blockKeywords:a("catch class do else finally for if struct switch try while"),atoms:a("true false null"),hooks:{"#":c}}),CodeMirror.defineMIME("text/x-java",{name:"clike",keywords:a("abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try void volatile while"),blockKeywords:a("catch class do else finally for if switch try while"),atoms:a("true false null"),hooks:{"@":function(a){return a.eatWhile(/[\w\$_]/),"meta"}}}),CodeMirror.defineMIME("text/x-csharp",{name:"clike",keywords:a("abstract as base break case catch checked class const continue default delegate do else enum event explicit extern finally fixed for foreach goto if implicit in interface internal is lock namespace new operator out override params private protected public readonly ref return sealed sizeof stackalloc static struct switch this throw try typeof unchecked unsafe using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield"),blockKeywords:a("catch class do else finally for foreach if struct switch try while"),builtin:a("Boolean Byte Char DateTime DateTimeOffset Decimal Double Guid Int16 Int32 Int64 Object SByte Single String TimeSpan UInt16 UInt32 UInt64 bool byte char decimal double short int long object sbyte float string ushort uint ulong"),atoms:a("true false null"),hooks:{"@":function(a,b){return a.eat('"')?(b.tokenize=d,d(a,b)):(a.eatWhile(/[\w\$_]/),"meta")}}}),CodeMirror.defineMIME("text/x-scala",{name:"clike",keywords:a("abstract case catch class def do else extends false final finally for forSome if implicit import lazy match new null object override package private protected return sealed super this throw trait try trye type val var while with yield _ : = => <- <: <% >: # @ assert assume require print println printf readLine readBoolean readByte readShort readChar readInt readLong readFloat readDouble AnyVal App Application Array BufferedIterator BigDecimal BigInt Char Console Either Enumeration Equiv Error Exception Fractional Function IndexedSeq Integral Iterable Iterator List Map Numeric Nil NotNull Option Ordered Ordering PartialFunction PartialOrdering Product Proxy Range Responder Seq Serializable Set Specializable Stream StringBuilder StringContext Symbol Throwable Traversable TraversableOnce Tuple Unit Vector :: #:: Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),blockKeywords:a("catch class do else finally for forSome if match switch try while"),atoms:a("true false null"),hooks:{"@":function(a){return a.eatWhile(/[\w\$_]/),"meta"}}})}();
CodeMirror.defineMode("javascript",function(e,t){function u(e,t,n){t.tokenize=n;return n(e,t)}function a(e,t){var n=false,r;while((r=e.next())!=null){if(r==t&&!n)return false;n=!n&&r=="\\"}return n}function c(e,t,n){f=e;l=n;return t}function h(e,t){var n=e.next();if(n=='"'||n=="'")return u(e,t,p(n));else if(/[\[\]{}\(\),;\:\.]/.test(n))return c(n);else if(n=="0"&&e.eat(/x/i)){e.eatWhile(/[\da-f]/i);return c("number","number")}else if(/\d/.test(n)||n=="-"&&e.eat(/\d/)){e.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);return c("number","number")}else if(n=="/"){if(e.eat("*")){return u(e,t,d)}else if(e.eat("/")){e.skipToEnd();return c("comment","comment")}else if(t.lastType=="operator"||t.lastType=="keyword c"||/^[\[{}\(,;:]$/.test(t.lastType)){a(e,"/");e.eatWhile(/[gimy]/);return c("regexp","string-2")}else{e.eatWhile(o);return c("operator",null,e.current())}}else if(n=="#"){e.skipToEnd();return c("error","error")}else if(o.test(n)){e.eatWhile(o);return c("operator",null,e.current())}else{e.eatWhile(/[\w\$_]/);var r=e.current(),i=s.propertyIsEnumerable(r)&&s[r];return i&&t.lastType!="."?c(i.type,i.style,r):c("variable","variable",r)}}function p(e){return function(t,n){if(!a(t,e))n.tokenize=h;return c("string","string")}}function d(e,t){var n=false,r;while(r=e.next()){if(r=="/"&&n){t.tokenize=h;break}n=r=="*"}return c("comment","comment")}function m(e,t,n,r,i,s){this.indented=e;this.column=t;this.type=n;this.prev=i;this.info=s;if(r!=null)this.align=r}function g(e,t){for(var n=e.localVars;n;n=n.next)if(n.name==t)return true}function y(e,t,n,i,s){var o=e.cc;b.state=e;b.stream=s;b.marked=null,b.cc=o;if(!e.lexical.hasOwnProperty("align"))e.lexical.align=true;while(true){var u=o.length?o.pop():r?O:A;if(u(n,i)){while(o.length&&o[o.length-1].lex)o.pop()();if(b.marked)return b.marked;if(n=="variable"&&g(e,i))return"variable-2";return t}}}function w(){for(var e=arguments.length-1;e>=0;e--)b.cc.push(arguments[e])}function E(){w.apply(null,arguments);return true}function S(e){function t(t){for(var n=t;n;n=n.next)if(n.name==e)return true;return false}var n=b.state;if(n.context){b.marked="def";if(t(n.localVars))return;n.localVars={name:e,next:n.localVars}}else{if(t(n.globalVars))return;n.globalVars={name:e,next:n.globalVars}}}function T(){b.state.context={prev:b.state.context,vars:b.state.localVars};b.state.localVars=x}function N(){b.state.localVars=b.state.context.vars;b.state.context=b.state.context.prev}function C(e,t){var n=function(){var n=b.state;n.lexical=new m(n.indented,b.stream.column(),e,null,n.lexical,t)};n.lex=true;return n}function k(){var e=b.state;if(e.lexical.prev){if(e.lexical.type==")")e.indented=e.lexical.indented;e.lexical=e.lexical.prev}}function L(e){return function(n){if(n==e)return E();else if(e==";")return w();else return E(arguments.callee)}}function A(e){if(e=="var")return E(C("vardef"),q,L(";"),k);if(e=="keyword a")return E(C("form"),O,A,k);if(e=="keyword b")return E(C("form"),A,k);if(e=="{")return E(C("}"),j,k);if(e==";")return E();if(e=="function")return E(V);if(e=="for")return E(C("form"),L("("),C(")"),U,L(")"),k,A,k);if(e=="variable")return E(C("stat"),D);if(e=="switch")return E(C("form"),O,C("}","switch"),L("{"),j,k,k);if(e=="case")return E(O,L(":"));if(e=="default")return E(L(":"));if(e=="catch")return E(C("form"),T,L("("),$,L(")"),A,k,N);return w(C("stat"),O,L(";"),k)}function O(e){if(v.hasOwnProperty(e))return E(_);if(e=="function")return E(V);if(e=="keyword c")return E(M);if(e=="(")return E(C(")"),M,L(")"),k,_);if(e=="operator")return E(O);if(e=="[")return E(C("]"),B(O,"]"),k,_);if(e=="{")return E(C("}"),B(H,"}"),k,_);return E()}function M(e){if(e.match(/[;\}\)\],]/))return w();return w(O)}function _(e,t){if(e=="operator"&&/\+\+|--/.test(t))return E(_);if(e=="operator"&&t=="?")return E(O,L(":"),O);if(e==";")return;if(e=="(")return E(C(")"),B(O,")"),k,_);if(e==".")return E(P,_);if(e=="[")return E(C("]"),O,L("]"),k,_)}function D(e){if(e==":")return E(k,A);return w(_,L(";"),k)}function P(e){if(e=="variable"){b.marked="property";return E()}}function H(e){if(e=="variable")b.marked="property";if(v.hasOwnProperty(e))return E(L(":"),O)}function B(e,t){function n(r){if(r==",")return E(e,n);if(r==t)return E();return E(L(t))}return function(i){if(i==t)return E();else return w(e,n)}}function j(e){if(e=="}")return E();return w(A,j)}function F(e){if(e==":")return E(I);return w()}function I(e){if(e=="variable"){b.marked="variable-3";return E()}return w()}function q(e,t){if(e=="variable"){S(t);return i?E(F,R):E(R)}return w()}function R(e,t){if(t=="=")return E(O,R);if(e==",")return E(q)}function U(e){if(e=="var")return E(q,L(";"),W);if(e==";")return E(W);if(e=="variable")return E(z);return E(W)}function z(e,t){if(t=="in")return E(O);return E(_,W)}function W(e,t){if(e==";")return E(X);if(t=="in")return E(O);return E(O,L(";"),X)}function X(e){if(e!=")")E(O)}function V(e,t){if(e=="variable"){S(t);return E(V)}if(e=="(")return E(C(")"),T,B($,")"),k,A,N)}function $(e,t){if(e=="variable"){S(t);return i?E(F):E()}}var n=e.indentUnit;var r=t.json;var i=t.typescript;var s=function(){function e(e){return{type:e,style:"keyword"}}var t=e("keyword a"),n=e("keyword b"),r=e("keyword c");var s=e("operator"),o={type:"atom",style:"atom"};var u={"if":t,"while":t,"with":t,"else":n,"do":n,"try":n,"finally":n,"return":r,"break":r,"continue":r,"new":r,"delete":r,"throw":r,"var":e("var"),"const":e("var"),let:e("var"),"function":e("function"),"catch":e("catch"),"for":e("for"),"switch":e("switch"),"case":e("case"),"default":e("default"),"in":s,"typeof":s,"instanceof":s,"true":o,"false":o,"null":o,"undefined":o,NaN:o,Infinity:o};if(i){var a={type:"variable",style:"variable-3"};var f={"interface":e("interface"),"class":e("class"),"extends":e("extends"),constructor:e("constructor"),"public":e("public"),"private":e("private"),"protected":e("protected"),"static":e("static"),"super":e("super"),string:a,number:a,bool:a,any:a};for(var l in f){u[l]=f[l]}}return u}();var o=/[+\-*&%=<>!?|]/;var f,l;var v={atom:true,number:true,variable:true,string:true,regexp:true};var b={state:null,column:null,marked:null,cc:null};var x={name:"this",next:{name:"arguments"}};k.lex=true;return{startState:function(e){return{tokenize:h,lastType:null,cc:[],lexical:new m((e||0)-n,0,"block",false),localVars:t.localVars,globalVars:t.globalVars,context:t.localVars&&{vars:t.localVars},indented:0}},token:function(e,t){if(e.sol()){if(!t.lexical.hasOwnProperty("align"))t.lexical.align=false;t.indented=e.indentation()}if(e.eatSpace())return null;var n=t.tokenize(e,t);if(f=="comment")return n;t.lastType=f;return y(t,n,f,l,e)},indent:function(e,t){if(e.tokenize==d)return CodeMirror.Pass;if(e.tokenize!=h)return 0;var r=t&&t.charAt(0),i=e.lexical;if(i.type=="stat"&&r=="}")i=i.prev;var s=i.type,o=r==s;if(s=="vardef")return i.indented+(e.lastType=="operator"||e.lastType==","?4:0);else if(s=="form"&&r=="{")return i.indented;else if(s=="form")return i.indented+n;else if(s=="stat")return i.indented+(e.lastType=="operator"||e.lastType==","?n:0);else if(i.info=="switch"&&!o)return i.indented+(/^(?:case|default)\b/.test(t)?n:2*n);else if(i.align)return i.column+(o?0:1);else return i.indented+(o?0:n)},electricChars:":{}",jsonMode:r}});CodeMirror.defineMIME("text/javascript","javascript");CodeMirror.defineMIME("text/ecmascript","javascript");CodeMirror.defineMIME("application/javascript","javascript");CodeMirror.defineMIME("application/ecmascript","javascript");CodeMirror.defineMIME("application/json",{name:"javascript",json:true});CodeMirror.defineMIME("text/typescript",{name:"javascript",typescript:true});CodeMirror.defineMIME("application/typescript",{name:"javascript",typescript:true})


CodeMirror.defineMode("python", function(conf, parserConf) {
    var ERRORCLASS = 'error';
    
    function wordRegexp(words) {
        return new RegExp("^((" + words.join(")|(") + "))\\b");
    }
    
    var singleOperators = new RegExp("^[\\+\\-\\*/%&|\\^~<>!]");
    var singleDelimiters = new RegExp('^[\\(\\)\\[\\]\\{\\}@,:`=;\\.]');
    var doubleOperators = new RegExp("^((==)|(!=)|(<=)|(>=)|(<>)|(<<)|(>>)|(//)|(\\*\\*))");
    var doubleDelimiters = new RegExp("^((\\+=)|(\\-=)|(\\*=)|(%=)|(/=)|(&=)|(\\|=)|(\\^=))");
    var tripleDelimiters = new RegExp("^((//=)|(>>=)|(<<=)|(\\*\\*=))");
    var identifiers = new RegExp("^[_A-Za-z][_A-Za-z0-9]*");

    var wordOperators = wordRegexp(['and', 'or', 'not', 'is', 'in']);
    var commonkeywords = ['as', 'assert', 'break', 'class', 'continue',
                          'def', 'del', 'elif', 'else', 'except', 'finally',
                          'for', 'from', 'global', 'if', 'import',
                          'lambda', 'pass', 'raise', 'return',
                          'try', 'while', 'with', 'yield'];
    var commonBuiltins = ['abs', 'all', 'any', 'bin', 'bool', 'bytearray', 'callable', 'chr',
                          'classmethod', 'compile', 'complex', 'delattr', 'dict', 'dir', 'divmod',
                          'enumerate', 'eval', 'filter', 'float', 'format', 'frozenset',
                          'getattr', 'globals', 'hasattr', 'hash', 'help', 'hex', 'id',
                          'input', 'int', 'isinstance', 'issubclass', 'iter', 'len',
                          'list', 'locals', 'map', 'max', 'memoryview', 'min', 'next',
                          'object', 'oct', 'open', 'ord', 'pow', 'property', 'range',
                          'repr', 'reversed', 'round', 'set', 'setattr', 'slice',
                          'sorted', 'staticmethod', 'str', 'sum', 'super', 'tuple',
                          'type', 'vars', 'zip', '__import__', 'NotImplemented',
                          'Ellipsis', '__debug__'];
    var py2 = {'builtins': ['apply', 'basestring', 'buffer', 'cmp', 'coerce', 'execfile',
                            'file', 'intern', 'long', 'raw_input', 'reduce', 'reload',
                            'unichr', 'unicode', 'xrange', 'False', 'True', 'None'],
               'keywords': ['exec', 'print']};
    var py3 = {'builtins': ['ascii', 'bytes', 'exec', 'print'],
               'keywords': ['nonlocal', 'False', 'True', 'None']};

    if (!!parserConf.version && parseInt(parserConf.version, 10) === 3) {
        commonkeywords = commonkeywords.concat(py3.keywords);
        commonBuiltins = commonBuiltins.concat(py3.builtins);
        var stringPrefixes = new RegExp("^(([rb]|(br))?('{3}|\"{3}|['\"]))", "i");
    } else {
        commonkeywords = commonkeywords.concat(py2.keywords);
        commonBuiltins = commonBuiltins.concat(py2.builtins);
        var stringPrefixes = new RegExp("^(([rub]|(ur)|(br))?('{3}|\"{3}|['\"]))", "i");
    }
    var keywords = wordRegexp(commonkeywords);
    var builtins = wordRegexp(commonBuiltins);

    var indentInfo = null;

    // tokenizers
    function tokenBase(stream, state) {
        // Handle scope changes
        if (stream.sol()) {
            var scopeOffset = state.scopes[0].offset;
            if (stream.eatSpace()) {
                var lineOffset = stream.indentation();
                if (lineOffset > scopeOffset) {
                    indentInfo = 'indent';
                } else if (lineOffset < scopeOffset) {
                    indentInfo = 'dedent';
                }
                return null;
            } else {
                if (scopeOffset > 0) {
                    dedent(stream, state);
                }
            }
        }
        if (stream.eatSpace()) {
            return null;
        }
        
        var ch = stream.peek();
        
        // Handle Comments
        if (ch === '#') {
            stream.skipToEnd();
            return 'comment';
        }
        
        // Handle Number Literals
        if (stream.match(/^[0-9\.]/, false)) {
            var floatLiteral = false;
            // Floats
            if (stream.match(/^\d*\.\d+(e[\+\-]?\d+)?/i)) { floatLiteral = true; }
            if (stream.match(/^\d+\.\d*/)) { floatLiteral = true; }
            if (stream.match(/^\.\d+/)) { floatLiteral = true; }
            if (floatLiteral) {
                // Float literals may be "imaginary"
                stream.eat(/J/i);
                return 'number';
            }
            // Integers
            var intLiteral = false;
            // Hex
            if (stream.match(/^0x[0-9a-f]+/i)) { intLiteral = true; }
            // Binary
            if (stream.match(/^0b[01]+/i)) { intLiteral = true; }
            // Octal
            if (stream.match(/^0o[0-7]+/i)) { intLiteral = true; }
            // Decimal
            if (stream.match(/^[1-9]\d*(e[\+\-]?\d+)?/)) {
                // Decimal literals may be "imaginary"
                stream.eat(/J/i);
                // TODO - Can you have imaginary longs?
                intLiteral = true;
            }
            // Zero by itself with no other piece of number.
            if (stream.match(/^0(?![\dx])/i)) { intLiteral = true; }
            if (intLiteral) {
                // Integer literals may be "long"
                stream.eat(/L/i);
                return 'number';
            }
        }
        
        // Handle Strings
        if (stream.match(stringPrefixes)) {
            state.tokenize = tokenStringFactory(stream.current());
            return state.tokenize(stream, state);
        }
        
        // Handle operators and Delimiters
        if (stream.match(tripleDelimiters) || stream.match(doubleDelimiters)) {
            return null;
        }
        if (stream.match(doubleOperators)
            || stream.match(singleOperators)
            || stream.match(wordOperators)) {
            return 'operator';
        }
        if (stream.match(singleDelimiters)) {
            return null;
        }
        
        if (stream.match(keywords)) {
            return 'keyword';
        }
        
        if (stream.match(builtins)) {
            return 'builtin';
        }
        
        if (stream.match(identifiers)) {
            return 'variable';
        }
        
        // Handle non-detected items
        stream.next();
        return ERRORCLASS;
    }
    
    function tokenStringFactory(delimiter) {
        while ('rub'.indexOf(delimiter.charAt(0).toLowerCase()) >= 0) {
            delimiter = delimiter.substr(1);
        }
        var singleline = delimiter.length == 1;
        var OUTCLASS = 'string';
        
        function tokenString(stream, state) {
            while (!stream.eol()) {
                stream.eatWhile(/[^'"\\]/);
                if (stream.eat('\\')) {
                    stream.next();
                    if (singleline && stream.eol()) {
                        return OUTCLASS;
                    }
                } else if (stream.match(delimiter)) {
                    state.tokenize = tokenBase;
                    return OUTCLASS;
                } else {
                    stream.eat(/['"]/);
                }
            }
            if (singleline) {
                if (parserConf.singleLineStringErrors) {
                    return ERRORCLASS;
                } else {
                    state.tokenize = tokenBase;
                }
            }
            return OUTCLASS;
        }
        tokenString.isString = true;
        return tokenString;
    }
    
    function indent(stream, state, type) {
        type = type || 'py';
        var indentUnit = 0;
        if (type === 'py') {
            if (state.scopes[0].type !== 'py') {
                state.scopes[0].offset = stream.indentation();
                return;
            }
            for (var i = 0; i < state.scopes.length; ++i) {
                if (state.scopes[i].type === 'py') {
                    indentUnit = state.scopes[i].offset + conf.indentUnit;
                    break;
                }
            }
        } else {
            indentUnit = stream.column() + stream.current().length;
        }
        state.scopes.unshift({
            offset: indentUnit,
            type: type
        });
    }
    
    function dedent(stream, state, type) {
        type = type || 'py';
        if (state.scopes.length == 1) return;
        if (state.scopes[0].type === 'py') {
            var _indent = stream.indentation();
            var _indent_index = -1;
            for (var i = 0; i < state.scopes.length; ++i) {
                if (_indent === state.scopes[i].offset) {
                    _indent_index = i;
                    break;
                }
            }
            if (_indent_index === -1) {
                return true;
            }
            while (state.scopes[0].offset !== _indent) {
                state.scopes.shift();
            }
            return false;
        } else {
            if (type === 'py') {
                state.scopes[0].offset = stream.indentation();
                return false;
            } else {
                if (state.scopes[0].type != type) {
                    return true;
                }
                state.scopes.shift();
                return false;
            }
        }
    }

    function tokenLexer(stream, state) {
        indentInfo = null;
        var style = state.tokenize(stream, state);
        var current = stream.current();

        // Handle '.' connected identifiers
        if (current === '.') {
            style = stream.match(identifiers, false) ? null : ERRORCLASS;
            if (style === null && state.lastToken === 'meta') {
                // Apply 'meta' style to '.' connected identifiers when
                // appropriate.
                style = 'meta';
            }
            return style;
        }
        
        // Handle decorators
        if (current === '@') {
            return stream.match(identifiers, false) ? 'meta' : ERRORCLASS;
        }

        if ((style === 'variable' || style === 'builtin')
            && state.lastToken === 'meta') {
            style = 'meta';
        }
        
        // Handle scope changes.
        if (current === 'pass' || current === 'return') {
            state.dedent += 1;
        }
        if (current === 'lambda') state.lambda = true;
        if ((current === ':' && !state.lambda && state.scopes[0].type == 'py')
            || indentInfo === 'indent') {
            indent(stream, state);
        }
        var delimiter_index = '[({'.indexOf(current);
        if (delimiter_index !== -1) {
            indent(stream, state, '])}'.slice(delimiter_index, delimiter_index+1));
        }
        if (indentInfo === 'dedent') {
            if (dedent(stream, state)) {
                return ERRORCLASS;
            }
        }
        delimiter_index = '])}'.indexOf(current);
        if (delimiter_index !== -1) {
            if (dedent(stream, state, current)) {
                return ERRORCLASS;
            }
        }
        if (state.dedent > 0 && stream.eol() && state.scopes[0].type == 'py') {
            if (state.scopes.length > 1) state.scopes.shift();
            state.dedent -= 1;
        }
        
        return style;
    }

    var external = {
        startState: function(basecolumn) {
            return {
              tokenize: tokenBase,
              scopes: [{offset:basecolumn || 0, type:'py'}],
              lastToken: null,
              lambda: false,
              dedent: 0
          };
        },
        
        token: function(stream, state) {
            var style = tokenLexer(stream, state);
            
            state.lastToken = style;
            
            if (stream.eol() && stream.lambda) {
                state.lambda = false;
            }
            
            return style;
        },
        
        indent: function(state) {
            if (state.tokenize != tokenBase) {
                return state.tokenize.isString ? CodeMirror.Pass : 0;
            }
            
            return state.scopes[0].offset;
        }
        
    };
    return external;
});

CodeMirror.defineMIME("text/x-python", "python");
