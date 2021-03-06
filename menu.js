function MenuItem() {
    this.parent = void 0, this.element = void 0, this.data = void 0
}
MenuItem.prototype.setData = function(e, t) {
    this.data = e, this.element = t, parentElement = $(t).parent();
    var n = $(parentElement).data("item-data");
    this.parent = null != n ? n : void 0, $(t).data("item-data", this)
};
var menuHover = void 0,
    menuClickEvent = !1,
    menuTouchEvent = !1,
    menuPageScroll = !1;
function setProperties(e, t) {
    for (var n in t)
        if (0 == n.indexOf("child:")) {
            for (var i = n.substr(6).split(":"), a = e, u = 0; u < i.length; u++)
                a = $(a).children().eq(i[u]);
            null != t[n].tag && (a = $(a).find(t[n].tag)), setProperties(a, t[n].properties)
        } else
            "animate" != n && "duration" != n && ("style" == n ? t[n].length ? $(e).attr(n, t[n]) : $(e).removeAttr(n) : $(e).css(n, t[n]))
}
function Menu() {
    this.items = new Array
}
function createMenuItem(e) {
    var t = null != e && null != e.menuItemClass ? e.menuItemClass : "MenuItem";
    return new window[t]
}
function createMenu(e) {
    var t = null != e && null != e.menuClass ? e.menuClass : "Menu";
    return new window[t]
}
function setupMenu(e) {
    if (menuData = getMenuData(e), null == menuData)
        return !1;
    var t = menuData.items,
        n = createMenu(menuData),
        i = $(e).parent(),
        a = $(i).data("item-data");
    null != a && (a.subMenu = n), n.setData(menuData, e);
    var u = !0;
    return $(e).children("li").each(function() {
        var e = createMenuItem(t);
        e.setData(t, this), n.items.push(e), $(this).children("ul").each(function() {
            setupMenu(this) || (u = !1)
        }), e.addEvents()
    }), n.addEvents(), u
}
function closeMenu(e) {
    $(e).children().each(function() {
        var e = $(this).data("item-data");
        null != e && (null != e.subMenu && closeMenu($(this).children("ul")), e.animate("hover_out"), e.restore())
    })
}
function getMenuData(e) {
    var t = void 0,
        n = $(e).attr("class").split(/\s+/);
    return $.each(n, function(e, n) {
        if (null != (t = getMenuDataForClass(n)))
            return !1
    }), t
}
MenuItem.prototype.addEvents = function() {
    var e = function(e) {
            if ("touchstart" == e.type) {
                if (0 == menuTouchEvent && (menuTouchEvent = !0, 1 == menuClickEvent))
                    return
            } else if (1 == menuTouchEvent && "click" == e.type)
                return;
            for (var t, n = e.target, i = $(n).data("item-data"); null == i && null != n;)
                n = n.parentElement, i = $(n).data("item-data");
            if (n == this || "A" == this.nodeName)
                if (null != i.subMenu)
                    "none" == $(i.subMenu.element).css("display") ? (i.hoverIn.call(i.element, e), i.expand()) : $(i.subMenu.element).is(":animated") || setTimeout((t = i.parent.element, function() {
                        closeMenu(t)
                    }), 50);
                else {
                    if (1 == menuPageScroll)
                        return menuPageScroll = !1, void (null != i.hoverOut && i.hoverOut.call(i.element));
                    for (var a; null != i.parent;)
                        a = i.parent.element, i = i.parent;
                    setTimeout(function(e) {
                        return function() {
                            closeMenu(e)
                        }
                    }(a), 50)
                }
        },
        t = this.element,
        n = this.subMenu;
    null != this.data.hover ? ($(t).hover(this.hover), null == n && $(t).on("touchstart", this.hover)) : null != this.data.hover_in && null != this.data.hover_out && ($(t).hover(this.hoverIn, this.hoverOut), $(t).on("touchstart", null != n ? e : this.hoverIn), null == n && $(t).on("touchend", e)), $(t).on("click", e)
}, MenuItem.prototype.getAnimationProperties = function(e, t) {
    if (null != e) {
        null == this.values && (this.values = {});
        var n = currentDevice();
        if (null == this.values[n]) {
            var i = this.element;
            this.values[n] = {
                width: $(i).width(),
                height: $(i).height(),
                marginLeft: $(i).css("margin-left"),
                marginTop: $(i).css("margin-top")
            }
        }
        var a = this;
        for (i = a.element; null != a.parent;)
            i = (a = a.parent).element;
        for (var u = n; null != e && u >= 0 && null == e[u];)
            --u;
        u >= 0 && null != e && (e = e[u]);
        var r = $.extend({}, e);
        return "initial" == r.width ? r.width = this.values[n].width : "+dx" == r.width ? r.width = parseInt(this.values[n].width) + parseInt(t.dx) + "px" : "-dx" == r.width && (r.width = parseInt(this.values[n].width) - parseInt(t.dx) + "px"), "initial" == r.height ? r.height = this.values[n].height : "+dy" == r.height ? r.height = parseInt(this.values[n].height) + parseInt(t.dy) + "px" : "-dy" == r.height && (r.height = parseInt(this.values[n].height) - parseInt(t.dy) + "px"), "dx" == r.left && (r.left = t.dx + "px"), "dy" == r.top && (r.top = t.dy + "px"), "initial" == r["margin-left"] ? r["margin-left"] = this.values[n].marginLeft : "+dx" == r["margin-left"] ? r["margin-left"] = parseInt(this.values[n].marginLeft) + parseInt(t.dx) + "px" : "-dx" == r["margin-left"] && (r["margin-left"] = parseInt(this.values[n].marginLeft) - parseInt(t.dx) + "px"), "initial" == r["margin-top"] ? r["margin-top"] = this.values[n].marginTop : "+dy" == r["margin-top"] ? r["margin-top"] = parseInt(this.values[n].marginTop) + parseInt(t.dy) + "px" : "-dy" == r["margin-top"] && (r["margin-top"] = parseInt(this.values[n].marginTop) - parseInt(t.dy) + "px"), r
    }
}, MenuItem.prototype.animate = function(e, t, n) {
    var i = this,
        a = i.element,
        u = null != n && null != n.queue ? n.queue : "fx";
    if (null != i.data[e].before && setProperties(a, i.getAnimationProperties(i.data[e].before, n)), null == t && (t = i.data[e].delay), null != t && t > 0 ? (alert(t), setTimeout(function() {
        $(a).stop(u, !0).animate(i.getAnimationProperties(i.data[e].properties, n), {
            duration: 1 == i.data[e].animate ? i.data[e].duration : 0,
            queue: u,
            complete: (i.getAnimationProperties(i.data[e].after, n), function() {
                null != properties && setProperties(this, properties)
            }),
            step: function(e) {
                return function() {
                    null != e && setProperties(this, e)
                }
            }(i.getAnimationProperties(i.data[e].step, n))
        }).dequeue(u)
    }, t)) : $(a).stop(u, !0).animate(i.getAnimationProperties(i.data[e].properties, n), {
        duration: 1 == i.data[e].animate ? i.data[e].duration : 0,
        queue: u,
        complete: function(e) {
            return function() {
                null != e && setProperties(this, e)
            }
        }(i.getAnimationProperties(i.data[e].after, n)),
        step: function(e) {
            return function() {
                null != e && setProperties(this, e)
            }
        }(i.getAnimationProperties(i.data[e].step, n))
    }).dequeue(u), null != i.data[e].content && (t = i.data[e].content.delay, i.animateContent(i.data[e].content.event, t, n)), null != i.data[e].submenu) {
        var r = i.data[e].submenu.event;
        t = i.data[e].submenu.delay, null != i.subMenu && ("function" == typeof i.subMenu[r] ? null != t && t > 0 ? setTimeout(function() {
            i.subMenu[r].call(i.subMenu.element)
        }, t) : i.subMenu[r].call(i.subMenu.element) : i.subMenu.animate(r, t, n))
    }
    if (null != i.data[e].parentmenu) {
        var o = i.data[e].parentmenu.event;
        t = i.data[e].parentmenu.delay, null != i.parent && ("function" == typeof i.parent[o] ? null != t && t > 0 ? (alert(t), setTimeout(function() {
            i.parent[o].call(i.parent.element)
        }, t)) : i.parent[o].call(i.parent.element) : i.parent.animate(o, t, n))
    }
}, MenuItem.prototype.animateContent = function(e, t, n) {
    var i = this;
    null == t && (t = i.data.content[e].delay), null != t && t > 0 ? (alert(t), setTimeout(function() {
        i.doAnimateContent(e, n)
    }, t)) : i.doAnimateContent(e, n)
}, MenuItem.prototype.doAnimateContent = function(e, t) {
    var n = this.element,
        i = $(n).children().first().find(".menu-content");
    0 == i.length && (i = $(n).children().first());
    var a = this.data.content[e];
    null != a.before && setProperties(i, this.getAnimationProperties(a.before, t));
    var u,
        r = null != t && null != t.queue ? t.queue : "fx";
    for (var o in $(i).stop(r, !0).animate(this.getAnimationProperties(a.properties, t), {
        duration: 1 == a.animate ? a.duration : 0,
        queue: r,
        complete: (u = this.getAnimationProperties(a.after, t), function() {
            null != u && setProperties(this, u)
        }),
        step: function(e) {
            return function() {
                null != e && setProperties(this, e)
            }
        }(this.getAnimationProperties(a.step, t))
    }).dequeue(r), a)
        if (0 == o.indexOf("child:")) {
            for (var s = o.substr(6).split(":"), l = i, d = 0; d < s.length; d++)
                l = $(l).children().eq(s[d]);
            null != a[o].tag && (l = $(l).find(a[o].tag)), $(l).stop(r, !0).animate(this.getAnimationProperties(a[o].properties, t), {
                duration: 1 == a.animate ? null != a[o].duration ? a[o].duration : a.duration : 0,
                queue: r,
                complete: function(e) {
                    return function() {
                        null != e && setProperties(this, e)
                    }
                }(this.getAnimationProperties(a[o].after, t)),
                step: function(e) {
                    return function() {
                        null != e && setProperties(this, e)
                    }
                }(this.getAnimationProperties(a[o].step, t))
            }).dequeue(r)
        }
}, MenuItem.prototype.hover = function() {
    0 != $(this).height() && $(this).data("item-data").animate("hover")
}, MenuItem.prototype.hoverIn = function(e) {
    if ("mouseenter" == e.type) {
        if (1 == menuTouchEvent)
            return;
        0 == menuClickEvent && (menuClickEvent = !0)
    }
    if (0 != $(this).height()) {
        var t = $(this).data("item-data");
        t.animate("hover_in"), t.expand(), null == menuHover || menuHover == t || menuHover.element.contains(e.target) || menuHover.hoverOut.call(menuHover.element), menuHover = t
    }
}, MenuItem.prototype.hoverOut = function(e) {
    if ((1 != menuTouchEvent || null == e || "mouseleave" != e.type) && 0 != $(this).height()) {
        var t = $(this).data("item-data");
        t.animate("hover_out"), t.restore(), menuHover = void 0
    }
}, MenuItem.prototype.expand = function() {
    var e = this.element,
        t = $(e).attr("data-anim");
    if (null != t) {
        var n = t.split(";"),
            i = currentDevice();
        if (i < n.length) {
            var a = n[i];
            if (a.length > 0) {
                var u,
                    r = a.split(":"),
                    o = r[0];
                if ("push_right" == o)
                    (l = r[2]) < 0 && (o += "_move_up"), u = {
                        dx: r[1],
                        dy: l
                    };
                else if ("push_left" == o) {
                    (l = r[2]) < 0 && (o += "_move_up"), u = {
                        dx: r[1],
                        dy: l
                    }
                } else if ("push_up" == o) {
                    (s = r[1]) < 0 && (o += "_move_left"), u = {
                        dx: s,
                        dy: r[2]
                    }
                } else if ("push_down" == o) {
                    (s = r[1]) < 0 && (o += "_move_left"), u = {
                        dx: s,
                        dy: r[2]
                    }
                } else if ("expand_up" == o) {
                    (s = r[1]) < 0 && (o += "_move_left"), u = {
                        dx: s,
                        dy: r[2]
                    }
                } else if ("expand_down" == o) {
                    var s;
                    (s = r[1]) < 0 && (o += "_move_left"), u = {
                        dx: s,
                        dy: r[2]
                    }
                } else if ("expand_right" == o) {
                    (l = r[2]) < 0 && (o += "_move_up"), u = {
                        dx: r[1],
                        dy: l
                    }
                } else if ("expand_left" == o) {
                    var l;
                    (l = r[2]) < 0 && (o += "_move_up"), u = {
                        dx: r[1],
                        dy: l
                    }
                }
                $.extend(u, {
                    queue: "alt_fx"
                }), this.animate(o, 0, u)
            }
        }
    }
}, MenuItem.prototype.restore = function() {
    var e = this.element,
        t = $(e).attr("data-anim");
    if (null != t) {
        var n = t.split(";"),
            i = currentDevice();
        if (i < n.length) {
            var a = n[i];
            if (a.length > 0) {
                var u,
                    r = a.split(":"),
                    o = r[0];
                if ("push_right" == o)
                    o = "pull_left", (l = r[2]) < 0 && (o += "_move_down"), u = {
                        dx: r[1],
                        dy: l
                    };
                else if ("push_left" == o) {
                    o = "pull_right", (l = r[2]) < 0 && (o += "_move_down"), u = {
                        dx: r[1],
                        dy: l
                    }
                } else if ("push_up" == o) {
                    o = "pull_down", (s = r[1]) < 0 && (o += "_move_right"), u = {
                        dx: s,
                        dy: r[2]
                    }
                } else if ("push_down" == o) {
                    o = "pull_up", (s = r[1]) < 0 && (o += "_move_right"), u = {
                        dx: s,
                        dy: r[2]
                    }
                } else if ("expand_up" == o) {
                    o = "shrink_down", (s = r[1]) < 0 && (o += "_move_right"), u = {
                        dx: s,
                        dy: r[2]
                    }
                } else if ("expand_down" == o) {
                    var s;
                    o = "shrink_up", (s = r[1]) < 0 && (o += "_move_right"), u = {
                        dx: s,
                        dy: r[2]
                    }
                } else if ("expand_right" == o) {
                    o = "shrink_left", (l = r[2]) < 0 && (o += "_move_down"), u = {
                        dx: r[1],
                        dy: l
                    }
                } else if ("expand_left" == o) {
                    var l;
                    o = "shrink_right", (l = r[2]) < 0 && (o += "_move_down"), u = {
                        dx: r[1],
                        dy: l
                    }
                }
                $.extend(u, {
                    queue: "alt_fx"
                }), this.animate(o, 0, u)
            }
        }
    }
}, MenuItem.prototype.show = function() {
    var e = $(this).data("item-data");
    show(this), e.animate("show")
}, MenuItem.prototype.hide = function() {
    $(this).data("item-data").animate("hide")
}, Menu.prototype = new MenuItem, Menu.prototype.animateContent = function(e, t) {
    for (var n in this.items) {
        this.items[n].animateContent(e, t)
    }
};
var menuClasses = {};
function getMenuDataForClass(e) {
    return menuClasses[e]
}
function registerMenuClass(e, t) {
    menuClasses[e] = t
}
function initMenu(e) {
    return !!setupMenu(e)
}
function currentDevice() {
    var e = $(".menu-device").css("background-color");
    return null != e ? parseInt(e.substring(4)) : 0
}
function show(e) {
    $(e).each(function() {
        "none" == $(this).css("display") && $(this).css("display", "block")
    }), null == show.id && (show.id = 0), ++show.id, $(document).on("touchend.menu." + show.id, function(e, t) {
        return function(n) {
            for (var i = $(e).data("item-data"), a = e; null != i.parent;)
                a = (i = i.parent).element;
            a.contains(n.target) || (t <= show.id && (closeMenu(a), show.id = t - 1), $(document).off("touchend.menu." + t))
        }
    }(e, show.id))
}
$(window).on("touchmove", function(e) {
    menuPageScroll = !0, null != menuHover && menuHover.hoverOut.call(menuHover.element)
});

