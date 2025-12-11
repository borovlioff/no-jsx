let c = null;
const u = /* @__PURE__ */ new Set();
let d = !1;
const v = (e) => {
  d = !0;
  try {
    e();
  } finally {
    d = !1, u.forEach((t) => t()), u.clear();
  }
}, a = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), C = (e) => {
  const t = {};
  return {
    get() {
      return c && (a.has(t) || a.set(t, /* @__PURE__ */ new Set()), a.get(t).add(c), i.has(c) || i.set(c, /* @__PURE__ */ new Set()), i.get(c).add(t)), e;
    },
    set(r) {
      if (Object.is(e, r)) return;
      e = r;
      const n = a.get(t);
      if (!n) return;
      const l = () => n.forEach((o) => o());
      d ? u.add(l) : l();
    }
  };
}, p = (e) => e == null ? null : typeof e == "string" || typeof e == "number" ? document.createTextNode(String(e)) : e instanceof Node ? e : null, y = (e) => e.map((t) => typeof t == "function" ? t() : t), g = (e, t, ...r) => {
  if (typeof e == "function")
    return e({ ...t, children: r });
  const n = document.createElement(e);
  if (t && typeof t == "object")
    for (const [o, s] of Object.entries(t))
      o.startsWith("on") && typeof s == "function" ? n.addEventListener(o.slice(2).toLowerCase(), s) : o === "style" && typeof s == "string" ? n.style.cssText = s : o in n ? n[o] = s : n.setAttribute(o, String(s));
  const l = () => {
    const s = y(r).map(p).filter((h) => h !== null);
    n.replaceChildren(...s);
  };
  c = l;
  try {
    l();
  } finally {
    c = null;
  }
  return r.forEach((o, s) => {
    if (typeof o == "function") {
      c = () => {
        const b = y(r), m = p(b[s]);
        m && (n.childNodes[s] ? n.childNodes[s].parentElement : n) === n && n.childNodes[s] && n.replaceChild(m, n.childNodes[s]);
      };
      try {
        o();
      } finally {
        c = null;
      }
    }
  }), n;
};
function f(e) {
  return (t, ...r) => g(e, t, ...r);
}
const E = f("div"), N = f("span"), S = f("button"), w = f("input"), T = f("h1"), j = f("ul"), x = f("li"), k = f("section"), L = f("p"), M = (...e) => {
  const t = document.createDocumentFragment(), r = () => {
    const l = y(e).map(p).filter((o) => o !== null);
    t.replaceChildren(...l);
  };
  c = r;
  try {
    r();
  } finally {
    c = null;
  }
  return t;
}, A = {
  createStore: C,
  batch: v,
  fragment: M,
  div: E,
  span: N,
  button: S,
  input: w,
  h1: T,
  ul: j,
  li: x,
  p: L,
  section: k,
  h: g
};
export {
  v as batch,
  S as button,
  C as createStore,
  E as div,
  M as fragment,
  T as h1,
  w as input,
  x as li,
  L as p,
  A as render,
  k as section,
  N as span,
  j as ul
};
