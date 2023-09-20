"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7239],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>h});var a=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,a,o=function(e,n){if(null==e)return{};var t,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var l=a.createContext({}),p=function(e){var n=a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},c=function(e){var n=p(e.components);return a.createElement(l.Provider,{value:n},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},m=a.forwardRef((function(e,n){var t=e.components,o=e.mdxType,r=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=p(t),m=o,h=u["".concat(l,".").concat(m)]||u[m]||d[m]||r;return t?a.createElement(h,s(s({ref:n},c),{},{components:t})):a.createElement(h,s({ref:n},c))}));function h(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var r=t.length,s=new Array(r);s[0]=m;var i={};for(var l in n)hasOwnProperty.call(n,l)&&(i[l]=n[l]);i.originalType=e,i[u]="string"==typeof e?e:o,s[1]=i;for(var p=2;p<r;p++)s[p]=t[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},4181:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>r,metadata:()=>i,toc:()=>p});var a=t(7462),o=(t(7294),t(3905));const r={},s="Quick start",i={unversionedId:"quick-start",id:"quick-start",title:"Quick start",description:"This page gets you started using JSONPath, JSON Pointer and JSON Patch with JavaScript. See JSONPath Syntax for an introduction to JSONPath syntax.",source:"@site/docs/quick-start.md",sourceDirName:".",slug:"/quick-start",permalink:"/json-p3/quick-start",draft:!1,editUrl:"https://github.com/jg-rp/json-p3/tree/docs/docs/quick-start.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"JSON P3",permalink:"/json-p3/"},next:{title:"JSONPath Query Syntax",permalink:"/json-p3/guides/jsonpath-syntax"}},l={},p=[{value:"JSONPath",id:"jsonpath",level:2},{value:"Normalized paths",id:"normalized-paths",level:3},{value:"Locations",id:"locations",level:3},{value:"Iterating node lists",id:"iterating-node-lists",level:3},{value:"Compilation",id:"compilation",level:3},{value:"JSON Pointer",id:"json-pointer",level:2},{value:"Errors and fallbacks",id:"errors-and-fallbacks",level:3},{value:"Relative JSON Pointers",id:"relative-json-pointers",level:3},{value:"JSON Patch",id:"json-patch",level:2},{value:"JSONPatch constructor",id:"jsonpatch-constructor",level:3},{value:"Builder API",id:"builder-api",level:3}],c={toc:p},u="wrapper";function d(e){let{components:n,...t}=e;return(0,o.kt)(u,(0,a.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"quick-start"},"Quick start"),(0,o.kt)("p",null,"This page gets you started using JSONPath, JSON Pointer and JSON Patch with JavaScript. See ",(0,o.kt)("a",{parentName:"p",href:"/json-p3/guides/jsonpath-syntax"},"JSONPath Syntax")," for an introduction to JSONPath syntax."),(0,o.kt)("h2",{id:"jsonpath"},"JSONPath"),(0,o.kt)("p",null,"Find all values matching a JSONPath query with ",(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/namespaces/jsonpath#query"},(0,o.kt)("inlineCode",{parentName:"a"},"jsonpath.query()")),". It takes a string (the query) and some data to apply the query to. It always returns an instance of ",(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPathNodeList"},(0,o.kt)("inlineCode",{parentName:"a"},"JSONPathNodeList")),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},'import { jsonpath } from "json-p3";\n\nconst data = {\n  users: [\n    { name: "Sue", score: 100 },\n    { name: "John", score: 86 },\n    { name: "Sally", score: 84 },\n    { name: "Jane", score: 55 },\n  ],\n};\n\nconst nodes = jsonpath.query("$.users[?@.score < 100].name", data);\nconsole.log(nodes.values()); // [ \'John\', \'Sally\', \'Jane\' ]\n')),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"query()")," is re-exported to JSON P3's top-level namespace, so you could do the following instead."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},'import { query } from "json-p3";\n\nconst data = {\n  users: [\n    { name: "Sue", score: 100 },\n    { name: "John", score: 86 },\n    { name: "Sally", score: 84 },\n    { name: "Jane", score: 55 },\n  ],\n};\n\nconst nodes = query("$.users[?@.score < 100].name", data);\nconsole.log(nodes.values()); // [ \'John\', \'Sally\', \'Jane\' ]\n')),(0,o.kt)("p",null,"A ",(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPathNodeList"},(0,o.kt)("inlineCode",{parentName:"a"},"JSONPathNodeList"))," is a list of ",(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPathNode"},(0,o.kt)("inlineCode",{parentName:"a"},"JSONPathNode"))," objects, one for each value in the target document matching the query. Each node has a:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"value")," - The value found in the target JSON document. This could be an array, object or primitive value."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"location")," - An array of property names and array indices that were required to reach the node's value in the target JSON document."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"path")," - The normalized JSONPath to this node in the target JSON document.")),(0,o.kt)("h3",{id:"normalized-paths"},"Normalized paths"),(0,o.kt)("p",null,"A normalized path is one that uniquely identifies the node's value within the target document. Use ",(0,o.kt)("inlineCode",{parentName:"p"},"JSONPathNodeList.paths()")," to retrieve all paths from a node list."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"// .. continued from above\nconsole.log(nodes.paths());\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-plain",metastring:'title="output"',title:'"output"'},"[\n  \"$['users']['1']['name']\",\n  \"$['users']['2']['name']\",\n  \"$['users']['3']['name']\"\n]\n")),(0,o.kt)("h3",{id:"locations"},"Locations"),(0,o.kt)("p",null,"Use ",(0,o.kt)("inlineCode",{parentName:"p"},"JSONPathNodeList.locations()")," to get an array of locations for each node in the list."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"// .. continued from above\nconsole.log(nodes.locations());\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-plain",metastring:'title="output"',title:'"output"'},"[\n  [ 'users', 1, 'name' ],\n  [ 'users', 2, 'name' ],\n  [ 'users', 3, 'name' ]\n]\n")),(0,o.kt)("h3",{id:"iterating-node-lists"},"Iterating node lists"),(0,o.kt)("p",null,"Node lists are iterable too."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"// .. continued from above\nfor (const node of nodes) {\n  console.log(`${node.value} @ ${node.path}`);\n}\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-plain",metastring:'title="output"',title:'"output"'},"John @ $['users'][1]['name']\nSally @ $['users'][2]['name']\nJane @ $['users'][3]['name']\n")),(0,o.kt)("h3",{id:"compilation"},"Compilation"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"query()")," is a convenience function equivalent to ",(0,o.kt)("inlineCode",{parentName:"p"},"new JSONPathEnvironment().compile(path).query(data)"),". Use ",(0,o.kt)("inlineCode",{parentName:"p"},"jsonpath.compile()")," to construct a ",(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpath.JSONPath"},(0,o.kt)("inlineCode",{parentName:"a"},"JSONPath"))," object that can be applied to different data repeatedly."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},'import { jsonpath } from "json-p3";\n\nconst data = {\n  users: [\n    { name: "Sue", score: 100 },\n    { name: "John", score: 86 },\n    { name: "Sally", score: 84 },\n    { name: "Jane", score: 55 },\n  ],\n};\n\nconst path = jsonpath.compile("$.users[?@.score < 100].name");\nconst nodes = path.query(data);\nconsole.log(nodes.values()); // [ \'John\', \'Sally\', \'Jane\' ]\n')),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"compile()")," is also re-exported to JSON P3's top-level namespace."),(0,o.kt)("h2",{id:"json-pointer"},"JSON Pointer"),(0,o.kt)("p",null,"Resolve a JSON Pointer (",(0,o.kt)("a",{parentName:"p",href:"https://datatracker.ietf.org/doc/html/rfc6901"},"RFC 6901"),") against some data using ",(0,o.kt)("inlineCode",{parentName:"p"},"jsonpointer.resolve()"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},'import { jsonpointer } from "json-p3";\n\nconst data = {\n  users: [\n    { name: "Sue", score: 100 },\n    { name: "John", score: 86 },\n    { name: "Sally", score: 84 },\n    { name: "Jane", score: 55 },\n  ],\n};\n\nconst rv = jsonpointer.resolve("/users/1", data);\nconsole.log(rv); // { name: \'John\', score: 86 }\n')),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"resolve()")," is a convenience function equivalent to ",(0,o.kt)("inlineCode",{parentName:"p"},"new JSONPointer(pointer).resolve(data)"),". Use the ",(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointer"},(0,o.kt)("inlineCode",{parentName:"a"},"JSONPointer"))," constructor when you need to resolve the same pointer repeatedly against different data."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},'import { JSONPointer } from "json-p3";\n\nconst someData = {\n  users: [\n    { name: "Sue", score: 100 },\n    { name: "John", score: 86 },\n    { name: "Sally", score: 84 },\n  ],\n};\n\nconst otherData = {\n  users: [{ name: "Brian" }, { name: "Roy" }],\n};\n\nconst pointer = new JSONPointer("/users/1");\nconsole.log(pointer.resolve(someData)); // { name: \'John\', score: 86 }\nconsole.log(pointer.resolve(otherData)); // { name: \'Roy\' }\n')),(0,o.kt)("h3",{id:"errors-and-fallbacks"},"Errors and fallbacks"),(0,o.kt)("p",null,"If the pointer can't be resolved against the argument JSON value, one of ",(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointerIndexError"},(0,o.kt)("inlineCode",{parentName:"a"},"JSONPointerIndexError")),", ",(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointerKeyError"},(0,o.kt)("inlineCode",{parentName:"a"},"JSONPointerKeyError"))," or ",(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointerTypeError"},(0,o.kt)("inlineCode",{parentName:"a"},"JSONPointerTypeError"))," is thrown. All three exceptions inherit from ",(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointerResolutionError"},(0,o.kt)("inlineCode",{parentName:"a"},"JSONPointerResolutionError")),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},'// .. continued from above\nconst rv = pointer.resolve("/users/1/age", data);\n// JSONPointerKeyError: no such property ("/users/1/age")\n')),(0,o.kt)("p",null,"A fallback value can be given as a third argument, which will be returned in the event of a ",(0,o.kt)("inlineCode",{parentName:"p"},"JSONPointerResolutionError"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},'// .. continued from above\nconst rv = pointer.resolve("/users/1/age", data, -1);\nconsole.log(rv); // -1\n')),(0,o.kt)("h3",{id:"relative-json-pointers"},"Relative JSON Pointers"),(0,o.kt)("p",null,"We support ",(0,o.kt)("a",{parentName:"p",href:"https://www.ietf.org/id/draft-hha-relative-json-pointer-00.html"},"Relative JSON Pointers")," via the ",(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpointer.JSONPointer#to"},(0,o.kt)("inlineCode",{parentName:"a"},"to(rel)"))," method of ",(0,o.kt)("inlineCode",{parentName:"p"},"JSONPointer"),", where ",(0,o.kt)("inlineCode",{parentName:"p"},"rel")," is a relative JSON pointer string, and a new ",(0,o.kt)("inlineCode",{parentName:"p"},"JSONPointer")," is returned."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},'import { JSONPointer } from "json-p3";\n\nconst data = { foo: { bar: [1, 2, 3], baz: [4, 5, 6] } };\nconst pointer = new JSONPointer("/foo/bar/2");\n\nconsole.log(pointer.resolve(data)); // 3\nconsole.log(pointer.to("0-1").resolve(data)); // 2\nconsole.log(pointer.to("2/baz/2").resolve(data)); // 6\n')),(0,o.kt)("h2",{id:"json-patch"},"JSON Patch"),(0,o.kt)("p",null,"Apply a JSON Patch (",(0,o.kt)("a",{parentName:"p",href:"https://datatracker.ietf.org/doc/html/rfc6902"},"RFC 6902"),") to some data with ",(0,o.kt)("inlineCode",{parentName:"p"},"jsonpatch.apply()"),". ",(0,o.kt)("strong",{parentName:"p"},"Data is modified in place."),"."),(0,o.kt)("h3",{id:"jsonpatch-constructor"},"JSONPatch constructor"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},'import { jsonpatch } from "json-p3";\n\nconst ops = [\n  { op: "add", path: "/some/foo", value: { foo: {} } },\n  { op: "add", path: "/some/foo", value: { bar: [] } },\n  { op: "copy", from: "/some/other", path: "/some/foo/else" },\n  { op: "add", path: "/some/foo/bar/-", value: 1 },\n];\n\nconst data = { some: { other: "thing" } };\njsonpatch.apply(ops, data);\nconsole.log(data);\n// { some: { other: \'thing\', foo: { bar: [Array], else: \'thing\' } } }\n')),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"apply()")," is a convenience function equivalent to ",(0,o.kt)("inlineCode",{parentName:"p"},"new JSONPatch(ops).apply(data)"),". Use the ",(0,o.kt)("a",{parentName:"p",href:"/json-p3/api/classes/jsonpatch.JSONPatch"},(0,o.kt)("inlineCode",{parentName:"a"},"JSONPatch"))," constructor when you need to apply the same patch to multiple different data structures."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},'import { JSONPatch } from "json-p3";\n\nconst patch = new JSONPatch([\n  { op: "add", path: "/some/foo", value: { foo: {} } },\n  { op: "add", path: "/some/foo", value: { bar: [] } },\n  { op: "copy", from: "/some/other", path: "/some/foo/else" },\n  { op: "add", path: "/some/foo/bar/-", value: 1 },\n]);\n\nconst data = { some: { other: "thing" } };\npatch.apply(data);\nconsole.log(data);\n// { some: { other: \'thing\', foo: { bar: [Array], else: \'thing\' } } }\n')),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"apply()")," is also re-exported from JSON P3's top-level namespace."),(0,o.kt)("h3",{id:"builder-api"},"Builder API"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"JSONPatch")," objects offer a builder interface for constructing JSON patch documents. We use strings as JSON Pointers in this example, but existing ",(0,o.kt)("inlineCode",{parentName:"p"},"JSONPointer")," objects are OK too."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},'import { JSONPatch } from "json-p3";\n\nconst data = { some: { other: "thing" } };\n\nconst patch = new JSONPatch()\n  .add("/some/foo", { foo: [] })\n  .add("/some/foo", { bar: [] })\n  .copy("/some/other", "/some/foo/else")\n  .copy("/some/foo/else", "/some/foo/bar/-");\n\npatch.apply(data);\nconsole.log(JSON.stringify(data, undefined, "  "));\n')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="output"',title:'"output"'},'{\n  "some": {\n    "other": "thing",\n    "foo": {\n      "bar": ["thing"],\n      "else": "thing"\n    }\n  }\n}\n')))}d.isMDXComponent=!0}}]);