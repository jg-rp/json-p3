"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4589],{9276:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>d,contentTitle:()=>l,default:()=>c,frontMatter:()=>t,metadata:()=>h,toc:()=>o});var r=n(5893),i=n(1151);const t={id:"jsonpath.expressions.JSONPathQuery",title:"Class: JSONPathQuery",sidebar_label:"JSONPathQuery",custom_edit_url:null},l=void 0,h={id:"api/classes/jsonpath.expressions.JSONPathQuery",title:"Class: JSONPathQuery",description:"jsonpath.expressions.JSONPathQuery",source:"@site/docs/api/classes/jsonpath.expressions.JSONPathQuery.md",sourceDirName:"api/classes",slug:"/api/classes/jsonpath.expressions.JSONPathQuery",permalink:"/json-p3/api/classes/jsonpath.expressions.JSONPathQuery",draft:!1,unlisted:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"jsonpath.expressions.JSONPathQuery",title:"Class: JSONPathQuery",sidebar_label:"JSONPathQuery",custom_edit_url:null},sidebar:"API",previous:{title:"InfixExpression",permalink:"/json-p3/api/classes/jsonpath.expressions.InfixExpression"},next:{title:"LogicalExpression",permalink:"/json-p3/api/classes/jsonpath.expressions.LogicalExpression"}},d={},o=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Constructors",id:"constructors",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Overrides",id:"overrides",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties",level:2},{value:"path",id:"path",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"token",id:"token",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"Methods",id:"methods",level:2},{value:"evaluate",id:"evaluate",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"toString",id:"tostring",level:3},{value:"Returns",id:"returns-2",level:4},{value:"Inherited from",id:"inherited-from-2",level:4},{value:"Defined in",id:"defined-in-4",level:4}];function a(e){const s={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath",children:"jsonpath"}),".",(0,r.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath.expressions",children:"expressions"}),".JSONPathQuery"]}),"\n",(0,r.jsx)(s.p,{children:"Base class for relative and absolute JSONPath query expressions."}),"\n",(0,r.jsx)(s.h2,{id:"hierarchy",children:"Hierarchy"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:["\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.a,{href:"/json-p3/api/classes/jsonpath.expressions.FilterExpression",children:(0,r.jsx)(s.code,{children:"FilterExpression"})})}),"\n",(0,r.jsxs)(s.p,{children:["\u21b3 ",(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.code,{children:"JSONPathQuery"})})]}),"\n",(0,r.jsxs)(s.p,{children:["\u21b3\u21b3 ",(0,r.jsx)(s.a,{href:"/json-p3/api/classes/jsonpath.expressions.RelativeQuery",children:(0,r.jsx)(s.code,{children:"RelativeQuery"})})]}),"\n",(0,r.jsxs)(s.p,{children:["\u21b3\u21b3 ",(0,r.jsx)(s.a,{href:"/json-p3/api/classes/jsonpath.expressions.RootQuery",children:(0,r.jsx)(s.code,{children:"RootQuery"})})]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(s.h2,{id:"constructors",children:"Constructors"}),"\n",(0,r.jsx)(s.h3,{id:"constructor",children:"constructor"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"new JSONPathQuery"}),"(",(0,r.jsx)(s.code,{children:"token"}),", ",(0,r.jsx)(s.code,{children:"path"}),"): ",(0,r.jsx)(s.a,{href:"/json-p3/api/classes/jsonpath.expressions.JSONPathQuery",children:(0,r.jsx)(s.code,{children:"JSONPathQuery"})})]}),"\n",(0,r.jsx)(s.h4,{id:"parameters",children:"Parameters"}),"\n",(0,r.jsxs)(s.table,{children:[(0,r.jsx)(s.thead,{children:(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.th,{style:{textAlign:"left"},children:"Name"}),(0,r.jsx)(s.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,r.jsxs)(s.tbody,{children:[(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{style:{textAlign:"left"},children:(0,r.jsx)(s.code,{children:"token"})}),(0,r.jsx)(s.td,{style:{textAlign:"left"},children:(0,r.jsx)(s.a,{href:"/json-p3/api/classes/jsonpath.Token",children:(0,r.jsx)(s.code,{children:"Token"})})})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{style:{textAlign:"left"},children:(0,r.jsx)(s.code,{children:"path"})}),(0,r.jsx)(s.td,{style:{textAlign:"left"},children:(0,r.jsx)(s.a,{href:"/json-p3/api/classes/jsonpath.JSONPath",children:(0,r.jsx)(s.code,{children:"JSONPath"})})})]})]})]}),"\n",(0,r.jsx)(s.h4,{id:"returns",children:"Returns"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.a,{href:"/json-p3/api/classes/jsonpath.expressions.JSONPathQuery",children:(0,r.jsx)(s.code,{children:"JSONPathQuery"})})}),"\n",(0,r.jsx)(s.h4,{id:"overrides",children:"Overrides"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.a,{href:"/json-p3/api/classes/jsonpath.expressions.FilterExpression",children:"FilterExpression"}),".",(0,r.jsx)(s.a,{href:"/json-p3/api/classes/jsonpath.expressions.FilterExpression#constructor",children:"constructor"})]}),"\n",(0,r.jsx)(s.h4,{id:"defined-in",children:"Defined in"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.a,{href:"https://github.com/jg-rp/json-p3/blob/71983e1/src/path/expression.ts#L183",children:"src/path/expression.ts:183"})}),"\n",(0,r.jsx)(s.h2,{id:"properties",children:"Properties"}),"\n",(0,r.jsx)(s.h3,{id:"path",children:"path"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.code,{children:"Readonly"})," ",(0,r.jsx)(s.strong,{children:"path"}),": ",(0,r.jsx)(s.a,{href:"/json-p3/api/classes/jsonpath.JSONPath",children:(0,r.jsx)(s.code,{children:"JSONPath"})})]}),"\n",(0,r.jsx)(s.h4,{id:"defined-in-1",children:"Defined in"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.a,{href:"https://github.com/jg-rp/json-p3/blob/71983e1/src/path/expression.ts#L185",children:"src/path/expression.ts:185"})}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h3,{id:"token",children:"token"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.code,{children:"Readonly"})," ",(0,r.jsx)(s.strong,{children:"token"}),": ",(0,r.jsx)(s.a,{href:"/json-p3/api/classes/jsonpath.Token",children:(0,r.jsx)(s.code,{children:"Token"})})]}),"\n",(0,r.jsx)(s.h4,{id:"inherited-from",children:"Inherited from"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.a,{href:"/json-p3/api/classes/jsonpath.expressions.FilterExpression",children:"FilterExpression"}),".",(0,r.jsx)(s.a,{href:"/json-p3/api/classes/jsonpath.expressions.FilterExpression#token",children:"token"})]}),"\n",(0,r.jsx)(s.h4,{id:"defined-in-2",children:"Defined in"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.a,{href:"https://github.com/jg-rp/json-p3/blob/71983e1/src/path/expression.ts#L184",children:"src/path/expression.ts:184"})}),"\n",(0,r.jsx)(s.h2,{id:"methods",children:"Methods"}),"\n",(0,r.jsx)(s.h3,{id:"evaluate",children:"evaluate"}),"\n",(0,r.jsxs)(s.p,{children:["\u25b8 ",(0,r.jsx)(s.strong,{children:"evaluate"}),"(",(0,r.jsx)(s.code,{children:"context"}),"): ",(0,r.jsx)(s.code,{children:"unknown"})]}),"\n",(0,r.jsx)(s.p,{children:"Evaluate the filter expression in the given context."}),"\n",(0,r.jsx)(s.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,r.jsxs)(s.table,{children:[(0,r.jsx)(s.thead,{children:(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.th,{style:{textAlign:"left"},children:"Name"}),(0,r.jsx)(s.th,{style:{textAlign:"left"},children:"Type"}),(0,r.jsx)(s.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,r.jsx)(s.tbody,{children:(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{style:{textAlign:"left"},children:(0,r.jsx)(s.code,{children:"context"})}),(0,r.jsx)(s.td,{style:{textAlign:"left"},children:(0,r.jsx)(s.a,{href:"/json-p3/api/namespaces/jsonpath#filtercontext",children:(0,r.jsx)(s.code,{children:"FilterContext"})})}),(0,r.jsx)(s.td,{style:{textAlign:"left"},children:"Evaluation context."})]})})]}),"\n",(0,r.jsx)(s.h4,{id:"returns-1",children:"Returns"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"unknown"})}),"\n",(0,r.jsx)(s.h4,{id:"inherited-from-1",children:"Inherited from"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.a,{href:"/json-p3/api/classes/jsonpath.expressions.FilterExpression",children:"FilterExpression"}),".",(0,r.jsx)(s.a,{href:"/json-p3/api/classes/jsonpath.expressions.FilterExpression#evaluate",children:"evaluate"})]}),"\n",(0,r.jsx)(s.h4,{id:"defined-in-3",children:"Defined in"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.a,{href:"https://github.com/jg-rp/json-p3/blob/71983e1/src/path/expression.ts#L20",children:"src/path/expression.ts:20"})}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h3,{id:"tostring",children:"toString"}),"\n",(0,r.jsxs)(s.p,{children:["\u25b8 ",(0,r.jsx)(s.strong,{children:"toString"}),"(): ",(0,r.jsx)(s.code,{children:"string"})]}),"\n",(0,r.jsx)(s.p,{children:"Return a string representation of the expression."}),"\n",(0,r.jsx)(s.h4,{id:"returns-2",children:"Returns"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"string"})}),"\n",(0,r.jsx)(s.h4,{id:"inherited-from-2",children:"Inherited from"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.a,{href:"/json-p3/api/classes/jsonpath.expressions.FilterExpression",children:"FilterExpression"}),".",(0,r.jsx)(s.a,{href:"/json-p3/api/classes/jsonpath.expressions.FilterExpression#tostring",children:"toString"})]}),"\n",(0,r.jsx)(s.h4,{id:"defined-in-4",children:"Defined in"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.a,{href:"https://github.com/jg-rp/json-p3/blob/71983e1/src/path/expression.ts#L25",children:"src/path/expression.ts:25"})})]})}function c(e={}){const{wrapper:s}={...(0,i.a)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},1151:(e,s,n)=>{n.d(s,{Z:()=>h,a:()=>l});var r=n(7294);const i={},t=r.createContext(i);function l(e){const s=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function h(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),r.createElement(t.Provider,{value:s},e.children)}}}]);