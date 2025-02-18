"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1640],{7531:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>o,contentTitle:()=>l,default:()=>h,frontMatter:()=>a,metadata:()=>r,toc:()=>i});const r=JSON.parse('{"id":"api/namespaces/jsonpath/classes/JSONPathSelector","title":"Class: abstract JSONPathSelector","description":"Defined in18","source":"@site/docs/api/namespaces/jsonpath/classes/JSONPathSelector.md","sourceDirName":"api/namespaces/jsonpath/classes","slug":"/api/namespaces/jsonpath/classes/JSONPathSelector","permalink":"/json-p3/api/namespaces/jsonpath/classes/JSONPathSelector","draft":false,"unlisted":false,"editUrl":"https://github.com/jg-rp/json-p3/tree/docs/docs/api/namespaces/jsonpath/classes/JSONPathSelector.md","tags":[],"version":"current","frontMatter":{},"sidebar":"API","previous":{"title":"JSONPathSegment","permalink":"/json-p3/api/namespaces/jsonpath/classes/JSONPathSegment"},"next":{"title":"JSONPathSyntaxError","permalink":"/json-p3/api/namespaces/jsonpath/classes/JSONPathSyntaxError"}}');var c=n(4848),t=n(8453);const a={},l="Class: abstract JSONPathSelector",o={},i=[{value:"Extended by",id:"extended-by",level:2},{value:"Constructors",id:"constructors",level:2},{value:"new JSONPathSelector()",id:"new-jsonpathselector",level:3},{value:"Parameters",id:"parameters",level:4},{value:"environment",id:"environment",level:5},{value:"token",id:"token",level:5},{value:"Returns",id:"returns",level:4},{value:"Properties",id:"properties",level:2},{value:"environment",id:"environment-1",level:3},{value:"token",id:"token-1",level:3},{value:"Methods",id:"methods",level:2},{value:"lazyResolve()",id:"lazyresolve",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"node",id:"node",level:5},{value:"Returns",id:"returns-1",level:4},{value:"resolve()",id:"resolve",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"node",id:"node-1",level:5},{value:"Returns",id:"returns-2",level:4},{value:"toString()",id:"tostring",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"options?",id:"options",level:5},{value:"Returns",id:"returns-3",level:4}];function d(e){const s={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",header:"header",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(s.header,{children:(0,c.jsxs)(s.h1,{id:"class-abstract-jsonpathselector",children:["Class: ",(0,c.jsx)(s.code,{children:"abstract"})," JSONPathSelector"]})}),"\n",(0,c.jsxs)(s.p,{children:["Defined in: ",(0,c.jsx)(s.a,{href:"https://github.com/jg-rp/json-p3/blob/0207bc78bc1eb591edc2afc990d3c9b63d992809/src/path/selectors.ts#L18",children:"src/path/selectors.ts:18"})]}),"\n",(0,c.jsx)(s.p,{children:"Base class for all JSONPath segments and selectors."}),"\n",(0,c.jsx)(s.h2,{id:"extended-by",children:"Extended by"}),"\n",(0,c.jsxs)(s.ul,{children:["\n",(0,c.jsx)(s.li,{children:(0,c.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/namespaces/selectors/classes/NameSelector",children:(0,c.jsx)(s.code,{children:"NameSelector"})})}),"\n",(0,c.jsx)(s.li,{children:(0,c.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/namespaces/selectors/classes/IndexSelector",children:(0,c.jsx)(s.code,{children:"IndexSelector"})})}),"\n",(0,c.jsx)(s.li,{children:(0,c.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/namespaces/selectors/classes/SliceSelector",children:(0,c.jsx)(s.code,{children:"SliceSelector"})})}),"\n",(0,c.jsx)(s.li,{children:(0,c.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/namespaces/selectors/classes/WildcardSelector",children:(0,c.jsx)(s.code,{children:"WildcardSelector"})})}),"\n",(0,c.jsx)(s.li,{children:(0,c.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/namespaces/selectors/classes/FilterSelector",children:(0,c.jsx)(s.code,{children:"FilterSelector"})})}),"\n"]}),"\n",(0,c.jsx)(s.h2,{id:"constructors",children:"Constructors"}),"\n",(0,c.jsx)(s.h3,{id:"new-jsonpathselector",children:"new JSONPathSelector()"}),"\n",(0,c.jsxs)(s.blockquote,{children:["\n",(0,c.jsxs)(s.p,{children:[(0,c.jsx)(s.strong,{children:"new JSONPathSelector"}),"(",(0,c.jsx)(s.code,{children:"environment"}),", ",(0,c.jsx)(s.code,{children:"token"}),"): ",(0,c.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathSelector",children:(0,c.jsx)(s.code,{children:"JSONPathSelector"})})]}),"\n"]}),"\n",(0,c.jsxs)(s.p,{children:["Defined in: ",(0,c.jsx)(s.a,{href:"https://github.com/jg-rp/json-p3/blob/0207bc78bc1eb591edc2afc990d3c9b63d992809/src/path/selectors.ts#L22",children:"src/path/selectors.ts:22"})]}),"\n",(0,c.jsx)(s.h4,{id:"parameters",children:"Parameters"}),"\n",(0,c.jsx)(s.h5,{id:"environment",children:"environment"}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathEnvironment",children:(0,c.jsx)(s.code,{children:"JSONPathEnvironment"})})}),"\n",(0,c.jsx)(s.h5,{id:"token",children:"token"}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/classes/Token",children:(0,c.jsx)(s.code,{children:"Token"})})}),"\n",(0,c.jsx)(s.p,{children:"The token at the start of this selector."}),"\n",(0,c.jsx)(s.h4,{id:"returns",children:"Returns"}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathSelector",children:(0,c.jsx)(s.code,{children:"JSONPathSelector"})})}),"\n",(0,c.jsx)(s.h2,{id:"properties",children:"Properties"}),"\n",(0,c.jsx)(s.h3,{id:"environment-1",children:"environment"}),"\n",(0,c.jsxs)(s.blockquote,{children:["\n",(0,c.jsxs)(s.p,{children:[(0,c.jsx)(s.code,{children:"readonly"})," ",(0,c.jsx)(s.strong,{children:"environment"}),": ",(0,c.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathEnvironment",children:(0,c.jsx)(s.code,{children:"JSONPathEnvironment"})})]}),"\n"]}),"\n",(0,c.jsxs)(s.p,{children:["Defined in: ",(0,c.jsx)(s.a,{href:"https://github.com/jg-rp/json-p3/blob/0207bc78bc1eb591edc2afc990d3c9b63d992809/src/path/selectors.ts#L23",children:"src/path/selectors.ts:23"})]}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)(s.h3,{id:"token-1",children:"token"}),"\n",(0,c.jsxs)(s.blockquote,{children:["\n",(0,c.jsxs)(s.p,{children:[(0,c.jsx)(s.code,{children:"readonly"})," ",(0,c.jsx)(s.strong,{children:"token"}),": ",(0,c.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/classes/Token",children:(0,c.jsx)(s.code,{children:"Token"})})]}),"\n"]}),"\n",(0,c.jsxs)(s.p,{children:["Defined in: ",(0,c.jsx)(s.a,{href:"https://github.com/jg-rp/json-p3/blob/0207bc78bc1eb591edc2afc990d3c9b63d992809/src/path/selectors.ts#L24",children:"src/path/selectors.ts:24"})]}),"\n",(0,c.jsx)(s.p,{children:"The token at the start of this selector."}),"\n",(0,c.jsx)(s.h2,{id:"methods",children:"Methods"}),"\n",(0,c.jsx)(s.h3,{id:"lazyresolve",children:"lazyResolve()"}),"\n",(0,c.jsxs)(s.blockquote,{children:["\n",(0,c.jsxs)(s.p,{children:[(0,c.jsx)(s.code,{children:"abstract"})," ",(0,c.jsx)(s.strong,{children:"lazyResolve"}),"(",(0,c.jsx)(s.code,{children:"node"}),"): ",(0,c.jsx)(s.code,{children:"Generator"}),"<",(0,c.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathNode",children:(0,c.jsx)(s.code,{children:"JSONPathNode"})}),">"]}),"\n"]}),"\n",(0,c.jsxs)(s.p,{children:["Defined in: ",(0,c.jsx)(s.a,{href:"https://github.com/jg-rp/json-p3/blob/0207bc78bc1eb591edc2afc990d3c9b63d992809/src/path/selectors.ts#L35",children:"src/path/selectors.ts:35"})]}),"\n",(0,c.jsx)(s.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,c.jsx)(s.h5,{id:"node",children:"node"}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathNode",children:(0,c.jsx)(s.code,{children:"JSONPathNode"})})}),"\n",(0,c.jsx)(s.p,{children:"Nodes matched by preceding selectors."}),"\n",(0,c.jsx)(s.h4,{id:"returns-1",children:"Returns"}),"\n",(0,c.jsxs)(s.p,{children:[(0,c.jsx)(s.code,{children:"Generator"}),"<",(0,c.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathNode",children:(0,c.jsx)(s.code,{children:"JSONPathNode"})}),">"]}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)(s.h3,{id:"resolve",children:"resolve()"}),"\n",(0,c.jsxs)(s.blockquote,{children:["\n",(0,c.jsxs)(s.p,{children:[(0,c.jsx)(s.code,{children:"abstract"})," ",(0,c.jsx)(s.strong,{children:"resolve"}),"(",(0,c.jsx)(s.code,{children:"node"}),"): ",(0,c.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathNode",children:(0,c.jsx)(s.code,{children:"JSONPathNode"})}),"[]"]}),"\n"]}),"\n",(0,c.jsxs)(s.p,{children:["Defined in: ",(0,c.jsx)(s.a,{href:"https://github.com/jg-rp/json-p3/blob/0207bc78bc1eb591edc2afc990d3c9b63d992809/src/path/selectors.ts#L30",children:"src/path/selectors.ts:30"})]}),"\n",(0,c.jsx)(s.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,c.jsx)(s.h5,{id:"node-1",children:"node"}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathNode",children:(0,c.jsx)(s.code,{children:"JSONPathNode"})})}),"\n",(0,c.jsx)(s.p,{children:"Nodes matched by preceding selectors."}),"\n",(0,c.jsx)(s.h4,{id:"returns-2",children:"Returns"}),"\n",(0,c.jsxs)(s.p,{children:[(0,c.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathNode",children:(0,c.jsx)(s.code,{children:"JSONPathNode"})}),"[]"]}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)(s.h3,{id:"tostring",children:"toString()"}),"\n",(0,c.jsxs)(s.blockquote,{children:["\n",(0,c.jsxs)(s.p,{children:[(0,c.jsx)(s.code,{children:"abstract"})," ",(0,c.jsx)(s.strong,{children:"toString"}),"(",(0,c.jsx)(s.code,{children:"options"}),"?): ",(0,c.jsx)(s.code,{children:"string"})]}),"\n"]}),"\n",(0,c.jsxs)(s.p,{children:["Defined in: ",(0,c.jsx)(s.a,{href:"https://github.com/jg-rp/json-p3/blob/0207bc78bc1eb591edc2afc990d3c9b63d992809/src/path/selectors.ts#L40",children:"src/path/selectors.ts:40"})]}),"\n",(0,c.jsx)(s.p,{children:"Return a canonical string representation of this selector."}),"\n",(0,c.jsx)(s.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,c.jsx)(s.h5,{id:"options",children:"options?"}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/type-aliases/SerializationOptions",children:(0,c.jsx)(s.code,{children:"SerializationOptions"})})}),"\n",(0,c.jsx)(s.h4,{id:"returns-3",children:"Returns"}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.code,{children:"string"})})]})}function h(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,c.jsx)(s,{...e,children:(0,c.jsx)(d,{...e})}):d(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>a,x:()=>l});var r=n(6540);const c={},t=r.createContext(c);function a(e){const s=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:a(e.components),r.createElement(t.Provider,{value:s},e.children)}}}]);