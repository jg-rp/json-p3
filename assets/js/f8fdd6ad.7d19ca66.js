"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[478],{3905:(e,r,t)=>{t.d(r,{Zo:()=>d,kt:()=>k});var n=t(7294);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function s(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var l=n.createContext({}),p=function(e){var r=n.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):a(a({},r),e)),t},d=function(e){var r=p(e.components);return n.createElement(l.Provider,{value:r},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},m=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),c=p(t),m=o,k=c["".concat(l,".").concat(m)]||c[m]||u[m]||i;return t?n.createElement(k,a(a({ref:r},d),{},{components:t})):n.createElement(k,a({ref:r},d))}));function k(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var i=t.length,a=new Array(i);a[0]=m;var s={};for(var l in r)hasOwnProperty.call(r,l)&&(s[l]=r[l]);s.originalType=e,s[c]="string"==typeof e?e:o,a[1]=s;for(var p=2;p<i;p++)a[p]=t[p];return n.createElement.apply(null,a)}return n.createElement.apply(null,t)}m.displayName="MDXCreateElement"},160:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var n=t(7462),o=(t(7294),t(3905));const i={id:"jsonpointer.JSONPointerResolutionError",title:"Class: JSONPointerResolutionError",sidebar_label:"JSONPointerResolutionError",custom_edit_url:null},a=void 0,s={unversionedId:"api/classes/jsonpointer.JSONPointerResolutionError",id:"api/classes/jsonpointer.JSONPointerResolutionError",title:"Class: JSONPointerResolutionError",description:"jsonpointer.JSONPointerResolutionError",source:"@site/docs/api/classes/jsonpointer.JSONPointerResolutionError.md",sourceDirName:"api/classes",slug:"/api/classes/jsonpointer.JSONPointerResolutionError",permalink:"/json-p3/api/classes/jsonpointer.JSONPointerResolutionError",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"jsonpointer.JSONPointerResolutionError",title:"Class: JSONPointerResolutionError",sidebar_label:"JSONPointerResolutionError",custom_edit_url:null},sidebar:"API",previous:{title:"JSONPointerKeyError",permalink:"/json-p3/api/classes/jsonpointer.JSONPointerKeyError"},next:{title:"JSONPointerSyntaxError",permalink:"/json-p3/api/classes/jsonpointer.JSONPointerSyntaxError"}},l={},p=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Constructors",id:"constructors",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Overrides",id:"overrides",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties",level:2},{value:"cause",id:"cause",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"Defined in",id:"defined-in-1",level:4},{value:"message",id:"message",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"name",id:"name",level:3},{value:"Inherited from",id:"inherited-from-2",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"stack",id:"stack",level:3},{value:"Inherited from",id:"inherited-from-3",level:4},{value:"Defined in",id:"defined-in-4",level:4}],d={toc:p},c="wrapper";function u(e){let{components:r,...t}=e;return(0,o.kt)(c,(0,n.Z)({},d,t,{components:r,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/namespaces/jsonpointer"},"jsonpointer"),".JSONPointerResolutionError"),(0,o.kt)("p",null,"Base class for JSON Pointer resolution errors."),(0,o.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointerError"},(0,o.kt)("inlineCode",{parentName:"a"},"JSONPointerError"))),(0,o.kt)("p",{parentName:"li"},"\u21b3 ",(0,o.kt)("strong",{parentName:"p"},(0,o.kt)("inlineCode",{parentName:"strong"},"JSONPointerResolutionError"))),(0,o.kt)("p",{parentName:"li"},"\u21b3\u21b3 ",(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointerIndexError"},(0,o.kt)("inlineCode",{parentName:"a"},"JSONPointerIndexError"))),(0,o.kt)("p",{parentName:"li"},"\u21b3\u21b3 ",(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointerKeyError"},(0,o.kt)("inlineCode",{parentName:"a"},"JSONPointerKeyError"))),(0,o.kt)("p",{parentName:"li"},"\u21b3\u21b3 ",(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointerTypeError"},(0,o.kt)("inlineCode",{parentName:"a"},"JSONPointerTypeError"))))),(0,o.kt)("h2",{id:"constructors"},"Constructors"),(0,o.kt)("h3",{id:"constructor"},"constructor"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("strong",{parentName:"p"},"new JSONPointerResolutionError"),"(",(0,o.kt)("inlineCode",{parentName:"p"},"message"),")"),(0,o.kt)("h4",{id:"parameters"},"Parameters"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,o.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"message")),(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"string"))))),(0,o.kt)("h4",{id:"overrides"},"Overrides"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointerError"},"JSONPointerError"),".",(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointerError#constructor"},"constructor")),(0,o.kt)("h4",{id:"defined-in"},"Defined in"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/438fddd/src/pointer/errors.ts#L16"},"src/pointer/errors.ts:16")),(0,o.kt)("h2",{id:"properties"},"Properties"),(0,o.kt)("h3",{id:"cause"},"cause"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,o.kt)("strong",{parentName:"p"},"cause"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"unknown")),(0,o.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointerError"},"JSONPointerError"),".",(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointerError#cause"},"cause")),(0,o.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,o.kt)("p",null,"docs/node_modules/typescript/lib/lib.es2022.error.d.ts:24"),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"message"},"message"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,o.kt)("strong",{parentName:"p"},"message"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"string")),(0,o.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointerError"},"JSONPointerError"),".",(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointerError#message"},"message")),(0,o.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/438fddd/src/pointer/errors.ts#L16"},"src/pointer/errors.ts:16")),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"name"},"name"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("strong",{parentName:"p"},"name"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"string")),(0,o.kt)("h4",{id:"inherited-from-2"},"Inherited from"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointerError"},"JSONPointerError"),".",(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointerError#name"},"name")),(0,o.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,o.kt)("p",null,"docs/node_modules/typescript/lib/lib.es5.d.ts:1067"),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"stack"},"stack"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,o.kt)("strong",{parentName:"p"},"stack"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"string")),(0,o.kt)("h4",{id:"inherited-from-3"},"Inherited from"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointerError"},"JSONPointerError"),".",(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointerError#stack"},"stack")),(0,o.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,o.kt)("p",null,"docs/node_modules/typescript/lib/lib.es5.d.ts:1069"))}u.isMDXComponent=!0}}]);