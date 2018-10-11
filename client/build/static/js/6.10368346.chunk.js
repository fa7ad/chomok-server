(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{220:function(n,e,t){"use strict";function r(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}t.d(e,"a",function(){return r})},235:function(n,e,t){"use strict";t.d(e,"b",function(){return b}),t.d(e,"a",function(){return E});var r=t(220),a=t(93),o=t(21),i=t(1),c=t.n(i),s=t(22);function f(){var n=Object(o.a)(["\n  text-transform: uppercase;\n  font-family: Montserrat, sans-serif;\n  padding: 10px;\n  border: solid 2px #fff;\n  color: #fff;\n  cursor: pointer;\n  outline: none;\n  transition: all 250ms ease;\n  background-color: transparent;\n  background-size: 100% 200%;\n  background-image: linear-gradient(to bottom, transparent 50%, white 50%);\n\n  &:hover {\n    color: #333;\n    background-position: 0 -100%;\n  }\n"]);return f=function(){return n},n}function u(){var n=Object(o.a)(["\n  flex-basis: 50%;\n\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  transition: all 300ms ease;\n  @media (max-width: 640px) {\n    flex-basis: 100%;\n  }\n"]);return u=function(){return n},n}function l(){var n=Object(o.a)(["\n  @media (max-width: 640px) {\n    flex-basis: 100%;\n    display: none;\n  }\n"]);return l=function(){return n},n}function d(){var n=Object(o.a)(["\n  background: rgba(0, 0, 0, 0.45);\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.6);\n  }\n"]);return d=function(){return n},n}var m=Object(s.a)(d()),p=Object(s.a)(l()),b=Object(s.c)(function(n){var e=n.dark,t=n.nophone,o=n.className,i=Object(a.a)(n,["dark","nophone","className"]);return c.a.createElement("section",Object.assign({className:Object(s.b)(o,Object(r.a)({},m,e),Object(r.a)({},p,t))},i))})(u()),E=Object(s.c)("button")(f())},346:function(n,e,t){"use strict";t.r(e);var r=t(1),a=t.n(r),o=t(235),i=t(21),c=t(22),s=t(13);function f(){var n=Object(i.a)(["\n  position: relative;\n\n  margin: 0 24px;\n  height: 48px;\n  width: calc(100% - 48px);\n  z-index: 1;\n\n  display: inline-flex;\n  align-items: center;\n\n  color: #fff;\n  cursor: pointer;\n  background-color: #111;\n\n  transition: all 200ms ease;\n  text-transform: uppercase;\n  font-weight: 400;\n  font-family: Montserrat, sans-serif;\n  filter: drop-shadow(0 0 1px #333333);\n\n\n  &,\n  &:hover,\n  &:link,\n  &:active {\n    text-decoration: none;\n    color: #fff;\n  }\n\n  &:hover {\n    z-index: 2;\n    transform: scale3D(1.08, 1.08, 1.08);\n  }\n\n  &:before,\n  &:after {\n    content: '';\n    position: absolute;\n    width: 34px;\n    height: 34px;\n    background-color: #111;\n    transform: rotate(45deg);\n    z-index: -1;\n  }\n\n  > div {\n    position: absolute;\n\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n\n\n    width: 100%;\n    height: 100%;\n    z-index: 1;\n  }\n\n  &::before {\n    left: -17px;\n  }\n\n  &::after {\n    right: -17px;\n  }\n\n  &:nth-child(odd) {\n    left: 12px;\n  }\n\n  &:nth-child(even) {\n    top: 26px;\n    left: -12px;\n  }\n"]);return f=function(){return n},n}function u(){var n=Object(i.a)(["\n  display: grid;\n  justify-content: center;\n  grid-auto-rows: 48px;\n  grid-template-columns: 1fr 1fr;\n  grid-gap: 4px;\n  padding-bottom: 24px;\n  margin: 0 auto;\n  width: 100%;\n  max-width: ",";\n"]);return u=function(){return n},n}var l=Object(c.c)("div")(u(),function(n){return n.size}),d=Object(c.c)(function(n){return a.a.createElement(s.a,n,a.a.createElement("div",null,n.children))})(f());function m(){var n=Object(i.a)(["\n  width: 75%;\n  text-align: justify;\n  text-transform: uppercase;\n  font-family: Montserrat, sans-serif;\n  margin-bottom: 1.5em;\n\n  max-height: 50vh;\n  overflow: hidden;\n"]);return m=function(){return n},n}function p(){var n=Object(i.a)(["\n  text-transform: uppercase;\n  font-family: Montserrat, sans-serif;\n  padding: 10px;\n  border: solid 2px #fff;\n  color: #fff;\n  transition: all 250ms ease;\n  background-size: 100% 200%;\n  background-image: linear-gradient(to bottom, transparent 50%, white 50%);\n\n  &:hover {\n    color: #333;\n    background-position: 0 -100%;\n  }\n"]);return p=function(){return n},n}function b(){var n=Object(i.a)(["\n  font-family: 'Source Sans Pro', sans-serif;\n  font-weight: 900;\n  font-size: 4em;\n  color: #fefefe;\n  text-transform: uppercase;\n"]);return b=function(){return n},n}var E=Object(c.c)("h1")(b()),g=Object(c.c)(s.a)(p()),x=Object(c.c)("div")(m());e.default=function(n){var e=n.navItems,t=n.style;return a.a.createElement(a.a.Fragment,null,a.a.createElement(o.b,{style:t},a.a.createElement(l,{size:"70%"},e.map(function(n,e){return a.a.createElement(r.Fragment,{key:n._id},e>0&&e%2===0?a.a.createElement("div",null):null,a.a.createElement(d,{to:"/offer/".concat(n.name)},n.name))}))),a.a.createElement(o.b,{dark:!0,nophone:!0,style:t},a.a.createElement(E,null,"CHOMOK"),a.a.createElement(x,null,"LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. ALIQUAM LAOREET ARCU URNA, ET PORTA IPSUM ULLAMCORPER VEL. IN BLANDIT ULTRICES ARCU, AC BLANDIT EX MATTIS EU. AENEAN MALESUADA LUCTUS ERAT IN LUCTUS. UT ULLAMCORPER DICTUM ACCUMSAN. DONEC SED LAOREET URNA. ETIAM VESTIBULUM RUTRUM LACUS. MAECENAS RISUS TORTOR, PULVINAR AC FINIBUS UT, LOBORTIS EGET JUSTO. FUSCE ULTRICES ENIM VEL IPSUM BIBENDUM, SED ACCUMSAN METUS DICTUM."),a.a.createElement(g,{to:"/about"},"Learn more!")))}}}]);
//# sourceMappingURL=6.10368346.chunk.js.map