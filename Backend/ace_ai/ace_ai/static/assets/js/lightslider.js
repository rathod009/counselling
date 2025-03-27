! function(e, i) {
    "use strict";
    var t = {
        item: 3,
        autoWidth: !1,
        slideMove: 1,
        slideMargin: 10,
        addClass: "",
        mode: "slide",
        useCSS: !0,
        cssEasing: "ease",
        easing: "linear",
        speed: 400,
        auto: !1,
        pauseOnHover: !1,
        loop: !1,
        slideEndAnimation: !0,
        pause: 2e3,
        keyPress: !1,
        controls: !0,
        prevHtml: "",
        nextHtml: "",
        rtl: !1,
        adaptiveHeight: !1,
        vertical: !1,
        verticalHeight: 500,
        vThumbWidth: 100,
        thumbItem: 10,
        pager: !0,
        gallery: !1,
        galleryMargin: 5,
        thumbMargin: 5,
        currentPagerPosition: "middle",
        enableTouch: !0,
        enableDrag: !0,
        freeMove: !0,
        swipeThreshold: 40,
        responsive: [],
        onBeforeStart: function(e) {},
        onSliderLoad: function(e) {},
        onBeforeSlide: function(e, i) {},
        onAfterSlide: function(e, i) {},
        onBeforeNextSlide: function(e, i) {},
        onBeforePrevSlide: function(e, i) {}
    };
    e.fn.lightSlider = function(i) {
        if (0 === this.length) return this;
        if (this.length > 1) return this.each(function() {
            e(this).lightSlider(i)
        }), this;
        var n = {},
            l = e.extend(!0, {}, t, i),
            a = {},
            s = this;
        n.$el = this, "fade" === l.mode && (l.vertical = !1);
        var o = s.children(),
            r = e(window).width(),
            d = null,
            c = 0,
            u = 0,
            f = !1,
            h = 0,
            g = "",
            v = 0,
            p = !0 === l.vertical ? "height" : "width",
            m = !0 === l.vertical ? "margin-bottom" : "margin-right",
            S = 0,
            b = 0,
            C = 0,
            M = 0,
            T = null,
            x = "ontouchstart" in document.documentElement,
            w = {
                chbreakpoint: function() {
                    if (r = e(window).width(), l.responsive.length) {
                        var i;
                        if (!1 === l.autoWidth && (i = l.item), r < l.responsive[0].breakpoint)
                            for (var t = 0; t < l.responsive.length; t++) r < l.responsive[t].breakpoint && (l.responsive[t].breakpoint, d = l.responsive[t]);
                        if (void 0 !== d && null !== d)
                            for (var n in d.settings) d.settings.hasOwnProperty(n) && (void 0 !== a[n] && null !== a[n] || (a[n] = l[n]), l[n] = d.settings[n]);
                        if (!e.isEmptyObject(a) && r > l.responsive[0].breakpoint)
                            for (var s in a) a.hasOwnProperty(s) && (l[s] = a[s]);
                        !1 === l.autoWidth && S > 0 && C > 0 && i !== l.item && (v = Math.round(S / ((C + l.slideMargin) * l.slideMove)))
                    }
                },
                calSW: function() {
                    !1 === l.autoWidth && (C = (h - (l.item * l.slideMargin - l.slideMargin)) / l.item)
                },
                calWidth: function(e) {
                    var i = !0 === e ? g.find(".lslide").length : o.length;
                    if (!1 === l.autoWidth) u = i * (C + l.slideMargin);
                    else {
                        u = 0;
                        for (var t = 0; t < i; t++) u += parseInt(o.eq(t).width()) + l.slideMargin
                    }
                    return u
                }
            };
        return (n = {
            doCss: function() {
                return !(!l.useCSS || ! function() {
                    for (var e = ["transition", "MozTransition", "WebkitTransition", "OTransition", "msTransition", "KhtmlTransition"], i = document.documentElement, t = 0; t < e.length; t++)
                        if (e[t] in i.style) return !0
                }())
            },
            keyPress: function() {
                l.keyPress && e(document).on("keyup.lightslider", function(i) {
                    e(":focus").is("input, textarea") || (i.preventDefault ? i.preventDefault() : i.returnValue = !1, 37 === i.keyCode ? s.goToPrevSlide() : 39 === i.keyCode && s.goToNextSlide())
                })
            },
            controls: function() {
                l.controls && (s.after('<div class="lSAction"><a class="lSPrev">' + l.prevHtml + '</a><a class="lSNext">' + l.nextHtml + "</a></div>"), l.autoWidth ? w.calWidth(!1) < h && g.find(".lSAction").hide() : c <= l.item && g.find(".lSAction").hide(), g.find(".lSAction a").on("click", function(i) {
                    return i.preventDefault ? i.preventDefault() : i.returnValue = !1, "lSPrev" === e(this).attr("class") ? s.goToPrevSlide() : s.goToNextSlide(), !1
                }))
            },
            initialStyle: function() {
                var e = this;
                "fade" === l.mode && (l.autoWidth = !1, l.slideEndAnimation = !1), l.auto && (l.slideEndAnimation = !1), l.autoWidth && (l.slideMove = 1, l.item = 1), l.loop && (l.slideMove = 1, l.freeMove = !1), l.onBeforeStart.call(this, s), w.chbreakpoint(), s.addClass("lightSlider").wrap('<div class="lSSlideOuter ' + l.addClass + '"><div class="lSSlideWrapper"></div></div>'), g = s.parent(".lSSlideWrapper"), !0 === l.rtl && g.parent().addClass("lSrtl"), l.vertical ? (g.parent().addClass("vertical"), h = l.verticalHeight, g.css("height", h + "px")) : h = s.outerWidth(), o.addClass("lslide"), !0 === l.loop && "slide" === l.mode && (w.calSW(), w.clone = function() {
                    if (w.calWidth(!0) > h) {
                        for (var i = 0, t = 0, n = 0; n < o.length && (t++, !((i += parseInt(s.find(".lslide").eq(n).width()) + l.slideMargin) >= h + l.slideMargin)); n++);
                        var a = !0 === l.autoWidth ? t : l.item;
                        if (a < s.find(".clone.left").length)
                            for (var r = 0; r < s.find(".clone.left").length - a; r++) o.eq(r).remove();
                        if (a < s.find(".clone.right").length)
                            for (var d = o.length - 1; d > o.length - 1 - s.find(".clone.right").length; d--) v--, o.eq(d).remove();
                        for (var c = s.find(".clone.right").length; c < a; c++) s.find(".lslide").eq(c).clone().removeClass("lslide").addClass("clone right").appendTo(s), v++;
                        for (var u = s.find(".lslide").length - s.find(".clone.left").length; u > s.find(".lslide").length - a; u--) s.find(".lslide").eq(u - 1).clone().removeClass("lslide").addClass("clone left").prependTo(s);
                        o = s.children()
                    } else o.hasClass("clone") && (s.find(".clone").remove(), e.move(s, 0))
                }, w.clone()), w.sSW = function() {
                    c = o.length, !0 === l.rtl && !1 === l.vertical && (m = "margin-left"), !1 === l.autoWidth && o.css(p, C + "px"), o.css(m, l.slideMargin + "px"), u = w.calWidth(!1), s.css(p, u + "px"), !0 === l.loop && "slide" === l.mode && !1 === f && (v = s.find(".clone.left").length)
                }, w.calL = function() {
                    o = s.children(), c = o.length
                }, this.doCss() && g.addClass("usingCss"), w.calL(), "slide" === l.mode ? (w.calSW(), w.sSW(), !0 === l.loop && (S = e.slideValue(), this.move(s, S)), !1 === l.vertical && this.setHeight(s, !1)) : (this.setHeight(s, !0), s.addClass("lSFade"), this.doCss() || (o.fadeOut(0), o.eq(v).fadeIn(0))), !0 === l.loop && "slide" === l.mode ? o.eq(v).addClass("active") : o.first().addClass("active")
            },
            pager: function() {
                var e = this;
                if (w.createPager = function() {
                        M = (h - (l.thumbItem * l.thumbMargin - l.thumbMargin)) / l.thumbItem;
                        var i = g.find(".lslide"),
                            t = g.find(".lslide").length,
                            n = 0,
                            a = "",
                            o = 0;
                        for (n = 0; n < t; n++) {
                            "slide" === l.mode && (l.autoWidth ? o += (parseInt(i.eq(n).width()) + l.slideMargin) * l.slideMove : o = n * ((C + l.slideMargin) * l.slideMove));
                            var r = i.eq(n * l.slideMove).attr("data-thumb");
                            if (!0 === l.gallery ? a += '<li style="width:100%;' + p + ":" + M + "px;" + m + ":" + l.thumbMargin + 'px"><a href="#"><img src="' + r + '" /></a></li>' : a += '<li><a href="#">' + (n + 1) + "</a></li>", "slide" === l.mode && o >= u - h - l.slideMargin) {
                                n += 1;
                                var d = 2;
                                l.autoWidth && (a += '<li><a href="#">' + (n + 1) + "</a></li>", d = 1), n < d ? (a = null, g.parent().addClass("noPager")) : g.parent().removeClass("noPager");
                                break
                            }
                        }
                        var c = g.parent();
                        c.find(".lSPager").html(a), !0 === l.gallery && (!0 === l.vertical && c.find(".lSPager").css("width", l.vThumbWidth + "px"), b = n * (l.thumbMargin + M) + .5, c.find(".lSPager").css({
                            property: b + "px",
                            "transition-duration": l.speed + "ms"
                        }), !0 === l.vertical && g.parent().css("padding-right", l.vThumbWidth + l.galleryMargin + "px"), c.find(".lSPager").css(p, b + "px"));
                        var f = c.find(".lSPager").find("li");
                        f.first().addClass("active"), f.on("click", function() {
                            return !0 === l.loop && "slide" === l.mode ? v += f.index(this) - c.find(".lSPager").find("li.active").index() : v = f.index(this), s.mode(!1), !0 === l.gallery && e.slideThumb(), !1
                        })
                    }, l.pager) {
                    var i = "lSpg";
                    l.gallery && (i = "lSGallery"), g.after('<ul class="lSPager ' + i + '"></ul>');
                    var t = l.vertical ? "margin-left" : "margin-top";
                    g.parent().find(".lSPager").css(t, l.galleryMargin + "px"), w.createPager()
                }
                setTimeout(function() {
                    w.init()
                }, 0)
            },
            setHeight: function(e, i) {
                var t = null,
                    n = this;
                t = l.loop ? e.children(".lslide ").first() : e.children().first();
                var a = function() {
                    var n = t.outerHeight(),
                        l = 0,
                        a = n;
                    i && (n = 0, l = 100 * a / h), e.css({
                        height: n + "px",
                        "padding-bottom": l + "%"
                    })
                };
                a(), t.find("img").length ? t.find("img")[0].complete ? (a(), T || n.auto()) : t.find("img").on("load", function() {
                    setTimeout(function() {
                        a(), T || n.auto()
                    }, 100)
                }) : T || n.auto()
            },
            active: function(e, i) {
                this.doCss() && "fade" === l.mode && g.addClass("on");
                var t, n, a = 0;
                v * l.slideMove < c ? (e.removeClass("active"), this.doCss() || "fade" !== l.mode || !1 !== i || e.fadeOut(l.speed), a = !0 === i ? v : v * l.slideMove, !0 === i && (n = (t = e.length) - 1, a + 1 >= t && (a = n)), !0 === l.loop && "slide" === l.mode && (a = !0 === i ? v - s.find(".clone.left").length : v * l.slideMove, !0 === i && (n = (t = e.length) - 1, a + 1 === t ? a = n : a + 1 > t && (a = 0))), this.doCss() || "fade" !== l.mode || !1 !== i || e.eq(a).fadeIn(l.speed), e.eq(a).addClass("active")) : (e.removeClass("active"), e.eq(e.length - 1).addClass("active"), this.doCss() || "fade" !== l.mode || !1 !== i || (e.fadeOut(l.speed), e.eq(a).fadeIn(l.speed)))
            },
            move: function(e, i) {
                !0 === l.rtl && (i = -i), this.doCss() ? !0 === l.vertical ? e.css({
                    transform: "translate3d(0px, " + -i + "px, 0px)",
                    "-webkit-transform": "translate3d(0px, " + -i + "px, 0px)"
                }) : e.css({
                    transform: "translate3d(" + -i + "px, 0px, 0px)",
                    "-webkit-transform": "translate3d(" + -i + "px, 0px, 0px)"
                }) : !0 === l.vertical ? e.css("position", "relative").animate({
                    top: -i + "px"
                }, l.speed, l.easing) : e.css("position", "relative").animate({
                    left: -i + "px"
                }, l.speed, l.easing);
                var t = g.parent().find(".lSPager").find("li");
                this.active(t, !0)
            },
            fade: function() {
                this.active(o, !1);
                var e = g.parent().find(".lSPager").find("li");
                this.active(e, !0)
            },
            slide: function() {
                var e = this;
                w.calSlide = function() {
                    u > h && (S = e.slideValue(), e.active(o, !1), S > u - h - l.slideMargin ? S = u - h - l.slideMargin : S < 0 && (S = 0), e.move(s, S), !0 === l.loop && "slide" === l.mode && (v >= c - s.find(".clone.left").length / l.slideMove && e.resetSlide(s.find(".clone.left").length), 0 === v && e.resetSlide(g.find(".lslide").length)))
                }, w.calSlide()
            },
            resetSlide: function(e) {
                var i = this;
                g.find(".lSAction a").addClass("disabled"), setTimeout(function() {
                    v = e, g.css("transition-duration", "0ms"), S = i.slideValue(), i.active(o, !1), n.move(s, S), setTimeout(function() {
                        g.css("transition-duration", l.speed + "ms"), g.find(".lSAction a").removeClass("disabled")
                    }, 50)
                }, l.speed + 100)
            },
            slideValue: function() {
                var e = 0;
                if (!1 === l.autoWidth) e = v * ((C + l.slideMargin) * l.slideMove);
                else {
                    e = 0;
                    for (var i = 0; i < v; i++) e += parseInt(o.eq(i).width()) + l.slideMargin
                }
                return e
            },
            slideThumb: function() {
                var e;
                switch (l.currentPagerPosition) {
                    case "left":
                        e = 0;
                        break;
                    case "middle":
                        e = h / 2 - M / 2;
                        break;
                    case "right":
                        e = h - M
                }
                var i = v - s.find(".clone.left").length,
                    t = g.parent().find(".lSPager");
                "slide" === l.mode && !0 === l.loop && (i >= t.children().length ? i = 0 : i < 0 && (i = t.children().length));
                var n = i * (M + l.thumbMargin) - e;
                n + h > b && (n = b - h - l.thumbMargin), n < 0 && (n = 0), this.move(t, n)
            },
            auto: function() {
                l.auto && (clearInterval(T), T = setInterval(function() {
                    s.goToNextSlide()
                }, l.pause))
            },
            pauseOnHover: function() {
                var i = this;
                l.auto && l.pauseOnHover && (g.on("mouseenter", function() {
                    e(this).addClass("ls-hover"), s.pause(), l.auto = !0
                }), g.on("mouseleave", function() {
                    e(this).removeClass("ls-hover"), g.find(".lightSlider").hasClass("lsGrabbing") || i.auto()
                }))
            },
            touchMove: function(e, i) {
                if (g.css("transition-duration", "0ms"), "slide" === l.mode) {
                    var t = S - (e - i);
                    if (t >= u - h - l.slideMargin)
                        if (!1 === l.freeMove) t = u - h - l.slideMargin;
                        else {
                            var n = u - h - l.slideMargin;
                            t = n + (t - n) / 5
                        }
                    else t < 0 && (!1 === l.freeMove ? t = 0 : t /= 5);
                    this.move(s, t)
                }
            },
            touchEnd: function(e) {
                if (g.css("transition-duration", l.speed + "ms"), "slide" === l.mode) {
                    var i = !1,
                        t = !0;
                    (S -= e) > u - h - l.slideMargin ? (S = u - h - l.slideMargin, !1 === l.autoWidth && (i = !0)) : S < 0 && (S = 0);
                    var n = function(e) {
                        var t = 0;
                        if (i || e && (t = 1), l.autoWidth)
                            for (var n = 0, a = 0; a < o.length && (n += parseInt(o.eq(a).width()) + l.slideMargin, v = a + t, !(n >= S)); a++);
                        else {
                            var s = S / ((C + l.slideMargin) * l.slideMove);
                            v = parseInt(s) + t, S >= u - h - l.slideMargin && s % 1 != 0 && v++
                        }
                    };
                    e >= l.swipeThreshold ? (n(!1), t = !1) : e <= -l.swipeThreshold && (n(!0), t = !1), s.mode(t), this.slideThumb()
                } else e >= l.swipeThreshold ? s.goToPrevSlide() : e <= -l.swipeThreshold && s.goToNextSlide()
            },
            enableDrag: function() {
                var i = this;
                if (!x) {
                    var t = 0,
                        n = 0,
                        a = !1;
                    g.find(".lightSlider").addClass("lsGrab"), g.on("mousedown", function(i) {
                        if (u < h && 0 !== u) return !1;
                        "lSPrev" !== e(i.target).attr("class") && "lSNext" !== e(i.target).attr("class") && (t = !0 === l.vertical ? i.pageY : i.pageX, a = !0, i.preventDefault ? i.preventDefault() : i.returnValue = !1, g.scrollLeft += 1, g.scrollLeft -= 1, g.find(".lightSlider").removeClass("lsGrab").addClass("lsGrabbing"), clearInterval(T))
                    }), e(window).on("mousemove", function(e) {
                        a && (n = !0 === l.vertical ? e.pageY : e.pageX, i.touchMove(n, t))
                    }), e(window).on("mouseup", function(s) {
                        if (a) {
                            g.find(".lightSlider").removeClass("lsGrabbing").addClass("lsGrab"), a = !1;
                            var o = (n = !0 === l.vertical ? s.pageY : s.pageX) - t;
                            Math.abs(o) >= l.swipeThreshold && e(window).on("click.ls", function(i) {
                                i.preventDefault ? i.preventDefault() : i.returnValue = !1, i.stopImmediatePropagation(), i.stopPropagation(), e(window).off("click.ls")
                            }), i.touchEnd(o)
                        }
                    })
                }
            },
            enableTouch: function() {
                var e = this;
                if (x) {
                    var i = {},
                        t = {};
                    g.on("touchstart", function(e) {
                        t = e.originalEvent.targetTouches[0], i.pageX = e.originalEvent.targetTouches[0].pageX, i.pageY = e.originalEvent.targetTouches[0].pageY, clearInterval(T)
                    }), g.on("touchmove", function(n) {
                        if (u < h && 0 !== u) return !1;
                        var a = n.originalEvent;
                        t = a.targetTouches[0];
                        var s = Math.abs(t.pageX - i.pageX),
                            o = Math.abs(t.pageY - i.pageY);
                        !0 === l.vertical ? (3 * o > s && n.preventDefault(), e.touchMove(t.pageY, i.pageY)) : (3 * s > o && n.preventDefault(), e.touchMove(t.pageX, i.pageX))
                    }), g.on("touchend", function() {
                        if (u < h && 0 !== u) return !1;
                        var n;
                        n = !0 === l.vertical ? t.pageY - i.pageY : t.pageX - i.pageX, e.touchEnd(n)
                    })
                }
            },
            build: function() {
                var i = this;
                i.initialStyle(), this.doCss() && (!0 === l.enableTouch && i.enableTouch(), !0 === l.enableDrag && i.enableDrag()), e(window).on("focus", function() {
                    i.auto()
                }), e(window).on("blur", function() {
                    clearInterval(T)
                }), i.pager(), i.pauseOnHover(), i.controls(), i.keyPress()
            }
        }).build(), w.init = function() {
            w.chbreakpoint(), !0 === l.vertical ? (h = l.item > 1 ? l.verticalHeight : o.outerHeight(), g.css("height", h + "px")) : h = g.outerWidth(), !0 === l.loop && "slide" === l.mode && w.clone(), w.calL(), "slide" === l.mode && s.removeClass("lSSlide"), "slide" === l.mode && (w.calSW(), w.sSW()), setTimeout(function() {
                "slide" === l.mode && s.addClass("lSSlide")
            }, 1e3), l.pager && w.createPager(), !0 === l.adaptiveHeight && !1 === l.vertical && s.css("height", o.eq(v).outerHeight(!0)), !1 === l.adaptiveHeight && ("slide" === l.mode ? !1 === l.vertical ? n.setHeight(s, !1) : n.auto() : n.setHeight(s, !0)), !0 === l.gallery && n.slideThumb(), "slide" === l.mode && n.slide(), !1 === l.autoWidth ? o.length <= l.item ? g.find(".lSAction").hide() : g.find(".lSAction").show() : w.calWidth(!1) < h && 0 !== u ? g.find(".lSAction").hide() : g.find(".lSAction").show()
        }, s.goToPrevSlide = function() {
            if (v > 0) l.onBeforePrevSlide.call(this, s, v), v--, s.mode(!1), !0 === l.gallery && n.slideThumb();
            else if (!0 === l.loop) {
                if (l.onBeforePrevSlide.call(this, s, v), "fade" === l.mode) v = parseInt((c - 1) / l.slideMove);
                s.mode(!1), !0 === l.gallery && n.slideThumb()
            } else !0 === l.slideEndAnimation && (s.addClass("leftEnd"), setTimeout(function() {
                s.removeClass("leftEnd")
            }, 400))
        }, s.goToNextSlide = function() {
            var e = !0;
            "slide" === l.mode && (e = n.slideValue() < u - h - l.slideMargin);
            v * l.slideMove < c - l.slideMove && e ? (l.onBeforeNextSlide.call(this, s, v), v++, s.mode(!1), !0 === l.gallery && n.slideThumb()) : !0 === l.loop ? (l.onBeforeNextSlide.call(this, s, v), v = 0, s.mode(!1), !0 === l.gallery && n.slideThumb()) : !0 === l.slideEndAnimation && (s.addClass("rightEnd"), setTimeout(function() {
                s.removeClass("rightEnd")
            }, 400))
        }, s.mode = function(e) {
            !0 === l.adaptiveHeight && !1 === l.vertical && s.css("height", o.eq(v).outerHeight(!0)), !1 === f && ("slide" === l.mode ? n.doCss() && (s.addClass("lSSlide"), "" !== l.speed && g.css("transition-duration", l.speed + "ms"), "" !== l.cssEasing && g.css("transition-timing-function", l.cssEasing)) : n.doCss() && ("" !== l.speed && s.css("transition-duration", l.speed + "ms"), "" !== l.cssEasing && s.css("transition-timing-function", l.cssEasing))), e || l.onBeforeSlide.call(this, s, v), "slide" === l.mode ? n.slide() : n.fade(), g.hasClass("ls-hover") || n.auto(), setTimeout(function() {
                e || l.onAfterSlide.call(this, s, v)
            }, l.speed), f = !0
        }, s.play = function() {
            s.goToNextSlide(), l.auto = !0, n.auto()
        }, s.pause = function() {
            l.auto = !1, clearInterval(T)
        }, s.refresh = function() {
            w.init()
        }, s.getCurrentSlideCount = function() {
            var e = v;
            if (l.loop) {
                var i = g.find(".lslide").length,
                    t = s.find(".clone.left").length;
                e = v <= t - 1 ? i + (v - t) : v >= i + t ? v - i - t : v - t
            }
            return e + 1
        }, s.getTotalSlideCount = function() {
            return g.find(".lslide").length
        }, s.goToSlide = function(e) {
            v = l.loop ? e + s.find(".clone.left").length - 1 : e, s.mode(!1), !0 === l.gallery && n.slideThumb()
        }, s.destroy = function() {
            s.lightSlider && (s.goToPrevSlide = function() {}, s.goToNextSlide = function() {}, s.mode = function() {}, s.play = function() {}, s.pause = function() {}, s.refresh = function() {}, s.getCurrentSlideCount = function() {}, s.getTotalSlideCount = function() {}, s.goToSlide = function() {}, s.lightSlider = null, w = {
                init: function() {}
            }, s.parent().parent().find(".lSAction, .lSPager").remove(), s.removeClass("lightSlider lSFade lSSlide lsGrab lsGrabbing leftEnd right").removeAttr("style").unwrap().unwrap(), s.children().removeAttr("style"), o.removeClass("lslide active"), s.find(".clone").remove(), o = null, T = null, f = !1, v = 0)
        }, setTimeout(function() {
            l.onSliderLoad.call(this, s)
        }, 10), e(window).on("resize orientationchange", function(e) {
            setTimeout(function() {
                e.preventDefault ? e.preventDefault() : e.returnValue = !1, w.init()
            }, 200)
        }), this
    }
}(jQuery);