(self.webpackChunkproject=self.webpackChunkproject||[]).push([[94],{1096:function(n,e,o){"use strict";o.d(e,{Z:function(){return x}});var t,r=o(7462),i=o(3366),a=o(9621),s=o(424),l=o(3004),c=o(2950),d=o(5697),u=o.n(d),f=o(7294),h=o(3935),v=o(6454),p=o(5088),g=o(8833),m=o(6895),b=o(843),E=o(7216),y=function(n){var e;return"undefined"===typeof document?null:null==n?(0,E.Z)().body:("function"===typeof n&&(n=n()),n&&"current"in n&&(n=n.current),null!=(e=n)&&e.nodeType&&n||null)};function k(n){var e=n||(t||(t=new b.Z),t),o=(0,f.useRef)({dialog:null,backdrop:null});return Object.assign(o.current,{add:function(n,t){return e.add(o.current,n,t)},remove:function(){return e.remove(o.current)},isTopModal:function(){return e.isTopModal(o.current)},setDialogRef:(0,f.useCallback)((function(n){o.current.dialog=n}),[]),setBackdropRef:(0,f.useCallback)((function(n){o.current.backdrop=n}),[])})}var Z=(0,f.forwardRef)((function(n,e){var o=n.show,t=void 0!==o&&o,d=n.role,u=void 0===d?"dialog":d,b=n.className,E=n.style,Z=n.children,w=n.backdrop,x=void 0===w||w,C=n.keyboard,O=void 0===C||C,S=n.onBackdropClick,F=n.onEscapeKeyDown,T=n.transition,N=n.backdropTransition,R=n.autoFocus,M=void 0===R||R,B=n.enforceFocus,D=void 0===B||B,H=n.restoreFocus,I=void 0===H||H,j=n.restoreFocusOptions,z=n.renderDialog,A=n.renderBackdrop,K=void 0===A?function(n){return f.createElement("div",n)}:A,L=n.manager,P=n.container,W=n.containerClassName,V=n.onShow,q=n.onHide,G=void 0===q?function(){}:q,J=n.onExit,Q=n.onExited,U=n.onExiting,X=n.onEnter,Y=n.onEntering,$=n.onEntered,_=(0,i.Z)(n,["show","role","className","style","children","backdrop","keyboard","onBackdropClick","onEscapeKeyDown","transition","backdropTransition","autoFocus","enforceFocus","restoreFocus","restoreFocusOptions","renderDialog","renderBackdrop","manager","container","containerClassName","onShow","onHide","onExit","onExited","onExiting","onEnter","onEntering","onEntered"]),nn=function(n,e){var o=(0,f.useState)((function(){return y(n)})),t=o[0],r=o[1];if(!t){var i=y(n);i&&r(i)}return(0,f.useEffect)((function(){e&&t&&e(t)}),[e,t]),(0,f.useEffect)((function(){var e=y(n);e!==t&&r(e)}),[n,t]),t}(P),en=k(L),on=(0,v.Z)(),tn=(0,g.Z)(t),rn=(0,f.useState)(!t),an=rn[0],sn=rn[1],ln=(0,f.useRef)(null);(0,f.useImperativeHandle)(e,(function(){return en}),[en]),l.Z&&!tn&&t&&(ln.current=(0,a.Z)()),T||t||an?t&&an&&sn(!1):sn(!0);var cn=(0,m.Z)((function(){if(en.add(nn,W),pn.current=(0,c.Z)(document,"keydown",hn),vn.current=(0,c.Z)(document,"focus",(function(){return setTimeout(un)}),!0),V&&V(),M){var n=(0,a.Z)(document);en.dialog&&n&&!(0,s.Z)(en.dialog,n)&&(ln.current=n,en.dialog.focus())}})),dn=(0,m.Z)((function(){var n;(en.remove(),null==pn.current||pn.current(),null==vn.current||vn.current(),I)&&(null==(n=ln.current)||null==n.focus||n.focus(j),ln.current=null)}));(0,f.useEffect)((function(){t&&nn&&cn()}),[t,nn,cn]),(0,f.useEffect)((function(){an&&dn()}),[an,dn]),(0,p.Z)((function(){dn()}));var un=(0,m.Z)((function(){if(D&&on()&&en.isTopModal()){var n=(0,a.Z)();en.dialog&&n&&!(0,s.Z)(en.dialog,n)&&en.dialog.focus()}})),fn=(0,m.Z)((function(n){n.target===n.currentTarget&&(null==S||S(n),!0===x&&G())})),hn=(0,m.Z)((function(n){O&&27===n.keyCode&&en.isTopModal()&&(null==F||F(n),n.defaultPrevented||G())})),vn=(0,f.useRef)(),pn=(0,f.useRef)(),gn=T;if(!nn||!(t||gn&&!an))return null;var mn=(0,r.Z)({role:u,ref:en.setDialogRef,"aria-modal":"dialog"===u||void 0},_,{style:E,className:b,tabIndex:-1}),bn=z?z(mn):f.createElement("div",mn,f.cloneElement(Z,{role:"document"}));gn&&(bn=f.createElement(gn,{appear:!0,unmountOnExit:!0,in:!!t,onExit:J,onExiting:U,onExited:function(){sn(!0);for(var n=arguments.length,e=new Array(n),o=0;o<n;o++)e[o]=arguments[o];null==Q||Q.apply(void 0,e)},onEnter:X,onEntering:Y,onEntered:$},bn));var En=null;if(x){var yn=N;En=K({ref:en.setBackdropRef,onClick:fn}),yn&&(En=f.createElement(yn,{appear:!0,in:!!t},En))}return f.createElement(f.Fragment,null,h.createPortal(f.createElement(f.Fragment,null,En,bn),nn))})),w={show:u().bool,container:u().any,onShow:u().func,onHide:u().func,backdrop:u().oneOfType([u().bool,u().oneOf(["static"])]),renderDialog:u().func,renderBackdrop:u().func,onEscapeKeyDown:u().func,onBackdropClick:u().func,containerClassName:u().string,keyboard:u().bool,transition:u().elementType,backdropTransition:u().elementType,autoFocus:u().bool,enforceFocus:u().bool,restoreFocus:u().bool,restoreFocusOptions:u().shape({preventScroll:u().bool}),onEnter:u().func,onEntering:u().func,onEntered:u().func,onExit:u().func,onExiting:u().func,onExited:u().func,manager:u().instanceOf(b.Z)};Z.displayName="Modal",Z.propTypes=w;var x=Object.assign(Z,{Manager:b.Z})},843:function(n,e,o){"use strict";o.d(e,{Z:function(){return h}});var t=o(479),r=o(4277),i=o(3164),a=o(3394),s=o(2513),l=o(7216);function c(n){var e;return(0,s.Z)(n)||(e=n)&&"body"===e.tagName.toLowerCase()?function(n){var e=(0,s.Z)(n)?(0,l.Z)():(0,l.Z)(n),o=(0,s.Z)(n)||e.defaultView;return e.body.clientWidth<o.innerWidth}(n):n.scrollHeight>n.clientHeight}var d=["template","script","style"],u=function(n,e,o){[].forEach.call(n.children,(function(n){var t,r,i;-1===e.indexOf(n)&&(r=(t=n).nodeType,i=t.tagName,1===r&&-1===d.indexOf(i.toLowerCase()))&&o(n)}))};function f(n,e){e&&(n?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden"))}var h=function(){function n(n){var e=void 0===n?{}:n,o=e.hideSiblingNodes,t=void 0===o||o,r=e.handleContainerOverflow,i=void 0===r||r;this.hideSiblingNodes=void 0,this.handleContainerOverflow=void 0,this.modals=void 0,this.containers=void 0,this.data=void 0,this.scrollbarSize=void 0,this.hideSiblingNodes=t,this.handleContainerOverflow=i,this.modals=[],this.containers=[],this.data=[],this.scrollbarSize=(0,a.Z)()}var e=n.prototype;return e.isContainerOverflowing=function(n){var e=this.data[this.containerIndexFromModal(n)];return e&&e.overflowing},e.containerIndexFromModal=function(n){return e=this.data,o=function(e){return-1!==e.modals.indexOf(n)},t=-1,e.some((function(n,e){return!!o(n,e)&&(t=e,!0)})),t;var e,o,t},e.setContainerStyle=function(n,e){var o={overflow:"hidden"};n.style={overflow:e.style.overflow,paddingRight:e.style.paddingRight},n.overflowing&&(o.paddingRight=parseInt((0,i.Z)(e,"paddingRight")||"0",10)+this.scrollbarSize+"px"),(0,i.Z)(e,o)},e.removeContainerStyle=function(n,e){Object.assign(e.style,n.style)},e.add=function(n,e,o){var r=this.modals.indexOf(n),i=this.containers.indexOf(e);if(-1!==r)return r;if(r=this.modals.length,this.modals.push(n),this.hideSiblingNodes&&function(n,e){var o=e.dialog,t=e.backdrop;u(n,[o,t],(function(n){return f(!0,n)}))}(e,n),-1!==i)return this.data[i].modals.push(n),r;var a={modals:[n],classes:o?o.split(/\s+/):[],overflowing:c(e)};return this.handleContainerOverflow&&this.setContainerStyle(a,e),a.classes.forEach(t.Z.bind(null,e)),this.containers.push(e),this.data.push(a),r},e.remove=function(n){var e=this.modals.indexOf(n);if(-1!==e){var o=this.containerIndexFromModal(n),t=this.data[o],i=this.containers[o];if(t.modals.splice(t.modals.indexOf(n),1),this.modals.splice(e,1),0===t.modals.length)t.classes.forEach(r.Z.bind(null,i)),this.handleContainerOverflow&&this.removeContainerStyle(t,i),this.hideSiblingNodes&&function(n,e){var o=e.dialog,t=e.backdrop;u(n,[o,t],(function(n){return f(!1,n)}))}(i,n),this.containers.splice(o,1),this.data.splice(o,1);else if(this.hideSiblingNodes){var a=t.modals[t.modals.length-1],s=a.backdrop;f(!1,a.dialog),f(!1,s)}}},e.isTopModal=function(n){return!!this.modals.length&&this.modals[this.modals.length-1]===n},n}()}}]);