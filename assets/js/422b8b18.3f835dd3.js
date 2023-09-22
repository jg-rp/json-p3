"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6144],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>k});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),s=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},d=function(e){var t=s(e.components);return a.createElement(o.Provider,{value:t},e.children)},m="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),m=s(n),u=r,k=m["".concat(o,".").concat(u)]||m[u]||h[u]||i;return n?a.createElement(k,p(p({ref:t},d),{},{components:n})):a.createElement(k,p({ref:t},d))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,p=new Array(i);p[0]=u;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l[m]="string"==typeof e?e:r,p[1]=l;for(var s=2;s<i;s++)p[s]=n[s];return a.createElement.apply(null,p)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},765:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>p,default:()=>h,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var a=n(7462),r=(n(7294),n(3905));const i={id:"jsonpath.JSONPathEnvironment",title:"Class: JSONPathEnvironment",sidebar_label:"JSONPathEnvironment",custom_edit_url:null},p=void 0,l={unversionedId:"api/classes/jsonpath.JSONPathEnvironment",id:"api/classes/jsonpath.JSONPathEnvironment",title:"Class: JSONPathEnvironment",description:"jsonpath.JSONPathEnvironment",source:"@site/docs/api/classes/jsonpath.JSONPathEnvironment.md",sourceDirName:"api/classes",slug:"/api/classes/jsonpath.JSONPathEnvironment",permalink:"/json-p3/api/classes/jsonpath.JSONPathEnvironment",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"jsonpath.JSONPathEnvironment",title:"Class: JSONPathEnvironment",sidebar_label:"JSONPathEnvironment",custom_edit_url:null},sidebar:"API",previous:{title:"JSONPath",permalink:"/json-p3/api/classes/jsonpath.JSONPath"},next:{title:"JSONPathError",permalink:"/json-p3/api/classes/jsonpath.JSONPathError"}},o={},s=[{value:"Constructors",id:"constructors",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties",level:2},{value:"functionRegister",id:"functionregister",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"maxIntIndex",id:"maxintindex",level:3},{value:"Defined in",id:"defined-in-2",level:4},{value:"maxRecursionDepth",id:"maxrecursiondepth",level:3},{value:"Defined in",id:"defined-in-3",level:4},{value:"minIntIndex",id:"minintindex",level:3},{value:"Defined in",id:"defined-in-4",level:4},{value:"parser",id:"parser",level:3},{value:"Defined in",id:"defined-in-5",level:4},{value:"strict",id:"strict",level:3},{value:"Defined in",id:"defined-in-6",level:4},{value:"Methods",id:"methods",level:2},{value:"checkWellTypedness",id:"checkwelltypedness",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in-7",level:4},{value:"compile",id:"compile",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Defined in",id:"defined-in-8",level:4},{value:"match",id:"match",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-2",level:4},{value:"Defined in",id:"defined-in-9",level:4},{value:"query",id:"query",level:3},{value:"Parameters",id:"parameters-4",level:4},{value:"Returns",id:"returns-3",level:4},{value:"Defined in",id:"defined-in-10",level:4},{value:"setupFilterFunctions",id:"setupfilterfunctions",level:3},{value:"Returns",id:"returns-4",level:4},{value:"Defined in",id:"defined-in-11",level:4}],d={toc:s},m="wrapper";function h(e){let{components:t,...n}=e;return(0,r.kt)(m,(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/namespaces/jsonpath"},"jsonpath"),".JSONPathEnvironment"),(0,r.kt)("h2",{id:"constructors"},"Constructors"),(0,r.kt)("h3",{id:"constructor"},"constructor"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"new JSONPathEnvironment"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"options?"),")"),(0,r.kt)("h4",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"options")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/json-p3/api/namespaces/jsonpath#jsonpathenvironmentoptions"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONPathEnvironmentOptions")))))),(0,r.kt)("h4",{id:"defined-in"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/path/environment.ts#L100"},"src/path/environment.ts:100")),(0,r.kt)("h2",{id:"properties"},"Properties"),(0,r.kt)("h3",{id:"functionregister"},"functionRegister"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"functionRegister"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"Map"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/interfaces/jsonpath.functions.FilterFunction"},(0,r.kt)("inlineCode",{parentName:"a"},"FilterFunction")),">"),(0,r.kt)("p",null,"A map of function names to objects implementing the ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/interfaces/jsonpath.functions.FilterFunction"},"FilterFunction"),"\ninterface. You are free to set or delete custom filter functions directly."),(0,r.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/path/environment.ts#L92"},"src/path/environment.ts:92")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"maxintindex"},"maxIntIndex"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"maxIntIndex"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"number")),(0,r.kt)("p",null,"The maximum number allowed when indexing or slicing an array. Defaults to\n2**53 -1."),(0,r.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/path/environment.ts#L74"},"src/path/environment.ts:74")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"maxrecursiondepth"},"maxRecursionDepth"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"maxRecursionDepth"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"number")),(0,r.kt)("p",null,"The maximum number of objects and/or arrays the recursive descent selector\ncan visit before a ",(0,r.kt)("inlineCode",{parentName:"p"},"JSONPathRecursionLimitError")," is thrown."),(0,r.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/path/environment.ts#L86"},"src/path/environment.ts:86")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"minintindex"},"minIntIndex"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"minIntIndex"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"number")),(0,r.kt)("p",null,"The minimum number allowed when indexing or slicing an array. Defaults to\n-(2**53) -1."),(0,r.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/path/environment.ts#L80"},"src/path/environment.ts:80")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"parser"},"parser"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Private")," ",(0,r.kt)("strong",{parentName:"p"},"parser"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"Parser")),(0,r.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/path/environment.ts#L94"},"src/path/environment.ts:94")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"strict"},"strict"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"strict"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"boolean")),(0,r.kt)("p",null,"Indicates if the environment should to be strict about its compliance with\nJSONPath standards."),(0,r.kt)("p",null,"Defaults to ",(0,r.kt)("inlineCode",{parentName:"p"},"true"),". Setting ",(0,r.kt)("inlineCode",{parentName:"p"},"strict")," to ",(0,r.kt)("inlineCode",{parentName:"p"},"false")," currently has no effect.\nIf/when we add non-standard features, the environment's strictness will\ncontrol their availability."),(0,r.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/path/environment.ts#L68"},"src/path/environment.ts:68")),(0,r.kt)("h2",{id:"methods"},"Methods"),(0,r.kt)("h3",{id:"checkwelltypedness"},"checkWellTypedness"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"checkWellTypedness"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"token"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"args"),"): ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.expressions.FilterExpression"},(0,r.kt)("inlineCode",{parentName:"a"},"FilterExpression")),"[]"),(0,r.kt)("h4",{id:"parameters-1"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"token")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/json-p3/api/classes/jsonpath.Token"},(0,r.kt)("inlineCode",{parentName:"a"},"Token")))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"args")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/json-p3/api/classes/jsonpath.expressions.FilterExpression"},(0,r.kt)("inlineCode",{parentName:"a"},"FilterExpression")),"[]")))),(0,r.kt)("h4",{id:"returns"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.expressions.FilterExpression"},(0,r.kt)("inlineCode",{parentName:"a"},"FilterExpression")),"[]"),(0,r.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/path/environment.ts#L158"},"src/path/environment.ts:158")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"compile"},"compile"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"compile"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"path"),"): ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPath"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONPath"))),(0,r.kt)("h4",{id:"parameters-2"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"path")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string"))))),(0,r.kt)("h4",{id:"returns-1"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPath"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONPath"))),(0,r.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/path/environment.ts#L114"},"src/path/environment.ts:114")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"match"},"match"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"match"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"path"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"value"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPathNode"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONPathNode"))),(0,r.kt)("p",null,"Return a ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPathNode"},"JSONPathNode")," instance for the first object found in\n",(0,r.kt)("em",{parentName:"p"},"value")," matching ",(0,r.kt)("em",{parentName:"p"},"path"),"."),(0,r.kt)("h4",{id:"parameters-3"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"path")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:"left"},"A JSONPath query.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"value")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/json-p3/api/modules#jsonvalue"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONValue"))),(0,r.kt)("td",{parentName:"tr",align:"left"},"JSON-like data to which the query ",(0,r.kt)("em",{parentName:"td"},"path")," will be applied.")))),(0,r.kt)("h4",{id:"returns-2"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPathNode"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONPathNode"))),(0,r.kt)("p",null,"The first node in ",(0,r.kt)("em",{parentName:"p"},"value")," matching  ",(0,r.kt)("em",{parentName:"p"},"path"),", or ",(0,r.kt)("inlineCode",{parentName:"p"},"undefined")," if\nthere are no matches."),(0,r.kt)("h4",{id:"defined-in-9"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/path/environment.ts#L140"},"src/path/environment.ts:140")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"query"},"query"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"query"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"path"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"value"),"): ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPathNodeList"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONPathNodeList"))),(0,r.kt)("h4",{id:"parameters-4"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"path")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"value")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/json-p3/api/modules#jsonvalue"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONValue")))))),(0,r.kt)("h4",{id:"returns-3"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPathNodeList"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONPathNodeList"))),(0,r.kt)("h4",{id:"defined-in-10"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/path/environment.ts#L127"},"src/path/environment.ts:127")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"setupfilterfunctions"},"setupFilterFunctions"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,r.kt)("strong",{parentName:"p"},"setupFilterFunctions"),"(): ",(0,r.kt)("inlineCode",{parentName:"p"},"void")),(0,r.kt)("h4",{id:"returns-4"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"void")),(0,r.kt)("h4",{id:"defined-in-11"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/path/environment.ts#L144"},"src/path/environment.ts:144")))}h.isMDXComponent=!0}}]);