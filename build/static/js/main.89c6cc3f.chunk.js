(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{11:function(e,n,t){"use strict";var a=t(20),r=t(1),o=t.n(r),l=t(21),i=t(115),c=t.n(i);function u(){var e=Object(a.a)(["\n  filter: drop-shadow(0 0 5px #fff);\n"]);return u=function(){return e},e}function s(){var e=Object(a.a)(["\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]);return s=function(){return e},e}var d=Object(l.c)("div")(s()),m=Object(l.c)(c.a)(u());n.a=function(e){return o.a.createElement(d,null,o.a.createElement(m,{size:50,color:"#111"}))}},127:function(e,n,t){e.exports=t(213)},134:function(e,n,t){},136:function(e,n,t){},213:function(e,n,t){"use strict";t.r(n);var a=t(1),r=t.n(a),o=t(6),l=t.n(o),i=(t(132),t(134),t(136),t(78)),c=t(79),u=t(81),s=t(80),d=t(82),m=t(20),f=t(21),g=t(13),h=t(446),p=t(445),b=t(113),E=t.n(b);function v(){var e=Object(m.a)(["\n  width: 80px;\n  position: absolute;\n  cursor: pointer;\n  top: 2px;\n  left: calc(50% - 35px);\n  z-index: 2;\n\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);\n  border-radius: 50%;\n\n  transition: transform 250ms ease;\n  &:hover {\n    transform: scale(1.05);\n  }\n"]);return v=function(){return e},e}var O=Object(f.c)("img")(v()),k=t(10);function y(){var e=Object(m.a)(["\n  font-size: 24px;\n  position: absolute;\n  cursor: pointer;\n  top: 5px;\n  right: 5px;\n  z-index: 2;\n  display: block;\n\n  filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.25));\n  transition: all 250ms ease;\n  padding: 5px;\n  border-radius: 50%;\n  background-color: rgba(214, 0, 88, 0.25);\n\n  &:hover {\n    filter: none;\n    background-color: #CC0058;\n  }\n"]);return y=function(){return e},e}var j=Object(f.c)(k.a)(y()),P=t(87),w=t(75),A=t(32),I=function(e){var n=e.children,t=Object(P.a)(e,["children"]);return r.a.createElement(g.b,{children:function(e){var a=e.location;return r.a.createElement(w.TransitionGroup,{className:"transition-group"},r.a.createElement(w.CSSTransition,{key:a.key,classNames:"fade",timeout:100},r.a.createElement(g.d,Object.assign({location:a,className:Object(A.cx)("router",{admin:/admin/.test(a.href)},{partner:/partner/.test(a.href)})},t),n)))}})},x=t(12),S=t.n(x),C=t(11),N=S.a.Map({loading:C.a,loader:{Home:function(){return t.e(7).then(t.bind(null,447))},navItems:function(){return fetch("/api/zones").then(function(e){return e.json()})}},render:function(e,n){var t=e.Home.default,a=e.navItems.data;return r.a.createElement(t,Object.assign({},n,{navItems:a}))}}),D=S()({loading:C.a,loader:function(e){return t.e(8).then(t.bind(null,427))}});D.Offers=S()({loading:C.a,loader:function(e){return Promise.all([t.e(0),t.e(2),t.e(3),t.e(4),t.e(9)]).then(t.bind(null,428))}}),D.AddOffer=S()({loading:C.a,loader:function(e){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(10)]).then(t.bind(null,441))}}),D.Zones=S()({loading:C.a,loader:function(e){return Promise.all([t.e(2),t.e(4),t.e(11)]).then(t.bind(null,429))}}),D.AddZone=S()({loading:C.a,loader:function(e){return Promise.all([t.e(0),t.e(1),t.e(12)]).then(t.bind(null,430))}}),D.Partners=S()({loading:C.a,loader:function(e){return Promise.all([t.e(0),t.e(2),t.e(3),t.e(4),t.e(13)]).then(t.bind(null,431))}}),D.AddPartner=S()({loading:C.a,loader:function(e){return Promise.all([t.e(1),t.e(14)]).then(t.bind(null,432))}}),D.Admins=S()({loading:C.a,loader:function(e){return Promise.all([t.e(0),t.e(2),t.e(3),t.e(4),t.e(15)]).then(t.bind(null,433))}}),D.AddAdmin=S()({loading:C.a,loader:function(e){return Promise.all([t.e(1),t.e(16)]).then(t.bind(null,448))}});var T=S()({loading:C.a,loader:function(e){return t.e(17).then(t.bind(null,434))}});T.Offers=S()({loading:C.a,loader:function(e){return Promise.all([t.e(0),t.e(2),t.e(3),t.e(4),t.e(18)]).then(t.bind(null,435))}}),T.Scan=S()({loading:C.a,loader:function(e){return Promise.all([t.e(26),t.e(19)]).then(t.bind(null,436))}});var z=S()({loading:C.a,loader:function(e){return Promise.all([t.e(0),t.e(5),t.e(20)]).then(t.bind(null,437))}}),L=S()({loading:C.a,loader:function(e){return Promise.all([t.e(5),t.e(21)]).then(t.bind(null,438))}}),F=S()({loading:C.a,loader:function(e){return t.e(22).then(t.bind(null,42))}}),R=S()({loading:C.a,loader:function(e){return Promise.all([t.e(1),t.e(23)]).then(t.bind(null,439))}}),H=S()({loading:C.a,loader:function(e){return Promise.all([t.e(1),t.e(24)]).then(t.bind(null,440))}}),M=t(89),Z=t.n(M);function U(){var e=Object(m.a)(["\n  width: 100%;\n  max-width: 500px;\n  margin: 0 auto;\n"]);return U=function(){return e},e}var G=Object(f.a)(U()),W=function(e){function n(){var e,t;Object(i.a)(this,n);for(var a=arguments.length,o=new Array(a),l=0;l<a;l++)o[l]=arguments[l];return(t=Object(u.a)(this,(e=Object(s.a)(n)).call.apply(e,[this].concat(o)))).logout=function(e){fetch("/api/logout",{credentials:"include"}).then(function(e){return e.json()}).then(function(e){var n=e.ok;setTimeout(t.getLoginState,1e3),n&&window.location.reload()}).catch(function(e){return console.error(e)})},t.navigate=function(e){return function(n){Object(g.e)(e)}},t.menu=[r.a.createElement(h.a.Item,{key:"0",onClick:t.navigate("/login")},"Login / Register"),r.a.createElement(h.a.Item,{key:"1",onClick:t.navigate("/admin")},"Admin Panel"),r.a.createElement(h.a.Item,{key:"2",onClick:t.navigate("/partner")},"Partner Panel"),r.a.createElement(h.a.Item,{key:"3",onClick:t.logout},"Logout")],t.state={loggedIn:!1,menuItems:t.menu.slice(0,1)},t.adminPages=[{key:"home",name:"HOME",icon:"home"},{key:"offers",name:"OFFERS",icon:"bars"},{key:"add-offer",name:"ADD OFFER",icon:"plus"},{key:"zones",name:"ZONES",icon:"environment"},{key:"add-zone",name:"ADD ZONE",icon:"plus"},{key:"partners",name:"PARTNERS",icon:"team"},{key:"add-partner",name:"ADD PARTNER",icon:"usergroup-add"},{key:"admins",name:"ADMINS",icon:"user"},{key:"add-admin",name:"ADD ADMIN",icon:"user-add"},{key:"logout",name:"LOGOUT",icon:"logout"}],t.partnerPages=[{key:"home",name:"HOME",icon:"home"},{key:"offers",name:"OFFERS",icon:"bars"},{key:"scan",name:"SCAN",icon:"scan"},{key:"logout",name:"LOGOUT",icon:"logout"}],t.getLoginState=function(){fetch("/api/loggedIn",{credentials:"include"}).then(function(e){return e.json()}).then(function(e){var n=[];e.ok?("admin"===e.type&&n.push(t.menu[1]),"partner"===e.type&&n.push(t.menu[2]),n.push(t.menu[3])):n.push(t.menu[0]),t.setState({loggedIn:e,menuItems:n})}).catch(function(e){console.error(e),t.setState({loggedIn:!1,menuItems:t.menu.slice(0,1)})})},t.getNavContent=function(e){var n=e.location;return/admin|partner/.test(n.href)?null:r.a.createElement(r.a.Fragment,null,r.a.createElement(E.a,{outerContainerId:"root",pageWrapId:"page"},r.a.createElement(g.a,{to:"/"},"Home"),r.a.createElement(g.a,{to:"/about"},"About Us"),r.a.createElement(g.a,{to:"/contact"},"Contact Us")),r.a.createElement(g.a,{to:"/"},r.a.createElement(O,{src:Z.a,alt:"Chomok Logo"})),!/login|register/.test(n.href)&&r.a.createElement(p.a,{overlay:r.a.createElement(h.a,{children:t.state.menuItems}),trigger:["click"]},r.a.createElement(j,{type:"user",onMouseOver:t.getLoginState})))},t.partnerPage=function(e){if(!t.state.loggedIn)return Object(g.e)("/login"),null;switch(e){case"home":return r.a.createElement("img",{src:"https://i.imgur.com/661H1ET.gif",alt:"You're dumb",className:G});case"offers":return r.a.createElement(T.Offers,null);case"scan":return r.a.createElement(T.Scan,null);case"logout":return fetch("/api/logout",{credentials:"include"}).then(function(e){return e.json()}).then(function(e){e.ok&&Object(g.e)("/")}).catch(function(e){return console.error(e)}),Object(g.f)("/");default:return r.a.createElement("h1",null,"Invalid route xD")}},t.adminPage=function(e){if(!t.state.loggedIn)return Object(g.e)("/login"),null;switch(e){case"home":return r.a.createElement("img",{src:"https://i.imgur.com/661H1ET.gif",alt:"You're dumb",className:G});case"offers":return r.a.createElement(D.Offers,null);case"add-offer":return r.a.createElement(D.AddOffer,null);case"zones":return r.a.createElement(D.Zones,null);case"add-zone":return r.a.createElement(D.AddZone,null);case"partners":return r.a.createElement(D.Partners,null);case"add-partner":return r.a.createElement(D.AddPartner,null);case"admins":return r.a.createElement(D.Admins,null);case"add-admin":return r.a.createElement(D.AddAdmin,null);case"logout":return fetch("/api/logout",{credentials:"include"}).then(function(e){return e.json()}).then(function(e){e.ok&&Object(g.e)("/")}).catch(function(e){return console.error(e)}),Object(g.f)("/");default:return r.a.createElement("h1",null,"Invalid route xD")}},t}return Object(d.a)(n,e),Object(c.a)(n,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(g.b,null,this.getNavContent),r.a.createElement(I,{id:"page"},r.a.createElement(N,{path:"/"}),r.a.createElement(z,{path:"/offer/:zone"}),r.a.createElement(L,{path:"/offer/:zone/:type"}),r.a.createElement(g.c,{from:"/admin",path:"/admin",to:"/admin/home",noThrow:!0}),r.a.createElement(D,{path:"/admin/:page",pages:this.adminPages},this.adminPage),r.a.createElement(g.c,{from:"/partner",path:"/partner",to:"/partner/home",noThrow:!0}),r.a.createElement(T,{path:"/partner/:page",pages:this.partnerPages},this.partnerPage),r.a.createElement(R,{path:"/login"}),r.a.createElement(H,{path:"/register"}),r.a.createElement(F,{default:!0})))}},{key:"componentDidMount",value:function(){this.getLoginState(),setTimeout(this.getLoginState,500)}}]),n}(r.a.PureComponent);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(W,null),document.querySelector("#root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},89:function(e,n,t){e.exports=t.p+"static/media/logo.d7374ff8.png"}},[[127,27,25]]]);
//# sourceMappingURL=main.89c6cc3f.chunk.js.map