(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{112:function(e,n,t){"use strict";var r=t(2),a=t.n(r),o=t(7),i=t.n(o),s=t(4),l=t.n(s),u=t(8),c=t.n(u),f=t(3),p=t.n(f),d=t(5),m=t.n(d),h=t(1),b=t(0),x=t(9),g=t.n(x),v=t(217);var y=function(e){function n(){l()(this,n);var e=p()(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments));return e.handleKeyDown=function(n){var t=e.props,r=t.onPressEnter,a=t.onKeyDown;13===n.keyCode&&r&&r(n),a&&a(n)},e.saveInput=function(n){e.input=n},e}return m()(n,e),c()(n,[{key:"focus",value:function(){this.input.focus()}},{key:"blur",value:function(){this.input.blur()}},{key:"select",value:function(){this.input.select()}},{key:"getInputClassName",value:function(){var e,n=this.props,t=n.prefixCls,r=n.size,a=n.disabled;return g()(t,(e={},i()(e,t+"-sm","small"===r),i()(e,t+"-lg","large"===r),i()(e,t+"-disabled",a),e))}},{key:"renderLabeledInput",value:function(e){var n,t=this.props;if(!t.addonBefore&&!t.addonAfter)return e;var r=t.prefixCls+"-group",a=r+"-addon",o=t.addonBefore?h.createElement("span",{className:a},t.addonBefore):null,s=t.addonAfter?h.createElement("span",{className:a},t.addonAfter):null,l=g()(t.prefixCls+"-wrapper",i()({},r,o||s)),u=g()(t.prefixCls+"-group-wrapper",(n={},i()(n,t.prefixCls+"-group-wrapper-sm","small"===t.size),i()(n,t.prefixCls+"-group-wrapper-lg","large"===t.size),n));return h.createElement("span",{className:u,style:t.style},h.createElement("span",{className:l},o,h.cloneElement(e,{style:null}),s))}},{key:"renderLabeledIcon",value:function(e){var n,t=this.props;if(!("prefix"in t||"suffix"in t))return e;var r=t.prefix?h.createElement("span",{className:t.prefixCls+"-prefix"},t.prefix):null,a=t.suffix?h.createElement("span",{className:t.prefixCls+"-suffix"},t.suffix):null,o=g()(t.className,t.prefixCls+"-affix-wrapper",(n={},i()(n,t.prefixCls+"-affix-wrapper-sm","small"===t.size),i()(n,t.prefixCls+"-affix-wrapper-lg","large"===t.size),n));return h.createElement("span",{className:o,style:t.style},r,h.cloneElement(e,{style:null,className:this.getInputClassName()}),a)}},{key:"renderInput",value:function(){var e=this.props,n=e.value,t=e.className,r=Object(v.a)(this.props,["prefixCls","onPressEnter","addonBefore","addonAfter","prefix","suffix"]);return"value"in this.props&&(r.value=function(e){return"undefined"===typeof e||null===e?"":e}(n),delete r.defaultValue),this.renderLabeledIcon(h.createElement("input",a()({},r,{className:g()(this.getInputClassName(),t),onKeyDown:this.handleKeyDown,ref:this.saveInput})))}},{key:"render",value:function(){return this.renderLabeledInput(this.renderInput())}}]),n}(h.Component),w=y;y.defaultProps={prefixCls:"ant-input",type:"text",disabled:!1},y.propTypes={type:b.string,id:b.oneOfType([b.string,b.number]),size:b.oneOf(["small","default","large"]),maxLength:b.oneOfType([b.string,b.number]),disabled:b.bool,value:b.any,defaultValue:b.any,className:b.string,addonBefore:b.node,addonAfter:b.node,prefixCls:b.string,onPressEnter:b.func,onKeyDown:b.func,onKeyUp:b.func,onFocus:b.func,onBlur:b.func,prefix:b.node,suffix:b.node};var O=function(e){var n,t=e.prefixCls,r=void 0===t?"ant-input-group":t,a=e.className,o=void 0===a?"":a,s=g()(r,(n={},i()(n,r+"-lg","large"===e.size),i()(n,r+"-sm","small"===e.size),i()(n,r+"-compact",e.compact),n),o);return h.createElement("span",{className:s,style:e.style,onMouseEnter:e.onMouseEnter,onMouseLeave:e.onMouseLeave,onFocus:e.onFocus,onBlur:e.onBlur},e.children)},E=t(10),C=t(48),j=function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)n.indexOf(r[a])<0&&(t[r[a]]=e[r[a]])}return t},k=function(e){function n(){l()(this,n);var e=p()(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments));return e.onSearch=function(n){var t=e.props.onSearch;t&&t(e.input.input.value,n),e.input.focus()},e.saveInput=function(n){e.input=n},e}return m()(n,e),c()(n,[{key:"focus",value:function(){this.input.focus()}},{key:"blur",value:function(){this.input.blur()}},{key:"getButtonOrIcon",value:function(){var e=this.props,n=e.enterButton,t=e.prefixCls,r=e.size,a=e.disabled,o=n,i=void 0;return i=n?o.type===C.a||"button"===o.type?h.cloneElement(o,o.type===C.a?{className:t+"-button",size:r}:{}):h.createElement(C.a,{className:t+"-button",type:"primary",size:r,disabled:a,key:"enterButton"},!0===n?h.createElement(E.a,{type:"search"}):n):h.createElement(E.a,{className:t+"-icon",type:"search",key:"searchIcon"}),h.cloneElement(i,{onClick:this.onSearch})}},{key:"render",value:function(){var e,n=this.props,t=n.className,r=n.prefixCls,o=n.inputPrefixCls,s=n.size,l=n.suffix,u=n.enterButton,c=j(n,["className","prefixCls","inputPrefixCls","size","suffix","enterButton"]);delete c.onSearch;var f=this.getButtonOrIcon(),p=l?[l,f]:f,d=g()(r,t,(e={},i()(e,r+"-enter-button",!!u),i()(e,r+"-"+s,!!s),e));return h.createElement(w,a()({onPressEnter:this.onSearch},c,{size:s,className:d,prefixCls:o,suffix:p,ref:this.saveInput}))}}]),n}(h.Component),z=k;k.defaultProps={inputPrefixCls:"ant-input",prefixCls:"ant-input-search",enterButton:!1};var N="\n  min-height:0 !important;\n  max-height:none !important;\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important\n",A=["letter-spacing","line-height","padding-top","padding-bottom","font-family","font-weight","font-size","text-rendering","text-transform","width","text-indent","padding-left","padding-right","border-width","box-sizing"],P={},S=void 0;function I(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;S||(S=document.createElement("textarea"),document.body.appendChild(S)),e.getAttribute("wrap")?S.setAttribute("wrap",e.getAttribute("wrap")):S.removeAttribute("wrap");var a=function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],t=e.getAttribute("id")||e.getAttribute("data-reactid")||e.getAttribute("name");if(n&&P[t])return P[t];var r=window.getComputedStyle(e),a=r.getPropertyValue("box-sizing")||r.getPropertyValue("-moz-box-sizing")||r.getPropertyValue("-webkit-box-sizing"),o=parseFloat(r.getPropertyValue("padding-bottom"))+parseFloat(r.getPropertyValue("padding-top")),i=parseFloat(r.getPropertyValue("border-bottom-width"))+parseFloat(r.getPropertyValue("border-top-width")),s={sizingStyle:A.map(function(e){return e+":"+r.getPropertyValue(e)}).join(";"),paddingSize:o,borderSize:i,boxSizing:a};return n&&t&&(P[t]=s),s}(e,n),o=a.paddingSize,i=a.borderSize,s=a.boxSizing,l=a.sizingStyle;S.setAttribute("style",l+";"+N),S.value=e.value||e.placeholder||"";var u=Number.MIN_SAFE_INTEGER,c=Number.MAX_SAFE_INTEGER,f=S.scrollHeight,p=void 0;if("border-box"===s?f+=i:"content-box"===s&&(f-=o),null!==t||null!==r){S.value=" ";var d=S.scrollHeight-o;null!==t&&(u=d*t,"border-box"===s&&(u=u+o+i),f=Math.max(u,f)),null!==r&&(c=d*r,"border-box"===s&&(c=c+o+i),p=f>c?"":"hidden",f=Math.min(c,f))}return r||(p="hidden"),{height:f,minHeight:u,maxHeight:c,overflowY:p}}var T=function(e){function n(){l()(this,n);var e=p()(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments));return e.state={textareaStyles:{}},e.resizeTextarea=function(){var n=e.props.autosize;if(n&&e.textAreaRef){var t=n?n.minRows:null,r=n?n.maxRows:null,a=I(e.textAreaRef,!1,t,r);e.setState({textareaStyles:a})}},e.handleTextareaChange=function(n){"value"in e.props||e.resizeTextarea();var t=e.props.onChange;t&&t(n)},e.handleKeyDown=function(n){var t=e.props,r=t.onPressEnter,a=t.onKeyDown;13===n.keyCode&&r&&r(n),a&&a(n)},e.saveTextAreaRef=function(n){e.textAreaRef=n},e}return m()(n,e),c()(n,[{key:"componentDidMount",value:function(){this.resizeTextarea()}},{key:"componentWillReceiveProps",value:function(e){var n,t;this.props.value!==e.value&&(this.nextFrameActionId&&(t=this.nextFrameActionId,window.cancelAnimationFrame?window.cancelAnimationFrame(t):window.clearTimeout(t)),this.nextFrameActionId=(n=this.resizeTextarea,window.requestAnimationFrame?window.requestAnimationFrame(n):window.setTimeout(n,1)))}},{key:"focus",value:function(){this.textAreaRef.focus()}},{key:"blur",value:function(){this.textAreaRef.blur()}},{key:"getTextAreaClassName",value:function(){var e=this.props,n=e.prefixCls,t=e.className,r=e.disabled;return g()(n,t,i()({},n+"-disabled",r))}},{key:"render",value:function(){var e=this.props,n=Object(v.a)(e,["prefixCls","onPressEnter","autosize"]),t=a()({},e.style,this.state.textareaStyles);return"value"in n&&(n.value=n.value||""),h.createElement("textarea",a()({},n,{className:this.getTextAreaClassName(),style:t,onKeyDown:this.handleKeyDown,onChange:this.handleTextareaChange,ref:this.saveTextAreaRef}))}}]),n}(h.Component),_=T;T.defaultProps={prefixCls:"ant-input"},w.Group=O,w.Search=z,w.TextArea=_;n.a=w},217:function(e,n,t){"use strict";var r=t(2),a=t.n(r);n.a=function(e,n){for(var t=a()({},e),r=0;r<n.length;r++)delete t[n[r]];return t}},227:function(e,n,t){"use strict";function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}t.d(n,"a",function(){return r})},238:function(e,n,t){"use strict";t.d(n,"f",function(){return O}),t.d(n,"e",function(){return E}),t.d(n,"b",function(){return C}),t.d(n,"a",function(){return k}),t.d(n,"d",function(){return z}),t.d(n,"c",function(){return N}),t.d(n,"g",function(){return A});var r=t(227),a=t(56),o=t(20),i=t(1),s=t.n(i),l=t(13),u=t(21);function c(){var e=Object(o.a)(["\n  .ant-modal-content {\n    background: rgba(0, 0, 0, 0.65);\n    text-align: center;\n    border-radius: 0;\n  }\n  .ant-modal-confirm-content,\n  .ant-modal-confirm-title,\n  h3,\n  pre,\n  span {\n    color: #fff;\n  }\n\n  .ant-modal-confirm-content pre {\n    background-color: #fff;\n    color: #111;\n    display: inline-flex;\n    padding: 2px;\n  }\n\n  .ant-modal-confirm-content .the-qr {\n    margin: 15px auto;\n  }\n\n  .ant-modal-confirm-title {\n    text-transform: uppercase;\n    font-size: 1.3em;\n  }\n\n  .ant-modal-confirm-body-wrapper {\n    border: 4px solid #fff;\n    padding: 20px;\n  }\n\n  .ant-modal-confirm-btns {\n    float: none;\n  }\n\n  .ant-modal-confirm-content {\n    margin-left: 0 !important;\n    text-align: center;\n\n    img {\n      width: 100%;\n    }\n  }\n\n  .ant-btn {\n    background: #fff;\n    border-radius: 0;\n    border: none;\n    padding: 0 40px;\n    &,\n    & span {\n      color: #111;\n    }\n  }\n\n  i.anticon {\n    margin-right: 0;\n    display: none;\n  }\n"]);return c=function(){return e},e}function f(){var e=Object(o.a)(["\n  width: 75%;\n  text-align: justify;\n  text-transform: uppercase;\n  font-family: Montserrat, sans-serif;\n  margin-bottom: 1.5em;\n\n  max-height: 50vh;\n  overflow: hidden;\n"]);return f=function(){return e},e}function p(){var e=Object(o.a)(["\n  font-family: 'Source Sans Pro', sans-serif;\n  font-size: 4em;\n  color: #fefefe;\n  text-transform: uppercase;\n"]);return p=function(){return e},e}function d(){var e=Object(o.a)(["\n  text-transform: uppercase;\n  font-family: Montserrat, sans-serif;\n  padding: 10px;\n  border: solid 2px #fff;\n  color: #fff;\n  cursor: pointer;\n  outline: none;\n  transition: background-position 250ms ease, background-color 225ms 50ms ease;\n  background: transparent linear-gradient(to bottom, #fff 50%, transparent 50%)\n    0 100%/100% 200% no-repeat;\n  &:hover {\n    color: #333;\n    background-color: #fff;\n    background-position: 0 0;\n  }\n"]);return d=function(){return e},e}function m(){var e=Object(o.a)(["\n  width: 100%;\n  height: 100%;\n  max-width: 960px;\n  background: rgba(0, 0, 0, 0.25);\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  @media screen and (min-width: 641px) {\n    margin-bottom: 85px;\n  }\n  &, h1, h2, h3, h4, h5 {\n    color: #fff;\n  }\n  form {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    input, textarea{\n      max-width: 900px;\n      width: calc(100% - 10px);\n      margin: 1em 0;\n    }\n    button:last-child {\n      margin: 1em 0;\n    }\n  }\n  form input, form textarea, form button {\n    border-radius: 0;\n    background: rgba(0, 0, 0, 0.5);\n    color: #fff;\n  }\n"]);return m=function(){return e},e}function h(){var e=Object(o.a)(["\n  background-color: #fff;\n  color: #111;\n"]);return h=function(){return e},e}function b(){var e=Object(o.a)(["\n  flex-basis: 100%;\n\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding-top: 85px;\n"]);return b=function(){return e},e}function x(){var e=Object(o.a)(["\n  flex-basis: 50%;\n\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  transition: all 300ms ease;\n  @media (max-width: 639px) {\n    flex-basis: 100%;\n  }\n"]);return x=function(){return e},e}function g(){var e=Object(o.a)(["\n  @media (max-width: 639px) {\n    flex-basis: 100%;\n    display: none;\n  }\n"]);return g=function(){return e},e}function v(){var e=Object(o.a)(["\n  background: rgba(0, 0, 0, 0.45);\n  color: #fff;\n  h1,\n  h2,\n  h3,\n  h4,\n  h5 {\n    color: #fefefe;\n  }\n"]);return v=function(){return e},e}var y=Object(u.a)(v()),w=Object(u.a)(g()),O=Object(u.c)(function(e){var n=e.dark,t=e.nophone,o=e.className,i=Object(a.a)(e,["dark","nophone","className"]);return s.a.createElement("section",Object.assign({className:Object(u.b)(o,Object(r.a)({},y,n),Object(r.a)({},w,t))},i))})(x()),E=Object(u.c)("div")(b());E.White=Object(u.c)(E)(h());var C=Object(u.c)("main")(m()),j=function(e){return Object(u.c)(e)(d())},k=(j("button"),j(l.a)),z=Object(u.c)("h1")(p()),N=Object(u.c)("div")(f()),A=Object(u.a)(c())},569:function(e,n,t){"use strict";t.r(n);var r=t(77),a=t(78),o=t(80),i=t(79),s=t(47),l=t(1),u=t.n(l),c=t(112),f=t(48),p=t(238),d=function(e){function n(){return Object(r.a)(this,n),Object(o.a)(this,Object(i.a)(n).apply(this,arguments))}return Object(s.a)(n,e),Object(a.a)(n,[{key:"render",value:function(){return u.a.createElement(p.e,null,u.a.createElement(p.b,null,u.a.createElement("h1",null,"Contact Us"),u.a.createElement("p",null,"Leave a message, and we will contact you!"),u.a.createElement("form",{action:"https://formspree.io/info@chomok.xyz",method:"POST"},u.a.createElement(c.a,{name:"fullName",placeholder:"Your full Name",required:!0}),u.a.createElement(c.a,{name:"phoneNum",placeholder:"Your phone number",required:!0,type:"tel"}),u.a.createElement(c.a,{name:"email",placeholder:"Your email address",required:!0,type:"email"}),u.a.createElement(c.a.TextArea,{name:"message",placeholder:"Your message",rows:"12",required:!0}),u.a.createElement("input",{type:"hidden",name:"_next",value:"/"}),u.a.createElement("input",{type:"hidden",name:"_format",value:"plain"}),u.a.createElement(f.a,{type:"primary",htmlType:"submit"},"Send!"))))}}]),n}(u.a.PureComponent);n.default=d}}]);
//# sourceMappingURL=31.358137e6.chunk.js.map