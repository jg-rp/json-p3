"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7306],{3905:(e,t,n)=>{n.d(t,{Zo:()=>h,kt:()=>k});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},p=Object.keys(e);for(r=0;r<p.length;r++)n=p[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(r=0;r<p.length;r++)n=p[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),s=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},h=function(e){var t=s(e.components);return r.createElement(i.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,p=e.originalType,i=e.parentName,h=l(e,["components","mdxType","originalType","parentName"]),u=s(n),c=a,k=u["".concat(i,".").concat(c)]||u[c]||d[c]||p;return n?r.createElement(k,o(o({ref:t},h),{},{components:n})):r.createElement(k,o({ref:t},h))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var p=n.length,o=new Array(p);o[0]=c;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l[u]="string"==typeof e?e:a,o[1]=l;for(var s=2;s<p;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},4440:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>o,default:()=>d,frontMatter:()=>p,metadata:()=>l,toc:()=>s});var r=n(7462),a=(n(7294),n(3905));const p={id:"modules",title:"json-p3",sidebar_label:"Exports",sidebar_position:.5,custom_edit_url:null},o=void 0,l={unversionedId:"api/modules",id:"api/modules",title:"json-p3",description:"Namespaces",source:"@site/docs/api/modules.md",sourceDirName:"api",slug:"/api/modules",permalink:"/json-p3/api/modules",draft:!1,editUrl:null,tags:[],version:"current",sidebarPosition:.5,frontMatter:{id:"modules",title:"json-p3",sidebar_label:"Exports",sidebar_position:.5,custom_edit_url:null},sidebar:"API",previous:{title:"Readme",permalink:"/json-p3/api/"},next:{title:"jsonpatch",permalink:"/json-p3/api/namespaces/jsonpatch"}},i={},s=[{value:"Namespaces",id:"namespaces",level:2},{value:"References",id:"references",level:2},{value:"DEFAULT_ENVIRONMENT",id:"default_environment",level:3},{value:"FilterFunction",id:"filterfunction",level:3},{value:"FunctionExpressionType",id:"functionexpressiontype",level:3},{value:"JSONPatch",id:"jsonpatch",level:3},{value:"JSONPatchError",id:"jsonpatcherror",level:3},{value:"JSONPatchTestFailure",id:"jsonpatchtestfailure",level:3},{value:"JSONPath",id:"jsonpath",level:3},{value:"JSONPathEnvironment",id:"jsonpathenvironment",level:3},{value:"JSONPathEnvironmentOptions",id:"jsonpathenvironmentoptions",level:3},{value:"JSONPathError",id:"jsonpatherror",level:3},{value:"JSONPathIndexError",id:"jsonpathindexerror",level:3},{value:"JSONPathLexerError",id:"jsonpathlexererror",level:3},{value:"JSONPathNode",id:"jsonpathnode",level:3},{value:"JSONPathNodeList",id:"jsonpathnodelist",level:3},{value:"JSONPathRecursionLimitError",id:"jsonpathrecursionlimiterror",level:3},{value:"JSONPathSyntaxError",id:"jsonpathsyntaxerror",level:3},{value:"JSONPathTypeError",id:"jsonpathtypeerror",level:3},{value:"JSONPointer",id:"jsonpointer",level:3},{value:"Nothing",id:"nothing",level:3},{value:"OpObject",id:"opobject",level:3},{value:"RelativeJSONPointer",id:"relativejsonpointer",level:3},{value:"Token",id:"token",level:3},{value:"TokenKind",id:"tokenkind",level:3},{value:"UNDEFINED",id:"undefined",level:3},{value:"apply",id:"apply",level:3},{value:"compile",id:"compile",level:3},{value:"query",id:"query",level:3},{value:"resolve",id:"resolve",level:3},{value:"Type Aliases",id:"type-aliases",level:2},{value:"JSONValue",id:"jsonvalue",level:3},{value:"Defined in",id:"defined-in",level:4},{value:"Variables",id:"variables",level:2},{value:"version",id:"version",level:3},{value:"Defined in",id:"defined-in-1",level:4}],h={toc:s},u="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},h,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"namespaces"},"Namespaces"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/json-p3/api/namespaces/jsonpatch"},"jsonpatch")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/json-p3/api/namespaces/jsonpath"},"jsonpath")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/json-p3/api/namespaces/jsonpointer"},"jsonpointer"))),(0,a.kt)("h2",{id:"references"},"References"),(0,a.kt)("h3",{id:"default_environment"},"DEFAULT","_","ENVIRONMENT"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/namespaces/jsonpath#default_environment"},"DEFAULT_ENVIRONMENT")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"filterfunction"},"FilterFunction"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/interfaces/jsonpath.functions.FilterFunction"},"FilterFunction")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"functionexpressiontype"},"FunctionExpressionType"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/enums/jsonpath.functions.FunctionExpressionType"},"FunctionExpressionType")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"jsonpatch"},"JSONPatch"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpatch.JSONPatch"},"JSONPatch")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"jsonpatcherror"},"JSONPatchError"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpatch.JSONPatchError"},"JSONPatchError")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"jsonpatchtestfailure"},"JSONPatchTestFailure"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpatch.JSONPatchTestFailure"},"JSONPatchTestFailure")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"jsonpath"},"JSONPath"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPath"},"JSONPath")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"jsonpathenvironment"},"JSONPathEnvironment"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPathEnvironment"},"JSONPathEnvironment")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"jsonpathenvironmentoptions"},"JSONPathEnvironmentOptions"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/namespaces/jsonpath#jsonpathenvironmentoptions"},"JSONPathEnvironmentOptions")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"jsonpatherror"},"JSONPathError"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPathError"},"JSONPathError")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"jsonpathindexerror"},"JSONPathIndexError"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPathIndexError"},"JSONPathIndexError")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"jsonpathlexererror"},"JSONPathLexerError"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPathLexerError"},"JSONPathLexerError")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"jsonpathnode"},"JSONPathNode"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPathNode"},"JSONPathNode")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"jsonpathnodelist"},"JSONPathNodeList"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPathNodeList"},"JSONPathNodeList")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"jsonpathrecursionlimiterror"},"JSONPathRecursionLimitError"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPathRecursionLimitError"},"JSONPathRecursionLimitError")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"jsonpathsyntaxerror"},"JSONPathSyntaxError"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPathSyntaxError"},"JSONPathSyntaxError")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"jsonpathtypeerror"},"JSONPathTypeError"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPathTypeError"},"JSONPathTypeError")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"jsonpointer"},"JSONPointer"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointer"},"JSONPointer")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"nothing"},"Nothing"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/namespaces/jsonpath#nothing"},"Nothing")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"opobject"},"OpObject"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/namespaces/jsonpatch#opobject"},"OpObject")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"relativejsonpointer"},"RelativeJSONPointer"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.RelativeJSONPointer"},"RelativeJSONPointer")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"token"},"Token"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.Token"},"Token")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"tokenkind"},"TokenKind"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/enums/jsonpath.TokenKind"},"TokenKind")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"undefined"},"UNDEFINED"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/namespaces/jsonpointer#undefined"},"UNDEFINED")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"apply"},"apply"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/namespaces/jsonpatch#apply"},"apply")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"compile"},"compile"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/namespaces/jsonpath#compile"},"compile")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"query"},"query"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/namespaces/jsonpath#query"},"query")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"resolve"},"resolve"),(0,a.kt)("p",null,"Re-exports ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/namespaces/jsonpointer#resolve"},"resolve")),(0,a.kt)("h2",{id:"type-aliases"},"Type Aliases"),(0,a.kt)("h3",{id:"jsonvalue"},"JSONValue"),(0,a.kt)("p",null,"\u01ac ",(0,a.kt)("strong",{parentName:"p"},"JSONValue"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")," ","|"," ",(0,a.kt)("inlineCode",{parentName:"p"},"number")," ","|"," ",(0,a.kt)("inlineCode",{parentName:"p"},"null")," ","|"," ",(0,a.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,a.kt)("inlineCode",{parentName:"p"},"boolean")," ","|"," ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/modules#jsonvalue"},(0,a.kt)("inlineCode",{parentName:"a"},"JSONValue")),"[] ","|"," { ",(0,a.kt)("inlineCode",{parentName:"p"},"[key: string]"),": ",(0,a.kt)("a",{parentName:"p",href:"/json-p3/api/modules#jsonvalue"},(0,a.kt)("inlineCode",{parentName:"a"},"JSONValue")),";  }"),(0,a.kt)("p",null,"A JSON-like value."),(0,a.kt)("h4",{id:"defined-in"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/f97d10d/src/types.ts#L8"},"src/types.ts:8")),(0,a.kt)("h2",{id:"variables"},"Variables"),(0,a.kt)("h3",{id:"version"},"version"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,a.kt)("strong",{parentName:"p"},"version"),": ",(0,a.kt)("inlineCode",{parentName:"p"},'"__VERSION__"')),(0,a.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/json-p3/blob/f97d10d/src/index.ts#L1"},"src/index.ts:1")))}d.isMDXComponent=!0}}]);