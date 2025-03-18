window.SKIN_DIRS = {basic: {root: "basic", res: "basic/v0.0.41_v14.13.3"}};
(() => {
  var e = {2236: () => {
    var e;
    try {
      e = window.localStorage;
    } catch (a) {
      console.log("LocalStorage is unavailable!");
    }
    window.GAME_GROUP = "casual";
    var r = window.SKIN_DIRS || {}, o = window.__OPTIONS__.rules_url, i = o.slice(o.indexOf(`/${window.__OPTIONS__.locale}/`) + 1);
    function t(r) {
      var o = (r.ui.skin || "basic").toLocaleLowerCase(), i = window.location.search.match(new RegExp("[?&]skin=([^&]*)(&?)", "i")), t = i ? i[1] : null;
      if (!e) return t || o;
      var a = `lastApiSkin_${r.cache_id}`, n = `userSkin_${r.cache_id}`;
      return t ? e.setItem(n, t) : t = e.getItem(n), e.getItem(a) === o && t ? t : (e.removeItem(n), e.setItem(a, o), o);
    }
    window.__OPTIONS__.rules_url = "https://rules.bgaming-network.com/" + i, window.initializeCasinoOptions = e => {
      var o = t(e), {root: i, res: a = "v0.0.41_v14.13.3"} = r[o] || r.basic || {};
      e.ui.applied_skin = i, e.resources_root_path = e.resources_path + (i ? `/${i}` : ""), e.resources_path += `/${a}`, e.game_bundle_source = e.resources_path + "/bundle.js", window.__OPTIONS__ = e;
    };
  }}, r = {};
  function o(i) {
    var t = r[i];
    if (undefined !== t) return t.exports;
    var a = r[i] = {exports: {}};
    return e[i](a, a.exports, o), a.exports;
  }
  o.n = e => {
    var r = e && e.__esModule ? () => e.default : () => e;
    return o.d(r, {a: r}), r;
  }, o.d = (e, r) => {
    for (var i in r) o.o(r, i) && !o.o(e, i) && Object.defineProperty(e, i, {enumerable: true, get: r[i]});
  }, o.o = (e, r) => Object.prototype.hasOwnProperty.call(e, r);
  (() => {
    "use strict";
    o(2236);
    var e = window.__OPTIONS__;
    e.identifier, window.initializeCasinoOptions(e);
  })();
})();
