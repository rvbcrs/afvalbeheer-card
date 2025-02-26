/*! For license information please see afvalbeheer-card.js.LICENSE.txt */
(()=>{"use strict";const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;class r{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}}const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1]),t[0]);return new r(i,t,s)},o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t;var l;const a=window,h=a.trustedTypes,d=h?h.emptyScript:"",c=a.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},u=(t,e)=>e!==t&&(e==e||t==t),v={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:u},g="finalized";class _ extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,s)=>{const i=this._$Ep(s,e);void 0!==i&&(this._$Ev.set(i,s),t.push(i))})),t}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const r=this[t];this[e]=i,this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||v}static finalize(){if(this.hasOwnProperty(g))return!1;this[g]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of e)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Ep(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,s;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var s;const i=null!==(s=this.shadowRoot)&&void 0!==s?s:this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{e?s.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((e=>{const i=document.createElement("style"),r=t.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=v){var i;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const n=(void 0!==(null===(i=s.converter)||void 0===i?void 0:i.toAttribute)?s.converter:p).toAttribute(e,s.type);this._$El=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$El=null}}_$AK(t,e){var s;const i=this.constructor,r=i._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=i.getPropertyOptions(r),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:p;this._$El=r,this[r]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||u)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(s)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}var f;_[g]=!0,_.elementProperties=new Map,_.elementStyles=[],_.shadowRootOptions={mode:"open"},null==c||c({ReactiveElement:_}),(null!==(l=a.reactiveElementVersions)&&void 0!==l?l:a.reactiveElementVersions=[]).push("1.6.3");const $=window,m=$.trustedTypes,A=m?m.createPolicy("lit-html",{createHTML:t=>t}):void 0,y="$lit$",b=`lit$${(Math.random()+"").slice(9)}$`,H="?"+b,w=`<${H}>`,E=document,V=()=>E.createComment(""),x=t=>null===t||"object"!=typeof t&&"function"!=typeof t,S=Array.isArray,C="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,k=/-->/g,N=/>/g,U=RegExp(`>|${C}(?:([^\\s"'>=/]+)(${C}*=${C}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),P=/'/g,O=/"/g,T=/^(?:script|style|textarea|title)$/i,R=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),D=R(1),L=(R(2),Symbol.for("lit-noChange")),B=Symbol.for("lit-nothing"),z=new WeakMap,j=E.createTreeWalker(E,129,null,!1);function I(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const Z=(t,e)=>{const s=t.length-1,i=[];let r,n=2===e?"<svg>":"",o=M;for(let e=0;e<s;e++){const s=t[e];let l,a,h=-1,d=0;for(;d<s.length&&(o.lastIndex=d,a=o.exec(s),null!==a);)d=o.lastIndex,o===M?"!--"===a[1]?o=k:void 0!==a[1]?o=N:void 0!==a[2]?(T.test(a[2])&&(r=RegExp("</"+a[2],"g")),o=U):void 0!==a[3]&&(o=U):o===U?">"===a[0]?(o=null!=r?r:M,h=-1):void 0===a[1]?h=-2:(h=o.lastIndex-a[2].length,l=a[1],o=void 0===a[3]?U:'"'===a[3]?O:P):o===O||o===P?o=U:o===k||o===N?o=M:(o=U,r=void 0);const c=o===U&&t[e+1].startsWith("/>")?" ":"";n+=o===M?s+w:h>=0?(i.push(l),s.slice(0,h)+y+s.slice(h)+b+c):s+b+(-2===h?(i.push(void 0),e):c)}return[I(t,n+(t[s]||"<?>")+(2===e?"</svg>":"")),i]};class W{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0;const o=t.length-1,l=this.parts,[a,h]=Z(t,e);if(this.el=W.createElement(a,s),j.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=j.nextNode())&&l.length<o;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith(y)||e.startsWith(b)){const s=h[n++];if(t.push(e),void 0!==s){const t=i.getAttribute(s.toLowerCase()+y).split(b),e=/([.?@])?(.*)/.exec(s);l.push({type:1,index:r,name:e[2],strings:t,ctor:"."===e[1]?K:"?"===e[1]?X:"@"===e[1]?Y:J})}else l.push({type:6,index:r})}for(const e of t)i.removeAttribute(e)}if(T.test(i.tagName)){const t=i.textContent.split(b),e=t.length-1;if(e>0){i.textContent=m?m.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],V()),j.nextNode(),l.push({type:2,index:++r});i.append(t[e],V())}}}else if(8===i.nodeType)if(i.data===H)l.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(b,t+1));)l.push({type:7,index:r}),t+=b.length-1}r++}}static createElement(t,e){const s=E.createElement("template");return s.innerHTML=t,s}}function F(t,e,s=t,i){var r,n,o,l;if(e===L)return e;let a=void 0!==i?null===(r=s._$Co)||void 0===r?void 0:r[i]:s._$Cl;const h=x(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==h&&(null===(n=null==a?void 0:a._$AO)||void 0===n||n.call(a,!1),void 0===h?a=void 0:(a=new h(t),a._$AT(t,s,i)),void 0!==i?(null!==(o=(l=s)._$Co)&&void 0!==o?o:l._$Co=[])[i]=a:s._$Cl=a),void 0!==a&&(e=F(t,a._$AS(t,e.values),a,i)),e}class q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:i}=this._$AD,r=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:E).importNode(s,!0);j.currentNode=r;let n=j.nextNode(),o=0,l=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new G(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new tt(n,this,t)),this._$AV.push(e),a=i[++l]}o!==(null==a?void 0:a.index)&&(n=j.nextNode(),o++)}return j.currentNode=E,r}v(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class G{constructor(t,e,s,i){var r;this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cp=null===(r=null==i?void 0:i.isConnected)||void 0===r||r}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=F(this,t,e),x(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==L&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>S(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==B&&x(this._$AH)?this._$AA.nextSibling.data=t:this.$(E.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=W.createElement(I(i.h,i.h[0]),this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===r)this._$AH.v(s);else{const t=new q(r,this),e=t.u(this.options);t.v(s),this.$(e),this._$AH=t}}_$AC(t){let e=z.get(t.strings);return void 0===e&&z.set(t.strings,e=new W(t)),e}T(t){S(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new G(this.k(V()),this.k(V()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class J{constructor(t,e,s,i,r){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=B}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const r=this.strings;let n=!1;if(void 0===r)t=F(this,t,e,0),n=!x(t)||t!==this._$AH&&t!==L,n&&(this._$AH=t);else{const i=t;let o,l;for(t=r[0],o=0;o<r.length-1;o++)l=F(this,i[s+o],e,o),l===L&&(l=this._$AH[o]),n||(n=!x(l)||l!==this._$AH[o]),l===B?t=B:t!==B&&(t+=(null!=l?l:"")+r[o+1]),this._$AH[o]=l}n&&!i&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class K extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}const Q=m?m.emptyScript:"";class X extends J{constructor(){super(...arguments),this.type=4}j(t){t&&t!==B?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class Y extends J{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=F(this,t,e,0))&&void 0!==s?s:B)===L)return;const i=this._$AH,r=t===B&&i!==B||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==B&&(i===B||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){F(this,t)}}const et=$.litHtmlPolyfillSupport;var st,it;null==et||et(W,G),(null!==(f=$.litHtmlVersions)&&void 0!==f?f:$.litHtmlVersions=[]).push("2.8.0");class rt extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{var i,r;const n=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let o=n._$litPart$;if(void 0===o){const t=null!==(r=null==s?void 0:s.renderBefore)&&void 0!==r?r:null;n._$litPart$=o=new G(e.insertBefore(V(),t),t,void 0,null!=s?s:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return L}}rt.finalized=!0,rt._$litElement$=!0,null===(st=globalThis.litElementHydrateSupport)||void 0===st||st.call(globalThis,{LitElement:rt});const nt=globalThis.litElementPolyfillSupport;null==nt||nt({LitElement:rt}),(null!==(it=globalThis.litElementVersions)&&void 0!==it?it:globalThis.litElementVersions=[]).push("3.3.3"),customElements.define("afvalbeheer-card",class extends rt{static get properties(){return{hass:{type:Object},config:{type:Object}}}setConfig(t){this.config=t}_getEntityPrefix(){const t=Object.keys(this.hass.states).find((t=>t.includes("afval_kalender_")&&"afvalbeheer"===this.hass.states[t].attributes.integration));if(!t)return"";const e=t.match(/sensor\.(.+?)_afval_kalender/);return e?e[1]:""}static get styles(){return n`
      :host {
        display: block;
        padding: 16px;
      }
      .card-header {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
      }
      .card-header svg {
        margin-right: 8px;
        width: 24px;
        height: 24px;
      }
      .card-header h2 {
        margin: 0;
        font-size: 18px;
        font-weight: bold;
      }
      .waste-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        margin-bottom: 8px;
        border-radius: 8px;
      }
      .waste-item-left {
        display: flex;
        align-items: center;
      }
      .waste-item-icon {
        margin-right: 16px;
      }
      .waste-item-info h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.87);
        text-transform: capitalize;
      }
      .waste-item-info p {
        margin: 4px 0 0;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.7);
        font-weight: 500;
      }
      .waste-item-days {
        text-align: right;
      }
      .waste-item-days span {
        font-size: 22px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.87);
      }
      .waste-item-days p {
        margin: 0;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.7);
        font-weight: 500;
      }
      .today-tomorrow {
        margin-top: 16px;
        font-size: 14px;
      }
      .today-tomorrow div {
        display: flex;
        align-items: center;
        margin-top: 8px;
        color: rgba(0, 0, 0, 0.8);
        font-weight: 500;
        padding: 8px;
        background-color: rgba(240, 240, 240, 0.6);
        border-radius: 4px;
      }
      .today-tomorrow svg {
        width: 16px;
        height: 16px;
        margin-right: 8px;
      }
      .today-tomorrow span {
        color: rgba(0, 0, 0, 0.8);
        font-weight: 500;
      }
      .restafval {
        background-color: rgba(240, 240, 240, 0.8);
        border-left: 4px solid #555;
      }
      .gft {
        background-color: rgba(200, 240, 200, 0.8);
        border-left: 4px solid #4caf50;
      }
      .papier {
        background-color: rgba(200, 230, 255, 0.8);
        border-left: 4px solid #2196f3;
      }
      .pmd {
        background-color: rgba(255, 235, 195, 0.8);
        border-left: 4px solid #ff9800;
      }
    `}_getSensorValue(t){console.log("Opvragen sensor:",t);const e=this.hass.states[t];return console.log("Sensor state:",e),e?(console.log(`Sensor ${t} waarde:`,e.state),e.state):(console.log("Sensor niet gevonden!"),"Onbekend")}_formatDate(t){if(!t||"Onbekend"===t||"Geen"===t)return"Onbekend";if(console.log("Formatting date: ",t),/^\d{2}-\d{2}-\d{4}$/.test(t)){const e=t.split("-"),s=new Date(e[2],e[1]-1,e[0]);if(!isNaN(s.getTime()))return s.toLocaleDateString("nl-NL",{weekday:"long",day:"numeric",month:"long"})}let e=t;if(e.includes(":")&&(e=e.split(":")[0].trim()),e.includes(",")&&(e=e.split(",")[1].trim()),/^\d{2}-\d{2}-\d{4}$/.test(e)){const t=e.split("-"),s=new Date(t[2],t[1]-1,t[0]);if(!isNaN(s.getTime()))return s.toLocaleDateString("nl-NL",{weekday:"long",day:"numeric",month:"long"})}return t}_getDaysUntil(t){if(!t||"Onbekend"===t||"Geen"===t)return"?";if(console.log("Calculating days for: ",t),/^\d{2}-\d{2}-\d{4}$/.test(t)){const e=t.split("-"),s=new Date(e[2],e[1]-1,e[0]);if(!isNaN(s.getTime())){const t=new Date;t.setHours(0,0,0,0);const e=s-t,i=Math.ceil(e/864e5);return i>=0?i:"?"}}let e=t;if(e.includes(":")&&(e=e.split(":")[0].trim()),e.includes(",")&&(e=e.split(",")[1].trim()),/^\d{2}-\d{2}-\d{4}$/.test(e)){const t=e.split("-"),s=new Date(t[2],t[1]-1,t[0]);if(!isNaN(s.getTime())){const t=new Date;t.setHours(0,0,0,0);const e=s-t,i=Math.ceil(e/864e5);return i>=0?i:"?"}}return"?"}render(){if(console.log("Render card:",this.hass?"Hass ready":"No hass"),!this.hass)return D`<div>Loading...</div>`;const t=this._getEntityPrefix();console.log("Gebruikte prefix:",t),[`sensor.${t}_afval_kalender_restafval`,`sensor.${t}_afval_kalender_gft`,"sensor.circulus_berkel_afval_kalender_restafval","sensor.circulus_berkel_afval_kalender_gft"].forEach((t=>{console.log(`Test sensor ${t}:`,this.hass.states[t]?"bestaat":"bestaat niet")}));const e=[{id:"restafval",sensor:"sensor.circulus_berkel_afval_kalender_restafval",icon:D` <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
          style="color: #555;"
        >
          <path
            d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
          />
        </svg>`,class:"restafval"},{id:"gft",sensor:"sensor.circulus_berkel_afval_kalender_gft",icon:D` <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
          style="color: #4CAF50;"
        >
          <path
            d="M2.5,19H21.5V21H2.5V19M22,3H2V8H9.5V10H14.5V8H22V3M4,5H20V6H4V5M11,11H13V14H11V11M7,11H9V14H7V11M15,11H17V14H15V11M7,15H9V18H7V15M11,15H13V18H11V15M15,15H17V18H15V15Z"
          />
        </svg>`,class:"gft"},{id:"papier",sensor:"sensor.circulus_berkel_afval_kalender_papier",icon:D` <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
          style="color: #2196F3;"
        >
          <path
            d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M10,13H8V11H10V13M10,17H8V15H10V17M14,13H12V11H14V13M14,17H12V15H14V17Z"
          />
        </svg>`,class:"papier"},{id:"pmd",sensor:"sensor.circulus_berkel_afval_kalender_pmd",icon:D` <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
          style="color: #FF9800;"
        >
          <path
            d="M12,18A1,1 0 0,1 11,17A1,1 0 0,1 12,16A1,1 0 0,1 13,17A1,1 0 0,1 12,18M12,16A1,1 0 0,1 11,15A1,1 0 0,1 12,14A1,1 0 0,1 13,15A1,1 0 0,1 12,16M12,14A1,1 0 0,1 11,13A1,1 0 0,1 12,12A1,1 0 0,1 13,13A1,1 0 0,1 12,14M19,5V19H5V5H19M21,3H3A2,2 0 0,0 1,5V19A2,2 0 0,0 3,21H21A2,2 0 0,0 23,19V5A2,2 0 0,0 21,3Z"
          />
        </svg>`,class:"pmd"}];return D`
      <ha-card>
        <div class="card-header">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path
              d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
            />
          </svg>
          <h2>Afvalkalender</h2>
        </div>

        ${e.map((t=>{const e=this._getSensorValue(t.sensor),s=this._getDaysUntil(e);return D`
            <div class="waste-item ${t.class}">
              <div class="waste-item-left">
                <div class="waste-item-icon">${t.icon}</div>
                <div class="waste-item-info">
                  <h3>${t.id}</h3>
                  <p>${this._formatDate(e)}</p>
                </div>
              </div>
              <div class="waste-item-days">
                <span>${s}</span>
                <p>dagen</p>
              </div>
            </div>
          `}))}

        <div class="today-tomorrow">
          <div>
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
              style="margin-right: 8px; color: #555;"
            >
              <path
                d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z"
              />
            </svg>
            <span>Vandaag: ${this._getSensorValue("sensor.circulus_berkel_afval_kalender_vandaag")}</span>
          </div>
          <div>
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
              style="margin-right: 8px; color: #555;"
            >
              <path
                d="M13,9H11V12H8V14H11V17H13V14H16V12H13M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z"
              />
            </svg>
            <span>Morgen: ${this._getSensorValue("sensor.circulus_berkel_afval_kalender_morgen")}</span>
          </div>
        </div>
      </ha-card>
    `}})})();
//# sourceMappingURL=afvalbeheer-card.js.map