"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6841],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),s=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},c=function(e){var t=s(e.components);return a.createElement(o.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=s(n),m=r,h=u["".concat(o,".").concat(m)]||u[m]||d[m]||i;return n?a.createElement(h,p(p({ref:t},c),{},{components:n})):a.createElement(h,p({ref:t},c))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,p=new Array(i);p[0]=m;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l[u]="string"==typeof e?e:r,p[1]=l;for(var s=2;s<i;s++)p[s]=n[s];return a.createElement.apply(null,p)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6140:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>p,default:()=>d,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var a=n(7462),r=(n(7294),n(3905));const i={id:"jsonpath.functions.Match",title:"Class: Match",sidebar_label:"Match",custom_edit_url:null},p=void 0,l={unversionedId:"api/classes/jsonpath.functions.Match",id:"api/classes/jsonpath.functions.Match",title:"Class: Match",description:"jsonpath.functions.Match",source:"@site/docs/api/classes/jsonpath.functions.Match.md",sourceDirName:"api/classes",slug:"/api/classes/jsonpath.functions.Match",permalink:"/json-p3/api/classes/jsonpath.functions.Match",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"jsonpath.functions.Match",title:"Class: Match",sidebar_label:"Match",custom_edit_url:null},sidebar:"API",previous:{title:"Length",permalink:"/json-p3/api/classes/jsonpath.functions.Length"},next:{title:"Search",permalink:"/json-p3/api/classes/jsonpath.functions.Search"}},o={},s=[{value:"Implements",id:"implements",level:2},{value:"Constructors",id:"constructors",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties",level:2},{value:"#cache",id:"cache",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"argTypes",id:"argtypes",level:3},{value:"Implementation of",id:"implementation-of",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"cacheSize",id:"cachesize",level:3},{value:"Defined in",id:"defined-in-3",level:4},{value:"options",id:"options",level:3},{value:"Defined in",id:"defined-in-4",level:4},{value:"returnType",id:"returntype",level:3},{value:"Implementation of",id:"implementation-of-1",level:4},{value:"Defined in",id:"defined-in-5",level:4},{value:"throwErrors",id:"throwerrors",level:3},{value:"Defined in",id:"defined-in-6",level:4},{value:"Methods",id:"methods",level:2},{value:"call",id:"call",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns",level:4},{value:"Implementation of",id:"implementation-of-2",level:4},{value:"Defined in",id:"defined-in-7",level:4},{value:"fullMatch",id:"fullmatch",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Defined in",id:"defined-in-8",level:4}],c={toc:s},u="wrapper";function d(e){let{components:t,...n}=e;return(0,r.kt)(u,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/namespaces/jsonpath"},"jsonpath"),".",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/namespaces/jsonpath.functions"},"functions"),".Match"),(0,r.kt)("p",null,"A JSONPath filter function definition."),(0,r.kt)("h2",{id:"implements"},"Implements"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/json-p3/api/interfaces/jsonpath.functions.FilterFunction"},(0,r.kt)("inlineCode",{parentName:"a"},"FilterFunction")))),(0,r.kt)("h2",{id:"constructors"},"Constructors"),(0,r.kt)("h3",{id:"constructor"},"constructor"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"new Match"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"options?"),")"),(0,r.kt)("h4",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"options")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"MatchFilterFunctionOptions"))))),(0,r.kt)("h4",{id:"defined-in"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/5266345/src/path/functions/match.ts#L30"},"src/path/functions/match.ts:30")),(0,r.kt)("h2",{id:"properties"},"Properties"),(0,r.kt)("h3",{id:"cache"},"#cache"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Private")," ",(0,r.kt)("strong",{parentName:"p"},"#cache"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"LRUCache"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"RegExp"),">"),(0,r.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/5266345/src/path/functions/match.ts#L28"},"src/path/functions/match.ts:28")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"argtypes"},"argTypes"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"argTypes"),": ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/enums/jsonpath.functions.FunctionExpressionType"},(0,r.kt)("inlineCode",{parentName:"a"},"FunctionExpressionType")),"[]"),(0,r.kt)("p",null,"Argument types expected by the filter function."),(0,r.kt)("h4",{id:"implementation-of"},"Implementation of"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/interfaces/jsonpath.functions.FilterFunction"},"FilterFunction"),".",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/interfaces/jsonpath.functions.FilterFunction#argtypes"},"argTypes")),(0,r.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/5266345/src/path/functions/match.ts#L19"},"src/path/functions/match.ts:19")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"cachesize"},"cacheSize"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"cacheSize"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"number")),(0,r.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/5266345/src/path/functions/match.ts#L26"},"src/path/functions/match.ts:26")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"options"},"options"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"options"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"MatchFilterFunctionOptions")," = ",(0,r.kt)("inlineCode",{parentName:"p"},"{}")),(0,r.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/5266345/src/path/functions/match.ts#L30"},"src/path/functions/match.ts:30")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"returntype"},"returnType"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"returnType"),": ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/enums/jsonpath.functions.FunctionExpressionType#logicaltype"},(0,r.kt)("inlineCode",{parentName:"a"},"LogicalType"))," = ",(0,r.kt)("inlineCode",{parentName:"p"},"FunctionExpressionType.LogicalType")),(0,r.kt)("p",null,"The type of the value returned by the filter function."),(0,r.kt)("h4",{id:"implementation-of-1"},"Implementation of"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/interfaces/jsonpath.functions.FilterFunction"},"FilterFunction"),".",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/interfaces/jsonpath.functions.FilterFunction#returntype"},"returnType")),(0,r.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/5266345/src/path/functions/match.ts#L24"},"src/path/functions/match.ts:24")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"throwerrors"},"throwErrors"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"throwErrors"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"boolean")),(0,r.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/5266345/src/path/functions/match.ts#L27"},"src/path/functions/match.ts:27")),(0,r.kt)("h2",{id:"methods"},"Methods"),(0,r.kt)("h3",{id:"call"},"call"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"call"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"s"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"pattern"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"boolean")),(0,r.kt)("p",null,"A function with unknown number and type of arguments."),(0,r.kt)("h4",{id:"parameters-1"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"s")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"pattern")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string"))))),(0,r.kt)("h4",{id:"returns"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"boolean")),(0,r.kt)("h4",{id:"implementation-of-2"},"Implementation of"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/interfaces/jsonpath.functions.FilterFunction"},"FilterFunction"),".",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/interfaces/jsonpath.functions.FilterFunction#call"},"call")),(0,r.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/5266345/src/path/functions/match.ts#L36"},"src/path/functions/match.ts:36")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"fullmatch"},"fullMatch"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,r.kt)("strong",{parentName:"p"},"fullMatch"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"pattern"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("h4",{id:"parameters-2"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"pattern")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string"))))),(0,r.kt)("h4",{id:"returns-1"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/5266345/src/path/functions/match.ts#L59"},"src/path/functions/match.ts:59")))}d.isMDXComponent=!0}}]);