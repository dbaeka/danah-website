(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{"5AIy":function(e,t,n){"use strict";n.r(t);var a=n("dI71"),i=n("q1tI"),o=n.n(i),s=n("vrFN");var l=e=>{const t=e.video,n=e.onUserSelected,a=t.thumb_url,i=e.setSelectedIndex,s=e.id===e.selectedIndex;return o.a.createElement("li",{onClick:()=>{i(e.id),n(t)},className:"list-group-item "+(s?"active":"")},o.a.createElement("div",{className:"video-list media"},o.a.createElement("div",{className:"media-first m-auto"},o.a.createElement("span",{className:"media-scope"},"▶")),o.a.createElement("div",{className:"media-left ml-2 mr-2"},o.a.createElement("img",{alt:"",className:"media-object",src:a})),o.a.createElement("div",{className:"media-body m-auto"},o.a.createElement("div",{className:"media-heading font-weight-bold"},t.title))))};var r=e=>{const t=e.videos.map((t,n)=>o.a.createElement(l,{onUserSelected:e.onVideoSelect,setSelectedIndex:e.setSelectedIndex,selectedIndex:e.selectedIndex,key:n,id:n,video:t}));return o.a.createElement("ul",{className:"col-md-4 list-group mt-4 mt-md-0"},t)},c=n("7l9Y"),d=n.n(c);var u=e=>{const t=e.isPlaying;let n=null;const a=e.playing,i=e.video;if(!i)return o.a.createElement("div",{className:"col-md-8"},"Loading...");const s=i.raw_url,l=e.moveNext;return o.a.createElement("div",{className:"video-detail col-md-8"},o.a.createElement("div",{className:"embed-responsive embed-responsive-16by9 player-wrapper"},o.a.createElement(d.a,{ref:e=>n=e,className:"react-player",width:"100%",height:"100%",url:s,playing:a,controls:!0,loop:!1,onPause:()=>{t(!1)},onEnded:()=>l()})),o.a.createElement("div",{className:"details"},o.a.createElement("div",null,i.title)))},m=n("llw9"),p=n("1Yj4"),h=n("ok1R"),v=(n("Wbzz"),n("bw/S")),f=n("fTVs"),y=n("vYyl");let b=function(e){function t(t){var n;return(n=e.call(this,t)||this).state={videos:v.a.getVideos(),selectedVideo:v.a.getVideos().length>0?v.a.getVideos()[0]:null,playing:!1,selectedIndex:0},n.onChange=n.onChange.bind(n),n}Object(a.a)(t,e);var n=t.prototype;return n.componentWillMount=function(){v.a.addChangeListener(this.onChange)},n.componentWillUnmount=function(){v.a.removeChangeListener(this.onChange)},n.componentDidMount=function(){f.a.getVideos()},n.onChange=function(){this.setState({...this.state,videos:v.a.getVideos(),selectedVideo:v.a.getVideos().length>0?v.a.getVideos()[0]:null})},n.render=function(){const{videos:e}=this.state;return o.a.createElement(m.a,null,o.a.createElement(s.a,{title:"Videos"}),o.a.createElement("div",{className:"subpage mb-4"},o.a.createElement("div",{className:"section"},o.a.createElement(p.a,null,o.a.createElement("h3",{className:"title"},"Videos"),o.a.createElement(h.a,null,o.a.createElement(u,{video:this.state.selectedVideo,isPlaying:e=>this.setState({playing:e}),moveNext:()=>{const e=this.state.selectedIndex;e+1<this.state.videos.length&&this.setState({selectedIndex:e+1,playing:!0,selectedVideo:this.state.videos[e+1]})},playing:this.state.playing}),o.a.createElement(r,{onVideoSelect:e=>this.setState({selectedVideo:e,playing:!0}),setSelectedIndex:e=>this.setState({selectedIndex:e}),selectedIndex:this.state.selectedIndex,videos:this.state.videos})),o.a.createElement(y.a.Embed,{id:"videos",websiteId:1128})))))},t}(o.a.Component);t.default=b},vYyl:function(e,t,n){"use strict";var a=n("q1tI"),i=n.n(a);function o(e,t){var n=document.createElement("script");n.src=e,n.id=t,document.body.appendChild(n)}function s(e){var t=document.getElementById(e);e&&t.parentElement.removeChild(t)}var l=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),c=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},d=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},u={Embed:function(e){function t(){return l(this,t),d(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return c(t,e),r(t,[{key:"setVariables",value:function(){window.HYVOR_TALK_WEBSITE=this.props.websiteId,window.HYVOR_TALK_CONFIG={url:this.props.url||!1,id:this.props.id||!1,title:this.props.title||document.title,loadMode:this.props.loadMode||"default",language:this.props.language||null,sso:this.props.sso||null,palette:this.props.palette||null}}},{key:"addScript",value:function(){document.getElementById("ht-embed-script")&&s("ht-embed-script"),o("//talk.hyvor.com/web-api/embed","ht-embed-script")}},{key:"componentDidMount",value:function(){this.setVariables(),this.addScript()}},{key:"render",value:function(){return i.a.createElement("div",{id:"hyvor-talk-view"})}}]),t}(i.a.Component),CommentCount:function(e){function t(){return l(this,t),d(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return c(t,e),r(t,[{key:"setVariables",value:function(){this.props.websiteId&&(window.HYVOR_TALK_WEBSITE=this.props.websiteId)}},{key:"componentDidMount",value:function(){this.setVariables();var e="ht-comment-count-script";document.getElementById(e)&&s(e),o("//talk.hyvor.com/web-api/count/",e)}},{key:"render",value:function(){return i.a.createElement("span",{"data-talk-id":this.props.id,"data-talk-mode":this.props.mode||"default"})}}]),t}(i.a.Component)};t.a=u}}]);
//# sourceMappingURL=component---src-pages-videos-js-1a340cf9b5ba515ffc8d.js.map