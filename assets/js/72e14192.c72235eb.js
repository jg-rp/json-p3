"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2814],{795:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>t,metadata:()=>a,toc:()=>l});const a=JSON.parse('{"id":"quick-start","title":"Quick start","description":"This page gets you started using JSONPath, JSON Pointer and JSON Patch with JavaScript. See JSONPath Syntax for an introduction to JSONPath syntax.","source":"@site/docs/quick-start.md","sourceDirName":".","slug":"/quick-start","permalink":"/json-p3/quick-start","draft":false,"unlisted":false,"editUrl":"https://github.com/jg-rp/json-p3/tree/docs/docs/quick-start.md","tags":[],"version":"current","frontMatter":{},"sidebar":"docsSidebar","previous":{"title":"Introduction","permalink":"/json-p3/"},"next":{"title":"JSONPath Query Syntax","permalink":"/json-p3/guides/jsonpath-syntax"}}');var o=s(4848),r=s(8453);const t={},i="Quick start",c={},l=[{value:"JSONPath",id:"jsonpath",level:2},{value:"Normalized paths",id:"normalized-paths",level:3},{value:"Locations",id:"locations",level:3},{value:"Iterating node lists",id:"iterating-node-lists",level:3},{value:"Lazy queries",id:"lazy-queries",level:3},{value:"Compilation",id:"compilation",level:3},{value:"Query serialization",id:"query-serialization",level:3},{value:"JSON Pointer",id:"json-pointer",level:2},{value:"Errors and fallbacks",id:"errors-and-fallbacks",level:3},{value:"Relative JSON Pointers",id:"relative-json-pointers",level:3},{value:"JSON Patch",id:"json-patch",level:2},{value:"JSONPatch constructor",id:"jsonpatch-constructor",level:3},{value:"Builder API",id:"builder-api",level:3}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"quick-start",children:"Quick start"})}),"\n",(0,o.jsxs)(n.p,{children:["This page gets you started using JSONPath, JSON Pointer and JSON Patch with JavaScript. See ",(0,o.jsx)(n.a,{href:"/json-p3/guides/jsonpath-syntax",children:"JSONPath Syntax"})," for an introduction to JSONPath syntax."]}),"\n",(0,o.jsx)(n.h2,{id:"jsonpath",children:"JSONPath"}),"\n",(0,o.jsxs)(n.p,{children:["Find all values matching a JSONPath query with ",(0,o.jsx)(n.a,{href:"/json-p3/api/globals#query",children:(0,o.jsx)(n.code,{children:"jsonpath.query()"})}),". It takes a string (the query) and some data to apply the query to. It always returns an instance of ",(0,o.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathNodeList",children:(0,o.jsx)(n.code,{children:"JSONPathNodeList"})}),". Use ",(0,o.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathNodeList#values",children:(0,o.jsx)(n.code,{children:"JSONPathNodeList.values()"})})," to get an array of values matching the query."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-javascript",children:'import { jsonpath } from "json-p3";\n\nconst data = {\n  users: [\n    { name: "Sue", score: 100 },\n    { name: "John", score: 86 },\n    { name: "Sally", score: 84 },\n    { name: "Jane", score: 55 },\n  ],\n};\n\nconst nodes = jsonpath.query("$.users[?@.score < 100].name", data);\nconsole.log(nodes.values()); // [ \'John\', \'Sally\', \'Jane\' ]\n'})}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"query()"})," is re-exported to JSON P3's top-level namespace, so you could do the following instead."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-javascript",children:'import { query } from "json-p3";\n\nconst data = {\n  users: [\n    { name: "Sue", score: 100 },\n    { name: "John", score: 86 },\n    { name: "Sally", score: 84 },\n    { name: "Jane", score: 55 },\n  ],\n};\n\nconst nodes = query("$.users[?@.score < 100].name", data);\nconsole.log(nodes.values()); // [ \'John\', \'Sally\', \'Jane\' ]\n'})}),"\n",(0,o.jsxs)(n.p,{children:["A ",(0,o.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathNodeList",children:(0,o.jsx)(n.code,{children:"JSONPathNodeList"})})," is a list of ",(0,o.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathNode",children:(0,o.jsx)(n.code,{children:"JSONPathNode"})})," objects, one for each value in the target document matching the query. Each node has a:"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"value"})," - The value found in the target JSON document. This could be an array, object or primitive value."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"location"})," - An array of property names and array indices that were required to reach the node's value in the target JSON document."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"path"})," - The normalized JSONPath to this node in the target JSON document."]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"normalized-paths",children:"Normalized paths"}),"\n",(0,o.jsxs)(n.p,{children:["A normalized path is one that uniquely identifies the node's value within the target document. Use ",(0,o.jsx)(n.code,{children:"JSONPathNodeList.paths()"})," to retrieve all paths from a node list."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-javascript",children:"// .. continued from above\nconsole.log(nodes.paths());\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-plain",metastring:'title="output"',children:"[\n  \"$['users']['1']['name']\",\n  \"$['users']['2']['name']\",\n  \"$['users']['3']['name']\"\n]\n"})}),"\n",(0,o.jsx)(n.h3,{id:"locations",children:"Locations"}),"\n",(0,o.jsxs)(n.p,{children:["Use ",(0,o.jsx)(n.code,{children:"JSONPathNodeList.locations()"})," to get an array of locations for each node in the list."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-javascript",children:"// .. continued from above\nconsole.log(nodes.locations());\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-plain",metastring:'title="output"',children:"[\n  [ 'users', 1, 'name' ],\n  [ 'users', 2, 'name' ],\n  [ 'users', 3, 'name' ]\n]\n"})}),"\n",(0,o.jsx)(n.h3,{id:"iterating-node-lists",children:"Iterating node lists"}),"\n",(0,o.jsx)(n.p,{children:"Node lists are iterable too."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-javascript",children:"// .. continued from above\nfor (const node of nodes) {\n  console.log(`${node.value} @ ${node.path}`);\n}\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-plain",metastring:'title="output"',children:"John @ $['users'][1]['name']\nSally @ $['users'][2]['name']\nJane @ $['users'][3]['name']\n"})}),"\n",(0,o.jsx)(n.h3,{id:"lazy-queries",children:"Lazy queries"}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.a,{href:"/json-p3/api/globals#lazyquery",children:(0,o.jsx)(n.code,{children:"lazyQuery()"})})," is an alternative to ",(0,o.jsx)(n.code,{children:"query()"}),". ",(0,o.jsx)(n.code,{children:"lazyQuery()"})," can be faster and more memory efficient if querying large datasets, especially when using recursive descent selectors. Conversely, ",(0,o.jsx)(n.code,{children:"query()"})," is usually the better choice when working with small datasets."]}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"lazyQuery()"})," returns an iterable sequence of ",(0,o.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathNode",children:(0,o.jsx)(n.code,{children:"JSONPathNode"})})," objects which is not a ",(0,o.jsx)(n.code,{children:"JSONPathNodeList"}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-javascript",children:'import { lazyQuery } from "json-p3";\n\nconst data = {\n  users: [\n    { name: "Sue", score: 100 },\n    { name: "John", score: 86 },\n    { name: "Sally", score: 84 },\n    { name: "Jane", score: 55 },\n  ],\n};\n\nfor (const node of lazyQuery("$.users[?@.score < 100].name", data)) {\n  console.log(node.value);\n}\n\n// John\n// Sally\n// Jane\n'})}),"\n",(0,o.jsx)(n.h3,{id:"compilation",children:"Compilation"}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"query()"})," is a convenience function equivalent to ",(0,o.jsx)(n.code,{children:"new JSONPathEnvironment().compile(path).query(data)"}),". Use ",(0,o.jsx)(n.code,{children:"jsonpath.compile()"})," to construct a ",(0,o.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathQuery",children:(0,o.jsx)(n.code,{children:"JSONPathQuery"})})," object that can be applied to different data repeatedly."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-javascript",children:'import { jsonpath } from "json-p3";\n\nconst data = {\n  users: [\n    { name: "Sue", score: 100 },\n    { name: "John", score: 86 },\n    { name: "Sally", score: 84 },\n    { name: "Jane", score: 55 },\n  ],\n};\n\nconst path = jsonpath.compile("$.users[?@.score < 100].name");\nconst nodes = path.query(data);\nconsole.log(nodes.values()); // [ \'John\', \'Sally\', \'Jane\' ]\n'})}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"compile()"})," is also re-exported to JSON P3's top-level namespace."]}),"\n",(0,o.jsx)(n.h3,{id:"query-serialization",children:"Query serialization"}),"\n",(0,o.jsxs)(n.p,{children:["A ",(0,o.jsxs)(n.a,{href:"#compilation",children:["compiled ",(0,o.jsx)(n.code,{children:"JSONPathQuery"})]})," can be serialized back to a string using its ",(0,o.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathQuery#tostring",children:(0,o.jsx)(n.code,{children:"toString()"})})," method. As of version 2.1.0, the default string representation uses shorthand notation where possible and double quotes for names and string literals rather than single quotes."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-javascript",children:"import { jsonpath } from \"json-p3\";\n\nconst path = jsonpath.compile(\"$['users'][?@.score < 100]['name']\");\nconsole.log(path.toString()); // $.users[?@.score < 100].name\n"})}),"\n",(0,o.jsxs)(n.p,{children:["To serialize a ",(0,o.jsx)(n.code,{children:"JSONPathQuery"})," using the canonical bracket notation and single quotes, pass a ",(0,o.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpath/type-aliases/SerializationOptions",children:(0,o.jsx)(n.code,{children:"SerializationOptions"})})," object as an argument to ",(0,o.jsx)(n.code,{children:"toString()"}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-javascript",children:"import { jsonpath } from \"json-p3\";\n\nconst path = jsonpath.compile(\"$.users[?@.score < 100].name\");\nconsole.log(path.toString({ form: \"canonical\" })); $['users'][?@['score'] < 100]['name']\n"})}),"\n",(0,o.jsx)(n.h2,{id:"json-pointer",children:"JSON Pointer"}),"\n",(0,o.jsxs)(n.p,{children:["Resolve a JSON Pointer (",(0,o.jsx)(n.a,{href:"https://datatracker.ietf.org/doc/html/rfc6901",children:"RFC 6901"}),") against some data using ",(0,o.jsx)(n.code,{children:"jsonpointer.resolve()"}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-javascript",children:'import { jsonpointer } from "json-p3";\n\nconst data = {\n  users: [\n    { name: "Sue", score: 100 },\n    { name: "John", score: 86 },\n    { name: "Sally", score: 84 },\n    { name: "Jane", score: 55 },\n  ],\n};\n\nconst rv = jsonpointer.resolve("/users/1", data);\nconsole.log(rv); // { name: \'John\', score: 86 }\n'})}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"resolve()"})," is a convenience function equivalent to ",(0,o.jsx)(n.code,{children:"new JSONPointer(pointer).resolve(data)"}),". Use the ",(0,o.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpointer/classes/JSONPointer",children:(0,o.jsx)(n.code,{children:"JSONPointer"})})," constructor when you need to resolve the same pointer repeatedly against different data."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-javascript",children:'import { JSONPointer } from "json-p3";\n\nconst someData = {\n  users: [\n    { name: "Sue", score: 100 },\n    { name: "John", score: 86 },\n    { name: "Sally", score: 84 },\n  ],\n};\n\nconst otherData = {\n  users: [{ name: "Brian" }, { name: "Roy" }],\n};\n\nconst pointer = new JSONPointer("/users/1");\nconsole.log(pointer.resolve(someData)); // { name: \'John\', score: 86 }\nconsole.log(pointer.resolve(otherData)); // { name: \'Roy\' }\n'})}),"\n",(0,o.jsx)(n.h3,{id:"errors-and-fallbacks",children:"Errors and fallbacks"}),"\n",(0,o.jsxs)(n.p,{children:["If the pointer can't be resolved against the argument JSON value, one of ",(0,o.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpointer/classes/JSONPointerIndexError",children:(0,o.jsx)(n.code,{children:"JSONPointerIndexError"})}),", ",(0,o.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpointer/classes/JSONPointerKeyError",children:(0,o.jsx)(n.code,{children:"JSONPointerKeyError"})})," or ",(0,o.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpointer/classes/JSONPointerTypeError",children:(0,o.jsx)(n.code,{children:"JSONPointerTypeError"})})," is thrown. All three exceptions inherit from ",(0,o.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpointer/classes/JSONPointerResolutionError",children:(0,o.jsx)(n.code,{children:"JSONPointerResolutionError"})}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-javascript",children:'// .. continued from above\nconst rv = pointer.resolve("/users/1/age", data);\n// JSONPointerKeyError: no such property ("/users/1/age")\n'})}),"\n",(0,o.jsxs)(n.p,{children:["A fallback value can be given as a third argument, which will be returned in the event of a ",(0,o.jsx)(n.code,{children:"JSONPointerResolutionError"}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-javascript",children:'// .. continued from above\nconst rv = pointer.resolve("/users/1/age", data, -1);\nconsole.log(rv); // -1\n'})}),"\n",(0,o.jsx)(n.h3,{id:"relative-json-pointers",children:"Relative JSON Pointers"}),"\n",(0,o.jsxs)(n.p,{children:["We support ",(0,o.jsx)(n.a,{href:"https://datatracker.ietf.org/doc/html/draft-hha-relative-json-pointer",children:"Relative JSON Pointers"})," via the ",(0,o.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpointer/classes/JSONPointer#to",children:(0,o.jsx)(n.code,{children:"to(rel)"})})," method of ",(0,o.jsx)(n.code,{children:"JSONPointer"}),", where ",(0,o.jsx)(n.code,{children:"rel"})," is a relative JSON pointer string, and a new ",(0,o.jsx)(n.code,{children:"JSONPointer"})," is returned."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-javascript",children:'import { JSONPointer } from "json-p3";\n\nconst data = { foo: { bar: [1, 2, 3], baz: [4, 5, 6] } };\nconst pointer = new JSONPointer("/foo/bar/2");\n\nconsole.log(pointer.resolve(data)); // 3\nconsole.log(pointer.to("0-1").resolve(data)); // 2\nconsole.log(pointer.to("2/baz/2").resolve(data)); // 6\n'})}),"\n",(0,o.jsx)(n.h2,{id:"json-patch",children:"JSON Patch"}),"\n",(0,o.jsxs)(n.p,{children:["Apply a JSON Patch (",(0,o.jsx)(n.a,{href:"https://datatracker.ietf.org/doc/html/rfc6902",children:"RFC 6902"}),") to some data with ",(0,o.jsx)(n.code,{children:"jsonpatch.apply()"}),". ",(0,o.jsx)(n.strong,{children:"Data is modified in place."}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-javascript",children:'import { jsonpatch } from "json-p3";\n\nconst ops = [\n  { op: "add", path: "/some/foo", value: { foo: {} } },\n  { op: "add", path: "/some/foo", value: { bar: [] } },\n  { op: "copy", from: "/some/other", path: "/some/foo/else" },\n  { op: "add", path: "/some/foo/bar/-", value: 1 },\n];\n\nconst data = { some: { other: "thing" } };\njsonpatch.apply(ops, data);\nconsole.log(data);\n// { some: { other: \'thing\', foo: { bar: [Array], else: \'thing\' } } }\n'})}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"apply()"})," is also re-exported from JSON P3's top-level namespace."]}),"\n",(0,o.jsx)(n.h3,{id:"jsonpatch-constructor",children:"JSONPatch constructor"}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"jsonpatch.apply()"})," is a convenience function equivalent to ",(0,o.jsx)(n.code,{children:"new JSONPatch(ops).apply(data)"}),". Use the ",(0,o.jsx)(n.a,{href:"/json-p3/api/namespaces/jsonpatch/classes/JSONPatch",children:(0,o.jsx)(n.code,{children:"JSONPatch"})})," constructor when you need to apply the same patch to multiple different data structures."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-javascript",children:'import { JSONPatch } from "json-p3";\n\nconst patch = new JSONPatch([\n  { op: "add", path: "/some/foo", value: { foo: {} } },\n  { op: "add", path: "/some/foo", value: { bar: [] } },\n  { op: "copy", from: "/some/other", path: "/some/foo/else" },\n  { op: "add", path: "/some/foo/bar/-", value: 1 },\n]);\n\nconst data = { some: { other: "thing" } };\npatch.apply(data);\nconsole.log(data);\n// { some: { other: \'thing\', foo: { bar: [Array], else: \'thing\' } } }\n'})}),"\n",(0,o.jsx)(n.h3,{id:"builder-api",children:"Builder API"}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"JSONPatch"})," objects offer a builder interface for constructing JSON patch documents. We use strings as JSON Pointers in this example, but existing ",(0,o.jsx)(n.code,{children:"JSONPointer"})," objects are OK too."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-javascript",children:'import { JSONPatch } from "json-p3";\n\nconst data = { some: { other: "thing" } };\n\nconst patch = new JSONPatch()\n  .add("/some/foo", { foo: [] })\n  .add("/some/foo", { bar: [] })\n  .copy("/some/other", "/some/foo/else")\n  .copy("/some/foo/else", "/some/foo/bar/-");\n\npatch.apply(data);\nconsole.log(JSON.stringify(data, undefined, "  "));\n'})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-json",metastring:'title="output"',children:'{\n  "some": {\n    "other": "thing",\n    "foo": {\n      "bar": ["thing"],\n      "else": "thing"\n    }\n  }\n}\n'})})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>t,x:()=>i});var a=s(6540);const o={},r=a.createContext(o);function t(e){const n=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:t(e.components),a.createElement(r.Provider,{value:n},e.children)}}}]);