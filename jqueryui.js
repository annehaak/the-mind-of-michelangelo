/*! jQuery UI - v1.11.1 - 2014-10-09
* http://jqueryui.com
* Includes: core.js, widget.js, mouse.js, position.js, effect.js, effect-blind.js, effect-bounce.js, effect-clip.js, effect-drop.js, effect-explode.js, effect-fade.js, effect-fold.js, effect-highlight.js, effect-puff.js, effect-pulsate.js, effect-scale.js, effect-shake.js, effect-size.js, effect-slide.js, effect-transfer.js
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */

(function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
})(function(e) {
    function t(t, s) {
        var n,
            a,
            o,
            r = t.nodeName.toLowerCase();
        return "area" === r ? (n = t.parentNode, a = n.name, t.href && a && "map" === n.nodeName.toLowerCase() ? (o = e("img[usemap='#" + a + "']")[0], !!o && i(o)) : !1) : (/input|select|textarea|button|object/.test(r) ? !t.disabled : "a" === r ? t.href || s : s) && i(t)
    }
    function i(t) {
        return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
                return "hidden" === e.css(this, "visibility")
            }).length
    }
    e.ui = e.ui || {}, e.extend(e.ui, {
        version: "1.11.1",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), e.fn.extend({
        scrollParent: function(t) {
            var i = this.css("position"),
                s = "absolute" === i,
                n = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                a = this.parents().filter(function() {
                    var t = e(this);
                    return s && "static" === t.css("position") ? !1 : n.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"))
                }).eq(0);
            return "fixed" !== i && a.length ? a : e(this[0].ownerDocument || document)
        },
        uniqueId: function() {
            var e = 0;
            return function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++e)
                })
            }
        }(),
        removeUniqueId: function() {
            return this.each(function() {
                /^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id")
            })
        }
    }), e.extend(e.expr[":"], {
        data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
            return function(i) {
                return !!e.data(i, t)
            }
        }) : function(t, i, s) {
            return !!e.data(t, s[3])
        },
        focusable: function(i) {
            return t(i, !isNaN(e.attr(i, "tabindex")))
        },
        tabbable: function(i) {
            var s = e.attr(i, "tabindex"),
                n = isNaN(s);
            return (n || s >= 0) && t(i, !n)
        }
    }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(t, i) {
        function s(t, i, s, a) {
            return e.each(n, function() {
                i -= parseFloat(e.css(t, "padding" + this)) || 0, s && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), a && (i -= parseFloat(e.css(t, "margin" + this)) || 0)
            }), i
        }
        var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
            a = i.toLowerCase(),
            o = {
                innerWidth: e.fn.innerWidth,
                innerHeight: e.fn.innerHeight,
                outerWidth: e.fn.outerWidth,
                outerHeight: e.fn.outerHeight
            };
        e.fn["inner" + i] = function(t) {
            return void 0 === t ? o["inner" + i].call(this) : this.each(function() {
                e(this).css(a, s(this, t) + "px")
            })
        }, e.fn["outer" + i] = function(t, n) {
            return "number" != typeof t ? o["outer" + i].call(this, t) : this.each(function() {
                e(this).css(a, s(this, t, !0, n) + "px")
            })
        }
    }), e.fn.addBack || (e.fn.addBack = function(e) {
        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
        return function(i) {
            return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this)
        }
    }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.fn.extend({
        focus: function(t) {
            return function(i, s) {
                return "number" == typeof i ? this.each(function() {
                    var t = this;
                    setTimeout(function() {
                        e(t).focus(), s && s.call(t)
                    }, i)
                }) : t.apply(this, arguments)
            }
        }(e.fn.focus),
        disableSelection: function() {
            var e = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
            return function() {
                return this.bind(e + ".ui-disableSelection", function(e) {
                    e.preventDefault()
                })
            }
        }(),
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        },
        zIndex: function(t) {
            if (void 0 !== t)
                return this.css("zIndex", t);
            if (this.length)
                for (var i, s, n = e(this[0]); n.length && n[0] !== document;) {
                    if (i = n.css("position"), ("absolute" === i || "relative" === i || "fixed" === i) && (s = parseInt(n.css("zIndex"), 10), !isNaN(s) && 0 !== s))
                        return s;
                    n = n.parent()
                }
            return 0
        }
    }), e.ui.plugin = {
        add: function(t, i, s) {
            var n,
                a = e.ui[t].prototype;
            for (n in s)
                a.plugins[n] = a.plugins[n] || [], a.plugins[n].push([i, s[n]])
        },
        call: function(e, t, i, s) {
            var n,
                a = e.plugins[t];
            if (a && (s || e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType))
                for (n = 0; a.length > n; n++)
                    e.options[a[n][0]] && a[n][1].apply(e.element, i)
        }
    };
    var s = 0,
        n = Array.prototype.slice;
    e.cleanData = function(t) {
        return function(i) {
            var s,
                n,
                a;
            for (a = 0; null != (n = i[a]); a++)
                try {
                    s = e._data(n, "events"), s && s.remove && e(n).triggerHandler("remove")
                } catch (o) {}
            t(i)
        }
    }(e.cleanData), e.widget = function(t, i, s) {
        var n,
            a,
            o,
            r,
            h = {},
            l = t.split(".")[0];
        return t = t.split(".")[1], n = l + "-" + t, s || (s = i, i = e.Widget), e.expr[":"][n.toLowerCase()] = function(t) {
            return !!e.data(t, n)
        }, e[l] = e[l] || {}, a = e[l][t], o = e[l][t] = function(e, t) {
            return this._createWidget ? (arguments.length && this._createWidget(e, t), void 0) : new o(e, t)
        }, e.extend(o, a, {
            version: s.version,
            _proto: e.extend({}, s),
            _childConstructors: []
        }), r = new i, r.options = e.widget.extend({}, r.options), e.each(s, function(t, s) {
            return e.isFunction(s) ? (h[t] = function() {
                var e = function() {
                        return i.prototype[t].apply(this, arguments)
                    },
                    n = function(e) {
                        return i.prototype[t].apply(this, e)
                    };
                return function() {
                    var t,
                        i = this._super,
                        a = this._superApply;
                    return this._super = e, this._superApply = n, t = s.apply(this, arguments), this._super = i, this._superApply = a, t
                }
            }(), void 0) : (h[t] = s, void 0)
        }), o.prototype = e.widget.extend(r, {
            widgetEventPrefix: a ? r.widgetEventPrefix || t : t
        }, h, {
            constructor: o,
            namespace: l,
            widgetName: t,
            widgetFullName: n
        }), a ? (e.each(a._childConstructors, function(t, i) {
            var s = i.prototype;
            e.widget(s.namespace + "." + s.widgetName, o, i._proto)
        }), delete a._childConstructors) : i._childConstructors.push(o), e.widget.bridge(t, o), o
    }, e.widget.extend = function(t) {
        for (var i, s, a = n.call(arguments, 1), o = 0, r = a.length; r > o; o++)
            for (i in a[o])
                s = a[o][i], a[o].hasOwnProperty(i) && void 0 !== s && (t[i] = e.isPlainObject(s) ? e.isPlainObject(t[i]) ? e.widget.extend({}, t[i], s) : e.widget.extend({}, s) : s);
        return t
    }, e.widget.bridge = function(t, i) {
        var s = i.prototype.widgetFullName || t;
        e.fn[t] = function(a) {
            var o = "string" == typeof a,
                r = n.call(arguments, 1),
                h = this;
            return a = !o && r.length ? e.widget.extend.apply(null, [a].concat(r)) : a, o ? this.each(function() {
                var i,
                    n = e.data(this, s);
                return "instance" === a ? (h = n, !1) : n ? e.isFunction(n[a]) && "_" !== a.charAt(0) ? (i = n[a].apply(n, r), i !== n && void 0 !== i ? (h = i && i.jquery ? h.pushStack(i.get()) : i, !1) : void 0) : e.error("no such method '" + a + "' for " + t + " widget instance") : e.error("cannot call methods on " + t + " prior to initialization; " + "attempted to call method '" + a + "'")
            }) : this.each(function() {
                var t = e.data(this, s);
                t ? (t.option(a || {}), t._init && t._init()) : e.data(this, s, new i(a, this))
            }), h
        }
    }, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(t, i) {
            i = e(i || this.defaultElement || this)[0], this.element = e(i), this.uuid = s++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = e(), this.hoverable = e(), this.focusable = e(), i !== this && (e.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(e) {
                    e.target === i && this.destroy()
                }
            }), this.document = e(i.style ? i.ownerDocument : i.document || i), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: e.noop,
        _getCreateEventData: e.noop,
        _create: e.noop,
        _init: e.noop,
        destroy: function() {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: e.noop,
        widget: function() {
            return this.element
        },
        option: function(t, i) {
            var s,
                n,
                a,
                o = t;
            if (0 === arguments.length)
                return e.widget.extend({}, this.options);
            if ("string" == typeof t)
                if (o = {}, s = t.split("."), t = s.shift(), s.length) {
                    for (n = o[t] = e.widget.extend({}, this.options[t]), a = 0; s.length - 1 > a; a++)
                        n[s[a]] = n[s[a]] || {}, n = n[s[a]];
                    if (t = s.pop(), 1 === arguments.length)
                        return void 0 === n[t] ? null : n[t];
                    n[t] = i
                } else {
                    if (1 === arguments.length)
                        return void 0 === this.options[t] ? null : this.options[t];
                    o[t] = i
                }
            return this._setOptions(o), this
        },
        _setOptions: function(e) {
            var t;
            for (t in e)
                this._setOption(t, e[t]);
            return this
        },
        _setOption: function(e, t) {
            return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!t), t && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
        },
        enable: function() {
            return this._setOptions({
                disabled: !1
            })
        },
        disable: function() {
            return this._setOptions({
                disabled: !0
            })
        },
        _on: function(t, i, s) {
            var n,
                a = this;
            "boolean" != typeof t && (s = i, i = t, t = !1), s ? (i = n = e(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, n = this.widget()), e.each(s, function(s, o) {
                function r() {
                    return t || a.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? a[o] : o).apply(a, arguments) : void 0
                }
                "string" != typeof o && (r.guid = o.guid = o.guid || r.guid || e.guid++);
                var h = s.match(/^([\w:-]*)\s*(.*)$/),
                    l = h[1] + a.eventNamespace,
                    u = h[2];
                u ? n.delegate(u, l, r) : i.bind(l, r)
            })
        },
        _off: function(e, t) {
            t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t)
        },
        _delay: function(e, t) {
            function i() {
                return ("string" == typeof e ? s[e] : e).apply(s, arguments)
            }
            var s = this;
            return setTimeout(i, t || 0)
        },
        _hoverable: function(t) {
            this.hoverable = this.hoverable.add(t), this._on(t, {
                mouseenter: function(t) {
                    e(t.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(t) {
                    e(t.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(t) {
            this.focusable = this.focusable.add(t), this._on(t, {
                focusin: function(t) {
                    e(t.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(t) {
                    e(t.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(t, i, s) {
            var n,
                a,
                o = this.options[t];
            if (s = s || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], a = i.originalEvent)
                for (n in a)
                    n in i || (i[n] = a[n]);
            return this.element.trigger(i, s), !(e.isFunction(o) && o.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
        }
    }, e.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(t, i) {
        e.Widget.prototype["_" + t] = function(s, n, a) {
            "string" == typeof n && (n = {
                effect: n
            });
            var o,
                r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : t;
            n = n || {}, "number" == typeof n && (n = {
                duration: n
            }), o = !e.isEmptyObject(n), n.complete = a, n.delay && s.delay(n.delay), o && e.effects && e.effects.effect[r] ? s[t](n) : r !== t && s[r] ? s[r](n.duration, n.easing, a) : s.queue(function(i) {
                e(this)[t](), a && a.call(s[0]), i()
            })
        }
    }), e.widget;
    var a = !1;
    e(document).mouseup(function() {
        a = !1
    }), e.widget("ui.mouse", {
        version: "1.11.1",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var t = this;
            this.element.bind("mousedown." + this.widgetName, function(e) {
                return t._mouseDown(e)
            }).bind("click." + this.widgetName, function(i) {
                return !0 === e.data(i.target, t.widgetName + ".preventClickEvent") ? (e.removeData(i.target, t.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0
            }), this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(t) {
            if (!a) {
                this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
                var i = this,
                    s = 1 === t.which,
                    n = "string" == typeof this.options.cancel && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
                return s && !n && this._mouseCapture(t) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    i.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(t) !== !1, !this._mouseStarted) ? (t.preventDefault(), !0) : (!0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(e) {
                    return i._mouseMove(e)
                }, this._mouseUpDelegate = function(e) {
                    return i._mouseUp(e)
                }, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), a = !0, !0)) : !0
            }
        },
        _mouseMove: function(t) {
            return e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button ? this._mouseUp(t) : t.which ? this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted) : this._mouseUp(t)
        },
        _mouseUp: function(t) {
            return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), a = !1, !1
        },
        _mouseDistanceMet: function(e) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0
        }
    }), function() {
        function t(e, t, i) {
            return [parseFloat(e[0]) * (p.test(e[0]) ? t / 100 : 1), parseFloat(e[1]) * (p.test(e[1]) ? i / 100 : 1)]
        }
        function i(t, i) {
            return parseInt(e.css(t, i), 10) || 0
        }
        function s(t) {
            var i = t[0];
            return 9 === i.nodeType ? {
                width: t.width(),
                height: t.height(),
                offset: {
                    top: 0,
                    left: 0
                }
            } : e.isWindow(i) ? {
                width: t.width(),
                height: t.height(),
                offset: {
                    top: t.scrollTop(),
                    left: t.scrollLeft()
                }
            } : i.preventDefault ? {
                width: 0,
                height: 0,
                offset: {
                    top: i.pageY,
                    left: i.pageX
                }
            } : {
                width: t.outerWidth(),
                height: t.outerHeight(),
                offset: t.offset()
            }
        }
        e.ui = e.ui || {};
        var n,
            a,
            o = Math.max,
            r = Math.abs,
            h = Math.round,
            l = /left|center|right/,
            u = /top|center|bottom/,
            d = /[\+\-]\d+(\.[\d]+)?%?/,
            c = /^\w+/,
            p = /%$/,
            f = e.fn.position;
        e.position = {
            scrollbarWidth: function() {
                if (void 0 !== n)
                    return n;
                var t,
                    i,
                    s = e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                    a = s.children()[0];
                return e("body").append(s), t = a.offsetWidth, s.css("overflow", "scroll"), i = a.offsetWidth, t === i && (i = s[0].clientWidth), s.remove(), n = t - i
            },
            getScrollInfo: function(t) {
                var i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
                    s = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
                    n = "scroll" === i || "auto" === i && t.width < t.element[0].scrollWidth,
                    a = "scroll" === s || "auto" === s && t.height < t.element[0].scrollHeight;
                return {
                    width: a ? e.position.scrollbarWidth() : 0,
                    height: n ? e.position.scrollbarWidth() : 0
                }
            },
            getWithinInfo: function(t) {
                var i = e(t || window),
                    s = e.isWindow(i[0]),
                    n = !!i[0] && 9 === i[0].nodeType;
                return {
                    element: i,
                    isWindow: s,
                    isDocument: n,
                    offset: i.offset() || {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: i.scrollLeft(),
                    scrollTop: i.scrollTop(),
                    width: s || n ? i.width() : i.outerWidth(),
                    height: s || n ? i.height() : i.outerHeight()
                }
            }
        }, e.fn.position = function(n) {
            if (!n || !n.of)
                return f.apply(this, arguments);
            n = e.extend({}, n);
            var p,
                m,
                g,
                v,
                y,
                b,
                _ = e(n.of),
                x = e.position.getWithinInfo(n.within),
                w = e.position.getScrollInfo(x),
                k = (n.collision || "flip").split(" "),
                T = {};
            return b = s(_), _[0].preventDefault && (n.at = "left top"), m = b.width, g = b.height, v = b.offset, y = e.extend({}, v), e.each(["my", "at"], function() {
                var e,
                    t,
                    i = (n[this] || "").split(" ");
                1 === i.length && (i = l.test(i[0]) ? i.concat(["center"]) : u.test(i[0]) ? ["center"].concat(i) : ["center", "center"]), i[0] = l.test(i[0]) ? i[0] : "center", i[1] = u.test(i[1]) ? i[1] : "center", e = d.exec(i[0]), t = d.exec(i[1]), T[this] = [e ? e[0] : 0, t ? t[0] : 0], n[this] = [c.exec(i[0])[0], c.exec(i[1])[0]]
            }), 1 === k.length && (k[1] = k[0]), "right" === n.at[0] ? y.left += m : "center" === n.at[0] && (y.left += m / 2), "bottom" === n.at[1] ? y.top += g : "center" === n.at[1] && (y.top += g / 2), p = t(T.at, m, g), y.left += p[0], y.top += p[1], this.each(function() {
                var s,
                    l,
                    u = e(this),
                    d = u.outerWidth(),
                    c = u.outerHeight(),
                    f = i(this, "marginLeft"),
                    b = i(this, "marginTop"),
                    D = d + f + i(this, "marginRight") + w.width,
                    S = c + b + i(this, "marginBottom") + w.height,
                    N = e.extend({}, y),
                    M = t(T.my, u.outerWidth(), u.outerHeight());
                "right" === n.my[0] ? N.left -= d : "center" === n.my[0] && (N.left -= d / 2), "bottom" === n.my[1] ? N.top -= c : "center" === n.my[1] && (N.top -= c / 2), N.left += M[0], N.top += M[1], a || (N.left = h(N.left), N.top = h(N.top)), s = {
                    marginLeft: f,
                    marginTop: b
                }, e.each(["left", "top"], function(t, i) {
                    e.ui.position[k[t]] && e.ui.position[k[t]][i](N, {
                        targetWidth: m,
                        targetHeight: g,
                        elemWidth: d,
                        elemHeight: c,
                        collisionPosition: s,
                        collisionWidth: D,
                        collisionHeight: S,
                        offset: [p[0] + M[0], p[1] + M[1]],
                        my: n.my,
                        at: n.at,
                        within: x,
                        elem: u
                    })
                }), n.using && (l = function(e) {
                    var t = v.left - N.left,
                        i = t + m - d,
                        s = v.top - N.top,
                        a = s + g - c,
                        h = {
                            target: {
                                element: _,
                                left: v.left,
                                top: v.top,
                                width: m,
                                height: g
                            },
                            element: {
                                element: u,
                                left: N.left,
                                top: N.top,
                                width: d,
                                height: c
                            },
                            horizontal: 0 > i ? "left" : t > 0 ? "right" : "center",
                            vertical: 0 > a ? "top" : s > 0 ? "bottom" : "middle"
                        };
                    d > m && m > r(t + i) && (h.horizontal = "center"), c > g && g > r(s + a) && (h.vertical = "middle"), h.important = o(r(t), r(i)) > o(r(s), r(a)) ? "horizontal" : "vertical", n.using.call(this, e, h)
                }), u.offset(e.extend(N, {
                    using: l
                }))
            })
        }, e.ui.position = {
            fit: {
                left: function(e, t) {
                    var i,
                        s = t.within,
                        n = s.isWindow ? s.scrollLeft : s.offset.left,
                        a = s.width,
                        r = e.left - t.collisionPosition.marginLeft,
                        h = n - r,
                        l = r + t.collisionWidth - a - n;
                    t.collisionWidth > a ? h > 0 && 0 >= l ? (i = e.left + h + t.collisionWidth - a - n, e.left += h - i) : e.left = l > 0 && 0 >= h ? n : h > l ? n + a - t.collisionWidth : n : h > 0 ? e.left += h : l > 0 ? e.left -= l : e.left = o(e.left - r, e.left)
                },
                top: function(e, t) {
                    var i,
                        s = t.within,
                        n = s.isWindow ? s.scrollTop : s.offset.top,
                        a = t.within.height,
                        r = e.top - t.collisionPosition.marginTop,
                        h = n - r,
                        l = r + t.collisionHeight - a - n;
                    t.collisionHeight > a ? h > 0 && 0 >= l ? (i = e.top + h + t.collisionHeight - a - n, e.top += h - i) : e.top = l > 0 && 0 >= h ? n : h > l ? n + a - t.collisionHeight : n : h > 0 ? e.top += h : l > 0 ? e.top -= l : e.top = o(e.top - r, e.top)
                }
            },
            flip: {
                left: function(e, t) {
                    var i,
                        s,
                        n = t.within,
                        a = n.offset.left + n.scrollLeft,
                        o = n.width,
                        h = n.isWindow ? n.scrollLeft : n.offset.left,
                        l = e.left - t.collisionPosition.marginLeft,
                        u = l - h,
                        d = l + t.collisionWidth - o - h,
                        c = "left" === t.my[0] ? -t.elemWidth : "right" === t.my[0] ? t.elemWidth : 0,
                        p = "left" === t.at[0] ? t.targetWidth : "right" === t.at[0] ? -t.targetWidth : 0,
                        f = -2 * t.offset[0];
                    0 > u ? (i = e.left + c + p + f + t.collisionWidth - o - a, (0 > i || r(u) > i) && (e.left += c + p + f)) : d > 0 && (s = e.left - t.collisionPosition.marginLeft + c + p + f - h, (s > 0 || d > r(s)) && (e.left += c + p + f))
                },
                top: function(e, t) {
                    var i,
                        s,
                        n = t.within,
                        a = n.offset.top + n.scrollTop,
                        o = n.height,
                        h = n.isWindow ? n.scrollTop : n.offset.top,
                        l = e.top - t.collisionPosition.marginTop,
                        u = l - h,
                        d = l + t.collisionHeight - o - h,
                        c = "top" === t.my[1],
                        p = c ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0,
                        f = "top" === t.at[1] ? t.targetHeight : "bottom" === t.at[1] ? -t.targetHeight : 0,
                        m = -2 * t.offset[1];
                    0 > u ? (s = e.top + p + f + m + t.collisionHeight - o - a, e.top + p + f + m > u && (0 > s || r(u) > s) && (e.top += p + f + m)) : d > 0 && (i = e.top - t.collisionPosition.marginTop + p + f + m - h, e.top + p + f + m > d && (i > 0 || d > r(i)) && (e.top += p + f + m))
                }
            },
            flipfit: {
                left: function() {
                    e.ui.position.flip.left.apply(this, arguments), e.ui.position.fit.left.apply(this, arguments)
                },
                top: function() {
                    e.ui.position.flip.top.apply(this, arguments), e.ui.position.fit.top.apply(this, arguments)
                }
            }
        }, function() {
            var t,
                i,
                s,
                n,
                o,
                r = document.getElementsByTagName("body")[0],
                h = document.createElement("div");
            t = document.createElement(r ? "div" : "body"), s = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            }, r && e.extend(s, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px"
            });
            for (o in s)
                t.style[o] = s[o];
            t.appendChild(h), i = r || document.documentElement, i.insertBefore(t, i.firstChild), h.style.cssText = "position: absolute; left: 10.7432222px;", n = e(h).offset().left, a = n > 10 && 11 > n, t.innerHTML = "", i.removeChild(t)
        }()
    }(), e.ui.position;
    var o = "ui-effects-",
        r = e;
    e.effects = {
        effect: {}
    }, function(e, t) {
        function i(e, t, i) {
            var s = d[t.type] || {};
            return null == e ? i || !t.def ? null : t.def : (e = s.floor ? ~~e : parseFloat(e), isNaN(e) ? t.def : s.mod ? (e + s.mod) % s.mod : 0 > e ? 0 : e > s.max ? s.max : e)
        }
        function s(i) {
            var s = l(),
                n = s._rgba = [];
            return i = i.toLowerCase(), f(h, function(e, a) {
                var o,
                    r = a.re.exec(i),
                    h = r && a.parse(r),
                    l = a.space || "rgba";
                return h ? (o = s[l](h), s[u[l].cache] = o[u[l].cache], n = s._rgba = o._rgba, !1) : t
            }), n.length ? ("0,0,0,0" === n.join() && e.extend(n, a.transparent), s) : a[i]
        }
        function n(e, t, i) {
            return i = (i + 1) % 1, 1 > 6 * i ? e + 6 * (t - e) * i : 1 > 2 * i ? t : 2 > 3 * i ? e + 6 * (t - e) * (2 / 3 - i) : e
        }
        var a,
            o = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
            r = /^([\-+])=\s*(\d+\.?\d*)/,
            h = [{
                re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function(e) {
                    return [e[1], e[2], e[3], e[4]]
                }
            }, {
                re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function(e) {
                    return [2.55 * e[1], 2.55 * e[2], 2.55 * e[3], e[4]]
                }
            }, {
                re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                parse: function(e) {
                    return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
                }
            }, {
                re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                parse: function(e) {
                    return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
                }
            }, {
                re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                space: "hsla",
                parse: function(e) {
                    return [e[1], e[2] / 100, e[3] / 100, e[4]]
                }
            }],
            l = e.Color = function(t, i, s, n) {
                return new e.Color.fn.parse(t, i, s, n)
            },
            u = {
                rgba: {
                    props: {
                        red: {
                            idx: 0,
                            type: "byte"
                        },
                        green: {
                            idx: 1,
                            type: "byte"
                        },
                        blue: {
                            idx: 2,
                            type: "byte"
                        }
                    }
                },
                hsla: {
                    props: {
                        hue: {
                            idx: 0,
                            type: "degrees"
                        },
                        saturation: {
                            idx: 1,
                            type: "percent"
                        },
                        lightness: {
                            idx: 2,
                            type: "percent"
                        }
                    }
                }
            },
            d = {
                "byte": {
                    floor: !0,
                    max: 255
                },
                percent: {
                    max: 1
                },
                degrees: {
                    mod: 360,
                    floor: !0
                }
            },
            c = l.support = {},
            p = e("<p>")[0],
            f = e.each;
        p.style.cssText = "background-color:rgba(1,1,1,.5)", c.rgba = p.style.backgroundColor.indexOf("rgba") > -1, f(u, function(e, t) {
            t.cache = "_" + e, t.props.alpha = {
                idx: 3,
                type: "percent",
                def: 1
            }
        }), l.fn = e.extend(l.prototype, {
            parse: function(n, o, r, h) {
                if (n === t)
                    return this._rgba = [null, null, null, null], this;
                (n.jquery || n.nodeType) && (n = e(n).css(o), o = t);
                var d = this,
                    c = e.type(n),
                    p = this._rgba = [];
                return o !== t && (n = [n, o, r, h], c = "array"), "string" === c ? this.parse(s(n) || a._default) : "array" === c ? (f(u.rgba.props, function(e, t) {
                    p[t.idx] = i(n[t.idx], t)
                }), this) : "object" === c ? (n instanceof l ? f(u, function(e, t) {
                    n[t.cache] && (d[t.cache] = n[t.cache].slice())
                }) : f(u, function(t, s) {
                    var a = s.cache;
                    f(s.props, function(e, t) {
                        if (!d[a] && s.to) {
                            if ("alpha" === e || null == n[e])
                                return;
                            d[a] = s.to(d._rgba)
                        }
                        d[a][t.idx] = i(n[e], t, !0)
                    }), d[a] && 0 > e.inArray(null, d[a].slice(0, 3)) && (d[a][3] = 1, s.from && (d._rgba = s.from(d[a])))
                }), this) : t
            },
            is: function(e) {
                var i = l(e),
                    s = !0,
                    n = this;
                return f(u, function(e, a) {
                    var o,
                        r = i[a.cache];
                    return r && (o = n[a.cache] || a.to && a.to(n._rgba) || [], f(a.props, function(e, i) {
                        return null != r[i.idx] ? s = r[i.idx] === o[i.idx] : t
                    })), s
                }), s
            },
            _space: function() {
                var e = [],
                    t = this;
                return f(u, function(i, s) {
                    t[s.cache] && e.push(i)
                }), e.pop()
            },
            transition: function(e, t) {
                var s = l(e),
                    n = s._space(),
                    a = u[n],
                    o = 0 === this.alpha() ? l("transparent") : this,
                    r = o[a.cache] || a.to(o._rgba),
                    h = r.slice();
                return s = s[a.cache], f(a.props, function(e, n) {
                    var a = n.idx,
                        o = r[a],
                        l = s[a],
                        u = d[n.type] || {};
                    null !== l && (null === o ? h[a] = l : (u.mod && (l - o > u.mod / 2 ? o += u.mod : o - l > u.mod / 2 && (o -= u.mod)), h[a] = i((l - o) * t + o, n)))
                }), this[n](h)
            },
            blend: function(t) {
                if (1 === this._rgba[3])
                    return this;
                var i = this._rgba.slice(),
                    s = i.pop(),
                    n = l(t)._rgba;
                return l(e.map(i, function(e, t) {
                    return (1 - s) * n[t] + s * e
                }))
            },
            toRgbaString: function() {
                var t = "rgba(",
                    i = e.map(this._rgba, function(e, t) {
                        return null == e ? t > 2 ? 1 : 0 : e
                    });
                return 1 === i[3] && (i.pop(), t = "rgb("), t + i.join() + ")"
            },
            toHslaString: function() {
                var t = "hsla(",
                    i = e.map(this.hsla(), function(e, t) {
                        return null == e && (e = t > 2 ? 1 : 0), t && 3 > t && (e = Math.round(100 * e) + "%"), e
                    });
                return 1 === i[3] && (i.pop(), t = "hsl("), t + i.join() + ")"
            },
            toHexString: function(t) {
                var i = this._rgba.slice(),
                    s = i.pop();
                return t && i.push(~~(255 * s)), "#" + e.map(i, function(e) {
                    return e = (e || 0).toString(16), 1 === e.length ? "0" + e : e
                }).join("")
            },
            toString: function() {
                return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
            }
        }), l.fn.parse.prototype = l.fn, u.hsla.to = function(e) {
            if (null == e[0] || null == e[1] || null == e[2])
                return [null, null, null, e[3]];
            var t,
                i,
                s = e[0] / 255,
                n = e[1] / 255,
                a = e[2] / 255,
                o = e[3],
                r = Math.max(s, n, a),
                h = Math.min(s, n, a),
                l = r - h,
                u = r + h,
                d = .5 * u;
            return t = h === r ? 0 : s === r ? 60 * (n - a) / l + 360 : n === r ? 60 * (a - s) / l + 120 : 60 * (s - n) / l + 240, i = 0 === l ? 0 : .5 >= d ? l / u : l / (2 - u), [Math.round(t) % 360, i, d, null == o ? 1 : o]
        }, u.hsla.from = function(e) {
            if (null == e[0] || null == e[1] || null == e[2])
                return [null, null, null, e[3]];
            var t = e[0] / 360,
                i = e[1],
                s = e[2],
                a = e[3],
                o = .5 >= s ? s * (1 + i) : s + i - s * i,
                r = 2 * s - o;
            return [Math.round(255 * n(r, o, t + 1 / 3)), Math.round(255 * n(r, o, t)), Math.round(255 * n(r, o, t - 1 / 3)), a]
        }, f(u, function(s, n) {
            var a = n.props,
                o = n.cache,
                h = n.to,
                u = n.from;
            l.fn[s] = function(s) {
                if (h && !this[o] && (this[o] = h(this._rgba)), s === t)
                    return this[o].slice();
                var n,
                    r = e.type(s),
                    d = "array" === r || "object" === r ? s : arguments,
                    c = this[o].slice();
                return f(a, function(e, t) {
                    var s = d["object" === r ? e : t.idx];
                    null == s && (s = c[t.idx]), c[t.idx] = i(s, t)
                }), u ? (n = l(u(c)), n[o] = c, n) : l(c)
            }, f(a, function(t, i) {
                l.fn[t] || (l.fn[t] = function(n) {
                    var a,
                        o = e.type(n),
                        h = "alpha" === t ? this._hsla ? "hsla" : "rgba" : s,
                        l = this[h](),
                        u = l[i.idx];
                    return "undefined" === o ? u : ("function" === o && (n = n.call(this, u), o = e.type(n)), null == n && i.empty ? this : ("string" === o && (a = r.exec(n), a && (n = u + parseFloat(a[2]) * ("+" === a[1] ? 1 : -1))), l[i.idx] = n, this[h](l)))
                })
            })
        }), l.hook = function(t) {
            var i = t.split(" ");
            f(i, function(t, i) {
                e.cssHooks[i] = {
                    set: function(t, n) {
                        var a,
                            o,
                            r = "";
                        if ("transparent" !== n && ("string" !== e.type(n) || (a = s(n)))) {
                            if (n = l(a || n), !c.rgba && 1 !== n._rgba[3]) {
                                for (o = "backgroundColor" === i ? t.parentNode : t; ("" === r || "transparent" === r) && o && o.style;)
                                    try {
                                        r = e.css(o, "backgroundColor"), o = o.parentNode
                                    } catch (h) {}
                                n = n.blend(r && "transparent" !== r ? r : "_default")
                            }
                            n = n.toRgbaString()
                        }
                        try {
                            t.style[i] = n
                        } catch (h) {}
                    }
                }, e.fx.step[i] = function(t) {
                    t.colorInit || (t.start = l(t.elem, i), t.end = l(t.end), t.colorInit = !0), e.cssHooks[i].set(t.elem, t.start.transition(t.end, t.pos))
                }
            })
        }, l.hook(o), e.cssHooks.borderColor = {
            expand: function(e) {
                var t = {};
                return f(["Top", "Right", "Bottom", "Left"], function(i, s) {
                    t["border" + s + "Color"] = e
                }), t
            }
        }, a = e.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff"
        }
    }(r), function() {
        function t(t) {
            var i,
                s,
                n = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle,
                a = {};
            if (n && n.length && n[0] && n[n[0]])
                for (s = n.length; s--;)
                    i = n[s], "string" == typeof n[i] && (a[e.camelCase(i)] = n[i]);
            else
                for (i in n)
                    "string" == typeof n[i] && (a[i] = n[i]);
            return a
        }
        function i(t, i) {
            var s,
                a,
                o = {};
            for (s in i)
                a = i[s], t[s] !== a && (n[s] || (e.fx.step[s] || !isNaN(parseFloat(a))) && (o[s] = a));
            return o
        }
        var s = ["add", "remove", "toggle"],
            n = {
                border: 1,
                borderBottom: 1,
                borderColor: 1,
                borderLeft: 1,
                borderRight: 1,
                borderTop: 1,
                borderWidth: 1,
                margin: 1,
                padding: 1
            };
        e.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(t, i) {
            e.fx.step[i] = function(e) {
                ("none" !== e.end && !e.setAttr || 1 === e.pos && !e.setAttr) && (r.style(e.elem, i, e.end), e.setAttr = !0)
            }
        }), e.fn.addBack || (e.fn.addBack = function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }), e.effects.animateClass = function(n, a, o, r) {
            var h = e.speed(a, o, r);
            return this.queue(function() {
                var a,
                    o = e(this),
                    r = o.attr("class") || "",
                    l = h.children ? o.find("*").addBack() : o;
                l = l.map(function() {
                    var i = e(this);
                    return {
                        el: i,
                        start: t(this)
                    }
                }), a = function() {
                    e.each(s, function(e, t) {
                        n[t] && o[t + "Class"](n[t])
                    })
                }, a(), l = l.map(function() {
                    return this.end = t(this.el[0]), this.diff = i(this.start, this.end), this
                }), o.attr("class", r), l = l.map(function() {
                    var t = this,
                        i = e.Deferred(),
                        s = e.extend({}, h, {
                            queue: !1,
                            complete: function() {
                                i.resolve(t)
                            }
                        });
                    return this.el.animate(this.diff, s), i.promise()
                }), e.when.apply(e, l.get()).done(function() {
                    a(), e.each(arguments, function() {
                        var t = this.el;
                        e.each(this.diff, function(e) {
                            t.css(e, "")
                        })
                    }), h.complete.call(o[0])
                })
            })
        }, e.fn.extend({
            addClass: function(t) {
                return function(i, s, n, a) {
                    return s ? e.effects.animateClass.call(this, {
                        add: i
                    }, s, n, a) : t.apply(this, arguments)
                }
            }(e.fn.addClass),
            removeClass: function(t) {
                return function(i, s, n, a) {
                    return arguments.length > 1 ? e.effects.animateClass.call(this, {
                        remove: i
                    }, s, n, a) : t.apply(this, arguments)
                }
            }(e.fn.removeClass),
            toggleClass: function(t) {
                return function(i, s, n, a, o) {
                    return "boolean" == typeof s || void 0 === s ? n ? e.effects.animateClass.call(this, s ? {
                        add: i
                    } : {
                        remove: i
                    }, n, a, o) : t.apply(this, arguments) : e.effects.animateClass.call(this, {
                        toggle: i
                    }, s, n, a)
                }
            }(e.fn.toggleClass),
            switchClass: function(t, i, s, n, a) {
                return e.effects.animateClass.call(this, {
                    add: i,
                    remove: t
                }, s, n, a)
            }
        })
    }(), function() {
        function t(t, i, s, n) {
            return e.isPlainObject(t) && (i = t, t = t.effect), t = {
                effect: t
            }, null == i && (i = {}), e.isFunction(i) && (n = i, s = null, i = {}), ("number" == typeof i || e.fx.speeds[i]) && (n = s, s = i, i = {}), e.isFunction(s) && (n = s, s = null), i && e.extend(t, i), s = s || i.duration, t.duration = e.fx.off ? 0 : "number" == typeof s ? s : s in e.fx.speeds ? e.fx.speeds[s] : e.fx.speeds._default, t.complete = n || i.complete, t
        }
        function i(t) {
            return !t || "number" == typeof t || e.fx.speeds[t] ? !0 : "string" != typeof t || e.effects.effect[t] ? e.isFunction(t) ? !0 : "object" != typeof t || t.effect ? !1 : !0 : !0
        }
        e.extend(e.effects, {
            version: "1.11.1",
            save: function(e, t) {
                for (var i = 0; t.length > i; i++)
                    null !== t[i] && e.data(o + t[i], e[0].style[t[i]])
            },
            restore: function(e, t) {
                var i,
                    s;
                for (s = 0; t.length > s; s++)
                    null !== t[s] && (i = e.data(o + t[s]), void 0 === i && (i = ""), e.css(t[s], i))
            },
            setMode: function(e, t) {
                return "toggle" === t && (t = e.is(":hidden") ? "show" : "hide"), t
            },
            getBaseline: function(e, t) {
                var i,
                    s;
                switch (e[0]) {
                case "top":
                    i = 0;
                    break;
                case "middle":
                    i = .5;
                    break;
                case "bottom":
                    i = 1;
                    break;
                default:
                    i = e[0] / t.height
                }
                switch (e[1]) {
                case "left":
                    s = 0;
                    break;
                case "center":
                    s = .5;
                    break;
                case "right":
                    s = 1;
                    break;
                default:
                    s = e[1] / t.width
                }
                return {
                    x: s,
                    y: i
                }
            },
            createWrapper: function(t) {
                if (t.parent().is(".ui-effects-wrapper"))
                    return t.parent();
                var i = {
                        width: t.outerWidth(!0),
                        height: t.outerHeight(!0),
                        "float": t.css("float")
                    },
                    s = e("<div></div>").addClass("ui-effects-wrapper").css({
                        fontSize: "100%",
                        background: "transparent",
                        border: "none",
                        margin: 0,
                        padding: 0
                    }),
                    n = {
                        width: t.width(),
                        height: t.height()
                    },
                    a = document.activeElement;
                try {
                    a.id
                } catch (o) {
                    a = document.body
                }
                return t.wrap(s), (t[0] === a || e.contains(t[0], a)) && e(a).focus(), s = t.parent(), "static" === t.css("position") ? (s.css({
                    position: "relative"
                }), t.css({
                    position: "relative"
                })) : (e.extend(i, {
                    position: t.css("position"),
                    zIndex: t.css("z-index")
                }), e.each(["top", "left", "bottom", "right"], function(e, s) {
                    i[s] = t.css(s), isNaN(parseInt(i[s], 10)) && (i[s] = "auto")
                }), t.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })), t.css(n), s.css(i).show()
            },
            removeWrapper: function(t) {
                var i = document.activeElement;
                return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t), (t[0] === i || e.contains(t[0], i)) && e(i).focus()), t
            },
            setTransition: function(t, i, s, n) {
                return n = n || {}, e.each(i, function(e, i) {
                    var a = t.cssUnit(i);
                    a[0] > 0 && (n[i] = a[0] * s + a[1])
                }), n
            }
        }), e.fn.extend({
            effect: function() {
                function i(t) {
                    function i() {
                        e.isFunction(a) && a.call(n[0]), e.isFunction(t) && t()
                    }
                    var n = e(this),
                        a = s.complete,
                        r = s.mode;
                    (n.is(":hidden") ? "hide" === r : "show" === r) ? (n[r](), i()) : o.call(n[0], s, i)
                }
                var s = t.apply(this, arguments),
                    n = s.mode,
                    a = s.queue,
                    o = e.effects.effect[s.effect];
                return e.fx.off || !o ? n ? this[n](s.duration, s.complete) : this.each(function() {
                    s.complete && s.complete.call(this)
                }) : a === !1 ? this.each(i) : this.queue(a || "fx", i)
            },
            show: function(e) {
                return function(s) {
                    if (i(s))
                        return e.apply(this, arguments);
                    var n = t.apply(this, arguments);
                    return n.mode = "show", this.effect.call(this, n)
                }
            }(e.fn.show),
            hide: function(e) {
                return function(s) {
                    if (i(s))
                        return e.apply(this, arguments);
                    var n = t.apply(this, arguments);
                    return n.mode = "hide", this.effect.call(this, n)
                }
            }(e.fn.hide),
            toggle: function(e) {
                return function(s) {
                    if (i(s) || "boolean" == typeof s)
                        return e.apply(this, arguments);
                    var n = t.apply(this, arguments);
                    return n.mode = "toggle", this.effect.call(this, n)
                }
            }(e.fn.toggle),
            cssUnit: function(t) {
                var i = this.css(t),
                    s = [];
                return e.each(["em", "px", "%", "pt"], function(e, t) {
                    i.indexOf(t) > 0 && (s = [parseFloat(i), t])
                }), s
            }
        })
    }(), function() {
        var t = {};
        e.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(e, i) {
            t[i] = function(t) {
                return Math.pow(t, e + 2)
            }
        }), e.extend(t, {
            Sine: function(e) {
                return 1 - Math.cos(e * Math.PI / 2)
            },
            Circ: function(e) {
                return 1 - Math.sqrt(1 - e * e)
            },
            Elastic: function(e) {
                return 0 === e || 1 === e ? e : -Math.pow(2, 8 * (e - 1)) * Math.sin((80 * (e - 1) - 7.5) * Math.PI / 15)
            },
            Back: function(e) {
                return e * e * (3 * e - 2)
            },
            Bounce: function(e) {
                for (var t, i = 4; ((t = Math.pow(2, --i)) - 1) / 11 > e;)
                    ;
                return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * t - 2) / 22 - e, 2)
            }
        }), e.each(t, function(t, i) {
            e.easing["easeIn" + t] = i, e.easing["easeOut" + t] = function(e) {
                return 1 - i(1 - e)
            }, e.easing["easeInOut" + t] = function(e) {
                return .5 > e ? i(2 * e) / 2 : 1 - i(-2 * e + 2) / 2
            }
        })
    }(), e.effects, e.effects.effect.blind = function(t, i) {
        var s,
            n,
            a,
            o = e(this),
            r = /up|down|vertical/,
            h = /up|left|vertical|horizontal/,
            l = ["position", "top", "bottom", "left", "right", "height", "width"],
            u = e.effects.setMode(o, t.mode || "hide"),
            d = t.direction || "up",
            c = r.test(d),
            p = c ? "height" : "width",
            f = c ? "top" : "left",
            m = h.test(d),
            g = {},
            v = "show" === u;
        o.parent().is(".ui-effects-wrapper") ? e.effects.save(o.parent(), l) : e.effects.save(o, l), o.show(), s = e.effects.createWrapper(o).css({
            overflow: "hidden"
        }), n = s[p](), a = parseFloat(s.css(f)) || 0, g[p] = v ? n : 0, m || (o.css(c ? "bottom" : "right", 0).css(c ? "top" : "left", "auto").css({
            position: "absolute"
        }), g[f] = v ? a : n + a), v && (s.css(p, 0), m || s.css(f, a + n)), s.animate(g, {
            duration: t.duration,
            easing: t.easing,
            queue: !1,
            complete: function() {
                "hide" === u && o.hide(), e.effects.restore(o, l), e.effects.removeWrapper(o), i()
            }
        })
    }, e.effects.effect.bounce = function(t, i) {
        var s,
            n,
            a,
            o = e(this),
            r = ["position", "top", "bottom", "left", "right", "height", "width"],
            h = e.effects.setMode(o, t.mode || "effect"),
            l = "hide" === h,
            u = "show" === h,
            d = t.direction || "up",
            c = t.distance,
            p = t.times || 5,
            f = 2 * p + (u || l ? 1 : 0),
            m = t.duration / f,
            g = t.easing,
            v = "up" === d || "down" === d ? "top" : "left",
            y = "up" === d || "left" === d,
            b = o.queue(),
            _ = b.length;
        for ((u || l) && r.push("opacity"), e.effects.save(o, r), o.show(), e.effects.createWrapper(o), c || (c = o["top" === v ? "outerHeight" : "outerWidth"]() / 3), u && (a = {
            opacity: 1
        }, a[v] = 0, o.css("opacity", 0).css(v, y ? 2 * -c : 2 * c).animate(a, m, g)), l && (c /= Math.pow(2, p - 1)), a = {}, a[v] = 0, s = 0; p > s; s++)
            n = {}, n[v] = (y ? "-=" : "+=") + c, o.animate(n, m, g).animate(a, m, g), c = l ? 2 * c : c / 2;
        l && (n = {
            opacity: 0
        }, n[v] = (y ? "-=" : "+=") + c, o.animate(n, m, g)), o.queue(function() {
            l && o.hide(), e.effects.restore(o, r), e.effects.removeWrapper(o), i()
        }), _ > 1 && b.splice.apply(b, [1, 0].concat(b.splice(_, f + 1))), o.dequeue()
    }, e.effects.effect.clip = function(t, i) {
        var s,
            n,
            a,
            o = e(this),
            r = ["position", "top", "bottom", "left", "right", "height", "width"],
            h = e.effects.setMode(o, t.mode || "hide"),
            l = "show" === h,
            u = t.direction || "vertical",
            d = "vertical" === u,
            c = d ? "height" : "width",
            p = d ? "top" : "left",
            f = {};
        e.effects.save(o, r), o.show(), s = e.effects.createWrapper(o).css({
            overflow: "hidden"
        }), n = "IMG" === o[0].tagName ? s : o, a = n[c](), l && (n.css(c, 0), n.css(p, a / 2)), f[c] = l ? a : 0, f[p] = l ? 0 : a / 2, n.animate(f, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: function() {
                l || o.hide(), e.effects.restore(o, r), e.effects.removeWrapper(o), i()
            }
        })
    }, e.effects.effect.drop = function(t, i) {
        var s,
            n = e(this),
            a = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
            o = e.effects.setMode(n, t.mode || "hide"),
            r = "show" === o,
            h = t.direction || "left",
            l = "up" === h || "down" === h ? "top" : "left",
            u = "up" === h || "left" === h ? "pos" : "neg",
            d = {
                opacity: r ? 1 : 0
            };
        e.effects.save(n, a), n.show(), e.effects.createWrapper(n), s = t.distance || n["top" === l ? "outerHeight" : "outerWidth"](!0) / 2, r && n.css("opacity", 0).css(l, "pos" === u ? -s : s), d[l] = (r ? "pos" === u ? "+=" : "-=" : "pos" === u ? "-=" : "+=") + s, n.animate(d, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: function() {
                "hide" === o && n.hide(), e.effects.restore(n, a), e.effects.removeWrapper(n), i()
            }
        })
    }, e.effects.effect.explode = function(t, i) {
        function s() {
            b.push(this), b.length === d * c && n()
        }
        function n() {
            p.css({
                visibility: "visible"
            }), e(b).remove(), m || p.hide(), i()
        }
        var a,
            o,
            r,
            h,
            l,
            u,
            d = t.pieces ? Math.round(Math.sqrt(t.pieces)) : 3,
            c = d,
            p = e(this),
            f = e.effects.setMode(p, t.mode || "hide"),
            m = "show" === f,
            g = p.show().css("visibility", "hidden").offset(),
            v = Math.ceil(p.outerWidth() / c),
            y = Math.ceil(p.outerHeight() / d),
            b = [];
        for (a = 0; d > a; a++)
            for (h = g.top + a * y, u = a - (d - 1) / 2, o = 0; c > o; o++)
                r = g.left + o * v, l = o - (c - 1) / 2, p.clone().appendTo("body").wrap("<div></div>").css({
                    position: "absolute",
                    visibility: "visible",
                    left: -o * v,
                    top: -a * y
                }).parent().addClass("ui-effects-explode").css({
                    position: "absolute",
                    overflow: "hidden",
                    width: v,
                    height: y,
                    left: r + (m ? l * v : 0),
                    top: h + (m ? u * y : 0),
                    opacity: m ? 0 : 1
                }).animate({
                    left: r + (m ? 0 : l * v),
                    top: h + (m ? 0 : u * y),
                    opacity: m ? 1 : 0
                }, t.duration || 500, t.easing, s)
    }, e.effects.effect.fade = function(t, i) {
        var s = e(this),
            n = e.effects.setMode(s, t.mode || "toggle");
        s.animate({
            opacity: n
        }, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: i
        })
    }, e.effects.effect.fold = function(t, i) {
        var s,
            n,
            a = e(this),
            o = ["position", "top", "bottom", "left", "right", "height", "width"],
            r = e.effects.setMode(a, t.mode || "hide"),
            h = "show" === r,
            l = "hide" === r,
            u = t.size || 15,
            d = /([0-9]+)%/.exec(u),
            c = !!t.horizFirst,
            p = h !== c,
            f = p ? ["width", "height"] : ["height", "width"],
            m = t.duration / 2,
            g = {},
            v = {};
        e.effects.save(a, o), a.show(), s = e.effects.createWrapper(a).css({
            overflow: "hidden"
        }), n = p ? [s.width(), s.height()] : [s.height(), s.width()], d && (u = parseInt(d[1], 10) / 100 * n[l ? 0 : 1]), h && s.css(c ? {
            height: 0,
            width: u
        } : {
            height: u,
            width: 0
        }), g[f[0]] = h ? n[0] : u, v[f[1]] = h ? n[1] : 0, s.animate(g, m, t.easing).animate(v, m, t.easing, function() {
            l && a.hide(), e.effects.restore(a, o), e.effects.removeWrapper(a), i()
        })
    }, e.effects.effect.highlight = function(t, i) {
        var s = e(this),
            n = ["backgroundImage", "backgroundColor", "opacity"],
            a = e.effects.setMode(s, t.mode || "show"),
            o = {
                backgroundColor: s.css("backgroundColor")
            };
        "hide" === a && (o.opacity = 0), e.effects.save(s, n), s.show().css({
            backgroundImage: "none",
            backgroundColor: t.color || "#ffff99"
        }).animate(o, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: function() {
                "hide" === a && s.hide(), e.effects.restore(s, n), i()
            }
        })
    }, e.effects.effect.size = function(t, i) {
        var s,
            n,
            a,
            o = e(this),
            r = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
            h = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
            l = ["width", "height", "overflow"],
            u = ["fontSize"],
            d = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
            c = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
            p = e.effects.setMode(o, t.mode || "effect"),
            f = t.restore || "effect" !== p,
            m = t.scale || "both",
            g = t.origin || ["middle", "center"],
            v = o.css("position"),
            y = f ? r : h,
            b = {
                height: 0,
                width: 0,
                outerHeight: 0,
                outerWidth: 0
            };
        "show" === p && o.show(), s = {
            height: o.height(),
            width: o.width(),
            outerHeight: o.outerHeight(),
            outerWidth: o.outerWidth()
        }, "toggle" === t.mode && "show" === p ? (o.from = t.to || b, o.to = t.from || s) : (o.from = t.from || ("show" === p ? b : s), o.to = t.to || ("hide" === p ? b : s)), a = {
            from: {
                y: o.from.height / s.height,
                x: o.from.width / s.width
            },
            to: {
                y: o.to.height / s.height,
                x: o.to.width / s.width
            }
        }, ("box" === m || "both" === m) && (a.from.y !== a.to.y && (y = y.concat(d), o.from = e.effects.setTransition(o, d, a.from.y, o.from), o.to = e.effects.setTransition(o, d, a.to.y, o.to)), a.from.x !== a.to.x && (y = y.concat(c), o.from = e.effects.setTransition(o, c, a.from.x, o.from), o.to = e.effects.setTransition(o, c, a.to.x, o.to))), ("content" === m || "both" === m) && a.from.y !== a.to.y && (y = y.concat(u).concat(l), o.from = e.effects.setTransition(o, u, a.from.y, o.from), o.to = e.effects.setTransition(o, u, a.to.y, o.to)), e.effects.save(o, y), o.show(), e.effects.createWrapper(o), o.css("overflow", "hidden").css(o.from), g && (n = e.effects.getBaseline(g, s), o.from.top = (s.outerHeight - o.outerHeight()) * n.y, o.from.left = (s.outerWidth - o.outerWidth()) * n.x, o.to.top = (s.outerHeight - o.to.outerHeight) * n.y, o.to.left = (s.outerWidth - o.to.outerWidth) * n.x), o.css(o.from), ("content" === m || "both" === m) && (d = d.concat(["marginTop", "marginBottom"]).concat(u), c = c.concat(["marginLeft", "marginRight"]), l = r.concat(d).concat(c), o.find("*[width]").each(function() {
            var i = e(this),
                s = {
                    height: i.height(),
                    width: i.width(),
                    outerHeight: i.outerHeight(),
                    outerWidth: i.outerWidth()
                };
            f && e.effects.save(i, l), i.from = {
                height: s.height * a.from.y,
                width: s.width * a.from.x,
                outerHeight: s.outerHeight * a.from.y,
                outerWidth: s.outerWidth * a.from.x
            }, i.to = {
                height: s.height * a.to.y,
                width: s.width * a.to.x,
                outerHeight: s.height * a.to.y,
                outerWidth: s.width * a.to.x
            }, a.from.y !== a.to.y && (i.from = e.effects.setTransition(i, d, a.from.y, i.from), i.to = e.effects.setTransition(i, d, a.to.y, i.to)), a.from.x !== a.to.x && (i.from = e.effects.setTransition(i, c, a.from.x, i.from), i.to = e.effects.setTransition(i, c, a.to.x, i.to)), i.css(i.from), i.animate(i.to, t.duration, t.easing, function() {
                f && e.effects.restore(i, l)
            })
        })), o.animate(o.to, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: function() {
                0 === o.to.opacity && o.css("opacity", o.from.opacity), "hide" === p && o.hide(), e.effects.restore(o, y), f || ("static" === v ? o.css({
                    position: "relative",
                    top: o.to.top,
                    left: o.to.left
                }) : e.each(["top", "left"], function(e, t) {
                    o.css(t, function(t, i) {
                        var s = parseInt(i, 10),
                            n = e ? o.to.left : o.to.top;
                        return "auto" === i ? n + "px" : s + n + "px"
                    })
                })), e.effects.removeWrapper(o), i()
            }
        })
    }, e.effects.effect.scale = function(t, i) {
        var s = e(this),
            n = e.extend(!0, {}, t),
            a = e.effects.setMode(s, t.mode || "effect"),
            o = parseInt(t.percent, 10) || (0 === parseInt(t.percent, 10) ? 0 : "hide" === a ? 0 : 100),
            r = t.direction || "both",
            h = t.origin,
            l = {
                height: s.height(),
                width: s.width(),
                outerHeight: s.outerHeight(),
                outerWidth: s.outerWidth()
            },
            u = {
                y: "horizontal" !== r ? o / 100 : 1,
                x: "vertical" !== r ? o / 100 : 1
            };
        n.effect = "size", n.queue = !1, n.complete = i, "effect" !== a && (n.origin = h || ["middle", "center"], n.restore = !0), n.from = t.from || ("show" === a ? {
            height: 0,
            width: 0,
            outerHeight: 0,
            outerWidth: 0
        } : l), n.to = {
            height: l.height * u.y,
            width: l.width * u.x,
            outerHeight: l.outerHeight * u.y,
            outerWidth: l.outerWidth * u.x
        }, n.fade && ("show" === a && (n.from.opacity = 0, n.to.opacity = 1), "hide" === a && (n.from.opacity = 1, n.to.opacity = 0)), s.effect(n)
    }, e.effects.effect.puff = function(t, i) {
        var s = e(this),
            n = e.effects.setMode(s, t.mode || "hide"),
            a = "hide" === n,
            o = parseInt(t.percent, 10) || 150,
            r = o / 100,
            h = {
                height: s.height(),
                width: s.width(),
                outerHeight: s.outerHeight(),
                outerWidth: s.outerWidth()
            };
        e.extend(t, {
            effect: "scale",
            queue: !1,
            fade: !0,
            mode: n,
            complete: i,
            percent: a ? o : 100,
            from: a ? h : {
                height: h.height * r,
                width: h.width * r,
                outerHeight: h.outerHeight * r,
                outerWidth: h.outerWidth * r
            }
        }), s.effect(t)
    }, e.effects.effect.pulsate = function(t, i) {
        var s,
            n = e(this),
            a = e.effects.setMode(n, t.mode || "show"),
            o = "show" === a,
            r = "hide" === a,
            h = o || "hide" === a,
            l = 2 * (t.times || 5) + (h ? 1 : 0),
            u = t.duration / l,
            d = 0,
            c = n.queue(),
            p = c.length;
        for ((o || !n.is(":visible")) && (n.css("opacity", 0).show(), d = 1), s = 1; l > s; s++)
            n.animate({
                opacity: d
            }, u, t.easing), d = 1 - d;
        n.animate({
            opacity: d
        }, u, t.easing), n.queue(function() {
            r && n.hide(), i()
        }), p > 1 && c.splice.apply(c, [1, 0].concat(c.splice(p, l + 1))), n.dequeue()
    }, e.effects.effect.shake = function(t, i) {
        var s,
            n = e(this),
            a = ["position", "top", "bottom", "left", "right", "height", "width"],
            o = e.effects.setMode(n, t.mode || "effect"),
            r = t.direction || "left",
            h = t.distance || 20,
            l = t.times || 3,
            u = 2 * l + 1,
            d = Math.round(t.duration / u),
            c = "up" === r || "down" === r ? "top" : "left",
            p = "up" === r || "left" === r,
            f = {},
            m = {},
            g = {},
            v = n.queue(),
            y = v.length;
        for (e.effects.save(n, a), n.show(), e.effects.createWrapper(n), f[c] = (p ? "-=" : "+=") + h, m[c] = (p ? "+=" : "-=") + 2 * h, g[c] = (p ? "-=" : "+=") + 2 * h, n.animate(f, d, t.easing), s = 1; l > s; s++)
            n.animate(m, d, t.easing).animate(g, d, t.easing);
        n.animate(m, d, t.easing).animate(f, d / 2, t.easing).queue(function() {
            "hide" === o && n.hide(), e.effects.restore(n, a), e.effects.removeWrapper(n), i()
        }), y > 1 && v.splice.apply(v, [1, 0].concat(v.splice(y, u + 1))), n.dequeue()
    }, e.effects.effect.slide = function(t, i) {
        var s,
            n = e(this),
            a = ["position", "top", "bottom", "left", "right", "width", "height"],
            o = e.effects.setMode(n, t.mode || "show"),
            r = "show" === o,
            h = t.direction || "left",
            l = "up" === h || "down" === h ? "top" : "left",
            u = "up" === h || "left" === h,
            d = {};
        e.effects.save(n, a), n.show(), s = t.distance || n["top" === l ? "outerHeight" : "outerWidth"](!0), e.effects.createWrapper(n).css({
            overflow: "hidden"
        }), r && n.css(l, u ? isNaN(s) ? "-" + s : -s : s), d[l] = (r ? u ? "+=" : "-=" : u ? "-=" : "+=") + s, n.animate(d, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: function() {
                "hide" === o && n.hide(), e.effects.restore(n, a), e.effects.removeWrapper(n), i()
            }
        })
    }, e.effects.effect.transfer = function(t, i) {
        var s = e(this),
            n = e(t.to),
            a = "fixed" === n.css("position"),
            o = e("body"),
            r = a ? o.scrollTop() : 0,
            h = a ? o.scrollLeft() : 0,
            l = n.offset(),
            u = {
                top: l.top - r,
                left: l.left - h,
                height: n.innerHeight(),
                width: n.innerWidth()
            },
            d = s.offset(),
            c = e("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(t.className).css({
                top: d.top - r,
                left: d.left - h,
                height: s.innerHeight(),
                width: s.innerWidth(),
                position: a ? "fixed" : "absolute"
            }).animate(u, t.duration, t.easing, function() {
                c.remove(), i()
            })
    }
});

