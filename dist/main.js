!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function r(e,t){if(t.length<e)throw new TypeError(e+" argument"+e>1?"s":" required, but only "+t.length+" present")}function a(e){r(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function i(e){r(1,arguments);var t=a(e);return!isNaN(t)}n.r(t);var o={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function s(e){return function(t){var n=t||{},r=n.width?String(n.width):e.defaultWidth;return e.formats[r]||e.formats[e.defaultWidth]}}var c={date:s({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:s({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:s({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},u={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function d(e){return function(t,n){var r,a=n||{};if("formatting"===(a.context?String(a.context):"standalone")&&e.formattingValues){var i=e.defaultFormattingWidth||e.defaultWidth,o=a.width?String(a.width):i;r=e.formattingValues[o]||e.formattingValues[i]}else{var s=e.defaultWidth,c=a.width?String(a.width):e.defaultWidth;r=e.values[c]||e.values[s]}return r[e.argumentCallback?e.argumentCallback(t):t]}}function l(e){return function(t,n){var r=String(t),a=n||{},i=a.width,o=i&&e.matchPatterns[i]||e.matchPatterns[e.defaultMatchWidth],s=r.match(o);if(!s)return null;var c,u=s[0],d=i&&e.parsePatterns[i]||e.parsePatterns[e.defaultParseWidth];return c="[object Array]"===Object.prototype.toString.call(d)?function(e,t){for(var n=0;n<e.length;n++)if(t(e[n]))return n}(d,(function(e){return e.test(r)})):function(e,t){for(var n in e)if(e.hasOwnProperty(n)&&t(e[n]))return n}(d,(function(e){return e.test(r)})),c=e.valueCallback?e.valueCallback(c):c,{value:c=a.valueCallback?a.valueCallback(c):c,rest:r.slice(u.length)}}}var h,m={code:"en-US",formatDistance:function(e,t,n){var r;return n=n||{},r="string"==typeof o[e]?o[e]:1===t?o[e].one:o[e].other.replace("{{count}}",t),n.addSuffix?n.comparison>0?"in "+r:r+" ago":r},formatLong:c,formatRelative:function(e,t,n,r){return u[e]},localize:{ordinalNumber:function(e,t){var n=Number(e),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:d({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:d({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(e){return Number(e)-1}}),month:d({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:d({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:d({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(h={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}},function(e,t){var n=String(e),r=t||{},a=n.match(h.matchPattern);if(!a)return null;var i=a[0],o=n.match(h.parsePattern);if(!o)return null;var s=h.valueCallback?h.valueCallback(o[0]):o[0];return{value:s=r.valueCallback?r.valueCallback(s):s,rest:n.slice(i.length)}}),era:l({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:l({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:l({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:l({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:l({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function f(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function g(e,t){r(2,arguments);var n=a(e).getTime(),i=f(t);return new Date(n+i)}function p(e,t){r(2,arguments);var n=f(t);return g(e,-n)}function w(e,t){for(var n=e<0?"-":"",r=Math.abs(e).toString();r.length<t;)r="0"+r;return n+r}var v={y:function(e,t){var n=e.getUTCFullYear(),r=n>0?n:1-n;return w("yy"===t?r%100:r,t.length)},M:function(e,t){var n=e.getUTCMonth();return"M"===t?String(n+1):w(n+1,2)},d:function(e,t){return w(e.getUTCDate(),t.length)},a:function(e,t){var n=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":case"aaa":return n.toUpperCase();case"aaaaa":return n[0];case"aaaa":default:return"am"===n?"a.m.":"p.m."}},h:function(e,t){return w(e.getUTCHours()%12||12,t.length)},H:function(e,t){return w(e.getUTCHours(),t.length)},m:function(e,t){return w(e.getUTCMinutes(),t.length)},s:function(e,t){return w(e.getUTCSeconds(),t.length)},S:function(e,t){var n=t.length,r=e.getUTCMilliseconds();return w(Math.floor(r*Math.pow(10,n-3)),t.length)}};function y(e){r(1,arguments);var t=1,n=a(e),i=n.getUTCDay(),o=(i<t?7:0)+i-t;return n.setUTCDate(n.getUTCDate()-o),n.setUTCHours(0,0,0,0),n}function C(e){r(1,arguments);var t=a(e),n=t.getUTCFullYear(),i=new Date(0);i.setUTCFullYear(n+1,0,4),i.setUTCHours(0,0,0,0);var o=y(i),s=new Date(0);s.setUTCFullYear(n,0,4),s.setUTCHours(0,0,0,0);var c=y(s);return t.getTime()>=o.getTime()?n+1:t.getTime()>=c.getTime()?n:n-1}function b(e){r(1,arguments);var t=C(e),n=new Date(0);n.setUTCFullYear(t,0,4),n.setUTCHours(0,0,0,0);var a=y(n);return a}function T(e,t){r(1,arguments);var n=t||{},i=n.locale,o=i&&i.options&&i.options.weekStartsOn,s=null==o?0:f(o),c=null==n.weekStartsOn?s:f(n.weekStartsOn);if(!(c>=0&&c<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var u=a(e),d=u.getUTCDay(),l=(d<c?7:0)+d-c;return u.setUTCDate(u.getUTCDate()-l),u.setUTCHours(0,0,0,0),u}function k(e,t){r(1,arguments);var n=a(e,t),i=n.getUTCFullYear(),o=t||{},s=o.locale,c=s&&s.options&&s.options.firstWeekContainsDate,u=null==c?1:f(c),d=null==o.firstWeekContainsDate?u:f(o.firstWeekContainsDate);if(!(d>=1&&d<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var l=new Date(0);l.setUTCFullYear(i+1,0,d),l.setUTCHours(0,0,0,0);var h=T(l,t),m=new Date(0);m.setUTCFullYear(i,0,d),m.setUTCHours(0,0,0,0);var g=T(m,t);return n.getTime()>=h.getTime()?i+1:n.getTime()>=g.getTime()?i:i-1}function D(e,t){r(1,arguments);var n=t||{},a=n.locale,i=a&&a.options&&a.options.firstWeekContainsDate,o=null==i?1:f(i),s=null==n.firstWeekContainsDate?o:f(n.firstWeekContainsDate),c=k(e,t),u=new Date(0);u.setUTCFullYear(c,0,s),u.setUTCHours(0,0,0,0);var d=T(u,t);return d}var M="midnight",E="noon",x="morning",P="afternoon",S="evening",N="night";function U(e,t){var n=e>0?"-":"+",r=Math.abs(e),a=Math.floor(r/60),i=r%60;if(0===i)return n+String(a);var o=t||"";return n+String(a)+o+w(i,2)}function O(e,t){return e%60==0?(e>0?"-":"+")+w(Math.abs(e)/60,2):W(e,t)}function W(e,t){var n=t||"",r=e>0?"-":"+",a=Math.abs(e);return r+w(Math.floor(a/60),2)+n+w(a%60,2)}var j={G:function(e,t,n){var r=e.getUTCFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});case"GGGG":default:return n.era(r,{width:"wide"})}},y:function(e,t,n){if("yo"===t){var r=e.getUTCFullYear(),a=r>0?r:1-r;return n.ordinalNumber(a,{unit:"year"})}return v.y(e,t)},Y:function(e,t,n,r){var a=k(e,r),i=a>0?a:1-a;return"YY"===t?w(i%100,2):"Yo"===t?n.ordinalNumber(i,{unit:"year"}):w(i,t.length)},R:function(e,t){return w(C(e),t.length)},u:function(e,t){return w(e.getUTCFullYear(),t.length)},Q:function(e,t,n){var r=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"Q":return String(r);case"QQ":return w(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(e,t,n){var r=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"q":return String(r);case"qq":return w(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(e,t,n){var r=e.getUTCMonth();switch(t){case"M":case"MM":return v.M(e,t);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(e,t,n){var r=e.getUTCMonth();switch(t){case"L":return String(r+1);case"LL":return w(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(e,t,n,i){var o=function(e,t){r(1,arguments);var n=a(e),i=T(n,t).getTime()-D(n,t).getTime();return Math.round(i/6048e5)+1}(e,i);return"wo"===t?n.ordinalNumber(o,{unit:"week"}):w(o,t.length)},I:function(e,t,n){var i=function(e){r(1,arguments);var t=a(e),n=y(t).getTime()-b(t).getTime();return Math.round(n/6048e5)+1}(e);return"Io"===t?n.ordinalNumber(i,{unit:"week"}):w(i,t.length)},d:function(e,t,n){return"do"===t?n.ordinalNumber(e.getUTCDate(),{unit:"date"}):v.d(e,t)},D:function(e,t,n){var i=function(e){r(1,arguments);var t=a(e),n=t.getTime();t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0);var i=t.getTime(),o=n-i;return Math.floor(o/864e5)+1}(e);return"Do"===t?n.ordinalNumber(i,{unit:"dayOfYear"}):w(i,t.length)},E:function(e,t,n){var r=e.getUTCDay();switch(t){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});case"EEEE":default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(e,t,n,r){var a=e.getUTCDay(),i=(a-r.weekStartsOn+8)%7||7;switch(t){case"e":return String(i);case"ee":return w(i,2);case"eo":return n.ordinalNumber(i,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});case"eeee":default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(e,t,n,r){var a=e.getUTCDay(),i=(a-r.weekStartsOn+8)%7||7;switch(t){case"c":return String(i);case"cc":return w(i,t.length);case"co":return n.ordinalNumber(i,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});case"cccc":default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(e,t,n){var r=e.getUTCDay(),a=0===r?7:r;switch(t){case"i":return String(a);case"ii":return w(a,t.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});case"iiii":default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(e,t,n){var r=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(e,t,n){var r,a=e.getUTCHours();switch(r=12===a?E:0===a?M:a/12>=1?"pm":"am",t){case"b":case"bb":case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(e,t,n){var r,a=e.getUTCHours();switch(r=a>=17?S:a>=12?P:a>=4?x:N,t){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(e,t,n){if("ho"===t){var r=e.getUTCHours()%12;return 0===r&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return v.h(e,t)},H:function(e,t,n){return"Ho"===t?n.ordinalNumber(e.getUTCHours(),{unit:"hour"}):v.H(e,t)},K:function(e,t,n){var r=e.getUTCHours()%12;return"Ko"===t?n.ordinalNumber(r,{unit:"hour"}):w(r,t.length)},k:function(e,t,n){var r=e.getUTCHours();return 0===r&&(r=24),"ko"===t?n.ordinalNumber(r,{unit:"hour"}):w(r,t.length)},m:function(e,t,n){return"mo"===t?n.ordinalNumber(e.getUTCMinutes(),{unit:"minute"}):v.m(e,t)},s:function(e,t,n){return"so"===t?n.ordinalNumber(e.getUTCSeconds(),{unit:"second"}):v.s(e,t)},S:function(e,t){return v.S(e,t)},X:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();if(0===a)return"Z";switch(t){case"X":return O(a);case"XXXX":case"XX":return W(a);case"XXXXX":case"XXX":default:return W(a,":")}},x:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"x":return O(a);case"xxxx":case"xx":return W(a);case"xxxxx":case"xxx":default:return W(a,":")}},O:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+U(a,":");case"OOOO":default:return"GMT"+W(a,":")}},z:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+U(a,":");case"zzzz":default:return"GMT"+W(a,":")}},t:function(e,t,n,r){var a=r._originalDate||e;return w(Math.floor(a.getTime()/1e3),t.length)},T:function(e,t,n,r){return w((r._originalDate||e).getTime(),t.length)}};function L(e,t){switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});case"PPPP":default:return t.date({width:"full"})}}function Y(e,t){switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});case"pppp":default:return t.time({width:"full"})}}var q={p:Y,P:function(e,t){var n,r=e.match(/(P+)(p+)?/),a=r[1],i=r[2];if(!i)return L(e,t);switch(a){case"P":n=t.dateTime({width:"short"});break;case"PP":n=t.dateTime({width:"medium"});break;case"PPP":n=t.dateTime({width:"long"});break;case"PPPP":default:n=t.dateTime({width:"full"})}return n.replace("{{date}}",L(a,t)).replace("{{time}}",Y(i,t))}};function B(e){var t=new Date(e.getTime()),n=Math.ceil(t.getTimezoneOffset());return t.setSeconds(0,0),6e4*n+t.getTime()%6e4}var H=["D","DD"],z=["YY","YYYY"];function F(e){return-1!==H.indexOf(e)}function Q(e){return-1!==z.indexOf(e)}function X(e){if("YYYY"===e)throw new RangeError("Use `yyyy` instead of `YYYY` for formatting years; see: https://git.io/fxCyr");if("YY"===e)throw new RangeError("Use `yy` instead of `YY` for formatting years; see: https://git.io/fxCyr");if("D"===e)throw new RangeError("Use `d` instead of `D` for formatting days of the month; see: https://git.io/fxCyr");if("DD"===e)throw new RangeError("Use `dd` instead of `DD` for formatting days of the month; see: https://git.io/fxCyr")}var _=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,A=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,I=/^'([^]*?)'?$/,G=/''/g,R=/[a-zA-Z]/;function J(e,t,n){r(2,arguments);var o=String(t),s=n||{},c=s.locale||m,u=c.options&&c.options.firstWeekContainsDate,d=null==u?1:f(u),l=null==s.firstWeekContainsDate?d:f(s.firstWeekContainsDate);if(!(l>=1&&l<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var h=c.options&&c.options.weekStartsOn,g=null==h?0:f(h),w=null==s.weekStartsOn?g:f(s.weekStartsOn);if(!(w>=0&&w<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!c.localize)throw new RangeError("locale must contain localize property");if(!c.formatLong)throw new RangeError("locale must contain formatLong property");var v=a(e);if(!i(v))throw new RangeError("Invalid time value");var y=B(v),C=p(v,y),b={firstWeekContainsDate:l,weekStartsOn:w,locale:c,_originalDate:v},T=o.match(A).map((function(e){var t=e[0];return"p"===t||"P"===t?(0,q[t])(e,c.formatLong,b):e})).join("").match(_).map((function(e){if("''"===e)return"'";var t=e[0];if("'"===t)return $(e);var n=j[t];if(n)return!s.useAdditionalWeekYearTokens&&Q(e)&&X(e),!s.useAdditionalDayOfYearTokens&&F(e)&&X(e),n(C,e,c.localize,b);if(t.match(R))throw new RangeError("Format string contains an unescaped latin alphabet character `"+t+"`");return e})).join("");return T}function $(e){return e.match(I)[1].replace(G,"'")}var V=function(){function e(e){var t;try{t=window[e];var n="__storage_test__";return t.setItem(n,n),t.removeItem(n),!0}catch(e){return e instanceof DOMException&&(22===e.code||1014===e.code||"QuotaExceededError"===e.name||"NS_ERROR_DOM_QUOTA_REACHED"===e.name)&&t&&0!==t.length}}class t{constructor(e,t,n,r,a,i){this.title=e,this.description=t,this.dueDate=n,this.isPriority=r,this.notes=a,this.isChecked=i}toggleIsChecked(){this.isChecked=!this.isChecked}toggleIsPriority(){this.isPriority=!this.isPriority}}let n=[],r=[];const a=document.createElement("div");a.id="container";const i=new t("To-Do List!","Check out my notes to see how to make a sticky note!",new Date,!0,"Click any part of a ToDo to edit. Just hit enter to save :)",!1),o=e=>J(e,"dd-MMM-yyyy"),s=e=>J(e,"yyyy-MM-dd"),c=e=>13===e.keyCode||13===e.which,u=e=>""===e.value,d=(e,t)=>{const n=e.parentNode,r=document.createElement("input");return r.className=t,[n,r]},l=(e,t,n)=>{const[a,i]=d(e,n),o=`${e.textContent} ${n}`.split(" ").join("-");i.value=e.textContent,i.type="text",i.id=o,i.onkeypress=function(o){c(o)&&(u(i)?(e.textContent=`No ${n}`,a.replaceChild(e,i),t[n]=e.textContent):(e.textContent=i.value,a.replaceChild(e,i),t[n]=e.textContent),g(r))},a.replaceChild(i,e),document.getElementById(o).focus()},h=(e,t,n)=>{const[a,i]=d(e,n);i.type="date","No Due Date"===t[n]?i.value=s(new Date):i.value=s(t[n]);const l=`${i.value} ${n}`.split(" ").join("-");i.id=l,i.onkeypress=function(s){if(c(s)){if(u(i))e.textContent="No Due Date",a.replaceChild(e,i),t[n]="No Due Date";else{const r=(e=>{const[t,n,r]=e.split("-");return new Date(t,n-1,r)})(i.value);e.textContent="Due: "+o(r),a.replaceChild(e,i),t[n]=r}g(r)}},a.replaceChild(i,e),document.getElementById(l).focus()},m=e=>{const t=document.createElement("div");t.className="sticky";const n=(e=>{const t=document.createElement("div");return t.className="title",t.textContent=e,t})(e.title),a=(e=>{const t=document.createElement("div");return t.className="description",t.textContent=e,t})(e.description),i=(e=>{const t=document.createElement("div");return t.className="dueDate",t.textContent="No Due Date"===e?e:"Due: "+o(e),t})(e.dueDate),s=(e=>{const t=document.createElement("div");t.className="isPriority";const n=document.createElement("i");return n.className="fas fa-exclamation-circle",e||t.classList.add("isNotPriority"),t.appendChild(n),t})(e.isPriority),c=(e=>{const t=document.createElement("div");return t.className="notes",t.textContent=e,t})(e.notes),u=(e=>{const t=document.createElement("i"),n=t.classList;return e?(t.className="fas fa-check-square",n.add("checked")):t.className="far fa-check-square",t.addEventListener("mouseenter",()=>{n.toggle("far"),n.toggle("fas")}),t.addEventListener("mouseleave",()=>{n.toggle("far"),n.toggle("fas")}),t.classList.add("isChecked"),t})(e.isChecked),d=(()=>{const e=document.createElement("div");e.className="remove";const t=document.createElement("i");return t.className="fas fa-window-close",e.appendChild(t),e})();return n.addEventListener("click",()=>{l(n,e,"title")}),a.addEventListener("click",()=>{l(a,e,"description")}),i.addEventListener("click",()=>{h(i,e,"dueDate")}),c.addEventListener("click",()=>{l(c,e,"notes")}),u.addEventListener("click",()=>{e.toggleIsChecked(),g(r)}),s.addEventListener("click",()=>{s.classList.toggle("isNotPriority"),e.toggleIsPriority(),g(r)}),d.addEventListener("click",()=>{f(e),g(r)}),t.appendChild(n),t.appendChild(a),t.appendChild(i),t.appendChild(s),t.appendChild(c),t.appendChild(u),t.appendChild(d),t},f=e=>{for(let t=0;t<r.length;t++)if(r[t]===e)return void r.splice(t,1)},g=t=>{(()=>{for(;a.hasChildNodes();)a.removeChild(a.firstChild)})(),void 0===t?(r=[i],v("Default",t=r)):r=t;for(let e=0;e<t.length;e++){const n=m(t[e]);a.appendChild(n)}return e("localStorage")&&(()=>{localStorage.clear();for(let e=0;e<n.length;e++)localStorage.setItem(e,JSON.stringify(n[e]))})(),a},p=(e,t,n)=>{const r=document.createElement("div");let a;void 0!==n&&(a=document.createElement("i"),a.className=n,a.id=e+"Icon");const i=document.createElement("span");return i.textContent=t,i.id=e+"Text",void 0!==a&&r.appendChild(a),r.appendChild(i),r.className="sideItem",r},w=e=>{const t=document.createElement("div");return t.id="divider"+e,t.className="divider",t},v=(e,t)=>{n.push({title:e,stickies:t})},y=e=>{const t=[];for(let r=0;r<n.length;r++)e!==n[r]&&t.push(n[r]);n=t},C=()=>{const e=document.createElement("div");e.id="projectsOverlay";const t=document.createElement("div");t.id="projectsWindow",e.appendChild(t),(e=>{const t=e.parentNode,a=document.createElement("i");a.className="fas fa-window-close",a.id="closeProjects";const o=document.createElement("div");o.id="projectsContainer";for(let e=0;e<n.length;e++){const a=document.createElement("div"),i=document.createElement("span");a.className="project";const s=n[e].title,c=s.length>25?s.substring(0,20)+"...":s;i.textContent=c;const u=document.createElement("i");u.className="fas fa-trash",a.addEventListener("click",()=>{g(n[e].stickies),r=n[e].stickies}),u.addEventListener("click",()=>{y(n[e]),document.body.removeChild(t),C()}),a.appendChild(i),a.appendChild(u),o.appendChild(a)}0===n.length&&v("Default",[i]);const s=document.createElement("div");s.className="newProject";const d=document.createElement("i");d.className="fas fa-plus";const l=document.createElement("span");l.textContent="New Project",a.addEventListener("click",()=>{document.body.removeChild(t)}),s.addEventListener("click",()=>{const e=document.createElement("input");e.type="text",e.placeholder="Enter your title!",e.id="newProjectId",e.onkeypress=function(a){if(c(a)&&!u(e)){v(e.value,[]);const a=n[n.length-1];r=a.stickies,document.body.removeChild(t),g(r)}},o.replaceChild(e,s),document.getElementById(e.id).focus()}),s.appendChild(d),s.appendChild(l),o.appendChild(s),e.appendChild(a),e.appendChild(o)})(t),document.body.appendChild(e)};return{populateProjectsFromStorage:e=>{n=e;for(let e=0;e<n.length;e++){const r=n[e].stickies;for(let e=0;e<r.length;e++){const n=r[e];r[e]=new t(n.title,n.description,n.dueDate,n.isPriority,n.notes,n.isChecked)}}return g(n[0].stickies)},populateStickies:g,loadSideBar:()=>{const e=document.createElement("div");e.id="sideBar";const n=p("addStickyButton","Add To-Do","fas fa-plus-circle"),a=p("projects","Projects","fas fa-folder"),i=w("Clear"),o=p("clearChecks","Clear Checked","fas fa-times-circle"),s=w("Sort"),c=p("sortPriority","Sort Priority","fas fa-exclamation-circle"),u=p("sortChecked","Sort Checked","fas fa-check-square"),d=w("Credit"),l=(()=>{const e=document.createElement("div");e.id="credit",e.textContent="Created by ";const t=document.createElement("a");return t.href="http://mmboyce.github.io",t.textContent="W Mathieu Mimms-Boyce",e.appendChild(document.createElement("br")),e.appendChild(t),e.className="sideItem",e})();return n.addEventListener("click",()=>{((e,n,a,i,o,s)=>{const c=new t(e,n,a,i,o,s);r.push(c),g(r)})("Title","Description",new Date,!1,"Notes",!1),g(r)}),o.addEventListener("click",()=>{(()=>{const e=[];for(let t=0;t<r.length;t++){const n=r[t];n.isChecked||e.push(n)}e.length<r.length&&(r=e,g(r))})()}),a.addEventListener("click",()=>{C()}),c.addEventListener("click",()=>{const e=r.sort((e,t)=>e.isPriority&&!t.isPriority?-1:!e.isPriority&&t.isPriority?1:e.dueDate.getTime()>t.dueDate.getTime());g(e)}),u.addEventListener("click",()=>{const e=(e=>{const t=new Date;return e.sort((e,n)=>e.isChecked&&!n.isChecked?-1:!e.isChecked&&n.isChecked?1:t.getTime()-e.dueDate.getTime()<t.getTime()-n.dueDate.getTime())})(r);g(e)}),e.appendChild(n),e.appendChild(a),e.appendChild(i),e.appendChild(o),e.appendChild(s),e.appendChild(c),e.appendChild(u),e.appendChild(d),e.appendChild(l),e},projects:n,storageAvailable:e}}();const K=document.querySelector("#content");if(K.appendChild(V.loadSideBar()),V.storageAvailable("localStorage")&&localStorage.length>0){const e=[];for(let t=0;t<localStorage.length;t++){const n=localStorage.getItem(t),r=JSON.parse(n);for(let e=0;e<r.stickies.length;e++)"No Due Date"!==r.stickies[e].dueDate&&(r.stickies[e].dueDate=new Date(r.stickies[e].dueDate));e.push(r)}K.appendChild(V.populateProjectsFromStorage(e))}else K.appendChild(V.populateStickies())}]);