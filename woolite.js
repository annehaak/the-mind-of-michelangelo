(function() {
    var t,
        e,
        n,
        i,
        o = function(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        };
    t = function() {
        function t() {}
        return t.prototype.addEvent = function(t, e, n) {
            return null != t.addEventListener ? t.addEventListener(e, n, !1) : null != t.attachEvent ? t.attachEvent("on" + e, n) : t[e] = n
        }, t.prototype.removeEvent = function(t, e, n) {
            return null != t.removeEventListener ? t.removeEventListener(e, n, !1) : null != t.detachEvent ? t.detachEvent("on" + e, n) : delete t[e]
        }, t.prototype.innerHeight = function() {
            return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
        }, t
    }(), e = this.WeakMap || this.MozWeakMap || (e = function() {
        function t() {
            this.keys = [], this.values = []
        }
        return t.prototype.get = function(t) {
            var e,
                n,
                i,
                o;
            for (e = n = 0, i = (o = this.keys).length; n < i; e = ++n)
                if (o[e] === t)
                    return this.values[e]
        }, t.prototype.set = function(t, e) {
            var n,
                i,
                o,
                r;
            for (n = i = 0, o = (r = this.keys).length; i < o; n = ++i)
                if (r[n] === t)
                    return void (this.values[n] = e);
            return this.keys.push(t), this.values.push(e)
        }, t
    }()), n = this.getComputedStyle || function(t, e) {
        return this.getPropertyValue = function(e) {
            var n;
            return "float" === e && (e = "styleFloat"), i.test(e) && e.replace(i, function(t, e) {
                return e.toUpperCase()
            }), (null != (n = t.currentStyle) ? n[e] : void 0) || null
        }, this
    }, i = /(\-([a-z]){1})/g, this.woolite = function() {
        function i(t) {
            window.wooliteObj = this, this.scrollCallback = o(this.scrollCallback, this), this.scrollHandler = o(this.scrollHandler, this), this.resetAnimation = o(this.resetAnimation, this), this.start = o(this.start, this), this.scrolled = !0, this.animationNameCache = new e
        }
        return i.prototype.init = function() {
            return this.element = window.document.documentElement, this.stopped = !1, this.boxes = [], []
        }, i.prototype.addAnimation = function(t, e, n, i, o) {
            var r = {
                element: t,
                duration: e,
                delay: n,
                iteration: i,
                offset: o
            };
            this.applyStyle(r, !0), this.boxes.push(r)
        }, i.prototype.start = function() {
            return this.util().addEvent(window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50), this.finished = []
        }, i.prototype.stop = function() {
            if (this.stopped = !0, this.util().removeEvent(window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval)
                return clearInterval(this.interval)
        }, i.prototype.show = function(t) {
            return this.applyStyle(t), t.element.className = t.element.className + " animated", this.util().addEvent(t.element, "animationend", this.resetAnimation), this.util().addEvent(t.element, "oanimationend", this.resetAnimation), this.util().addEvent(t.element, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(t.element, "MSAnimationEnd", this.resetAnimation), t
        }, i.prototype.applyStyle = function(t, e) {
            return this.animate((n = this, function() {
                return n.customStyle(t.element, e, t.duration, t.delay, t.iteration)
            }));
            var n
        }, i.prototype.animate = "requestAnimationFrame" in window ? function(t) {
            return window.requestAnimationFrame(t)
        } : function(t) {
            return t()
        }, i.prototype.resetAnimation = function(t) {
            var e;
            if (t.type.toLowerCase().indexOf("animationend") >= 0)
                return (e = t.target || t.srcElement).className = e.className.replace("animated", "").trim()
        }, i.prototype.customStyle = function(t, e, n, i, o) {
            return e && this.cacheAnimationName(t), t.style.visibility = e ? "hidden" : "visible", n && this.vendorSet(t.style, {
                animationDuration: n
            }), i && this.vendorSet(t.style, {
                animationDelay: i
            }), o && this.vendorSet(t.style, {
                animationIterationCount: o
            }), this.vendorSet(t.style, {
                animationName: e ? "none" : this.cachedAnimationName(t)
            }), t
        }, i.prototype.vendors = ["moz", "webkit"], i.prototype.vendorSet = function(t, e) {
            var n,
                i,
                o,
                r;
            for (n in i = [], e)
                o = e[n], t["" + n] = o, i.push(function() {
                    var e,
                        i,
                        s,
                        a;
                    for (a = [], e = 0, i = (s = this.vendors).length; e < i; e++)
                        r = s[e], a.push(t["" + r + n.charAt(0).toUpperCase() + n.substr(1)] = o);
                    return a
                }.call(this));
            return i
        }, i.prototype.vendorCSS = function(t, e) {
            var i,
                o,
                r,
                s,
                a,
                l;
            for (s = (a = n(t)).getPropertyCSSValue(e), i = 0, o = (r = this.vendors).length; i < o; i++)
                l = r[i], s = s || a.getPropertyCSSValue("-" + l + "-" + e);
            return s
        }, i.prototype.animationName = function(t) {
            var e;
            try {
                e = this.vendorCSS(t, "animation-name").cssText
            } catch (i) {
                e = n(t).getPropertyValue("animation-name")
            }
            return "none" === e ? "" : e
        }, i.prototype.cacheAnimationName = function(t) {
            return this.animationNameCache.set(t, this.animationName(t))
        }, i.prototype.cachedAnimationName = function(t) {
            return this.animationNameCache.get(t)
        }, i.prototype.scrollHandler = function() {
            return this.scrolled = !0
        }, i.prototype.scrollCallback = function() {
            if (this.scrolled) {
                this.scrolled = !1;
                var t,
                    e,
                    n,
                    i,
                    o = [];
                for (e = 0, n = (i = this.boxes).length; e < n; e++)
                    (t = i[e]) && (this.isVisible(t) && -1 == t.element.className.search("animated") && this.show(t), o.push(t));
                if (this.boxes = o, !this.boxes.length)
                    return this.stop()
            }
        }, i.prototype.getTop = function(t) {
            var e = n(t.parentNode),
                i = (e.transform || e.webkitTransform || e.mozTransform || e.msTransform).match(/^matrix\((.+)\)$/);
            if (i && parseFloat(i[1].split(", ")[3]) < 0)
                return t.parentNode.clientHeight - t.offsetTop - t.clientHeight;
            return t.offsetTop
        }, i.prototype.offsetTop = function(t) {
            for (var e; void 0 === t.offsetTop;)
                t = t.parentNode;
            for (e = this.getTop(t); t = t.offsetParent;)
                e += this.getTop(t);
            return e
        }, i.prototype.isVisible = function(t) {
            return -1 != t.element.parentElement.className.indexOf("slick-slide") && 0 == n(t.element.parentElement).opacity || null != t.element.parentElement.parentElement && -1 != t.element.parentElement.parentElement.className.indexOf("slick-slide") && 0 == n(t.element.parentElement.parentElement).opacity ? (t.element.className = t.element.className.replace("animated", "").trim(), this.applyStyle(t, !0), t.restore = !0, !1) : "hidden" == n(t.element).visibility && (i = t.offset || 0, r = (s = window.pageYOffset) + Math.min(this.element.clientHeight, this.util().innerHeight()) - i, e = (o = this.offsetTop(t.element)) + t.element.clientHeight, o <= r && e >= s);
            var e,
                i,
                o,
                r,
                s
        }, i.prototype.util = function() {
            return null != this._util ? this._util : this._util = new t
        }, i
    }()
}).call(this);

