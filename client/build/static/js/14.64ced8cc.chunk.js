(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{436:function(e,t,n){"use strict";n.r(t);var a=n(78),r=n(79),s=n(81),o=n(80),i=n(82),c=n(232),l=n(11),u=n(1),p=n.n(u),m=n(448),d=n(429),h=n(19),f=n(10),g=m.a.Item,b=function(e){function t(){var e,n;Object(a.a)(this,t);for(var r=arguments.length,i=new Array(r),u=0;u<r;u++)i[u]=arguments[u];return(n=Object(s.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(i)))).state={progress:"plus"},n.handleSubmit=function(e){e.preventDefault(),n.setState({progress:"loading"}),n.props.form.validateFieldsAndScroll(function(e,t){if(e)return n.setState({progress:"close"});var a=JSON.stringify(Object(c.e)(c.j,t));fetch("/api/zones",{credentials:"include",method:"POST",headers:{"Content-Type":"application/json"},body:a}).then(function(e){return 401===e.status&&Object(l.e)("/login"),e.json()}).then(function(e){if(!e.ok)throw new Error("Something wrong, again!");n.setState({progress:"check"}),Object(l.e)("/admin/zones")}).catch(function(e){n.setState({progress:"close"}),console.error(e)})})},n}return Object(i.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props.form.getFieldDecorator;return p.a.createElement(m.a,{onSubmit:this.handleSubmit},p.a.createElement(g,null,e("division",{rules:[{required:!0,message:"Please enter a division!"}]})(p.a.createElement(d.a,{placeholder:"Enter a division"}))),p.a.createElement(g,null,e("name",{rules:[{required:!0,message:"Please enter a zone name!"}]})(p.a.createElement(d.a,{placeholder:"Enter a zone name"}))),p.a.createElement(g,null,p.a.createElement(h.a,{type:"close"===this.state.progress?"danger":"primary",htmlType:"submit"},p.a.createElement(f.a,{type:this.state.progress}))))}}]),t}(u.PureComponent),j=m.a.create()(b);t.default=j}}]);
//# sourceMappingURL=14.64ced8cc.chunk.js.map