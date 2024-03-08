"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6839],{9150:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>a,metadata:()=>l,toc:()=>o});var t=s(5893),r=s(1151);const a={},i="JSONPath Query Syntax",l={id:"guides/jsonpath-syntax",title:"JSONPath Query Syntax",description:"This page provides a short introduction to JSONPath syntax. We follow RFC 6535 closely and test against the JSONPath Compliance Test Suite.",source:"@site/docs/guides/jsonpath-syntax.md",sourceDirName:"guides",slug:"/guides/jsonpath-syntax",permalink:"/json-p3/guides/jsonpath-syntax",draft:!1,unlisted:!1,editUrl:"https://github.com/jg-rp/json-p3/tree/docs/docs/guides/jsonpath-syntax.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Quick start",permalink:"/json-p3/quick-start"},next:{title:"JSONPath Functions",permalink:"/json-p3/guides/jsonpath-functions"}},c={},o=[{value:"Segments, Selectors and Identifiers",id:"segments-selectors-and-identifiers",level:2},{value:"Root identifier",id:"root-identifier",level:3},{value:"Property names",id:"property-names",level:3},{value:"Array indices",id:"array-indices",level:3},{value:"Wildcard",id:"wildcard",level:3},{value:"Slices",id:"slices",level:3},{value:"Filters",id:"filters",level:3},{value:"Filter queries",id:"filter-queries",level:3},{value:"Filter functions",id:"filter-functions",level:3},{value:"Lists",id:"lists",level:3},{value:"Recursive descent",id:"recursive-descent",level:3}];function d(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"jsonpath-query-syntax",children:"JSONPath Query Syntax"}),"\n",(0,t.jsxs)(n.p,{children:["This page provides a short introduction to JSONPath syntax. We follow ",(0,t.jsx)(n.a,{href:"https://datatracker.ietf.org/doc/html/rfc9535",children:"RFC 6535"})," closely and test against the ",(0,t.jsx)(n.a,{href:"https://github.com/jsonpath-standard/jsonpath-compliance-test-suite",children:"JSONPath Compliance Test Suite"}),"."]}),"\n",(0,t.jsx)(n.p,{children:'Imagine a JSON document as a tree structure, where each JSON object and array can contain more objects, arrays and scalar values. Every object, array and scalar value is a node in the tree, and the outermost value is the "root" node.'}),"\n",(0,t.jsxs)(n.p,{children:["Every query must start with either the root node identifier (",(0,t.jsx)(n.code,{children:"$"}),") or, within a ",(0,t.jsx)(n.a,{href:"#filters",children:"filter selector"}),", the current node identifier (",(0,t.jsx)(n.code,{children:"@"}),"). We then chain JSONPath ",(0,t.jsx)(n.em,{children:"selectors"})," together to retrieve nodes from the target document. Each selector operates on nodes matched by preceding selectors."]}),"\n",(0,t.jsx)(n.p,{children:"The result of a query is always a list of selected nodes after all selectors have been applied."}),"\n",(0,t.jsxs)(n.admonition,{type:"info",children:[(0,t.jsxs)(n.p,{children:["Strictly, using terminology from ",(0,t.jsx)(n.a,{href:"https://datatracker.ietf.org/doc/html/rfc9535",children:"RFC 9535"}),", we chain ",(0,t.jsx)(n.em,{children:"segments"}),", and those segments contain one or more ",(0,t.jsx)(n.em,{children:"selectors"}),"."]}),(0,t.jsx)(n.p,{children:'We use the terms "target JSON document", "target document" and "query argument" interchangeably to mean the JSON value a query is applied to.'})]}),"\n",(0,t.jsx)(n.h2,{id:"segments-selectors-and-identifiers",children:"Segments, Selectors and Identifiers"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",metastring:'title="Example JSON document"',children:'{\n  "users": [\n    { "name": "Sue", "score": 100 },\n    { "name": "John", "score": 86, "admin": true },\n    { "name": "Sally", "score": 84, "admin": false },\n    { "name": "Jane", "score": 55 }\n  ],\n  "moderator": "John"\n}\n'})}),"\n",(0,t.jsx)(n.h3,{id:"root-identifier",children:"Root identifier"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"$"})," is the root node identifier, pointing to the first node in the target JSON document."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"$.users\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",metastring:'title="Example output"',children:'[\n  [\n    { "name": "Sue", "score": 100 },\n    { "name": "John", "score": 86, "admin": true },\n    { "name": "Sally", "score": 84, "admin": false },\n    { "name": "Jane", "score": 55 }\n  ]\n]\n'})}),"\n",(0,t.jsx)(n.p,{children:"A query containing just the root identifier returns the target document in its entirety."}),"\n",(0,t.jsx)(n.h3,{id:"property-names",children:"Property names"}),"\n",(0,t.jsxs)(n.p,{children:["Select an object's properties using dot notation (",(0,t.jsx)(n.code,{children:".thing"}),") or within a ",(0,t.jsx)(n.a,{href:"#lists",children:"bracketed segment"})," (",(0,t.jsx)(n.code,{children:"['thing']"})," or ",(0,t.jsx)(n.code,{children:'["thing"]'}),"). Dot notation is only allowed if a property name does not contain reserved characters. These three queries are equivalent."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"$.users\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"$['users']\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:'$["users"]\n'})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",metastring:'title="Example output"',children:'[\n  [\n    { "name": "Sue", "score": 100 },\n    { "name": "John", "score": 86, "admin": true },\n    { "name": "Sally", "score": 84, "admin": false },\n    { "name": "Jane", "score": 55 }\n  ]\n]\n'})}),"\n",(0,t.jsx)(n.h3,{id:"array-indices",children:"Array indices"}),"\n",(0,t.jsx)(n.p,{children:"Select array items by their index. Indices are zero-based and must be enclosed in brackets. If the index is negative, items are selected from the end of the array."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",metastring:'title="The first user"',children:"$.users[0]\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",metastring:'title="The last user"',children:"$.users[-1]\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",metastring:'title="Example output"',children:'[\n  { "name": "Sue", "score": 100 },\n  { "name": "Jane", "score": 55 }\n]\n'})}),"\n",(0,t.jsx)(n.h3,{id:"wildcard",children:"Wildcard"}),"\n",(0,t.jsx)(n.p,{children:"Select all items from an array or values from an object using the wildcard selector. These two queries are equivalent."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"$.users.*.name\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"$.users[*].name\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",metastring:'title="Example output"',children:'["Sue", "John", "Sally", "Jane"]\n'})}),"\n",(0,t.jsx)(n.h3,{id:"slices",children:"Slices"}),"\n",(0,t.jsxs)(n.p,{children:["Select a range of items from an array using slice notation, ",(0,t.jsx)(n.code,{children:"[<start>:<stop>:<step>]"}),". The start index, stop index and step are all optional. If a step is omitted, the last colon is optional and step defaults to 1."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"$.users[0::2].name\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",metastring:'title="Example output"',children:'["Sue", "Sally"]\n'})}),"\n",(0,t.jsx)(n.p,{children:"Negative indices and steps are OK too."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"$.users[-1:0:-2].name\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",metastring:'title="Example output"',children:'["Jane", "John"]\n'})}),"\n",(0,t.jsx)(n.h3,{id:"filters",children:"Filters"}),"\n",(0,t.jsxs)(n.p,{children:["Selectively include child nodes from the current selection using filters of the form ",(0,t.jsx)(n.code,{children:"[?<expression>]"}),". A filter expression can be:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["a Boolean expression using one of the comparison operators (",(0,t.jsx)(n.code,{children:"=="}),", ",(0,t.jsx)(n.code,{children:"!="}),", ",(0,t.jsx)(n.code,{children:"<"}),", ",(0,t.jsx)(n.code,{children:">"}),", ",(0,t.jsx)(n.code,{children:"<="})," and ",(0,t.jsx)(n.code,{children:">="}),"),"]}),"\n",(0,t.jsx)(n.li,{children:"an existence test on the result of a JSONPath query,"}),"\n",(0,t.jsx)(n.li,{children:"or the truthiness of some function calls, depending on the function's return type."}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"$.users[?@.admin]\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",metastring:'title="Example output"',children:'[\n  { "name": "John", "score": 86, "admin": true },\n  { "name": "Sally", "score": 84, "admin": false }\n]\n'})}),"\n",(0,t.jsx)(n.h3,{id:"filter-queries",children:"Filter queries"}),"\n",(0,t.jsxs)(n.p,{children:["Inside a filter expression, ",(0,t.jsx)(n.code,{children:"@"})," is the ",(0,t.jsx)(n.em,{children:"current node identifier"}),", starting a new JSONPath query with the current node at the root."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"$.users[?@.score > 85].name\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",metastring:'title="Example output"',children:'["Sue", "John"]\n'})}),"\n",(0,t.jsxs)(n.p,{children:["And the root node identifier (",(0,t.jsx)(n.code,{children:"$"}),") can be used to query from the target document root."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"$.users[?@.name == $.moderator]\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",metastring:'title="Example output"',children:'[\n  {\n    "name": "Sally",\n    "score": 84,\n    "admin": false\n  }\n]\n'})}),"\n",(0,t.jsxs)(n.p,{children:["Logical ",(0,t.jsx)(n.em,{children:"and"})," (",(0,t.jsx)(n.code,{children:"&&"}),") and ",(0,t.jsx)(n.em,{children:"or"})," (",(0,t.jsx)(n.code,{children:"||"}),") can be used to create more complex filters, and parentheses can be used to group terms."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"$.users[?@.score > 85 && @.score < 100].name\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",metastring:'title="Example output"',children:'["John"]\n'})}),"\n",(0,t.jsx)(n.h3,{id:"filter-functions",children:"Filter functions"}),"\n",(0,t.jsxs)(n.p,{children:["Filter expressions can include calls to predefined functions. For example, the ",(0,t.jsx)(n.a,{href:"/json-p3/guides/jsonpath-functions#match",children:(0,t.jsx)(n.code,{children:"match()"})})," function matches nodes against a regular expression, if that node is a string value."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"$.users[?match(@.name, 'S.*')].score\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",metastring:'title="Example output"',children:"[100, 84]\n"})}),"\n",(0,t.jsxs)(n.p,{children:["See ",(0,t.jsx)(n.a,{href:"/json-p3/guides/jsonpath-functions",children:"JSONPath Functions"})," for a description of all standard filter functions."]}),"\n",(0,t.jsx)(n.h3,{id:"lists",children:"Lists"}),"\n",(0,t.jsx)(n.p,{children:"Use a comma separated list of selectors enclosed in square brackets to apply multiple selectors and concatenate the results."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"$.users[1, 2].score\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",metastring:'title="Example output"',children:"[86, 94]\n"})}),"\n",(0,t.jsx)(n.p,{children:"Mixing selectors in a list of OK too."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"$.users[0, ?@.name == 'Sally', 'foo'].score\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",metastring:'title="Example output"',children:"[100, 84]\n"})}),"\n",(0,t.jsx)(n.h3,{id:"recursive-descent",children:"Recursive descent"}),"\n",(0,t.jsxs)(n.p,{children:["The recursive descent segment (",(0,t.jsx)(n.code,{children:"..[<selectors>]"}),") visits all nodes, recursively, beneath the current selection in the JSON document tree. There mst be at least one selector. In this example we use shorthand notation for a property name (",(0,t.jsx)(n.code,{children:"score"}),"), but a bracketed selector list is OK too."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"$..score\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",metastring:"title=Example output",children:"[100, 86, 84, 55]\n"})})]})}function h(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>l,a:()=>i});var t=s(7294);const r={},a=t.createContext(r);function i(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);