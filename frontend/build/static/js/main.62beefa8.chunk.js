(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{174:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(40),l=a.n(c),s=(a(55),a(3)),o=a.n(s),i=a(8),u=a(6),m=a(15),p=a(9);function d(e){if(!document.cookie)return null;var t=document.cookie.split(";").map((function(e){return e.trim()})).filter((function(t){return t.startsWith(e+"=")}));return 0===t.length?null:decodeURIComponent(t[0].split("=")[1])}function f(e,t,a){return b.apply(this,arguments)}function b(){return(b=Object(i.a)(o.a.mark((function e(t,a,n){var r,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(t,{method:n,mode:"same-origin",credentials:"include",headers:{Accept:"application/json","Content-Type":"application/json","X-CSRFToken":d("csrftoken")},body:JSON.stringify(a)});case 3:return r=e.sent,e.next=6,r.json();case 6:return c=e.sent,e.abrupt("return",c);case 10:return e.prev=10,e.t0=e.catch(0),e.abrupt("return",{errors:{serverError:["An error has occured, please try again later"]}});case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}var h=r.a.createContext({}),E=h.Provider,g=h,v=a(175),y=a(176),j=a(77),w=a(20),O=a(75),k=a.n(O);a(44);function x(){var e=Object(n.useState)({}),t=Object(u.a)(e,2),a=t[0],c=t[1],l=Object(n.useRef)(),s=Object(w.a)(),p=s.register,d=s.errors,b=s.handleSubmit,h=Object(n.useContext)(P),E=function(){var e=Object(i.a)(o.a.mark((function e(t){var a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(l.current.disabled=!0,!(t.username.length<=0||t.password.length<=0)){e.next=5;break}return c({type:"danger",content:"Fill out all fields!"}),l.current.disabled=!1,e.abrupt("return",!1);case 5:return e.next=7,f("/knowledge/login",t,"POST");case 7:if(!(a=e.sent).errors){e.next=12;break}return c({type:"danger",content:a.errors[Object.keys(a.errors)[0]]}),l.current.disabled=!1,e.abrupt("return",!1);case 12:l.current.disabled=!1,h(a.username);case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement(v.a,{style:{margin:"15px",height:"100%"}},r.a.createElement(y.a,{md:"12"},r.a.createElement("h4",null,"Welcome back! Login to start interacting with other users"),r.a.createElement("img",{src:k.a,alt:"login",style:{width:"50vw",padding:"20px"}})),r.a.createElement(y.a,{md:"12"},a.content&&r.a.createElement(j.a,{color:a.type,toggle:function(){return c({})}},a.content),r.a.createElement("form",{onSubmit:b(E),style:{margin:"auto",maxWidth:"320px",minWidth:"0px"}},r.a.createElement("input",{type:"text",placeholder:"Username",ref:p({required:!0}),className:"form-control input",name:"username","aria-label":"username"}),d.username&&r.a.createElement("p",{className:"error-message"},"Remember to fill out the username!"),r.a.createElement("input",{type:"password",placeholder:"Password",ref:p({required:!0}),className:"form-control input",name:"password","aria-label":"password"}),d.password&&r.a.createElement("p",{className:"error-message"},"Remember to fill out the password!"),r.a.createElement("input",{type:"submit",value:"Login",ref:l,"aria-label":"login",className:"btn btn-primary"}),r.a.createElement("footer",null,r.a.createElement("small",null,"Don't have an account? Register"," ",r.a.createElement(m.b,{to:"/register"},"here"))))))}var N=a(76),S=a.n(N);function C(){var e=Object(w.a)(),t=e.handleSubmit,a=e.errors,c=e.register,l=e.watch,s=Object(n.useContext)(P),m=Object(n.useRef)(),p=Object(n.useState)({}),d=Object(u.a)(p,2),b=d[0],h=d[1],E=function(){var e=Object(i.a)(o.a.mark((function e(t){var a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(m.current.disabled=!0,!(t.username.length<=0||t.password.length<=0||t.confirm.length<=0||t.email.length<=0)){e.next=7;break}return m.current.disabled=!1,h({type:"danger",content:"Fill out all fields!"}),e.abrupt("return",!1);case 7:if(t.password===t.confirm){e.next=11;break}return m.current.disabled=!1,h({type:"danger",content:"Password and confirm fields must match!"}),e.abrupt("return",!1);case 11:return e.next=13,f("/knowledge/register",t,"POST");case 13:if(!(a=e.sent).errors){e.next=18;break}return m.current.disabled=!1,h({type:"danger",content:a.errors[Object.keys(a.errors)[0]]}),e.abrupt("return",!1);case 18:m.current.disabled=!1,s(a.username);case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement(v.a,{style:{margin:"15px"}},r.a.createElement(y.a,{md:"12"},r.a.createElement("h4",null,"Welcome! Register to interact with other users."),r.a.createElement("img",{src:S.a,alt:"Share online",style:{width:"40vw",padding:"20px"}})),r.a.createElement(y.a,{md:"12"},b.content&&r.a.createElement(j.a,{color:b.type,toggle:function(){return h({})}},b.content),r.a.createElement("form",{style:{padding:"10px",margin:"auto",maxWidth:"320px"},onSubmit:t(E)},r.a.createElement("input",{type:"text",placeholder:"Username",ref:c({required:!0}),className:"form-control input",name:"username","aria-label":"username"}),a.username&&r.a.createElement("p",{className:"error-message"},"Remember to fill out the username!"),r.a.createElement("input",{type:"email",placeholder:"Email",className:"form-control input",name:"email","aria-label":"email",ref:c({required:!0}),style:{marginTop:"10px",marginBottom:"10px"}}),a.email&&r.a.createElement("p",{className:"error-message"},"Remember to fill out the email!"),r.a.createElement("input",{type:"password",placeholder:"Password",className:"form-control input",name:"password","aria-label":"password",ref:c({required:!0,validate:function(e){return e===l("confirm")}}),style:{marginTop:"10px",marginBottom:"10px"}}),a.password&&r.a.createElement("p",{className:"error-message"},"required"===a.password.type?"Remember to fill out the password!":"Password and confirm fields must match!"),r.a.createElement("input",{type:"password",placeholder:"Confirm password",className:"form-control input",name:"confirm",ref:c({required:!0}),"aria-label":"confirm",style:{marginTop:"10px",marginBottom:"10px"}}),a.confirm&&r.a.createElement("p",{className:"error-message"},"Remember to fill out the confirm password!"),r.a.createElement("input",{type:"submit",value:"Register","aria-label":"register",ref:m,className:"btn btn-primary"}))))}var T=r.a.createContext({}),L=T.Provider,P=T,R=a(11);a(93);function A(e){var t=e.options,a=e.setSortBy,c=e.selected,l=Object(n.useState)(!1),s=Object(u.a)(l,2),o=s[0],i=s[1],m=J(),p=function(){return i(!o)},d=Object(R.c)({background:o?"#68d8ee":"#8ee4f5"}),f=Object(R.c)({y:o?180:0,immediate:m}).y,b=Object(R.c)({transform:o?"translateY(0)":"translateY(-40px)",opacity:o?1:0,config:R.b.gentle,immediate:m});return r.a.createElement("div",{className:"radio-container"},r.a.createElement(R.a.button,{style:d,"data-testid":"toggle",className:"radio-wrapper",onClick:p},r.a.createElement("div",{className:"radio"},r.a.createElement("p",{className:"visually-hidden"},"Change sort options"),r.a.createElement("p",null,c),r.a.createElement(R.a.p,{style:{transform:f.interpolate((function(e){return"rotateX(".concat(e,"deg)")}))}},o?"X":"\u25bc"))),r.a.createElement(R.a.div,{style:b,config:R.b.wobbly},o&&r.a.createElement("div",{className:"radio-content"},t.map((function(e){return r.a.createElement("div",{onClick:function(){return function(e){a(e),p()}(e)},key:e[0]},r.a.createElement("button",null,e[1]))})))))}var q=a(177),B=a(178);function _(e){var t=e.setSearch,a=e.type,n=e.setCurrentPage,c=Object(w.a)(),l=c.register,s=c.handleSubmit;return r.a.createElement(q.a,{onSubmit:s((function(e){t(e.search),n(1)})),style:{padding:"20px 2rem",paddingBottom:"0px"}},r.a.createElement(B.a,{for:"search"},"Find specific ",a),r.a.createElement("input",{className:"form-control",placeholder:"What do you want to search for?",type:"text",name:"search",id:"search",ref:l,style:{marginBottom:"15px"}}),r.a.createElement("input",{className:"btn btn-primary",value:"Search",type:"submit"}))}var D=a(18),W=a(13);a(60);function Y(e){var t=e.children,a=Object(n.useState)(!0),c=Object(u.a)(a,2),l=c[0],s=c[1],o=Object(n.useState)(localStorage.getItem("theme")),i=Object(u.a)(o,2),m=i[0],p=i[1],d=J(),f=Object(R.c)({opacity:l?0:1,transform:l?"translate3D(-100%, 0, 0)":"translate3D(0%, 0, 0)",immediate:d}),b=function(){s(!l)};return Object(n.useEffect)((function(){localStorage.setItem("theme",m),document.documentElement.setAttribute("data-theme",m)}),[m]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"navnavbar"},r.a.createElement("button",{style:{padding:"0px "},onClick:b,className:"navnavicon"},r.a.createElement(D.a,{icon:W.c}),r.a.createElement("span",{className:"visually-hidden"},"Toggle sidebar")),r.a.createElement("button",{className:"theme navnavicon",style:{padding:"0px "},onClick:function(){return p("dark"===m?"light":"dark")}},r.a.createElement(D.a,{className:"theme",icon:"dark"===m?W.k:W.g}))),r.a.createElement(M,{toggleSidebar:b,style:f}),r.a.createElement("div",{style:{filter:!l&&"blur(5px)"},onClick:l?void 0:b},t))}var F=a(179),I=a(180),z=Object(R.a)(F.a);function M(e){var t=e.toggleSidebar,a=e.style,c=Object(n.useContext)(g),l=Object(n.useContext)(P),s=Object(p.i)(),u=function(){var e=Object(i.a)(o.a.mark((function e(){var a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/knowledge/logout");case 2:return a=e.sent,e.next=5,a.json();case 5:if(!e.sent.errors){e.next=9;break}return alert("An error has occured"),e.abrupt("return");case 9:alert("Logged out successfully!"),l(null),t();case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),m=function(e){s(e),t()},d=[{onClick:function(){return m("/")},icon:W.f,name:"Home"}];return c?d.push({onClick:function(){return m("/joined")},icon:W.a,name:"Your hubs"},{onClick:u,icon:W.j,name:"Logout"}):d.push({onClick:function(){return m("/login")},icon:W.i,name:"Login"},{onClick:function(){return m("/register")},icon:W.l,name:"Register"}),r.a.createElement(z,{vertical:!0,style:a,className:"navnav"},r.a.createElement("h3",null,"Share"),r.a.createElement("hr",null),d.map((function(e){return r.a.createElement(I.a,{key:e.name},r.a.createElement("button",{onClick:e.onClick,className:"navnavbutton navnavlink"},r.a.createElement(D.a,{icon:e.icon,className:"navnavitem"}),r.a.createElement("p",{className:"navnavtext"},e.name)))})))}var U=function(){return!window.matchMedia("(prefers-reduced-motion: no-preference)").matches};function J(){var e=Object(n.useState)(U),t=Object(u.a)(e,2),a=t[0],r=t[1];return Object(n.useEffect)((function(){var e=window.matchMedia("(prefers-reduced-motion: no-preference)");return e.addEventListener("change",(function(e){r(!e.matches)})),function(){e.removeEventListener("change",(function(e){r(!e.matches)}))}}),[]),a}var H=a(181);a(33);function X(e){var t=e.likes,a=e.uuid,c=e.setLikes,l=Object(n.useContext)(g);console.log(t);var s=function(){var e=Object(i.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f("/knowledge/post/".concat(a),{},"PUT");case 2:(t=e.sent).errors?alert("An error has occured. Try again later."):c(t.likes);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement("div",null,l&&r.a.createElement("button",{onClick:s,className:"like-button"},r.a.createElement(D.a,{icon:W.e,title:"like button",className:t.includes(l)?"dislike-icon":"like-icon"}),r.a.createElement("span",{className:"visually-hidden"},t.includes(l)?"Like":"Dislike","the post")),r.a.createElement(H.a,{pill:!0,color:"info"},t.length))}var G=a(182),$=a(183),K=Object(R.a)(G.a);function Q(e){var t=e.posts,a=e.isLoading,n=J(),c=Object(R.c)({from:{transform:"translate3D(100px,0,0)"},to:{transform:"translate3D(0,0,0)"},immediate:n});return a?r.a.createElement($.a,{color:"primary"}):t.length>0?r.a.createElement(K,{style:c,className:"deck"},t.map((function(e){return r.a.createElement(je,{post:e,key:e.id})}))):r.a.createElement("h5",{style:{margin:"20px",textAlign:"center"}},"Nothing to see here!")}var V=a(184),Z=a(30),ee=a.n(Z);function te(){var e=Object(n.useRef)(),t=Object(w.a)(),a=t.register,c=t.handleSubmit,l=t.errors,s=Object(n.useState)({}),m=Object(u.a)(s,2),d=m[0],b=m[1],h=Object(p.h)().pathname,E=Object(p.i)(),g=function(){var t=Object(i.a)(o.a.mark((function t(a){var n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.current.disabled=!0,a.hubs=h.split("/"),t.next=4,f("/knowledge/new/post",a,"POST");case 4:if(!(n=t.sent).errors){t.next=9;break}return e.current.disabled=!1,b({type:"danger",content:n.errors[Object.keys(n.errors)[0]]}),t.abrupt("return",!1);case 9:e.current.disabled=!0,E("/hubs/".concat(n.hub_path));case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return r.a.createElement("div",{style:{padding:"20px"}},r.a.createElement("h3",null,"New post"),d.content&&r.a.createElement(j.a,{color:d.type,toggle:function(){return b({})}},d.content),r.a.createElement(q.a,{style:{margin:"10px"},method:"POST",onSubmit:c(g)},r.a.createElement("h6",null,"In here you make a new post. The content will be rendered using markdown."," ",r.a.createElement("a",{href:"https://www.markdowntutorial.com/",target:"_blank",rel:"noopener noreferrer"},"What is markdown and how to use it.")),r.a.createElement(V.a,null,r.a.createElement(B.a,{for:"title"},"Title: "),r.a.createElement("input",{type:"text","aria-label":"title",name:"title",id:"title",placeholder:"Title...",className:"form-control",ref:a({required:!0,validate:function(e){return e.length<65}})}),l.title&&r.a.createElement("p",{className:"error-message"},"required"===l.title.type?"You must provide a title!":"Title must be 64 characters at most!")),r.a.createElement(V.a,null,r.a.createElement(B.a,{for:"content"},"Content: "),r.a.createElement(ee.a,{type:"text","aria-label":"content",name:"content",id:"content",className:"form-control",placeholder:"Some good content...",ref:a({required:!0}),rows:20,maxLength:"2050"}),l.content&&r.a.createElement("p",{className:"error-message"},"You must provide some content!")),r.a.createElement("input",{type:"submit",value:"Create post",className:"btn btn-primary",ref:e})))}var ae=a(185),ne=a(186),re=a(187),ce=a(188),le=a(189),se=a(31),oe=a.n(se),ie=a(41),ue=a.n(ie);function me(e){var t=e.comment,a=Object(n.useContext)(g),c=Object(n.useRef)(),l=Object(n.useState)(t.content),s=Object(u.a)(l,2),m=s[0],p=s[1],d=Object(n.useState)(!1),b=Object(u.a)(d,2),h=b[0],E=b[1],v=function(){return E(!h)},y=function(){var e=Object(i.a)(o.a.mark((function e(){var a,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!c.current){e.next=10;break}if(!((a=c.current.value).length>256)){e.next=5;break}return alert("Comment must be less than 256 characters long"),e.abrupt("return");case 5:return p(a),e.next=8,f("/knowledge/comment/".concat(t.id),{content:a},"PUT");case 8:(n=e.sent).errors&&alert(n.errors[Object.keys(n.errors)[0]]);case 10:v();case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement(ae.a,{style:{marginTop:"20px",marginBottom:"20px"}},r.a.createElement(ne.a,{style:{backgroundColor:"rgb(203, 223, 230)",display:"inline-flex",justifyContent:"space-between"}},r.a.createElement("div",null,r.a.createElement("div",{style:{display:"inline-flex"}},r.a.createElement(oe.a,{size:"28",string:t.commenter.username}),r.a.createElement("h4",{style:{marginLeft:"10px"}},t.commenter.username)),r.a.createElement(re.a,{className:"text-muted"},t.date)),t.commenter.username===a&&r.a.createElement("div",null,h&&r.a.createElement(ce.a,{color:"danger",style:{fontSize:"0.9rem"},outline:!0,title:"Cancel",onClick:v},r.a.createElement("span",{className:"visually-hidden"},"cancel"),r.a.createElement(D.a,{icon:W.m})),r.a.createElement(ce.a,{color:h?"success":"primary",style:{marginLeft:"10px",fontSize:"0.9rem"},outline:!0,title:h?"Save":"Edit",disabled:c.current&&c.current.length<1,onClick:y},r.a.createElement("span",{className:"visually-hidden"},h?"save":"edit"),r.a.createElement(D.a,{icon:h?W.h:W.d})))),r.a.createElement(le.a,{style:{backgroundColor:"rgb(215, 245, 255)"}},h?r.a.createElement(ee.a,{className:"edit-comment",ref:c,maxLength:"256"},m):r.a.createElement(ue.a,{style:{whiteSpcae:"preWrap",marginTop:"0px",marginBottom:"1rem"}},m)))}var pe=a(42),de=a(10);function fe(e){var t=e.comments,a=J(),c=Object(n.useState)(1),l=Object(u.a)(c,2),s=l[0],o=l[1],i=Object(n.useState)(t.slice(0,5)),m=Object(u.a)(i,2),p=m[0],d=m[1],f=Object(R.d)(p,(function(e){return e.id}),{from:{opacity:0,transform:"translate3D(-100px,0,0)"},enter:{opacity:1,transform:"translate3D(0,0,0)"},config:R.b.wobbly,immediate:a}),b=window.pageYOffset;return Object(n.useEffect)((function(){void 0!==t[0]&&d((function(e){return[t[0]].concat(Object(de.a)(e.slice(1)))}))}),[t]),Object(n.useEffect)((function(){window.scroll({top:b})}),[p,b]),r.a.createElement("div",null,f.map((function(e){var t=e.item,a=e.key,n=e.props;return r.a.createElement(R.a.div,{style:Object(pe.a)({},n,{overflow:"hidden"}),key:a},r.a.createElement(me,{comment:t}))})),5*s<=t.length&&r.a.createElement("button",{className:"btn btn-primary center",onClick:function(){d([].concat(Object(de.a)(p),Object(de.a)(t.slice(5*s,5*(s+1))))),o(s+1)}},"Load more"))}var be=a(190);function he(e){var t=e.setComments,a=e.post,c=Object(w.a)(),l=c.register,s=c.handleSubmit,m=c.reset,p=c.errors,d=Object(n.useState)({}),b=Object(u.a)(d,2),h=b[0],E=b[1],g=Object(n.useRef)(),v=function(){var e=Object(i.a)(o.a.mark((function e(n){var r,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(g.current.disabled=!0,!(n.content.length<1)){e.next=5;break}return E({type:"danger",content:"You must fill out the comment!"}),g.current.disabled=!1,e.abrupt("return");case 5:return r={content:n.content,post:a},e.next=8,f("/knowledge/comment",r,"POST");case 8:(c=e.sent).errors?E({type:"danger",content:c.errors[Object.keys(c.errors)[0]]}):(E({type:"success",content:"Comment posted successfully."}),m()),g.current.disabled=!1;try{t((function(e){return[c.comment].concat(Object(de.a)(e))}))}catch(l){alert("Something went wrong in showing your comment. It should show when you reload though.")}case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",null,h.content&&r.a.createElement(be.a,{color:h.type,toggle:function(){return E({})}},h.content),p.content&&r.a.createElement(be.a,{color:"danger"},"required"===p.content.type?"You must fill out the comment!":"Comment must be under 257 characters!"),r.a.createElement(q.a,{onSubmit:s(v)},r.a.createElement(V.a,null,r.a.createElement(ee.a,{ref:l({required:!0,validate:function(e){return e.length<257}}),placeholder:"A valuable comment...",name:"content","aria-label":"Comment content",className:"form-control"})),r.a.createElement("input",{type:"submit",value:"Share your comment",className:"btn btn-primary",ref:g})))}function Ee(){var e=Object(p.j)().uuid,t=Object(n.useState)({}),a=Object(u.a)(t,2),c=a[0],l=a[1],s=Object(n.useState)(),d=Object(u.a)(s,2),f=d[0],b=d[1],h=Object(n.useState)([]),E=Object(u.a)(h,2),v=E[0],y=E[1],w=Object(n.useContext)(g);return Object(n.useEffect)((function(){(function(){var t=Object(i.a)(o.a.mark((function t(){var a,n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/knowledge/post/".concat(e));case 2:return a=t.sent,t.next=5,a.json();case 5:n=t.sent,l(n),b(n.likes),y(n.comments);case 9:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()()}),[e]),c.content?r.a.createElement("div",{style:{padding:"25px"}},r.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},r.a.createElement("div",{style:{display:"inline-flex",marginBottom:"10px"}},r.a.createElement(oe.a,{size:"33",string:c.poster.username}),r.a.createElement("h3",{style:{marginLeft:"10px"}},c.poster.username)),r.a.createElement(m.b,{to:"/hubs/".concat(c.hub.full_path),style:{width:"min-content"}},r.a.createElement(H.a,{color:"primary"},c.hub.title)),f&&r.a.createElement(X,{setLikes:b,likes:f,uuid:c.uuid}),r.a.createElement("footer",{style:{fontSize:"12px"}},c.date),r.a.createElement("h1",{id:"post-title"},c.title)),r.a.createElement("hr",null),r.a.createElement("div",{className:"wrapper"},r.a.createElement("div",{id:"post-div"},r.a.createElement(ue.a,null,c.content)),r.a.createElement("hr",null),w?r.a.createElement(he,{post:c.id,setComments:y}):r.a.createElement(j.a,{color:"danger"},"You must be logged in to comment!"),v&&v.length>0?r.a.createElement(fe,{comments:v}):r.a.createElement(j.a,{color:"info"},"There are no comments here!"))):c.error?r.a.createElement("h2",null,"This post couldn't be found"):r.a.createElement($.a,{color:"primary"})}var ge=a(191),ve=a(192),ye=a(193);function je(e){var t=e.post,a=Object(p.i)();return r.a.createElement(y.a,{md:"12",style:{marginBottom:"30px"}},r.a.createElement(ae.a,{className:"hover-card",onClick:function(){return a("/hubs/".concat(t.hub.full_path,"/posts/").concat(t.uuid))},title:"See more"},r.a.createElement(ne.a,{style:{backgroundColor:"#68d8ee"}},r.a.createElement(ge.a,null,r.a.createElement("h5",null,t.title)),r.a.createElement(ve.a,{style:{display:"inline-flex"}},r.a.createElement(oe.a,{size:"20",string:t.poster.username}),r.a.createElement("h6",{style:{marginLeft:"10px"}},t.poster.username))),r.a.createElement(le.a,{className:"back-blue"},r.a.createElement(re.a,{className:"post-content"},t.content)),r.a.createElement(ye.a,{className:"footer back-blue"},r.a.createElement("p",{className:"card-link"},r.a.createElement(m.b,{to:"/hubs/".concat(t.hub.full_path,"/posts/").concat(t.uuid),"aria-label":"see more"},r.a.createElement(D.a,{icon:W.b}),r.a.createElement("span",{className:"visually-hidden"},"See more"))),r.a.createElement(re.a,{className:"text-muted"},t.date))))}var we=a(194),Oe=a(195),ke=a(196);function xe(e){var t=e.setCurrentPage,a=e.currentPage,n=e.last;return r.a.createElement(we.a,{style:{justifyContent:"center",padding:"10px 1.6rem",paddingRight:"3.2rem"}},r.a.createElement(Oe.a,{disabled:1===a,key:"prev"},r.a.createElement(ke.a,{previous:!0,onClick:function(){return t(a-1)}})),Object(de.a)(new Set([1,a,n])).map((function(e){return r.a.createElement(Oe.a,{active:e===a,key:e},r.a.createElement(ke.a,{onClick:function(){return t(e)}},e))})),r.a.createElement(Oe.a,{disabled:a===n,key:"next"},r.a.createElement(ke.a,{next:!0,onClick:function(){return t(a+1)}})))}function Ne(){var e=Object(n.useState)(null),t=Object(u.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)(1),s=Object(u.a)(l,2),m=s[0],p=s[1],d=Object(n.useState)(["-date","Newest"]),f=Object(u.a)(d,2),b=f[0],h=f[1];Object(n.useEffect)((function(){c({}),function(){var e=Object(i.a)(o.a.mark((function e(){var t,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/knowledge/hub/items/1?page=".concat(m,"&sort=").concat(b[0],"&type=posts&search=&filter=true"));case 2:return t=e.sent,e.next=5,t.json();case 5:a=e.sent,c(a);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[m,b]);return null===a?r.a.createElement($.a,{color:"primary"}):r.a.createElement("div",{style:{overflow:"hidden"},className:"wrapper"},r.a.createElement("h3",{style:{textAlign:"center"}},"Posts from hubs you belong to"),r.a.createElement(A,{options:[["-date","Newest"],["date","Oldest"],["-likes","Most Liked"],["likes","Least liked"]],setSortBy:h,selected:b[1]}),a.results?r.a.createElement(r.a.Fragment,null,r.a.createElement(Q,{posts:a.results}),r.a.createElement(xe,{currentPage:m,last:a.total,setCurrentPage:p})):r.a.createElement($.a,{color:"primary"}))}var Se=a(197);a(74);function Ce(){var e=Object(n.useContext)(g),t=Object(n.useState)(void 0),a=Object(u.a)(t,2),c=a[0],l=a[1],s=Object(n.useState)((null===c||void 0===c?void 0:c.members.includes(e))?"Leave":"Join"),d=Object(u.a)(s,2),b=d[0],h=d[1],E=Object(n.useState)(["-date","Newest"]),v=Object(u.a)(E,2),y=v[0],j=v[1],w=Object(n.useState)(!0),O=Object(u.a)(w,2),k=O[0],x=O[1],N=Object(n.useState)({}),S=Object(u.a)(N,2),C=S[0],T=S[1],L=Object(n.useState)(1),P=Object(u.a)(L,2),R=P[0],q=P[1],B=Object(n.useState)("posts"),D=Object(u.a)(B,2),W=D[0],Y=D[1],F=Object(n.useState)(""),I=Object(u.a)(F,2),z=I[0],M=I[1],U=Object(p.j)().title,J=Object(p.h)().pathname.split("/");Object(n.useEffect)((function(){c||function(){var t=Object(i.a)(o.a.mark((function t(){var a,n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/knowledge/hub/details/".concat(U,"?list=").concat(J));case 2:return a=t.sent,t.next=5,a.json();case 5:n=t.sent,l(n),h(n.members.includes(e)?"Leave":"Join");case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()()}),[U,c,J,e]),Object(n.useEffect)((function(){(x(!0),void 0!==c)&&function(){var e=Object(i.a)(o.a.mark((function e(){var t,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/knowledge/hub/items/".concat(c.id,"?sort=").concat(y[0],"&page=").concat(R,"&type=").concat(W,"&search=").concat(z));case 2:return t=e.sent,e.next=5,t.json();case 5:a=e.sent,T(a),x(!1);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[c,R,W,z,y,e]);var H=function(){var e=Object(i.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f("/knowledge/joined",{hub:c.id},"PUT");case 2:if(!(t=e.sent).errors){e.next=6;break}return alert("An error has occured. Please try again"),e.abrupt("return");case 6:h(t.status);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),X=[["-date","Newest"],["date","Oldest"]];return"posts"===W&&X.push(["-likes","Most Liked"],["likes","Least liked"]),void 0===c?r.a.createElement($.a,{color:"primary"}):c.error?r.a.createElement("h3",null,"We couldn't find this hub."):r.a.createElement("div",{style:{overflow:"hidden"}},r.a.createElement(Se.a,{style:{paddingTop:0,marginTop:"-20px",whiteSpace:"pre-wrap"}},r.a.createElement("hr",null),r.a.createElement("h3",{className:"display-3 hub-name"},U.replace(/-/g," ")),r.a.createElement(ce.a,{onClick:H,color:"success",style:{color:"black"}},b),r.a.createElement("p",{style:{fontSize:"1.5rem"}},c.description),r.a.createElement("hr",{className:"my-2"}),r.a.createElement("div",{className:"d-flex justify-content-between"},r.a.createElement(Be,{type:W,handleTypeChange:function(){x(!0),Y("posts"===W?"hubs":"posts"),j(["-date","Newest"]),q(1)}}),e&&"posts"===W?c.full_path.includes("/")&&r.a.createElement(m.b,{to:"posts/new",className:"lead"},"+ New post"):r.a.createElement(m.b,{to:"new",className:"lead"},"+ New Hub"))),r.a.createElement("div",{className:"wrapper"},r.a.createElement(_,{setSearch:M,type:W,setCurrentPage:q}),r.a.createElement(A,{options:X,setSortBy:j,selected:y[1]}),"posts"===W?r.a.createElement(r.a.Fragment,null,r.a.createElement(Q,{posts:C.results,isLoading:k}),r.a.createElement(xe,{currentPage:R,last:C.total,setCurrentPage:q})):r.a.createElement(r.a.Fragment,null,r.a.createElement(Le,{hubs:C.results,isLoading:k}),r.a.createElement(xe,{currentPage:R,last:C.total,setCurrentPage:q}))))}var Te=Object(R.a)(G.a);function Le(e){var t=e.hubs,a=e.isLoading,n=J(),c=Object(R.c)({from:{transform:"translate3D(0,100px,0)"},to:{transform:"translate3D(0,0,0)"},immediate:n});return a?r.a.createElement($.a,{color:"primary"}):t.length>0?r.a.createElement(Te,{style:c,className:"deck wrapper"},t.map((function(e){return r.a.createElement(qe,{hub:e,key:e.id})}))):r.a.createElement("h5",{style:{margin:"20px",textAlign:"center"}},"Nothing to see here!")}var Pe=a(198),Re=a(199);function Ae(){var e=Object(p.h)().pathname,t=Object(n.useState)(null),a=Object(u.a)(t,2),c=a[0],l=a[1];return Object(n.useEffect)((function(){var t=e.split("/");"posts"===t[t.length-2]&&t.splice(-2),"posts"===(t=t.filter((function(e){return!["","hubs","new"].includes(e)})))[t.length-2]&&t.splice(-2),l(t)}),[e]),e.split("/").includes("hubs")&&c?r.a.createElement(Pe.a,{style:{paddingTop:0}},c.map((function(e,t){return r.a.createElement(Re.a,{key:t},r.a.createElement(m.b,{to:"/hubs/".concat(c.slice(0,t+1).join("/"))},e))}))):null}function qe(e){var t=e.hub,a=Object(p.i)();return r.a.createElement(y.a,{md:"12",style:{marginBottom:"30px"}},r.a.createElement(ae.a,{onClick:function(){return a(t.title)},title:"Go to hub",className:"hover-card"},r.a.createElement(ne.a,{className:"back-green"},r.a.createElement(ge.a,null,r.a.createElement("h5",null,t.title.replace(/-/g," "))),r.a.createElement(ve.a,null,r.a.createElement("p",{style:{fontSize:"0.85em"}},"Made ",t.date))),r.a.createElement(le.a,{style:{backgroundColor:"#a2ffaf"}},r.a.createElement(re.a,null,t.description)),r.a.createElement(ye.a,{className:"footer back-green"},r.a.createElement("p",{className:"card-link"},r.a.createElement(m.b,{to:"".concat(t.title),"aria-label":"see more"},r.a.createElement(D.a,{icon:W.b}),r.a.createElement("span",{className:"visually-hidden"},"See more"))))))}function Be(e){var t=e.type,a=e.handleTypeChange,n=J(),c=Object(R.c)({transform:"hubs"!==t?"translate3D(100%,0,0)":"translate3d(0,0,0)",color:"hubs"!==t?"white":"black",config:Object(pe.a)({},R.b.molasses,{friction:60}),immediate:n}),l=c.transform,s=c.color;return r.a.createElement(ce.a,{color:"primary",className:"lead type-toggle-button",onClick:a,style:{borderColor:"hubs"===t&&"#86eb93"}},r.a.createElement(R.a.span,{style:{color:s},className:"type-toggle-span"},t.charAt(0).toUpperCase()+t.slice(1)),r.a.createElement(R.a.div,{className:"type-toggle-div",style:{transform:l}}))}function _e(){var e=Object(w.a)(),t=e.register,a=e.errors,c=e.handleSubmit,l=Object(n.useState)(null),s=Object(u.a)(l,2),m=s[0],d=s[1],b=Object(p.h)().pathname,h=Object(p.i)(),E=function(){var e=Object(i.a)(o.a.mark((function e(t){var a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.hubs=b.split("/"),t.title=t.title.replace(/ /g,"-"),e.next=4,f("/knowledge/new/hub",t,"POST");case 4:if(!(a=e.sent)[0]){e.next=8;break}return d(a[0]),e.abrupt("return");case 8:h("/hubs/".concat(a.full_path));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"wrapper"},r.a.createElement("h2",{style:{textAlign:"center",marginTop:"30px"}},"Make a new hub"),r.a.createElement("h5",{style:{margin:"20px"}},"Create a new hub to share all sorts of things with others!"),m&&r.a.createElement(j.a,{color:"danger",toggle:function(){return d(null)}},m),r.a.createElement(q.a,{onSubmit:c(E),style:{textAlign:"left"}},r.a.createElement(V.a,null,r.a.createElement(B.a,{for:"title"},"Hub name"),r.a.createElement("input",{type:"text",id:"title",className:"form-control input",name:"title",placeholder:"A nice name...",ref:t({required:!0,validate:{length:function(e){return e.length<21},name:function(e){return"new"!==e.toLowerCase()&&"posts"!==e.toLowerCase()}}})}),a.title&&r.a.createElement("p",{className:"error-message"},"required"===a.title.type?"You need to give the hub a name!":"length"===a.title.type?"The hub name must be under 21 characters!":"That hub name is not allowed!")),r.a.createElement(V.a,null,r.a.createElement(B.a,{for:"description"},"The hub description"),r.a.createElement("input",{type:"text",id:"description",className:"form-control input",name:"description",placeholder:"An awesome description...",ref:t({required:!0,validate:function(e){return e.length<101}})}),a.description&&r.a.createElement("p",{className:"error-message"},"required"===a.description.type?"You need to give the hub a description!":"The hub description must be under 101 characters!")),r.a.createElement("input",{type:"submit",value:"New hub",className:"btn btn-primary"})))}function De(){var e=Object(n.useState)(null),t=Object(u.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)(1),s=Object(u.a)(l,2),m=s[0],p=s[1],d=Object(n.useState)(["-date","Newest"]),f=Object(u.a)(d,2),b=f[0],h=f[1];Object(n.useEffect)((function(){c({}),function(){var e=Object(i.a)(o.a.mark((function e(){var t,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("knowledge/hub/items/1?page=".concat(m,"&sort=").concat(b[0],"&type=posts&search="));case 2:return t=e.sent,e.next=5,t.json();case 5:a=e.sent,c(a);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[m,b]);return null===a?r.a.createElement($.a,{color:"primary"}):r.a.createElement("div",{style:{overflow:"hidden"}},r.a.createElement("h3",{style:{textAlign:"center"}},"Home"),r.a.createElement(A,{options:[["-date","Newest"],["date","Oldest"],["-likes","Most Liked"],["likes","Least liked"]],setSortBy:h,selected:b[1]}),a.results?r.a.createElement(r.a.Fragment,null,r.a.createElement(Q,{posts:a.results}),r.a.createElement(xe,{currentPage:m,last:a.total,setCurrentPage:p})):r.a.createElement($.a,{color:"primary"}))}a(173);function We(){var e=Object(n.useState)(void 0),t=Object(u.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)((function(){if(void 0!==a)return function(){};(function(){var e=Object(i.a)(o.a.mark((function e(){var t,a,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/knowledge/login");case 2:return t=e.sent,e.next=5,t.json();case 5:a=e.sent,n=a.user,c(n);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[a]),r.a.createElement(m.a,null,r.a.createElement(E,{value:a},r.a.createElement(L,{value:c},r.a.createElement(Y,null,r.a.createElement("div",{className:"App"},r.a.createElement(Ae,null),r.a.createElement(p.e,null,r.a.createElement(p.c,{path:"/",element:r.a.createElement(De,null)}),r.a.createElement(p.c,{path:"/joined",element:a?r.a.createElement(Ne,null):r.a.createElement(x,null)}),r.a.createElement(p.c,{path:"/register",element:a?r.a.createElement(p.a,{to:"/"}):r.a.createElement(C,null)}),r.a.createElement(p.c,{path:"/login",element:a?r.a.createElement(p.a,{to:"/"}):r.a.createElement(x,null)}),r.a.createElement(p.c,{path:"posts/:uuid",element:r.a.createElement(Ee,null)}),r.a.createElement(p.c,{path:"/hubs/:title*",element:r.a.createElement(Ye,null)},r.a.createElement(p.c,{path:"/",element:r.a.createElement(Ce,null)}),r.a.createElement(p.c,{path:"posts/:uuid",element:r.a.createElement(Ee,null)}),r.a.createElement(p.c,{path:"new",element:a?r.a.createElement(_e,null):r.a.createElement(x,null)}),r.a.createElement(p.c,{path:":title*",element:r.a.createElement(Fe,{loggedIn:a})}))))))))}function Ye(){return r.a.createElement(p.b,null)}function Fe(e){var t=e.loggedIn;return r.a.createElement(r.a.Fragment,null,r.a.createElement(p.e,null,r.a.createElement(p.c,{path:"/",element:r.a.createElement(Ce,null)}),r.a.createElement(p.c,{path:"posts/new",element:t?r.a.createElement(te,null):r.a.createElement(x,null)}),r.a.createElement(p.c,{path:"posts/:uuid",element:r.a.createElement(Ee,null)}),r.a.createElement(p.c,{path:"new",element:t?r.a.createElement(_e,null):r.a.createElement(x,null)}),r.a.createElement(p.c,{path:":title*",element:r.a.createElement(Fe,{loggedIn:t})})))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(We,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},33:function(e,t,a){},44:function(e,t,a){},55:function(e,t,a){},60:function(e,t,a){},74:function(e,t,a){},75:function(e,t,a){e.exports=a.p+"static/media/undraw_Login_re_4vu2.303e4a67.svg"},76:function(e,t,a){e.exports=a.p+"static/media/undraw_share_online_r87b.fbd5ff07.svg"},78:function(e,t,a){e.exports=a(174)},93:function(e,t,a){}},[[78,1,2]]]);
//# sourceMappingURL=main.62beefa8.chunk.js.map