!function(t, e) {
    function i() {
        T = O = x = k = E = B = z
    }
    function o(t, e) {
        for (var i in e)
            e.hasOwnProperty(i) && (t[i] = e[i])
    }
    function n(t) {
        return parseFloat(t) || 0
    }
    function r() {
        C = {
            top: e.pageYOffset,
            left: e.pageXOffset
        }
    }
    function a() {
        return e.pageXOffset != C.left ? (r(), void x()) : void (e.pageYOffset != C.top && (r(), f()))
    }
    function d() {
        setTimeout(function() {
            e.pageYOffset != C.top && (C.top = e.pageYOffset, f())
        }, 0)
    }
    function f() {
        for (var t = H.length - 1; t >= 0; t--)
            s(H[t])
    }
    function s(t) {
        if (t.inited) {
            var e = C.top < t.limit.start ? 0 : C.top < t.limit.end ? 1 : 2;
            t.mode != e && m(t, e)
        }
    }
    function p() {
        for (var t = H.length - 1; t >= 0; t--)
            if (H[t].inited) {
                var e = Math.abs(y(H[t].clone) - H[t].docOffsetTop),
                    i = Math.abs(H[t].parent.node.offsetHeight - H[t].parent.height);
                if (e >= 2 || i >= 2)
                    return !1
            }
        return !0
    }
    function l(t) {
        isNaN(parseFloat(t.computed.top)) || t.isCell || "none" == t.computed.display || (t.inited = !0, t.clone || u(t), "absolute" != t.parent.computed.position && "relative" != t.parent.computed.position && (t.parent.node.style.position = "relative"), s(t), t.parent.height = t.parent.node.offsetHeight, t.docOffsetTop = y(t.clone))
    }
    function c(t) {
        var e = !0;
        t.clone && v(t), o(t.node.style, t.css);
        for (var i = H.length - 1; i >= 0; i--)
            if (H[i].node !== t.node && H[i].parent.node === t.parent.node) {
                e = !1;
                break
            }
        e && (t.parent.node.style.position = t.parent.css.position), t.mode = -1
    }
    function g() {
        for (var t = H.length - 1; t >= 0; t--)
            l(H[t])
    }
    function h() {
        for (var t = H.length - 1; t >= 0; t--)
            c(H[t])
    }
    function m(t, e) {
        var i = t.node.style;
        switch (e) {
        case 0:
            i.position = "absolute", i.left = t.offset.left + "px", i.right = t.offset.right + "px", i.top = t.offset.top + "px", i.bottom = "auto", i.width = "auto", i.marginLeft = 0, i.marginRight = 0, i.marginTop = 0;
            break;
        case 1:
            i.position = "fixed", i.left = t.box.left + "px", i.right = t.box.right + "px", i.top = t.css.top, i.bottom = "auto", i.width = "auto", i.marginLeft = 0, i.marginRight = 0, i.marginTop = 0;
            break;
        case 2:
            i.position = "absolute", i.left = t.offset.left + "px", i.right = t.offset.right + "px", i.top = "auto", i.bottom = 0, i.width = "auto", i.marginLeft = 0, i.marginRight = 0
        }
        t.mode = e
    }
    function u(t) {
        t.clone = document.createElement("div");
        var e = t.node.nextSibling || t.node,
            i = t.clone.style;
        i.height = t.height + "px", i.width = t.width + "px", i.marginTop = t.computed.marginTop, i.marginBottom = t.computed.marginBottom, i.marginLeft = t.computed.marginLeft, i.marginRight = t.computed.marginRight, i.padding = i.border = i.borderSpacing = 0, i.fontSize = "1em", i.position = "static", i.cssFloat = t.computed.cssFloat, t.node.parentNode.insertBefore(t.clone, e)
    }
    function v(t) {
        t.clone.parentNode.removeChild(t.clone), t.clone = void 0
    }
    function b(t) {
        var e = getComputedStyle(t),
            i = t.parentNode,
            o = getComputedStyle(i),
            r = t.style.position;
        t.style.position = "relative";
        var a = {
                top: e.top,
                marginTop: e.marginTop,
                marginBottom: e.marginBottom,
                marginLeft: e.marginLeft,
                marginRight: e.marginRight,
                cssFloat: e.cssFloat,
                display: e.display
            },
            d = {
                top: n(e.top),
                marginBottom: n(e.marginBottom),
                paddingLeft: n(e.paddingLeft),
                paddingRight: n(e.paddingRight),
                borderLeftWidth: n(e.borderLeftWidth),
                borderRightWidth: n(e.borderRightWidth)
            };
        t.style.position = r;
        var f = {
                position: t.style.position,
                top: t.style.top,
                bottom: t.style.bottom,
                left: t.style.left,
                right: t.style.right,
                width: t.style.width,
                marginTop: t.style.marginTop,
                marginLeft: t.style.marginLeft,
                marginRight: t.style.marginRight
            },
            s = w(t),
            p = w(i),
            l = {
                node: i,
                css: {
                    position: i.style.position
                },
                computed: {
                    position: o.position
                },
                numeric: {
                    borderLeftWidth: n(o.borderLeftWidth),
                    borderRightWidth: n(o.borderRightWidth),
                    borderTopWidth: n(o.borderTopWidth),
                    borderBottomWidth: n(o.borderBottomWidth)
                }
            },
            c = {
                node: t,
                box: {
                    left: s.win.left,
                    right: Y.clientWidth - s.win.right
                },
                offset: {
                    top: s.win.top - p.win.top - l.numeric.borderTopWidth,
                    left: s.win.left - p.win.left - l.numeric.borderLeftWidth,
                    right: -s.win.right + p.win.right - l.numeric.borderRightWidth
                },
                css: f,
                isCell: "table-cell" == e.display,
                computed: a,
                numeric: d,
                width: s.win.right - s.win.left,
                height: s.win.bottom - s.win.top,
                mode: -1,
                inited: !1,
                parent: l,
                limit: {
                    start: s.doc.top - d.top,
                    end: p.doc.top + i.offsetHeight - l.numeric.borderBottomWidth - t.offsetHeight - d.top - d.marginBottom
                }
            };
        return c
    }
    function y(t) {
        for (var e = 0; t;)
            e += t.offsetTop, t = t.offsetParent;
        return e
    }
    function w(t) {
        var i = t.getBoundingClientRect();
        return {
            doc: {
                top: i.top + e.pageYOffset,
                left: i.left + e.pageXOffset
            },
            win: i
        }
    }
    function L() {
        F = setInterval(function() {
            !p() && x()
        }, 500)
    }
    function R() {
        clearInterval(F)
    }
    function W() {
        N && (document[I] ? R() : L())
    }
    function T() {
        N || (r(), g(), e.addEventListener("scroll", a), e.addEventListener("wheel", d), e.addEventListener("resize", x), e.addEventListener("orientationchange", x), t.addEventListener(X, W), L(), N = !0)
    }
    function x() {
        if (N) {
            h();
            for (var t = H.length - 1; t >= 0; t--)
                H[t] = b(H[t].node);
            g()
        }
    }
    function k() {
        e.removeEventListener("scroll", a), e.removeEventListener("wheel", d), e.removeEventListener("resize", x), e.removeEventListener("orientationchange", x), t.removeEventListener(X, W), R(), N = !1
    }
    function E() {
        k(), h()
    }
    function B() {
        for (E(); H.length;)
            H.pop()
    }
    function O(t) {
        for (var e = H.length - 1; e >= 0; e--)
            if (H[e].node === t)
                return;
        P && (t.style.position = "relative");
        var i = b(t);
        H.push(i), N ? l(i) : T()
    }
    function S(t) {
        for (var e = H.length - 1; e >= 0; e--)
            H[e].node === t && (c(H[e]), H.splice(e, 1))
    }
    var C,
        F,
        H = [],
        N = !1,
        Y = t.documentElement,
        z = function() {},
        I = "hidden",
        X = "visibilitychange",
        j = !!window.chrome,
        M = function() {
            var t = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
            return t ? parseInt(t[2], 10) : !1
        },
        P = j && 56 == M();
    void 0 !== t.webkitHidden && (I = "webkitHidden", X = "webkitvisibilitychange"), e.getComputedStyle || i();
    for (var Q = ["", "-webkit-", "-moz-", "-ms-"], A = document.createElement("div"), q = Q.length - 1; q >= 0; q--) {
        try {
            A.style.position = Q[q] + "sticky"
        } catch (D) {}
        P || "" == A.style.position || i()
    }
    r(), e.Stickyfill = {
        stickies: H,
        add: O,
        remove: S,
        init: T,
        rebuild: x,
        pause: k,
        stop: E,
        kill: B
    }
}(document, window), window.jQuery && !function(t) {
    t.fn.Stickyfill = function() {
        return this.each(function() {
            Stickyfill.add(this)
        }), this
    }
}(window.jQuery);

