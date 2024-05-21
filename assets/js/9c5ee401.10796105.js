"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[470],{5004:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>r,metadata:()=>o,toc:()=>l});var t=s(5893),i=s(1151);const r={},a="JSONPath Functions",o={id:"guides/jsonpath-functions",title:"JSONPath Functions",description:"Standard functions",source:"@site/docs/guides/jsonpath-functions.md",sourceDirName:"guides",slug:"/guides/jsonpath-functions",permalink:"/json-p3/guides/jsonpath-functions",draft:!1,unlisted:!1,editUrl:"https://github.com/jg-rp/json-p3/tree/docs/docs/guides/jsonpath-functions.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Extra JSONPath Syntax",permalink:"/json-p3/guides/jsonpath-extra"},next:{title:"JSON Pointer",permalink:"/json-p3/guides/json-pointer"}},c={},l=[{value:"Standard functions",id:"standard-functions",level:2},{value:"<code>count()</code>",id:"count",level:3},{value:"<code>length()</code>",id:"length",level:3},{value:"<code>match()</code>",id:"match",level:3},{value:"<code>search()</code>",id:"search",level:3},{value:"<code>value()</code>",id:"value",level:3},{value:"Well-typedness",id:"well-typedness",level:2},{value:"Function extensions",id:"function-extensions",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"jsonpath-functions",children:"JSONPath Functions"}),"\n",(0,t.jsx)(n.h2,{id:"standard-functions",children:"Standard functions"}),"\n",(0,t.jsxs)(n.p,{children:["These are the standard, built-in functions available to JSONPath ",(0,t.jsx)(n.a,{href:"/json-p3/guides/jsonpath-syntax#filters",children:"filters"}),". You can also create your own ",(0,t.jsx)(n.a,{href:"#function-extensions",children:"function extensions"}),"."]}),"\n",(0,t.jsx)(n.h3,{id:"count",children:(0,t.jsx)(n.code,{children:"count()"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"count(nodes: JSONPathNodeList): number\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Return the number of nodes in a node list. Usually, ",(0,t.jsx)(n.code,{children:"count()"})," will be given a ",(0,t.jsx)(n.a,{href:"/json-p3/guides/jsonpath-syntax#filter-queries",children:"filter query"})," as its argument, and a call to ",(0,t.jsx)(n.code,{children:"count()"})," must be part of a comparison expression."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",metastring:'title="Example query"',children:"$.users[?count(@.*) > 2]\n"})}),"\n",(0,t.jsx)(n.h3,{id:"length",children:(0,t.jsx)(n.code,{children:"length()"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"length(value: JSONValue): number | undefined\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Return the length of a string or array, or the number of items in an object. Usually, ",(0,t.jsx)(n.code,{children:"length()"})," will be given a ",(0,t.jsx)(n.a,{href:"/json-p3/guides/jsonpath-syntax#filter-queries",children:"filter query"})," as its argument, and a call to ",(0,t.jsx)(n.code,{children:"length()"})," must be part of a comparison expression."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",metastring:'title="Example query"',children:"$.users[?length(@) > 2]\n"})}),"\n",(0,t.jsx)(n.h3,{id:"match",children:(0,t.jsx)(n.code,{children:"match()"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"match(value: string, pattern: string): boolean\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Return ",(0,t.jsx)(n.code,{children:"true"})," if ",(0,t.jsx)(n.em,{children:"value"})," is a full match to the regular expression ",(0,t.jsx)(n.em,{children:"pattern"}),", or ",(0,t.jsx)(n.code,{children:"false"})," otherwise."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",metastring:'title="Example query"',children:"$.users[?match(@.name, '[Ss].*')]\n"})}),"\n",(0,t.jsx)(n.h3,{id:"search",children:(0,t.jsx)(n.code,{children:"search()"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"search(value: string, pattern: string): boolean\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Return ",(0,t.jsx)(n.code,{children:"true"})," if ",(0,t.jsx)(n.em,{children:"value"})," contains ",(0,t.jsx)(n.em,{children:"pattern"}),", or ",(0,t.jsx)(n.code,{children:"false"})," otherwise."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",metastring:'title="Example query"',children:"$.users[?search(@.name, '[Aa]')]\n"})}),"\n",(0,t.jsx)(n.h3,{id:"value",children:(0,t.jsx)(n.code,{children:"value()"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"value(nodes: JSONPathNodeList): JSONValue | undefined\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Return the value associated with the first node in ",(0,t.jsx)(n.em,{children:"nodes"}),", if ",(0,t.jsx)(n.em,{children:"nodes"})," has exactly one ",(0,t.jsx)(n.a,{href:"/json-p3/api/classes/jsonpath.JSONPathNode",children:(0,t.jsx)(n.code,{children:"JSONPathNode"})}),". Usually, ",(0,t.jsx)(n.code,{children:"value()"})," will be called with a ",(0,t.jsx)(n.a,{href:"/json-p3/guides/jsonpath-syntax#filter-queries",children:"filter query"})," as its argument."]}),"\n",(0,t.jsx)(n.admonition,{type:"info",children:(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.a,{href:"/json-p3/guides/jsonpath-syntax#filter-queries",children:"Filter queries"}),' that can result in at most one node are known as "singular queries", and all singular queries will be implicitly replaced with their value as required, without the use of ',(0,t.jsx)(n.code,{children:"value()"}),". ",(0,t.jsx)(n.code,{children:"value()"})," is useful when you need the value from a query that can, theoretically, return multiple nodes."]})}),"\n",(0,t.jsx)(n.h2,{id:"well-typedness",children:"Well-typedness"}),"\n",(0,t.jsxs)(n.p,{children:["The JSONPath specification defines a ",(0,t.jsx)(n.a,{href:"https://datatracker.ietf.org/doc/html/rfc9535#name-type-system-for-function-ex",children:"type system for function expressions"}),", and rules for how those types can be used within an expression. JSON P3 will throw a ",(0,t.jsx)(n.a,{href:"/json-p3/api/classes/jsonpath.JSONPathTypeError",children:"JSONPathTypeError"})," at query compile time if it contains expressions that are not deemed to be well-typed."]}),"\n",(0,t.jsxs)(n.p,{children:["Please see ",(0,t.jsx)(n.a,{href:"https://datatracker.ietf.org/doc/html/rfc9535#name-well-typedness-of-function-",children:"Section 2.4.3"})," ",(0,t.jsx)(n.em,{children:"Well-Typedness of Function Expressions"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"function-extensions",children:"Function extensions"}),"\n",(0,t.jsxs)(n.p,{children:["Add, remove or replace ",(0,t.jsx)(n.a,{href:"/json-p3/guides/jsonpath-syntax#filter-functions",children:"filter functions"})," by updating the ",(0,t.jsx)(n.a,{href:"/json-p3/api/classes/jsonpath.JSONPathEnvironment#functionregister",children:"function register"})," on a ",(0,t.jsx)(n.a,{href:"/json-p3/api/classes/jsonpath.JSONPathEnvironment",children:(0,t.jsx)(n.code,{children:"JSONPathEnvironment"})}),". It is a regular ",(0,t.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",children:"Map"}),", mapping function names to objects implementing the ",(0,t.jsx)(n.a,{href:"/json-p3/api/interfaces/jsonpath.functions.FilterFunction",children:(0,t.jsx)(n.code,{children:"FilterFunction"})})," interface."]}),"\n",(0,t.jsx)(n.admonition,{type:"info",children:(0,t.jsxs)(n.p,{children:["You can update the function register on the ",(0,t.jsx)(n.em,{children:"default environment"})," (",(0,t.jsx)(n.code,{children:'import { DEFAULT_ENVIRONMENT } from "json-p3"'}),"), and use convenience functions like ",(0,t.jsx)(n.a,{href:"/json-p3/quick-start#jsonpath",children:(0,t.jsx)(n.code,{children:"query()"})})," and ",(0,t.jsx)(n.a,{href:"/json-p3/quick-start#compilation",children:(0,t.jsx)(n.code,{children:"compile()"})}),". Here we'll create a new ",(0,t.jsx)(n.code,{children:"JSONPathEnvironment"}),", then use its methods directly."]})}),"\n",(0,t.jsxs)(n.p,{children:["Every filter function must define the types of its parameters and the type of its return value, according to the JSONPath specification's ",(0,t.jsx)(n.a,{href:"https://datatracker.ietf.org/doc/html/rfc9535#name-type-system-for-function-ex",children:"type system"}),". This example implements a ",(0,t.jsx)(n.code,{children:"typeof()"})," function, which accepts a parameter of ",(0,t.jsx)(n.a,{href:"/json-p3/api/enums/jsonpath.functions.FunctionExpressionType",children:(0,t.jsx)(n.code,{children:"ValueType"})})," and returns a ",(0,t.jsx)(n.code,{children:"ValueType"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'import {\n  FilterFunction,\n  FunctionExpressionType,\n  JSONPathEnvironment,\n} from "json-p3";\n\nclass TypeOfFilterFunction implements FilterFunction {\n  readonly argTypes = [FunctionExpressionType.ValueType];\n  readonly returnType = FunctionExpressionType.ValueType;\n\n  public call(value: unknown): string {\n    return typeof value;\n  }\n}\n'})}),"\n",(0,t.jsxs)(n.p,{children:["We would then register an instance of ",(0,t.jsx)(n.code,{children:"TypeOfFilterFunction"})," with a ",(0,t.jsx)(n.code,{children:"JSONPathEnvironment"}),", and use the environment's ",(0,t.jsx)(n.code,{children:"query()"}),", ",(0,t.jsx)(n.code,{children:"compile()"})," or ",(0,t.jsx)(n.code,{children:"match()"})," methods."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'// .. continued from above\nconst env = new JSONPathEnvironment();\nenv.functionRegister.set("typeof", new TypeOfFilterFunction());\n\nconst nodes = env.query("$.users[?typeof(@.score) == \'number\']", data);\n'})})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>o,a:()=>a});var t=s(7294);const i={},r=t.createContext(i);function a(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);