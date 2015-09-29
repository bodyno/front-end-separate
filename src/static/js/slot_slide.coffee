`
    jQuery.effects || function(e, t) {
        var n = e.uiBackCompat !== !1
            , r = "ui-effects-";
        e.effects = {
            effect: {}
        },
            function(t, n) {
                function r(e, t, n) {
                    var r = h[t.type] || {};
                    return null  == e ? n || !t.def ? null  : t.def : (e = r.floor ? ~~e : parseFloat(e),
                        isNaN(e) ? t.def : r.mod ? (e + r.mod) % r.mod : 0 > e ? 0 : e > r.max ? r.max : e)
                }
                function i(e) {
                    var r = l()
                        , i = r._rgba = [];
                    return e = e.toLowerCase(),
                        v(f, function(t, s) {
                                var o, u = s.re.exec(e), a = u && s.parse(u), f = s.space || "rgba";
                                return a ? (o = r[f](a),
                                    r[c[f].cache] = o[c[f].cache],
                                    i = r._rgba = o._rgba,
                                    !1) : n
                            }
                        ),
                        i.length ? ("0,0,0,0" === i.join() && t.extend(i, o.transparent),
                            r) : o[e]
                }
                function s(e, t, n) {
                    return n = (n + 1) % 1,
                        1 > 6 * n ? e + 6 * (t - e) * n : 1 > 2 * n ? t : 2 > 3 * n ? e + 6 * (t - e) * (2 / 3 - n) : e
                }
                var o, u = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor".split(" "), a = /^([\-+])=\s*(\d+\.?\d*)/, f = [{
                        re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                        parse: function(e) {
                            return [e[1], e[2], e[3], e[4]]
                        }
                    }, {
                        re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
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
                        re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                        space: "hsla",
                        parse: function(e) {
                            return [e[1], e[2] / 100, e[3] / 100, e[4]]
                        }
                    }], l = t.Color = function(e, n, r, i) {
                        return new t.Color.fn.parse(e,n,r,i)
                    }
                    , c = {
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
                    }, h = {
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
                    }, p = l.support = {}, d = t("<p>")[0], v = t.each;
                d.style.cssText = "background-color:rgba(1,1,1,.5)",
                    p.rgba = d.style.backgroundColor.indexOf("rgba") > -1,
                    v(c, function(e, t) {
                            t.cache = "_" + e,
                                t.props.alpha = {
                                    idx: 3,
                                    type: "percent",
                                    def: 1
                                }
                        }
                    ),
                    l.fn = t.extend(l.prototype, {
                        parse: function(s, u, a, f) {
                            if (s === n)
                                return this._rgba = [null , null , null , null ],
                                    this;
                            (s.jquery || s.nodeType) && (s = t(s).css(u),
                                u = n);
                            var h = this
                                , p = t.type(s)
                                , d = this._rgba = [];
                            return u !== n && (s = [s, u, a, f],
                                p = "array"),
                                "string" === p ? this.parse(i(s) || o._default) : "array" === p ? (v(c.rgba.props, function(e, t) {
                                        d[t.idx] = r(s[t.idx], t)
                                    }
                                ),
                                    this) : "object" === p ? (s instanceof l ? v(c, function(e, t) {
                                        s[t.cache] && (h[t.cache] = s[t.cache].slice())
                                    }
                                ) : v(c, function(t, n) {
                                        var i = n.cache;
                                        v(n.props, function(e, t) {
                                                if (!h[i] && n.to) {
                                                    if ("alpha" === e || null  == s[e])
                                                        return;
                                                    h[i] = n.to(h._rgba)
                                                }
                                                h[i][t.idx] = r(s[e], t, !0)
                                            }
                                        ),
                                        h[i] && 0 > e.inArray(null , h[i].slice(0, 3)) && (h[i][3] = 1,
                                        n.from && (h._rgba = n.from(h[i])))
                                    }
                                ),
                                    this) : n
                        },
                        is: function(e) {
                            var t = l(e)
                                , r = !0
                                , i = this;
                            return v(c, function(e, s) {
                                    var o, u = t[s.cache];
                                    return u && (o = i[s.cache] || s.to && s.to(i._rgba) || [],
                                        v(s.props, function(e, t) {
                                                return null  != u[t.idx] ? r = u[t.idx] === o[t.idx] : n
                                            }
                                        )),
                                        r
                                }
                            ),
                                r
                        },
                        _space: function() {
                            var e = []
                                , t = this;
                            return v(c, function(n, r) {
                                    t[r.cache] && e.push(n)
                                }
                            ),
                                e.pop()
                        },
                        transition: function(e, t) {
                            var n = l(e)
                                , i = n._space()
                                , s = c[i]
                                , o = 0 === this.alpha() ? l("transparent") : this
                                , u = o[s.cache] || s.to(o._rgba)
                                , a = u.slice();
                            return n = n[s.cache],
                                v(s.props, function(e, i) {
                                        var s = i.idx
                                            , o = u[s]
                                            , f = n[s]
                                            , l = h[i.type] || {};
                                        null  !== f && (null  === o ? a[s] = f : (l.mod && (f - o > l.mod / 2 ? o += l.mod : o - f > l.mod / 2 && (o -= l.mod)),
                                            a[s] = r((f - o) * t + o, i)))
                                    }
                                ),
                                this[i](a)
                        },
                        blend: function(e) {
                            if (1 === this._rgba[3])
                                return this;
                            var n = this._rgba.slice()
                                , r = n.pop()
                                , i = l(e)._rgba;
                            return l(t.map(n, function(e, t) {
                                    return (1 - r) * i[t] + r * e
                                }
                            ))
                        },
                        toRgbaString: function() {
                            var e = "rgba("
                                , n = t.map(this._rgba, function(e, t) {
                                        return null  == e ? t > 2 ? 1 : 0 : e
                                    }
                                );
                            return 1 === n[3] && (n.pop(),
                                e = "rgb("),
                            e + n.join() + ")"
                        },
                        toHslaString: function() {
                            var e = "hsla("
                                , n = t.map(this.hsla(), function(e, t) {
                                        return null  == e && (e = t > 2 ? 1 : 0),
                                        t && 3 > t && (e = Math.round(100 * e) + "%"),
                                            e
                                    }
                                );
                            return 1 === n[3] && (n.pop(),
                                e = "hsl("),
                            e + n.join() + ")"
                        },
                        toHexString: function(e) {
                            var n = this._rgba.slice()
                                , r = n.pop();
                            return e && n.push(~~(255 * r)),
                            "#" + t.map(n, function(e) {
                                    return e = (e || 0).toString(16),
                                        1 === e.length ? "0" + e : e
                                }
                            ).join("")
                        },
                        toString: function() {
                            return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
                        }
                    }),
                    l.fn.parse.prototype = l.fn,
                    c.hsla.to = function(e) {
                        if (null  == e[0] || null  == e[1] || null  == e[2])
                            return [null , null , null , e[3]];
                        var t, n, r = e[0] / 255, i = e[1] / 255, s = e[2] / 255, o = e[3], u = Math.max(r, i, s), a = Math.min(r, i, s), f = u - a, l = u + a, c = .5 * l;
                        return t = a === u ? 0 : r === u ? 60 * (i - s) / f + 360 : i === u ? 60 * (s - r) / f + 120 : 60 * (r - i) / f + 240,
                            n = 0 === c || 1 === c ? c : .5 >= c ? f / l : f / (2 - l),
                            [Math.round(t) % 360, n, c, null  == o ? 1 : o]
                    }
                    ,
                    c.hsla.from = function(e) {
                        if (null  == e[0] || null  == e[1] || null  == e[2])
                            return [null , null , null , e[3]];
                        var t = e[0] / 360
                            , n = e[1]
                            , r = e[2]
                            , i = e[3]
                            , o = .5 >= r ? r * (1 + n) : r + n - r * n
                            , u = 2 * r - o;
                        return [Math.round(255 * s(u, o, t + 1 / 3)), Math.round(255 * s(u, o, t)), Math.round(255 * s(u, o, t - 1 / 3)), i]
                    }
                    ,
                    v(c, function(e, i) {
                            var s = i.props
                                , o = i.cache
                                , u = i.to
                                , f = i.from;
                            l.fn[e] = function(e) {
                                if (u && !this[o] && (this[o] = u(this._rgba)),
                                    e === n)
                                    return this[o].slice();
                                var i, a = t.type(e), c = "array" === a || "object" === a ? e : arguments, h = this[o].slice();
                                return v(s, function(e, t) {
                                        var n = c["object" === a ? e : t.idx];
                                        null  == n && (n = h[t.idx]),
                                            h[t.idx] = r(n, t)
                                    }
                                ),
                                    f ? (i = l(f(h)),
                                        i[o] = h,
                                        i) : l(h)
                            }
                                ,
                                v(s, function(n, r) {
                                        l.fn[n] || (l.fn[n] = function(i) {
                                                var s, o = t.type(i), u = "alpha" === n ? this._hsla ? "hsla" : "rgba" : e, f = this[u](), l = f[r.idx];
                                                return "undefined" === o ? l : ("function" === o && (i = i.call(this, l),
                                                    o = t.type(i)),
                                                    null  == i && r.empty ? this : ("string" === o && (s = a.exec(i),
                                                    s && (i = l + parseFloat(s[2]) * ("+" === s[1] ? 1 : -1))),
                                                        f[r.idx] = i,
                                                        this[u](f)))
                                            }
                                        )
                                    }
                                )
                        }
                    ),
                    v(u, function(e, n) {
                            t.cssHooks[n] = {
                                set: function(e, r) {
                                    var s, o, u = "";
                                    if ("string" !== t.type(r) || (s = i(r))) {
                                        if (r = l(s || r),
                                            !p.rgba && 1 !== r._rgba[3]) {
                                            for (o = "backgroundColor" === n ? e.parentNode : e; ("" === u || "transparent" === u) && o && o.style; )
                                                try {
                                                    u = t.css(o, "backgroundColor"),
                                                        o = o.parentNode
                                                } catch (a) {}
                                            r = r.blend(u && "transparent" !== u ? u : "_default")
                                        }
                                        r = r.toRgbaString()
                                    }
                                    try {
                                        e.style[n] = r
                                    } catch (f) {}
                                }
                            },
                                t.fx.step[n] = function(e) {
                                    e.colorInit || (e.start = l(e.elem, n),
                                        e.end = l(e.end),
                                        e.colorInit = !0),
                                        t.cssHooks[n].set(e.elem, e.start.transition(e.end, e.pos))
                                }
                        }
                    ),
                    t.cssHooks.borderColor = {
                        expand: function(e) {
                            var t = {};
                            return v(["Top", "Right", "Bottom", "Left"], function(n, r) {
                                    t["border" + r + "Color"] = e
                                }
                            ),
                                t
                        }
                    },
                    o = t.Color.names = {
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
                        transparent: [null , null , null , 0],
                        _default: "#ffffff"
                    }
            }
            (jQuery),
            function() {
                function n() {
                    var t, n, r = this.ownerDocument.defaultView ? this.ownerDocument.defaultView.getComputedStyle(this, null ) : this.currentStyle, i = {};
                    if (r && r.length && r[0] && r[r[0]])
                        for (n = r.length; n--; )
                            t = r[n],
                            "string" == typeof r[t] && (i[e.camelCase(t)] = r[t]);
                    else
                        for (t in r)
                            "string" == typeof r[t] && (i[t] = r[t]);
                    return i
                }
                function r(t, n) {
                    var r, i, o = {};
                    for (r in n)
                        i = n[r],
                        t[r] !== i && (s[r] || (e.fx.step[r] || !isNaN(parseFloat(i))) && (o[r] = i));
                    return o
                }
                var i = ["add", "remove", "toggle"]
                    , s = {
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
                e.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(t, n) {
                        e.fx.step[n] = function(e) {
                            ("none" !== e.end && !e.setAttr || 1 === e.pos && !e.setAttr) && (jQuery.style(e.elem, n, e.end),
                                e.setAttr = !0)
                        }
                    }
                ),
                    e.effects.animateClass = function(t, s, o, u) {
                        var f = e.speed(s, o, u);
                        return this.queue(function() {
                                var s, o = e(this), u = o.attr("class") || "", l = f.children ? o.find("*").andSelf() : o;
                                l = l.map(function() {
                                        var t = e(this);
                                        return {
                                            el: t,
                                            start: n.call(this)
                                        }
                                    }
                                ),
                                    s = function() {
                                        e.each(i, function(e, n) {
                                                t[n] && o[n + "Class"](t[n])
                                            }
                                        )
                                    }
                                    ,
                                    s(),
                                    l = l.map(function() {
                                            return this.end = n.call(this.el[0]),
                                                this.diff = r(this.start, this.end),
                                                this
                                        }
                                    ),
                                    o.attr("class", u),
                                    l = l.map(function() {
                                            var t = this
                                                , n = e.Deferred()
                                                , r = jQuery.extend({}, f, {
                                                    queue: !1,
                                                    complete: function() {
                                                        n.resolve(t)
                                                    }
                                                });
                                            return this.el.animate(this.diff, r),
                                                n.promise()
                                        }
                                    ),
                                    e.when.apply(e, l.get()).done(function() {
                                            s(),
                                                e.each(arguments, function() {
                                                        var t = this.el;
                                                        e.each(this.diff, function(e) {
                                                                t.css(e, "")
                                                            }
                                                        )
                                                    }
                                                ),
                                                f.complete.call(o[0])
                                        }
                                    )
                            }
                        )
                    }
                    ,
                    e.fn.extend({
                        _addClass: e.fn.addClass,
                        addClass: function(t, n, r, i) {
                            return n ? e.effects.animateClass.call(this, {
                                add: t
                            }, n, r, i) : this._addClass(t)
                        },
                        _removeClass: e.fn.removeClass,
                        removeClass: function(t, n, r, i) {
                            return n ? e.effects.animateClass.call(this, {
                                remove: t
                            }, n, r, i) : this._removeClass(t)
                        },
                        _toggleClass: e.fn.toggleClass,
                        toggleClass: function(n, r, i, s, o) {
                            return "boolean" == typeof r || r === t ? i ? e.effects.animateClass.call(this, r ? {
                                add: n
                            } : {
                                remove: n
                            }, i, s, o) : this._toggleClass(n, r) : e.effects.animateClass.call(this, {
                                toggle: n
                            }, r, i, s)
                        },
                        switchClass: function(t, n, r, i, s) {
                            return e.effects.animateClass.call(this, {
                                add: n,
                                remove: t
                            }, r, i, s)
                        }
                    })
            }
            (),
            function() {
                function o(t, n, r, i) {
                    return e.isPlainObject(t) && (n = t,
                        t = t.effect),
                        t = {
                            effect: t
                        },
                    null  == n && (n = {}),
                    e.isFunction(n) && (i = n,
                        r = null ,
                        n = {}),
                    ("number" == typeof n || e.fx.speeds[n]) && (i = r,
                        r = n,
                        n = {}),
                    e.isFunction(r) && (i = r,
                        r = null ),
                    n && e.extend(t, n),
                        r = r || n.duration,
                        t.duration = e.fx.off ? 0 : "number" == typeof r ? r : r in e.fx.speeds ? e.fx.speeds[r] : e.fx.speeds._default,
                        t.complete = i || n.complete,
                        t
                }
                function u(t) {
                    return !t || "number" == typeof t || e.fx.speeds[t] ? !0 : "string" != typeof t || e.effects.effect[t] ? !1 : n && e.effects[t] ? !1 : !0
                }
                e.extend(e.effects, {
                    version: "1.9.2",
                    save: function(e, t) {
                        for (var n = 0; t.length > n; n++)
                            null  !== t[n] && e.data(r + t[n], e[0].style[t[n]])
                    },
                    restore: function(e, n) {
                        var i, o;
                        for (o = 0; n.length > o; o++)
                            null  !== n[o] && (i = e.data(r + n[o]),
                            i === t && (i = ""),
                                e.css(n[o], i))
                    },
                    setMode: function(e, t) {
                        return "toggle" === t && (t = e.is(":hidden") ? "show" : "hide"),
                            t
                    },
                    getBaseline: function(e, t) {
                        var n, r;
                        switch (e[0]) {
                            case "top":
                                n = 0;
                                break;
                            case "middle":
                                n = .5;
                                break;
                            case "bottom":
                                n = 1;
                                break;
                            default:
                                n = e[0] / t.height
                        }
                        switch (e[1]) {
                            case "left":
                                r = 0;
                                break;
                            case "center":
                                r = .5;
                                break;
                            case "right":
                                r = 1;
                                break;
                            default:
                                r = e[1] / t.width
                        }
                        return {
                            x: r,
                            y: n
                        }
                    },
                    createWrapper: function(t) {
                        if (t.parent().is(".ui-effects-wrapper"))
                            return t.parent();
                        var n = {
                                width: t.outerWidth(!0),
                                height: t.outerHeight(!0),
                                "float": t.css("float")
                            }
                            , r = e("<div></div>").addClass("ui-effects-wrapper").css({
                                fontSize: "100%",
                                background: "transparent",
                                border: "none",
                                margin: 0,
                                padding: 0
                            })
                            , i = {
                                width: t.width(),
                                height: t.height()
                            }
                            , s = document.activeElement;
                        try {
                            s.id
                        } catch (o) {
                            s = document.body
                        }
                        return t.wrap(r),
                        (t[0] === s || e.contains(t[0], s)) && e(s).focus(),
                            r = t.parent(),
                            "static" === t.css("position") ? (r.css({
                                position: "relative"
                            }),
                                t.css({
                                    position: "relative"
                                })) : (e.extend(n, {
                                position: t.css("position"),
                                zIndex: t.css("z-index")
                            }),
                                e.each(["top", "left", "bottom", "right"], function(e, r) {
                                        n[r] = t.css(r),
                                        isNaN(parseInt(n[r], 10)) && (n[r] = "auto")
                                    }
                                ),
                                t.css({
                                    position: "relative",
                                    top: 0,
                                    left: 0,
                                    right: "auto",
                                    bottom: "auto"
                                })),
                            t.css(i),
                            r.css(n).show()
                    },
                    removeWrapper: function(t) {
                        var n = document.activeElement;
                        return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t),
                        (t[0] === n || e.contains(t[0], n)) && e(n).focus()),
                            t
                    },
                    setTransition: function(t, n, r, i) {
                        return i = i || {},
                            e.each(n, function(e, n) {
                                    var o = t.cssUnit(n);
                                    o[0] > 0 && (i[n] = o[0] * r + o[1])
                                }
                            ),
                            i
                    }
                }),
                    e.fn.extend({
                        effect: function() {
                            function t(t) {
                                function n() {
                                    e.isFunction(s) && s.call(i[0]),
                                    e.isFunction(t) && t()
                                }
                                var i = e(this)
                                    , s = r.complete
                                    , o = r.mode;
                                (i.is(":hidden") ? "hide" === o : "show" === o) ? n() : f.call(i[0], r, n)
                            }
                            var r = o.apply(this, arguments)
                                , s = r.mode
                                , u = r.queue
                                , f = e.effects.effect[r.effect]
                                , l = !f && n && e.effects[r.effect];
                            return e.fx.off || !f && !l ? s ? this[s](r.duration, r.complete) : this.each(function() {
                                    r.complete && r.complete.call(this)
                                }
                            ) : f ? u === !1 ? this.each(t) : this.queue(u || "fx", t) : l.call(this, {
                                options: r,
                                duration: r.duration,
                                callback: r.complete,
                                mode: r.mode
                            })
                        },
                        _show: e.fn.show,
                        show: function(e) {
                            if (u(e))
                                return this._show.apply(this, arguments);
                            var t = o.apply(this, arguments);
                            return t.mode = "show",
                                this.effect.call(this, t)
                        },
                        _hide: e.fn.hide,
                        hide: function(e) {
                            if (u(e))
                                return this._hide.apply(this, arguments);
                            var t = o.apply(this, arguments);
                            return t.mode = "hide",
                                this.effect.call(this, t)
                        },
                        __toggle: e.fn.toggle,
                        toggle: function(t) {
                            if (u(t) || "boolean" == typeof t || e.isFunction(t))
                                return this.__toggle.apply(this, arguments);
                            var n = o.apply(this, arguments);
                            return n.mode = "toggle",
                                this.effect.call(this, n)
                        },
                        cssUnit: function(t) {
                            var n = this.css(t)
                                , r = [];
                            return e.each(["em", "px", "%", "pt"], function(e, t) {
                                    n.indexOf(t) > 0 && (r = [parseFloat(n), t])
                                }
                            ),
                                r
                        }
                    })
            }
            (),
            function() {
                var t = {};
                e.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(e, n) {
                        t[n] = function(t) {
                            return Math.pow(t, e + 2)
                        }
                    }
                ),
                    e.extend(t, {
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
                            for (var t, n = 4; ((t = Math.pow(2, --n)) - 1) / 11 > e; )
                                ;
                            return 1 / Math.pow(4, 3 - n) - 7.5625 * Math.pow((3 * t - 2) / 22 - e, 2)
                        }
                    }),
                    e.each(t, function(t, n) {
                            e.easing["easeIn" + t] = n,
                                e.easing["easeOut" + t] = function(e) {
                                    return 1 - n(1 - e)
                                }
                                ,
                                e.easing["easeInOut" + t] = function(e) {
                                    return .5 > e ? n(2 * e) / 2 : 1 - n(-2 * e + 2) / 2
                                }
                        }
                    )
            }
            ()
    }
    (jQuery);
    (function(e) {
            var t = /up|down|vertical/
                , n = /up|left|vertical|horizontal/;
            e.effects.effect.blind = function(r, s) {
                var o, u, a, f = e(this), l = ["position", "top", "bottom", "left", "right", "height", "width"], c = e.effects.setMode(f, r.mode || "hide"), h = r.direction || "up", p = t.test(h), d = p ? "height" : "width", v = p ? "top" : "left", m = n.test(h), g = {}, y = "show" === c;
                f.parent().is(".ui-effects-wrapper") ? e.effects.save(f.parent(), l) : e.effects.save(f, l),
                    f.show(),
                    o = e.effects.createWrapper(f).css({
                        overflow: "hidden"
                    }),
                    u = o[d](),
                    a = parseFloat(o.css(v)) || 0,
                    g[d] = y ? u : 0,
                m || (f.css(p ? "bottom" : "right", 0).css(p ? "top" : "left", "auto").css({
                    position: "absolute"
                }),
                    g[v] = y ? a : u + a),
                y && (o.css(d, 0),
                m || o.css(v, a + u)),
                    o.animate(g, {
                        duration: r.duration,
                        easing: r.easing,
                        queue: !1,
                        complete: function() {
                            "hide" === c && f.hide(),
                                e.effects.restore(f, l),
                                e.effects.removeWrapper(f),
                                s()
                        }
                    })
            }
        }
    )(jQuery);
    (function(e) {
            e.effects.effect.bounce = function(t, n) {
                var r, i, s, o = e(this), u = ["position", "top", "bottom", "left", "right", "height", "width"], a = e.effects.setMode(o, t.mode || "effect"), f = "hide" === a, l = "show" === a, c = t.direction || "up", h = t.distance, p = t.times || 5, d = 2 * p + (l || f ? 1 : 0), v = t.duration / d, m = t.easing, g = "up" === c || "down" === c ? "top" : "left", y = "up" === c || "left" === c, b = o.queue(), w = b.length;
                for ((l || f) && u.push("opacity"),
                         e.effects.save(o, u),
                         o.show(),
                         e.effects.createWrapper(o),
                     h || (h = o["top" === g ? "outerHeight" : "outerWidth"]() / 3),
                     l && (s = {
                         opacity: 1
                     },
                         s[g] = 0,
                         o.css("opacity", 0).css(g, y ? 2 * -h : 2 * h).animate(s, v, m)),
                     f && (h /= Math.pow(2, p - 1)),
                         s = {},
                         s[g] = 0,
                         r = 0; p > r; r++)
                    i = {},
                        i[g] = (y ? "-=" : "+=") + h,
                        o.animate(i, v, m).animate(s, v, m),
                        h = f ? 2 * h : h / 2;
                f && (i = {
                    opacity: 0
                },
                    i[g] = (y ? "-=" : "+=") + h,
                    o.animate(i, v, m)),
                    o.queue(function() {
                            f && o.hide(),
                                e.effects.restore(o, u),
                                e.effects.removeWrapper(o),
                                n()
                        }
                    ),
                w > 1 && b.splice.apply(b, [1, 0].concat(b.splice(w, d + 1))),
                    o.dequeue()
            }
        }
    )(jQuery);
    (function(e) {
            e.effects.effect.clip = function(t, n) {
                var r, i, s, o = e(this), u = ["position", "top", "bottom", "left", "right", "height", "width"], a = e.effects.setMode(o, t.mode || "hide"), f = "show" === a, l = t.direction || "vertical", c = "vertical" === l, h = c ? "height" : "width", p = c ? "top" : "left", d = {};
                e.effects.save(o, u),
                    o.show(),
                    r = e.effects.createWrapper(o).css({
                        overflow: "hidden"
                    }),
                    i = "IMG" === o[0].tagName ? r : o,
                    s = i[h](),
                f && (i.css(h, 0),
                    i.css(p, s / 2)),
                    d[h] = f ? s : 0,
                    d[p] = f ? 0 : s / 2,
                    i.animate(d, {
                        queue: !1,
                        duration: t.duration,
                        easing: t.easing,
                        complete: function() {
                            f || o.hide(),
                                e.effects.restore(o, u),
                                e.effects.removeWrapper(o),
                                n()
                        }
                    })
            }
        }
    )(jQuery);
    (function(e) {
            e.effects.effect.drop = function(t, n) {
                var r, i = e(this), s = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"], o = e.effects.setMode(i, t.mode || "hide"), u = "show" === o, a = t.direction || "left", f = "up" === a || "down" === a ? "top" : "left", l = "up" === a || "left" === a ? "pos" : "neg", c = {
                    opacity: u ? 1 : 0
                };
                e.effects.save(i, s),
                    i.show(),
                    e.effects.createWrapper(i),
                    r = t.distance || i["top" === f ? "outerHeight" : "outerWidth"](!0) / 2,
                u && i.css("opacity", 0).css(f, "pos" === l ? -r : r),
                    c[f] = (u ? "pos" === l ? "+=" : "-=" : "pos" === l ? "-=" : "+=") + r,
                    i.animate(c, {
                        queue: !1,
                        duration: t.duration,
                        easing: t.easing,
                        complete: function() {
                            "hide" === o && i.hide(),
                                e.effects.restore(i, s),
                                e.effects.removeWrapper(i),
                                n()
                        }
                    })
            }
        }
    )(jQuery);
    (function(e) {
            e.effects.effect.explode = function(t, n) {
                function r() {
                    b.push(this),
                    b.length === c * h && i()
                }
                function i() {
                    p.css({
                        visibility: "visible"
                    }),
                        e(b).remove(),
                    v || p.hide(),
                        n()
                }
                var s, o, u, a, f, l, c = t.pieces ? Math.round(Math.sqrt(t.pieces)) : 3, h = c, p = e(this), d = e.effects.setMode(p, t.mode || "hide"), v = "show" === d, m = p.show().css("visibility", "hidden").offset(), g = Math.ceil(p.outerWidth() / h), y = Math.ceil(p.outerHeight() / c), b = [];
                for (s = 0; c > s; s++)
                    for (a = m.top + s * y,
                             l = s - (c - 1) / 2,
                             o = 0; h > o; o++)
                        u = m.left + o * g,
                            f = o - (h - 1) / 2,
                            p.clone().appendTo("body").wrap("<div></div>").css({
                                position: "absolute",
                                visibility: "visible",
                                left: -o * g,
                                top: -s * y
                            }).parent().addClass("ui-effects-explode").css({
                                position: "absolute",
                                overflow: "hidden",
                                width: g,
                                height: y,
                                left: u + (v ? f * g : 0),
                                top: a + (v ? l * y : 0),
                                opacity: v ? 0 : 1
                            }).animate({
                                left: u + (v ? 0 : f * g),
                                top: a + (v ? 0 : l * y),
                                opacity: v ? 1 : 0
                            }, t.duration || 500, t.easing, r)
            }
        }
    )(jQuery);
    (function(e) {
            e.effects.effect.fade = function(t, n) {
                var r = e(this)
                    , i = e.effects.setMode(r, t.mode || "toggle");
                r.animate({
                    opacity: i
                }, {
                    queue: !1,
                    duration: t.duration,
                    easing: t.easing,
                    complete: n
                })
            }
        }
    )(jQuery);
    (function(e) {
            e.effects.effect.fold = function(t, n) {
                var r, i, s = e(this), o = ["position", "top", "bottom", "left", "right", "height", "width"], u = e.effects.setMode(s, t.mode || "hide"), a = "show" === u, f = "hide" === u, l = t.size || 15, c = /([0-9]+)%/.exec(l), h = !!t.horizFirst, p = a !== h, d = p ? ["width", "height"] : ["height", "width"], v = t.duration / 2, m = {}, g = {};
                e.effects.save(s, o),
                    s.show(),
                    r = e.effects.createWrapper(s).css({
                        overflow: "hidden"
                    }),
                    i = p ? [r.width(), r.height()] : [r.height(), r.width()],
                c && (l = parseInt(c[1], 10) / 100 * i[f ? 0 : 1]),
                a && r.css(h ? {
                    height: 0,
                    width: l
                } : {
                    height: l,
                    width: 0
                }),
                    m[d[0]] = a ? i[0] : l,
                    g[d[1]] = a ? i[1] : 0,
                    r.animate(m, v, t.easing).animate(g, v, t.easing, function() {
                            f && s.hide(),
                                e.effects.restore(s, o),
                                e.effects.removeWrapper(s),
                                n()
                        }
                    )
            }
        }
    )(jQuery);
    (function(e) {
            e.effects.effect.highlight = function(t, n) {
                var r = e(this)
                    , i = ["backgroundImage", "backgroundColor", "opacity"]
                    , s = e.effects.setMode(r, t.mode || "show")
                    , o = {
                        backgroundColor: r.css("backgroundColor")
                    };
                "hide" === s && (o.opacity = 0),
                    e.effects.save(r, i),
                    r.show().css({
                        backgroundImage: "none",
                        backgroundColor: t.color || "#ffff99"
                    }).animate(o, {
                        queue: !1,
                        duration: t.duration,
                        easing: t.easing,
                        complete: function() {
                            "hide" === s && r.hide(),
                                e.effects.restore(r, i),
                                n()
                        }
                    })
            }
        }
    )(jQuery);
    (function(e) {
            e.effects.effect.pulsate = function(t, n) {
                var r, i = e(this), s = e.effects.setMode(i, t.mode || "show"), o = "show" === s, u = "hide" === s, a = o || "hide" === s, f = 2 * (t.times || 5) + (a ? 1 : 0), l = t.duration / f, c = 0, h = i.queue(), p = h.length;
                for ((o || !i.is(":visible")) && (i.css("opacity", 0).show(),
                    c = 1),
                         r = 1; f > r; r++)
                    i.animate({
                        opacity: c
                    }, l, t.easing),
                        c = 1 - c;
                i.animate({
                    opacity: c
                }, l, t.easing),
                    i.queue(function() {
                            u && i.hide(),
                                n()
                        }
                    ),
                p > 1 && h.splice.apply(h, [1, 0].concat(h.splice(p, f + 1))),
                    i.dequeue()
            }
        }
    )(jQuery);
    (function(e) {
            e.effects.effect.puff = function(t, n) {
                var r = e(this)
                    , i = e.effects.setMode(r, t.mode || "hide")
                    , s = "hide" === i
                    , o = parseInt(t.percent, 10) || 150
                    , u = o / 100
                    , a = {
                        height: r.height(),
                        width: r.width(),
                        outerHeight: r.outerHeight(),
                        outerWidth: r.outerWidth()
                    };
                e.extend(t, {
                    effect: "scale",
                    queue: !1,
                    fade: !0,
                    mode: i,
                    complete: n,
                    percent: s ? o : 100,
                    from: s ? a : {
                        height: a.height * u,
                        width: a.width * u,
                        outerHeight: a.outerHeight * u,
                        outerWidth: a.outerWidth * u
                    }
                }),
                    r.effect(t)
            }
                ,
                e.effects.effect.scale = function(t, n) {
                    var r = e(this)
                        , i = e.extend(!0, {}, t)
                        , s = e.effects.setMode(r, t.mode || "effect")
                        , o = parseInt(t.percent, 10) || (0 === parseInt(t.percent, 10) ? 0 : "hide" === s ? 0 : 100)
                        , u = t.direction || "both"
                        , a = t.origin
                        , f = {
                            height: r.height(),
                            width: r.width(),
                            outerHeight: r.outerHeight(),
                            outerWidth: r.outerWidth()
                        }
                        , l = {
                            y: "horizontal" !== u ? o / 100 : 1,
                            x: "vertical" !== u ? o / 100 : 1
                        };
                    i.effect = "size",
                        i.queue = !1,
                        i.complete = n,
                    "effect" !== s && (i.origin = a || ["middle", "center"],
                        i.restore = !0),
                        i.from = t.from || ("show" === s ? {
                                height: 0,
                                width: 0,
                                outerHeight: 0,
                                outerWidth: 0
                            } : f),
                        i.to = {
                            height: f.height * l.y,
                            width: f.width * l.x,
                            outerHeight: f.outerHeight * l.y,
                            outerWidth: f.outerWidth * l.x
                        },
                    i.fade && ("show" === s && (i.from.opacity = 0,
                        i.to.opacity = 1),
                    "hide" === s && (i.from.opacity = 1,
                        i.to.opacity = 0)),
                        r.effect(i)
                }
                ,
                e.effects.effect.size = function(t, n) {
                    var r, i, s, o = e(this), u = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"], a = ["position", "top", "bottom", "left", "right", "overflow", "opacity"], f = ["width", "height", "overflow"], l = ["fontSize"], c = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"], h = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"], p = e.effects.setMode(o, t.mode || "effect"), d = t.restore || "effect" !== p, v = t.scale || "both", m = t.origin || ["middle", "center"], g = o.css("position"), y = d ? u : a, b = {
                        height: 0,
                        width: 0,
                        outerHeight: 0,
                        outerWidth: 0
                    };
                    "show" === p && o.show(),
                        r = {
                            height: o.height(),
                            width: o.width(),
                            outerHeight: o.outerHeight(),
                            outerWidth: o.outerWidth()
                        },
                        "toggle" === t.mode && "show" === p ? (o.from = t.to || b,
                            o.to = t.from || r) : (o.from = t.from || ("show" === p ? b : r),
                            o.to = t.to || ("hide" === p ? b : r)),
                        s = {
                            from: {
                                y: o.from.height / r.height,
                                x: o.from.width / r.width
                            },
                            to: {
                                y: o.to.height / r.height,
                                x: o.to.width / r.width
                            }
                        },
                    ("box" === v || "both" === v) && (s.from.y !== s.to.y && (y = y.concat(c),
                        o.from = e.effects.setTransition(o, c, s.from.y, o.from),
                        o.to = e.effects.setTransition(o, c, s.to.y, o.to)),
                    s.from.x !== s.to.x && (y = y.concat(h),
                        o.from = e.effects.setTransition(o, h, s.from.x, o.from),
                        o.to = e.effects.setTransition(o, h, s.to.x, o.to))),
                    ("content" === v || "both" === v) && s.from.y !== s.to.y && (y = y.concat(l).concat(f),
                        o.from = e.effects.setTransition(o, l, s.from.y, o.from),
                        o.to = e.effects.setTransition(o, l, s.to.y, o.to)),
                        e.effects.save(o, y),
                        o.show(),
                        e.effects.createWrapper(o),
                        o.css("overflow", "hidden").css(o.from),
                    m && (i = e.effects.getBaseline(m, r),
                        o.from.top = (r.outerHeight - o.outerHeight()) * i.y,
                        o.from.left = (r.outerWidth - o.outerWidth()) * i.x,
                        o.to.top = (r.outerHeight - o.to.outerHeight) * i.y,
                        o.to.left = (r.outerWidth - o.to.outerWidth) * i.x),
                        o.css(o.from),
                    ("content" === v || "both" === v) && (c = c.concat(["marginTop", "marginBottom"]).concat(l),
                        h = h.concat(["marginLeft", "marginRight"]),
                        f = u.concat(c).concat(h),
                        o.find("*[width]").each(function() {
                                var n = e(this)
                                    , r = {
                                        height: n.height(),
                                        width: n.width(),
                                        outerHeight: n.outerHeight(),
                                        outerWidth: n.outerWidth()
                                    };
                                d && e.effects.save(n, f),
                                    n.from = {
                                        height: r.height * s.from.y,
                                        width: r.width * s.from.x,
                                        outerHeight: r.outerHeight * s.from.y,
                                        outerWidth: r.outerWidth * s.from.x
                                    },
                                    n.to = {
                                        height: r.height * s.to.y,
                                        width: r.width * s.to.x,
                                        outerHeight: r.height * s.to.y,
                                        outerWidth: r.width * s.to.x
                                    },
                                s.from.y !== s.to.y && (n.from = e.effects.setTransition(n, c, s.from.y, n.from),
                                    n.to = e.effects.setTransition(n, c, s.to.y, n.to)),
                                s.from.x !== s.to.x && (n.from = e.effects.setTransition(n, h, s.from.x, n.from),
                                    n.to = e.effects.setTransition(n, h, s.to.x, n.to)),
                                    n.css(n.from),
                                    n.animate(n.to, t.duration, t.easing, function() {
                                            d && e.effects.restore(n, f)
                                        }
                                    )
                            }
                        )),
                        o.animate(o.to, {
                            queue: !1,
                            duration: t.duration,
                            easing: t.easing,
                            complete: function() {
                                0 === o.to.opacity && o.css("opacity", o.from.opacity),
                                "hide" === p && o.hide(),
                                    e.effects.restore(o, y),
                                d || ("static" === g ? o.css({
                                    position: "relative",
                                    top: o.to.top,
                                    left: o.to.left
                                }) : e.each(["top", "left"], function(e, t) {
                                        o.css(t, function(t, n) {
                                                var r = parseInt(n, 10)
                                                    , i = e ? o.to.left : o.to.top;
                                                return "auto" === n ? i + "px" : r + i + "px"
                                            }
                                        )
                                    }
                                )),
                                    e.effects.removeWrapper(o),
                                    n()
                            }
                        })
                }
        }
    )(jQuery);
    (function(e) {
            e.effects.effect.shake = function(t, n) {
                var r, i = e(this), s = ["position", "top", "bottom", "left", "right", "height", "width"], o = e.effects.setMode(i, t.mode || "effect"), u = t.direction || "left", a = t.distance || 20, f = t.times || 3, l = 2 * f + 1, c = Math.round(t.duration / l), h = "up" === u || "down" === u ? "top" : "left", p = "up" === u || "left" === u, d = {}, v = {}, m = {}, g = i.queue(), y = g.length;
                for (e.effects.save(i, s),
                         i.show(),
                         e.effects.createWrapper(i),
                         d[h] = (p ? "-=" : "+=") + a,
                         v[h] = (p ? "+=" : "-=") + 2 * a,
                         m[h] = (p ? "-=" : "+=") + 2 * a,
                         i.animate(d, c, t.easing),
                         r = 1; f > r; r++)
                    i.animate(v, c, t.easing).animate(m, c, t.easing);
                i.animate(v, c, t.easing).animate(d, c / 2, t.easing).queue(function() {
                        "hide" === o && i.hide(),
                            e.effects.restore(i, s),
                            e.effects.removeWrapper(i),
                            n()
                    }
                ),
                y > 1 && g.splice.apply(g, [1, 0].concat(g.splice(y, l + 1))),
                    i.dequeue()
            }
        }
    )(jQuery);
    (function(e) {
            e.effects.effect.slide = function(t, n) {
                var r, i = e(this), s = ["position", "top", "bottom", "left", "right", "width", "height"], o = e.effects.setMode(i, t.mode || "show"), u = "show" === o, a = t.direction || "left", f = "up" === a || "down" === a ? "top" : "left", l = "up" === a || "left" === a, c = {};
                e.effects.save(i, s),
                    i.show(),
                    r = t.distance || i["top" === f ? "outerHeight" : "outerWidth"](!0),
                    e.effects.createWrapper(i).css({
                        overflow: "hidden"
                    }),
                u && i.css(f, l ? isNaN(r) ? "-" + r : -r : r),
                    c[f] = (u ? l ? "+=" : "-=" : l ? "-=" : "+=") + r,
                    i.animate(c, {
                        queue: !1,
                        duration: t.duration,
                        easing: t.easing,
                        complete: function() {
                            "hide" === o && i.hide(),
                                e.effects.restore(i, s),
                                e.effects.removeWrapper(i),
                                n()
                        }
                    })
            }
        }
    )(jQuery);
    (function(e) {
            e.effects.effect.transfer = function(t, n) {
                var r = e(this)
                    , i = e(t.to)
                    , s = "fixed" === i.css("position")
                    , o = e("body")
                    , u = s ? o.scrollTop() : 0
                    , a = s ? o.scrollLeft() : 0
                    , f = i.offset()
                    , l = {
                        top: f.top - u,
                        left: f.left - a,
                        height: i.innerHeight(),
                        width: i.innerWidth()
                    }
                    , c = r.offset()
                    , h = e('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(t.className).css({
                        top: c.top - u,
                        left: c.left - a,
                        height: r.innerHeight(),
                        width: r.innerWidth(),
                        position: s ? "fixed" : "absolute"
                    }).animate(l, t.duration, t.easing, function() {
                            h.remove(),
                                n()
                        }
                    )
            }
        }
    )(jQuery);
`