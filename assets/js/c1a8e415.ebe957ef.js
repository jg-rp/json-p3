"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2349],{1371:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>i,contentTitle:()=>l,default:()=>o,frontMatter:()=>c,metadata:()=>r,toc:()=>a});const r=JSON.parse('{"id":"guides/jsonpath-extra","title":"Extra JSONPath Syntax","description":"_New in version 1.3.0_","source":"@site/docs/guides/jsonpath-extra.md","sourceDirName":"guides","slug":"/guides/jsonpath-extra","permalink":"/json-p3/guides/jsonpath-extra","draft":false,"unlisted":false,"editUrl":"https://github.com/jg-rp/json-p3/tree/docs/docs/guides/jsonpath-extra.md","tags":[],"version":"current","frontMatter":{},"sidebar":"docsSidebar","previous":{"title":"JSONPath Query Syntax","permalink":"/json-p3/guides/jsonpath-syntax"},"next":{"title":"JSONPath Functions","permalink":"/json-p3/guides/jsonpath-functions"}}');var t=n(4848),d=n(8453);const c={},l="Extra JSONPath Syntax",i={},a=[{value:"Key selector",id:"key-selector",level:2},{value:"Syntax",id:"syntax",level:3},{value:"Examples",id:"examples",level:3},{value:"Keys selector",id:"keys-selector",level:2},{value:"Syntax",id:"syntax-1",level:3},{value:"Examples",id:"examples-1",level:3},{value:"Keys filter selector",id:"keys-filter-selector",level:2},{value:"Syntax",id:"syntax-2",level:3},{value:"Examples",id:"examples-2",level:3},{value:"Current key identifier",id:"current-key-identifier",level:2},{value:"Syntax",id:"syntax-3",level:3},{value:"Examples",id:"examples-3",level:3}];function h(e){const s={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,d.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.header,{children:(0,t.jsx)(s.h1,{id:"extra-jsonpath-syntax",children:"Extra JSONPath Syntax"})}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:(0,t.jsx)(s.em,{children:"New in version 1.3.0"})})}),"\n",(0,t.jsxs)(s.p,{children:["JSON P3 includes some extra, non-standard JSONPath syntax that is disabled by default. Setting the ",(0,t.jsx)(s.a,{href:"../api/namespaces/jsonpath/type-aliases/JSONPathEnvironmentOptions",children:(0,t.jsx)(s.code,{children:"strict"})})," option to ",(0,t.jsx)(s.code,{children:"false"})," when instantiating a ",(0,t.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathEnvironment",children:(0,t.jsx)(s.code,{children:"JSONPathEnvironment"})})," will enable all non-standard syntax."]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-javascript",children:'import { JSONPathEnvironment } from "json-p3";\n\nconst env = new JSONPathEnvironment({ strict: false });\nvalues = env.query("$.some.path", data).values();\n'})}),"\n",(0,t.jsxs)(s.admonition,{type:"warning",children:[(0,t.jsx)(s.p,{children:"Non-standard features are subject to change if:"}),(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"conflicting syntax is included in a future JSONPath standard or draft standard."}),"\n",(0,t.jsx)(s.li,{children:"an overwhelming consensus emerges from the JSONPath community that differs from our choices."}),"\n"]})]}),"\n",(0,t.jsxs)(s.p,{children:["The following definitions build on ",(0,t.jsx)(s.a,{href:"https://datatracker.ietf.org/doc/html/rfc9535",children:"RFC 9535"})," (",(0,t.jsx)(s.a,{href:"https://trustee.ietf.org/license-info",children:"license info"}),"), while trying to stay true to its JSONPath model. These non-standard selectors are known to break the definition of ",(0,t.jsx)(s.em,{children:"location"})," and ",(0,t.jsx)(s.em,{children:"children"})," from RFC 9535."]}),"\n",(0,t.jsx)(s.h2,{id:"key-selector",children:"Key selector"}),"\n",(0,t.jsxs)(s.p,{children:["The key selector ",(0,t.jsx)(s.code,{children:"~'<name>'"})," selects at most one name from an object member. It is syntactically similar to the standard ",(0,t.jsx)(s.a,{href:"https://datatracker.ietf.org/doc/html/rfc9535#name-name-selector",children:"name selector"}),", with the addition of a tilde (",(0,t.jsx)(s.code,{children:"~"}),") prefix."]}),"\n",(0,t.jsxs)(s.p,{children:["When applied to a JSON object, the key selector selects the ",(0,t.jsx)(s.em,{children:"name"})," from a name/value member, if such a member exists, or nothing if it does not exist. This complements the standard name selector, which select the ",(0,t.jsx)(s.em,{children:"value"})," from a name/value pair."]}),"\n",(0,t.jsx)(s.p,{children:"When applied to an array or primitive value, the key selector selects nothing."}),"\n",(0,t.jsxs)(s.p,{children:["Key selector strings must follow the same processing semantics as name selector strings, as described in ",(0,t.jsx)(s.a,{href:"https://datatracker.ietf.org/doc/html/rfc9535#section-2.3.1.2",children:"section 2.3.2.1"})," of RFC 9535."]}),"\n",(0,t.jsx)(s.admonition,{type:"info",children:(0,t.jsxs)(s.p,{children:["The key selector is introduced to facilitate valid normalized paths for nodes produced by the ",(0,t.jsx)(s.a,{href:"#keys-selector",children:"keys selector"})," and the ",(0,t.jsx)(s.a,{href:"#keys-filter-selector",children:"keys filter selector"}),". I don't expect it will be of much use elsewhere."]})}),"\n",(0,t.jsx)(s.h3,{id:"syntax",children:"Syntax"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{children:'selector             = name-selector /\n                       wildcard-selector /\n                       slice-selector /\n                       index-selector /\n                       filter-selector /\n                       key-selector /\n                       keys-selector /\n                       keys-filter-selector\n\nkey-selector         = "~" name-selector\n\nchild-segment        = bracketed-selection /\n                       ("."\n                        (wildcard-selector /\n                         member-name-shorthand /\n                         member-key-shorthand))\n\ndescendant-segment   = ".." (bracketed-selection /\n                             wildcard-selector /\n                             member-name-shorthand /\n                             member-key-shorthand)\n\nmember-key-shorthand = "~" name-first *name-char\n'})}),"\n",(0,t.jsx)(s.h3,{id:"examples",children:"Examples"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-json",metastring:'title="Example JSON document"',children:'{\n  "a": [{ "b": "x", "c": "z" }, { "b": "y" }]\n}\n'})}),"\n",(0,t.jsxs)(s.table,{children:[(0,t.jsx)(s.thead,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.th,{children:"Query"}),(0,t.jsx)(s.th,{children:"Result"}),(0,t.jsx)(s.th,{children:"Result Paths"}),(0,t.jsx)(s.th,{children:"Comment"})]})}),(0,t.jsxs)(s.tbody,{children:[(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"$.a[0].~c"})}),(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:'"c"'})}),(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"$['a'][0][~'c']"})}),(0,t.jsx)(s.td,{children:"Key of nested object"})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"$.a[1].~c"})}),(0,t.jsx)(s.td,{}),(0,t.jsx)(s.td,{}),(0,t.jsx)(s.td,{children:"Key does not exist"})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"$..[~'b']"})}),(0,t.jsxs)(s.td,{children:[(0,t.jsx)(s.code,{children:'"b"'})," ",(0,t.jsx)("br",{})," ",(0,t.jsx)(s.code,{children:'"b"'})]}),(0,t.jsxs)(s.td,{children:[(0,t.jsx)(s.code,{children:"$['a'][0][~'b']"})," ",(0,t.jsx)("br",{})," ",(0,t.jsx)(s.code,{children:"$['a'][1][~'b']"})]}),(0,t.jsx)(s.td,{children:"Descendant, single quoted key"})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:'$..[~"b"]'})}),(0,t.jsxs)(s.td,{children:[(0,t.jsx)(s.code,{children:'"b"'})," ",(0,t.jsx)("br",{})," ",(0,t.jsx)(s.code,{children:'"b"'})]}),(0,t.jsxs)(s.td,{children:[(0,t.jsx)(s.code,{children:"$['a'][0][~'b']"})," ",(0,t.jsx)("br",{})," ",(0,t.jsx)(s.code,{children:"$['a'][1][~'b']"})]}),(0,t.jsx)(s.td,{children:"Descendant, double quoted key"})]})]})]}),"\n",(0,t.jsx)(s.h2,{id:"keys-selector",children:"Keys selector"}),"\n",(0,t.jsxs)(s.p,{children:["The keys selector (",(0,t.jsx)(s.code,{children:"~"}),") selects all names from an object\u2019s name/value members. This complements the standard ",(0,t.jsx)(s.a,{href:"https://datatracker.ietf.org/doc/html/rfc9535#name-wildcard-selector",children:"wildcard selector"}),", which selects all values from an object\u2019s name/value pairs."]}),"\n",(0,t.jsx)(s.p,{children:"As with the wildcard selector, the order of nodes resulting from a keys selector is not stipulated."}),"\n",(0,t.jsx)(s.p,{children:"When applied to an array or primitive value, the keys selector selects nothing."}),"\n",(0,t.jsxs)(s.p,{children:["The normalized path of a node selected using the keys selector uses ",(0,t.jsx)(s.a,{href:"#key-selector",children:"key selector"})," syntax."]}),"\n",(0,t.jsx)(s.h3,{id:"syntax-1",children:"Syntax"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{children:'keys-selector       = "~"\n'})}),"\n",(0,t.jsx)(s.h3,{id:"examples-1",children:"Examples"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-json",metastring:'title="Example JSON document"',children:'{\n  "a": [{ "b": "x", "c": "z" }, { "b": "y" }]\n}\n'})}),"\n",(0,t.jsxs)(s.table,{children:[(0,t.jsx)(s.thead,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.th,{children:"Query"}),(0,t.jsx)(s.th,{children:"Result"}),(0,t.jsx)(s.th,{children:"Result Paths"}),(0,t.jsx)(s.th,{children:"Comment"})]})}),(0,t.jsxs)(s.tbody,{children:[(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"$.a[0].~"})}),(0,t.jsxs)(s.td,{children:[(0,t.jsx)(s.code,{children:'"b"'})," ",(0,t.jsx)("br",{})," ",(0,t.jsx)(s.code,{children:'"c"'})]}),(0,t.jsxs)(s.td,{children:[(0,t.jsx)(s.code,{children:"$['a'][0][~'b']"})," ",(0,t.jsx)("br",{})," ",(0,t.jsx)(s.code,{children:"$['a'][0][~'c']"})]}),(0,t.jsx)(s.td,{children:"Object keys"})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"$.a.~"})}),(0,t.jsx)(s.td,{}),(0,t.jsx)(s.td,{}),(0,t.jsx)(s.td,{children:"Array keys"})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"$.a[0][~, ~]"})}),(0,t.jsxs)(s.td,{children:[(0,t.jsx)(s.code,{children:'"b"'})," ",(0,t.jsx)("br",{})," ",(0,t.jsx)(s.code,{children:'"c"'})," ",(0,t.jsx)("br",{})," ",(0,t.jsx)(s.code,{children:'"c"'})," ",(0,t.jsx)("br",{})," ",(0,t.jsx)(s.code,{children:'"b"'})]}),(0,t.jsxs)(s.td,{children:[(0,t.jsx)(s.code,{children:"$['a'][0][~'b']"})," ",(0,t.jsx)("br",{})," ",(0,t.jsx)(s.code,{children:"$['a'][0][~'c']"})," ",(0,t.jsx)("br",{})," ",(0,t.jsx)(s.code,{children:"$['a'][0][~'c']"})," ",(0,t.jsx)("br",{})," ",(0,t.jsx)(s.code,{children:"$['a'][0][~'b']"})]}),(0,t.jsx)(s.td,{children:"Non-deterministic ordering"})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"$..[~]"})}),(0,t.jsxs)(s.td,{children:[(0,t.jsx)(s.code,{children:'"a"'})," ",(0,t.jsx)("br",{})," ",(0,t.jsx)(s.code,{children:'"b"'})," ",(0,t.jsx)("br",{})," ",(0,t.jsx)(s.code,{children:'"c"'})," ",(0,t.jsx)("br",{})," ",(0,t.jsx)(s.code,{children:'"b"'})]}),(0,t.jsxs)(s.td,{children:[(0,t.jsx)(s.code,{children:"$[~'a']"})," ",(0,t.jsx)("br",{})," ",(0,t.jsx)(s.code,{children:"$['a'][0][~'b']"})," ",(0,t.jsx)("br",{})," ",(0,t.jsx)(s.code,{children:"$['a'][0][~'c']"})," ",(0,t.jsx)("br",{})," ",(0,t.jsx)(s.code,{children:"$['a'][1][~'b']"})]}),(0,t.jsx)(s.td,{children:"Descendant keys"})]})]})]}),"\n",(0,t.jsx)(s.h2,{id:"keys-filter-selector",children:"Keys filter selector"}),"\n",(0,t.jsxs)(s.p,{children:["The keys filter selector selects names from an object\u2019s name/value members. It is syntactically similar to the standard ",(0,t.jsx)(s.a,{href:"https://datatracker.ietf.org/doc/html/rfc9535#name-filter-selector",children:"filter selector"}),", with the addition of a tilde (",(0,t.jsx)(s.code,{children:"~"}),") prefix."]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{children:"~?<logical-expr>\n"})}),"\n",(0,t.jsxs)(s.p,{children:["Whereas the standard filter selector will produce a node for each ",(0,t.jsx)(s.em,{children:"value"})," from an object\u2019s name/value members - when its expression evaluates to logical true - the keys filter selector produces a node for each ",(0,t.jsx)(s.em,{children:"name"})," in an object\u2019s name/value members."]}),"\n",(0,t.jsxs)(s.p,{children:["Logical expression syntax and semantics otherwise match that of the standard filter selector. ",(0,t.jsx)(s.code,{children:"@"})," still refers to the current member value. See also the ",(0,t.jsx)(s.a,{href:"#current-key-identifier",children:"current key identifier"}),"."]}),"\n",(0,t.jsx)(s.p,{children:"When applied to an array or primitive value, the keys filter selector selects nothing."}),"\n",(0,t.jsxs)(s.p,{children:["The normalized path of a node selected using the keys filter selector uses ",(0,t.jsx)(s.a,{href:"#key-selector",children:"key selector"})," syntax."]}),"\n",(0,t.jsx)(s.h3,{id:"syntax-2",children:"Syntax"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{children:'filter-selector     = "~?" S logical-expr\n'})}),"\n",(0,t.jsx)(s.h3,{id:"examples-2",children:"Examples"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-json",metastring:'title="Example JSON document"',children:'[{ "a": [1, 2, 3], "b": [4, 5] }, { "c": { "x": [1, 2] } }, { "d": [1, 2, 3] }]\n'})}),"\n",(0,t.jsxs)(s.table,{children:[(0,t.jsx)(s.thead,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.th,{children:"Query"}),(0,t.jsx)(s.th,{children:"Result"}),(0,t.jsx)(s.th,{children:"Result Paths"}),(0,t.jsx)(s.th,{children:"Comment"})]})}),(0,t.jsxs)(s.tbody,{children:[(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"$.*[~?length(@) > 2]"})}),(0,t.jsxs)(s.td,{children:[(0,t.jsx)(s.code,{children:'"a"'})," ",(0,t.jsx)("br",{})," ",(0,t.jsx)(s.code,{children:'"d"'})]}),(0,t.jsxs)(s.td,{children:[(0,t.jsx)(s.code,{children:"$[0][~'a']"})," ",(0,t.jsx)("br",{})," ",(0,t.jsx)(s.code,{children:"$[2][~'d']"})]}),(0,t.jsx)(s.td,{children:"Conditionally select object keys"})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"$.*[~?@.x]"})}),(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:'"c"'})}),(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"$[1][~'c']"})}),(0,t.jsx)(s.td,{children:"Existence test"})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"$[~?(true == true)]"})}),(0,t.jsx)(s.td,{}),(0,t.jsx)(s.td,{}),(0,t.jsx)(s.td,{children:"Keys from an array"})]})]})]}),"\n",(0,t.jsx)(s.h2,{id:"current-key-identifier",children:"Current key identifier"}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.code,{children:"#"})," is the ",(0,t.jsx)(s.em,{children:"current key"})," identifier. ",(0,t.jsx)(s.code,{children:"#"})," will be the name of the current object member, or index of the current array element. This complements the current node identifier (",(0,t.jsx)(s.code,{children:"@"}),"), which refers to a member value or array element, respectively."]}),"\n",(0,t.jsx)(s.p,{children:"It is a syntax error to follow the current key identifier with segments, as if it were a filter query."}),"\n",(0,t.jsxs)(s.p,{children:["When used as an argument to a function, the current key is of ",(0,t.jsx)(s.code,{children:"ValueType"}),", and outside a function call it must be compared."]}),"\n",(0,t.jsx)(s.h3,{id:"syntax-3",children:"Syntax"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{children:'comparable             = literal /\n                         singular-query / ; singular query value\n                         function-expr  / ; ValueType\n                         current-key-identifier\n\n\nfunction-argument      = literal /\n                         filter-query / ; (includes singular-query)\n                         logical-expr /\n                         function-expr /\n                         current-key-identifier\n\ncurrent-key-identifier = "#"\n'})}),"\n",(0,t.jsx)(s.h3,{id:"examples-3",children:"Examples"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-json",metastring:'title="Example JSON document"',children:'{ "abc": [1, 2, 3], "def": [4, 5], "abx": [6], "aby": [] }\n'})}),"\n",(0,t.jsxs)(s.table,{children:[(0,t.jsx)(s.thead,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.th,{children:"Query"}),(0,t.jsx)(s.th,{children:"Result"}),(0,t.jsx)(s.th,{children:"Result Path"}),(0,t.jsx)(s.th,{children:"Comment"})]})}),(0,t.jsxs)(s.tbody,{children:[(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"$[?match(#, '^ab.*') && length(@) > 0 ]"})}),(0,t.jsxs)(s.td,{children:[(0,t.jsx)(s.code,{children:"[1,2,3]"})," ",(0,t.jsx)("br",{})," ",(0,t.jsx)(s.code,{children:"[6]"})]}),(0,t.jsxs)(s.td,{children:[(0,t.jsx)(s.code,{children:"$['abc']"})," ",(0,t.jsx)("br",{})," ",(0,t.jsx)(s.code,{children:"$['abx']"})]}),(0,t.jsx)(s.td,{children:"Match on object names"})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"$.abc[?(# >= 1)]"})}),(0,t.jsxs)(s.td,{children:[(0,t.jsx)(s.code,{children:"2"})," ",(0,t.jsx)("br",{})," ",(0,t.jsx)(s.code,{children:"3"})]}),(0,t.jsxs)(s.td,{children:[(0,t.jsx)(s.code,{children:"$['abc'][1]"})," ",(0,t.jsx)("br",{})," ",(0,t.jsx)(s.code,{children:"$['abc'][2]"})]}),(0,t.jsx)(s.td,{children:"Compare current array index"})]})]})]})]})}function o(e={}){const{wrapper:s}={...(0,d.R)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>c,x:()=>l});var r=n(6540);const t={},d=r.createContext(t);function c(e){const s=r.useContext(d);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),r.createElement(d.Provider,{value:s},e.children)}}}]);