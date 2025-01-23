"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8607],{5356:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>l,contentTitle:()=>c,default:()=>p,frontMatter:()=>t,metadata:()=>r,toc:()=>o});const r=JSON.parse('{"id":"api/namespaces/jsonpath/namespaces/expressions/classes/FilterQuery","title":"Class: abstract FilterQuery","description":"Defined in237","source":"@site/docs/api/namespaces/jsonpath/namespaces/expressions/classes/FilterQuery.md","sourceDirName":"api/namespaces/jsonpath/namespaces/expressions/classes","slug":"/api/namespaces/jsonpath/namespaces/expressions/classes/FilterQuery","permalink":"/json-p3/api/namespaces/jsonpath/namespaces/expressions/classes/FilterQuery","draft":false,"unlisted":false,"editUrl":"https://github.com/jg-rp/json-p3/tree/docs/docs/api/namespaces/jsonpath/namespaces/expressions/classes/FilterQuery.md","tags":[],"version":"current","frontMatter":{},"sidebar":"API","previous":{"title":"FilterExpressionLiteral","permalink":"/json-p3/api/namespaces/jsonpath/namespaces/expressions/classes/FilterExpressionLiteral"},"next":{"title":"FunctionExtension","permalink":"/json-p3/api/namespaces/jsonpath/namespaces/expressions/classes/FunctionExtension"}}');var i=n(4848),a=n(8453);const t={},c="Class: abstract FilterQuery",l={},o=[{value:"Extends",id:"extends",level:2},{value:"Extended by",id:"extended-by",level:2},{value:"Constructors",id:"constructors",level:2},{value:"new FilterQuery()",id:"new-filterquery",level:3},{value:"Parameters",id:"parameters",level:4},{value:"token",id:"token",level:5},{value:"path",id:"path",level:5},{value:"Returns",id:"returns",level:4},{value:"Overrides",id:"overrides",level:4},{value:"Properties",id:"properties",level:2},{value:"path",id:"path-1",level:3},{value:"token",id:"token-1",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"Methods",id:"methods",level:2},{value:"evaluate()",id:"evaluate",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"context",id:"context",level:5},{value:"Returns",id:"returns-1",level:4},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"toString()",id:"tostring",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"options?",id:"options",level:5},{value:"Returns",id:"returns-2",level:4},{value:"Inherited from",id:"inherited-from-2",level:4}];function d(e){const s={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",header:"header",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.header,{children:(0,i.jsxs)(s.h1,{id:"class-abstract-filterquery",children:["Class: ",(0,i.jsx)(s.code,{children:"abstract"})," FilterQuery"]})}),"\n",(0,i.jsxs)(s.p,{children:["Defined in: ",(0,i.jsx)(s.a,{href:"https://github.com/jg-rp/json-p3/blob/5f12cd1d7dd51bed57a8532a0d2fb319354b82f4/src/path/expression.ts#L237",children:"src/path/expression.ts:237"})]}),"\n",(0,i.jsx)(s.p,{children:"Base class for relative and absolute JSONPath query expressions."}),"\n",(0,i.jsx)(s.h2,{id:"extends",children:"Extends"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/namespaces/expressions/classes/FilterExpression",children:(0,i.jsx)(s.code,{children:"FilterExpression"})})}),"\n"]}),"\n",(0,i.jsx)(s.h2,{id:"extended-by",children:"Extended by"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/namespaces/expressions/classes/RelativeQuery",children:(0,i.jsx)(s.code,{children:"RelativeQuery"})})}),"\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/namespaces/expressions/classes/RootQuery",children:(0,i.jsx)(s.code,{children:"RootQuery"})})}),"\n"]}),"\n",(0,i.jsx)(s.h2,{id:"constructors",children:"Constructors"}),"\n",(0,i.jsx)(s.h3,{id:"new-filterquery",children:"new FilterQuery()"}),"\n",(0,i.jsxs)(s.blockquote,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"new FilterQuery"}),"(",(0,i.jsx)(s.code,{children:"token"}),", ",(0,i.jsx)(s.code,{children:"path"}),"): ",(0,i.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/namespaces/expressions/classes/FilterQuery",children:(0,i.jsx)(s.code,{children:"FilterQuery"})})]}),"\n"]}),"\n",(0,i.jsxs)(s.p,{children:["Defined in: ",(0,i.jsx)(s.a,{href:"https://github.com/jg-rp/json-p3/blob/5f12cd1d7dd51bed57a8532a0d2fb319354b82f4/src/path/expression.ts#L238",children:"src/path/expression.ts:238"})]}),"\n",(0,i.jsx)(s.h4,{id:"parameters",children:"Parameters"}),"\n",(0,i.jsx)(s.h5,{id:"token",children:"token"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/classes/Token",children:(0,i.jsx)(s.code,{children:"Token"})})}),"\n",(0,i.jsx)(s.h5,{id:"path",children:"path"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathQuery",children:(0,i.jsx)(s.code,{children:"JSONPathQuery"})})}),"\n",(0,i.jsx)(s.h4,{id:"returns",children:"Returns"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/namespaces/expressions/classes/FilterQuery",children:(0,i.jsx)(s.code,{children:"FilterQuery"})})}),"\n",(0,i.jsx)(s.h4,{id:"overrides",children:"Overrides"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/namespaces/expressions/classes/FilterExpression",children:(0,i.jsx)(s.code,{children:"FilterExpression"})}),".",(0,i.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/namespaces/expressions/classes/FilterExpression#constructors",children:(0,i.jsx)(s.code,{children:"constructor"})})]}),"\n",(0,i.jsx)(s.h2,{id:"properties",children:"Properties"}),"\n",(0,i.jsx)(s.h3,{id:"path-1",children:"path"}),"\n",(0,i.jsxs)(s.blockquote,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.code,{children:"readonly"})," ",(0,i.jsx)(s.strong,{children:"path"}),": ",(0,i.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/classes/JSONPathQuery",children:(0,i.jsx)(s.code,{children:"JSONPathQuery"})})]}),"\n"]}),"\n",(0,i.jsxs)(s.p,{children:["Defined in: ",(0,i.jsx)(s.a,{href:"https://github.com/jg-rp/json-p3/blob/5f12cd1d7dd51bed57a8532a0d2fb319354b82f4/src/path/expression.ts#L240",children:"src/path/expression.ts:240"})]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"token-1",children:"token"}),"\n",(0,i.jsxs)(s.blockquote,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.code,{children:"readonly"})," ",(0,i.jsx)(s.strong,{children:"token"}),": ",(0,i.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/classes/Token",children:(0,i.jsx)(s.code,{children:"Token"})})]}),"\n"]}),"\n",(0,i.jsxs)(s.p,{children:["Defined in: ",(0,i.jsx)(s.a,{href:"https://github.com/jg-rp/json-p3/blob/5f12cd1d7dd51bed57a8532a0d2fb319354b82f4/src/path/expression.ts#L239",children:"src/path/expression.ts:239"})]}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/namespaces/expressions/classes/FilterExpression",children:(0,i.jsx)(s.code,{children:"FilterExpression"})}),".",(0,i.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/namespaces/expressions/classes/FilterExpression#token-1",children:(0,i.jsx)(s.code,{children:"token"})})]}),"\n",(0,i.jsx)(s.h2,{id:"methods",children:"Methods"}),"\n",(0,i.jsx)(s.h3,{id:"evaluate",children:"evaluate()"}),"\n",(0,i.jsxs)(s.blockquote,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.code,{children:"abstract"})," ",(0,i.jsx)(s.strong,{children:"evaluate"}),"(",(0,i.jsx)(s.code,{children:"context"}),"): ",(0,i.jsx)(s.code,{children:"unknown"})]}),"\n"]}),"\n",(0,i.jsxs)(s.p,{children:["Defined in: ",(0,i.jsx)(s.a,{href:"https://github.com/jg-rp/json-p3/blob/5f12cd1d7dd51bed57a8532a0d2fb319354b82f4/src/path/expression.ts#L21",children:"src/path/expression.ts:21"})]}),"\n",(0,i.jsx)(s.p,{children:"Evaluate the filter expression in the given context."}),"\n",(0,i.jsx)(s.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,i.jsx)(s.h5,{id:"context",children:"context"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/type-aliases/FilterContext",children:(0,i.jsx)(s.code,{children:"FilterContext"})})}),"\n",(0,i.jsx)(s.p,{children:"Evaluation context."}),"\n",(0,i.jsx)(s.h4,{id:"returns-1",children:"Returns"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.code,{children:"unknown"})}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from-1",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/namespaces/expressions/classes/FilterExpression",children:(0,i.jsx)(s.code,{children:"FilterExpression"})}),".",(0,i.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/namespaces/expressions/classes/FilterExpression#evaluate",children:(0,i.jsx)(s.code,{children:"evaluate"})})]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"tostring",children:"toString()"}),"\n",(0,i.jsxs)(s.blockquote,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.code,{children:"abstract"})," ",(0,i.jsx)(s.strong,{children:"toString"}),"(",(0,i.jsx)(s.code,{children:"options"}),"?): ",(0,i.jsx)(s.code,{children:"string"})]}),"\n"]}),"\n",(0,i.jsxs)(s.p,{children:["Defined in: ",(0,i.jsx)(s.a,{href:"https://github.com/jg-rp/json-p3/blob/5f12cd1d7dd51bed57a8532a0d2fb319354b82f4/src/path/expression.ts#L26",children:"src/path/expression.ts:26"})]}),"\n",(0,i.jsx)(s.p,{children:"Return a string representation of the expression."}),"\n",(0,i.jsx)(s.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,i.jsx)(s.h5,{id:"options",children:"options?"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/type-aliases/SerializationOptions",children:(0,i.jsx)(s.code,{children:"SerializationOptions"})})}),"\n",(0,i.jsx)(s.h4,{id:"returns-2",children:"Returns"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.code,{children:"string"})}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from-2",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/namespaces/expressions/classes/FilterExpression",children:(0,i.jsx)(s.code,{children:"FilterExpression"})}),".",(0,i.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath/namespaces/expressions/classes/FilterExpression#tostring",children:(0,i.jsx)(s.code,{children:"toString"})})]})]})}function p(e={}){const{wrapper:s}={...(0,a.R)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>t,x:()=>c});var r=n(6540);const i={},a=r.createContext(i);function t(e){const s=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),r.createElement(a.Provider,{value:s},e.children)}}}]);