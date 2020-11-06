(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{178:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(40),l=a.n(c),o=(a(56),a(6)),s=a.n(o),u=a(8),i=a(7),m=a(14),p=a(11);a(88);function d(e){if(!document.cookie)return null;var t=document.cookie.split(";").map((function(e){return e.trim()})).filter((function(t){return t.startsWith(e+"=")}));return 0===t.length?null:decodeURIComponent(t[0].split("=")[1])}function f(e,t,a){return b.apply(this,arguments)}function b(){return(b=Object(u.a)(s.a.mark((function e(t,a,n){var r,c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t,{method:n,mode:"same-origin",credentials:"include",headers:{Accept:"application/json","Content-Type":"application/json","X-CSRFToken":d("csrftoken")},body:JSON.stringify(a)});case 2:return r=e.sent,e.next=5,r.json();case 5:return c=e.sent,e.abrupt("return",c);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var E=a(25),g=r.a.createContext({}),v=g.Provider,h=g,x=a(179),y=a(180),k=a(181),w=a(76),j=a.n(w);a(57);function O(){var e=Object(E.a)(),t=e.handleSubmit,a=e.errors,c=e.register,l=e.watch,o=Object(n.useContext)(h).handleLogin,m=Object(n.useRef)(),p=Object(n.useState)({}),d=Object(i.a)(p,2),b=d[0],g=d[1],v=function(){var e=Object(u.a)(s.a.mark((function e(t){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(m.current.disabled=!0,!(t.username.length<=0||t.password.length<=0||t.confirm.length<=0||t.email.length<=0)){e.next=7;break}return m.current.disabled=!1,g({type:"danger",content:"Fill out all fields!"}),e.abrupt("return",!1);case 7:if(t.password===t.confirm){e.next=11;break}return m.current.disabled=!1,g({type:"danger",content:"Password and confirm fields must match!"}),e.abrupt("return",!1);case 11:return e.next=13,f("/knowledge/register",t,"POST");case 13:if(!(a=e.sent).errors){e.next=18;break}return m.current.disabled=!1,g({type:"danger",content:a.errors[Object.keys(a.errors)[0]]}),e.abrupt("return",!1);case 18:m.current.disabled=!1,o(a.username);case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement(x.a,{style:{margin:"15px"}},r.a.createElement(y.a,{md:"12"},r.a.createElement("h4",null,"Welcome! Register to interact with other users."),r.a.createElement("img",{src:j.a,alt:"Share online",style:{width:"40vw",padding:"20px"}})),r.a.createElement(y.a,{md:"12"},b.content&&r.a.createElement(k.a,{color:b.type,toggle:function(){return g({})}},b.content),r.a.createElement("form",{style:{padding:"10px",margin:"auto",maxWidth:"320px"},onSubmit:t(v)},r.a.createElement("input",{type:"text",placeholder:"Username",ref:c({required:!0}),className:"form-control input",name:"username","aria-label":"username"}),a.username&&r.a.createElement("p",{className:"error-message"},"Remember to fill out the username!"),r.a.createElement("input",{type:"email",placeholder:"Email",className:"form-control input",name:"email","aria-label":"email",ref:c({required:!0}),style:{marginTop:"10px",marginBottom:"10px"}}),a.email&&r.a.createElement("p",{className:"error-message"},"Remember to fill out the email!"),r.a.createElement("input",{type:"password",placeholder:"Password",className:"form-control input",name:"password","aria-label":"password",ref:c({required:!0,validate:function(e){return e===l("confirm")}}),style:{marginTop:"10px",marginBottom:"10px"}}),a.password&&r.a.createElement("p",{className:"error-message"},"required"===a.password.type?"Remember to fill out the password!":"Password and confirm fields must match!"),r.a.createElement("input",{type:"password",placeholder:"Confirm password",className:"form-control input",name:"confirm",ref:c({required:!0}),"aria-label":"confirm",style:{marginTop:"10px",marginBottom:"10px"}}),a.confirm&&r.a.createElement("p",{className:"error-message"},"Remember to fill out the confirm password!"),r.a.createElement("input",{type:"submit",value:"Register","aria-label":"register",ref:m,className:"btn btn-primary"}))))}var N=a(77),S=a.n(N);function C(){var e=Object(n.useState)({}),t=Object(i.a)(e,2),a=t[0],c=t[1],l=Object(n.useRef)(),o=Object(E.a)(),p=o.register,d=o.errors,b=o.handleSubmit,g=Object(n.useContext)(h).handleLogin,v=function(){var e=Object(u.a)(s.a.mark((function e(t){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(l.current.disabled=!0,!(t.username.length<=0||t.password.length<=0)){e.next=5;break}return c({type:"danger",content:"Fill out all fields!"}),l.current.disabled=!1,e.abrupt("return",!1);case 5:return e.next=7,f("/knowledge/login",t,"POST");case 7:if(!(a=e.sent).errors){e.next=12;break}return c({type:"danger",content:a.errors[Object.keys(a.errors)[0]]}),l.current.disabled=!1,e.abrupt("return",!1);case 12:l.current.disabled=!1,g(a.username);case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement(x.a,{style:{margin:"15px",height:"100%"}},r.a.createElement(y.a,{md:"12"},r.a.createElement("h4",null,"Welcome back! Login to start interacting with other users"),r.a.createElement("img",{src:S.a,alt:"login",style:{width:"50vw",padding:"20px"}})),r.a.createElement(y.a,{md:"12"},a.content&&r.a.createElement(k.a,{color:a.type,toggle:function(){return c({})}},a.content),r.a.createElement("form",{onSubmit:b(v),style:{margin:"auto",maxWidth:"320px",minWidth:"0px"}},r.a.createElement("input",{type:"text",placeholder:"Username",ref:p({required:!0}),className:"form-control input",name:"username","aria-label":"username"}),d.username&&r.a.createElement("p",{className:"error-message"},"Remember to fill out the username!"),r.a.createElement("input",{type:"password",placeholder:"Password",ref:p({required:!0}),className:"form-control input",name:"password","aria-label":"password"}),d.password&&r.a.createElement("p",{className:"error-message"},"Remember to fill out the password!"),r.a.createElement("input",{type:"submit",value:"Login",ref:l,"aria-label":"login",className:"btn btn-primary"}),r.a.createElement("footer",null,r.a.createElement("small",null,"Don't have an account? Register"," ",r.a.createElement(m.b,{to:"/register"},"here"))))))}var P=a(79),R=a(182),T=a(183),L=(a(62),a(20)),q=a(17);function I(){var e=Object(n.useContext)(h),t=e.handleLogin,a=e.loggedIn,c=function(){var e=Object(u.a)(s.a.mark((function e(){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/knowledge/logout");case 2:return a=e.sent,e.next=5,a.json();case 5:if(!e.sent.errors){e.next=9;break}return alert("An error has occured"),e.abrupt("return");case 9:t(null);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement(R.a,{vertical:!0,className:"navnav"},r.a.createElement("h3",null,"Share"),r.a.createElement("hr",null),r.a.createElement(T.a,null,r.a.createElement(m.b,{to:"/",className:"nav-link navnavlink"},r.a.createElement(L.a,{icon:q.c,className:"navnavitem"}),r.a.createElement("p",{className:"navnavtext"},"Home"))),a?r.a.createElement(r.a.Fragment,null,r.a.createElement(T.a,null,r.a.createElement(m.b,{to:"/new/post",className:"nav-link navnavlink"},r.a.createElement(L.a,{icon:q.e,className:"navnavitem"}),r.a.createElement("p",{className:"navnavtext"},"New post"))),r.a.createElement(T.a,null,r.a.createElement("button",{onClick:c,className:"navnavbutton navnavlink",style:{margin:"0px",width:"140.547px"}},r.a.createElement(L.a,{icon:q.g,className:"navnavitem"}),r.a.createElement("p",{className:"navnavtext"},"Logout")))):r.a.createElement(r.a.Fragment,null,r.a.createElement(T.a,null,r.a.createElement(m.b,{to:"/login",className:"nav-link navnavlink"},r.a.createElement(L.a,{icon:q.f,className:"navnavitem"}),r.a.createElement("p",{className:"navnavtext"},"Login"))),r.a.createElement(T.a,null,r.a.createElement(m.b,{to:"/register",className:"nav-link navnavlink"},r.a.createElement(L.a,{icon:q.i,className:"navnavitem"}),r.a.createElement("p",{className:"navnavtext"},"Register")))))}function W(e){var t=Object(n.useState)(!0),a=Object(i.a)(t,2),c=a[0],l=a[1],o=Object(n.useState)(localStorage.getItem("theme")),s=Object(i.a)(o,2),u=s[0],m=s[1];return Object(n.useEffect)((function(){localStorage.setItem("theme",u),document.documentElement.setAttribute("data-theme",u)}),[u]),r.a.createElement(P.a,{sidebar:r.a.createElement(I,null),open:!c,onSetOpen:function(){return l(!c)},styles:{sidebar:{backgroundColor:"#0bf1c0",zIndex:"101"},overlay:{backgroundColor:"rgb(0, 0, 0, 0.13)"}}},r.a.createElement("div",{className:"navnavbar"},r.a.createElement("button",{style:{padding:"0px "},onClick:function(){return l(!1)},className:"navnavbutton"},r.a.createElement(L.a,{icon:q.a})),r.a.createElement("button",{className:"theme navnavbutton",style:{padding:"0px "},onClick:function(){return m("dark"===u?"light":"dark")}},r.a.createElement(L.a,{className:"theme",icon:"dark"===u?q.h:q.d}))),e.children)}function A(){return r.a.createElement("div",{className:"footer-main-div"},r.a.createElement("h4",null,"Footer"))}var B=a(193),_=a(81),F=a(41),U=a.n(F),Y=a(184),z=a(185),J=a(186),H=a(187),M=a(188),D=a(29),X=a.n(D);a(39);function $(e){var t=e.comment,a=Object(n.useContext)(h).loggedIn,c=Object(n.useRef)(),l=Object(n.useState)(t.content),o=Object(i.a)(l,2),m=o[0],p=o[1],d=Object(n.useState)(!1),b=Object(i.a)(d,2),E=b[0],g=b[1],v=function(){var e=Object(u.a)(s.a.mark((function e(){var a,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!c.current){e.next=10;break}if(!((a=c.current.value).length>256)){e.next=5;break}return alert("Comment must be less than 256 characters long"),e.abrupt("return");case 5:return p(a),e.next=8,f("/knowledge/comment/".concat(t.id),{content:a},"PUT");case 8:(n=e.sent).errors&&alert(n.errors[Object.keys(n.errors)[0]]);case 10:g(!E);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement(Y.a,{style:{margin:"20px"}},r.a.createElement(z.a,{style:{backgroundColor:"rgb(203, 223, 230)",display:"inline-flex",justifyContent:"space-between"}},r.a.createElement("div",null,r.a.createElement("h4",null,"@",t.commenter.username),r.a.createElement(J.a,{className:"text-muted"},t.date)),t.commenter.username===a&&r.a.createElement("div",null,E&&r.a.createElement(H.a,{color:"danger",size:"sm",outline:!0,onClick:function(){return g(!1)}},"Cancel"),r.a.createElement(H.a,{color:"success",size:"sm",style:{marginLeft:"10px"},maxLength:"256",outline:!0,disabled:c.current&&c.current.length<1,onClick:function(){return v()}},E?"Save":"Edit"))),r.a.createElement(M.a,{style:{backgroundColor:"rgb(215, 245, 255)"}},E?r.a.createElement(X.a,{className:"edit-comment",ref:c},m):r.a.createElement(J.a,{tag:"pre"},r.a.createElement(U.a,null,m))))}function G(e){return r.a.createElement("div",null,e.comments.map((function(e){return r.a.createElement($,{key:e.id,comment:e})})))}var K=a(9),Q=a(189),V=a(190),Z=a(191);function ee(e){var t=Object(E.a)(),a=t.register,c=t.handleSubmit,l=t.reset,o=t.errors,m=Object(n.useState)({}),p=Object(i.a)(m,2),d=p[0],b=p[1],g=Object(n.useRef)(),v=function(){var t=Object(u.a)(s.a.mark((function t(a){var n,r;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(g.current.disabled=!0,!(a.content.length<1)){t.next=5;break}return b({type:"danger",content:"You must fill out the comment!"}),g.current.disabled=!1,t.abrupt("return");case 5:return n={content:a.content,post:e.post},t.next=8,f("/knowledge/comment",n,"POST");case 8:(r=t.sent).errors?b({type:"danger",content:r.errors[Object.keys(r.errors)[0]]}):(b({type:"success",content:"Comment posted successfully."}),l()),g.current.disabled=!1;try{e.setComments((function(e){return[r.comment].concat(Object(K.a)(e))}))}catch(c){console.log(c)}case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return r.a.createElement("div",null,d.content&&r.a.createElement(_.a,{color:d.type,toggle:function(){return b({})}},d.content),o.content&&r.a.createElement(k.a,{color:"danger"},"required"===o.content.type?"You must fill out the comment!":"Comment must be under 257 characters!"),r.a.createElement(Q.a,{onSubmit:c(v)},r.a.createElement(V.a,null,r.a.createElement(Z.a,{for:"content"},"Content"),r.a.createElement(X.a,{ref:a({required:!0,validate:function(e){return e.length<257}}),placeholder:"A valuable comment...",id:"content",name:"content","aria-label":"Comment content",className:"form-control"})),r.a.createElement("input",{type:"submit",value:"Share your comment",className:"btn btn-primary",ref:g})))}var te=a(192);function ae(e){var t=Object(n.useContext)(h).loggedIn,a=e.likes.map((function(e){return e.username})),c=function(){var t=Object(u.a)(s.a.mark((function t(){var a;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f("knowledge/post/".concat(e.uuid),{},"PUT");case 2:(a=t.sent).errors?alert("An error has occured. Try again later."):e.setLikes(a.likes);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return r.a.createElement("div",null,t&&r.a.createElement("button",{onClick:c,className:"like-button"},r.a.createElement(L.a,{icon:q.b,title:"like-icon",className:a.includes(t)?"dislike-icon":"like-icon"})),r.a.createElement(te.a,{pill:!0,color:"info"},e.likes.length))}function ne(){var e=Object(p.f)().uuid,t=Object(n.useState)({}),a=Object(i.a)(t,2),c=a[0],l=a[1],o=Object(n.useState)(),m=Object(i.a)(o,2),d=m[0],f=m[1],b=Object(n.useState)(c.comments),E=Object(i.a)(b,2),g=E[0],v=E[1],x=Object(n.useContext)(h).loggedIn;return Object(n.useEffect)((function(){(function(){var t=Object(u.a)(s.a.mark((function t(){var a,n;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("knowledge/post/".concat(e));case 2:return a=t.sent,t.next=5,a.json();case 5:n=t.sent,l(n),f(n.likes),v(n.comments);case 9:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()()}),[e]),c.content?r.a.createElement("div",{style:{padding:"10px"}},r.a.createElement("div",null,r.a.createElement("h6",null,c.poster.username),d&&r.a.createElement(ae,{setLikes:f,likes:d,uuid:c.uuid}),r.a.createElement("footer",{style:{fontSize:"12px"},className:"text-muted"},c.date),r.a.createElement("h2",{id:"post-title"},c.title)),r.a.createElement("hr",null),r.a.createElement("div",{style:{maxWidth:"1024px",margin:"auto"}},r.a.createElement("div",{id:"post-div"},r.a.createElement(U.a,null,c.content)),r.a.createElement("hr",null),x?r.a.createElement(ee,{post:c.id,setComments:v}):r.a.createElement(_.a,{color:"danger"},"You must be logged in to comment!"),r.a.createElement("hr",null),g&&r.a.createElement(G,{comments:g}))):r.a.createElement(B.a,{color:"primary"})}function re(){var e=Object(n.useState)(!1),t=Object(i.a)(e,2),a=t[0],c=t[1],l=Object(n.useRef)(),o=Object(E.a)(),m=o.register,d=o.handleSubmit,b=o.errors,g=Object(n.useState)({}),v=Object(i.a)(g,2),h=v[0],x=v[1],y=function(){var e=Object(u.a)(s.a.mark((function e(t){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l.current.disabled=!0,e.next=3,f("/knowledge/new/post",t,"POST");case 3:if(!(a=e.sent).errors){e.next=8;break}return l.current.disabled=!1,x({type:"danger",content:a.errors[Object.keys(a.errors)[0]]}),e.abrupt("return",!1);case 8:l.current.disabled=!0,c(!0);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return a?r.a.createElement(p.a,{to:"/"}):r.a.createElement("div",null,h.content&&r.a.createElement(_.a,{color:h.type,toggle:function(){return x({})}},h.content),r.a.createElement(Q.a,{style:{margin:"10px"},method:"POST",onSubmit:d(y)},r.a.createElement("h6",null,"In here you make a new post. The content will be rendered using markdown."," ",r.a.createElement("a",{href:"https://www.markdowntutorial.com/",target:"_blank",rel:"noopener noreferrer"},"What is markdown and how to use it.")),r.a.createElement(V.a,null,r.a.createElement(Z.a,{for:"title"},"Title: "),r.a.createElement("input",{type:"text","aria-label":"title",name:"title",id:"title",placeholder:"Title...",className:"form-control",ref:m({required:!0,validate:function(e){return e.length<65}})}),b.title&&r.a.createElement("p",{className:"error-message"},"required"===b.title.type?"You must provide a title!":"Title must be 64 characters at most!")),r.a.createElement(V.a,null,r.a.createElement(Z.a,{for:"content"},"Content: "),r.a.createElement(X.a,{type:"text","aria-label":"content",name:"content",id:"content",className:"form-control",placeholder:"Some good content...",ref:m({required:!0}),rows:20,maxLength:"2050"}),b.content&&r.a.createElement("p",{className:"error-message"},"You must provide some content!")),r.a.createElement("input",{type:"submit",value:"Create post",className:"btn btn-primary",ref:l})))}var ce=a(194),le=a(195),oe=a(196);function se(e){var t=e.post;return t?r.a.createElement(y.a,{md:"4",style:{marginBottom:"30px"}},r.a.createElement(Y.a,{style:{margin:"0px"}},r.a.createElement(z.a,{style:{backgroundColor:"#68d8ee"}},r.a.createElement(ce.a,null,r.a.createElement("h5",null,t.title)),r.a.createElement(le.a,null,"By: ",t.poster.username)),r.a.createElement(M.a,{className:"back-blue"},r.a.createElement(J.a,{className:"post-content"},t.content)),r.a.createElement(oe.a,{className:"footer back-blue"},r.a.createElement("p",{className:"card-link"},r.a.createElement(m.b,{to:"posts/".concat(t.uuid)},"See more")),r.a.createElement(J.a,{className:"text-muted"},t.date)))):r.a.createElement(B.a,{color:"primary"})}var ue=a(197);function ie(e){return r.a.createElement(ue.a,{style:{padding:"10px",width:"100%",justifyContent:"space-evenly"}},e.posts.results.map((function(e){return r.a.createElement(se,{post:e,key:e.id.toString()})})))}var me=a(201),pe=a(198),de=a(199),fe=a(200);function be(e){return r.a.createElement(pe.a,{style:{justifyContent:"center"}},r.a.createElement(de.a,{disabled:1===e.currentPage,key:"prev"},r.a.createElement(fe.a,{previous:!0,onClick:function(){return e.setCurrentPage(e.currentPage-1)}})),e.numRange.map((function(t){return r.a.createElement(de.a,{active:t===e.currentPage,key:t.toString()},r.a.createElement(fe.a,{onClick:function(){return e.setCurrentPage(t)}},t))})),r.a.createElement(de.a,{disabled:e.currentPage===e.numRange.slice(-1)[0],key:"next"},r.a.createElement(fe.a,{next:!0,onClick:function(){return e.setCurrentPage(e.currentPage+1)}})))}function Ee(){var e=Object(n.useState)({}),t=Object(i.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)(1),o=Object(i.a)(l,2),m=o[0],p=o[1],d=Object(n.useState)([]),f=Object(i.a)(d,2),b=f[0],E=f[1],g=Object(n.useState)({value:"-date"}),v=Object(i.a)(g,2),h=v[0],x=v[1];return Object(n.useEffect)((function(){c({}),function(){var e=Object(u.a)(s.a.mark((function e(){var t,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("knowledge/posts?page=".concat(m,"&sort=").concat(h.value));case 2:return t=e.sent,e.next=5,t.json();case 5:a=e.sent,c(a);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[m,h]),Object(n.useEffect)((function(){if(!a.results)return function(){};var e=[1,m,a.total];E(Object(K.a)(new Set(e)))}),[a,m]),a.results?r.a.createElement("div",null,r.a.createElement("h3",{style:{textAlign:"center"}},"Home"),r.a.createElement(me.a,{type:"select",value:h.value,style:{marginLeft:"14px",width:"130px",backgroundColor:"#2edbff"},onChange:function(e){return x({value:e.target.value})}},r.a.createElement("option",{value:"-date"},"Newest"),r.a.createElement("option",{value:"date"},"Oldest"),r.a.createElement("option",{value:"-likes"},"Most liked"),r.a.createElement("option",{value:"likes"},"Least liked")),r.a.createElement(ie,{posts:a}),r.a.createElement(be,{currentPage:m,numRange:b,setCurrentPage:p})):r.a.createElement(B.a,{color:"primary"})}function ge(){var e=Object(n.useState)(null),t=Object(i.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)((function(){(function(){var e=Object(u.a)(s.a.mark((function e(){var t,a,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/knowledge/login");case 2:return t=e.sent,e.next=5,t.json();case 5:a=e.sent,n=a.user,c(n);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[a]),r.a.createElement(m.a,null,r.a.createElement(v,{value:{loggedIn:a,handleLogin:c}},r.a.createElement(W,null,r.a.createElement("div",{className:"App",style:{marginTop:"65px"}},r.a.createElement(p.b,{path:"/",exact:!0,component:Ee}),r.a.createElement(p.b,{path:"/register",exact:!0,component:function(){return a?r.a.createElement(p.a,{to:"/"}):r.a.createElement(O,null)}}),r.a.createElement(p.b,{path:"/login",exact:!0,component:function(){return a?r.a.createElement(p.a,{to:"/"}):r.a.createElement(C,null)}}),r.a.createElement(p.b,{path:"/new/post",exact:!0,component:function(){return a?r.a.createElement(re,null):r.a.createElement(p.a,{to:"/login"})}}),r.a.createElement(p.b,{path:"/posts/:uuid",exact:!0,component:ne}),r.a.createElement(A,null)))))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ge,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},39:function(e,t,a){},56:function(e,t,a){},57:function(e,t,a){},62:function(e,t,a){},76:function(e,t,a){e.exports=a.p+"static/media/undraw_share_online_r87b.fbd5ff07.svg"},77:function(e,t,a){e.exports=a.p+"static/media/undraw_Login_re_4vu2.303e4a67.svg"},82:function(e,t,a){e.exports=a(178)}},[[82,1,2]]]);
//# sourceMappingURL=main.a01777ba.chunk.js.map