var Ce = !1
  , Me = !1
  , j = []
  , Te = -1;
function Nr(e) {
    Fr(e)
}
function Fr(e) {
    j.includes(e) || j.push(e),
    Kr()
}
function vt(e) {
    let t = j.indexOf(e);
    t !== -1 && t > Te && j.splice(t, 1)
}
function Kr() {
    !Me && !Ce && (Ce = !0,
    queueMicrotask(Dr))
}
function Dr() {
    Ce = !1,
    Me = !0;
    for (let e = 0; e < j.length; e++)
        j[e](),
        Te = e;
    j.length = 0,
    Te = -1,
    Me = !1
}
var z, k, Z, xt, Ie = !0;
function Br(e) {
    Ie = !1,
    e(),
    Ie = !0
}
function zr(e) {
    z = e.reactive,
    Z = e.release,
    k = t=>e.effect(t, {
        scheduler: r=>{
            Ie ? Nr(r) : r()
        }
    }),
    xt = e.raw
}
function lt(e) {
    k = e
}
function kr(e) {
    let t = ()=>{}
    ;
    return [n=>{
        let i = k(n);
        return e._x_effects || (e._x_effects = new Set,
        e._x_runEffects = ()=>{
            e._x_effects.forEach(o=>o())
        }
        ),
        e._x_effects.add(i),
        t = ()=>{
            i !== void 0 && (e._x_effects.delete(i),
            Z(i))
        }
        ,
        i
    }
    , ()=>{
        t()
    }
    ]
}
var bt = []
  , mt = []
  , wt = [];
function Hr(e) {
    wt.push(e)
}
function Et(e, t) {
    typeof t == "function" ? (e._x_cleanups || (e._x_cleanups = []),
    e._x_cleanups.push(t)) : (t = e,
    mt.push(t))
}
function qr(e) {
    bt.push(e)
}
function Wr(e, t, r) {
    e._x_attributeCleanups || (e._x_attributeCleanups = {}),
    e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []),
    e._x_attributeCleanups[t].push(r)
}
function St(e, t) {
    !e._x_attributeCleanups || Object.entries(e._x_attributeCleanups).forEach(([r,n])=>{
        (t === void 0 || t.includes(r)) && (n.forEach(i=>i()),
        delete e._x_attributeCleanups[r])
    }
    )
}
var qe = new MutationObserver(Je)
  , We = !1;
function Ue() {
    qe.observe(document, {
        subtree: !0,
        childList: !0,
        attributes: !0,
        attributeOldValue: !0
    }),
    We = !0
}
function At() {
    Ur(),
    qe.disconnect(),
    We = !1
}
var J = []
  , Ee = !1;
function Ur() {
    J = J.concat(qe.takeRecords()),
    J.length && !Ee && (Ee = !0,
    queueMicrotask(()=>{
        Vr(),
        Ee = !1
    }
    ))
}
function Vr() {
    Je(J),
    J.length = 0
}
function x(e) {
    if (!We)
        return e();
    At();
    let t = e();
    return Ue(),
    t
}
var Ve = !1
  , ae = [];
function Jr() {
    Ve = !0
}
function Gr() {
    Ve = !1,
    Je(ae),
    ae = []
}
function Je(e) {
    if (Ve) {
        ae = ae.concat(e);
        return
    }
    let t = []
      , r = []
      , n = new Map
      , i = new Map;
    for (let o = 0; o < e.length; o++)
        if (!e[o].target._x_ignoreMutationObserver && (e[o].type === "childList" && (e[o].addedNodes.forEach(s=>s.nodeType === 1 && t.push(s)),
        e[o].removedNodes.forEach(s=>s.nodeType === 1 && r.push(s))),
        e[o].type === "attributes")) {
            let s = e[o].target
              , a = e[o].attributeName
              , c = e[o].oldValue
              , u = ()=>{
                n.has(s) || n.set(s, []),
                n.get(s).push({
                    name: a,
                    value: s.getAttribute(a)
                })
            }
              , l = ()=>{
                i.has(s) || i.set(s, []),
                i.get(s).push(a)
            }
            ;
            s.hasAttribute(a) && c === null ? u() : s.hasAttribute(a) ? (l(),
            u()) : l()
        }
    i.forEach((o,s)=>{
        St(s, o)
    }
    ),
    n.forEach((o,s)=>{
        bt.forEach(a=>a(s, o))
    }
    );
    for (let o of r)
        if (!t.includes(o) && (mt.forEach(s=>s(o)),
        o._x_cleanups))
            for (; o._x_cleanups.length; )
                o._x_cleanups.pop()();
    t.forEach(o=>{
        o._x_ignoreSelf = !0,
        o._x_ignore = !0
    }
    );
    for (let o of t)
        r.includes(o) || !o.isConnected || (delete o._x_ignoreSelf,
        delete o._x_ignore,
        wt.forEach(s=>s(o)),
        o._x_ignore = !0,
        o._x_ignoreSelf = !0);
    t.forEach(o=>{
        delete o._x_ignoreSelf,
        delete o._x_ignore
    }
    ),
    t = null,
    r = null,
    n = null,
    i = null
}
function Ot(e) {
    return te(D(e))
}
function ee(e, t, r) {
    return e._x_dataStack = [t, ...D(r || e)],
    ()=>{
        e._x_dataStack = e._x_dataStack.filter(n=>n !== t)
    }
}
function D(e) {
    return e._x_dataStack ? e._x_dataStack : typeof ShadowRoot == "function" && e instanceof ShadowRoot ? D(e.host) : e.parentNode ? D(e.parentNode) : []
}
function te(e) {
    let t = new Proxy({},{
        ownKeys: ()=>Array.from(new Set(e.flatMap(r=>Object.keys(r)))),
        has: (r,n)=>e.some(i=>i.hasOwnProperty(n)),
        get: (r,n)=>(e.find(i=>{
            if (i.hasOwnProperty(n)) {
                let o = Object.getOwnPropertyDescriptor(i, n);
                if (o.get && o.get._x_alreadyBound || o.set && o.set._x_alreadyBound)
                    return !0;
                if ((o.get || o.set) && o.enumerable) {
                    let s = o.get
                      , a = o.set
                      , c = o;
                    s = s && s.bind(t),
                    a = a && a.bind(t),
                    s && (s._x_alreadyBound = !0),
                    a && (a._x_alreadyBound = !0),
                    Object.defineProperty(i, n, {
                        ...c,
                        get: s,
                        set: a
                    })
                }
                return !0
            }
            return !1
        }
        ) || {})[n],
        set: (r,n,i)=>{
            let o = e.find(s=>s.hasOwnProperty(n));
            return o ? o[n] = i : e[e.length - 1][n] = i,
            !0
        }
    });
    return t
}
function Ct(e) {
    let t = n=>typeof n == "object" && !Array.isArray(n) && n !== null
      , r = (n,i="")=>{
        Object.entries(Object.getOwnPropertyDescriptors(n)).forEach(([o,{value: s, enumerable: a}])=>{
            if (a === !1 || s === void 0)
                return;
            let c = i === "" ? o : `${i}.${o}`;
            typeof s == "object" && s !== null && s._x_interceptor ? n[o] = s.initialize(e, c, o) : t(s) && s !== n && !(s instanceof Element) && r(s, c)
        }
        )
    }
    ;
    return r(e)
}
function Mt(e, t=()=>{}
) {
    let r = {
        initialValue: void 0,
        _x_interceptor: !0,
        initialize(n, i, o) {
            return e(this.initialValue, ()=>Yr(n, i), s=>Pe(n, i, s), i, o)
        }
    };
    return t(r),
    n=>{
        if (typeof n == "object" && n !== null && n._x_interceptor) {
            let i = r.initialize.bind(r);
            r.initialize = (o,s,a)=>{
                let c = n.initialize(o, s, a);
                return r.initialValue = c,
                i(o, s, a)
            }
        } else
            r.initialValue = n;
        return r
    }
}
function Yr(e, t) {
    return t.split(".").reduce((r,n)=>r[n], e)
}
function Pe(e, t, r) {
    if (typeof t == "string" && (t = t.split(".")),
    t.length === 1)
        e[t[0]] = r;
    else {
        if (t.length === 0)
            throw error;
        return e[t[0]] || (e[t[0]] = {}),
        Pe(e[t[0]], t.slice(1), r)
    }
}
var Tt = {};
function S(e, t) {
    Tt[e] = t
}
function $e(e, t) {
    return Object.entries(Tt).forEach(([r,n])=>{
        let i = null;
        function o() {
            if (i)
                return i;
            {
                let[s,a] = jt(t);
                return i = {
                    interceptor: Mt,
                    ...s
                },
                Et(t, a),
                i
            }
        }
        Object.defineProperty(e, `$ ${r}`, {
            get() {
                return n(t, o())
            },
            enumerable: !1
        })
    }
    ),
    e
}
function Xr(e, t, r, ...n) {
    try {
        return r(...n)
    } catch (i) {
        X(i, e, t)
    }
}
function X(e, t, r=void 0) {
    Object.assign(e, {
        el: t,
        expression: r
    }),
    console.warn(`Alpine Expression Error: ${e.message}

${r ? 'Expression: "' + r + `"

` : ""}`, t),
    setTimeout(()=>{
        throw e
    }
    , 0)
}
var se = !0;
function Qr(e) {
    let t = se;
    se = !1,
    e(),
    se = t
}
function K(e, t, r={}) {
    let n;
    return m(e, t)(i=>n = i, r),
    n
}
function m(...e) {
    return It(...e)
}
var It = Pt;
function Zr(e) {
    It = e
}
function Pt(e, t) {
    let r = {};
    $e(r, e);
    let n = [r, ...D(e)]
      , i = typeof t == "function" ? en(n, t) : rn(n, t, e);
    return Xr.bind(null, e, t, i)
}
function en(e, t) {
    return (r=()=>{}
    ,{scope: n={}, params: i=[]}={})=>{
        let o = t.apply(te([n, ...e]), i);
        ce(r, o)
    }
}
var Se = {};
function tn(e, t) {
    if (Se[e])
        return Se[e];
    let r = Object.getPrototypeOf(async function() {}).constructor
      , n = /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)\s/.test(e) ? `(async()=>{ ${e} })()` : e
      , o = (()=>{
        try {
            return new r(["__self", "scope"],`with (scope) { __self.result = ${n} }; __self.finished = true; return __self.result;`)
        } catch (s) {
            return X(s, t, e),
            Promise.resolve()
        }
    }
    )();
    return Se[e] = o,
    o
}
function rn(e, t, r) {
    let n = tn(t, r);
    return (i=()=>{}
    ,{scope: o={}, params: s=[]}={})=>{
        n.result = void 0,
        n.finished = !1;
        let a = te([o, ...e]);
        if (typeof n == "function") {
            let c = n(n, a).catch(u=>X(u, r, t));
            n.finished ? (ce(i, n.result, a, s, r),
            n.result = void 0) : c.then(u=>{
                ce(i, u, a, s, r)
            }
            ).catch(u=>X(u, r, t)).finally(()=>n.result = void 0)
        }
    }
}
function ce(e, t, r, n, i) {
    if (se && typeof t == "function") {
        let o = t.apply(r, n);
        o instanceof Promise ? o.then(s=>ce(e, s, r, n)).catch(s=>X(s, i, t)) : e(o)
    } else
        typeof t == "object" && t instanceof Promise ? t.then(o=>e(o)) : e(t)
}
var Ge = "x-";
function H(e="") {
    return Ge + e
}
function nn(e) {
    Ge = e
}
var Re = {};
function g(e, t) {
    return Re[e] = t,
    {
        before(r) {
            if (!Re[r]) {
                console.warn("Cannot find directive `${directive}`. `${name}` will use the default order of execution");
                return
            }
            const n = R.indexOf(r);
            R.splice(n >= 0 ? n : R.indexOf("DEFAULT"), 0, e)
        }
    }
}
function Ye(e, t, r) {
    if (t = Array.from(t),
    e._x_virtualDirectives) {
        let o = Object.entries(e._x_virtualDirectives).map(([a,c])=>({
            name: a,
            value: c
        }))
          , s = $t(o);
        o = o.map(a=>s.find(c=>c.name === a.name) ? {
            name: `x-bind:${a.name}`,
            value: `"${a.value}"`
        } : a),
        t = t.concat(o)
    }
    let n = {};
    return t.map(Ft((o,s)=>n[o] = s)).filter(Dt).map(an(n, r)).sort(cn).map(o=>sn(e, o))
}
function $t(e) {
    return Array.from(e).map(Ft()).filter(t=>!Dt(t))
}
var je = !1
  , V = new Map
  , Rt = Symbol();
function on(e) {
    je = !0;
    let t = Symbol();
    Rt = t,
    V.set(t, []);
    let r = ()=>{
        for (; V.get(t).length; )
            V.get(t).shift()();
        V.delete(t)
    }
      , n = ()=>{
        je = !1,
        r()
    }
    ;
    e(r),
    n()
}
function jt(e) {
    let t = []
      , r = a=>t.push(a)
      , [n,i] = kr(e);
    return t.push(i),
    [{
        Alpine: ne,
        effect: n,
        cleanup: r,
        evaluateLater: m.bind(m, e),
        evaluate: K.bind(K, e)
    }, ()=>t.forEach(a=>a())]
}
function sn(e, t) {
    let r = ()=>{}
      , n = Re[t.type] || r
      , [i,o] = jt(e);
    Wr(e, t.original, o);
    let s = ()=>{
        e._x_ignore || e._x_ignoreSelf || (n.inline && n.inline(e, t, i),
        n = n.bind(n, e, t, i),
        je ? V.get(Rt).push(n) : n())
    }
    ;
    return s.runCleanups = o,
    s
}
var Lt = (e,t)=>({name: r, value: n})=>(r.startsWith(e) && (r = r.replace(e, t)),
{
    name: r,
    value: n
})
  , Nt = e=>e;
function Ft(e=()=>{}
) {
    return ({name: t, value: r})=>{
        let {name: n, value: i} = Kt.reduce((o,s)=>s(o), {
            name: t,
            value: r
        });
        return n !== t && e(n, t),
        {
            name: n,
            value: i
        }
    }
}
var Kt = [];
function Xe(e) {
    Kt.push(e)
}
function Dt({name: e}) {
    return Bt().test(e)
}
var Bt = ()=>new RegExp(`^${Ge}([^:^.]+)\\b`);
function an(e, t) {
    return ({name: r, value: n})=>{
        let i = r.match(Bt())
          , o = r.match(/:([a-zA-Z0-9\-:]+)/)
          , s = r.match(/\.[^.\]]+(?=[^\]]*$)/g) || []
          , a = t || e[r] || r;
        return {
            type: i ? i[1] : null,
            value: o ? o[1] : null,
            modifiers: s.map(c=>c.replace(".", "")),
            expression: n,
            original: a
        }
    }
}
var Le = "DEFAULT"
  , R = ["ignore", "ref", "data", "id", "bind", "init", "for", "model", "modelable", "transition", "show", "if", Le, "teleport"];
function cn(e, t) {
    let r = R.indexOf(e.type) === -1 ? Le : e.type
      , n = R.indexOf(t.type) === -1 ? Le : t.type;
    return R.indexOf(r) - R.indexOf(n)
}
function G(e, t, r={}) {
    e.dispatchEvent(new CustomEvent(t,{
        detail: r,
        bubbles: !0,
        composed: !0,
        cancelable: !0
    }))
}
function M(e, t) {
    if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
        Array.from(e.children).forEach(i=>M(i, t));
        return
    }
    let r = !1;
    if (t(e, ()=>r = !0),
    r)
        return;
    let n = e.firstElementChild;
    for (; n; )
        M(n, t),
        n = n.nextElementSibling
}
function T(e, ...t) {
    console.warn(`Alpine Warning: ${e}`, ...t)
}
var ft = !1;
function un() {
    ft && T("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."),
    ft = !0,
    document.body || T("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"),
    G(document, "alpine:init"),
    G(document, "alpine:initializing"),
    Ue(),
    Hr(t=>I(t, M)),
    Et(t=>Vt(t)),
    qr((t,r)=>{
        Ye(t, r).forEach(n=>n())
    }
    );
    let e = t=>!fe(t.parentElement, !0);
    Array.from(document.querySelectorAll(Ht())).filter(e).forEach(t=>{
        I(t)
    }
    ),
    G(document, "alpine:initialized")
}
var Qe = []
  , zt = [];
function kt() {
    return Qe.map(e=>e())
}
function Ht() {
    return Qe.concat(zt).map(e=>e())
}
function qt(e) {
    Qe.push(e)
}
function Wt(e) {
    zt.push(e)
}
function fe(e, t=!1) {
    return de(e, r=>{
        if ((t ? Ht() : kt()).some(i=>r.matches(i)))
            return !0
    }
    )
}
function de(e, t) {
    if (!!e) {
        if (t(e))
            return e;
        if (e._x_teleportBack && (e = e._x_teleportBack),
        !!e.parentElement)
            return de(e.parentElement, t)
    }
}
function ln(e) {
    return kt().some(t=>e.matches(t))
}
var Ut = [];
function fn(e) {
    Ut.push(e)
}
function I(e, t=M, r=()=>{}
) {
    on(()=>{
        t(e, (n,i)=>{
            r(n, i),
            Ut.forEach(o=>o(n, i)),
            Ye(n, n.attributes).forEach(o=>o()),
            n._x_ignore && i()
        }
        )
    }
    )
}
function Vt(e) {
    M(e, t=>St(t))
}
var Ne = []
  , Ze = !1;
function et(e=()=>{}
) {
    return queueMicrotask(()=>{
        Ze || setTimeout(()=>{
            Fe()
        }
        )
    }
    ),
    new Promise(t=>{
        Ne.push(()=>{
            e(),
            t()
        }
        )
    }
    )
}
function Fe() {
    for (Ze = !1; Ne.length; )
        Ne.shift()()
}
function dn() {
    Ze = !0
}
function tt(e, t) {
    return Array.isArray(t) ? dt(e, t.join(" ")) : typeof t == "object" && t !== null ? pn(e, t) : typeof t == "function" ? tt(e, t()) : dt(e, t)
}
function dt(e, t) {
    let r = i=>i.split(" ").filter(o=>!e.classList.contains(o)).filter(Boolean)
      , n = i=>(e.classList.add(...i),
    ()=>{
        e.classList.remove(...i)
    }
    );
    return t = t === !0 ? t = "" : t || "",
    n(r(t))
}
function pn(e, t) {
    let r = a=>a.split(" ").filter(Boolean)
      , n = Object.entries(t).flatMap(([a,c])=>c ? r(a) : !1).filter(Boolean)
      , i = Object.entries(t).flatMap(([a,c])=>c ? !1 : r(a)).filter(Boolean)
      , o = []
      , s = [];
    return i.forEach(a=>{
        e.classList.contains(a) && (e.classList.remove(a),
        s.push(a))
    }
    ),
    n.forEach(a=>{
        e.classList.contains(a) || (e.classList.add(a),
        o.push(a))
    }
    ),
    ()=>{
        s.forEach(a=>e.classList.add(a)),
        o.forEach(a=>e.classList.remove(a))
    }
}
function pe(e, t) {
    return typeof t == "object" && t !== null ? _n(e, t) : hn(e, t)
}
function _n(e, t) {
    let r = {};
    return Object.entries(t).forEach(([n,i])=>{
        r[n] = e.style[n],
        n.startsWith("--") || (n = gn(n)),
        e.style.setProperty(n, i)
    }
    ),
    setTimeout(()=>{
        e.style.length === 0 && e.removeAttribute("style")
    }
    ),
    ()=>{
        pe(e, r)
    }
}
function hn(e, t) {
    let r = e.getAttribute("style", t);
    return e.setAttribute("style", t),
    ()=>{
        e.setAttribute("style", r || "")
    }
}
function gn(e) {
    return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
}
function Ke(e, t=()=>{}
) {
    let r = !1;
    return function() {
        r ? t.apply(this, arguments) : (r = !0,
        e.apply(this, arguments))
    }
}
g("transition", (e,{value: t, modifiers: r, expression: n},{evaluate: i})=>{
    typeof n == "function" && (n = i(n)),
    n !== !1 && (!n || typeof n == "boolean" ? vn(e, r, t) : yn(e, n, t))
}
);
function yn(e, t, r) {
    Jt(e, tt, ""),
    {
        enter: i=>{
            e._x_transition.enter.during = i
        }
        ,
        "enter-start": i=>{
            e._x_transition.enter.start = i
        }
        ,
        "enter-end": i=>{
            e._x_transition.enter.end = i
        }
        ,
        leave: i=>{
            e._x_transition.leave.during = i
        }
        ,
        "leave-start": i=>{
            e._x_transition.leave.start = i
        }
        ,
        "leave-end": i=>{
            e._x_transition.leave.end = i
        }
    }[r](t)
}
function vn(e, t, r) {
    Jt(e, pe);
    let n = !t.includes("in") && !t.includes("out") && !r
      , i = n || t.includes("in") || ["enter"].includes(r)
      , o = n || t.includes("out") || ["leave"].includes(r);
    t.includes("in") && !n && (t = t.filter((_,y)=>y < t.indexOf("out"))),
    t.includes("out") && !n && (t = t.filter((_,y)=>y > t.indexOf("out")));
    let s = !t.includes("opacity") && !t.includes("scale")
      , a = s || t.includes("opacity")
      , c = s || t.includes("scale")
      , u = a ? 0 : 1
      , l = c ? W(t, "scale", 95) / 100 : 1
      , p = W(t, "delay", 0) / 1e3
      , d = W(t, "origin", "center")
      , v = "opacity, transform"
      , O = W(t, "duration", 150) / 1e3
      , ie = W(t, "duration", 75) / 1e3
      , f = "cubic-bezier(0.4, 0.0, 0.2, 1)";
    i && (e._x_transition.enter.during = {
        transformOrigin: d,
        transitionDelay: `${p}s`,
        transitionProperty: v,
        transitionDuration: `${O}s`,
        transitionTimingFunction: f
    },
    e._x_transition.enter.start = {
        opacity: u,
        transform: `scale(${l})`
    },
    e._x_transition.enter.end = {
        opacity: 1,
        transform: "scale(1)"
    }),
    o && (e._x_transition.leave.during = {
        transformOrigin: d,
        transitionDelay: `${p}s`,
        transitionProperty: v,
        transitionDuration: `${ie}s`,
        transitionTimingFunction: f
    },
    e._x_transition.leave.start = {
        opacity: 1,
        transform: "scale(1)"
    },
    e._x_transition.leave.end = {
        opacity: u,
        transform: `scale(${l})`
    })
}
function Jt(e, t, r={}) {
    e._x_transition || (e._x_transition = {
        enter: {
            during: r,
            start: r,
            end: r
        },
        leave: {
            during: r,
            start: r,
            end: r
        },
        in(n=()=>{}
        , i=()=>{}
        ) {
            De(e, t, {
                during: this.enter.during,
                start: this.enter.start,
                end: this.enter.end
            }, n, i)
        },
        out(n=()=>{}
        , i=()=>{}
        ) {
            De(e, t, {
                during: this.leave.during,
                start: this.leave.start,
                end: this.leave.end
            }, n, i)
        }
    })
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function(e, t, r, n) {
    const i = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
    let o = ()=>i(r);
    if (t) {
        e._x_transition && (e._x_transition.enter || e._x_transition.leave) ? e._x_transition.enter && (Object.entries(e._x_transition.enter.during).length || Object.entries(e._x_transition.enter.start).length || Object.entries(e._x_transition.enter.end).length) ? e._x_transition.in(r) : o() : e._x_transition ? e._x_transition.in(r) : o();
        return
    }
    e._x_hidePromise = e._x_transition ? new Promise((s,a)=>{
        e._x_transition.out(()=>{}
        , ()=>s(n)),
        e._x_transitioning.beforeCancel(()=>a({
            isFromCancelledTransition: !0
        }))
    }
    ) : Promise.resolve(n),
    queueMicrotask(()=>{
        let s = Gt(e);
        s ? (s._x_hideChildren || (s._x_hideChildren = []),
        s._x_hideChildren.push(e)) : i(()=>{
            let a = c=>{
                let u = Promise.all([c._x_hidePromise, ...(c._x_hideChildren || []).map(a)]).then(([l])=>l());
                return delete c._x_hidePromise,
                delete c._x_hideChildren,
                u
            }
            ;
            a(e).catch(c=>{
                if (!c.isFromCancelledTransition)
                    throw c
            }
            )
        }
        )
    }
    )
}
;
function Gt(e) {
    let t = e.parentNode;
    if (!!t)
        return t._x_hidePromise ? t : Gt(t)
}
function De(e, t, {during: r, start: n, end: i}={}, o=()=>{}
, s=()=>{}
) {
    if (e._x_transitioning && e._x_transitioning.cancel(),
    Object.keys(r).length === 0 && Object.keys(n).length === 0 && Object.keys(i).length === 0) {
        o(),
        s();
        return
    }
    let a, c, u;
    xn(e, {
        start() {
            a = t(e, n)
        },
        during() {
            c = t(e, r)
        },
        before: o,
        end() {
            a(),
            u = t(e, i)
        },
        after: s,
        cleanup() {
            c(),
            u()
        }
    })
}
function xn(e, t) {
    let r, n, i, o = Ke(()=>{
        x(()=>{
            r = !0,
            n || t.before(),
            i || (t.end(),
            Fe()),
            t.after(),
            e.isConnected && t.cleanup(),
            delete e._x_transitioning
        }
        )
    }
    );
    e._x_transitioning = {
        beforeCancels: [],
        beforeCancel(s) {
            this.beforeCancels.push(s)
        },
        cancel: Ke(function() {
            for (; this.beforeCancels.length; )
                this.beforeCancels.shift()();
            o()
        }),
        finish: o
    },
    x(()=>{
        t.start(),
        t.during()
    }
    ),
    dn(),
    requestAnimationFrame(()=>{
        if (r)
            return;
        let s = Number(getComputedStyle(e).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3
          , a = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
        s === 0 && (s = Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3),
        x(()=>{
            t.before()
        }
        ),
        n = !0,
        requestAnimationFrame(()=>{
            r || (x(()=>{
                t.end()
            }
            ),
            Fe(),
            setTimeout(e._x_transitioning.finish, s + a),
            i = !0)
        }
        )
    }
    )
}
function W(e, t, r) {
    if (e.indexOf(t) === -1)
        return r;
    const n = e[e.indexOf(t) + 1];
    if (!n || t === "scale" && isNaN(n))
        return r;
    if (t === "duration" || t === "delay") {
        let i = n.match(/([0-9]+)ms/);
        if (i)
            return i[1]
    }
    return t === "origin" && ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2]) ? [n, e[e.indexOf(t) + 2]].join(" ") : n
}
var Q = !1;
function re(e, t=()=>{}
) {
    return (...r)=>Q ? t(...r) : e(...r)
}
function bn(e) {
    return (...t)=>Q && e(...t)
}
function mn(e, t) {
    t._x_dataStack || (t._x_dataStack = e._x_dataStack),
    Q = !0,
    En(()=>{
        wn(t)
    }
    ),
    Q = !1
}
function wn(e) {
    let t = !1;
    I(e, (n,i)=>{
        M(n, (o,s)=>{
            if (t && ln(o))
                return s();
            t = !0,
            i(o, s)
        }
        )
    }
    )
}
function En(e) {
    let t = k;
    lt((r,n)=>{
        let i = t(r);
        return Z(i),
        ()=>{}
    }
    ),
    e(),
    lt(t)
}
function Yt(e, t, r, n=[]) {
    switch (e._x_bindings || (e._x_bindings = z({})),
    e._x_bindings[t] = r,
    t = n.includes("camel") ? Pn(t) : t,
    t) {
    case "value":
        Sn(e, r);
        break;
    case "style":
        On(e, r);
        break;
    case "class":
        An(e, r);
        break;
    case "selected":
    case "checked":
        Cn(e, t, r);
        break;
    default:
        Xt(e, t, r);
        break
    }
}
function Sn(e, t) {
    if (e.type === "radio")
        e.attributes.value === void 0 && (e.value = t),
        window.fromModel && (e.checked = pt(e.value, t));
    else if (e.type === "checkbox")
        Number.isInteger(t) ? e.value = t : !Number.isInteger(t) && !Array.isArray(t) && typeof t != "boolean" && ![null, void 0].includes(t) ? e.value = String(t) : Array.isArray(t) ? e.checked = t.some(r=>pt(r, e.value)) : e.checked = !!t;
    else if (e.tagName === "SELECT")
        In(e, t);
    else {
        if (e.value === t)
            return;
        e.value = t
    }
}
function An(e, t) {
    e._x_undoAddedClasses && e._x_undoAddedClasses(),
    e._x_undoAddedClasses = tt(e, t)
}
function On(e, t) {
    e._x_undoAddedStyles && e._x_undoAddedStyles(),
    e._x_undoAddedStyles = pe(e, t)
}
function Cn(e, t, r) {
    Xt(e, t, r),
    Tn(e, t, r)
}
function Xt(e, t, r) {
    [null, void 0, !1].includes(r) && $n(t) ? e.removeAttribute(t) : (Qt(t) && (r = t),
    Mn(e, t, r))
}
function Mn(e, t, r) {
    e.getAttribute(t) != r && e.setAttribute(t, r)
}
function Tn(e, t, r) {
    e[t] !== r && (e[t] = r)
}
function In(e, t) {
    const r = [].concat(t).map(n=>n + "");
    Array.from(e.options).forEach(n=>{
        n.selected = r.includes(n.value)
    }
    )
}
function Pn(e) {
    return e.toLowerCase().replace(/-(\w)/g, (t,r)=>r.toUpperCase())
}
function pt(e, t) {
    return e == t
}
function Qt(e) {
    return ["disabled", "checked", "required", "readonly", "hidden", "open", "selected", "autofocus", "itemscope", "multiple", "novalidate", "allowfullscreen", "allowpaymentrequest", "formnovalidate", "autoplay", "controls", "loop", "muted", "playsinline", "default", "ismap", "reversed", "async", "defer", "nomodule"].includes(e)
}
function $n(e) {
    return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(e)
}
function Rn(e, t, r) {
    if (e._x_bindings && e._x_bindings[t] !== void 0)
        return e._x_bindings[t];
    let n = e.getAttribute(t);
    return n === null ? typeof r == "function" ? r() : r : n === "" ? !0 : Qt(t) ? !![t, "true"].includes(n) : n
}
function Zt(e, t) {
    var r;
    return function() {
        var n = this
          , i = arguments
          , o = function() {
            r = null,
            e.apply(n, i)
        };
        clearTimeout(r),
        r = setTimeout(o, t)
    }
}
function er(e, t) {
    let r;
    return function() {
        let n = this
          , i = arguments;
        r || (e.apply(n, i),
        r = !0,
        setTimeout(()=>r = !1, t))
    }
}
function jn(e) {
    (Array.isArray(e) ? e : [e]).forEach(r=>r(ne))
}
var $ = {}
  , _t = !1;
function Ln(e, t) {
    if (_t || ($ = z($),
    _t = !0),
    t === void 0)
        return $[e];
    $[e] = t,
    typeof t == "object" && t !== null && t.hasOwnProperty("init") && typeof t.init == "function" && $[e].init(),
    Ct($[e])
}
function Nn() {
    return $
}
var tr = {};
function Fn(e, t) {
    let r = typeof t != "function" ? ()=>t : t;
    e instanceof Element ? rr(e, r()) : tr[e] = r
}
function Kn(e) {
    return Object.entries(tr).forEach(([t,r])=>{
        Object.defineProperty(e, t, {
            get() {
                return (...n)=>r(...n)
            }
        })
    }
    ),
    e
}
function rr(e, t, r) {
    let n = [];
    for (; n.length; )
        n.pop()();
    let i = Object.entries(t).map(([s,a])=>({
        name: s,
        value: a
    }))
      , o = $t(i);
    i = i.map(s=>o.find(a=>a.name === s.name) ? {
        name: `x-bind:${s.name}`,
        value: `"${s.value}"`
    } : s),
    Ye(e, i, r).map(s=>{
        n.push(s.runCleanups),
        s()
    }
    )
}
var nr = {};
function Dn(e, t) {
    nr[e] = t
}
function Bn(e, t) {
    return Object.entries(nr).forEach(([r,n])=>{
        Object.defineProperty(e, r, {
            get() {
                return (...i)=>n.bind(t)(...i)
            },
            enumerable: !1
        })
    }
    ),
    e
}
var zn = {
    get reactive() {
        return z
    },
    get release() {
        return Z
    },
    get effect() {
        return k
    },
    get raw() {
        return xt
    },
    version: "3.12.2",
    flushAndStopDeferringMutations: Gr,
    dontAutoEvaluateFunctions: Qr,
    disableEffectScheduling: Br,
    startObservingMutations: Ue,
    stopObservingMutations: At,
    setReactivityEngine: zr,
    closestDataStack: D,
    skipDuringClone: re,
    onlyDuringClone: bn,
    addRootSelector: qt,
    addInitSelector: Wt,
    addScopeToNode: ee,
    deferMutations: Jr,
    mapAttributes: Xe,
    evaluateLater: m,
    interceptInit: fn,
    setEvaluator: Zr,
    mergeProxies: te,
    findClosest: de,
    closestRoot: fe,
    destroyTree: Vt,
    interceptor: Mt,
    transition: De,
    setStyles: pe,
    mutateDom: x,
    directive: g,
    throttle: er,
    debounce: Zt,
    evaluate: K,
    initTree: I,
    nextTick: et,
    prefixed: H,
    prefix: nn,
    plugin: jn,
    magic: S,
    store: Ln,
    start: un,
    clone: mn,
    bound: Rn,
    $data: Ot,
    walk: M,
    data: Dn,
    bind: Fn
}
  , ne = zn;
function kn(e, t) {
    const r = Object.create(null)
      , n = e.split(",");
    for (let i = 0; i < n.length; i++)
        r[n[i]] = !0;
    return t ? i=>!!r[i.toLowerCase()] : i=>!!r[i]
}
var Hn = Object.freeze({});
Object.freeze([]);
var ir = Object.assign, qn = Object.prototype.hasOwnProperty, _e = (e,t)=>qn.call(e, t), L = Array.isArray, Y = e=>or(e) === "[object Map]", Wn = e=>typeof e == "string", rt = e=>typeof e == "symbol", he = e=>e !== null && typeof e == "object", Un = Object.prototype.toString, or = e=>Un.call(e), sr = e=>or(e).slice(8, -1), nt = e=>Wn(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Vn = e=>{
    const t = Object.create(null);
    return r=>t[r] || (t[r] = e(r))
}
, Jn = Vn(e=>e.charAt(0).toUpperCase() + e.slice(1)), ar = (e,t)=>e !== t && (e === e || t === t), Be = new WeakMap, U = [], A, N = Symbol("iterate"), ze = Symbol("Map key iterate");
function Gn(e) {
    return e && e._isEffect === !0
}
function Yn(e, t=Hn) {
    Gn(e) && (e = e.raw);
    const r = Zn(e, t);
    return t.lazy || r(),
    r
}
function Xn(e) {
    e.active && (cr(e),
    e.options.onStop && e.options.onStop(),
    e.active = !1)
}
var Qn = 0;
function Zn(e, t) {
    const r = function() {
        if (!r.active)
            return e();
        if (!U.includes(r)) {
            cr(r);
            try {
                return ti(),
                U.push(r),
                A = r,
                e()
            } finally {
                U.pop(),
                ur(),
                A = U[U.length - 1]
            }
        }
    };
    return r.id = Qn++,
    r.allowRecurse = !!t.allowRecurse,
    r._isEffect = !0,
    r.active = !0,
    r.raw = e,
    r.deps = [],
    r.options = t,
    r
}
function cr(e) {
    const {deps: t} = e;
    if (t.length) {
        for (let r = 0; r < t.length; r++)
            t[r].delete(e);
        t.length = 0
    }
}
var B = !0
  , it = [];
function ei() {
    it.push(B),
    B = !1
}
function ti() {
    it.push(B),
    B = !0
}
function ur() {
    const e = it.pop();
    B = e === void 0 ? !0 : e
}
function E(e, t, r) {
    if (!B || A === void 0)
        return;
    let n = Be.get(e);
    n || Be.set(e, n = new Map);
    let i = n.get(r);
    i || n.set(r, i = new Set),
    i.has(A) || (i.add(A),
    A.deps.push(i),
    A.options.onTrack && A.options.onTrack({
        effect: A,
        target: e,
        type: t,
        key: r
    }))
}
function P(e, t, r, n, i, o) {
    const s = Be.get(e);
    if (!s)
        return;
    const a = new Set
      , c = l=>{
        l && l.forEach(p=>{
            (p !== A || p.allowRecurse) && a.add(p)
        }
        )
    }
    ;
    if (t === "clear")
        s.forEach(c);
    else if (r === "length" && L(e))
        s.forEach((l,p)=>{
            (p === "length" || p >= n) && c(l)
        }
        );
    else
        switch (r !== void 0 && c(s.get(r)),
        t) {
        case "add":
            L(e) ? nt(r) && c(s.get("length")) : (c(s.get(N)),
            Y(e) && c(s.get(ze)));
            break;
        case "delete":
            L(e) || (c(s.get(N)),
            Y(e) && c(s.get(ze)));
            break;
        case "set":
            Y(e) && c(s.get(N));
            break
        }
    const u = l=>{
        l.options.onTrigger && l.options.onTrigger({
            effect: l,
            target: e,
            key: r,
            type: t,
            newValue: n,
            oldValue: i,
            oldTarget: o
        }),
        l.options.scheduler ? l.options.scheduler(l) : l()
    }
    ;
    a.forEach(u)
}
var ri = kn("__proto__,__v_isRef,__isVue")
  , lr = new Set(Object.getOwnPropertyNames(Symbol).map(e=>Symbol[e]).filter(rt))
  , ni = ge()
  , ii = ge(!1, !0)
  , oi = ge(!0)
  , si = ge(!0, !0)
  , ue = {};
["includes", "indexOf", "lastIndexOf"].forEach(e=>{
    const t = Array.prototype[e];
    ue[e] = function(...r) {
        const n = h(this);
        for (let o = 0, s = this.length; o < s; o++)
            E(n, "get", o + "");
        const i = t.apply(n, r);
        return i === -1 || i === !1 ? t.apply(n, r.map(h)) : i
    }
}
);
["push", "pop", "shift", "unshift", "splice"].forEach(e=>{
    const t = Array.prototype[e];
    ue[e] = function(...r) {
        ei();
        const n = t.apply(this, r);
        return ur(),
        n
    }
}
);
function ge(e=!1, t=!1) {
    return function(n, i, o) {
        if (i === "__v_isReactive")
            return !e;
        if (i === "__v_isReadonly")
            return e;
        if (i === "__v_raw" && o === (e ? t ? gi : Ar : t ? hi : Sr).get(n))
            return n;
        const s = L(n);
        if (!e && s && _e(ue, i))
            return Reflect.get(ue, i, o);
        const a = Reflect.get(n, i, o);
        return (rt(i) ? lr.has(i) : ri(i)) || (e || E(n, "get", i),
        t) ? a : ke(a) ? !s || !nt(i) ? a.value : a : he(a) ? e ? Or(a) : ct(a) : a
    }
}
var ai = fr()
  , ci = fr(!0);
function fr(e=!1) {
    return function(r, n, i, o) {
        let s = r[n];
        if (!e && (i = h(i),
        s = h(s),
        !L(r) && ke(s) && !ke(i)))
            return s.value = i,
            !0;
        const a = L(r) && nt(n) ? Number(n) < r.length : _e(r, n)
          , c = Reflect.set(r, n, i, o);
        return r === h(o) && (a ? ar(i, s) && P(r, "set", n, i, s) : P(r, "add", n, i)),
        c
    }
}
function ui(e, t) {
    const r = _e(e, t)
      , n = e[t]
      , i = Reflect.deleteProperty(e, t);
    return i && r && P(e, "delete", t, void 0, n),
    i
}
function li(e, t) {
    const r = Reflect.has(e, t);
    return (!rt(t) || !lr.has(t)) && E(e, "has", t),
    r
}
function fi(e) {
    return E(e, "iterate", L(e) ? "length" : N),
    Reflect.ownKeys(e)
}
var dr = {
    get: ni,
    set: ai,
    deleteProperty: ui,
    has: li,
    ownKeys: fi
}
  , pr = {
    get: oi,
    set(e, t) {
        return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e),
        !0
    },
    deleteProperty(e, t) {
        return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e),
        !0
    }
};
ir({}, dr, {
    get: ii,
    set: ci
});
ir({}, pr, {
    get: si
});
var ot = e=>he(e) ? ct(e) : e
  , st = e=>he(e) ? Or(e) : e
  , at = e=>e
  , ye = e=>Reflect.getPrototypeOf(e);
function ve(e, t, r=!1, n=!1) {
    e = e.__v_raw;
    const i = h(e)
      , o = h(t);
    t !== o && !r && E(i, "get", t),
    !r && E(i, "get", o);
    const {has: s} = ye(i)
      , a = n ? at : r ? st : ot;
    if (s.call(i, t))
        return a(e.get(t));
    if (s.call(i, o))
        return a(e.get(o));
    e !== i && e.get(t)
}
function xe(e, t=!1) {
    const r = this.__v_raw
      , n = h(r)
      , i = h(e);
    return e !== i && !t && E(n, "has", e),
    !t && E(n, "has", i),
    e === i ? r.has(e) : r.has(e) || r.has(i)
}
function be(e, t=!1) {
    return e = e.__v_raw,
    !t && E(h(e), "iterate", N),
    Reflect.get(e, "size", e)
}
function _r(e) {
    e = h(e);
    const t = h(this);
    return ye(t).has.call(t, e) || (t.add(e),
    P(t, "add", e, e)),
    this
}
function hr(e, t) {
    t = h(t);
    const r = h(this)
      , {has: n, get: i} = ye(r);
    let o = n.call(r, e);
    o ? Er(r, n, e) : (e = h(e),
    o = n.call(r, e));
    const s = i.call(r, e);
    return r.set(e, t),
    o ? ar(t, s) && P(r, "set", e, t, s) : P(r, "add", e, t),
    this
}
function gr(e) {
    const t = h(this)
      , {has: r, get: n} = ye(t);
    let i = r.call(t, e);
    i ? Er(t, r, e) : (e = h(e),
    i = r.call(t, e));
    const o = n ? n.call(t, e) : void 0
      , s = t.delete(e);
    return i && P(t, "delete", e, void 0, o),
    s
}
function yr() {
    const e = h(this)
      , t = e.size !== 0
      , r = Y(e) ? new Map(e) : new Set(e)
      , n = e.clear();
    return t && P(e, "clear", void 0, void 0, r),
    n
}
function me(e, t) {
    return function(n, i) {
        const o = this
          , s = o.__v_raw
          , a = h(s)
          , c = t ? at : e ? st : ot;
        return !e && E(a, "iterate", N),
        s.forEach((u,l)=>n.call(i, c(u), c(l), o))
    }
}
function oe(e, t, r) {
    return function(...n) {
        const i = this.__v_raw
          , o = h(i)
          , s = Y(o)
          , a = e === "entries" || e === Symbol.iterator && s
          , c = e === "keys" && s
          , u = i[e](...n)
          , l = r ? at : t ? st : ot;
        return !t && E(o, "iterate", c ? ze : N),
        {
            next() {
                const {value: p, done: d} = u.next();
                return d ? {
                    value: p,
                    done: d
                } : {
                    value: a ? [l(p[0]), l(p[1])] : l(p),
                    done: d
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}
function C(e) {
    return function(...t) {
        {
            const r = t[0] ? `on key "${t[0]}" ` : "";
            console.warn(`${Jn(e)} operation ${r}failed: target is readonly.`, h(this))
        }
        return e === "delete" ? !1 : this
    }
}
var vr = {
    get(e) {
        return ve(this, e)
    },
    get size() {
        return be(this)
    },
    has: xe,
    add: _r,
    set: hr,
    delete: gr,
    clear: yr,
    forEach: me(!1, !1)
}
  , xr = {
    get(e) {
        return ve(this, e, !1, !0)
    },
    get size() {
        return be(this)
    },
    has: xe,
    add: _r,
    set: hr,
    delete: gr,
    clear: yr,
    forEach: me(!1, !0)
}
  , br = {
    get(e) {
        return ve(this, e, !0)
    },
    get size() {
        return be(this, !0)
    },
    has(e) {
        return xe.call(this, e, !0)
    },
    add: C("add"),
    set: C("set"),
    delete: C("delete"),
    clear: C("clear"),
    forEach: me(!0, !1)
}
  , mr = {
    get(e) {
        return ve(this, e, !0, !0)
    },
    get size() {
        return be(this, !0)
    },
    has(e) {
        return xe.call(this, e, !0)
    },
    add: C("add"),
    set: C("set"),
    delete: C("delete"),
    clear: C("clear"),
    forEach: me(!0, !0)
}
  , di = ["keys", "values", "entries", Symbol.iterator];
di.forEach(e=>{
    vr[e] = oe(e, !1, !1),
    br[e] = oe(e, !0, !1),
    xr[e] = oe(e, !1, !0),
    mr[e] = oe(e, !0, !0)
}
);
function wr(e, t) {
    const r = t ? e ? mr : xr : e ? br : vr;
    return (n,i,o)=>i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? n : Reflect.get(_e(r, i) && i in n ? r : n, i, o)
}
var pi = {
    get: wr(!1, !1)
}
  , _i = {
    get: wr(!0, !1)
};
function Er(e, t, r) {
    const n = h(r);
    if (n !== r && t.call(e, n)) {
        const i = sr(e);
        console.warn(`Reactive ${i} contains both the raw and reactive versions of the same object ${i === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`)
    }
}
var Sr = new WeakMap
  , hi = new WeakMap
  , Ar = new WeakMap
  , gi = new WeakMap;
function yi(e) {
    switch (e) {
    case "Object":
    case "Array":
        return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
        return 2;
    default:
        return 0
    }
}
function vi(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : yi(sr(e))
}
function ct(e) {
    return e && e.__v_isReadonly ? e : Cr(e, !1, dr, pi, Sr)
}
function Or(e) {
    return Cr(e, !0, pr, _i, Ar)
}
function Cr(e, t, r, n, i) {
    if (!he(e))
        return console.warn(`value cannot be made reactive: ${String(e)}`),
        e;
    if (e.__v_raw && !(t && e.__v_isReactive))
        return e;
    const o = i.get(e);
    if (o)
        return o;
    const s = vi(e);
    if (s === 0)
        return e;
    const a = new Proxy(e,s === 2 ? n : r);
    return i.set(e, a),
    a
}
function h(e) {
    return e && h(e.__v_raw) || e
}
function ke(e) {
    return Boolean(e && e.__v_isRef === !0)
}
S("nextTick", ()=>et);
S("dispatch", e=>G.bind(G, e));
S("watch", (e,{evaluateLater: t, effect: r})=>(n,i)=>{
    let o = t(n), s = !0, a, c = r(()=>o(u=>{
        JSON.stringify(u),
        s ? a = u : queueMicrotask(()=>{
            i(u, a),
            a = u
        }
        ),
        s = !1
    }
    ));
    e._x_effects.delete(c)
}
);
S("store", Nn);
S("data", e=>Ot(e));
S("root", e=>fe(e));
S("refs", e=>(e._x_refs_proxy || (e._x_refs_proxy = te(xi(e))),
e._x_refs_proxy));
function xi(e) {
    let t = []
      , r = e;
    for (; r; )
        r._x_refs && t.push(r._x_refs),
        r = r.parentNode;
    return t
}
var Ae = {};
function Mr(e) {
    return Ae[e] || (Ae[e] = 0),
    ++Ae[e]
}
function bi(e, t) {
    return de(e, r=>{
        if (r._x_ids && r._x_ids[t])
            return !0
    }
    )
}
function mi(e, t) {
    e._x_ids || (e._x_ids = {}),
    e._x_ids[t] || (e._x_ids[t] = Mr(t))
}
S("id", e=>(t,r=null)=>{
    let n = bi(e, t)
      , i = n ? n._x_ids[t] : Mr(t);
    return r ? `${t}-${i}-${r}` : `${t}-${i}`
}
);
S("el", e=>e);
Tr("Focus", "focus", "focus");
Tr("Persist", "persist", "persist");
function Tr(e, t, r) {
    S(t, n=>T(`You can't use [$ ${directiveName}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${r}`, n))
}
function wi({get: e, set: t}, {get: r, set: n}) {
    let i = !0, o, s, a = k(()=>{
        let c, u;
        i ? (c = e(),
        n(c),
        u = r(),
        i = !1) : (c = e(),
        u = r(),
        s = JSON.stringify(c),
        JSON.stringify(u),
        s !== o ? (u = r(),
        n(c),
        u = c) : (t(u),
        c = u)),
        o = JSON.stringify(c),
        JSON.stringify(u)
    }
    );
    return ()=>{
        Z(a)
    }
}
g("modelable", (e,{expression: t},{effect: r, evaluateLater: n, cleanup: i})=>{
    let o = n(t)
      , s = ()=>{
        let l;
        return o(p=>l = p),
        l
    }
      , a = n(`${t} = __placeholder`)
      , c = l=>a(()=>{}
    , {
        scope: {
            __placeholder: l
        }
    })
      , u = s();
    c(u),
    queueMicrotask(()=>{
        if (!e._x_model)
            return;
        e._x_removeModelListeners.default();
        let l = e._x_model.get
          , p = e._x_model.set
          , d = wi({
            get() {
                return l()
            },
            set(v) {
                p(v)
            }
        }, {
            get() {
                return s()
            },
            set(v) {
                c(v)
            }
        });
        i(d)
    }
    )
}
);
var Ei = document.createElement("div");
g("teleport", (e,{modifiers: t, expression: r},{cleanup: n})=>{
    e.tagName.toLowerCase() !== "template" && T("x-teleport can only be used on a <template> tag", e);
    let i = re(()=>document.querySelector(r), ()=>Ei)();
    i || T(`Cannot find x-teleport element for selector: "${r}"`);
    let o = e.content.cloneNode(!0).firstElementChild;
    e._x_teleport = o,
    o._x_teleportBack = e,
    e._x_forwardEvents && e._x_forwardEvents.forEach(s=>{
        o.addEventListener(s, a=>{
            a.stopPropagation(),
            e.dispatchEvent(new a.constructor(a.type,a))
        }
        )
    }
    ),
    ee(o, {}, e),
    x(()=>{
        t.includes("prepend") ? i.parentNode.insertBefore(o, i) : t.includes("append") ? i.parentNode.insertBefore(o, i.nextSibling) : i.appendChild(o),
        I(o),
        o._x_ignore = !0
    }
    ),
    n(()=>o.remove())
}
);
var Ir = ()=>{}
;
Ir.inline = (e,{modifiers: t},{cleanup: r})=>{
    t.includes("self") ? e._x_ignoreSelf = !0 : e._x_ignore = !0,
    r(()=>{
        t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore
    }
    )
}
;
g("ignore", Ir);
g("effect", (e,{expression: t},{effect: r})=>r(m(e, t)));
function He(e, t, r, n) {
    let i = e
      , o = c=>n(c)
      , s = {}
      , a = (c,u)=>l=>u(c, l);
    if (r.includes("dot") && (t = Si(t)),
    r.includes("camel") && (t = Ai(t)),
    r.includes("passive") && (s.passive = !0),
    r.includes("capture") && (s.capture = !0),
    r.includes("window") && (i = window),
    r.includes("document") && (i = document),
    r.includes("debounce")) {
        let c = r[r.indexOf("debounce") + 1] || "invalid-wait"
          , u = le(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250;
        o = Zt(o, u)
    }
    if (r.includes("throttle")) {
        let c = r[r.indexOf("throttle") + 1] || "invalid-wait"
          , u = le(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250;
        o = er(o, u)
    }
    return r.includes("prevent") && (o = a(o, (c,u)=>{
        u.preventDefault(),
        c(u)
    }
    )),
    r.includes("stop") && (o = a(o, (c,u)=>{
        u.stopPropagation(),
        c(u)
    }
    )),
    r.includes("self") && (o = a(o, (c,u)=>{
        u.target === e && c(u)
    }
    )),
    (r.includes("away") || r.includes("outside")) && (i = document,
    o = a(o, (c,u)=>{
        e.contains(u.target) || u.target.isConnected !== !1 && (e.offsetWidth < 1 && e.offsetHeight < 1 || e._x_isShown !== !1 && c(u))
    }
    )),
    r.includes("once") && (o = a(o, (c,u)=>{
        c(u),
        i.removeEventListener(t, o, s)
    }
    )),
    o = a(o, (c,u)=>{
        Ci(t) && Mi(u, r) || c(u)
    }
    ),
    i.addEventListener(t, o, s),
    ()=>{
        i.removeEventListener(t, o, s)
    }
}
function Si(e) {
    return e.replace(/-/g, ".")
}
function Ai(e) {
    return e.toLowerCase().replace(/-(\w)/g, (t,r)=>r.toUpperCase())
}
function le(e) {
    return !Array.isArray(e) && !isNaN(e)
}
function Oi(e) {
    return [" ", "_"].includes(e) ? e : e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase()
}
function Ci(e) {
    return ["keydown", "keyup"].includes(e)
}
function Mi(e, t) {
    let r = t.filter(o=>!["window", "document", "prevent", "stop", "once", "capture"].includes(o));
    if (r.includes("debounce")) {
        let o = r.indexOf("debounce");
        r.splice(o, le((r[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1)
    }
    if (r.includes("throttle")) {
        let o = r.indexOf("throttle");
        r.splice(o, le((r[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1)
    }
    if (r.length === 0 || r.length === 1 && ht(e.key).includes(r[0]))
        return !1;
    const i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter(o=>r.includes(o));
    return r = r.filter(o=>!i.includes(o)),
    !(i.length > 0 && i.filter(s=>((s === "cmd" || s === "super") && (s = "meta"),
    e[`${s}Key`])).length === i.length && ht(e.key).includes(r[0]))
}
function ht(e) {
    if (!e)
        return [];
    e = Oi(e);
    let t = {
        ctrl: "control",
        slash: "/",
        space: " ",
        spacebar: " ",
        cmd: "meta",
        esc: "escape",
        up: "arrow-up",
        down: "arrow-down",
        left: "arrow-left",
        right: "arrow-right",
        period: ".",
        equal: "=",
        minus: "-",
        underscore: "_"
    };
    return t[e] = e,
    Object.keys(t).map(r=>{
        if (t[r] === e)
            return r
    }
    ).filter(r=>r)
}
g("model", (e,{modifiers: t, expression: r},{effect: n, cleanup: i})=>{
    let o = e;
    t.includes("parent") && (o = e.parentNode);
    let s = m(o, r), a;
    typeof r == "string" ? a = m(o, `${r} = __placeholder`) : typeof r == "function" && typeof r() == "string" ? a = m(o, `${r()} = __placeholder`) : a = ()=>{}
    ;
    let c = ()=>{
        let d;
        return s(v=>d = v),
        gt(d) ? d.get() : d
    }
      , u = d=>{
        let v;
        s(O=>v = O),
        gt(v) ? v.set(d) : a(()=>{}
        , {
            scope: {
                __placeholder: d
            }
        })
    }
    ;
    typeof r == "string" && e.type === "radio" && x(()=>{
        e.hasAttribute("name") || e.setAttribute("name", r)
    }
    );
    var l = e.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(e.type) || t.includes("lazy") ? "change" : "input";
    let p = Q ? ()=>{}
    : He(e, l, t, d=>{
        u(Ti(e, t, d, c()))
    }
    );
    if (t.includes("fill") && [null, ""].includes(c()) && e.dispatchEvent(new Event(l,{})),
    e._x_removeModelListeners || (e._x_removeModelListeners = {}),
    e._x_removeModelListeners.default = p,
    i(()=>e._x_removeModelListeners.default()),
    e.form) {
        let d = He(e.form, "reset", [], v=>{
            et(()=>e._x_model && e._x_model.set(e.value))
        }
        );
        i(()=>d())
    }
    e._x_model = {
        get() {
            return c()
        },
        set(d) {
            u(d)
        }
    },
    e._x_forceModelUpdate = d=>{
        d = d === void 0 ? c() : d,
        d === void 0 && typeof r == "string" && r.match(/\./) && (d = ""),
        window.fromModel = !0,
        x(()=>Yt(e, "value", d)),
        delete window.fromModel
    }
    ,
    n(()=>{
        let d = c();
        t.includes("unintrusive") && document.activeElement.isSameNode(e) || e._x_forceModelUpdate(d)
    }
    )
}
);
function Ti(e, t, r, n) {
    return x(()=>{
        if (r instanceof CustomEvent && r.detail !== void 0)
            return r.detail ?? r.target.value;
        if (e.type === "checkbox")
            if (Array.isArray(n)) {
                let i = t.includes("number") ? Oe(r.target.value) : r.target.value;
                return r.target.checked ? n.concat([i]) : n.filter(o=>!Ii(o, i))
            } else
                return r.target.checked;
        else {
            if (e.tagName.toLowerCase() === "select" && e.multiple)
                return t.includes("number") ? Array.from(r.target.selectedOptions).map(i=>{
                    let o = i.value || i.text;
                    return Oe(o)
                }
                ) : Array.from(r.target.selectedOptions).map(i=>i.value || i.text);
            {
                let i = r.target.value;
                return t.includes("number") ? Oe(i) : t.includes("trim") ? i.trim() : i
            }
        }
    }
    )
}
function Oe(e) {
    let t = e ? parseFloat(e) : null;
    return Pi(t) ? t : e
}
function Ii(e, t) {
    return e == t
}
function Pi(e) {
    return !Array.isArray(e) && !isNaN(e)
}
function gt(e) {
    return e !== null && typeof e == "object" && typeof e.get == "function" && typeof e.set == "function"
}
g("cloak", e=>queueMicrotask(()=>x(()=>e.removeAttribute(H("cloak")))));
Wt(()=>`[${H("init")}]`);
g("init", re((e,{expression: t},{evaluate: r})=>typeof t == "string" ? !!t.trim() && r(t, {}, !1) : r(t, {}, !1)));
g("text", (e,{expression: t},{effect: r, evaluateLater: n})=>{
    let i = n(t);
    r(()=>{
        i(o=>{
            x(()=>{
                e.textContent = o
            }
            )
        }
        )
    }
    )
}
);
g("html", (e,{expression: t},{effect: r, evaluateLater: n})=>{
    let i = n(t);
    r(()=>{
        i(o=>{
            x(()=>{
                e.innerHTML = o,
                e._x_ignoreSelf = !0,
                I(e),
                delete e._x_ignoreSelf
            }
            )
        }
        )
    }
    )
}
);
Xe(Lt(":", Nt(H("bind:"))));
g("bind", (e,{value: t, modifiers: r, expression: n, original: i},{effect: o})=>{
    if (!t) {
        let a = {};
        Kn(a),
        m(e, n)(u=>{
            rr(e, u, i)
        }
        , {
            scope: a
        });
        return
    }
    if (t === "key")
        return $i(e, n);
    let s = m(e, n);
    o(()=>s(a=>{
        a === void 0 && typeof n == "string" && n.match(/\./) && (a = ""),
        x(()=>Yt(e, t, a, r))
    }
    ))
}
);
function $i(e, t) {
    e._x_keyExpression = t
}
qt(()=>`[${H("data")}]`);
g("data", re((e,{expression: t},{cleanup: r})=>{
    t = t === "" ? "{}" : t;
    let n = {};
    $e(n, e);
    let i = {};
    Bn(i, n);
    let o = K(e, t, {
        scope: i
    });
    (o === void 0 || o === !0) && (o = {}),
    $e(o, e);
    let s = z(o);
    Ct(s);
    let a = ee(e, s);
    s.init && K(e, s.init),
    r(()=>{
        s.destroy && K(e, s.destroy),
        a()
    }
    )
}
));
g("show", (e,{modifiers: t, expression: r},{effect: n})=>{
    let i = m(e, r);
    e._x_doHide || (e._x_doHide = ()=>{
        x(()=>{
            e.style.setProperty("display", "none", t.includes("important") ? "important" : void 0)
        }
        )
    }
    ),
    e._x_doShow || (e._x_doShow = ()=>{
        x(()=>{
            e.style.length === 1 && e.style.display === "none" ? e.removeAttribute("style") : e.style.removeProperty("display")
        }
        )
    }
    );
    let o = ()=>{
        e._x_doHide(),
        e._x_isShown = !1
    }
    , s = ()=>{
        e._x_doShow(),
        e._x_isShown = !0
    }
    , a = ()=>setTimeout(s), c = Ke(p=>p ? s() : o(), p=>{
        typeof e._x_toggleAndCascadeWithTransitions == "function" ? e._x_toggleAndCascadeWithTransitions(e, p, s, o) : p ? a() : o()
    }
    ), u, l = !0;
    n(()=>i(p=>{
        !l && p === u || (t.includes("immediate") && (p ? a() : o()),
        c(p),
        u = p,
        l = !1)
    }
    ))
}
);
g("for", (e,{expression: t},{effect: r, cleanup: n})=>{
    let i = ji(t)
      , o = m(e, i.items)
      , s = m(e, e._x_keyExpression || "index");
    e._x_prevKeys = [],
    e._x_lookup = {},
    r(()=>Ri(e, i, o, s)),
    n(()=>{
        Object.values(e._x_lookup).forEach(a=>a.remove()),
        delete e._x_prevKeys,
        delete e._x_lookup
    }
    )
}
);
function Ri(e, t, r, n) {
    let i = s=>typeof s == "object" && !Array.isArray(s)
      , o = e;
    r(s=>{
        Li(s) && s >= 0 && (s = Array.from(Array(s).keys(), f=>f + 1)),
        s === void 0 && (s = []);
        let a = e._x_lookup
          , c = e._x_prevKeys
          , u = []
          , l = [];
        if (i(s))
            s = Object.entries(s).map(([f,_])=>{
                let y = yt(t, _, f, s);
                n(b=>l.push(b), {
                    scope: {
                        index: f,
                        ...y
                    }
                }),
                u.push(y)
            }
            );
        else
            for (let f = 0; f < s.length; f++) {
                let _ = yt(t, s[f], f, s);
                n(y=>l.push(y), {
                    scope: {
                        index: f,
                        ..._
                    }
                }),
                u.push(_)
            }
        let p = []
          , d = []
          , v = []
          , O = [];
        for (let f = 0; f < c.length; f++) {
            let _ = c[f];
            l.indexOf(_) === -1 && v.push(_)
        }
        c = c.filter(f=>!v.includes(f));
        let ie = "template";
        for (let f = 0; f < l.length; f++) {
            let _ = l[f]
              , y = c.indexOf(_);
            if (y === -1)
                c.splice(f, 0, _),
                p.push([ie, f]);
            else if (y !== f) {
                let b = c.splice(f, 1)[0]
                  , w = c.splice(y - 1, 1)[0];
                c.splice(f, 0, w),
                c.splice(y, 0, b),
                d.push([b, w])
            } else
                O.push(_);
            ie = _
        }
        for (let f = 0; f < v.length; f++) {
            let _ = v[f];
            a[_]._x_effects && a[_]._x_effects.forEach(vt),
            a[_].remove(),
            a[_] = null,
            delete a[_]
        }
        for (let f = 0; f < d.length; f++) {
            let[_,y] = d[f]
              , b = a[_]
              , w = a[y]
              , F = document.createElement("div");
            x(()=>{
                w || T('x-for ":key" is undefined or invalid', o),
                w.after(F),
                b.after(w),
                w._x_currentIfEl && w.after(w._x_currentIfEl),
                F.before(b),
                b._x_currentIfEl && b.after(b._x_currentIfEl),
                F.remove()
            }
            ),
            w._x_refreshXForScope(u[l.indexOf(y)])
        }
        for (let f = 0; f < p.length; f++) {
            let[_,y] = p[f]
              , b = _ === "template" ? o : a[_];
            b._x_currentIfEl && (b = b._x_currentIfEl);
            let w = u[y]
              , F = l[y]
              , q = document.importNode(o.content, !0).firstElementChild
              , ut = z(w);
            ee(q, ut, o),
            q._x_refreshXForScope = Rr=>{
                Object.entries(Rr).forEach(([jr,Lr])=>{
                    ut[jr] = Lr
                }
                )
            }
            ,
            x(()=>{
                b.after(q),
                I(q)
            }
            ),
            typeof F == "object" && T("x-for key cannot be an object, it must be a string or an integer", o),
            a[F] = q
        }
        for (let f = 0; f < O.length; f++)
            a[O[f]]._x_refreshXForScope(u[l.indexOf(O[f])]);
        o._x_prevKeys = l
    }
    )
}
function ji(e) {
    let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/
      , r = /^\s*\(|\)\s*$/g
      , n = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/
      , i = e.match(n);
    if (!i)
        return;
    let o = {};
    o.items = i[2].trim();
    let s = i[1].replace(r, "").trim()
      , a = s.match(t);
    return a ? (o.item = s.replace(t, "").trim(),
    o.index = a[1].trim(),
    a[2] && (o.collection = a[2].trim())) : o.item = s,
    o
}
function yt(e, t, r, n) {
    let i = {};
    return /^\[.*\]$/.test(e.item) && Array.isArray(t) ? e.item.replace("[", "").replace("]", "").split(",").map(s=>s.trim()).forEach((s,a)=>{
        i[s] = t[a]
    }
    ) : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object" ? e.item.replace("{", "").replace("}", "").split(",").map(s=>s.trim()).forEach(s=>{
        i[s] = t[s]
    }
    ) : i[e.item] = t,
    e.index && (i[e.index] = r),
    e.collection && (i[e.collection] = n),
    i
}
function Li(e) {
    return !Array.isArray(e) && !isNaN(e)
}
function Pr() {}
Pr.inline = (e,{expression: t},{cleanup: r})=>{
    let n = fe(e);
    n._x_refs || (n._x_refs = {}),
    n._x_refs[t] = e,
    r(()=>delete n._x_refs[t])
}
;
g("ref", Pr);
g("if", (e,{expression: t},{effect: r, cleanup: n})=>{
    let i = m(e, t)
      , o = ()=>{
        if (e._x_currentIfEl)
            return e._x_currentIfEl;
        let a = e.content.cloneNode(!0).firstElementChild;
        return ee(a, {}, e),
        x(()=>{
            e.after(a),
            I(a)
        }
        ),
        e._x_currentIfEl = a,
        e._x_undoIf = ()=>{
            M(a, c=>{
                c._x_effects && c._x_effects.forEach(vt)
            }
            ),
            a.remove(),
            delete e._x_currentIfEl
        }
        ,
        a
    }
      , s = ()=>{
        !e._x_undoIf || (e._x_undoIf(),
        delete e._x_undoIf)
    }
    ;
    r(()=>i(a=>{
        a ? o() : s()
    }
    )),
    n(()=>e._x_undoIf && e._x_undoIf())
}
);
g("id", (e,{expression: t},{evaluate: r})=>{
    r(t).forEach(i=>mi(e, i))
}
);
Xe(Lt("@", Nt(H("on:"))));
g("on", re((e,{value: t, modifiers: r, expression: n},{cleanup: i})=>{
    let o = n ? m(e, n) : ()=>{}
    ;
    e.tagName.toLowerCase() === "template" && (e._x_forwardEvents || (e._x_forwardEvents = []),
    e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
    let s = He(e, t, r, a=>{
        o(()=>{}
        , {
            scope: {
                $event: a
            },
            params: [a]
        })
    }
    );
    i(()=>s())
}
));
we("Collapse", "collapse", "collapse");
we("Intersect", "intersect", "intersect");
we("Focus", "trap", "focus");
we("Mask", "mask", "mask");
function we(e, t, r) {
    g(t, n=>T(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${r}`, n))
}
ne.setEvaluator(Pt);
ne.setReactivityEngine({
    reactive: ct,
    effect: Yn,
    release: Xn,
    raw: h
});
var Ni = ne
  , $r = Ni;
window.Alpine = $r;
$r.start();
