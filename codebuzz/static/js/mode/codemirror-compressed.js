CodeMirror.defineMode("clike",function(e,t){function n(e,t){var n=e.next();if(m[n]){var s=m[n](e,t);if(s!==!1)return s}if('"'==n||"'"==n)return t.tokenize=r(n),t.tokenize(e,t);if(/[\[\]{}\(\),;\:\.]/.test(n))return a=n,null;if(/\d/.test(n))return e.eatWhile(/[\w\.]/),"number";if("/"==n){if(e.eat("*"))return t.tokenize=i,i(e,t);if(e.eat("/"))return e.skipToEnd(),"comment"}if(y.test(n))return e.eatWhile(y),"operator";e.eatWhile(/[\w\$_]/);var o=e.current();return h.propertyIsEnumerable(o)?(d.propertyIsEnumerable(o)&&(a="newstatement"),"keyword"):p.propertyIsEnumerable(o)?(d.propertyIsEnumerable(o)&&(a="newstatement"),"builtin"):v.propertyIsEnumerable(o)?"atom":"variable"}function r(e){return function(t,n){for(var r,i=!1,s=!1;null!=(r=t.next());){if(r==e&&!i){s=!0;break}i=!i&&"\\"==r}return(s||!i&&!g)&&(n.tokenize=null),"string"}}function i(e,t){for(var n,r=!1;n=e.next();){if("/"==n&&r){t.tokenize=null;break}r="*"==n}return"comment"}function s(e,t,n,r,i){this.indented=e,this.column=t,this.type=n,this.align=r,this.prev=i}function o(e,t,n){var r=e.indented;return e.context&&"statement"==e.context.type&&(r=e.context.indented),e.context=new s(r,t,n,null,e.context)}function u(e){var t=e.context.type;return(")"==t||"]"==t||"}"==t)&&(e.indented=e.context.indented),e.context=e.context.prev}var a,f=e.indentUnit,l=t.statementIndentUnit||f,c=t.dontAlignCalls,h=t.keywords||{},p=t.builtin||{},d=t.blockKeywords||{},v=t.atoms||{},m=t.hooks||{},g=t.multiLineStrings,y=/[+\-*&%=<>!?|\/]/;return{startState:function(e){return{tokenize:null,context:new s((e||0)-f,0,"top",!1),indented:0,startOfLine:!0}},token:function(e,t){var r=t.context;if(e.sol()&&(null==r.align&&(r.align=!1),t.indented=e.indentation(),t.startOfLine=!0),e.eatSpace())return null;a=null;var i=(t.tokenize||n)(e,t);if("comment"==i||"meta"==i)return i;if(null==r.align&&(r.align=!0),";"!=a&&":"!=a&&","!=a||"statement"!=r.type)if("{"==a)o(t,e.column(),"}");else if("["==a)o(t,e.column(),"]");else if("("==a)o(t,e.column(),")");else if("}"==a){for(;"statement"==r.type;)r=u(t);for("}"==r.type&&(r=u(t));"statement"==r.type;)r=u(t)}else a==r.type?u(t):(("}"==r.type||"top"==r.type)&&";"!=a||"statement"==r.type&&"newstatement"==a)&&o(t,e.column(),"statement");else u(t);return t.startOfLine=!1,i},indent:function(e,t){if(e.tokenize!=n&&null!=e.tokenize)return CodeMirror.Pass;var r=e.context,i=t&&t.charAt(0);"statement"==r.type&&"}"==i&&(r=r.prev);var s=i==r.type;return"statement"==r.type?r.indented+("{"==i?0:l):c&&")"==r.type&&!s?r.indented+l:r.align?r.column+(s?0:1):r.indented+(s?0:f)},electricChars:"{}"}}),function(){function e(e){for(var t={},n=e.split(" "),r=0;n.length>r;++r)t[n[r]]=!0;return t}function t(e,n){if(!n.startOfLine)return!1;for(;;){if(!e.skipTo("\\")){e.skipToEnd(),n.tokenize=null;break}if(e.next(),e.eol()){n.tokenize=t;break}}return"meta"}function n(e,t){for(var n;null!=(n=e.next());)if('"'==n&&!e.eat('"')){t.tokenize=null;break}return"string"}function r(e,t){for(var n=0;e.length>n;++n)CodeMirror.defineMIME(e[n],t)}var i="auto if break int case long char register continue return default short do sizeof double static else struct entry switch extern typedef float union for unsigned goto while enum void const signed volatile";r(["text/x-csrc","text/x-c","text/x-chdr"],{name:"clike",keywords:e(i),blockKeywords:e("case do else for if switch while struct"),atoms:e("null"),hooks:{"#":t}}),r(["text/x-c++src","text/x-c++hdr"],{name:"clike",keywords:e(i+" asm dynamic_cast namespace reinterpret_cast try bool explicit new "+"static_cast typeid catch operator template typename class friend private "+"this using const_cast inline public throw virtual delete mutable protected "+"wchar_t"),blockKeywords:e("catch class do else finally for if struct switch try while"),atoms:e("true false null"),hooks:{"#":t}}),CodeMirror.defineMIME("text/x-java",{name:"clike",keywords:e("abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try void volatile while"),blockKeywords:e("catch class do else finally for if switch try while"),atoms:e("true false null"),hooks:{"@":function(e){return e.eatWhile(/[\w\$_]/),"meta"}}}),CodeMirror.defineMIME("text/x-csharp",{name:"clike",keywords:e("abstract as base break case catch checked class const continue default delegate do else enum event explicit extern finally fixed for foreach goto if implicit in interface internal is lock namespace new operator out override params private protected public readonly ref return sealed sizeof stackalloc static struct switch this throw try typeof unchecked unsafe using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield"),blockKeywords:e("catch class do else finally for foreach if struct switch try while"),builtin:e("Boolean Byte Char DateTime DateTimeOffset Decimal Double Guid Int16 Int32 Int64 Object SByte Single String TimeSpan UInt16 UInt32 UInt64 bool byte char decimal double short int long object sbyte float string ushort uint ulong"),atoms:e("true false null"),hooks:{"@":function(e,t){return e.eat('"')?(t.tokenize=n,n(e,t)):(e.eatWhile(/[\w\$_]/),"meta")}}}),CodeMirror.defineMIME("text/x-scala",{name:"clike",keywords:e("abstract case catch class def do else extends false final finally for forSome if implicit import lazy match new null object override package private protected return sealed super this throw trait try trye type val var while with yield _ : = => <- <: <% >: # @ assert assume require print println printf readLine readBoolean readByte readShort readChar readInt readLong readFloat readDouble AnyVal App Application Array BufferedIterator BigDecimal BigInt Char Console Either Enumeration Equiv Error Exception Fractional Function IndexedSeq Integral Iterable Iterator List Map Numeric Nil NotNull Option Ordered Ordering PartialFunction PartialOrdering Product Proxy Range Responder Seq Serializable Set Specializable Stream StringBuilder StringContext Symbol Throwable Traversable TraversableOnce Tuple Unit Vector :: #:: Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),blockKeywords:e("catch class do else finally for forSome if match switch try while"),atoms:e("true false null"),hooks:{"@":function(e){return e.eatWhile(/[\w\$_]/),"meta"}}})}();CodeMirror.defineMode("javascript",function(e,t){function n(e,t,n){t.tokenize=n;return n(e,t)}function r(e,t){var n=false,r;while((r=e.next())!=null){if(r==t&&!n)return false;n=!n&&r=="\\"}return n}function i(e,t,n){z=e;W=n;return t}function s(e,t){var s=e.next();if(s=='"'||s=="'")return n(e,t,o(s));else if(/[\[\]{}\(\),;\:\.]/.test(s))return i(s);else if(s=="0"&&e.eat(/x/i)){e.eatWhile(/[\da-f]/i);return i("number","number")}else if(/\d/.test(s)||s=="-"&&e.eat(/\d/)){e.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);return i("number","number")}else if(s=="/"){if(e.eat("*")){return n(e,t,u)}else if(e.eat("/")){e.skipToEnd();return i("comment","comment")}else if(t.lastType=="operator"||t.lastType=="keyword c"||/^[\[{}\(,;:]$/.test(t.lastType)){r(e,"/");e.eatWhile(/[gimy]/);return i("regexp","string-2")}else{e.eatWhile(U);return i("operator",null,e.current())}}else if(s=="#"){e.skipToEnd();return i("error","error")}else if(U.test(s)){e.eatWhile(U);return i("operator",null,e.current())}else{e.eatWhile(/[\w\$_]/);var a=e.current(),f=R.propertyIsEnumerable(a)&&R[a];return f&&t.lastType!="."?i(f.type,f.style,a):i("variable","variable",a)}}function o(e){return function(t,n){if(!r(t,e))n.tokenize=s;return i("string","string")}}function u(e,t){var n=false,r;while(r=e.next()){if(r=="/"&&n){t.tokenize=s;break}n=r=="*"}return i("comment","comment")}function a(e,t,n,r,i,s){this.indented=e;this.column=t;this.type=n;this.prev=i;this.info=s;if(r!=null)this.align=r}function f(e,t){for(var n=e.localVars;n;n=n.next)if(n.name==t)return true}function l(e,t,n,r,i){var s=e.cc;V.state=e;V.stream=i;V.marked=null,V.cc=s;if(!e.lexical.hasOwnProperty("align"))e.lexical.align=true;while(true){var o=s.length?s.pop():I?w:b;if(o(n,r)){while(s.length&&s[s.length-1].lex)s.pop()();if(V.marked)return V.marked;if(n=="variable"&&f(e,r))return"variable-2";return t}}}function c(){for(var e=arguments.length-1;e>=0;e--)V.cc.push(arguments[e])}function h(){c.apply(null,arguments);return true}function p(e){function t(t){for(var n=t;n;n=n.next)if(n.name==e)return true;return false}var n=V.state;if(n.context){V.marked="def";if(t(n.localVars))return;n.localVars={name:e,next:n.localVars}}else{if(t(n.globalVars))return;n.globalVars={name:e,next:n.globalVars}}}function d(){V.state.context={prev:V.state.context,vars:V.state.localVars};V.state.localVars=$}function v(){V.state.localVars=V.state.context.vars;V.state.context=V.state.context.prev}function m(e,t){var n=function(){var n=V.state;n.lexical=new a(n.indented,V.stream.column(),e,null,n.lexical,t)};n.lex=true;return n}function g(){var e=V.state;if(e.lexical.prev){if(e.lexical.type==")")e.indented=e.lexical.indented;e.lexical=e.lexical.prev}}function y(e){return function(t){if(t==e)return h();else if(e==";")return c();else return h(arguments.callee)}}function b(e){if(e=="var")return h(m("vardef"),O,y(";"),g);if(e=="keyword a")return h(m("form"),w,b,g);if(e=="keyword b")return h(m("form"),b,g);if(e=="{")return h(m("}"),k,g);if(e==";")return h();if(e=="function")return h(B);if(e=="for")return h(m("form"),y("("),m(")"),_,y(")"),g,b,g);if(e=="variable")return h(m("stat"),x);if(e=="switch")return h(m("form"),w,m("}","switch"),y("{"),k,g,g);if(e=="case")return h(w,y(":"));if(e=="default")return h(y(":"));if(e=="catch")return h(m("form"),d,y("("),j,y(")"),b,g,v);return c(m("stat"),w,y(";"),g)}function w(e){if(X.hasOwnProperty(e))return h(S);if(e=="function")return h(B);if(e=="keyword c")return h(E);if(e=="(")return h(m(")"),E,y(")"),g,S);if(e=="operator")return h(w);if(e=="[")return h(m("]"),C(w,"]"),g,S);if(e=="{")return h(m("}"),C(N,"}"),g,S);return h()}function E(e){if(e.match(/[;\}\)\],]/))return c();return c(w)}function S(e,t){if(e=="operator"&&/\+\+|--/.test(t))return h(S);if(e=="operator"&&t=="?")return h(w,y(":"),w);if(e==";")return;if(e=="(")return h(m(")"),C(w,")"),g,S);if(e==".")return h(T,S);if(e=="[")return h(m("]"),w,y("]"),g,S)}function x(e){if(e==":")return h(g,b);return c(S,y(";"),g)}function T(e){if(e=="variable"){V.marked="property";return h()}}function N(e){if(e=="variable")V.marked="property";if(X.hasOwnProperty(e))return h(y(":"),w)}function C(e,t){function n(r){if(r==",")return h(e,n);if(r==t)return h();return h(y(t))}return function(r){if(r==t)return h();else return c(e,n)}}function k(e){if(e=="}")return h();return c(b,k)}function L(e){if(e==":")return h(A);return c()}function A(e){if(e=="variable"){V.marked="variable-3";return h()}return c()}function O(e,t){if(e=="variable"){p(t);return q?h(L,M):h(M)}return c()}function M(e,t){if(t=="=")return h(w,M);if(e==",")return h(O)}function _(e){if(e=="var")return h(O,y(";"),P);if(e==";")return h(P);if(e=="variable")return h(D);return h(P)}function D(e,t){if(t=="in")return h(w);return h(S,P)}function P(e,t){if(e==";")return h(H);if(t=="in")return h(w);return h(w,y(";"),H)}function H(e){if(e!=")")h(w)}function B(e,t){if(e=="variable"){p(t);return h(B)}if(e=="(")return h(m(")"),d,C(j,")"),g,b,v)}function j(e,t){if(e=="variable"){p(t);return q?h(L):h()}}var F=e.indentUnit;var I=t.json;var q=t.typescript;var R=function(){function e(e){return{type:e,style:"keyword"}}var t=e("keyword a"),n=e("keyword b"),r=e("keyword c");var i=e("operator"),s={type:"atom",style:"atom"};var o={"if":t,"while":t,"with":t,"else":n,"do":n,"try":n,"finally":n,"return":r,"break":r,"continue":r,"new":r,"delete":r,"throw":r,"var":e("var"),"const":e("var"),let:e("var"),"function":e("function"),"catch":e("catch"),"for":e("for"),"switch":e("switch"),"case":e("case"),"default":e("default"),"in":i,"typeof":i,"instanceof":i,"true":s,"false":s,"null":s,"undefined":s,NaN:s,Infinity:s};if(q){var u={type:"variable",style:"variable-3"};var a={"interface":e("interface"),"class":e("class"),"extends":e("extends"),constructor:e("constructor"),"public":e("public"),"private":e("private"),"protected":e("protected"),"static":e("static"),"super":e("super"),string:u,number:u,bool:u,any:u};for(var f in a){o[f]=a[f]}}return o}();var U=/[+\-*&%=<>!?|]/;var z,W;var X={atom:true,number:true,variable:true,string:true,regexp:true};var V={state:null,column:null,marked:null,cc:null};var $={name:"this",next:{name:"arguments"}};g.lex=true;return{startState:function(e){return{tokenize:s,lastType:null,cc:[],lexical:new a((e||0)-F,0,"block",false),localVars:t.localVars,globalVars:t.globalVars,context:t.localVars&&{vars:t.localVars},indented:0}},token:function(e,t){if(e.sol()){if(!t.lexical.hasOwnProperty("align"))t.lexical.align=false;t.indented=e.indentation()}if(e.eatSpace())return null;var n=t.tokenize(e,t);if(z=="comment")return n;t.lastType=z;return l(t,n,z,W,e)},indent:function(e,t){if(e.tokenize==u)return CodeMirror.Pass;if(e.tokenize!=s)return 0;var n=t&&t.charAt(0),r=e.lexical;if(r.type=="stat"&&n=="}")r=r.prev;var i=r.type,o=n==i;if(i=="vardef")return r.indented+(e.lastType=="operator"||e.lastType==","?4:0);else if(i=="form"&&n=="{")return r.indented;else if(i=="form")return r.indented+F;else if(i=="stat")return r.indented+(e.lastType=="operator"||e.lastType==","?F:0);else if(r.info=="switch"&&!o)return r.indented+(/^(?:case|default)\b/.test(t)?F:2*F);else if(r.align)return r.column+(o?0:1);else return r.indented+(o?0:F)},electricChars:":{}",jsonMode:I}});CodeMirror.defineMIME("text/javascript","javascript");CodeMirror.defineMIME("text/ecmascript","javascript");CodeMirror.defineMIME("application/javascript","javascript");CodeMirror.defineMIME("application/ecmascript","javascript");CodeMirror.defineMIME("application/json",{name:"javascript",json:true});CodeMirror.defineMIME("text/typescript",{name:"javascript",typescript:true});CodeMirror.defineMIME("application/typescript",{name:"javascript",typescript:true});CodeMirror.defineMode("python",function(e,t){function r(e){return new RegExp("^(("+e.join(")|(")+"))\\b")}function b(e,t){if(e.sol()){var r=t.scopes[0].offset;if(e.eatSpace()){var c=e.indentation();if(c>r){y="indent"}else if(c<r){y="dedent"}return null}else{if(r>0){S(e,t)}}}if(e.eatSpace()){return null}var h=e.peek();if(h==="#"){e.skipToEnd();return"comment"}if(e.match(/^[0-9\.]/,false)){var p=false;if(e.match(/^\d*\.\d+(e[\+\-]?\d+)?/i)){p=true}if(e.match(/^\d+\.\d*/)){p=true}if(e.match(/^\.\d+/)){p=true}if(p){e.eat(/J/i);return"number"}var d=false;if(e.match(/^0x[0-9a-f]+/i)){d=true}if(e.match(/^0b[01]+/i)){d=true}if(e.match(/^0o[0-7]+/i)){d=true}if(e.match(/^[1-9]\d*(e[\+\-]?\d+)?/)){e.eat(/J/i);d=true}if(e.match(/^0(?![\dx])/i)){d=true}if(d){e.eat(/L/i);return"number"}}if(e.match(v)){t.tokenize=w(e.current());return t.tokenize(e,t)}if(e.match(a)||e.match(u)){return null}if(e.match(o)||e.match(i)||e.match(l)){return"operator"}if(e.match(s)){return null}if(e.match(m)){return"keyword"}if(e.match(g)){return"builtin"}if(e.match(f)){return"variable"}e.next();return n}function w(e){function s(s,o){while(!s.eol()){s.eatWhile(/[^'"\\]/);if(s.eat("\\")){s.next();if(r&&s.eol()){return i}}else if(s.match(e)){o.tokenize=b;return i}else{s.eat(/['"]/)}}if(r){if(t.singleLineStringErrors){return n}else{o.tokenize=b}}return i}while("rub".indexOf(e.charAt(0).toLowerCase())>=0){e=e.substr(1)}var r=e.length==1;var i="string";s.isString=true;return s}function E(t,n,r){r=r||"py";var i=0;if(r==="py"){if(n.scopes[0].type!=="py"){n.scopes[0].offset=t.indentation();return}for(var s=0;s<n.scopes.length;++s){if(n.scopes[s].type==="py"){i=n.scopes[s].offset+e.indentUnit;break}}}else{i=t.column()+t.current().length}n.scopes.unshift({offset:i,type:r})}function S(e,t,n){n=n||"py";if(t.scopes.length==1)return;if(t.scopes[0].type==="py"){var r=e.indentation();var i=-1;for(var s=0;s<t.scopes.length;++s){if(r===t.scopes[s].offset){i=s;break}}if(i===-1){return true}while(t.scopes[0].offset!==r){t.scopes.shift()}return false}else{if(n==="py"){t.scopes[0].offset=e.indentation();return false}else{if(t.scopes[0].type!=n){return true}t.scopes.shift();return false}}}function x(e,t){y=null;var r=t.tokenize(e,t);var i=e.current();if(i==="."){r=e.match(f,false)?null:n;if(r===null&&t.lastToken==="meta"){r="meta"}return r}if(i==="@"){return e.match(f,false)?"meta":n}if((r==="variable"||r==="builtin")&&t.lastToken==="meta"){r="meta"}if(i==="pass"||i==="return"){t.dedent+=1}if(i==="lambda")t.lambda=true;if(i===":"&&!t.lambda&&t.scopes[0].type=="py"||y==="indent"){E(e,t)}var s="[({".indexOf(i);if(s!==-1){E(e,t,"])}".slice(s,s+1))}if(y==="dedent"){if(S(e,t)){return n}}s="])}".indexOf(i);if(s!==-1){if(S(e,t,i)){return n}}if(t.dedent>0&&e.eol()&&t.scopes[0].type=="py"){if(t.scopes.length>1)t.scopes.shift();t.dedent-=1}return r}var n="error";var i=new RegExp("^[\\+\\-\\*/%&|\\^~<>!]");var s=new RegExp("^[\\(\\)\\[\\]\\{\\}@,:`=;\\.]");var o=new RegExp("^((==)|(!=)|(<=)|(>=)|(<>)|(<<)|(>>)|(//)|(\\*\\*))");var u=new RegExp("^((\\+=)|(\\-=)|(\\*=)|(%=)|(/=)|(&=)|(\\|=)|(\\^=))");var a=new RegExp("^((//=)|(>>=)|(<<=)|(\\*\\*=))");var f=new RegExp("^[_A-Za-z][_A-Za-z0-9]*");var l=r(["and","or","not","is","in"]);var c=["as","assert","break","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","lambda","pass","raise","return","try","while","with","yield"];var h=["abs","all","any","bin","bool","bytearray","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip","__import__","NotImplemented","Ellipsis","__debug__"];var p={builtins:["apply","basestring","buffer","cmp","coerce","execfile","file","intern","long","raw_input","reduce","reload","unichr","unicode","xrange","False","True","None"],keywords:["exec","print"]};var d={builtins:["ascii","bytes","exec","print"],keywords:["nonlocal","False","True","None"]};if(!!t.version&&parseInt(t.version,10)===3){c=c.concat(d.keywords);h=h.concat(d.builtins);var v=new RegExp("^(([rb]|(br))?('{3}|\"{3}|['\"]))","i")}else{c=c.concat(p.keywords);h=h.concat(p.builtins);var v=new RegExp("^(([rub]|(ur)|(br))?('{3}|\"{3}|['\"]))","i")}var m=r(c);var g=r(h);var y=null;var T={startState:function(e){return{tokenize:b,scopes:[{offset:e||0,type:"py"}],lastToken:null,lambda:false,dedent:0}},token:function(e,t){var n=x(e,t);t.lastToken=n;if(e.eol()&&e.lambda){t.lambda=false}return n},indent:function(e){if(e.tokenize!=b){return e.tokenize.isString?CodeMirror.Pass:0}return e.scopes[0].offset}};return T});CodeMirror.defineMIME("text/x-python","python")