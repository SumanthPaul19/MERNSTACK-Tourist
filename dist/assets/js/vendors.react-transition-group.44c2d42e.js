(self.webpackChunkproject=self.webpackChunkproject||[]).push([[206],{660:function(t,n,e){"use strict";e.d(n,{cn:function(){return h},d0:function(){return c},ZP:function(){return x}});var i=e(3366),s=e(5978),o=(e(5697),e(7294)),a=e(3935),r=!1,u=o.createContext(null),p="unmounted",l="exited",c="entering",h="entered",d="exiting",f=function(t){function n(n,e){var i;i=t.call(this,n,e)||this;var s,o=e&&!e.isMounting?n.enter:n.appear;return i.appearStatus=null,n.in?o?(s=l,i.appearStatus=c):s=h:s=n.unmountOnExit||n.mountOnEnter?p:l,i.state={status:s},i.nextCallback=null,i}(0,s.Z)(n,t),n.getDerivedStateFromProps=function(t,n){return t.in&&n.status===p?{status:l}:null};var e=n.prototype;return e.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},e.componentDidUpdate=function(t){var n=null;if(t!==this.props){var e=this.state.status;this.props.in?e!==c&&e!==h&&(n=c):e!==c&&e!==h||(n=d)}this.updateStatus(!1,n)},e.componentWillUnmount=function(){this.cancelNextCallback()},e.getTimeouts=function(){var t,n,e,i=this.props.timeout;return t=n=e=i,null!=i&&"number"!==typeof i&&(t=i.exit,n=i.enter,e=void 0!==i.appear?i.appear:n),{exit:t,enter:n,appear:e}},e.updateStatus=function(t,n){void 0===t&&(t=!1),null!==n?(this.cancelNextCallback(),n===c?this.performEnter(t):this.performExit()):this.props.unmountOnExit&&this.state.status===l&&this.setState({status:p})},e.performEnter=function(t){var n=this,e=this.props.enter,i=this.context?this.context.isMounting:t,s=this.props.nodeRef?[i]:[a.findDOMNode(this),i],o=s[0],u=s[1],p=this.getTimeouts(),l=i?p.appear:p.enter;!t&&!e||r?this.safeSetState({status:h},(function(){n.props.onEntered(o)})):(this.props.onEnter(o,u),this.safeSetState({status:c},(function(){n.props.onEntering(o,u),n.onTransitionEnd(l,(function(){n.safeSetState({status:h},(function(){n.props.onEntered(o,u)}))}))})))},e.performExit=function(){var t=this,n=this.props.exit,e=this.getTimeouts(),i=this.props.nodeRef?void 0:a.findDOMNode(this);n&&!r?(this.props.onExit(i),this.safeSetState({status:d},(function(){t.props.onExiting(i),t.onTransitionEnd(e.exit,(function(){t.safeSetState({status:l},(function(){t.props.onExited(i)}))}))}))):this.safeSetState({status:l},(function(){t.props.onExited(i)}))},e.cancelNextCallback=function(){null!==this.nextCallback&&(this.nextCallback.cancel(),this.nextCallback=null)},e.safeSetState=function(t,n){n=this.setNextCallback(n),this.setState(t,n)},e.setNextCallback=function(t){var n=this,e=!0;return this.nextCallback=function(i){e&&(e=!1,n.nextCallback=null,t(i))},this.nextCallback.cancel=function(){e=!1},this.nextCallback},e.onTransitionEnd=function(t,n){this.setNextCallback(n);var e=this.props.nodeRef?this.props.nodeRef.current:a.findDOMNode(this),i=null==t&&!this.props.addEndListener;if(e&&!i){if(this.props.addEndListener){var s=this.props.nodeRef?[this.nextCallback]:[e,this.nextCallback],o=s[0],r=s[1];this.props.addEndListener(o,r)}null!=t&&setTimeout(this.nextCallback,t)}else setTimeout(this.nextCallback,0)},e.render=function(){var t=this.state.status;if(t===p)return null;var n=this.props,e=n.children,s=(n.in,n.mountOnEnter,n.unmountOnExit,n.appear,n.enter,n.exit,n.timeout,n.addEndListener,n.onEnter,n.onEntering,n.onEntered,n.onExit,n.onExiting,n.onExited,n.nodeRef,(0,i.Z)(n,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]));return o.createElement(u.Provider,{value:null},"function"===typeof e?e(t,s):o.cloneElement(o.Children.only(e),s))},n}(o.Component);function E(){}f.contextType=u,f.propTypes={},f.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:E,onEntering:E,onEntered:E,onExit:E,onExiting:E,onExited:E},f.UNMOUNTED=p,f.EXITED=l,f.ENTERING=c,f.ENTERED=h,f.EXITING=d;var x=f}}]);