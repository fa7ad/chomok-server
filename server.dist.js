!function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=21)}([function(e,t,r){"use strict";(function(e){r.d(t,"c",function(){return p}),r.d(t,"l",function(){return b}),r.d(t,"m",function(){return j}),r.d(t,"h",function(){return m}),r.d(t,"b",function(){return y}),r.d(t,"g",function(){return g}),r.d(t,"j",function(){return w}),r.d(t,"d",function(){return O}),r.d(t,"i",function(){return h}),r.d(t,"a",function(){return v}),r.d(t,"f",function(){return x}),r.d(t,"e",function(){return k}),r.d(t,"k",function(){return q});var o=r(5),n=r(6),s=r(10),a=r(1),i=r(11),c=r.n(i),u=r(18),d=r.n(u),l=r(7);c.a.plugin(d.a);const p={port:process.env.PORT||3333,db_prefix:process.env.DB_PREFIX||"ch_",cwd:Object(o.resolve)(process.env.CWD||process.cwd()||e),client:Object(o.resolve)((void 0).cwd,"client","build"),prod:!0},f=e=>new c.a(Object(o.resolve)(p.cwd,"db",p.db_prefix+e)),b=f("users"),j=f("zones"),m=f("offers"),y=f("codes");const g=(e,t)=>()=>new Promise((r,o)=>{e.listen(t,r)});async function w(e){try{await e.get("0a0b1a1b")&&console.log("Admin: prgmlord:Prgml0rd")}catch(t){await async function(e){const t=await l.a.validate({name:"Gott",phone:"01912345678",username:"prgmlord",password:"Prgml0rd",dateReg:s.DateTime.local().toFormat("yyyyLLdd"),email:"superman@admin.com",admin:!0});return t.password=await Object(n.hash)(t.password,10),e.post(t)}(e)&&console.log("Admin: prgmlord:Prgml0rd")}try{await async function(e){return e.createIndex({index:{fields:["username"],ddoc:"users-username-idx"}})}(e)}catch(e){console.log("Failed to index the database")}}function O(e){const t={message:e.isJoi?Object(a.map)(Object(a.prop)("message"),e.details):e.message||"Internal server error"};return{status:e.status||(e.isJoi?400:500),error:t}}const h=Object(a.compose)(Object(a.map)(Object(a.prop)("doc")),Object(a.prop)("rows"));class v extends Error{constructor(e,t){super(t),this.status=e}}const x=()=>s.DateTime.local().toFormat("yyyyLLdd"),k=Object(a.curry)((e,t)=>Object(a.find)(Object(a.whereEq)(e),t)),q=(Object(a.curry)((e,t)=>Object(a.filter)(Object(a.whereEq)(e),t)),e=>Buffer.from(e).toString("base64"))}).call(this,"/")},function(e,t){e.exports=require("ramda")},function(e,t){e.exports=require("joi")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("passport")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("bcrypt")},function(e,t,r){"use strict";var o=r(2),n=r.n(o),s=r(0);const a=n.a.object().keys({name:n.a.string().regex(/^[a-zA-z\s]+$/).min(3).required(),phone:n.a.string().regex(/^(\+88|0088)?0(1[5-9])?\d{8}$/).required(),email:n.a.string().email().required(),username:n.a.string().lowercase().regex(/^[a-z][^\s]{4,}$/).required(),password:n.a.string().required().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/).required(),dateReg:n.a.string().regex(/^\d{8}$/).default(s.f,"Registration date"),admin:n.a.boolean().default(!1),business:n.a.object().keys({address:n.a.string(),name:n.a.string(),phone:n.a.string().regex(/^(\+88|0088)?0(1[5-9])?\d{8}$/)}).requiredKeys(["address","name","phone"]),type:n.a.string().default(e=>e.admin?"admin":e.business?"partner":"user","derived user type")});t.a=a},function(e,t){e.exports=require("express-session")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("luxon")},function(e,t){e.exports=require("pouchdb")},function(e,t){e.exports=require("cors")},function(e,t){e.exports=require("helmet")},function(e,t){e.exports=require("morgan")},function(e,t){e.exports=require("compression")},function(e,t){e.exports=require("memorystore")},function(e,t){e.exports=require("passport-local")},function(e,t){e.exports=require("pouchdb-find")},function(e,t){e.exports=require("shortid")},function(e,t){e.exports=require("qrcode")},function(e,t,r){"use strict";r.r(t);var o=r(5),n=r.n(o),s=r(12),a=r.n(s),i=r(13),c=r.n(i),u=r(14),d=r.n(u),l=r(3),p=r.n(l),f=r(15),b=r.n(f),j=r(16),m=r.n(j),y=r(8),g=r.n(y),w=r(9),O=r(4),h=r.n(O),v=r(17),x=r(1),k=r(6),q=r(7),_=r(0);async function P(e,t,r){try{const o=await q.a.validate(e.body),{docs:n}=await _.l.find({selector:{username:o.username}});if(n.length>0)return void t.status(409).json({ok:!1,error:{message:"Username already exists"}});e.body=Object(x.merge)(o,{password:await Object(k.hash)(o.password,10)}),"user"!==o.type?z(e,t,r):r()}catch(e){const{status:r,error:o}=Object(_.d)(e);t.status(r).json({ok:!1,error:o})}}function z(e,t,r){e.user&&e.user.admin?r():t.status(e.user?403:401).json({ok:!1,error:{message:"Only admin can access this data"}})}function I(e,t,r){if(e.user)return r();t.status(401).json({ok:!1,error:{message:"Please login to access this data"}})}function D(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},o=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),o.forEach(function(t){R(e,t,r[t])})}return e}function R(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const S=Object(l.Router)();S.post("/register",P,function(e,t){_.l.post(D({},e.body)).then(e=>t.json({ok:!0})).catch(e=>t.status(500).json({ok:!1,error:{message:"Internal server error"}}))}),S.post("/login",h.a.authenticate("local",{}),function(e,t){t.json({ok:!0,id:e.user._id,type:e.user.type})}),S.get("/loggedIn",(e,t)=>t.json(D({ok:!!e.user},Object(x.pickAll)(["type","username"],e.user||{})))),S.get("/logout",function(e,t){e.logout(),t.json({ok:!0})});var B=S;const $=Object(l.Router)();$.get("/:type?",async(e,t)=>{try{const{type:r}=e.params,{rows:o}=await _.l.allDocs({include_docs:!0}),n=Object(x.reduce)((e,t)=>{const{doc:o}=t;return o.type===r?[].concat(e,Object(x.omit)(["password"],o)):e},[]);t.json({ok:!0,data:n(o)})}catch(e){t.status(e.notFound?404:500).json({ok:!1,error:{message:e.message||"No users found"}})}}),$.post("/:type?",P,async(e,t)=>{try{if(!await _.l.post(e.body))throw Object(_.a)(500,"Internal server error");t.json({ok:!0})}catch(e){const{status:r,error:o}=Object(_.d)(e);t.status(r).json({ok:!1,error:o})}});var E=$,L=r(2),A=r.n(L);var N=A.a.object().keys({name:A.a.string().required(),division:A.a.string().required()});const F=Object(x.map)(x.toLower),T=Object(l.Router)();T.get("/",async(e,t)=>{try{const e=Object(_.i)(await _.m.allDocs({include_docs:!0}));t.json({ok:!0,data:e})}catch(e){t.status(404).json({ok:!1,error:{message:"No zones found"}})}}),T.post("/",z,async(e,t)=>{const r=F(e.body);try{if((await _.m.find({selector:{name:r.name}})).docs.length>0)throw new _.a(409,"Zone already exists");const e=await N.validate(r);if(!await _.m.post(e))throw new _.a(500,"Internal server error");t.json({ok:!0})}catch(e){const{status:r,error:o}=Object(_.d)(e);t.status(r).json({ok:!1,error:o})}}),T.get("/:div",async(e,t)=>{const{div:r}=F(e.params);try{if(!r)throw new _.a(400,"No division given.");const e=Object(_.i)(await _.m.allDocs({include_docs:!0})),o=Object(x.filter)(Object(x.propEq)("division",r),e);t.json({ok:!0,data:o})}catch(e){const{status:r,error:o}=Object(_.d)(e);t.status(r||404).json({ok:!1,error:o})}}),T.delete("/:id",z,async(e,t)=>{try{const r=await _.m.get(e.params.id);if(!await _.m.remove(r))throw new _.a(500,"Internal server error");t.json({ok:!0})}catch(e){const{error:r,status:o}=Object(_.d)(e);t.status(o).json({ok:!1,error:r})}});var U=T;var M=A.a.object().keys({image:A.a.string().required(),zoneid:A.a.string().required(),partnerid:A.a.string().required(),date:A.a.string().regex(/^\d{8}$/).default(_.f,"Posting Date"),percentage:A.a.number().required().min(0).max(100),reqBy:A.a.array().default([]),useBy:A.a.array().default([])});function Z(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},o=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),o.forEach(function(t){J(e,t,r[t])})}return e}function J(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const C=Object(l.Router)();C.get("/",I,async(e,t)=>{const{type:r}=e.user;try{if(!/^(partner|admin)$/.test(r))throw new _.a(403,"Not allowed");const o=Object(x.filter)(Object(x.propEq)("partnerid",e.user._id)),n=Object(_.i)(await _.h.allDocs({include_docs:!0}));if(!n)throw new _.a(404,"No offers found");const s=await Promise.all(n.map(async e=>{return Z({partner:Object(x.prop)("business")(await _.l.get(e.partnerid)),zone:await _.m.get(e.zoneid)},e)}));t.json({ok:!0,data:"partner"===r?o(s):s})}catch(e){const{status:r,error:o}=Object(_.d)(e);t.status(r).json({ok:!1,error:o})}}),C.get("/:division/:name",async(e,t)=>{const r=Object(x.map)(x.toLower,e.params);try{const e=Object(_.i)(await _.m.allDocs({include_docs:!0})),o=Object(_.e)(r,e);if(!o)throw new _.a(404,"No such zone exists");const n=o._id,s=Object(_.i)(await _.h.allDocs({include_docs:!0})),a=Object(_.e)({zoneid:n,date:Object(_.f)()},s);if(!a)throw new _.a(404,"There's no offer for this region, at the moment");const i=Object(x.prop)("business")(await _.l.get(a.partnerid));if(!i)throw new _.a(500,"Not a valid offer");const c=Object(x.compose)(Object(x.merge)({partner:i}),Object(x.omit)(["reqBy","useBy"]));t.json({ok:!0,data:c(a)})}catch(e){const{status:r,error:o}=Object(_.d)(e);t.status(r).json({ok:!1,error:o})}}),C.post("/",z,async(e,t)=>{try{const r=await M.validate(e.body);if(!await _.h.put(Z({_id:r.zoneid+"_"+Object(_.k)(r.date)},r)))throw new _.a(500,"Internal server error");t.json({ok:!0})}catch(e){const{error:r,status:o}=Object(_.d)(e);t.status(o).json({ok:!1,error:r})}}),C.delete("/:id",z,async(e,t)=>{try{const r=await _.h.get(e.params.id);if(!await _.h.remove(r))throw new _.a(500,"Internal server error");t.json({ok:!0})}catch(e){const{error:r,status:o}=Object(_.d)(e);t.status(o).json({ok:!1,error:r})}});var G=C,K=r(19),W=r.n(K),X=r(20),H=r.n(X);const Q=Object(l.Router)();Q.get("/:offerid",async(e,t)=>{try{const r=await _.h.get(e.params.offerid);if(console.log(r),r.date!==Object(_.f)())throw new _.a(400,"Offer not valid for the date");if(!await _.h.put(Object(x.merge)(r,{reqBy:Object(x.uniq)([].concat(r.reqBy,e.user._id))})))throw new _.a(500,"Internal server error");const o=W.a.generate();if(!await _.b.put({_id:o,offerid:e.params.offerid,userid:e.user._id,validity:r.date,value:r.percentage}))throw new _.a(500,"Internal server error");t.json({ok:!0,data:{code:o,qr:await H.a.toDataURL(o)}})}catch(e){const{status:r,error:o}=Object(_.d)(e);t.status(r).json({ok:!1,error:o})}}),Q.post("/:promoid",async(e,t)=>{try{if("partner"===!e.user.type)throw Object(_.a)(401,"Only partners are allowed to verify");const r=await _.b.get(e.params.promoid);if(!r)throw new _.a(404,"Invalid promo code");const o=e.user._id===r.userid,n=Object(_.f)()===r.validity;if(!o||!n)throw new _.a(400,"Invalid/expired promo code");{const o=await _.h.get(r.offerid);if(!await _.h.put(Object(x.merge)(o,{useBy:Object(x.uniq)([].concat(o.useBy,e.user._id))})))throw new _.a(500,"Internal server error");t.json({ok:!0,data:{percentage:r.value}})}}catch(e){const{status:r,error:o}=Object(_.d)(e);t.status(r).json({ok:!1,error:o})}});var V=Q;const Y=p()(),ee=m()(g.a);Y.use(d()("dev")),Y.use(b()()),Y.use(c()()),Y.use(a()()),Y.set("trust proxy",!0),Y.use(g()({secret:"monkey 13",rolling:!0,resave:!0,saveUninitialized:!0,store:new ee({checkPeriod:864e5}),proxy:_.c.prod,cookie:{maxAge:6e5}})),Y.use(Object(w.urlencoded)({limit:"5mb",extended:!0})),Y.use(Object(w.json)({limit:"5mb",extended:!0})),Y.use(h.a.initialize()),Y.use(h.a.session()),h.a.use("local",new v.Strategy(async function(e,t,r){try{const o=Object(x.path)(["docs",0],await _.l.find({selector:{username:e},use_index:"users-username-idx"}));o?await Object(k.compare)(t,o.password)?r(null,o):r(null,!1,{message:"Incorrect password"}):r(null,!1,{message:"Incorrect username"})}catch(e){r(e)}})),h.a.serializeUser(function(e,t){t(null,e._id)}),h.a.deserializeUser(_.l.get),Y.use(p.a.static(_.c.client)),Y.use("/api",B),Y.use("/api/users",z,E),Y.use("/api/zones",U),Y.use("/api/offers",G),Y.use("/api/codes",I,V),Y.use("*",(e,t)=>{t.sendFile(n.a.join(_.c.client,"index.html"))}),Object(_.j)(_.l).then(Object(_.g)(Y,_.c.port)).then(e=>console.log(`Listening on http://localhost:${_.c.port}`)).catch(console.error)}]);