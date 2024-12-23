(function () {
  'use strict';

  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function _taggedTemplateLiteral(e, t) {
    return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {
      raw: {
        value: Object.freeze(t)
      }
    }));
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }

  /**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const t$1 = globalThis,
    e$2 = t$1.ShadowRoot && (void 0 === t$1.ShadyCSS || t$1.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
    s$1 = Symbol(),
    o$2 = new WeakMap();
  let n$2 = class n {
    constructor(t, e, o) {
      if (this._$cssResult$ = !0, o !== s$1) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t, this.t = e;
    }
    get styleSheet() {
      let t = this.o;
      const s = this.t;
      if (e$2 && void 0 === t) {
        const e = void 0 !== s && 1 === s.length;
        e && (t = o$2.get(s)), void 0 === t && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), e && o$2.set(s, t));
      }
      return t;
    }
    toString() {
      return this.cssText;
    }
  };
  const r$3 = t => new n$2("string" == typeof t ? t : t + "", void 0, s$1),
    i$3 = function (t) {
      for (var _len = arguments.length, e = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        e[_key - 1] = arguments[_key];
      }
      const o = 1 === t.length ? t[0] : e.reduce((e, s, o) => e + (t => {
        if (!0 === t._$cssResult$) return t.cssText;
        if ("number" == typeof t) return t;
        throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
      })(s) + t[o + 1], t[0]);
      return new n$2(o, t, s$1);
    },
    S$1 = (s, o) => {
      if (e$2) s.adoptedStyleSheets = o.map(t => t instanceof CSSStyleSheet ? t : t.styleSheet);else for (const e of o) {
        const o = document.createElement("style"),
          n = t$1.litNonce;
        void 0 !== n && o.setAttribute("nonce", n), o.textContent = e.cssText, s.appendChild(o);
      }
    },
    c$2 = e$2 ? t => t : t => t instanceof CSSStyleSheet ? (t => {
      let e = "";
      for (const s of t.cssRules) e += s.cssText;
      return r$3(e);
    })(t) : t;

  var _Symbol$metadata, _a$litPropertyMetadat, _a$reactiveElementVer;
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const {
      is: i$2,
      defineProperty: e$1,
      getOwnPropertyDescriptor: r$2,
      getOwnPropertyNames: h$1,
      getOwnPropertySymbols: o$1,
      getPrototypeOf: n$1
    } = Object,
    a$1 = globalThis,
    c$1 = a$1.trustedTypes,
    l$1 = c$1 ? c$1.emptyScript : "",
    p$1 = a$1.reactiveElementPolyfillSupport,
    d$1 = (t, s) => t,
    u$1 = {
      toAttribute(t, s) {
        switch (s) {
          case Boolean:
            t = t ? l$1 : null;
            break;
          case Object:
          case Array:
            t = null == t ? t : JSON.stringify(t);
        }
        return t;
      },
      fromAttribute(t, s) {
        let i = t;
        switch (s) {
          case Boolean:
            i = null !== t;
            break;
          case Number:
            i = null === t ? null : Number(t);
            break;
          case Object:
          case Array:
            try {
              i = JSON.parse(t);
            } catch (t) {
              i = null;
            }
        }
        return i;
      }
    },
    f$1 = (t, s) => !i$2(t, s),
    y$1 = {
      attribute: !0,
      type: String,
      converter: u$1,
      reflect: !1,
      hasChanged: f$1
    };
  (_Symbol$metadata = Symbol.metadata) !== null && _Symbol$metadata !== void 0 ? _Symbol$metadata : Symbol.metadata = Symbol("metadata"), (_a$litPropertyMetadat = a$1.litPropertyMetadata) !== null && _a$litPropertyMetadat !== void 0 ? _a$litPropertyMetadat : a$1.litPropertyMetadata = new WeakMap();
  class b extends HTMLElement {
    static addInitializer(t) {
      var _this$l;
      this._$Ei(), ((_this$l = this.l) !== null && _this$l !== void 0 ? _this$l : this.l = []).push(t);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t) {
      let s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : y$1;
      if (s.state && (s.attribute = !1), this._$Ei(), this.elementProperties.set(t, s), !s.noAccessor) {
        const i = Symbol(),
          r = this.getPropertyDescriptor(t, i, s);
        void 0 !== r && e$1(this.prototype, t, r);
      }
    }
    static getPropertyDescriptor(t, s, i) {
      var _r;
      const {
        get: e,
        set: h
      } = (_r = r$2(this.prototype, t)) !== null && _r !== void 0 ? _r : {
        get() {
          return this[s];
        },
        set(t) {
          this[s] = t;
        }
      };
      return {
        get() {
          return e === null || e === void 0 ? void 0 : e.call(this);
        },
        set(s) {
          const r = e === null || e === void 0 ? void 0 : e.call(this);
          h.call(this, s), this.requestUpdate(t, r, i);
        },
        configurable: !0,
        enumerable: !0
      };
    }
    static getPropertyOptions(t) {
      var _this$elementProperti;
      return (_this$elementProperti = this.elementProperties.get(t)) !== null && _this$elementProperti !== void 0 ? _this$elementProperti : y$1;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d$1("elementProperties"))) return;
      const t = n$1(this);
      t.finalize(), void 0 !== t.l && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d$1("finalized"))) return;
      if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
        const t = this.properties,
          s = [...h$1(t), ...o$1(t)];
        for (const i of s) this.createProperty(i, t[i]);
      }
      const t = this[Symbol.metadata];
      if (null !== t) {
        const s = litPropertyMetadata.get(t);
        if (void 0 !== s) for (const [t, i] of s) this.elementProperties.set(t, i);
      }
      this._$Eh = new Map();
      for (const [t, s] of this.elementProperties) {
        const i = this._$Eu(t, s);
        void 0 !== i && this._$Eh.set(i, t);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s) {
      const i = [];
      if (Array.isArray(s)) {
        const e = new Set(s.flat(1 / 0).reverse());
        for (const s of e) i.unshift(c$2(s));
      } else void 0 !== s && i.push(c$2(s));
      return i;
    }
    static _$Eu(t, s) {
      const i = s.attribute;
      return !1 === i ? void 0 : "string" == typeof i ? i : "string" == typeof t ? t.toLowerCase() : void 0;
    }
    constructor() {
      super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      var _this$constructor$l;
      this._$ES = new Promise(t => this.enableUpdating = t), this._$AL = new Map(), this._$E_(), this.requestUpdate(), (_this$constructor$l = this.constructor.l) === null || _this$constructor$l === void 0 ? void 0 : _this$constructor$l.forEach(t => t(this));
    }
    addController(t) {
      var _this$_$EO, _t$hostConnected;
      ((_this$_$EO = this._$EO) !== null && _this$_$EO !== void 0 ? _this$_$EO : this._$EO = new Set()).add(t), void 0 !== this.renderRoot && this.isConnected && ((_t$hostConnected = t.hostConnected) === null || _t$hostConnected === void 0 ? void 0 : _t$hostConnected.call(t));
    }
    removeController(t) {
      var _this$_$EO2;
      (_this$_$EO2 = this._$EO) === null || _this$_$EO2 === void 0 || _this$_$EO2.delete(t);
    }
    _$E_() {
      const t = new Map(),
        s = this.constructor.elementProperties;
      for (const i of s.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
      t.size > 0 && (this._$Ep = t);
    }
    createRenderRoot() {
      var _this$shadowRoot;
      const t = (_this$shadowRoot = this.shadowRoot) !== null && _this$shadowRoot !== void 0 ? _this$shadowRoot : this.attachShadow(this.constructor.shadowRootOptions);
      return S$1(t, this.constructor.elementStyles), t;
    }
    connectedCallback() {
      var _this$renderRoot, _this$_$EO3;
      (_this$renderRoot = this.renderRoot) !== null && _this$renderRoot !== void 0 ? _this$renderRoot : this.renderRoot = this.createRenderRoot(), this.enableUpdating(!0), (_this$_$EO3 = this._$EO) === null || _this$_$EO3 === void 0 ? void 0 : _this$_$EO3.forEach(t => {
        var _t$hostConnected2;
        return (_t$hostConnected2 = t.hostConnected) === null || _t$hostConnected2 === void 0 ? void 0 : _t$hostConnected2.call(t);
      });
    }
    enableUpdating(t) {}
    disconnectedCallback() {
      var _this$_$EO4;
      (_this$_$EO4 = this._$EO) === null || _this$_$EO4 === void 0 || _this$_$EO4.forEach(t => {
        var _t$hostDisconnected;
        return (_t$hostDisconnected = t.hostDisconnected) === null || _t$hostDisconnected === void 0 ? void 0 : _t$hostDisconnected.call(t);
      });
    }
    attributeChangedCallback(t, s, i) {
      this._$AK(t, i);
    }
    _$EC(t, s) {
      const i = this.constructor.elementProperties.get(t),
        e = this.constructor._$Eu(t, i);
      if (void 0 !== e && !0 === i.reflect) {
        var _i$converter;
        const r = (void 0 !== ((_i$converter = i.converter) === null || _i$converter === void 0 ? void 0 : _i$converter.toAttribute) ? i.converter : u$1).toAttribute(s, i.type);
        this._$Em = t, null == r ? this.removeAttribute(e) : this.setAttribute(e, r), this._$Em = null;
      }
    }
    _$AK(t, s) {
      const i = this.constructor,
        e = i._$Eh.get(t);
      if (void 0 !== e && this._$Em !== e) {
        var _t$converter;
        const t = i.getPropertyOptions(e),
          r = "function" == typeof t.converter ? {
            fromAttribute: t.converter
          } : void 0 !== ((_t$converter = t.converter) === null || _t$converter === void 0 ? void 0 : _t$converter.fromAttribute) ? t.converter : u$1;
        this._$Em = e, this[e] = r.fromAttribute(s, t.type), this._$Em = null;
      }
    }
    requestUpdate(t, s, i) {
      if (void 0 !== t) {
        var _i, _i$hasChanged;
        if ((_i = i) !== null && _i !== void 0 ? _i : i = this.constructor.getPropertyOptions(t), !((_i$hasChanged = i.hasChanged) !== null && _i$hasChanged !== void 0 ? _i$hasChanged : f$1)(this[t], s)) return;
        this.P(t, s, i);
      }
      !1 === this.isUpdatePending && (this._$ES = this._$ET());
    }
    P(t, s, i) {
      var _this$_$Ej;
      this._$AL.has(t) || this._$AL.set(t, s), !0 === i.reflect && this._$Em !== t && ((_this$_$Ej = this._$Ej) !== null && _this$_$Ej !== void 0 ? _this$_$Ej : this._$Ej = new Set()).add(t);
    }
    async _$ET() {
      this.isUpdatePending = !0;
      try {
        await this._$ES;
      } catch (t) {
        Promise.reject(t);
      }
      const t = this.scheduleUpdate();
      return null != t && (await t), !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending) return;
      if (!this.hasUpdated) {
        var _this$renderRoot2;
        if ((_this$renderRoot2 = this.renderRoot) !== null && _this$renderRoot2 !== void 0 ? _this$renderRoot2 : this.renderRoot = this.createRenderRoot(), this._$Ep) {
          for (const [t, s] of this._$Ep) this[t] = s;
          this._$Ep = void 0;
        }
        const t = this.constructor.elementProperties;
        if (t.size > 0) for (const [s, i] of t) !0 !== i.wrapped || this._$AL.has(s) || void 0 === this[s] || this.P(s, this[s], i);
      }
      let t = !1;
      const s = this._$AL;
      try {
        var _this$_$EO5;
        t = this.shouldUpdate(s), t ? (this.willUpdate(s), (_this$_$EO5 = this._$EO) !== null && _this$_$EO5 !== void 0 && _this$_$EO5.forEach(t => {
          var _t$hostUpdate;
          return (_t$hostUpdate = t.hostUpdate) === null || _t$hostUpdate === void 0 ? void 0 : _t$hostUpdate.call(t);
        }), this.update(s)) : this._$EU();
      } catch (s) {
        throw t = !1, this._$EU(), s;
      }
      t && this._$AE(s);
    }
    willUpdate(t) {}
    _$AE(t) {
      var _this$_$EO6;
      (_this$_$EO6 = this._$EO) !== null && _this$_$EO6 !== void 0 && _this$_$EO6.forEach(t => {
        var _t$hostUpdated;
        return (_t$hostUpdated = t.hostUpdated) === null || _t$hostUpdated === void 0 ? void 0 : _t$hostUpdated.call(t);
      }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
    }
    _$EU() {
      this._$AL = new Map(), this.isUpdatePending = !1;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(t) {
      return !0;
    }
    update(t) {
      this._$Ej && (this._$Ej = this._$Ej.forEach(t => this._$EC(t, this[t]))), this._$EU();
    }
    updated(t) {}
    firstUpdated(t) {}
  }
  b.elementStyles = [], b.shadowRootOptions = {
    mode: "open"
  }, b[d$1("elementProperties")] = new Map(), b[d$1("finalized")] = new Map(), p$1 !== null && p$1 !== void 0 && p$1({
    ReactiveElement: b
  }), ((_a$reactiveElementVer = a$1.reactiveElementVersions) !== null && _a$reactiveElementVer !== void 0 ? _a$reactiveElementVer : a$1.reactiveElementVersions = []).push("2.0.4");

  var _t$litHtmlVersions;
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const t = globalThis,
    i$1 = t.trustedTypes,
    s = i$1 ? i$1.createPolicy("lit-html", {
      createHTML: t => t
    }) : void 0,
    e = "$lit$",
    h = "lit$".concat(Math.random().toFixed(9).slice(2), "$"),
    o = "?" + h,
    n = "<".concat(o, ">"),
    r$1 = document,
    l = () => r$1.createComment(""),
    c = t => null === t || "object" != typeof t && "function" != typeof t,
    a = Array.isArray,
    u = t => a(t) || "function" == typeof (t === null || t === void 0 ? void 0 : t[Symbol.iterator]),
    d = "[ \t\n\f\r]",
    f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
    v = /-->/g,
    _ = />/g,
    m = RegExp(">|".concat(d, "(?:([^\\s\"'>=/]+)(").concat(d, "*=").concat(d, "*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)"), "g"),
    p = /'/g,
    g = /"/g,
    $ = /^(?:script|style|textarea|title)$/i,
    y = t => function (i) {
      for (var _len = arguments.length, s = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        s[_key - 1] = arguments[_key];
      }
      return {
        _$litType$: t,
        strings: i,
        values: s
      };
    },
    x = y(1),
    T = Symbol.for("lit-noChange"),
    E = Symbol.for("lit-nothing"),
    A = new WeakMap(),
    C = r$1.createTreeWalker(r$1, 129);
  function P(t, i) {
    if (!a(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== s ? s.createHTML(i) : i;
  }
  const V = (t, i) => {
    const s = t.length - 1,
      o = [];
    let r,
      l = 2 === i ? "<svg>" : 3 === i ? "<math>" : "",
      c = f;
    for (let i = 0; i < s; i++) {
      const s = t[i];
      let a,
        u,
        d = -1,
        y = 0;
      for (; y < s.length && (c.lastIndex = y, u = c.exec(s), null !== u);) {
        var _r;
        y = c.lastIndex, c === f ? "!--" === u[1] ? c = v : void 0 !== u[1] ? c = _ : void 0 !== u[2] ? ($.test(u[2]) && (r = RegExp("</" + u[2], "g")), c = m) : void 0 !== u[3] && (c = m) : c === m ? ">" === u[0] ? (c = (_r = r) !== null && _r !== void 0 ? _r : f, d = -1) : void 0 === u[1] ? d = -2 : (d = c.lastIndex - u[2].length, a = u[1], c = void 0 === u[3] ? m : '"' === u[3] ? g : p) : c === g || c === p ? c = m : c === v || c === _ ? c = f : (c = m, r = void 0);
      }
      const x = c === m && t[i + 1].startsWith("/>") ? " " : "";
      l += c === f ? s + n : d >= 0 ? (o.push(a), s.slice(0, d) + e + s.slice(d) + h + x) : s + h + (-2 === d ? i : x);
    }
    return [P(t, l + (t[s] || "<?>") + (2 === i ? "</svg>" : 3 === i ? "</math>" : "")), o];
  };
  class N {
    constructor(_ref, n) {
      let {
        strings: t,
        _$litType$: s
      } = _ref;
      let r;
      this.parts = [];
      let c = 0,
        a = 0;
      const u = t.length - 1,
        d = this.parts,
        [f, v] = V(t, s);
      if (this.el = N.createElement(f, n), C.currentNode = this.el.content, 2 === s || 3 === s) {
        const t = this.el.content.firstChild;
        t.replaceWith(...t.childNodes);
      }
      for (; null !== (r = C.nextNode()) && d.length < u;) {
        if (1 === r.nodeType) {
          if (r.hasAttributes()) for (const t of r.getAttributeNames()) if (t.endsWith(e)) {
            const i = v[a++],
              s = r.getAttribute(t).split(h),
              e = /([.?@])?(.*)/.exec(i);
            d.push({
              type: 1,
              index: c,
              name: e[2],
              strings: s,
              ctor: "." === e[1] ? H : "?" === e[1] ? I : "@" === e[1] ? L : k
            }), r.removeAttribute(t);
          } else t.startsWith(h) && (d.push({
            type: 6,
            index: c
          }), r.removeAttribute(t));
          if ($.test(r.tagName)) {
            const t = r.textContent.split(h),
              s = t.length - 1;
            if (s > 0) {
              r.textContent = i$1 ? i$1.emptyScript : "";
              for (let i = 0; i < s; i++) r.append(t[i], l()), C.nextNode(), d.push({
                type: 2,
                index: ++c
              });
              r.append(t[s], l());
            }
          }
        } else if (8 === r.nodeType) if (r.data === o) d.push({
          type: 2,
          index: c
        });else {
          let t = -1;
          for (; -1 !== (t = r.data.indexOf(h, t + 1));) d.push({
            type: 7,
            index: c
          }), t += h.length - 1;
        }
        c++;
      }
    }
    static createElement(t, i) {
      const s = r$1.createElement("template");
      return s.innerHTML = t, s;
    }
  }
  function S(t, i) {
    var _s$_$Co, _h, _h2, _h2$_$AO, _s$_$Co2;
    let s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : t;
    let e = arguments.length > 3 ? arguments[3] : undefined;
    if (i === T) return i;
    let h = void 0 !== e ? (_s$_$Co = s._$Co) === null || _s$_$Co === void 0 ? void 0 : _s$_$Co[e] : s._$Cl;
    const o = c(i) ? void 0 : i._$litDirective$;
    return ((_h = h) === null || _h === void 0 ? void 0 : _h.constructor) !== o && ((_h2 = h) !== null && _h2 !== void 0 && (_h2$_$AO = _h2._$AO) !== null && _h2$_$AO !== void 0 && _h2$_$AO.call(_h2, !1), void 0 === o ? h = void 0 : (h = new o(t), h._$AT(t, s, e)), void 0 !== e ? ((_s$_$Co2 = s._$Co) !== null && _s$_$Co2 !== void 0 ? _s$_$Co2 : s._$Co = [])[e] = h : s._$Cl = h), void 0 !== h && (i = S(t, h._$AS(t, i.values), h, e)), i;
  }
  class M {
    constructor(t, i) {
      this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t) {
      var _t$creationScope;
      const {
          el: {
            content: i
          },
          parts: s
        } = this._$AD,
        e = ((_t$creationScope = t === null || t === void 0 ? void 0 : t.creationScope) !== null && _t$creationScope !== void 0 ? _t$creationScope : r$1).importNode(i, !0);
      C.currentNode = e;
      let h = C.nextNode(),
        o = 0,
        n = 0,
        l = s[0];
      for (; void 0 !== l;) {
        var _l;
        if (o === l.index) {
          let i;
          2 === l.type ? i = new R(h, h.nextSibling, this, t) : 1 === l.type ? i = new l.ctor(h, l.name, l.strings, this, t) : 6 === l.type && (i = new z(h, this, t)), this._$AV.push(i), l = s[++n];
        }
        o !== ((_l = l) === null || _l === void 0 ? void 0 : _l.index) && (h = C.nextNode(), o++);
      }
      return C.currentNode = r$1, e;
    }
    p(t) {
      let i = 0;
      for (const s of this._$AV) void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
    }
  }
  class R {
    get _$AU() {
      var _this$_$AM$_$AU, _this$_$AM;
      return (_this$_$AM$_$AU = (_this$_$AM = this._$AM) === null || _this$_$AM === void 0 ? void 0 : _this$_$AM._$AU) !== null && _this$_$AM$_$AU !== void 0 ? _this$_$AM$_$AU : this._$Cv;
    }
    constructor(t, i, s, e) {
      var _e$isConnected;
      this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cv = (_e$isConnected = e === null || e === void 0 ? void 0 : e.isConnected) !== null && _e$isConnected !== void 0 ? _e$isConnected : !0;
    }
    get parentNode() {
      var _t;
      let t = this._$AA.parentNode;
      const i = this._$AM;
      return void 0 !== i && 11 === ((_t = t) === null || _t === void 0 ? void 0 : _t.nodeType) && (t = i.parentNode), t;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t) {
      let i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      t = S(this, t, i), c(t) ? t === E || null == t || "" === t ? (this._$AH !== E && this._$AR(), this._$AH = E) : t !== this._$AH && t !== T && this._(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.T(t) : u(t) ? this.k(t) : this._(t);
    }
    O(t) {
      return this._$AA.parentNode.insertBefore(t, this._$AB);
    }
    T(t) {
      this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
    }
    _(t) {
      this._$AH !== E && c(this._$AH) ? this._$AA.nextSibling.data = t : this.T(r$1.createTextNode(t)), this._$AH = t;
    }
    $(t) {
      var _this$_$AH;
      const {
          values: i,
          _$litType$: s
        } = t,
        e = "number" == typeof s ? this._$AC(t) : (void 0 === s.el && (s.el = N.createElement(P(s.h, s.h[0]), this.options)), s);
      if (((_this$_$AH = this._$AH) === null || _this$_$AH === void 0 ? void 0 : _this$_$AH._$AD) === e) this._$AH.p(i);else {
        const t = new M(e, this),
          s = t.u(this.options);
        t.p(i), this.T(s), this._$AH = t;
      }
    }
    _$AC(t) {
      let i = A.get(t.strings);
      return void 0 === i && A.set(t.strings, i = new N(t)), i;
    }
    k(t) {
      a(this._$AH) || (this._$AH = [], this._$AR());
      const i = this._$AH;
      let s,
        e = 0;
      for (const h of t) e === i.length ? i.push(s = new R(this.O(l()), this.O(l()), this, this.options)) : s = i[e], s._$AI(h), e++;
      e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
    }
    _$AR() {
      let t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._$AA.nextSibling;
      let i = arguments.length > 1 ? arguments[1] : undefined;
      for ((_this$_$AP = this._$AP) === null || _this$_$AP === void 0 ? void 0 : _this$_$AP.call(this, !1, !0, i); t && t !== this._$AB;) {
        var _this$_$AP;
        const i = t.nextSibling;
        t.remove(), t = i;
      }
    }
    setConnected(t) {
      var _this$_$AP2;
      void 0 === this._$AM && (this._$Cv = t, (_this$_$AP2 = this._$AP) === null || _this$_$AP2 === void 0 ? void 0 : _this$_$AP2.call(this, t));
    }
  }
  class k {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t, i, s, e, h) {
      this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = h, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = E;
    }
    _$AI(t) {
      let i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      let s = arguments.length > 2 ? arguments[2] : undefined;
      let e = arguments.length > 3 ? arguments[3] : undefined;
      const h = this.strings;
      let o = !1;
      if (void 0 === h) t = S(this, t, i, 0), o = !c(t) || t !== this._$AH && t !== T, o && (this._$AH = t);else {
        const e = t;
        let n, r;
        for (t = h[0], n = 0; n < h.length - 1; n++) {
          var _r2;
          r = S(this, e[s + n], i, n), r === T && (r = this._$AH[n]), o || (o = !c(r) || r !== this._$AH[n]), r === E ? t = E : t !== E && (t += ((_r2 = r) !== null && _r2 !== void 0 ? _r2 : "") + h[n + 1]), this._$AH[n] = r;
        }
      }
      o && !e && this.j(t);
    }
    j(t) {
      t === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t !== null && t !== void 0 ? t : "");
    }
  }
  class H extends k {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t) {
      this.element[this.name] = t === E ? void 0 : t;
    }
  }
  class I extends k {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t) {
      this.element.toggleAttribute(this.name, !!t && t !== E);
    }
  }
  class L extends k {
    constructor(t, i, s, e, h) {
      super(t, i, s, e, h), this.type = 5;
    }
    _$AI(t) {
      var _S;
      let i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      if ((t = (_S = S(this, t, i, 0)) !== null && _S !== void 0 ? _S : E) === T) return;
      const s = this._$AH,
        e = t === E && s !== E || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive,
        h = t !== E && (s === E || e);
      e && this.element.removeEventListener(this.name, this, s), h && this.element.addEventListener(this.name, this, t), this._$AH = t;
    }
    handleEvent(t) {
      var _this$options$host, _this$options;
      "function" == typeof this._$AH ? this._$AH.call((_this$options$host = (_this$options = this.options) === null || _this$options === void 0 ? void 0 : _this$options.host) !== null && _this$options$host !== void 0 ? _this$options$host : this.element, t) : this._$AH.handleEvent(t);
    }
  }
  class z {
    constructor(t, i, s) {
      this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t) {
      S(this, t);
    }
  }
  const j = t.litHtmlPolyfillSupport;
  j !== null && j !== void 0 && j(N, R), ((_t$litHtmlVersions = t.litHtmlVersions) !== null && _t$litHtmlVersions !== void 0 ? _t$litHtmlVersions : t.litHtmlVersions = []).push("3.2.1");
  const B = (t, i, s) => {
    var _s$renderBefore;
    const e = (_s$renderBefore = s === null || s === void 0 ? void 0 : s.renderBefore) !== null && _s$renderBefore !== void 0 ? _s$renderBefore : i;
    let h = e._$litPart$;
    if (void 0 === h) {
      var _s$renderBefore2;
      const t = (_s$renderBefore2 = s === null || s === void 0 ? void 0 : s.renderBefore) !== null && _s$renderBefore2 !== void 0 ? _s$renderBefore2 : null;
      e._$litPart$ = h = new R(i.insertBefore(l(), t), t, void 0, s !== null && s !== void 0 ? s : {});
    }
    return h._$AI(t), h;
  };

  var _globalThis$litElemen, _globalThis$litElemen2;
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  class r extends b {
    constructor() {
      super(...arguments), this.renderOptions = {
        host: this
      }, this._$Do = void 0;
    }
    createRenderRoot() {
      var _this$renderOptions, _this$renderOptions$r;
      const t = super.createRenderRoot();
      return (_this$renderOptions$r = (_this$renderOptions = this.renderOptions).renderBefore) !== null && _this$renderOptions$r !== void 0 ? _this$renderOptions$r : _this$renderOptions.renderBefore = t.firstChild, t;
    }
    update(t) {
      const s = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = B(s, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var _this$_$Do;
      super.connectedCallback(), (_this$_$Do = this._$Do) === null || _this$_$Do === void 0 ? void 0 : _this$_$Do.setConnected(!0);
    }
    disconnectedCallback() {
      var _this$_$Do2;
      super.disconnectedCallback(), (_this$_$Do2 = this._$Do) === null || _this$_$Do2 === void 0 ? void 0 : _this$_$Do2.setConnected(!1);
    }
    render() {
      return T;
    }
  }
  r._$litElement$ = !0, r["finalized"] = !0, (_globalThis$litElemen = globalThis.litElementHydrateSupport) === null || _globalThis$litElemen === void 0 ? void 0 : _globalThis$litElemen.call(globalThis, {
    LitElement: r
  });
  const i = globalThis.litElementPolyfillSupport;
  i === null || i === void 0 || i({
    LitElement: r
  });
  ((_globalThis$litElemen2 = globalThis.litElementVersions) !== null && _globalThis$litElemen2 !== void 0 ? _globalThis$litElemen2 : globalThis.litElementVersions = []).push("4.1.1");

  var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
  class GeweNotifyCard extends r {
    static get properties() {
      return {
        hass: {
          type: Object
        },
        _config: {
          type: Object
        },
        currentTab: {
          type: String
        },
        page: {
          type: Number
        },
        friends: {
          type: Array
        },
        chatrooms: {
          type: Array
        },
        filteredFriends: {
          type: Array
        },
        filteredChatrooms: {
          type: Array
        },
        filterText: {
          type: String
        },
        filterTimeout: {
          type: Number
        }
      };
    }
    constructor() {
      super();
      this.currentTab = 'friends';
      this.page = 1;
      this.friends = [];
      this.chatrooms = [];
      this.filteredFriends = [];
      this.filteredChatrooms = [];
      this.filterText = '';
      this.filterTimeout = null;
      this.hass = {};
      this._config = {};
    }
    setConfig(config) {
      this._config = config;
    }
    updated(changedProperties) {
      if (changedProperties.has('hass')) {
        this.fetchData();
      }
      if (changedProperties.has('filterText')) {
        clearTimeout(this.filterTimeout);
        this.filterTimeout = setTimeout(() => {
          this.filterData();
          this.page = 1;
        }, 300);
      }
    }
    fetchData() {
      if (!this.hass) return;
      this.hass.callApi('GET', 'gewe_contacts').then(result => {
        console.log('API call result:', result);
        this.friends = result.friends || [];
        this.chatrooms = result.chatrooms || [];
        this.filterData();
      }).catch(error => {
        console.error('Error fetching contacts:', error);
      });
    }
    filterData() {
      const filterText = this.filterText.toLowerCase();
      this.filteredFriends = this.friends.filter(item => [item.userName, item.nickName, item.remark].join(' ').toLowerCase().includes(filterText));
      this.filteredChatrooms = this.chatrooms.filter(item => [item.userName, item.nickName, item.remark].join(' ').toLowerCase().includes(filterText));
    }
    handleTabChange(tab) {
      this.currentTab = tab;
      this.page = 1;
    }
    handlePageChange(page) {
      this.page = page;
    }
    handleFilterChange(event) {
      this.filterText = event.target.value;
    }
    render() {
      if (!this.hass || !this._config) {
        return x(_templateObject || (_templateObject = _taggedTemplateLiteral([""])));
      }
      const itemsPerPage = 5;
      const currentPageData = this.currentTab === 'friends' ? this.filteredFriends : this.filteredChatrooms;
      const totalPages = Math.ceil(currentPageData.length / itemsPerPage);
      const startIndex = (this.page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentPageDataSlice = currentPageData.slice(startIndex, endIndex);

      // 列名数组，与数据项数组对应
      const columnNames = ['Avatar', 'Username', 'Nickname', 'Remark'];
      return x(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n      <ha-card class=\"card\">\n        <h1>Contacts</h1>\n\n        <div class=\"filter-container\">\n          <input\n            class=\"filter-input\"\n            type=\"text\"\n            .value=\"", "\"\n            @input=\"", "\"\n            placeholder=\"Filter by userName, nickName, or remark\"\n          />\n        </div>\n\n        <div class=\"tab-container\">\n          <div class=\"tab ", "\" @click=\"", "\">\n            Friends\n          </div>\n          <div class=\"tab ", "\" @click=\"", "\">\n            Chatrooms\n          </div>\n        </div>\n\n        <div class=\"data-list\">\n          <div class=\"data-item\">\n            ", "\n          </div>\n          ", "\n        </div>\n\n        <div class=\"pagination\">\n          ", "\n          <span>Page ", " of ", "</span>\n          ", "\n        </div>\n      </ha-card>\n    "])), this.filterText, this.handleFilterChange, this.currentTab === 'friends' ? 'active' : '', () => this.handleTabChange('friends'), this.currentTab === 'chatrooms' ? 'active' : '', () => this.handleTabChange('chatrooms'), columnNames.map(column => x(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n              <div class=\"column-name\">", "</div>\n            "])), column)), currentPageDataSlice.map(item => x(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n            <div class=\"data-item\">\n              <img class=\"avatar\" src=\"", "\" alt=\"avatar\" />\n              <div>", "</div>\n              <div>", "</div>\n              <div>", "</div>\n            </div>\n          "])), item.smallHeadImgUrl || '/local/default-avatar.png', item.userName, item.nickName, item.remark)), this.page > 1 ? x(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n            <button class=\"page-button\" @click=\"", "\">Previous</button>\n          "])), () => this.handlePageChange(this.page - 1)) : '', this.page, totalPages, this.page < totalPages ? x(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n            <button class=\"page-button\" @click=\"", "\">Next</button>\n          "])), () => this.handlePageChange(this.page + 1)) : '');
    }
  }
  _defineProperty(GeweNotifyCard, "styles", i$3(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n    :host {\n      display: block;\n      font-family: 'Roboto', sans-serif;\n      --primary-color: #6200ea;\n      --secondary-color: #03dac6;\n      --background-color: #f9f9f9;\n      --card-background: #ffffff;\n      --border-radius: 8px;\n    }\n\n    .card {\n      padding: 16px;\n      background: var(--card-background);\n      border-radius: var(--border-radius);\n      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n      font-size: 14px;\n    }\n\n    h1 {\n      font-size: 24px;\n      font-weight: 500;\n      margin-bottom: 16px;\n      color: var(--primary-color);\n    }\n\n    .tab-container {\n      display: flex;\n      margin-bottom: 16px;\n      border-bottom: 2px solid #e0e0e0;\n    }\n\n    .tab {\n      flex: 1;\n      padding: 12px 0;\n      text-align: center;\n      cursor: pointer;\n      font-weight: bold;\n      color: #555;\n      transition: background-color 0.3s, color 0.3s;\n    }\n\n    .tab.active {\n      background-color: var(--primary-color);\n      color: white;\n      border-bottom: 3px solid white;\n    }\n\n    .filter-container {\n      margin-bottom: 16px;\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n    }\n\n    .filter-input {\n      padding: 10px 12px;\n      width: 60%;\n      border-radius: 25px;\n      border: 1px solid #ccc;\n      font-size: 14px;\n      box-sizing: border-box;\n      background-color: #f1f1f1;\n      transition: background-color 0.3s;\n    }\n\n    .filter-input:focus {\n      background-color: #ffffff;\n      outline: none;\n      border-color: var(--primary-color);\n    }\n\n    .data-list {\n      margin-bottom: 20px;\n      display: flex;\n      flex-direction: column;\n    }\n\n    .data-item {\n      display: flex;\n      align-items: center;\n      margin-bottom: 16px;\n      padding: 12px;\n      background-color: #f9f9f9;\n      border-radius: 8px;\n      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n      transition: background-color 0.3s, transform 0.3s;\n    }\n\n    .data-item:hover {\n      background-color: #f1f1f1;\n      transform: translateX(5px);\n    }\n\n    .avatar {\n      width: 50px;\n      height: 50px;\n      border-radius: 50%;\n      margin-right: 16px;\n      object-fit: cover;\n    }\n\n    .column-name {\n      font-weight: bold;\n      color: #666;\n      margin-right: 20px;\n      text-transform: uppercase;\n      letter-spacing: 1px;\n    }\n\n    .pagination {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      gap: 10px;\n      margin-top: 20px;\n    }\n\n    .page-button {\n      padding: 8px 16px;\n      background-color: var(--primary-color);\n      color: white;\n      font-weight: 500;\n      border: none;\n      border-radius: 25px;\n      cursor: pointer;\n      transition: background-color 0.3s;\n    }\n\n    .page-button:hover {\n      background-color: var(--secondary-color);\n    }\n\n    .page-button:disabled {\n      background-color: #ccc;\n      cursor: not-allowed;\n    }\n\n    .pagination span {\n      color: #888;\n    }\n  "]))));
  customElements.define('gewe-notify-card', GeweNotifyCard);

})();
