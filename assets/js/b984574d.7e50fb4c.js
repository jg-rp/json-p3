"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2853],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>N});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),s=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=s(e.components);return a.createElement(o.Provider,{value:t},e.children)},k="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),k=s(n),u=r,N=k["".concat(o,".").concat(u)]||k[u]||m[u]||i;return n?a.createElement(N,l(l({ref:t},d),{},{components:n})):a.createElement(N,l({ref:t},d))}));function N(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=u;var p={};for(var o in t)hasOwnProperty.call(t,o)&&(p[o]=t[o]);p.originalType=e,p[k]="string"==typeof e?e:r,l[1]=p;for(var s=2;s<i;s++)l[s]=n[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},7282:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>p,toc:()=>s});var a=n(7462),r=(n(7294),n(3905));const i={id:"jsonpointer.JSONPointer",title:"Class: JSONPointer",sidebar_label:"JSONPointer",custom_edit_url:null},l=void 0,p={unversionedId:"api/classes/jsonpointer.JSONPointer",id:"api/classes/jsonpointer.JSONPointer",title:"Class: JSONPointer",description:"jsonpointer.JSONPointer",source:"@site/docs/api/classes/jsonpointer.JSONPointer.md",sourceDirName:"api/classes",slug:"/api/classes/jsonpointer.JSONPointer",permalink:"/json-p3/api/classes/jsonpointer.JSONPointer",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"jsonpointer.JSONPointer",title:"Class: JSONPointer",sidebar_label:"JSONPointer",custom_edit_url:null},sidebar:"API",previous:{title:"WildcardSelector",permalink:"/json-p3/api/classes/jsonpath.selectors.WildcardSelector"},next:{title:"JSONPointerError",permalink:"/json-p3/api/classes/jsonpointer.JSONPointerError"}},o={},s=[{value:"Constructors",id:"constructors",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties",level:2},{value:"#pointer",id:"pointer",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"tokens",id:"tokens",level:3},{value:"Defined in",id:"defined-in-2",level:4},{value:"Methods",id:"methods",level:2},{value:"_join",id:"_join",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"exists",id:"exists",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Defined in",id:"defined-in-4",level:4},{value:"getItem",id:"getitem",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-2",level:4},{value:"Defined in",id:"defined-in-5",level:4},{value:"isRelativeTo",id:"isrelativeto",level:3},{value:"Parameters",id:"parameters-4",level:4},{value:"Returns",id:"returns-3",level:4},{value:"Defined in",id:"defined-in-6",level:4},{value:"join",id:"join",level:3},{value:"Parameters",id:"parameters-5",level:4},{value:"Returns",id:"returns-4",level:4},{value:"Defined in",id:"defined-in-7",level:4},{value:"parent",id:"parent",level:3},{value:"Returns",id:"returns-5",level:4},{value:"Defined in",id:"defined-in-8",level:4},{value:"parse",id:"parse",level:3},{value:"Parameters",id:"parameters-6",level:4},{value:"Returns",id:"returns-6",level:4},{value:"Defined in",id:"defined-in-9",level:4},{value:"resolve",id:"resolve",level:3},{value:"Parameters",id:"parameters-7",level:4},{value:"Returns",id:"returns-7",level:4},{value:"Defined in",id:"defined-in-10",level:4},{value:"resolveWithParent",id:"resolvewithparent",level:3},{value:"Parameters",id:"parameters-8",level:4},{value:"Returns",id:"returns-8",level:4},{value:"Defined in",id:"defined-in-11",level:4},{value:"to",id:"to",level:3},{value:"Parameters",id:"parameters-9",level:4},{value:"Returns",id:"returns-9",level:4},{value:"Defined in",id:"defined-in-12",level:4},{value:"toString",id:"tostring",level:3},{value:"Returns",id:"returns-10",level:4},{value:"Defined in",id:"defined-in-13",level:4},{value:"encode",id:"encode",level:3},{value:"Parameters",id:"parameters-10",level:4},{value:"Returns",id:"returns-11",level:4},{value:"Defined in",id:"defined-in-14",level:4}],d={toc:s},k="wrapper";function m(e){let{components:t,...n}=e;return(0,r.kt)(k,(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/namespaces/jsonpointer"},"jsonpointer"),".JSONPointer"),(0,r.kt)("p",null,"Identify a single value in JSON-like data, as per RFC 6901."),(0,r.kt)("h2",{id:"constructors"},"Constructors"),(0,r.kt)("h3",{id:"constructor"},"constructor"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"new JSONPointer"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"pointer"),")"),(0,r.kt)("h4",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"pointer")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:"left"},"A string representation of a JSON Pointer.")))),(0,r.kt)("h4",{id:"defined-in"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/pointer/pointer.ts#L27"},"src/pointer/pointer.ts:27")),(0,r.kt)("h2",{id:"properties"},"Properties"),(0,r.kt)("h3",{id:"pointer"},"#pointer"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Private")," ",(0,r.kt)("strong",{parentName:"p"},"#pointer"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/pointer/pointer.ts#L21"},"src/pointer/pointer.ts:21")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"tokens"},"tokens"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"tokens"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string"),"[]"),(0,r.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/pointer/pointer.ts#L22"},"src/pointer/pointer.ts:22")),(0,r.kt)("h2",{id:"methods"},"Methods"),(0,r.kt)("h3",{id:"_join"},"_","join"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("inlineCode",{parentName:"p"},"Private")," ",(0,r.kt)("strong",{parentName:"p"},"_join"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"pointer"),"): ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointer"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONPointer"))),(0,r.kt)("h4",{id:"parameters-1"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"pointer")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string"))))),(0,r.kt)("h4",{id:"returns"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointer"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONPointer"))),(0,r.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/pointer/pointer.ts#L189"},"src/pointer/pointer.ts:189")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"exists"},"exists"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"exists"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"value"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"boolean")),(0,r.kt)("p",null,"Return ",(0,r.kt)("em",{parentName:"p"},"true")," if this pointer can be resolved against ",(0,r.kt)("em",{parentName:"p"},"value"),"."),(0,r.kt)("p",null,"Note that ",(0,r.kt)("inlineCode",{parentName:"p"},"JSONPointer.resolve()")," can return legitimate falsy values\nthat form part of the target JSON document. This method will return\n",(0,r.kt)("inlineCode",{parentName:"p"},"true")," if a falsy value is found."),(0,r.kt)("h4",{id:"parameters-2"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"value")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/json-p3/api/modules#jsonvalue"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONValue")))))),(0,r.kt)("h4",{id:"returns-1"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"boolean")),(0,r.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/pointer/pointer.ts#L240"},"src/pointer/pointer.ts:240")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"getitem"},"getItem"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,r.kt)("strong",{parentName:"p"},"getItem"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"val"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"token"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"idx"),"): ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/modules#jsonvalue"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONValue"))),(0,r.kt)("h4",{id:"parameters-3"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"val")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/json-p3/api/modules#jsonvalue"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONValue")))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"token")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"idx")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"number"))))),(0,r.kt)("h4",{id:"returns-2"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/modules#jsonvalue"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONValue"))),(0,r.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/pointer/pointer.ts#L140"},"src/pointer/pointer.ts:140")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"isrelativeto"},"isRelativeTo"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"isRelativeTo"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"pointer"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"boolean")),(0,r.kt)("p",null,"Return ",(0,r.kt)("em",{parentName:"p"},"true")," if this pointer points to a child of ",(0,r.kt)("em",{parentName:"p"},"pointer"),"."),(0,r.kt)("h4",{id:"parameters-4"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"pointer")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/json-p3/api/classes/jsonpointer.JSONPointer"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONPointer")))))),(0,r.kt)("h4",{id:"returns-3"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"boolean")),(0,r.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/pointer/pointer.ts#L117"},"src/pointer/pointer.ts:117")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"join"},"join"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"join"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"...tokens"),"): ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointer"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONPointer"))),(0,r.kt)("p",null,"Join this pointer with ",(0,r.kt)("em",{parentName:"p"},"tokens"),"."),(0,r.kt)("h4",{id:"parameters-5"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"...tokens")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string"),"[]"),(0,r.kt)("td",{parentName:"tr",align:"left"},'JSON Pointer strings, possibly without leading slashes. If a token or "part" does have a leading slash, the previous pointer is ignored and a new ',(0,r.kt)("inlineCode",{parentName:"td"},"JSONPointer")," is created, then processing of the remaining tokens continues.")))),(0,r.kt)("h4",{id:"returns-4"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointer"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONPointer"))),(0,r.kt)("p",null,'A new JSON Pointer that is the concatenation of all tokens or\n"parts".'),(0,r.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/pointer/pointer.ts#L220"},"src/pointer/pointer.ts:220")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"parent"},"parent"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"parent"),"(): ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointer"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONPointer"))),(0,r.kt)("p",null,"Return this pointer's parent as a new ",(0,r.kt)("inlineCode",{parentName:"p"},"JSONPointer"),"."),(0,r.kt)("p",null,"If this pointer points to the document root, ",(0,r.kt)("em",{parentName:"p"},"this")," is returned."),(0,r.kt)("h4",{id:"returns-5"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointer"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONPointer"))),(0,r.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/pointer/pointer.ts#L257"},"src/pointer/pointer.ts:257")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"parse"},"parse"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,r.kt)("strong",{parentName:"p"},"parse"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"pointer"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"string"),"[]"),(0,r.kt)("h4",{id:"parameters-6"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"pointer")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string"))))),(0,r.kt)("h4",{id:"returns-6"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"string"),"[]"),(0,r.kt)("h4",{id:"defined-in-9"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/pointer/pointer.ts#L126"},"src/pointer/pointer.ts:126")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"resolve"},"resolve"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"resolve"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"value"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"fallback?"),"): ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/modules#jsonvalue"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONValue"))),(0,r.kt)("p",null,"Resolve this pointer against JSON-like data ",(0,r.kt)("em",{parentName:"p"},"value"),"."),(0,r.kt)("h4",{id:"parameters-7"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Default value"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"value")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/json-p3/api/modules#jsonvalue"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONValue"))),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"undefined")),(0,r.kt)("td",{parentName:"tr",align:"left"},"The target JSON-like value, possibly loaded using ",(0,r.kt)("inlineCode",{parentName:"td"},"JSON.parse()"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"fallback")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/json-p3/api/namespaces/jsonpointer#maybejsonvalue"},(0,r.kt)("inlineCode",{parentName:"a"},"MaybeJSONValue"))),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"UNDEFINED")),(0,r.kt)("td",{parentName:"tr",align:"left"},"A default value to return if ",(0,r.kt)("em",{parentName:"td"},"value")," has no path matching ",(0,r.kt)("inlineCode",{parentName:"td"},"pointer"),".")))),(0,r.kt)("h4",{id:"returns-7"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/modules#jsonvalue"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONValue"))),(0,r.kt)("p",null,"The value identified by ",(0,r.kt)("em",{parentName:"p"},"pointer")," or, if given, the fallback\nvalue in the even of a ",(0,r.kt)("inlineCode",{parentName:"p"},"JSONPointerResolutionError"),"."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"Throws"))),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointerResolutionError"},"JSONPointerResolutionError"),"\nIf the value pointed to by ",(0,r.kt)("em",{parentName:"p"},"pointer")," does not exist in ",(0,r.kt)("em",{parentName:"p"},"value"),", and\nno fallback value is given."),(0,r.kt)("h4",{id:"defined-in-10"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/pointer/pointer.ts#L57"},"src/pointer/pointer.ts:57")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"resolvewithparent"},"resolveWithParent"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"resolveWithParent"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"value"),"): [",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/namespaces/jsonpointer#maybejsonvalue"},(0,r.kt)("inlineCode",{parentName:"a"},"MaybeJSONValue")),", ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/namespaces/jsonpointer#maybejsonvalue"},(0,r.kt)("inlineCode",{parentName:"a"},"MaybeJSONValue")),"]"),(0,r.kt)("h4",{id:"parameters-8"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"value")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/json-p3/api/modules#jsonvalue"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONValue")))))),(0,r.kt)("h4",{id:"returns-8"},"Returns"),(0,r.kt)("p",null,"[",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/namespaces/jsonpointer#maybejsonvalue"},(0,r.kt)("inlineCode",{parentName:"a"},"MaybeJSONValue")),", ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/namespaces/jsonpointer#maybejsonvalue"},(0,r.kt)("inlineCode",{parentName:"a"},"MaybeJSONValue")),"]"),(0,r.kt)("h4",{id:"defined-in-11"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/pointer/pointer.ts#L79"},"src/pointer/pointer.ts:79")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"to"},"to"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"to"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"rel"),"): ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointer"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONPointer"))),(0,r.kt)("h4",{id:"parameters-9"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"rel")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string")," ","|"," ",(0,r.kt)("a",{parentName:"td",href:"/json-p3/api/classes/jsonpointer.RelativeJSONPointer"},(0,r.kt)("inlineCode",{parentName:"a"},"RelativeJSONPointer")))))),(0,r.kt)("h4",{id:"returns-9"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointer"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONPointer"))),(0,r.kt)("h4",{id:"defined-in-12"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/pointer/pointer.ts#L267"},"src/pointer/pointer.ts:267")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"tostring"},"toString"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"toString"),"(): ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("h4",{id:"returns-10"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("h4",{id:"defined-in-13"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/pointer/pointer.ts#L110"},"src/pointer/pointer.ts:110")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"encode"},"encode"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("inlineCode",{parentName:"p"},"Static")," ",(0,r.kt)("strong",{parentName:"p"},"encode"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"tokens"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("h4",{id:"parameters-10"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"tokens")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string"),"[]")))),(0,r.kt)("h4",{id:"returns-11"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("h4",{id:"defined-in-14"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/pointer/pointer.ts#L32"},"src/pointer/pointer.ts:32")))}m.isMDXComponent=!0}}]);