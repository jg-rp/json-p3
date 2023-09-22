"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[470],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),l=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=l(e.components);return a.createElement(p.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),c=l(n),d=r,f=c["".concat(p,".").concat(d)]||c[d]||m[d]||i;return n?a.createElement(f,o(o({ref:t},u),{},{components:n})):a.createElement(f,o({ref:t},u))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s[c]="string"==typeof e?e:r,o[1]=s;for(var l=2;l<i;l++)o[l]=n[l];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4710:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var a=n(7462),r=(n(7294),n(3905));const i={},o="JSONPath Functions",s={unversionedId:"guides/jsonpath-functions",id:"guides/jsonpath-functions",title:"JSONPath Functions",description:"Standard functions",source:"@site/docs/guides/jsonpath-functions.md",sourceDirName:"guides",slug:"/guides/jsonpath-functions",permalink:"/json-p3/guides/jsonpath-functions",draft:!1,editUrl:"https://github.com/jg-rp/json-p3/tree/docs/docs/guides/jsonpath-functions.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"JSONPath Query Syntax",permalink:"/json-p3/guides/jsonpath-syntax"},next:{title:"JSON Pointer",permalink:"/json-p3/guides/json-pointer"}},p={},l=[{value:"Standard functions",id:"standard-functions",level:2},{value:"<code>count()</code>",id:"count",level:3},{value:"<code>length()</code>",id:"length",level:3},{value:"<code>match()</code>",id:"match",level:3},{value:"<code>search()</code>",id:"search",level:3},{value:"<code>value()</code>",id:"value",level:3},{value:"Well-typedness",id:"well-typedness",level:2},{value:"Function extensions",id:"function-extensions",level:2}],u={toc:l},c="wrapper";function m(e){let{components:t,...n}=e;return(0,r.kt)(c,(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"jsonpath-functions"},"JSONPath Functions"),(0,r.kt)("h2",{id:"standard-functions"},"Standard functions"),(0,r.kt)("p",null,"These are the standard, built-in functions available to JSONPath ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/guides/jsonpath-syntax#filters"},"filters"),". You can also create your own ",(0,r.kt)("a",{parentName:"p",href:"#function-extensions"},"function extensions"),"."),(0,r.kt)("h3",{id:"count"},(0,r.kt)("inlineCode",{parentName:"h3"},"count()")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"count(nodes: JSONPathNodeList): number\n")),(0,r.kt)("p",null,"Return the number of nodes in a node list. Usually, ",(0,r.kt)("inlineCode",{parentName:"p"},"count()")," will be given a ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/guides/jsonpath-syntax#filter-queries"},"filter query")," as its argument, and a call to ",(0,r.kt)("inlineCode",{parentName:"p"},"count()")," must be part of a comparison expression."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text",metastring:'title="Example query"',title:'"Example','query"':!0},"$.users[?count(@.*) > 2]\n")),(0,r.kt)("h3",{id:"length"},(0,r.kt)("inlineCode",{parentName:"h3"},"length()")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"length(value: JSONValue): number | undefined\n")),(0,r.kt)("p",null,"Return the length of a string or array, or the number of items in an object. Usually, ",(0,r.kt)("inlineCode",{parentName:"p"},"length()")," will be given a ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/guides/jsonpath-syntax#filter-queries"},"filter query")," as its argument, and a call to ",(0,r.kt)("inlineCode",{parentName:"p"},"length()")," must be part of a comparison expression."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text",metastring:'title="Example query"',title:'"Example','query"':!0},"$.users[?length(@) > 2]\n")),(0,r.kt)("h3",{id:"match"},(0,r.kt)("inlineCode",{parentName:"h3"},"match()")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"match(value: string, pattern: string): boolean\n")),(0,r.kt)("p",null,"Return ",(0,r.kt)("inlineCode",{parentName:"p"},"true")," if ",(0,r.kt)("em",{parentName:"p"},"value")," is a full match to the regular expression ",(0,r.kt)("em",{parentName:"p"},"pattern"),", or ",(0,r.kt)("inlineCode",{parentName:"p"},"false")," otherwise."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text",metastring:'title="Example query"',title:'"Example','query"':!0},"$.users[?match(@.name, '[Ss].*')]\n")),(0,r.kt)("h3",{id:"search"},(0,r.kt)("inlineCode",{parentName:"h3"},"search()")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"search(value: string, pattern: string): boolean\n")),(0,r.kt)("p",null,"Return ",(0,r.kt)("inlineCode",{parentName:"p"},"true")," if ",(0,r.kt)("em",{parentName:"p"},"value")," contains ",(0,r.kt)("em",{parentName:"p"},"pattern"),", or ",(0,r.kt)("inlineCode",{parentName:"p"},"false")," otherwise."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text",metastring:'title="Example query"',title:'"Example','query"':!0},"$.users[?search(@.name, '[Aa]')]\n")),(0,r.kt)("h3",{id:"value"},(0,r.kt)("inlineCode",{parentName:"h3"},"value()")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"value(nodes: JSONPathNodeList): JSONValue | undefined\n")),(0,r.kt)("p",null,"Return the value associated with the first node in ",(0,r.kt)("em",{parentName:"p"},"nodes"),", if ",(0,r.kt)("em",{parentName:"p"},"nodes")," has exactly one ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPathNode"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONPathNode")),". Usually, ",(0,r.kt)("inlineCode",{parentName:"p"},"value()")," will be called with a ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/guides/jsonpath-syntax#filter-queries"},"filter query")," as its argument."),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("a",{parentName:"p",href:"/json-p3/guides/jsonpath-syntax#filter-queries"},"Filter queries"),' that can result in at most one node are known as "singular queries", and all singular queries will be implicitly replaced with their value as required, without the use of ',(0,r.kt)("inlineCode",{parentName:"p"},"value()"),". ",(0,r.kt)("inlineCode",{parentName:"p"},"value()")," is useful when you need the value from a query that can, theoretically, return multiple nodes.")),(0,r.kt)("h2",{id:"well-typedness"},"Well-typedness"),(0,r.kt)("p",null,"The JSONPath specification defines a ",(0,r.kt)("a",{parentName:"p",href:"https://datatracker.ietf.org/doc/html/draft-ietf-jsonpath-base-20#name-type-system-for-function-ex"},"type system for function expressions"),", and rules for how those types can be used within an expression. JSON P3 will throw a ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPathTypeError"},"JSONPathTypeError")," at query compile time if it contains expressions that are not deemed to be well-typed."),(0,r.kt)("p",null,"Please see ",(0,r.kt)("a",{parentName:"p",href:"https://datatracker.ietf.org/doc/html/draft-ietf-jsonpath-base-20#name-well-typedness-of-function-"},"Section 2.4.3")," ",(0,r.kt)("em",{parentName:"p"},"Well-Typedness of Function Expressions"),"."),(0,r.kt)("h2",{id:"function-extensions"},"Function extensions"),(0,r.kt)("p",null,"Add, remove or replace ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/guides/jsonpath-syntax#filter-functions"},"filter functions")," by updating the ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPathEnvironment#functionregister"},"function register")," on a ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPathEnvironment"},(0,r.kt)("inlineCode",{parentName:"a"},"JSONPathEnvironment")),". It is a regular ",(0,r.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"},"Map"),", mapping function names to objects implementing the ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/interfaces/jsonpath.functions.FilterFunction"},(0,r.kt)("inlineCode",{parentName:"a"},"FilterFunction"))," interface."),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"You can update the function register on the ",(0,r.kt)("em",{parentName:"p"},"default environment")," (",(0,r.kt)("inlineCode",{parentName:"p"},'import { DEFAULT_ENVIRONMENT } from "json-p3"'),"), and use convenience functions like ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/quick-start#jsonpath"},(0,r.kt)("inlineCode",{parentName:"a"},"query()"))," and ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/quick-start#compilation"},(0,r.kt)("inlineCode",{parentName:"a"},"compile()")),". Here we'll create a new ",(0,r.kt)("inlineCode",{parentName:"p"},"JSONPathEnvironment"),", then use its methods directly.")),(0,r.kt)("p",null,"Every filter function must define the types of its parameters and the type of its return value, according to the JSONPath specification's ",(0,r.kt)("a",{parentName:"p",href:"https://datatracker.ietf.org/doc/html/draft-ietf-jsonpath-base-20#name-type-system-for-function-ex"},"type system"),". This example implements a ",(0,r.kt)("inlineCode",{parentName:"p"},"typeof()")," function, which accepts a parameter of ",(0,r.kt)("a",{parentName:"p",href:"/json-p3/api/enums/jsonpath.functions.FunctionExpressionType"},(0,r.kt)("inlineCode",{parentName:"a"},"ValueType"))," and returns a ",(0,r.kt)("inlineCode",{parentName:"p"},"ValueType"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import {\n  FilterFunction,\n  FunctionExpressionType,\n  JSONPathEnvironment,\n} from "json-p3";\n\nclass TypeOfFilterFunction implements FilterFunction {\n  readonly argTypes = [FunctionExpressionType.ValueType];\n  readonly returnType = FunctionExpressionType.ValueType;\n\n  public call(value: unknown): string {\n    return typeof value;\n  }\n}\n')),(0,r.kt)("p",null,"We would then register an instance of ",(0,r.kt)("inlineCode",{parentName:"p"},"TypeOfFilterFunction")," with a ",(0,r.kt)("inlineCode",{parentName:"p"},"JSONPathEnvironment"),", and use the environment's ",(0,r.kt)("inlineCode",{parentName:"p"},"query()"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"compile()")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"match()")," methods."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'// .. continued from above\nconst env = new JSONPathEnvironment();\nenv.functionRegister.set("typeof", new TypeOfFilterFunction());\n\nconst nodes = env.query("$.users[?typeof(@.score) == \'number\']", data);\n')))}m.isMDXComponent=!0}}]);