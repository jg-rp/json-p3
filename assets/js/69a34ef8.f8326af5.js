"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1997],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>k});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),l=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},d=function(e){var t=l(e.components);return a.createElement(o.Provider,{value:t},e.children)},h="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,o=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),h=l(n),c=r,k=h["".concat(o,".").concat(c)]||h[c]||u[c]||s;return n?a.createElement(k,p(p({ref:t},d),{},{components:n})):a.createElement(k,p({ref:t},d))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,p=new Array(s);p[0]=c;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i[h]="string"==typeof e?e:r,p[1]=i;for(var l=2;l<s;l++)p[l]=n[l];return a.createElement.apply(null,p)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},9245:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>p,default:()=>u,frontMatter:()=>s,metadata:()=>i,toc:()=>l});var a=n(7462),r=(n(7294),n(3905));const s={id:"jsonpath.expressions.RootQuery",title:"Class: RootQuery",sidebar_label:"RootQuery",custom_edit_url:null},p=void 0,i={unversionedId:"api/classes/jsonpath.expressions.RootQuery",id:"api/classes/jsonpath.expressions.RootQuery",title:"Class: RootQuery",description:"jsonpath.expressions.RootQuery",source:"@site/docs/api/classes/jsonpath.expressions.RootQuery.md",sourceDirName:"api/classes",slug:"/api/classes/jsonpath.expressions.RootQuery",permalink:"/json-p3/api/classes/jsonpath.expressions.RootQuery",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"jsonpath.expressions.RootQuery",title:"Class: RootQuery",sidebar_label:"RootQuery",custom_edit_url:null},sidebar:"API",previous:{title:"RelativeQuery",permalink:"/json-p3/api/classes/jsonpath.expressions.RelativeQuery"},next:{title:"StringLiteral",permalink:"/json-p3/api/classes/jsonpath.expressions.StringLiteral"}},o={},l=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Constructors",id:"constructors",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Inherited from",id:"inherited-from",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties",level:2},{value:"path",id:"path",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"Defined in",id:"defined-in-1",level:4},{value:"token",id:"token",level:3},{value:"Inherited from",id:"inherited-from-2",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"Methods",id:"methods",level:2},{value:"evaluate",id:"evaluate",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns",level:4},{value:"Overrides",id:"overrides",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"toString",id:"tostring",level:3},{value:"Returns",id:"returns-1",level:4},{value:"Overrides",id:"overrides-1",level:4},{value:"Defined in",id:"defined-in-4",level:4}],d={toc:l},h="wrapper";function u(e){let{components:t,...n}=e;return(0,r.kt)(h,(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/namespaces/jsonpath"},"jsonpath"),".",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/namespaces/jsonpath.expressions"},"expressions"),".RootQuery"),(0,r.kt)("p",null,"Base class for relative and absolute JSONPath query expressions."),(0,r.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.expressions.JSONPathQuery"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONPathQuery"))),(0,r.kt)("p",{parentName:"li"},"\u21b3 ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"RootQuery"))))),(0,r.kt)("h2",{id:"constructors"},"Constructors"),(0,r.kt)("h3",{id:"constructor"},"constructor"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"new RootQuery"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"token"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"path"),")"),(0,r.kt)("h4",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"token")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/json-p3/api/classes/jsonpath.Token"},(0,r.kt)("inlineCode",{parentName:"a"},"Token")))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"path")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/json-p3/api/classes/jsonpath.JSONPath"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONPath")))))),(0,r.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.expressions.JSONPathQuery"},"JSONPathQuery"),".",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.expressions.JSONPathQuery#constructor"},"constructor")),(0,r.kt)("h4",{id:"defined-in"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/path/expression.ts#L183"},"src/path/expression.ts:183")),(0,r.kt)("h2",{id:"properties"},"Properties"),(0,r.kt)("h3",{id:"path"},"path"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"path"),": ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPath"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONPath"))),(0,r.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.expressions.JSONPathQuery"},"JSONPathQuery"),".",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.expressions.JSONPathQuery#path"},"path")),(0,r.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/path/expression.ts#L185"},"src/path/expression.ts:185")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"token"},"token"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"token"),": ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.Token"},(0,r.kt)("inlineCode",{parentName:"a"},"Token"))),(0,r.kt)("h4",{id:"inherited-from-2"},"Inherited from"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.expressions.JSONPathQuery"},"JSONPathQuery"),".",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.expressions.JSONPathQuery#token"},"token")),(0,r.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/path/expression.ts#L184"},"src/path/expression.ts:184")),(0,r.kt)("h2",{id:"methods"},"Methods"),(0,r.kt)("h3",{id:"evaluate"},"evaluate"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"evaluate"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"context"),"): ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPathNodeList"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONPathNodeList"))),(0,r.kt)("p",null,"Evaluate the filter expression in the given context."),(0,r.kt)("h4",{id:"parameters-1"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"context")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/json-p3/api/namespaces/jsonpath#filtercontext"},(0,r.kt)("inlineCode",{parentName:"a"},"FilterContext"))),(0,r.kt)("td",{parentName:"tr",align:"left"},"Evaluation context.")))),(0,r.kt)("h4",{id:"returns"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPathNodeList"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONPathNodeList"))),(0,r.kt)("h4",{id:"overrides"},"Overrides"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.expressions.JSONPathQuery"},"JSONPathQuery"),".",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.expressions.JSONPathQuery#evaluate"},"evaluate")),(0,r.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/path/expression.ts#L202"},"src/path/expression.ts:202")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"tostring"},"toString"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"toString"),"(): ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("p",null,"Return a string representation of the expression."),(0,r.kt)("h4",{id:"returns-1"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("h4",{id:"overrides-1"},"Overrides"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.expressions.JSONPathQuery"},"JSONPathQuery"),".",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.expressions.JSONPathQuery#tostring"},"toString")),(0,r.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/4eccc05/src/path/expression.ts#L206"},"src/path/expression.ts:206")))}u.isMDXComponent=!0}}]);