"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1831],{7696:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>d,default:()=>o,frontMatter:()=>a,metadata:()=>r,toc:()=>h});const r=JSON.parse('{"id":"api/namespaces/jsonpath/classes/JSONPathEnvironment","title":"Class: JSONPathEnvironment","description":"Defined in79","source":"@site/docs/api/namespaces/jsonpath/classes/JSONPathEnvironment.md","sourceDirName":"api/namespaces/jsonpath/classes","slug":"/api/namespaces/jsonpath/classes/JSONPathEnvironment","permalink":"/json-p3/api/namespaces/jsonpath/classes/JSONPathEnvironment","draft":false,"unlisted":false,"editUrl":"https://github.com/jg-rp/json-p3/tree/docs/docs/api/namespaces/jsonpath/classes/JSONPathEnvironment.md","tags":[],"version":"current","frontMatter":{},"sidebar":"API","previous":{"title":"TokenKind","permalink":"/json-p3/api/namespaces/jsonpath/enumerations/TokenKind"},"next":{"title":"JSONPathError","permalink":"/json-p3/api/namespaces/jsonpath/classes/JSONPathError"}}');var i=s(4848),t=s(8453);const a={},d="Class: JSONPathEnvironment",c={},h=[{value:"Constructors",id:"constructors",level:2},{value:"new JSONPathEnvironment()",id:"new-jsonpathenvironment",level:3},{value:"Parameters",id:"parameters",level:4},{value:"options",id:"options",level:5},{value:"Returns",id:"returns",level:4},{value:"Properties",id:"properties",level:2},{value:"functionRegister",id:"functionregister",level:3},{value:"keysPattern",id:"keyspattern",level:3},{value:"maxIntIndex",id:"maxintindex",level:3},{value:"maxRecursionDepth",id:"maxrecursiondepth",level:3},{value:"minIntIndex",id:"minintindex",level:3},{value:"nondeterministic",id:"nondeterministic",level:3},{value:"strict",id:"strict",level:3},{value:"Methods",id:"methods",level:2},{value:"checkWellTypedness()",id:"checkwelltypedness",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"token",id:"token",level:5},{value:"args",id:"args",level:5},{value:"Returns",id:"returns-1",level:4},{value:"compile()",id:"compile",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"path",id:"path",level:5},{value:"Returns",id:"returns-2",level:4},{value:"entries()",id:"entries",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"obj",id:"obj",level:5},{value:"Returns",id:"returns-3",level:4},{value:"lazyQuery()",id:"lazyquery",level:3},{value:"Parameters",id:"parameters-4",level:4},{value:"path",id:"path-1",level:5},{value:"value",id:"value",level:5},{value:"Returns",id:"returns-4",level:4},{value:"match()",id:"match",level:3},{value:"Parameters",id:"parameters-5",level:4},{value:"path",id:"path-2",level:5},{value:"value",id:"value-1",level:5},{value:"Returns",id:"returns-5",level:4},{value:"query()",id:"query",level:3},{value:"Parameters",id:"parameters-6",level:4},{value:"path",id:"path-3",level:5},{value:"value",id:"value-2",level:5},{value:"Returns",id:"returns-6",level:4},{value:"setupFilterFunctions()",id:"setupfilterfunctions",level:3},{value:"Returns",id:"returns-7",level:4}];function l(e){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",header:"header",hr:"hr",p:"p",strong:"strong",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"class-jsonpathenvironment",children:"Class: JSONPathEnvironment"})}),"\n",(0,i.jsxs)(n.p,{children:["Defined in: ",(0,i.jsx)(n.a,{href:"https://github.com/jg-rp/json-p3/blob/5f12cd1d7dd51bed57a8532a0d2fb319354b82f4/src/path/environment.ts#L79",children:"src/path/environment.ts:79"})]}),"\n",(0,i.jsx)(n.p,{children:"A configuration object from which JSONPath queries can be evaluated."}),"\n",(0,i.jsx)(n.p,{children:"An environment is where you'd register custom function extensions or set\nthe maximum recursion depth limit, for example."}),"\n",(0,i.jsx)(n.h2,{id:"constructors",children:"Constructors"}),"\n",(0,i.jsx)(n.h3,{id:"new-jsonpathenvironment",children:"new JSONPathEnvironment()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"new JSONPathEnvironment"}),"(",(0,i.jsx)(n.code,{children:"options"}),"): ",(0,i.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathEnvironment",children:(0,i.jsx)(n.code,{children:"JSONPathEnvironment"})})]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Defined in: ",(0,i.jsx)(n.a,{href:"https://github.com/jg-rp/json-p3/blob/5f12cd1d7dd51bed57a8532a0d2fb319354b82f4/src/path/environment.ts#L129",children:"src/path/environment.ts:129"})]}),"\n",(0,i.jsx)(n.h4,{id:"parameters",children:"Parameters"}),"\n",(0,i.jsx)(n.h5,{id:"options",children:"options"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/type-aliases/JSONPathEnvironmentOptions",children:(0,i.jsx)(n.code,{children:"JSONPathEnvironmentOptions"})})," = ",(0,i.jsx)(n.code,{children:"{}"})]}),"\n",(0,i.jsx)(n.p,{children:"Environment configuration options."}),"\n",(0,i.jsx)(n.h4,{id:"returns",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathEnvironment",children:(0,i.jsx)(n.code,{children:"JSONPathEnvironment"})})}),"\n",(0,i.jsx)(n.h2,{id:"properties",children:"Properties"}),"\n",(0,i.jsx)(n.h3,{id:"functionregister",children:"functionRegister"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"functionRegister"}),": ",(0,i.jsx)(n.code,{children:"Map"}),"<",(0,i.jsx)(n.code,{children:"string"}),", ",(0,i.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/namespaces/functions/interfaces/FilterFunction",children:(0,i.jsx)(n.code,{children:"FilterFunction"})}),">"]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Defined in: ",(0,i.jsx)(n.a,{href:"https://github.com/jg-rp/json-p3/blob/5f12cd1d7dd51bed57a8532a0d2fb319354b82f4/src/path/environment.ts#L122",children:"src/path/environment.ts:122"})]}),"\n",(0,i.jsxs)(n.p,{children:["A map of function names to objects implementing the ",(0,i.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/namespaces/functions/interfaces/FilterFunction",children:"FilterFunction"}),"\ninterface. You are free to set or delete custom filter functions directly."]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"keyspattern",children:"keysPattern"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"readonly"})," ",(0,i.jsx)(n.strong,{children:"keysPattern"}),": ",(0,i.jsx)(n.code,{children:"RegExp"})]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Defined in: ",(0,i.jsx)(n.a,{href:"https://github.com/jg-rp/json-p3/blob/5f12cd1d7dd51bed57a8532a0d2fb319354b82f4/src/path/environment.ts#L116",children:"src/path/environment.ts:116"})]}),"\n",(0,i.jsxs)(n.p,{children:["The pattern to use for the non-standard ",(0,i.jsx)(n.em,{children:"keys selector"}),"."]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"maxintindex",children:"maxIntIndex"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"readonly"})," ",(0,i.jsx)(n.strong,{children:"maxIntIndex"}),": ",(0,i.jsx)(n.code,{children:"number"})]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Defined in: ",(0,i.jsx)(n.a,{href:"https://github.com/jg-rp/json-p3/blob/5f12cd1d7dd51bed57a8532a0d2fb319354b82f4/src/path/environment.ts#L94",children:"src/path/environment.ts:94"})]}),"\n",(0,i.jsx)(n.p,{children:"The maximum number allowed when indexing or slicing an array. Defaults to\n2**53 -1."}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"maxrecursiondepth",children:"maxRecursionDepth"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"readonly"})," ",(0,i.jsx)(n.strong,{children:"maxRecursionDepth"}),": ",(0,i.jsx)(n.code,{children:"number"})]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Defined in: ",(0,i.jsx)(n.a,{href:"https://github.com/jg-rp/json-p3/blob/5f12cd1d7dd51bed57a8532a0d2fb319354b82f4/src/path/environment.ts#L106",children:"src/path/environment.ts:106"})]}),"\n",(0,i.jsxs)(n.p,{children:["The maximum number of objects and/or arrays the recursive descent selector\ncan visit before a ",(0,i.jsx)(n.code,{children:"JSONPathRecursionLimitError"})," is thrown."]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"minintindex",children:"minIntIndex"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"readonly"})," ",(0,i.jsx)(n.strong,{children:"minIntIndex"}),": ",(0,i.jsx)(n.code,{children:"number"})]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Defined in: ",(0,i.jsx)(n.a,{href:"https://github.com/jg-rp/json-p3/blob/5f12cd1d7dd51bed57a8532a0d2fb319354b82f4/src/path/environment.ts#L100",children:"src/path/environment.ts:100"})]}),"\n",(0,i.jsx)(n.p,{children:"The minimum number allowed when indexing or slicing an array. Defaults to\n-(2**53) -1."}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"nondeterministic",children:"nondeterministic"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"readonly"})," ",(0,i.jsx)(n.strong,{children:"nondeterministic"}),": ",(0,i.jsx)(n.code,{children:"boolean"})]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Defined in: ",(0,i.jsx)(n.a,{href:"https://github.com/jg-rp/json-p3/blob/5f12cd1d7dd51bed57a8532a0d2fb319354b82f4/src/path/environment.ts#L111",children:"src/path/environment.ts:111"})]}),"\n",(0,i.jsxs)(n.p,{children:["If ",(0,i.jsx)(n.code,{children:"true"}),", enable nondeterministic ordering when iterating JSON object data."]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"strict",children:"strict"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"readonly"})," ",(0,i.jsx)(n.strong,{children:"strict"}),": ",(0,i.jsx)(n.code,{children:"boolean"})]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Defined in: ",(0,i.jsx)(n.a,{href:"https://github.com/jg-rp/json-p3/blob/5f12cd1d7dd51bed57a8532a0d2fb319354b82f4/src/path/environment.ts#L88",children:"src/path/environment.ts:88"})]}),"\n",(0,i.jsx)(n.p,{children:"Indicates if the environment should to be strict about its compliance with\nJSONPath standards."}),"\n",(0,i.jsxs)(n.p,{children:["Defaults to ",(0,i.jsx)(n.code,{children:"true"}),". Setting ",(0,i.jsx)(n.code,{children:"strict"})," to ",(0,i.jsx)(n.code,{children:"false"})," currently has no effect.\nIf/when we add non-standard features, the environment's strictness will\ncontrol their availability."]}),"\n",(0,i.jsx)(n.h2,{id:"methods",children:"Methods"}),"\n",(0,i.jsx)(n.h3,{id:"checkwelltypedness",children:"checkWellTypedness()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"checkWellTypedness"}),"(",(0,i.jsx)(n.code,{children:"token"}),", ",(0,i.jsx)(n.code,{children:"args"}),"): ",(0,i.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/namespaces/expressions/classes/FilterExpression",children:(0,i.jsx)(n.code,{children:"FilterExpression"})}),"[]"]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Defined in: ",(0,i.jsx)(n.a,{href:"https://github.com/jg-rp/json-p3/blob/5f12cd1d7dd51bed57a8532a0d2fb319354b82f4/src/path/environment.ts#L219",children:"src/path/environment.ts:219"})]}),"\n",(0,i.jsx)(n.p,{children:"Check the well-typedness of a function's arguments at compile-time."}),"\n",(0,i.jsxs)(n.p,{children:["This method is called by the parser when parsing function calls.\nIt is expected to throw a ",(0,i.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathTypeError",children:"JSONPathTypeError"})," if the function's\nparameters are not well-typed."]}),"\n",(0,i.jsx)(n.p,{children:"Override this if you want to deviate from the JSONPath Spec's function\nextension type system."}),"\n",(0,i.jsx)(n.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,i.jsx)(n.h5,{id:"token",children:"token"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/classes/Token",children:(0,i.jsx)(n.code,{children:"Token"})})}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/classes/Token",children:"Token"})," starting the function call. ",(0,i.jsx)(n.code,{children:"Token.value"}),"\nwill contain the name of the function."]}),"\n",(0,i.jsx)(n.h5,{id:"args",children:"args"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/namespaces/expressions/classes/FilterExpression",children:(0,i.jsx)(n.code,{children:"FilterExpression"})}),"[]"]}),"\n",(0,i.jsxs)(n.p,{children:["One ",(0,i.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/namespaces/expressions/classes/FilterExpression",children:"FilterExpression"})," for each argument."]}),"\n",(0,i.jsx)(n.h4,{id:"returns-1",children:"Returns"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/namespaces/expressions/classes/FilterExpression",children:(0,i.jsx)(n.code,{children:"FilterExpression"})}),"[]"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"compile",children:"compile()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"compile"}),"(",(0,i.jsx)(n.code,{children:"path"}),"): ",(0,i.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathQuery",children:(0,i.jsx)(n.code,{children:"JSONPathQuery"})})]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Defined in: ",(0,i.jsx)(n.a,{href:"https://github.com/jg-rp/json-p3/blob/5f12cd1d7dd51bed57a8532a0d2fb319354b82f4/src/path/environment.ts#L145",children:"src/path/environment.ts:145"})]}),"\n",(0,i.jsx)(n.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,i.jsx)(n.h5,{id:"path",children:"path"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"string"})}),"\n",(0,i.jsx)(n.p,{children:"A JSONPath query to parse."}),"\n",(0,i.jsx)(n.h4,{id:"returns-2",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathQuery",children:(0,i.jsx)(n.code,{children:"JSONPathQuery"})})}),"\n",(0,i.jsxs)(n.p,{children:["A new ",(0,i.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathQuery",children:"JSONPathQuery"})," object, bound to this environment."]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"entries",children:"entries()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"entries"}),"(",(0,i.jsx)(n.code,{children:"obj"}),"): [",(0,i.jsx)(n.code,{children:"string"}),", ",(0,i.jsx)(n.a,{href:"/json-p3/api/type-aliases/JSONValue",children:(0,i.jsx)(n.code,{children:"JSONValue"})}),"][]"]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Defined in: ",(0,i.jsx)(n.a,{href:"https://github.com/jg-rp/json-p3/blob/5f12cd1d7dd51bed57a8532a0d2fb319354b82f4/src/path/environment.ts#L304",children:"src/path/environment.ts:304"})]}),"\n",(0,i.jsxs)(n.p,{children:["Return an array of key/values of the enumerable properties in ",(0,i.jsx)(n.em,{children:"obj"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["If you want to introduce some nondeterminism to iterating JSON-like\nobjects, do it here. The wildcard selector, descendent segment and\nfilter selector all use ",(0,i.jsx)(n.code,{children:"this.environment.entries"}),"."]}),"\n",(0,i.jsx)(n.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,i.jsx)(n.h5,{id:"obj",children:"obj"}),"\n",(0,i.jsx)(n.p,{children:"A JSON-like object."}),"\n",(0,i.jsx)(n.h4,{id:"returns-3",children:"Returns"}),"\n",(0,i.jsxs)(n.p,{children:["[",(0,i.jsx)(n.code,{children:"string"}),", ",(0,i.jsx)(n.a,{href:"/json-p3/api/type-aliases/JSONValue",children:(0,i.jsx)(n.code,{children:"JSONValue"})}),"][]"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"lazyquery",children:"lazyQuery()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"lazyQuery"}),"(",(0,i.jsx)(n.code,{children:"path"}),", ",(0,i.jsx)(n.code,{children:"value"}),"): ",(0,i.jsx)(n.code,{children:"IterableIterator"}),"<",(0,i.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathNode",children:(0,i.jsx)(n.code,{children:"JSONPathNode"})}),">"]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Defined in: ",(0,i.jsx)(n.a,{href:"https://github.com/jg-rp/json-p3/blob/5f12cd1d7dd51bed57a8532a0d2fb319354b82f4/src/path/environment.ts#L172",children:"src/path/environment.ts:172"})]}),"\n",(0,i.jsxs)(n.p,{children:["A lazy version of ",(0,i.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathEnvironment#query",children:"query"})," which is faster and more memory\nefficient when querying some large datasets."]}),"\n",(0,i.jsx)(n.h4,{id:"parameters-4",children:"Parameters"}),"\n",(0,i.jsx)(n.h5,{id:"path-1",children:"path"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"string"})}),"\n",(0,i.jsxs)(n.p,{children:["A JSONPath query to parse and evaluate against ",(0,i.jsx)(n.em,{children:"value"}),"."]}),"\n",(0,i.jsx)(n.h5,{id:"value",children:"value"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"/json-p3/api/type-aliases/JSONValue",children:(0,i.jsx)(n.code,{children:"JSONValue"})})}),"\n",(0,i.jsxs)(n.p,{children:["Data to which ",(0,i.jsx)(n.em,{children:"path"})," will be applied."]}),"\n",(0,i.jsx)(n.h4,{id:"returns-4",children:"Returns"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"IterableIterator"}),"<",(0,i.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathNode",children:(0,i.jsx)(n.code,{children:"JSONPathNode"})}),">"]}),"\n",(0,i.jsxs)(n.p,{children:["A sequence of ",(0,i.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathNode",children:"JSONPathNode"})," objects resulting from\napplying ",(0,i.jsx)(n.em,{children:"path"})," to ",(0,i.jsx)(n.em,{children:"value"}),"."]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"match",children:"match()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"match"}),"(",(0,i.jsx)(n.code,{children:"path"}),", ",(0,i.jsx)(n.code,{children:"value"}),"): ",(0,i.jsx)(n.code,{children:"undefined"})," | ",(0,i.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathNode",children:(0,i.jsx)(n.code,{children:"JSONPathNode"})})]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Defined in: ",(0,i.jsx)(n.a,{href:"https://github.com/jg-rp/json-p3/blob/5f12cd1d7dd51bed57a8532a0d2fb319354b82f4/src/path/environment.ts#L188",children:"src/path/environment.ts:188"})]}),"\n",(0,i.jsxs)(n.p,{children:["Return a ",(0,i.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathNode",children:"JSONPathNode"})," instance for the first object found in\n",(0,i.jsx)(n.em,{children:"value"})," matching ",(0,i.jsx)(n.em,{children:"path"}),"."]}),"\n",(0,i.jsx)(n.h4,{id:"parameters-5",children:"Parameters"}),"\n",(0,i.jsx)(n.h5,{id:"path-2",children:"path"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"string"})}),"\n",(0,i.jsx)(n.p,{children:"A JSONPath query."}),"\n",(0,i.jsx)(n.h5,{id:"value-1",children:"value"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"/json-p3/api/type-aliases/JSONValue",children:(0,i.jsx)(n.code,{children:"JSONValue"})})}),"\n",(0,i.jsxs)(n.p,{children:["JSON-like data to which the query ",(0,i.jsx)(n.em,{children:"path"})," will be applied."]}),"\n",(0,i.jsx)(n.h4,{id:"returns-5",children:"Returns"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"undefined"})," | ",(0,i.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathNode",children:(0,i.jsx)(n.code,{children:"JSONPathNode"})})]}),"\n",(0,i.jsxs)(n.p,{children:["The first node in ",(0,i.jsx)(n.em,{children:"value"})," matching  ",(0,i.jsx)(n.em,{children:"path"}),", or ",(0,i.jsx)(n.code,{children:"undefined"})," if\nthere are no matches."]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"query",children:"query()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"query"}),"(",(0,i.jsx)(n.code,{children:"path"}),", ",(0,i.jsx)(n.code,{children:"value"}),"): ",(0,i.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathNodeList",children:(0,i.jsx)(n.code,{children:"JSONPathNodeList"})})]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Defined in: ",(0,i.jsx)(n.a,{href:"https://github.com/jg-rp/json-p3/blob/5f12cd1d7dd51bed57a8532a0d2fb319354b82f4/src/path/environment.ts#L159",children:"src/path/environment.ts:159"})]}),"\n",(0,i.jsx)(n.h4,{id:"parameters-6",children:"Parameters"}),"\n",(0,i.jsx)(n.h5,{id:"path-3",children:"path"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"string"})}),"\n",(0,i.jsxs)(n.p,{children:["A JSONPath query to parse and evaluate against ",(0,i.jsx)(n.em,{children:"value"}),"."]}),"\n",(0,i.jsx)(n.h5,{id:"value-2",children:"value"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"/json-p3/api/type-aliases/JSONValue",children:(0,i.jsx)(n.code,{children:"JSONValue"})})}),"\n",(0,i.jsxs)(n.p,{children:["Data to which ",(0,i.jsx)(n.em,{children:"path"})," will be applied."]}),"\n",(0,i.jsx)(n.h4,{id:"returns-6",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathNodeList",children:(0,i.jsx)(n.code,{children:"JSONPathNodeList"})})}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathNodeList",children:"JSONPathNodeList"})," resulting from applying ",(0,i.jsx)(n.em,{children:"path"}),"\nto ",(0,i.jsx)(n.em,{children:"value"}),"."]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"setupfilterfunctions",children:"setupFilterFunctions()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"protected"})," ",(0,i.jsx)(n.strong,{children:"setupFilterFunctions"}),"(): ",(0,i.jsx)(n.code,{children:"void"})]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Defined in: ",(0,i.jsx)(n.a,{href:"https://github.com/jg-rp/json-p3/blob/5f12cd1d7dd51bed57a8532a0d2fb319354b82f4/src/path/environment.ts#L196",children:"src/path/environment.ts:196"})]}),"\n",(0,i.jsxs)(n.p,{children:["A hook for setting up the function register. You are encouraged to\noverride this method in classes extending ",(0,i.jsx)(n.code,{children:"JSONPathEnvironment"}),"."]}),"\n",(0,i.jsx)(n.h4,{id:"returns-7",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"void"})})]})}function o(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>a,x:()=>d});var r=s(6540);const i={},t=r.createContext(i);function a(e){const n=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),r.createElement(t.Provider,{value:n},e.children)}}}]);