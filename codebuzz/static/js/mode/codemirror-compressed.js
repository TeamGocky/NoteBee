CodeMirror.defineMode("clike",function(a,b){function n(a,b){var c=a.next();if(j[c]){var d=j[c](a,b);if(d!==!1)return d}if('"'==c||"'"==c)return b.tokenize=o(c),b.tokenize(a,b);if(/[\[\]{}\(\),;\:\.]/.test(c))return m=c,null;if(/\d/.test(c))return a.eatWhile(/[\w\.]/),"number";if("/"==c){if(a.eat("*"))return b.tokenize=p,p(a,b);if(a.eat("/"))return a.skipToEnd(),"comment"}if(l.test(c))return a.eatWhile(l),"operator";a.eatWhile(/[\w\$_]/);var e=a.current();return f.propertyIsEnumerable(e)?(h.propertyIsEnumerable(e)&&(m="newstatement"),"keyword"):g.propertyIsEnumerable(e)?(h.propertyIsEnumerable(e)&&(m="newstatement"),"builtin"):i.propertyIsEnumerable(e)?"atom":"variable"}function o(a){return function(b,c){for(var e,d=!1,f=!1;null!=(e=b.next());){if(e==a&&!d){f=!0;break}d=!d&&"\\"==e}return(f||!d&&!k)&&(c.tokenize=null),"string"}}function p(a,b){for(var d,c=!1;d=a.next();){if("/"==d&&c){b.tokenize=null;break}c="*"==d}return"comment"}function q(a,b,c,d,e){this.indented=a,this.column=b,this.type=c,this.align=d,this.prev=e}function r(a,b,c){var d=a.indented;return a.context&&"statement"==a.context.type&&(d=a.context.indented),a.context=new q(d,b,c,null,a.context)}function s(a){var b=a.context.type;return(")"==b||"]"==b||"}"==b)&&(a.indented=a.context.indented),a.context=a.context.prev}var m,c=a.indentUnit,d=b.statementIndentUnit||c,e=b.dontAlignCalls,f=b.keywords||{},g=b.builtin||{},h=b.blockKeywords||{},i=b.atoms||{},j=b.hooks||{},k=b.multiLineStrings,l=/[+\-*&%=<>!?|\/]/;return{startState:function(a){return{tokenize:null,context:new q((a||0)-c,0,"top",!1),indented:0,startOfLine:!0}},token:function(a,b){var c=b.context;if(a.sol()&&(null==c.align&&(c.align=!1),b.indented=a.indentation(),b.startOfLine=!0),a.eatSpace())return null;m=null;var d=(b.tokenize||n)(a,b);if("comment"==d||"meta"==d)return d;if(null==c.align&&(c.align=!0),";"!=m&&":"!=m&&","!=m||"statement"!=c.type)if("{"==m)r(b,a.column(),"}");else if("["==m)r(b,a.column(),"]");else if("("==m)r(b,a.column(),")");else if("}"==m){for(;"statement"==c.type;)c=s(b);for("}"==c.type&&(c=s(b));"statement"==c.type;)c=s(b)}else m==c.type?s(b):(("}"==c.type||"top"==c.type)&&";"!=m||"statement"==c.type&&"newstatement"==m)&&r(b,a.column(),"statement");else s(b);return b.startOfLine=!1,d},indent:function(a,b){if(a.tokenize!=n&&null!=a.tokenize)return CodeMirror.Pass;var f=a.context,g=b&&b.charAt(0);"statement"==f.type&&"}"==g&&(f=f.prev);var h=g==f.type;return"statement"==f.type?f.indented+("{"==g?0:d):e&&")"==f.type&&!h?f.indented+d:f.align?f.column+(h?0:1):f.indented+(h?0:c)},electricChars:"{}"}}),function(){function a(a){for(var b={},c=a.split(" "),d=0;c.length>d;++d)b[c[d]]=!0;return b}function c(a,b){if(!b.startOfLine)return!1;for(;;){if(!a.skipTo("\\")){a.skipToEnd(),b.tokenize=null;break}if(a.next(),a.eol()){b.tokenize=c;break}}return"meta"}function d(a,b){for(var c;null!=(c=a.next());)if('"'==c&&!a.eat('"')){b.tokenize=null;break}return"string"}function e(a,b){for(var c=0;a.length>c;++c)CodeMirror.defineMIME(a[c],b)}var b="auto if break int case long char register continue return default short do sizeof double static else struct entry switch extern typedef float union for unsigned goto while enum void const signed volatile";e(["text/x-csrc","text/x-c","text/x-chdr"],{name:"clike",keywords:a(b),blockKeywords:a("case do else for if switch while struct"),atoms:a("null"),hooks:{"#":c}}),e(["text/x-c++src","text/x-c++hdr"],{name:"clike",keywords:a(b+" asm dynamic_cast namespace reinterpret_cast try bool explicit new "+"static_cast typeid catch operator template typename class friend private "+"this using const_cast inline public throw virtual delete mutable protected "+"wchar_t"),blockKeywords:a("catch class do else finally for if struct switch try while"),atoms:a("true false null"),hooks:{"#":c}}),CodeMirror.defineMIME("text/x-java",{name:"clike",keywords:a("abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try void volatile while"),blockKeywords:a("catch class do else finally for if switch try while"),atoms:a("true false null"),hooks:{"@":function(a){return a.eatWhile(/[\w\$_]/),"meta"}}}),CodeMirror.defineMIME("text/x-csharp",{name:"clike",keywords:a("abstract as base break case catch checked class const continue default delegate do else enum event explicit extern finally fixed for foreach goto if implicit in interface internal is lock namespace new operator out override params private protected public readonly ref return sealed sizeof stackalloc static struct switch this throw try typeof unchecked unsafe using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield"),blockKeywords:a("catch class do else finally for foreach if struct switch try while"),builtin:a("Boolean Byte Char DateTime DateTimeOffset Decimal Double Guid Int16 Int32 Int64 Object SByte Single String TimeSpan UInt16 UInt32 UInt64 bool byte char decimal double short int long object sbyte float string ushort uint ulong"),atoms:a("true false null"),hooks:{"@":function(a,b){return a.eat('"')?(b.tokenize=d,d(a,b)):(a.eatWhile(/[\w\$_]/),"meta")}}}),CodeMirror.defineMIME("text/x-scala",{name:"clike",keywords:a("abstract case catch class def do else extends false final finally for forSome if implicit import lazy match new null object override package private protected return sealed super this throw trait try trye type val var while with yield _ : = => <- <: <% >: # @ assert assume require print println printf readLine readBoolean readByte readShort readChar readInt readLong readFloat readDouble AnyVal App Application Array BufferedIterator BigDecimal BigInt Char Console Either Enumeration Equiv Error Exception Fractional Function IndexedSeq Integral Iterable Iterator List Map Numeric Nil NotNull Option Ordered Ordering PartialFunction PartialOrdering Product Proxy Range Responder Seq Serializable Set Specializable Stream StringBuilder StringContext Symbol Throwable Traversable TraversableOnce Tuple Unit Vector :: #:: Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),blockKeywords:a("catch class do else finally for forSome if match switch try while"),atoms:a("true false null"),hooks:{"@":function(a){return a.eatWhile(/[\w\$_]/),"meta"}}})}();