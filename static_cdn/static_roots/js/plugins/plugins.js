/*!
 * The Final Countdown for jQuery v2.2.0 (http://hilios.github.io/jQuery.countdown/)
 * Copyright (c) 2016 Edson Hilios
 */
! function(a) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery) }(function(a) {
    "use strict";

    function b(a) { if (a instanceof Date) return a; if (String(a).match(g)) return String(a).match(/^[0-9]*$/) && (a = Number(a)), String(a).match(/\-/) && (a = String(a).replace(/\-/g, "/")), new Date(a); throw new Error("Couldn't cast `" + a + "` to a date object.") }

    function c(a) { var b = a.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"); return new RegExp(b) }

    function d(a) {
        return function(b) {
            var d = b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
            if (d)
                for (var f = 0, g = d.length; f < g; ++f) {
                    var h = d[f].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
                        j = c(h[0]),
                        k = h[1] || "",
                        l = h[3] || "",
                        m = null;
                    h = h[2], i.hasOwnProperty(h) && (m = i[h], m = Number(a[m])), null !== m && ("!" === k && (m = e(l, m)), "" === k && m < 10 && (m = "0" + m.toString()), b = b.replace(j, m.toString()))
                }
            return b = b.replace(/%%/, "%")
        }
    }

    function e(a, b) {
        var c = "s",
            d = "";
        return a && (a = a.replace(/(:|;|\s)/gi, "").split(/\,/), 1 === a.length ? c = a[0] : (d = a[0], c = a[1])), Math.abs(b) > 1 ? c : d
    }
    var f = [],
        g = [],
        h = { precision: 100, elapse: !1, defer: !1 };
    g.push(/^[0-9]*$/.source), g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), g = new RegExp(g.join("|"));
    var i = { Y: "years", m: "months", n: "daysToMonth", d: "daysToWeek", w: "weeks", W: "weeksToMonth", H: "hours", M: "minutes", S: "seconds", D: "totalDays", I: "totalHours", N: "totalMinutes", T: "totalSeconds" },
        j = function(b, c, d) { this.el = b, this.$el = a(b), this.interval = null, this.offset = {}, this.options = a.extend({}, h), this.firstTick = !0, this.instanceNumber = f.length, f.push(this), this.$el.data("countdown-instance", this.instanceNumber), d && ("function" == typeof d ? (this.$el.on("update.countdown", d), this.$el.on("stoped.countdown", d), this.$el.on("finish.countdown", d)) : this.options = a.extend({}, h, d)), this.setFinalDate(c), this.options.defer === !1 && this.start() };
    a.extend(j.prototype, {
        start: function() {
            null !== this.interval && clearInterval(this.interval);
            var a = this;
            this.update(), this.interval = setInterval(function() { a.update.call(a) }, this.options.precision)
        },
        stop: function() { clearInterval(this.interval), this.interval = null, this.dispatchEvent("stoped") },
        toggle: function() { this.interval ? this.stop() : this.start() },
        pause: function() { this.stop() },
        resume: function() { this.start() },
        remove: function() { this.stop.call(this), f[this.instanceNumber] = null, delete this.$el.data().countdownInstance },
        setFinalDate: function(a) { this.finalDate = b(a) },
        update: function() { if (0 === this.$el.closest("html").length) return void this.remove(); var a, b = new Date; return a = this.finalDate.getTime() - b.getTime(), a = Math.ceil(a / 1e3), a = !this.options.elapse && a < 0 ? 0 : Math.abs(a), this.totalSecsLeft === a || this.firstTick ? void(this.firstTick = !1) : (this.totalSecsLeft = a, this.elapsed = b >= this.finalDate, this.offset = { seconds: this.totalSecsLeft % 60, minutes: Math.floor(this.totalSecsLeft / 60) % 60, hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24, days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7, daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7, daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368), weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7), weeksToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4, months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368), years: Math.abs(this.finalDate.getFullYear() - b.getFullYear()), totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24), totalHours: Math.floor(this.totalSecsLeft / 60 / 60), totalMinutes: Math.floor(this.totalSecsLeft / 60), totalSeconds: this.totalSecsLeft }, void(this.options.elapse || 0 !== this.totalSecsLeft ? this.dispatchEvent("update") : (this.stop(), this.dispatchEvent("finish")))) },
        dispatchEvent: function(b) {
            var c = a.Event(b + ".countdown");
            c.finalDate = this.finalDate, c.elapsed = this.elapsed, c.offset = a.extend({}, this.offset), c.strftime = d(this.offset), this.$el.trigger(c)
        }
    }), a.fn.countdown = function() {
        var b = Array.prototype.slice.call(arguments, 0);
        return this.each(function() {
            var c = a(this).data("countdown-instance");
            if (void 0 !== c) {
                var d = f[c],
                    e = b[0];
                j.prototype.hasOwnProperty(e) ? d[e].apply(d, b.slice(1)) : null === String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? (d.setFinalDate.call(d, e), d.start()) : a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, e))
            } else new j(this, b[0], b[1])
        })
    }
});

/*====================================*/

/*---------------------------------------
    Ajax Mailchimp js
----------------------------------------*/
(function($) {
    "use strict";
    $.ajaxChimp = { responses: { "We have sent you a confirmation email": 0, "Please enter a value": 1, "An email address must contain a single @": 2, "The domain portion of the email address is invalid (the portion after the @: )": 3, "The username portion of the email address is invalid (the portion before the @: )": 4, "This email address looks fake or invalid. Please enter a real email address": 5 }, translations: { en: null }, init: function(selector, options) { $(selector).ajaxChimp(options) } };
    $.fn.ajaxChimp = function(options) {
        $(this).each(function(i, elem) {
            var form = $(elem);
            var email = form.find("input[type=email]");
            var label = form.find("label[for=" + email.attr("id") + "]");
            var settings = $.extend({ url: form.attr("action"), language: "en" }, options);
            var url = settings.url.replace("/post?", "/post-json?").concat("&c=?");
            form.attr("novalidate", "true");
            email.attr("name", "EMAIL");
            form.submit(function() {
                var msg;

                function successCallback(resp) {
                    if (resp.result === "success") {
                        msg = "We have sent you a confirmation email";
                        label.removeClass("error").addClass("valid");
                        email.removeClass("error").addClass("valid")
                    } else {
                        email.removeClass("valid").addClass("error");
                        label.removeClass("valid").addClass("error");
                        var index = -1;
                        try {
                            var parts = resp.msg.split(" - ", 2);
                            if (parts[1] === undefined) { msg = resp.msg } else {
                                var i = parseInt(parts[0], 10);
                                if (i.toString() === parts[0]) {
                                    index = parts[0];
                                    msg = parts[1]
                                } else {
                                    index = -1;
                                    msg = resp.msg
                                }
                            }
                        } catch (e) {
                            index = -1;
                            msg = resp.msg
                        }
                    }
                    if (settings.language !== "en" && $.ajaxChimp.responses[msg] !== undefined && $.ajaxChimp.translations && $.ajaxChimp.translations[settings.language] && $.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]]) { msg = $.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]] }
                    label.html(msg);
                    label.show(2e3);
                    if (settings.callback) { settings.callback(resp) }
                }
                var data = {};
                var dataArray = form.serializeArray();
                $.each(dataArray, function(index, item) { data[item.name] = item.value });
                $.ajax({ url: url, data: data, success: successCallback, dataType: "jsonp", error: function(resp, text) { console.log("mailchimp ajax submit error: " + text) } });
                var submitMsg = "Submitting...";
                if (settings.language !== "en" && $.ajaxChimp.translations && $.ajaxChimp.translations[settings.language] && $.ajaxChimp.translations[settings.language]["submit"]) { submitMsg = $.ajaxChimp.translations[settings.language]["submit"] }
                label.html(submitMsg).show(2e3);
                return false
            })
        });
        return this
    }
})(jQuery);

/*====================================*/

/*! Magnific Popup - v1.1.0 - 2016-02-20
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2016 Dmitry Semenov; */
! function(a) { "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto) }(function(a) {
    var b, c, d, e, f, g, h = "Close",
        i = "BeforeClose",
        j = "AfterClose",
        k = "BeforeAppend",
        l = "MarkupParse",
        m = "Open",
        n = "Change",
        o = "mfp",
        p = "." + o,
        q = "mfp-ready",
        r = "mfp-removing",
        s = "mfp-prevent-close",
        t = function() {},
        u = !!window.jQuery,
        v = a(window),
        w = function(a, c) { b.ev.on(o + a + p, c) },
        x = function(b, c, d, e) { var f = document.createElement("div"); return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f },
        y = function(c, d) { b.ev.triggerHandler(o + c, d), b.st.callbacks && (c = c.charAt(0).toLowerCase() + c.slice(1), b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d])) },
        z = function(c) { return c === g && b.currTemplate.closeBtn || (b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose)), g = c), b.currTemplate.closeBtn },
        A = function() { a.magnificPopup.instance || (b = new t, b.init(), a.magnificPopup.instance = b) },
        B = function() {
            var a = document.createElement("p").style,
                b = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== a.transition) return !0;
            for (; b.length;)
                if (b.pop() + "Transition" in a) return !0;
            return !1
        };
    t.prototype = {
        constructor: t,
        init: function() {
            var c = navigator.appVersion;
            b.isLowIE = b.isIE8 = document.all && !document.addEventListener, b.isAndroid = /android/gi.test(c), b.isIOS = /iphone|ipad|ipod/gi.test(c), b.supportsTransition = B(), b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), d = a(document), b.popupsCache = {}
        },
        open: function(c) {
            var e;
            if (c.isObj === !1) {
                b.items = c.items.toArray(), b.index = 0;
                var g, h = c.items;
                for (e = 0; e < h.length; e++)
                    if (g = h[e], g.parsed && (g = g.el[0]), g === c.el[0]) { b.index = e; break }
            } else b.items = a.isArray(c.items) ? c.items : [c.items], b.index = c.index || 0;
            if (b.isOpen) return void b.updateItemHTML();
            b.types = [], f = "", c.mainEl && c.mainEl.length ? b.ev = c.mainEl.eq(0) : b.ev = d, c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}), b.currTemplate = b.popupsCache[c.key]) : b.currTemplate = {}, b.st = a.extend(!0, {}, a.magnificPopup.defaults, c), b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos, b.st.modal && (b.st.closeOnContentClick = !1, b.st.closeOnBgClick = !1, b.st.showCloseBtn = !1, b.st.enableEscapeKey = !1), b.bgOverlay || (b.bgOverlay = x("bg").on("click" + p, function() { b.close() }), b.wrap = x("wrap").attr("tabindex", -1).on("click" + p, function(a) { b._checkIfClose(a.target) && b.close() }), b.container = x("container", b.wrap)), b.contentContainer = x("content"), b.st.preloader && (b.preloader = x("preloader", b.container, b.st.tLoading));
            var i = a.magnificPopup.modules;
            for (e = 0; e < i.length; e++) {
                var j = i[e];
                j = j.charAt(0).toUpperCase() + j.slice(1), b["init" + j].call(b)
            }
            y("BeforeOpen"), b.st.showCloseBtn && (b.st.closeBtnInside ? (w(l, function(a, b, c, d) { c.close_replaceWith = z(d.type) }), f += " mfp-close-btn-in") : b.wrap.append(z())), b.st.alignTop && (f += " mfp-align-top"), b.fixedContentPos ? b.wrap.css({ overflow: b.st.overflowY, overflowX: "hidden", overflowY: b.st.overflowY }) : b.wrap.css({ top: v.scrollTop(), position: "absolute" }), (b.st.fixedBgPos === !1 || "auto" === b.st.fixedBgPos && !b.fixedContentPos) && b.bgOverlay.css({ height: d.height(), position: "absolute" }), b.st.enableEscapeKey && d.on("keyup" + p, function(a) { 27 === a.keyCode && b.close() }), v.on("resize" + p, function() { b.updateSize() }), b.st.closeOnContentClick || (f += " mfp-auto-cursor"), f && b.wrap.addClass(f);
            var k = b.wH = v.height(),
                n = {};
            if (b.fixedContentPos && b._hasScrollBar(k)) {
                var o = b._getScrollbarSize();
                o && (n.marginRight = o)
            }
            b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : n.overflow = "hidden");
            var r = b.st.mainClass;
            return b.isIE7 && (r += " mfp-ie7"), r && b._addClassToMFP(r), b.updateItemHTML(), y("BuildControls"), a("html").css(n), b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)), b._lastFocusedEl = document.activeElement, setTimeout(function() { b.content ? (b._addClassToMFP(q), b._setFocus()) : b.bgOverlay.addClass(q), d.on("focusin" + p, b._onFocusIn) }, 16), b.isOpen = !0, b.updateSize(k), y(m), c
        },
        close: function() { b.isOpen && (y(i), b.isOpen = !1, b.st.removalDelay && !b.isLowIE && b.supportsTransition ? (b._addClassToMFP(r), setTimeout(function() { b._close() }, b.st.removalDelay)) : b._close()) },
        _close: function() {
            y(h);
            var c = r + " " + q + " ";
            if (b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass && (c += b.st.mainClass + " "), b._removeClassFromMFP(c), b.fixedContentPos) {
                var e = { marginRight: "" };
                b.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e)
            }
            d.off("keyup" + p + " focusin" + p), b.ev.off(p), b.wrap.attr("class", "mfp-wrap").removeAttr("style"), b.bgOverlay.attr("class", "mfp-bg"), b.container.attr("class", "mfp-container"), !b.st.showCloseBtn || b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0 || b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach(), b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(), b.currItem = null, b.content = null, b.currTemplate = null, b.prevHeight = 0, y(j)
        },
        updateSize: function(a) {
            if (b.isIOS) {
                var c = document.documentElement.clientWidth / window.innerWidth,
                    d = window.innerHeight * c;
                b.wrap.css("height", d), b.wH = d
            } else b.wH = a || v.height();
            b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize")
        },
        updateItemHTML: function() {
            var c = b.items[b.index];
            b.contentContainer.detach(), b.content && b.content.detach(), c.parsed || (c = b.parseEl(b.index));
            var d = c.type;
            if (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]), b.currItem = c, !b.currTemplate[d]) {
                var f = b.st[d] ? b.st[d].markup : !1;
                y("FirstMarkupParse", f), f ? b.currTemplate[d] = a(f) : b.currTemplate[d] = !0
            }
            e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
            var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
            b.appendContent(g, d), c.preloaded = !0, y(n, c), e = c.type, b.container.prepend(b.contentContainer), y("AfterChange")
        },
        appendContent: function(a, c) { b.content = a, a ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0 ? b.content.find(".mfp-close").length || b.content.append(z()) : b.content = a : b.content = "", y(k), b.container.addClass("mfp-" + c + "-holder"), b.contentContainer.append(b.content) },
        parseEl: function(c) {
            var d, e = b.items[c];
            if (e.tagName ? e = { el: a(e) } : (d = e.type, e = { data: e, src: e.src }), e.el) {
                for (var f = b.types, g = 0; g < f.length; g++)
                    if (e.el.hasClass("mfp-" + f[g])) { d = f[g]; break }
                e.src = e.el.attr("data-mfp-src"), e.src || (e.src = e.el.attr("href"))
            }
            return e.type = d || b.st.type || "inline", e.index = c, e.parsed = !0, b.items[c] = e, y("ElementParse", e), b.items[c]
        },
        addGroup: function(a, c) {
            var d = function(d) { d.mfpEl = this, b._openClick(d, a, c) };
            c || (c = {});
            var e = "click.magnificPopup";
            c.mainEl = a, c.items ? (c.isObj = !0, a.off(e).on(e, d)) : (c.isObj = !1, c.delegate ? a.off(e).on(e, c.delegate, d) : (c.items = a, a.off(e).on(e, d)))
        },
        _openClick: function(c, d, e) {
            var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
            if (f || !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)) {
                var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
                if (g)
                    if (a.isFunction(g)) { if (!g.call(b)) return !0 } else if (v.width() < g) return !0;
                c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()), e.el = a(c.mfpEl), e.delegate && (e.items = d.find(e.delegate)), b.open(e)
            }
        },
        updateStatus: function(a, d) {
            if (b.preloader) {
                c !== a && b.container.removeClass("mfp-s-" + c), d || "loading" !== a || (d = b.st.tLoading);
                var e = { status: a, text: d };
                y("UpdateStatus", e), a = e.status, d = e.text, b.preloader.html(d), b.preloader.find("a").on("click", function(a) { a.stopImmediatePropagation() }), b.container.addClass("mfp-s-" + a), c = a
            }
        },
        _checkIfClose: function(c) {
            if (!a(c).hasClass(s)) {
                var d = b.st.closeOnContentClick,
                    e = b.st.closeOnBgClick;
                if (d && e) return !0;
                if (!b.content || a(c).hasClass("mfp-close") || b.preloader && c === b.preloader[0]) return !0;
                if (c === b.content[0] || a.contains(b.content[0], c)) { if (d) return !0 } else if (e && a.contains(document, c)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(a) { b.bgOverlay.addClass(a), b.wrap.addClass(a) },
        _removeClassFromMFP: function(a) { this.bgOverlay.removeClass(a), b.wrap.removeClass(a) },
        _hasScrollBar: function(a) { return (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height()) },
        _setFocus: function() {
            (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus()
        },
        _onFocusIn: function(c) { return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target) ? void 0 : (b._setFocus(), !1) },
        _parseMarkup: function(b, c, d) {
            var e;
            d.data && (c = a.extend(d.data, c)), y(l, [b, c, d]), a.each(c, function(c, d) { if (void 0 === d || d === !1) return !0; if (e = c.split("_"), e.length > 1) { var f = b.find(p + "-" + e[0]); if (f.length > 0) { var g = e[1]; "replaceWith" === g ? f[0] !== d[0] && f.replaceWith(d) : "img" === g ? f.is("img") ? f.attr("src", d) : f.replaceWith(a("<img>").attr("src", d).attr("class", f.attr("class"))) : f.attr(e[1], d) } } else b.find(p + "-" + c).html(d) })
        },
        _getScrollbarSize: function() {
            if (void 0 === b.scrollbarSize) {
                var a = document.createElement("div");
                a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), b.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a)
            }
            return b.scrollbarSize
        }
    }, a.magnificPopup = { instance: null, proto: t.prototype, modules: [], open: function(b, c) { return A(), b = b ? a.extend(!0, {}, b) : {}, b.isObj = !0, b.index = c || 0, this.instance.open(b) }, close: function() { return a.magnificPopup.instance && a.magnificPopup.instance.close() }, registerModule: function(b, c) { c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b) }, defaults: { disableOn: 0, key: null, midClick: !1, mainClass: "", preloader: !0, focus: "", closeOnContentClick: !1, closeOnBgClick: !0, closeBtnInside: !0, showCloseBtn: !0, enableEscapeKey: !0, modal: !1, alignTop: !1, removalDelay: 0, prependTo: null, fixedContentPos: "auto", fixedBgPos: "auto", overflowY: "auto", closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>', tClose: "Close (Esc)", tLoading: "Loading...", autoFocusLast: !0 } }, a.fn.magnificPopup = function(c) {
        A();
        var d = a(this);
        if ("string" == typeof c)
            if ("open" === c) {
                var e, f = u ? d.data("magnificPopup") : d[0].magnificPopup,
                    g = parseInt(arguments[1], 10) || 0;
                f.items ? e = f.items[g] : (e = d, f.delegate && (e = e.find(f.delegate)), e = e.eq(g)), b._openClick({ mfpEl: e }, d, f)
            } else b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
        else c = a.extend(!0, {}, c), u ? d.data("magnificPopup", c) : d[0].magnificPopup = c, b.addGroup(d, c);
        return d
    };
    var C, D, E, F = "inline",
        G = function() { E && (D.after(E.addClass(C)).detach(), E = null) };
    a.magnificPopup.registerModule(F, {
        options: { hiddenClass: "hide", markup: "", tNotFound: "Content not found" },
        proto: {
            initInline: function() { b.types.push(F), w(h + "." + F, function() { G() }) },
            getInline: function(c, d) {
                if (G(), c.src) {
                    var e = b.st.inline,
                        f = a(c.src);
                    if (f.length) {
                        var g = f[0].parentNode;
                        g && g.tagName && (D || (C = e.hiddenClass, D = x(C), C = "mfp-" + C), E = f.after(D).detach().removeClass(C)), b.updateStatus("ready")
                    } else b.updateStatus("error", e.tNotFound), f = a("<div>");
                    return c.inlineElement = f, f
                }
                return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d
            }
        }
    });
    var H, I = "ajax",
        J = function() { H && a(document.body).removeClass(H) },
        K = function() { J(), b.req && b.req.abort() };
    a.magnificPopup.registerModule(I, {
        options: { settings: null, cursor: "mfp-ajax-cur", tError: '<a href="%url%">The content</a> could not be loaded.' },
        proto: {
            initAjax: function() { b.types.push(I), H = b.st.ajax.cursor, w(h + "." + I, K), w("BeforeChange." + I, K) },
            getAjax: function(c) {
                H && a(document.body).addClass(H), b.updateStatus("loading");
                var d = a.extend({
                    url: c.src,
                    success: function(d, e, f) {
                        var g = { data: d, xhr: f };
                        y("ParseAjax", g), b.appendContent(a(g.data), I), c.finished = !0, J(), b._setFocus(), setTimeout(function() { b.wrap.addClass(q) }, 16), b.updateStatus("ready"), y("AjaxContentAdded")
                    },
                    error: function() { J(), c.finished = c.loadError = !0, b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src)) }
                }, b.st.ajax.settings);
                return b.req = a.ajax(d), ""
            }
        }
    });
    var L, M = function(c) { if (c.data && void 0 !== c.data.title) return c.data.title; var d = b.st.image.titleSrc; if (d) { if (a.isFunction(d)) return d.call(b, c); if (c.el) return c.el.attr(d) || "" } return "" };
    a.magnificPopup.registerModule("image", {
        options: { markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>', cursor: "mfp-zoom-out-cur", titleSrc: "title", verticalFit: !0, tError: '<a href="%url%">The image</a> could not be loaded.' },
        proto: {
            initImage: function() {
                var c = b.st.image,
                    d = ".image";
                b.types.push("image"), w(m + d, function() { "image" === b.currItem.type && c.cursor && a(document.body).addClass(c.cursor) }), w(h + d, function() { c.cursor && a(document.body).removeClass(c.cursor), v.off("resize" + p) }), w("Resize" + d, b.resizeImage), b.isLowIE && w("AfterChange", b.resizeImage)
            },
            resizeImage: function() {
                var a = b.currItem;
                if (a && a.img && b.st.image.verticalFit) {
                    var c = 0;
                    b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", b.wH - c)
                }
            },
            _onImageHasSize: function(a) { a.img && (a.hasSize = !0, L && clearInterval(L), a.isCheckingImgSize = !1, y("ImageHasSize", a), a.imgHidden && (b.content && b.content.removeClass("mfp-loading"), a.imgHidden = !1)) },
            findImageSize: function(a) {
                var c = 0,
                    d = a.img[0],
                    e = function(f) { L && clearInterval(L), L = setInterval(function() { return d.naturalWidth > 0 ? void b._onImageHasSize(a) : (c > 200 && clearInterval(L), c++, void(3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500))) }, f) };
                e(1)
            },
            getImage: function(c, d) {
                var e = 0,
                    f = function() { c && (c.img[0].complete ? (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("ready")), c.hasSize = !0, c.loaded = !0, y("ImageLoadComplete")) : (e++, 200 > e ? setTimeout(f, 100) : g())) },
                    g = function() { c && (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("error", h.tError.replace("%url%", c.src))), c.hasSize = !0, c.loaded = !0, c.loadError = !0) },
                    h = b.st.image,
                    i = d.find(".mfp-img");
                if (i.length) {
                    var j = document.createElement("img");
                    j.className = "mfp-img", c.el && c.el.find("img").length && (j.alt = c.el.find("img").attr("alt")), c.img = a(j).on("load.mfploader", f).on("error.mfploader", g), j.src = c.src, i.is("img") && (c.img = c.img.clone()), j = c.img[0], j.naturalWidth > 0 ? c.hasSize = !0 : j.width || (c.hasSize = !1)
                }
                return b._parseMarkup(d, { title: M(c), img_replaceWith: c.img }, c), b.resizeImage(), c.hasSize ? (L && clearInterval(L), c.loadError ? (d.addClass("mfp-loading"), b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"), b.updateStatus("ready")), d) : (b.updateStatus("loading"), c.loading = !0, c.hasSize || (c.imgHidden = !0, d.addClass("mfp-loading"), b.findImageSize(c)), d)
            }
        }
    });
    var N, O = function() { return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform), N };
    a.magnificPopup.registerModule("zoom", {
        options: { enabled: !1, easing: "ease-in-out", duration: 300, opener: function(a) { return a.is("img") ? a : a.find("img") } },
        proto: {
            initZoom: function() {
                var a, c = b.st.zoom,
                    d = ".zoom";
                if (c.enabled && b.supportsTransition) {
                    var e, f, g = c.duration,
                        j = function(a) {
                            var b = a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                d = "all " + c.duration / 1e3 + "s " + c.easing,
                                e = { position: "fixed", zIndex: 9999, left: 0, top: 0, "-webkit-backface-visibility": "hidden" },
                                f = "transition";
                            return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, b.css(e), b
                        },
                        k = function() { b.content.css("visibility", "visible") };
                    w("BuildControls" + d, function() {
                        if (b._allowZoom()) {
                            if (clearTimeout(e), b.content.css("visibility", "hidden"), a = b._getItemToZoom(), !a) return void k();
                            f = j(a), f.css(b._getOffset()), b.wrap.append(f), e = setTimeout(function() { f.css(b._getOffset(!0)), e = setTimeout(function() { k(), setTimeout(function() { f.remove(), a = f = null, y("ZoomAnimationEnded") }, 16) }, g) }, 16)
                        }
                    }), w(i + d, function() {
                        if (b._allowZoom()) {
                            if (clearTimeout(e), b.st.removalDelay = g, !a) {
                                if (a = b._getItemToZoom(), !a) return;
                                f = j(a)
                            }
                            f.css(b._getOffset(!0)), b.wrap.append(f), b.content.css("visibility", "hidden"), setTimeout(function() { f.css(b._getOffset()) }, 16)
                        }
                    }), w(h + d, function() { b._allowZoom() && (k(), f && f.remove(), a = null) })
                }
            },
            _allowZoom: function() { return "image" === b.currItem.type },
            _getItemToZoom: function() { return b.currItem.hasSize ? b.currItem.img : !1 },
            _getOffset: function(c) {
                var d;
                d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
                var e = d.offset(),
                    f = parseInt(d.css("padding-top"), 10),
                    g = parseInt(d.css("padding-bottom"), 10);
                e.top -= a(window).scrollTop() - f;
                var h = { width: d.width(), height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f };
                return O() ? h["-moz-transform"] = h.transform = "translate(" + e.left + "px," + e.top + "px)" : (h.left = e.left, h.top = e.top), h
            }
        }
    });
    var P = "iframe",
        Q = "//about:blank",
        R = function(a) {
            if (b.currTemplate[P]) {
                var c = b.currTemplate[P].find("iframe");
                c.length && (a || (c[0].src = Q), b.isIE8 && c.css("display", a ? "block" : "none"))
            }
        };
    a.magnificPopup.registerModule(P, {
        options: { markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>', srcAction: "iframe_src", patterns: { youtube: { index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1" }, vimeo: { index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1" }, gmaps: { index: "//maps.google.", src: "%id%&output=embed" } } },
        proto: {
            initIframe: function() { b.types.push(P), w("BeforeChange", function(a, b, c) { b !== c && (b === P ? R() : c === P && R(!0)) }), w(h + "." + P, function() { R() }) },
            getIframe: function(c, d) {
                var e = c.src,
                    f = b.st.iframe;
                a.each(f.patterns, function() { return e.indexOf(this.index) > -1 ? (this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)), e = this.src.replace("%id%", e), !1) : void 0 });
                var g = {};
                return f.srcAction && (g[f.srcAction] = e), b._parseMarkup(d, g, c), b.updateStatus("ready"), d
            }
        }
    });
    var S = function(a) { var c = b.items.length; return a > c - 1 ? a - c : 0 > a ? c + a : a },
        T = function(a, b, c) { return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c) };
    a.magnificPopup.registerModule("gallery", {
        options: { enabled: !1, arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', preload: [0, 2], navigateByImgClick: !0, arrows: !0, tPrev: "Previous (Left arrow key)", tNext: "Next (Right arrow key)", tCounter: "%curr% of %total%" },
        proto: {
            initGallery: function() {
                var c = b.st.gallery,
                    e = ".mfp-gallery";
                return b.direction = !0, c && c.enabled ? (f += " mfp-gallery", w(m + e, function() { c.navigateByImgClick && b.wrap.on("click" + e, ".mfp-img", function() { return b.items.length > 1 ? (b.next(), !1) : void 0 }), d.on("keydown" + e, function(a) { 37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next() }) }), w("UpdateStatus" + e, function(a, c) { c.text && (c.text = T(c.text, b.currItem.index, b.items.length)) }), w(l + e, function(a, d, e, f) {
                    var g = b.items.length;
                    e.counter = g > 1 ? T(c.tCounter, f.index, g) : ""
                }), w("BuildControls" + e, function() {
                    if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                        var d = c.arrowMarkup,
                            e = b.arrowLeft = a(d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(s),
                            f = b.arrowRight = a(d.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(s);
                        e.click(function() { b.prev() }), f.click(function() { b.next() }), b.container.append(e.add(f))
                    }
                }), w(n + e, function() { b._preloadTimeout && clearTimeout(b._preloadTimeout), b._preloadTimeout = setTimeout(function() { b.preloadNearbyImages(), b._preloadTimeout = null }, 16) }), void w(h + e, function() { d.off(e), b.wrap.off("click" + e), b.arrowRight = b.arrowLeft = null })) : !1
            },
            next: function() { b.direction = !0, b.index = S(b.index + 1), b.updateItemHTML() },
            prev: function() { b.direction = !1, b.index = S(b.index - 1), b.updateItemHTML() },
            goTo: function(a) { b.direction = a >= b.index, b.index = a, b.updateItemHTML() },
            preloadNearbyImages: function() {
                var a, c = b.st.gallery.preload,
                    d = Math.min(c[0], b.items.length),
                    e = Math.min(c[1], b.items.length);
                for (a = 1; a <= (b.direction ? e : d); a++) b._preloadItem(b.index + a);
                for (a = 1; a <= (b.direction ? d : e); a++) b._preloadItem(b.index - a)
            },
            _preloadItem: function(c) {
                if (c = S(c), !b.items[c].preloaded) {
                    var d = b.items[c];
                    d.parsed || (d = b.parseEl(c)), y("LazyLoad", d), "image" === d.type && (d.img = a('<img class="mfp-img" />').on("load.mfploader", function() { d.hasSize = !0 }).on("error.mfploader", function() { d.hasSize = !0, d.loadError = !0, y("LazyLoadError", d) }).attr("src", d.src)), d.preloaded = !0
                }
            }
        }
    });
    var U = "retina";
    a.magnificPopup.registerModule(U, {
        options: { replaceSrc: function(a) { return a.src.replace(/\.\w+$/, function(a) { return "@2x" + a }) }, ratio: 1 },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var a = b.st.retina,
                        c = a.ratio;
                    c = isNaN(c) ? c() : c, c > 1 && (w("ImageHasSize." + U, function(a, b) { b.img.css({ "max-width": b.img[0].naturalWidth / c, width: "100%" }) }), w("ElementParse." + U, function(b, d) { d.src = a.replaceSrc(d, c) }))
                }
            }
        }
    }), A()
});

/*====================================*/

/*  jQuery Nice Select - v1.0
    https://github.com/hernansartorio/jquery-nice-select
    Made by HernÃƒÆ’Ã‚Â¡n Sartorio  */
! function(e) {
    e.fn.niceSelect = function(t) {
        function s(t) {
            t.after(e("<div></div>").addClass("nice-select").addClass(t.attr("class") || "").addClass(t.attr("disabled") ? "disabled" : "").attr("tabindex", t.attr("disabled") ? null : "0").html('<span class="current"></span><ul class="list"></ul>'));
            var s = t.next(),
                n = t.find("option"),
                i = t.find("option:selected");
            s.find(".current").html(i.data("display") || i.text()), n.each(function(t) {
                var n = e(this),
                    i = n.data("display");
                s.find("ul").append(e("<li></li>").attr("data-value", n.val()).attr("data-display", i || null).addClass("option" + (n.is(":selected") ? " selected" : "") + (n.is(":disabled") ? " disabled" : "")).html(n.text()))
            })
        }
        if ("string" == typeof t) return "update" == t ? this.each(function() {
            var t = e(this),
                n = e(this).next(".nice-select"),
                i = n.hasClass("open");
            n.length && (n.remove(), s(t), i && t.next().trigger("click"))
        }) : "destroy" == t ? (this.each(function() {
            var t = e(this),
                s = e(this).next(".nice-select");
            s.length && (s.remove(), t.css("display", ""))
        }), 0 == e(".nice-select").length && e(document).off(".nice_select")) : console.log('Method "' + t + '" does not exist.'), this;
        this.hide(), this.each(function() {
            var t = e(this);
            t.next().hasClass("nice-select") || s(t)
        }), e(document).off(".nice_select"), e(document).on("click.nice_select", ".nice-select", function(t) {
            var s = e(this);
            e(".nice-select").not(s).removeClass("open"), s.toggleClass("open"), s.hasClass("open") ? (s.find(".option"), s.find(".focus").removeClass("focus"), s.find(".selected").addClass("focus")) : s.focus()
        }), e(document).on("click.nice_select", function(t) { 0 === e(t.target).closest(".nice-select").length && e(".nice-select").removeClass("open").find(".option") }), e(document).on("click.nice_select", ".nice-select .option:not(.disabled)", function(t) {
            var s = e(this),
                n = s.closest(".nice-select");
            n.find(".selected").removeClass("selected"), s.addClass("selected");
            var i = s.data("display") || s.text();
            n.find(".current").text(i), n.prev("select").val(s.data("value")).trigger("change")
        }), e(document).on("keydown.nice_select", ".nice-select", function(t) {
            var s = e(this),
                n = e(s.find(".focus") || s.find(".list .option.selected"));
            if (32 == t.keyCode || 13 == t.keyCode) return s.hasClass("open") ? n.trigger("click") : s.trigger("click"), !1;
            if (40 == t.keyCode) {
                if (s.hasClass("open")) {
                    var i = n.nextAll(".option:not(.disabled)").first();
                    i.length > 0 && (s.find(".focus").removeClass("focus"), i.addClass("focus"))
                } else s.trigger("click");
                return !1
            }
            if (38 == t.keyCode) {
                if (s.hasClass("open")) {
                    var l = n.prevAll(".option:not(.disabled)").first();
                    l.length > 0 && (s.find(".focus").removeClass("focus"), l.addClass("focus"))
                } else s.trigger("click");
                return !1
            }
            if (27 == t.keyCode) s.hasClass("open") && s.trigger("click");
            else if (9 == t.keyCode && s.hasClass("open")) return !1
        });
        var n = document.createElement("a").style;
        return n.cssText = "pointer-events:auto", "auto" !== n.pointerEvents && e("html").addClass("no-csspointerevents"), this
    }
}(jQuery);

/*====================================*/

/*! jQuery UI - v1.11.4 - 2015-12-03
 * http://jqueryui.com
 * Includes: core.js, widget.js, mouse.js, button.js, slider.js
 * Copyright jQuery Foundation and other contributors; Licensed MIT */

(function(e) { "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery) })(function(e) {
    function t(t, s) { var n, a, o, r = t.nodeName.toLowerCase(); return "area" === r ? (n = t.parentNode, a = n.name, t.href && a && "map" === n.nodeName.toLowerCase() ? (o = e("img[usemap='#" + a + "']")[0], !!o && i(o)) : !1) : (/^(input|select|textarea|button|object)$/.test(r) ? !t.disabled : "a" === r ? t.href || s : s) && i(t) }

    function i(t) { return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() { return "hidden" === e.css(this, "visibility") }).length }
    e.ui = e.ui || {}, e.extend(e.ui, { version: "1.11.4", keyCode: { BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38 } }), e.fn.extend({
        scrollParent: function(t) {
            var i = this.css("position"),
                s = "absolute" === i,
                n = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                a = this.parents().filter(function() { var t = e(this); return s && "static" === t.css("position") ? !1 : n.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x")) }).eq(0);
            return "fixed" !== i && a.length ? a : e(this[0].ownerDocument || document)
        },
        uniqueId: function() { var e = 0; return function() { return this.each(function() { this.id || (this.id = "ui-id-" + ++e) }) } }(),
        removeUniqueId: function() { return this.each(function() { /^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id") }) }
    }), e.extend(e.expr[":"], {
        data: e.expr.createPseudo ? e.expr.createPseudo(function(t) { return function(i) { return !!e.data(i, t) } }) : function(t, i, s) { return !!e.data(t, s[3]) },
        focusable: function(i) { return t(i, !isNaN(e.attr(i, "tabindex"))) },
        tabbable: function(i) {
            var s = e.attr(i, "tabindex"),
                n = isNaN(s);
            return (n || s >= 0) && t(i, !n)
        }
    }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(t, i) {
        function s(t, i, s, a) { return e.each(n, function() { i -= parseFloat(e.css(t, "padding" + this)) || 0, s && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), a && (i -= parseFloat(e.css(t, "margin" + this)) || 0) }), i }
        var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
            a = i.toLowerCase(),
            o = { innerWidth: e.fn.innerWidth, innerHeight: e.fn.innerHeight, outerWidth: e.fn.outerWidth, outerHeight: e.fn.outerHeight };
        e.fn["inner" + i] = function(t) { return void 0 === t ? o["inner" + i].call(this) : this.each(function() { e(this).css(a, s(this, t) + "px") }) }, e.fn["outer" + i] = function(t, n) { return "number" != typeof t ? o["outer" + i].call(this, t) : this.each(function() { e(this).css(a, s(this, t, !0, n) + "px") }) }
    }), e.fn.addBack || (e.fn.addBack = function(e) { return this.add(null == e ? this.prevObject : this.prevObject.filter(e)) }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) { return function(i) { return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this) } }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.fn.extend({
        focus: function(t) {
            return function(i, s) {
                return "number" == typeof i ? this.each(function() {
                    var t = this;
                    setTimeout(function() { e(t).focus(), s && s.call(t) }, i)
                }) : t.apply(this, arguments)
            }
        }(e.fn.focus),
        disableSelection: function() { var e = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown"; return function() { return this.bind(e + ".ui-disableSelection", function(e) { e.preventDefault() }) } }(),
        enableSelection: function() { return this.unbind(".ui-disableSelection") },
        zIndex: function(t) {
            if (void 0 !== t) return this.css("zIndex", t);
            if (this.length)
                for (var i, s, n = e(this[0]); n.length && n[0] !== document;) {
                    if (i = n.css("position"), ("absolute" === i || "relative" === i || "fixed" === i) && (s = parseInt(n.css("zIndex"), 10), !isNaN(s) && 0 !== s)) return s;
                    n = n.parent()
                }
            return 0
        }
    }), e.ui.plugin = {
        add: function(t, i, s) { var n, a = e.ui[t].prototype; for (n in s) a.plugins[n] = a.plugins[n] || [], a.plugins[n].push([i, s[n]]) },
        call: function(e, t, i, s) {
            var n, a = e.plugins[t];
            if (a && (s || e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType))
                for (n = 0; a.length > n; n++) e.options[a[n][0]] && a[n][1].apply(e.element, i)
        }
    };
    var s = 0,
        n = Array.prototype.slice;
    e.cleanData = function(t) {
        return function(i) {
            var s, n, a;
            for (a = 0; null != (n = i[a]); a++) try { s = e._data(n, "events"), s && s.remove && e(n).triggerHandler("remove") } catch (o) {}
            t(i)
        }
    }(e.cleanData), e.widget = function(t, i, s) {
        var n, a, o, r, h = {},
            l = t.split(".")[0];
        return t = t.split(".")[1], n = l + "-" + t, s || (s = i, i = e.Widget), e.expr[":"][n.toLowerCase()] = function(t) { return !!e.data(t, n) }, e[l] = e[l] || {}, a = e[l][t], o = e[l][t] = function(e, t) { return this._createWidget ? (arguments.length && this._createWidget(e, t), void 0) : new o(e, t) }, e.extend(o, a, { version: s.version, _proto: e.extend({}, s), _childConstructors: [] }), r = new i, r.options = e.widget.extend({}, r.options), e.each(s, function(t, s) {
            return e.isFunction(s) ? (h[t] = function() {
                var e = function() { return i.prototype[t].apply(this, arguments) },
                    n = function(e) { return i.prototype[t].apply(this, e) };
                return function() {
                    var t, i = this._super,
                        a = this._superApply;
                    return this._super = e, this._superApply = n, t = s.apply(this, arguments), this._super = i, this._superApply = a, t
                }
            }(), void 0) : (h[t] = s, void 0)
        }), o.prototype = e.widget.extend(r, { widgetEventPrefix: a ? r.widgetEventPrefix || t : t }, h, { constructor: o, namespace: l, widgetName: t, widgetFullName: n }), a ? (e.each(a._childConstructors, function(t, i) {
            var s = i.prototype;
            e.widget(s.namespace + "." + s.widgetName, o, i._proto)
        }), delete a._childConstructors) : i._childConstructors.push(o), e.widget.bridge(t, o), o
    }, e.widget.extend = function(t) {
        for (var i, s, a = n.call(arguments, 1), o = 0, r = a.length; r > o; o++)
            for (i in a[o]) s = a[o][i], a[o].hasOwnProperty(i) && void 0 !== s && (t[i] = e.isPlainObject(s) ? e.isPlainObject(t[i]) ? e.widget.extend({}, t[i], s) : e.widget.extend({}, s) : s);
        return t
    }, e.widget.bridge = function(t, i) {
        var s = i.prototype.widgetFullName || t;
        e.fn[t] = function(a) {
            var o = "string" == typeof a,
                r = n.call(arguments, 1),
                h = this;
            return o ? this.each(function() { var i, n = e.data(this, s); return "instance" === a ? (h = n, !1) : n ? e.isFunction(n[a]) && "_" !== a.charAt(0) ? (i = n[a].apply(n, r), i !== n && void 0 !== i ? (h = i && i.jquery ? h.pushStack(i.get()) : i, !1) : void 0) : e.error("no such method '" + a + "' for " + t + " widget instance") : e.error("cannot call methods on " + t + " prior to initialization; " + "attempted to call method '" + a + "'") }) : (r.length && (a = e.widget.extend.apply(null, [a].concat(r))), this.each(function() {
                var t = e.data(this, s);
                t ? (t.option(a || {}), t._init && t._init()) : e.data(this, s, new i(a, this))
            })), h
        }
    }, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: { disabled: !1, create: null },
        _createWidget: function(t, i) { i = e(i || this.defaultElement || this)[0], this.element = e(i), this.uuid = s++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = e(), this.hoverable = e(), this.focusable = e(), i !== this && (e.data(i, this.widgetFullName, this), this._on(!0, this.element, { remove: function(e) { e.target === i && this.destroy() } }), this.document = e(i.style ? i.ownerDocument : i.document || i), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init() },
        _getCreateOptions: e.noop,
        _getCreateEventData: e.noop,
        _create: e.noop,
        _init: e.noop,
        destroy: function() { this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus") },
        _destroy: e.noop,
        widget: function() { return this.element },
        option: function(t, i) {
            var s, n, a, o = t;
            if (0 === arguments.length) return e.widget.extend({}, this.options);
            if ("string" == typeof t)
                if (o = {}, s = t.split("."), t = s.shift(), s.length) {
                    for (n = o[t] = e.widget.extend({}, this.options[t]), a = 0; s.length - 1 > a; a++) n[s[a]] = n[s[a]] || {}, n = n[s[a]];
                    if (t = s.pop(), 1 === arguments.length) return void 0 === n[t] ? null : n[t];
                    n[t] = i
                } else {
                    if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
                    o[t] = i
                }
            return this._setOptions(o), this
        },
        _setOptions: function(e) { var t; for (t in e) this._setOption(t, e[t]); return this },
        _setOption: function(e, t) { return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!t), t && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this },
        enable: function() { return this._setOptions({ disabled: !1 }) },
        disable: function() { return this._setOptions({ disabled: !0 }) },
        _on: function(t, i, s) {
            var n, a = this;
            "boolean" != typeof t && (s = i, i = t, t = !1), s ? (i = n = e(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, n = this.widget()), e.each(s, function(s, o) {
                function r() { return t || a.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? a[o] : o).apply(a, arguments) : void 0 }
                "string" != typeof o && (r.guid = o.guid = o.guid || r.guid || e.guid++);
                var h = s.match(/^([\w:-]*)\s*(.*)$/),
                    l = h[1] + a.eventNamespace,
                    u = h[2];
                u ? n.delegate(u, l, r) : i.bind(l, r)
            })
        },
        _off: function(t, i) { i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(i).undelegate(i), this.bindings = e(this.bindings.not(t).get()), this.focusable = e(this.focusable.not(t).get()), this.hoverable = e(this.hoverable.not(t).get()) },
        _delay: function(e, t) {
            function i() { return ("string" == typeof e ? s[e] : e).apply(s, arguments) }
            var s = this;
            return setTimeout(i, t || 0)
        },
        _hoverable: function(t) { this.hoverable = this.hoverable.add(t), this._on(t, { mouseenter: function(t) { e(t.currentTarget).addClass("ui-state-hover") }, mouseleave: function(t) { e(t.currentTarget).removeClass("ui-state-hover") } }) },
        _focusable: function(t) { this.focusable = this.focusable.add(t), this._on(t, { focusin: function(t) { e(t.currentTarget).addClass("ui-state-focus") }, focusout: function(t) { e(t.currentTarget).removeClass("ui-state-focus") } }) },
        _trigger: function(t, i, s) {
            var n, a, o = this.options[t];
            if (s = s || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], a = i.originalEvent)
                for (n in a) n in i || (i[n] = a[n]);
            return this.element.trigger(i, s), !(e.isFunction(o) && o.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
        }
    }, e.each({ show: "fadeIn", hide: "fadeOut" }, function(t, i) {
        e.Widget.prototype["_" + t] = function(s, n, a) {
            "string" == typeof n && (n = { effect: n });
            var o, r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : t;
            n = n || {}, "number" == typeof n && (n = { duration: n }), o = !e.isEmptyObject(n), n.complete = a, n.delay && s.delay(n.delay), o && e.effects && e.effects.effect[r] ? s[t](n) : r !== t && s[r] ? s[r](n.duration, n.easing, a) : s.queue(function(i) { e(this)[t](), a && a.call(s[0]), i() })
        }
    }), e.widget;
    var a = !1;
    e(document).mouseup(function() { a = !1 }), e.widget("ui.mouse", {
        version: "1.11.4",
        options: { cancel: "input,textarea,button,select,option", distance: 1, delay: 0 },
        _mouseInit: function() {
            var t = this;
            this.element.bind("mousedown." + this.widgetName, function(e) { return t._mouseDown(e) }).bind("click." + this.widgetName, function(i) { return !0 === e.data(i.target, t.widgetName + ".preventClickEvent") ? (e.removeData(i.target, t.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0 }), this.started = !1
        },
        _mouseDestroy: function() { this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate) },
        _mouseDown: function(t) {
            if (!a) {
                this._mouseMoved = !1, this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
                var i = this,
                    s = 1 === t.which,
                    n = "string" == typeof this.options.cancel && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
                return s && !n && this._mouseCapture(t) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() { i.mouseDelayMet = !0 }, this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(t) !== !1, !this._mouseStarted) ? (t.preventDefault(), !0) : (!0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(e) { return i._mouseMove(e) }, this._mouseUpDelegate = function(e) { return i._mouseUp(e) }, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), a = !0, !0)) : !0
            }
        },
        _mouseMove: function(t) { if (this._mouseMoved) { if (e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button) return this._mouseUp(t); if (!t.which) return this._mouseUp(t) } return (t.which || t.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted) },
        _mouseUp: function(t) { return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), a = !1, !1 },
        _mouseDistanceMet: function(e) { return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance },
        _mouseDelayMet: function() { return this.mouseDelayMet },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() { return !0 }
    });
    var o, r = "ui-button ui-widget ui-state-default ui-corner-all",
        h = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
        l = function() {
            var t = e(this);
            setTimeout(function() { t.find(":ui-button").button("refresh") }, 1)
        },
        u = function(t) {
            var i = t.name,
                s = t.form,
                n = e([]);
            return i && (i = i.replace(/'/g, "\\'"), n = s ? e(s).find("[name='" + i + "'][type=radio]") : e("[name='" + i + "'][type=radio]", t.ownerDocument).filter(function() { return !this.form })), n
        };
    e.widget("ui.button", {
        version: "1.11.4",
        defaultElement: "<button>",
        options: { disabled: null, text: !0, label: null, icons: { primary: null, secondary: null } },
        _create: function() {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, l), "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
            var t = this,
                i = this.options,
                s = "checkbox" === this.type || "radio" === this.type,
                n = s ? "" : "ui-state-active";
            null === i.label && (i.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(r).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() { i.disabled || this === o && e(this).addClass("ui-state-active") }).bind("mouseleave" + this.eventNamespace, function() { i.disabled || e(this).removeClass(n) }).bind("click" + this.eventNamespace, function(e) { i.disabled && (e.preventDefault(), e.stopImmediatePropagation()) }), this._on({ focus: function() { this.buttonElement.addClass("ui-state-focus") }, blur: function() { this.buttonElement.removeClass("ui-state-focus") } }), s && this.element.bind("change" + this.eventNamespace, function() { t.refresh() }), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() { return i.disabled ? !1 : void 0 }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                if (i.disabled) return !1;
                e(this).addClass("ui-state-active"), t.buttonElement.attr("aria-pressed", "true");
                var s = t.element[0];
                u(s).not(s).map(function() { return e(this).button("widget")[0] }).removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function() { return i.disabled ? !1 : (e(this).addClass("ui-state-active"), o = this, t.document.one("mouseup", function() { o = null }), void 0) }).bind("mouseup" + this.eventNamespace, function() { return i.disabled ? !1 : (e(this).removeClass("ui-state-active"), void 0) }).bind("keydown" + this.eventNamespace, function(t) { return i.disabled ? !1 : ((t.keyCode === e.ui.keyCode.SPACE || t.keyCode === e.ui.keyCode.ENTER) && e(this).addClass("ui-state-active"), void 0) }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() { e(this).removeClass("ui-state-active") }), this.buttonElement.is("a") && this.buttonElement.keyup(function(t) { t.keyCode === e.ui.keyCode.SPACE && e(this).click() })), this._setOption("disabled", i.disabled), this._resetButton()
        },
        _determineButtonType: function() {
            var e, t, i;
            this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button", "checkbox" === this.type || "radio" === this.type ? (e = this.element.parents().last(), t = "label[for='" + this.element.attr("id") + "']", this.buttonElement = e.find(t), this.buttonElement.length || (e = e.length ? e.siblings() : this.element.siblings(), this.buttonElement = e.filter(t), this.buttonElement.length || (this.buttonElement = e.find(t))), this.element.addClass("ui-helper-hidden-accessible"), i = this.element.is(":checked"), i && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", i)) : this.buttonElement = this.element
        },
        widget: function() { return this.buttonElement },
        _destroy: function() { this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(r + " ui-state-active " + h).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title") },
        _setOption: function(e, t) { return this._super(e, t), "disabled" === e ? (this.widget().toggleClass("ui-state-disabled", !!t), this.element.prop("disabled", !!t), t && ("checkbox" === this.type || "radio" === this.type ? this.buttonElement.removeClass("ui-state-focus") : this.buttonElement.removeClass("ui-state-focus ui-state-active")), void 0) : (this._resetButton(), void 0) },
        refresh: function() {
            var t = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            t !== this.options.disabled && this._setOption("disabled", t), "radio" === this.type ? u(this.element[0]).each(function() { e(this).is(":checked") ? e(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false") }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
        },
        _resetButton: function() {
            if ("input" === this.type) return this.options.label && this.element.val(this.options.label), void 0;
            var t = this.buttonElement.removeClass(h),
                i = e("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(),
                s = this.options.icons,
                n = s.primary && s.secondary,
                a = [];
            s.primary || s.secondary ? (this.options.text && a.push("ui-button-text-icon" + (n ? "s" : s.primary ? "-primary" : "-secondary")), s.primary && t.prepend("<span class='ui-button-icon-primary ui-icon " + s.primary + "'></span>"), s.secondary && t.append("<span class='ui-button-icon-secondary ui-icon " + s.secondary + "'></span>"), this.options.text || (a.push(n ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || t.attr("title", e.trim(i)))) : a.push("ui-button-text-only"), t.addClass(a.join(" "))
        }
    }), e.widget("ui.buttonset", {
        version: "1.11.4",
        options: { items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)" },
        _create: function() { this.element.addClass("ui-buttonset") },
        _init: function() { this.refresh() },
        _setOption: function(e, t) { "disabled" === e && this.buttons.button("option", e, t), this._super(e, t) },
        refresh: function() {
            var t = "rtl" === this.element.css("direction"),
                i = this.element.find(this.options.items),
                s = i.filter(":ui-button");
            i.not(":ui-button").button(), s.button("refresh"), this.buttons = i.map(function() { return e(this).button("widget")[0] }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(t ? "ui-corner-left" : "ui-corner-right").end().end()
        },
        _destroy: function() { this.element.removeClass("ui-buttonset"), this.buttons.map(function() { return e(this).button("widget")[0] }).removeClass("ui-corner-left ui-corner-right").end().button("destroy") }
    }), e.ui.button, e.widget("ui.slider", e.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "slide",
        options: { animate: !1, distance: 0, max: 100, min: 0, orientation: "horizontal", range: !1, step: 1, value: 0, values: null, change: null, slide: null, start: null, stop: null },
        numPages: 5,
        _create: function() { this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1 },
        _refresh: function() { this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue() },
        _createHandles: function() {
            var t, i, s = this.options,
                n = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                a = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",
                o = [];
            for (i = s.values && s.values.length || 1, n.length > i && (n.slice(i).remove(), n = n.slice(0, i)), t = n.length; i > t; t++) o.push(a);
            this.handles = n.add(e(o.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function(t) { e(this).data("ui-slider-handle-index", t) })
        },
        _createRange: function() {
            var t = this.options,
                i = "";
            t.range ? (t.range === !0 && (t.values ? t.values.length && 2 !== t.values.length ? t.values = [t.values[0], t.values[0]] : e.isArray(t.values) && (t.values = t.values.slice(0)) : t.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({ left: "", bottom: "" }) : (this.range = e("<div></div>").appendTo(this.element), i = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(i + ("min" === t.range || "max" === t.range ? " ui-slider-range-" + t.range : ""))) : (this.range && this.range.remove(), this.range = null)
        },
        _setupEvents: function() { this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles) },
        _destroy: function() { this.handles.remove(), this.range && this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy() },
        _mouseCapture: function(t) {
            var i, s, n, a, o, r, h, l, u = this,
                d = this.options;
            return d.disabled ? !1 : (this.elementSize = { width: this.element.outerWidth(), height: this.element.outerHeight() }, this.elementOffset = this.element.offset(), i = { x: t.pageX, y: t.pageY }, s = this._normValueFromMouse(i), n = this._valueMax() - this._valueMin() + 1, this.handles.each(function(t) {
                var i = Math.abs(s - u.values(t));
                (n > i || n === i && (t === u._lastChangedValue || u.values(t) === d.min)) && (n = i, a = e(this), o = t)
            }), r = this._start(t, o), r === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = o, a.addClass("ui-state-active").focus(), h = a.offset(), l = !e(t.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = l ? { left: 0, top: 0 } : { left: t.pageX - h.left - a.width() / 2, top: t.pageY - h.top - a.height() / 2 - (parseInt(a.css("borderTopWidth"), 10) || 0) - (parseInt(a.css("borderBottomWidth"), 10) || 0) + (parseInt(a.css("marginTop"), 10) || 0) }, this.handles.hasClass("ui-state-hover") || this._slide(t, o, s), this._animateOff = !0, !0))
        },
        _mouseStart: function() { return !0 },
        _mouseDrag: function(e) {
            var t = { x: e.pageX, y: e.pageY },
                i = this._normValueFromMouse(t);
            return this._slide(e, this._handleIndex, i), !1
        },
        _mouseStop: function(e) { return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(e, this._handleIndex), this._change(e, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1 },
        _detectOrientation: function() { this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal" },
        _normValueFromMouse: function(e) { var t, i, s, n, a; return "horizontal" === this.orientation ? (t = this.elementSize.width, i = e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (t = this.elementSize.height, i = e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), s = i / t, s > 1 && (s = 1), 0 > s && (s = 0), "vertical" === this.orientation && (s = 1 - s), n = this._valueMax() - this._valueMin(), a = this._valueMin() + s * n, this._trimAlignValue(a) },
        _start: function(e, t) { var i = { handle: this.handles[t], value: this.value() }; return this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("start", e, i) },
        _slide: function(e, t, i) {
            var s, n, a;
            this.options.values && this.options.values.length ? (s = this.values(t ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === t && i > s || 1 === t && s > i) && (i = s), i !== this.values(t) && (n = this.values(), n[t] = i, a = this._trigger("slide", e, { handle: this.handles[t], value: i, values: n }), s = this.values(t ? 0 : 1), a !== !1 && this.values(t, i))) : i !== this.value() && (a = this._trigger("slide", e, { handle: this.handles[t], value: i }), a !== !1 && this.value(i))
        },
        _stop: function(e, t) {
            var i = { handle: this.handles[t], value: this.value() };
            this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("stop", e, i)
        },
        _change: function(e, t) {
            if (!this._keySliding && !this._mouseSliding) {
                var i = { handle: this.handles[t], value: this.value() };
                this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._lastChangedValue = t, this._trigger("change", e, i)
            }
        },
        value: function(e) { return arguments.length ? (this.options.value = this._trimAlignValue(e), this._refreshValue(), this._change(null, 0), void 0) : this._value() },
        values: function(t, i) {
            var s, n, a;
            if (arguments.length > 1) return this.options.values[t] = this._trimAlignValue(i), this._refreshValue(), this._change(null, t), void 0;
            if (!arguments.length) return this._values();
            if (!e.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(t) : this.value();
            for (s = this.options.values, n = arguments[0], a = 0; s.length > a; a += 1) s[a] = this._trimAlignValue(n[a]), this._change(null, a);
            this._refreshValue()
        },
        _setOption: function(t, i) {
            var s, n = 0;
            switch ("range" === t && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), e.isArray(this.options.values) && (n = this.options.values.length), "disabled" === t && this.element.toggleClass("ui-state-disabled", !!i), this._super(t, i), t) {
                case "orientation":
                    this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue(), this.handles.css("horizontal" === i ? "bottom" : "left", "");
                    break;
                case "value":
                    this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                    break;
                case "values":
                    for (this._animateOff = !0, this._refreshValue(), s = 0; n > s; s += 1) this._change(null, s);
                    this._animateOff = !1;
                    break;
                case "step":
                case "min":
                case "max":
                    this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;
                    break;
                case "range":
                    this._animateOff = !0, this._refresh(), this._animateOff = !1
            }
        },
        _value: function() { var e = this.options.value; return e = this._trimAlignValue(e) },
        _values: function(e) { var t, i, s; if (arguments.length) return t = this.options.values[e], t = this._trimAlignValue(t); if (this.options.values && this.options.values.length) { for (i = this.options.values.slice(), s = 0; i.length > s; s += 1) i[s] = this._trimAlignValue(i[s]); return i } return [] },
        _trimAlignValue: function(e) {
            if (this._valueMin() >= e) return this._valueMin();
            if (e >= this._valueMax()) return this._valueMax();
            var t = this.options.step > 0 ? this.options.step : 1,
                i = (e - this._valueMin()) % t,
                s = e - i;
            return 2 * Math.abs(i) >= t && (s += i > 0 ? t : -t), parseFloat(s.toFixed(5))
        },
        _calculateNewMax: function() {
            var e = this.options.max,
                t = this._valueMin(),
                i = this.options.step,
                s = Math.floor(+(e - t).toFixed(this._precision()) / i) * i;
            e = s + t, this.max = parseFloat(e.toFixed(this._precision()))
        },
        _precision: function() { var e = this._precisionOf(this.options.step); return null !== this.options.min && (e = Math.max(e, this._precisionOf(this.options.min))), e },
        _precisionOf: function(e) {
            var t = "" + e,
                i = t.indexOf(".");
            return -1 === i ? 0 : t.length - i - 1
        },
        _valueMin: function() { return this.options.min },
        _valueMax: function() { return this.max },
        _refreshValue: function() {
            var t, i, s, n, a, o = this.options.range,
                r = this.options,
                h = this,
                l = this._animateOff ? !1 : r.animate,
                u = {};
            this.options.values && this.options.values.length ? this.handles.each(function(s) { i = 100 * ((h.values(s) - h._valueMin()) / (h._valueMax() - h._valueMin())), u["horizontal" === h.orientation ? "left" : "bottom"] = i + "%", e(this).stop(1, 1)[l ? "animate" : "css"](u, r.animate), h.options.range === !0 && ("horizontal" === h.orientation ? (0 === s && h.range.stop(1, 1)[l ? "animate" : "css"]({ left: i + "%" }, r.animate), 1 === s && h.range[l ? "animate" : "css"]({ width: i - t + "%" }, { queue: !1, duration: r.animate })) : (0 === s && h.range.stop(1, 1)[l ? "animate" : "css"]({ bottom: i + "%" }, r.animate), 1 === s && h.range[l ? "animate" : "css"]({ height: i - t + "%" }, { queue: !1, duration: r.animate }))), t = i }) : (s = this.value(), n = this._valueMin(), a = this._valueMax(), i = a !== n ? 100 * ((s - n) / (a - n)) : 0, u["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[l ? "animate" : "css"](u, r.animate), "min" === o && "horizontal" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({ width: i + "%" }, r.animate), "max" === o && "horizontal" === this.orientation && this.range[l ? "animate" : "css"]({ width: 100 - i + "%" }, { queue: !1, duration: r.animate }), "min" === o && "vertical" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({ height: i + "%" }, r.animate), "max" === o && "vertical" === this.orientation && this.range[l ? "animate" : "css"]({ height: 100 - i + "%" }, { queue: !1, duration: r.animate }))
        },
        _handleEvents: {
            keydown: function(t) {
                var i, s, n, a, o = e(t.target).data("ui-slider-handle-index");
                switch (t.keyCode) {
                    case e.ui.keyCode.HOME:
                    case e.ui.keyCode.END:
                    case e.ui.keyCode.PAGE_UP:
                    case e.ui.keyCode.PAGE_DOWN:
                    case e.ui.keyCode.UP:
                    case e.ui.keyCode.RIGHT:
                    case e.ui.keyCode.DOWN:
                    case e.ui.keyCode.LEFT:
                        if (t.preventDefault(), !this._keySliding && (this._keySliding = !0, e(t.target).addClass("ui-state-active"), i = this._start(t, o), i === !1)) return
                }
                switch (a = this.options.step, s = n = this.options.values && this.options.values.length ? this.values(o) : this.value(), t.keyCode) {
                    case e.ui.keyCode.HOME:
                        n = this._valueMin();
                        break;
                    case e.ui.keyCode.END:
                        n = this._valueMax();
                        break;
                    case e.ui.keyCode.PAGE_UP:
                        n = this._trimAlignValue(s + (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case e.ui.keyCode.PAGE_DOWN:
                        n = this._trimAlignValue(s - (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case e.ui.keyCode.UP:
                    case e.ui.keyCode.RIGHT:
                        if (s === this._valueMax()) return;
                        n = this._trimAlignValue(s + a);
                        break;
                    case e.ui.keyCode.DOWN:
                    case e.ui.keyCode.LEFT:
                        if (s === this._valueMin()) return;
                        n = this._trimAlignValue(s - a)
                }
                this._slide(t, o, n)
            },
            keyup: function(t) {
                var i = e(t.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1, this._stop(t, i), this._change(t, i), e(t.target).removeClass("ui-state-active"))
            }
        }
    })
});







/*====================================*/

/*================================================================================
 * @name: bPopup - if you can't get it up, use bPopup
 * @author: (c)Bjoern Klinggaard (twitter@bklinggaard)
 * @demo: http://dinbror.dk/bpopup
 * @version: 0.11.0.min
 ================================================================================*/
(function(c) {
    c.fn.bPopup = function(A, E) {
        function L() {
            a.contentContainer = c(a.contentContainer || b);
            switch (a.content) {
                case "iframe":
                    var d = c('<iframe class="b-iframe" ' + a.iframeAttr + "></iframe>");
                    d.appendTo(a.contentContainer);
                    t = b.outerHeight(!0);
                    u = b.outerWidth(!0);
                    B();
                    d.attr("src", a.loadUrl);
                    l(a.loadCallback);
                    break;
                case "image":
                    B();
                    c("<img />").load(function() {
                        l(a.loadCallback);
                        F(c(this))
                    }).attr("src", a.loadUrl).hide().appendTo(a.contentContainer);
                    break;
                default:
                    B(), c('<div class="b-ajax-wrapper"></div>').load(a.loadUrl, a.loadData, function(d, b, e) {
                        l(a.loadCallback, b);
                        F(c(this))
                    }).hide().appendTo(a.contentContainer)
            }
        }

        function B() {
            a.modal && c('<div class="b-modal ' + e + '"></div>').css({ backgroundColor: a.modalColor, position: "fixed", top: 0, right: 0, bottom: 0, left: 0, opacity: 0, zIndex: a.zIndex + v }).appendTo(a.appendTo).fadeTo(a.speed, a.opacity);
            C();
            b.data("bPopup", a).data("id", e).css({ left: "slideIn" == a.transition || "slideBack" == a.transition ? "slideBack" == a.transition ? f.scrollLeft() + w : -1 * (x + u) : m(!(!a.follow[0] && n || g)), position: a.positionStyle || "absolute", top: "slideDown" == a.transition || "slideUp" == a.transition ? "slideUp" == a.transition ? f.scrollTop() + y : z + -1 * t : p(!(!a.follow[1] && q || g)), "z-index": a.zIndex + v + 1 }).each(function() { a.appending && c(this).appendTo(a.appendTo) });
            G(!0)
        }

        function r() {
            a.modal && c(".b-modal." + b.data("id")).fadeTo(a.speed, 0, function() { c(this).remove() });
            a.scrollBar || c("html").css("overflow", "auto");
            c(".b-modal." + e).unbind("click");
            f.unbind("keydown." + e);
            k.unbind("." + e).data("bPopup", 0 < k.data("bPopup") - 1 ? k.data("bPopup") - 1 : null);
            b.undelegate(".bClose, ." + a.closeClass, "click." + e, r).data("bPopup", null);
            clearTimeout(H);
            G();
            return !1
        }

        function I(d) {
            y = k.height();
            w = k.width();
            h = D();
            if (h.x || h.y) clearTimeout(J), J = setTimeout(function() {
                C();
                d = d || a.followSpeed;
                var e = {};
                h.x && (e.left = a.follow[0] ? m(!0) : "auto");
                h.y && (e.top = a.follow[1] ? p(!0) : "auto");
                b.dequeue().each(function() { g ? c(this).css({ left: x, top: z }) : c(this).animate(e, d, a.followEasing) })
            }, 50)
        }

        function F(d) {
            var c = d.width(),
                e = d.height(),
                f = {};
            a.contentContainer.css({ height: e, width: c });
            e >= b.height() && (f.height = b.height());
            c >= b.width() && (f.width = b.width());
            t = b.outerHeight(!0);
            u = b.outerWidth(!0);
            C();
            a.contentContainer.css({ height: "auto", width: "auto" });
            f.left = m(!(!a.follow[0] && n || g));
            f.top = p(!(!a.follow[1] && q || g));
            b.animate(f, 250, function() {
                d.show();
                h = D()
            })
        }

        function M() {
            k.data("bPopup", v);
            b.delegate(".bClose, ." + a.closeClass, "click." + e, r);
            a.modalClose && c(".b-modal." + e).css("cursor", "pointer").bind("click", r);
            N || !a.follow[0] && !a.follow[1] || k.bind("scroll." + e, function() {
                if (h.x || h.y) {
                    var d = {};
                    h.x && (d.left = a.follow[0] ? m(!g) : "auto");
                    h.y && (d.top = a.follow[1] ? p(!g) : "auto");
                    b.dequeue().animate(d, a.followSpeed, a.followEasing)
                }
            }).bind("resize." + e, function() { I() });
            a.escClose && f.bind("keydown." + e, function(a) { 27 == a.which && r() })
        }

        function G(d) {
            function c(e) { b.css({ display: "block", opacity: 1 }).animate(e, a.speed, a.easing, function() { K(d) }) }
            switch (d ? a.transition : a.transitionClose || a.transition) {
                case "slideIn":
                    c({ left: d ? m(!(!a.follow[0] && n || g)) : f.scrollLeft() - (u || b.outerWidth(!0)) - 200 });
                    break;
                case "slideBack":
                    c({ left: d ? m(!(!a.follow[0] && n || g)) : f.scrollLeft() + w + 200 });
                    break;
                case "slideDown":
                    c({ top: d ? p(!(!a.follow[1] && q || g)) : f.scrollTop() - (t || b.outerHeight(!0)) - 200 });
                    break;
                case "slideUp":
                    c({ top: d ? p(!(!a.follow[1] && q || g)) : f.scrollTop() + y + 200 });
                    break;
                default:
                    b.stop().fadeTo(a.speed, d ? 1 : 0, function() { K(d) })
            }
        }

        function K(d) { d ? (M(), l(E), a.autoClose && (H = setTimeout(r, a.autoClose))) : (b.hide(), l(a.onClose), a.loadUrl && (a.contentContainer.empty(), b.css({ height: "auto", width: "auto" }))) }

        function m(a) { return a ? x + f.scrollLeft() : x }

        function p(a) { return a ? z + f.scrollTop() : z }

        function l(a, e) { c.isFunction(a) && a.call(b, e) }

        function C() {
            z = q ? a.position[1] : Math.max(0, (y - b.outerHeight(!0)) / 2 - a.amsl);
            x = n ? a.position[0] : (w - b.outerWidth(!0)) / 2;
            h = D()
        }

        function D() { return { x: w > b.outerWidth(!0), y: y > b.outerHeight(!0) } }
        c.isFunction(A) && (E = A, A = null);
        var a = c.extend({}, c.fn.bPopup.defaults, A);
        a.scrollBar || c("html").css("overflow", "hidden");
        var b = this,
            f = c(document),
            k = c(window),
            y = k.height(),
            w = k.width(),
            N = /OS 6(_\d)+/i.test(navigator.userAgent),
            v = 0,
            e, h, q, n, g, z, x, t, u, J, H;
        b.close = function() { r() };
        b.reposition = function(a) { I(a) };
        return b.each(function() { c(this).data("bPopup") || (l(a.onOpen), v = (k.data("bPopup") || 0) + 1, e = "__b-popup" + v + "__", q = "auto" !== a.position[1], n = "auto" !== a.position[0], g = "fixed" === a.positionStyle, t = b.outerHeight(!0), u = b.outerWidth(!0), a.loadUrl ? L() : B()) })
    };
    c.fn.bPopup.defaults = { amsl: 50, appending: !0, appendTo: "body", autoClose: !1, closeClass: "b-close", content: "ajax", contentContainer: !1, easing: "swing", escClose: !0, follow: [!0, !0], followEasing: "swing", followSpeed: 500, iframeAttr: 'scrolling="no" frameborder="0"', loadCallback: !1, loadData: !1, loadUrl: !1, modal: !0, modalClose: !0, modalColor: "#000", onClose: !1, onOpen: !1, opacity: .7, position: ["auto", "auto"], positionStyle: "absolute", scrollBar: !0, speed: 250, transition: "fadeIn", transitionClose: !1, zIndex: 9997 }
})(jQuery);

/*====================================*/



/*====================================*/

(function(factory) { "use strict"; if (typeof define === "function" && define.amd) { define(["jquery"], factory) } else if (typeof exports !== "undefined") { module.exports = factory(require("jquery")) } else { factory(jQuery) } })(function($) {
    "use strict";
    var Slick = window.Slick || {};
    Slick = function() {
        var instanceUid = 0;

        function Slick(element, settings) {
            var _ = this,
                dataSettings;
            _.defaults = { accessibility: true, adaptiveHeight: false, appendArrows: $(element), appendDots: $(element), arrows: true, asNavFor: null, prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>', nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>', autoplay: false, autoplaySpeed: 3e3, centerMode: false, centerPadding: "50px", cssEase: "ease", customPaging: function(slider, i) { return $('<button type="button" />').text(i + 1) }, dots: false, dotsClass: "slick-dots", draggable: true, easing: "linear", edgeFriction: .35, fade: false, focusOnSelect: false, focusOnChange: false, infinite: true, initialSlide: 0, lazyLoad: "ondemand", mobileFirst: false, pauseOnHover: true, pauseOnFocus: true, pauseOnDotsHover: false, respondTo: "window", responsive: null, rows: 1, rtl: false, slide: "", slidesPerRow: 1, slidesToShow: 1, slidesToScroll: 1, speed: 500, swipe: true, swipeToSlide: false, touchMove: true, touchThreshold: 5, useCSS: true, useTransform: true, variableWidth: false, vertical: false, verticalSwiping: false, waitForAnimate: true, zIndex: 1e3 };
            _.initials = { animating: false, dragging: false, autoPlayTimer: null, currentDirection: 0, currentLeft: null, currentSlide: 0, direction: 1, $dots: null, listWidth: null, listHeight: null, loadIndex: 0, $nextArrow: null, $prevArrow: null, scrolling: false, slideCount: null, slideWidth: null, $slideTrack: null, $slides: null, sliding: false, slideOffset: 0, swipeLeft: null, swiping: false, $list: null, touchObject: {}, transformsEnabled: false, unslicked: false };
            $.extend(_, _.initials);
            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = "hidden";
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = "visibilitychange";
            _.windowWidth = 0;
            _.windowTimer = null;
            dataSettings = $(element).data("slick") || {};
            _.options = $.extend({}, _.defaults, settings, dataSettings);
            _.currentSlide = _.options.initialSlide;
            _.originalSettings = _.options;
            if (typeof document.mozHidden !== "undefined") {
                _.hidden = "mozHidden";
                _.visibilityChange = "mozvisibilitychange"
            } else if (typeof document.webkitHidden !== "undefined") {
                _.hidden = "webkitHidden";
                _.visibilityChange = "webkitvisibilitychange"
            }
            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);
            _.instanceUid = instanceUid++;
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
            _.registerBreakpoints();
            _.init(true)
        }
        return Slick
    }();
    Slick.prototype.activateADA = function() {
        var _ = this;
        _.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" })
    };
    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {
        var _ = this;
        if (typeof index === "boolean") {
            addBefore = index;
            index = null
        } else if (index < 0 || index >= _.slideCount) { return false }
        _.unload();
        if (typeof index === "number") { if (index === 0 && _.$slides.length === 0) { $(markup).appendTo(_.$slideTrack) } else if (addBefore) { $(markup).insertBefore(_.$slides.eq(index)) } else { $(markup).insertAfter(_.$slides.eq(index)) } } else { if (addBefore === true) { $(markup).prependTo(_.$slideTrack) } else { $(markup).appendTo(_.$slideTrack) } }
        _.$slides = _.$slideTrack.children(this.options.slide);
        _.$slideTrack.children(this.options.slide).detach();
        _.$slideTrack.append(_.$slides);
        _.$slides.each(function(index, element) { $(element).attr("data-slick-index", index) });
        _.$slidesCache = _.$slides;
        _.reinit()
    };
    Slick.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({ height: targetHeight }, _.options.speed)
        }
    };
    Slick.prototype.animateSlide = function(targetLeft, callback) {
        var animProps = {},
            _ = this;
        _.animateHeight();
        if (_.options.rtl === true && _.options.vertical === false) { targetLeft = -targetLeft }
        if (_.transformsEnabled === false) { if (_.options.vertical === false) { _.$slideTrack.animate({ left: targetLeft }, _.options.speed, _.options.easing, callback) } else { _.$slideTrack.animate({ top: targetLeft }, _.options.speed, _.options.easing, callback) } } else {
            if (_.cssTransitions === false) {
                if (_.options.rtl === true) { _.currentLeft = -_.currentLeft }
                $({ animStart: _.currentLeft }).animate({ animStart: targetLeft }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = "translate(" + now + "px, 0px)";
                            _.$slideTrack.css(animProps)
                        } else {
                            animProps[_.animType] = "translate(0px," + now + "px)";
                            _.$slideTrack.css(animProps)
                        }
                    },
                    complete: function() { if (callback) { callback.call() } }
                })
            } else {
                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);
                if (_.options.vertical === false) { animProps[_.animType] = "translate3d(" + targetLeft + "px, 0px, 0px)" } else { animProps[_.animType] = "translate3d(0px," + targetLeft + "px, 0px)" }
                _.$slideTrack.css(animProps);
                if (callback) {
                    setTimeout(function() {
                        _.disableTransition();
                        callback.call()
                    }, _.options.speed)
                }
            }
        }
    };
    Slick.prototype.getNavTarget = function() {
        var _ = this,
            asNavFor = _.options.asNavFor;
        if (asNavFor && asNavFor !== null) { asNavFor = $(asNavFor).not(_.$slider) }
        return asNavFor
    };
    Slick.prototype.asNavFor = function(index) {
        var _ = this,
            asNavFor = _.getNavTarget();
        if (asNavFor !== null && typeof asNavFor === "object") { asNavFor.each(function() { var target = $(this).slick("getSlick"); if (!target.unslicked) { target.slideHandler(index, true) } }) }
    };
    Slick.prototype.applyTransition = function(slide) {
        var _ = this,
            transition = {};
        if (_.options.fade === false) { transition[_.transitionType] = _.transformType + " " + _.options.speed + "ms " + _.options.cssEase } else { transition[_.transitionType] = "opacity " + _.options.speed + "ms " + _.options.cssEase }
        if (_.options.fade === false) { _.$slideTrack.css(transition) } else { _.$slides.eq(slide).css(transition) }
    };
    Slick.prototype.autoPlay = function() {
        var _ = this;
        _.autoPlayClear();
        if (_.slideCount > _.options.slidesToShow) { _.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed) }
    };
    Slick.prototype.autoPlayClear = function() { var _ = this; if (_.autoPlayTimer) { clearInterval(_.autoPlayTimer) } };
    Slick.prototype.autoPlayIterator = function() {
        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;
        if (!_.paused && !_.interrupted && !_.focussed) {
            if (_.options.infinite === false) { if (_.direction === 1 && _.currentSlide + 1 === _.slideCount - 1) { _.direction = 0 } else if (_.direction === 0) { slideTo = _.currentSlide - _.options.slidesToScroll; if (_.currentSlide - 1 === 0) { _.direction = 1 } } }
            _.slideHandler(slideTo)
        }
    };
    Slick.prototype.buildArrows = function() {
        var _ = this;
        if (_.options.arrows === true) {
            _.$prevArrow = $(_.options.prevArrow).addClass("slick-arrow");
            _.$nextArrow = $(_.options.nextArrow).addClass("slick-arrow");
            if (_.slideCount > _.options.slidesToShow) {
                _.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex");
                _.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex");
                if (_.htmlExpr.test(_.options.prevArrow)) { _.$prevArrow.prependTo(_.options.appendArrows) }
                if (_.htmlExpr.test(_.options.nextArrow)) { _.$nextArrow.appendTo(_.options.appendArrows) }
                if (_.options.infinite !== true) { _.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true") }
            } else { _.$prevArrow.add(_.$nextArrow).addClass("slick-hidden").attr({ "aria-disabled": "true", tabindex: "-1" }) }
        }
    };
    Slick.prototype.buildDots = function() {
        var _ = this,
            i, dot;
        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            _.$slider.addClass("slick-dotted");
            dot = $("<ul />").addClass(_.options.dotsClass);
            for (i = 0; i <= _.getDotCount(); i += 1) { dot.append($("<li />").append(_.options.customPaging.call(this, _, i))) }
            _.$dots = dot.appendTo(_.options.appendDots);
            _.$dots.find("li").first().addClass("slick-active")
        }
    };
    Slick.prototype.buildOut = function() {
        var _ = this;
        _.$slides = _.$slider.children(_.options.slide + ":not(.slick-cloned)").addClass("slick-slide");
        _.slideCount = _.$slides.length;
        _.$slides.each(function(index, element) { $(element).attr("data-slick-index", index).data("originalStyling", $(element).attr("style") || "") });
        _.$slider.addClass("slick-slider");
        _.$slideTrack = _.slideCount === 0 ? $('<div class="slick-track"/>').appendTo(_.$slider) : _.$slides.wrapAll('<div class="slick-track"/>').parent();
        _.$list = _.$slideTrack.wrap('<div class="slick-list"/>').parent();
        _.$slideTrack.css("opacity", 0);
        if (_.options.centerMode === true || _.options.swipeToSlide === true) { _.options.slidesToScroll = 1 }
        $("img[data-lazy]", _.$slider).not("[src]").addClass("slick-loading");
        _.setupInfinite();
        _.buildArrows();
        _.buildDots();
        _.updateDots();
        _.setSlideClasses(typeof _.currentSlide === "number" ? _.currentSlide : 0);
        if (_.options.draggable === true) { _.$list.addClass("draggable") }
    };
    Slick.prototype.buildRows = function() {
        var _ = this,
            a, b, c, newSlides, numOfSlides, originalSlides, slidesPerSection;
        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();
        if (_.options.rows > 0) {
            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);
            for (a = 0; a < numOfSlides; a++) {
                var slide = document.createElement("div");
                for (b = 0; b < _.options.rows; b++) {
                    var row = document.createElement("div");
                    for (c = 0; c < _.options.slidesPerRow; c++) { var target = a * slidesPerSection + (b * _.options.slidesPerRow + c); if (originalSlides.get(target)) { row.appendChild(originalSlides.get(target)) } }
                    slide.appendChild(row)
                }
                newSlides.appendChild(slide)
            }
            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children().css({ width: 100 / _.options.slidesPerRow + "%", display: "inline-block" })
        }
    };
    Slick.prototype.checkResponsive = function(initial, forceUpdate) {
        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();
        if (_.respondTo === "window") { respondToWidth = windowWidth } else if (_.respondTo === "slider") { respondToWidth = sliderWidth } else if (_.respondTo === "min") { respondToWidth = Math.min(windowWidth, sliderWidth) }
        if (_.options.responsive && _.options.responsive.length && _.options.responsive !== null) {
            targetBreakpoint = null;
            for (breakpoint in _.breakpoints) { if (_.breakpoints.hasOwnProperty(breakpoint)) { if (_.originalSettings.mobileFirst === false) { if (respondToWidth < _.breakpoints[breakpoint]) { targetBreakpoint = _.breakpoints[breakpoint] } } else { if (respondToWidth > _.breakpoints[breakpoint]) { targetBreakpoint = _.breakpoints[breakpoint] } } } }
            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint = targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === "unslick") { _.unslick(targetBreakpoint) } else {
                            _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
                            if (initial === true) { _.currentSlide = _.options.initialSlide }
                            _.refresh(initial)
                        }
                        triggerBreakpoint = targetBreakpoint
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === "unslick") { _.unslick(targetBreakpoint) } else {
                        _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
                        if (initial === true) { _.currentSlide = _.options.initialSlide }
                        _.refresh(initial)
                    }
                    triggerBreakpoint = targetBreakpoint
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) { _.currentSlide = _.options.initialSlide }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint
                }
            }
            if (!initial && triggerBreakpoint !== false) { _.$slider.trigger("breakpoint", [_, triggerBreakpoint]) }
        }
    };
    Slick.prototype.changeSlide = function(event, dontAnimate) {
        var _ = this,
            $target = $(event.currentTarget),
            indexOffset, slideOffset, unevenOffset;
        if ($target.is("a")) { event.preventDefault() }
        if (!$target.is("li")) { $target = $target.closest("li") }
        unevenOffset = _.slideCount % _.options.slidesToScroll !== 0;
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;
        switch (event.data.message) {
            case "previous":
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) { _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate) }
                break;
            case "next":
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) { _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate) }
                break;
            case "index":
                var index = event.data.index === 0 ? 0 : event.data.index || $target.index() * _.options.slidesToScroll;
                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger("focus");
                break;
            default:
                return
        }
    };
    Slick.prototype.checkNavigable = function(index) {
        var _ = this,
            navigables, prevNavigable;
        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) { index = navigables[navigables.length - 1] } else {
            for (var n in navigables) {
                if (index < navigables[n]) { index = prevNavigable; break }
                prevNavigable = navigables[n]
            }
        }
        return index
    };
    Slick.prototype.cleanUpEvents = function() {
        var _ = this;
        if (_.options.dots && _.$dots !== null) { $("li", _.$dots).off("click.slick", _.changeSlide).off("mouseenter.slick", $.proxy(_.interrupt, _, true)).off("mouseleave.slick", $.proxy(_.interrupt, _, false)); if (_.options.accessibility === true) { _.$dots.off("keydown.slick", _.keyHandler) } }
        _.$slider.off("focus.slick blur.slick");
        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off("click.slick", _.changeSlide);
            _.$nextArrow && _.$nextArrow.off("click.slick", _.changeSlide);
            if (_.options.accessibility === true) {
                _.$prevArrow && _.$prevArrow.off("keydown.slick", _.keyHandler);
                _.$nextArrow && _.$nextArrow.off("keydown.slick", _.keyHandler)
            }
        }
        _.$list.off("touchstart.slick mousedown.slick", _.swipeHandler);
        _.$list.off("touchmove.slick mousemove.slick", _.swipeHandler);
        _.$list.off("touchend.slick mouseup.slick", _.swipeHandler);
        _.$list.off("touchcancel.slick mouseleave.slick", _.swipeHandler);
        _.$list.off("click.slick", _.clickHandler);
        $(document).off(_.visibilityChange, _.visibility);
        _.cleanUpSlideEvents();
        if (_.options.accessibility === true) { _.$list.off("keydown.slick", _.keyHandler) }
        if (_.options.focusOnSelect === true) { $(_.$slideTrack).children().off("click.slick", _.selectHandler) }
        $(window).off("orientationchange.slick.slick-" + _.instanceUid, _.orientationChange);
        $(window).off("resize.slick.slick-" + _.instanceUid, _.resize);
        $("[draggable!=true]", _.$slideTrack).off("dragstart", _.preventDefault);
        $(window).off("load.slick.slick-" + _.instanceUid, _.setPosition)
    };
    Slick.prototype.cleanUpSlideEvents = function() {
        var _ = this;
        _.$list.off("mouseenter.slick", $.proxy(_.interrupt, _, true));
        _.$list.off("mouseleave.slick", $.proxy(_.interrupt, _, false))
    };
    Slick.prototype.cleanUpRows = function() {
        var _ = this,
            originalSlides;
        if (_.options.rows > 0) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr("style");
            _.$slider.empty().append(originalSlides)
        }
    };
    Slick.prototype.clickHandler = function(event) {
        var _ = this;
        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault()
        }
    };
    Slick.prototype.destroy = function(refresh) {
        var _ = this;
        _.autoPlayClear();
        _.touchObject = {};
        _.cleanUpEvents();
        $(".slick-cloned", _.$slider).detach();
        if (_.$dots) { _.$dots.remove() }
        if (_.$prevArrow && _.$prevArrow.length) { _.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""); if (_.htmlExpr.test(_.options.prevArrow)) { _.$prevArrow.remove() } }
        if (_.$nextArrow && _.$nextArrow.length) { _.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""); if (_.htmlExpr.test(_.options.nextArrow)) { _.$nextArrow.remove() } }
        if (_.$slides) {
            _.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() { $(this).attr("style", $(this).data("originalStyling")) });
            _.$slideTrack.children(this.options.slide).detach();
            _.$slideTrack.detach();
            _.$list.detach();
            _.$slider.append(_.$slides)
        }
        _.cleanUpRows();
        _.$slider.removeClass("slick-slider");
        _.$slider.removeClass("slick-initialized");
        _.$slider.removeClass("slick-dotted");
        _.unslicked = true;
        if (!refresh) { _.$slider.trigger("destroy", [_]) }
    };
    Slick.prototype.disableTransition = function(slide) {
        var _ = this,
            transition = {};
        transition[_.transitionType] = "";
        if (_.options.fade === false) { _.$slideTrack.css(transition) } else { _.$slides.eq(slide).css(transition) }
    };
    Slick.prototype.fadeSlide = function(slideIndex, callback) {
        var _ = this;
        if (_.cssTransitions === false) {
            _.$slides.eq(slideIndex).css({ zIndex: _.options.zIndex });
            _.$slides.eq(slideIndex).animate({ opacity: 1 }, _.options.speed, _.options.easing, callback)
        } else {
            _.applyTransition(slideIndex);
            _.$slides.eq(slideIndex).css({ opacity: 1, zIndex: _.options.zIndex });
            if (callback) {
                setTimeout(function() {
                    _.disableTransition(slideIndex);
                    callback.call()
                }, _.options.speed)
            }
        }
    };
    Slick.prototype.fadeSlideOut = function(slideIndex) {
        var _ = this;
        if (_.cssTransitions === false) { _.$slides.eq(slideIndex).animate({ opacity: 0, zIndex: _.options.zIndex - 2 }, _.options.speed, _.options.easing) } else {
            _.applyTransition(slideIndex);
            _.$slides.eq(slideIndex).css({ opacity: 0, zIndex: _.options.zIndex - 2 })
        }
    };
    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {
        var _ = this;
        if (filter !== null) {
            _.$slidesCache = _.$slides;
            _.unload();
            _.$slideTrack.children(this.options.slide).detach();
            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);
            _.reinit()
        }
    };
    Slick.prototype.focusHandler = function() {
        var _ = this;
        _.$slider.off("focus.slick blur.slick").on("focus.slick", "*", function(event) {
            var $sf = $(this);
            setTimeout(function() {
                if (_.options.pauseOnFocus) {
                    if ($sf.is(":focus")) {
                        _.focussed = true;
                        _.autoPlay()
                    }
                }
            }, 0)
        }).on("blur.slick", "*", function(event) {
            var $sf = $(this);
            if (_.options.pauseOnFocus) {
                _.focussed = false;
                _.autoPlay()
            }
        })
    };
    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() { var _ = this; return _.currentSlide };
    Slick.prototype.getDotCount = function() {
        var _ = this;
        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;
        if (_.options.infinite === true) {
            if (_.slideCount <= _.options.slidesToShow) {++pagerQty } else {
                while (breakPoint < _.slideCount) {
                    ++pagerQty;
                    breakPoint = counter + _.options.slidesToScroll;
                    counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow
                }
            }
        } else if (_.options.centerMode === true) { pagerQty = _.slideCount } else if (!_.options.asNavFor) { pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll) } else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow
            }
        }
        return pagerQty - 1
    };
    Slick.prototype.getLeft = function(slideIndex) {
        var _ = this,
            targetLeft, verticalHeight, verticalOffset = 0,
            targetSlide, coef;
        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);
        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = _.slideWidth * _.options.slidesToShow * -1;
                coef = -1;
                if (_.options.vertical === true && _.options.centerMode === true) { if (_.options.slidesToShow === 2) { coef = -1.5 } else if (_.options.slidesToShow === 1) { coef = -2 } }
                verticalOffset = verticalHeight * _.options.slidesToShow * coef
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth * -1;
                        verticalOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight * -1
                    } else {
                        _.slideOffset = _.slideCount % _.options.slidesToScroll * _.slideWidth * -1;
                        verticalOffset = _.slideCount % _.options.slidesToScroll * verticalHeight * -1
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * _.slideWidth;
                verticalOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * verticalHeight
            }
        }
        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0
        }
        if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) { _.slideOffset = _.slideWidth * Math.floor(_.options.slidesToShow) / 2 - _.slideWidth * _.slideCount / 2 } else if (_.options.centerMode === true && _.options.infinite === true) { _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2)
        }
        if (_.options.vertical === false) { targetLeft = slideIndex * _.slideWidth * -1 + _.slideOffset } else { targetLeft = slideIndex * verticalHeight * -1 + verticalOffset }
        if (_.options.variableWidth === true) {
            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) { targetSlide = _.$slideTrack.children(".slick-slide").eq(slideIndex) } else { targetSlide = _.$slideTrack.children(".slick-slide").eq(slideIndex + _.options.slidesToShow) }
            if (_.options.rtl === true) { if (targetSlide[0]) { targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1 } else { targetLeft = 0 } } else { targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0 }
            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) { targetSlide = _.$slideTrack.children(".slick-slide").eq(slideIndex) } else { targetSlide = _.$slideTrack.children(".slick-slide").eq(slideIndex + _.options.slidesToShow + 1) }
                if (_.options.rtl === true) { if (targetSlide[0]) { targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1 } else { targetLeft = 0 } } else { targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0 }
                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2
            }
        }
        return targetLeft
    };
    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) { var _ = this; return _.options[option] };
    Slick.prototype.getNavigableIndexes = function() {
        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;
        if (_.options.infinite === false) { max = _.slideCount } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2
        }
        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow
        }
        return indexes
    };
    Slick.prototype.getSlick = function() { return this };
    Slick.prototype.getSlideCount = function() {
        var _ = this,
            slidesTraversed, swipedSlide, swipeTarget, centerOffset;
        centerOffset = _.options.centerMode === true ? Math.floor(_.$list.width() / 2) : 0;
        swipeTarget = _.swipeLeft * -1 + centerOffset;
        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find(".slick-slide").each(function(index, slide) {
                var slideOuterWidth, slideOffset, slideRightBoundary;
                slideOuterWidth = $(slide).outerWidth();
                slideOffset = slide.offsetLeft;
                if (_.options.centerMode !== true) { slideOffset += slideOuterWidth / 2 }
                slideRightBoundary = slideOffset + slideOuterWidth;
                if (swipeTarget < slideRightBoundary) { swipedSlide = slide; return false }
            });
            slidesTraversed = Math.abs($(swipedSlide).attr("data-slick-index") - _.currentSlide) || 1;
            return slidesTraversed
        } else { return _.options.slidesToScroll }
    };
    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {
        var _ = this;
        _.changeSlide({ data: { message: "index", index: parseInt(slide) } }, dontAnimate)
    };
    Slick.prototype.init = function(creation) {
        var _ = this;
        if (!$(_.$slider).hasClass("slick-initialized")) {
            $(_.$slider).addClass("slick-initialized");
            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler()
        }
        if (creation) { _.$slider.trigger("init", [_]) }
        if (_.options.accessibility === true) { _.initADA() }
        if (_.options.autoplay) {
            _.paused = false;
            _.autoPlay()
        }
    };
    Slick.prototype.initADA = function() {
        var _ = this,
            numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
            tabControlIndexes = _.getNavigableIndexes().filter(function(val) { return val >= 0 && val < _.slideCount });
        _.$slides.add(_.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" });
        if (_.$dots !== null) {
            _.$slides.not(_.$slideTrack.find(".slick-cloned")).each(function(i) {
                var slideControlIndex = tabControlIndexes.indexOf(i);
                $(this).attr({ role: "tabpanel", id: "slick-slide" + _.instanceUid + i, tabindex: -1 });
                if (slideControlIndex !== -1) { var ariaButtonControl = "slick-slide-control" + _.instanceUid + slideControlIndex; if ($("#" + ariaButtonControl).length) { $(this).attr({ "aria-describedby": ariaButtonControl }) } }
            });
            _.$dots.attr("role", "tablist").find("li").each(function(i) {
                var mappedSlideIndex = tabControlIndexes[i];
                $(this).attr({ role: "presentation" });
                $(this).find("button").first().attr({ role: "tab", id: "slick-slide-control" + _.instanceUid + i, "aria-controls": "slick-slide" + _.instanceUid + mappedSlideIndex, "aria-label": i + 1 + " of " + numDotGroups, "aria-selected": null, tabindex: "-1" })
            }).eq(_.currentSlide).find("button").attr({ "aria-selected": "true", tabindex: "0" }).end()
        }
        for (var i = _.currentSlide, max = i + _.options.slidesToShow; i < max; i++) { if (_.options.focusOnChange) { _.$slides.eq(i).attr({ tabindex: "0" }) } else { _.$slides.eq(i).removeAttr("tabindex") } }
        _.activateADA()
    };
    Slick.prototype.initArrowEvents = function() {
        var _ = this;
        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, _.changeSlide);
            _.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, _.changeSlide);
            if (_.options.accessibility === true) {
                _.$prevArrow.on("keydown.slick", _.keyHandler);
                _.$nextArrow.on("keydown.slick", _.keyHandler)
            }
        }
    };
    Slick.prototype.initDotEvents = function() { var _ = this; if (_.options.dots === true && _.slideCount > _.options.slidesToShow) { $("li", _.$dots).on("click.slick", { message: "index" }, _.changeSlide); if (_.options.accessibility === true) { _.$dots.on("keydown.slick", _.keyHandler) } } if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) { $("li", _.$dots).on("mouseenter.slick", $.proxy(_.interrupt, _, true)).on("mouseleave.slick", $.proxy(_.interrupt, _, false)) } };
    Slick.prototype.initSlideEvents = function() {
        var _ = this;
        if (_.options.pauseOnHover) {
            _.$list.on("mouseenter.slick", $.proxy(_.interrupt, _, true));
            _.$list.on("mouseleave.slick", $.proxy(_.interrupt, _, false))
        }
    };
    Slick.prototype.initializeEvents = function() {
        var _ = this;
        _.initArrowEvents();
        _.initDotEvents();
        _.initSlideEvents();
        _.$list.on("touchstart.slick mousedown.slick", { action: "start" }, _.swipeHandler);
        _.$list.on("touchmove.slick mousemove.slick", { action: "move" }, _.swipeHandler);
        _.$list.on("touchend.slick mouseup.slick", { action: "end" }, _.swipeHandler);
        _.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, _.swipeHandler);
        _.$list.on("click.slick", _.clickHandler);
        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));
        if (_.options.accessibility === true) { _.$list.on("keydown.slick", _.keyHandler) }
        if (_.options.focusOnSelect === true) { $(_.$slideTrack).children().on("click.slick", _.selectHandler) }
        $(window).on("orientationchange.slick.slick-" + _.instanceUid, $.proxy(_.orientationChange, _));
        $(window).on("resize.slick.slick-" + _.instanceUid, $.proxy(_.resize, _));
        $("[draggable!=true]", _.$slideTrack).on("dragstart", _.preventDefault);
        $(window).on("load.slick.slick-" + _.instanceUid, _.setPosition);
        $(_.setPosition)
    };
    Slick.prototype.initUI = function() {
        var _ = this;
        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.show();
            _.$nextArrow.show()
        }
        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) { _.$dots.show() }
    };
    Slick.prototype.keyHandler = function(event) { var _ = this; if (!event.target.tagName.match("TEXTAREA|INPUT|SELECT")) { if (event.keyCode === 37 && _.options.accessibility === true) { _.changeSlide({ data: { message: _.options.rtl === true ? "next" : "previous" } }) } else if (event.keyCode === 39 && _.options.accessibility === true) { _.changeSlide({ data: { message: _.options.rtl === true ? "previous" : "next" } }) } } };
    Slick.prototype.lazyLoad = function() {
        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {
            $("img[data-lazy]", imagesScope).each(function() {
                var image = $(this),
                    imageSource = $(this).attr("data-lazy"),
                    imageSrcSet = $(this).attr("data-srcset"),
                    imageSizes = $(this).attr("data-sizes") || _.$slider.attr("data-sizes"),
                    imageToLoad = document.createElement("img");
                imageToLoad.onload = function() {
                    image.animate({ opacity: 0 }, 100, function() {
                        if (imageSrcSet) { image.attr("srcset", imageSrcSet); if (imageSizes) { image.attr("sizes", imageSizes) } }
                        image.attr("src", imageSource).animate({ opacity: 1 }, 200, function() { image.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading") });
                        _.$slider.trigger("lazyLoaded", [_, image, imageSource])
                    })
                };
                imageToLoad.onerror = function() {
                    image.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error");
                    _.$slider.trigger("lazyLoadError", [_, image, imageSource])
                };
                imageToLoad.src = imageSource
            })
        }
        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) { if (rangeStart > 0) rangeStart--; if (rangeEnd <= _.slideCount) rangeEnd++ }
        }
        loadRange = _.$slider.find(".slick-slide").slice(rangeStart, rangeEnd);
        if (_.options.lazyLoad === "anticipated") {
            var prevSlide = rangeStart - 1,
                nextSlide = rangeEnd,
                $slides = _.$slider.find(".slick-slide");
            for (var i = 0; i < _.options.slidesToScroll; i++) {
                if (prevSlide < 0) prevSlide = _.slideCount - 1;
                loadRange = loadRange.add($slides.eq(prevSlide));
                loadRange = loadRange.add($slides.eq(nextSlide));
                prevSlide--;
                nextSlide++
            }
        }
        loadImages(loadRange);
        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find(".slick-slide");
            loadImages(cloneRange)
        } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find(".slick-cloned").slice(0, _.options.slidesToShow);
            loadImages(cloneRange)
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find(".slick-cloned").slice(_.options.slidesToShow * -1);
            loadImages(cloneRange)
        }
    };
    Slick.prototype.loadSlider = function() {
        var _ = this;
        _.setPosition();
        _.$slideTrack.css({ opacity: 1 });
        _.$slider.removeClass("slick-loading");
        _.initUI();
        if (_.options.lazyLoad === "progressive") { _.progressiveLazyLoad() }
    };
    Slick.prototype.next = Slick.prototype.slickNext = function() {
        var _ = this;
        _.changeSlide({ data: { message: "next" } })
    };
    Slick.prototype.orientationChange = function() {
        var _ = this;
        _.checkResponsive();
        _.setPosition()
    };
    Slick.prototype.pause = Slick.prototype.slickPause = function() {
        var _ = this;
        _.autoPlayClear();
        _.paused = true
    };
    Slick.prototype.play = Slick.prototype.slickPlay = function() {
        var _ = this;
        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false
    };
    Slick.prototype.postSlide = function(index) {
        var _ = this;
        if (!_.unslicked) {
            _.$slider.trigger("afterChange", [_, index]);
            _.animating = false;
            if (_.slideCount > _.options.slidesToShow) { _.setPosition() }
            _.swipeLeft = null;
            if (_.options.autoplay) { _.autoPlay() }
            if (_.options.accessibility === true) {
                _.initADA();
                if (_.options.focusOnChange) {
                    var $currentSlide = $(_.$slides.get(_.currentSlide));
                    $currentSlide.attr("tabindex", 0).focus()
                }
            }
        }
    };
    Slick.prototype.prev = Slick.prototype.slickPrev = function() {
        var _ = this;
        _.changeSlide({ data: { message: "previous" } })
    };
    Slick.prototype.preventDefault = function(event) { event.preventDefault() };
    Slick.prototype.progressiveLazyLoad = function(tryCount) {
        tryCount = tryCount || 1;
        var _ = this,
            $imgsToLoad = $("img[data-lazy]", _.$slider),
            image, imageSource, imageSrcSet, imageSizes, imageToLoad;
        if ($imgsToLoad.length) {
            image = $imgsToLoad.first();
            imageSource = image.attr("data-lazy");
            imageSrcSet = image.attr("data-srcset");
            imageSizes = image.attr("data-sizes") || _.$slider.attr("data-sizes");
            imageToLoad = document.createElement("img");
            imageToLoad.onload = function() {
                if (imageSrcSet) { image.attr("srcset", imageSrcSet); if (imageSizes) { image.attr("sizes", imageSizes) } }
                image.attr("src", imageSource).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
                if (_.options.adaptiveHeight === true) { _.setPosition() }
                _.$slider.trigger("lazyLoaded", [_, image, imageSource]);
                _.progressiveLazyLoad()
            };
            imageToLoad.onerror = function() {
                if (tryCount < 3) { setTimeout(function() { _.progressiveLazyLoad(tryCount + 1) }, 500) } else {
                    image.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error");
                    _.$slider.trigger("lazyLoadError", [_, image, imageSource]);
                    _.progressiveLazyLoad()
                }
            };
            imageToLoad.src = imageSource
        } else { _.$slider.trigger("allImagesLoaded", [_]) }
    };
    Slick.prototype.refresh = function(initializing) {
        var _ = this,
            currentSlide, lastVisibleIndex;
        lastVisibleIndex = _.slideCount - _.options.slidesToShow;
        if (!_.options.infinite && _.currentSlide > lastVisibleIndex) { _.currentSlide = lastVisibleIndex }
        if (_.slideCount <= _.options.slidesToShow) { _.currentSlide = 0 }
        currentSlide = _.currentSlide;
        _.destroy(true);
        $.extend(_, _.initials, { currentSlide: currentSlide });
        _.init();
        if (!initializing) { _.changeSlide({ data: { message: "index", index: currentSlide } }, false) }
    };
    Slick.prototype.registerBreakpoints = function() {
        var _ = this,
            breakpoint, currentBreakpoint, l, responsiveSettings = _.options.responsive || null;
        if ($.type(responsiveSettings) === "array" && responsiveSettings.length) {
            _.respondTo = _.options.respondTo || "window";
            for (breakpoint in responsiveSettings) {
                l = _.breakpoints.length - 1;
                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    currentBreakpoint = responsiveSettings[breakpoint].breakpoint;
                    while (l >= 0) {
                        if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) { _.breakpoints.splice(l, 1) }
                        l--
                    }
                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings
                }
            }
            _.breakpoints.sort(function(a, b) { return _.options.mobileFirst ? a - b : b - a })
        }
    };
    Slick.prototype.reinit = function() {
        var _ = this;
        _.$slides = _.$slideTrack.children(_.options.slide).addClass("slick-slide");
        _.slideCount = _.$slides.length;
        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) { _.currentSlide = _.currentSlide - _.options.slidesToScroll }
        if (_.slideCount <= _.options.slidesToShow) { _.currentSlide = 0 }
        _.registerBreakpoints();
        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();
        _.checkResponsive(false, true);
        if (_.options.focusOnSelect === true) { $(_.$slideTrack).children().on("click.slick", _.selectHandler) }
        _.setSlideClasses(typeof _.currentSlide === "number" ? _.currentSlide : 0);
        _.setPosition();
        _.focusHandler();
        _.paused = !_.options.autoplay;
        _.autoPlay();
        _.$slider.trigger("reInit", [_])
    };
    Slick.prototype.resize = function() {
        var _ = this;
        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if (!_.unslicked) { _.setPosition() }
            }, 50)
        }
    };
    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {
        var _ = this;
        if (typeof index === "boolean") {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1
        } else { index = removeBefore === true ? --index : index }
        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) { return false }
        _.unload();
        if (removeAll === true) { _.$slideTrack.children().remove() } else { _.$slideTrack.children(this.options.slide).eq(index).remove() }
        _.$slides = _.$slideTrack.children(this.options.slide);
        _.$slideTrack.children(this.options.slide).detach();
        _.$slideTrack.append(_.$slides);
        _.$slidesCache = _.$slides;
        _.reinit()
    };
    Slick.prototype.setCSS = function(position) {
        var _ = this,
            positionProps = {},
            x, y;
        if (_.options.rtl === true) { position = -position }
        x = _.positionProp == "left" ? Math.ceil(position) + "px" : "0px";
        y = _.positionProp == "top" ? Math.ceil(position) + "px" : "0px";
        positionProps[_.positionProp] = position;
        if (_.transformsEnabled === false) { _.$slideTrack.css(positionProps) } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = "translate(" + x + ", " + y + ")";
                _.$slideTrack.css(positionProps)
            } else {
                positionProps[_.animType] = "translate3d(" + x + ", " + y + ", 0px)";
                _.$slideTrack.css(positionProps)
            }
        }
    };
    Slick.prototype.setDimensions = function() {
        var _ = this;
        if (_.options.vertical === false) { if (_.options.centerMode === true) { _.$list.css({ padding: "0px " + _.options.centerPadding }) } } else { _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow); if (_.options.centerMode === true) { _.$list.css({ padding: _.options.centerPadding + " 0px" }) } }
        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();
        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil(_.slideWidth * _.$slideTrack.children(".slick-slide").length))
        } else if (_.options.variableWidth === true) { _.$slideTrack.width(5e3 * _.slideCount) } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil(_.$slides.first().outerHeight(true) * _.$slideTrack.children(".slick-slide").length))
        }
        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children(".slick-slide").width(_.slideWidth - offset)
    };
    Slick.prototype.setFade = function() {
        var _ = this,
            targetLeft;
        _.$slides.each(function(index, element) { targetLeft = _.slideWidth * index * -1; if (_.options.rtl === true) { $(element).css({ position: "relative", right: targetLeft, top: 0, zIndex: _.options.zIndex - 2, opacity: 0 }) } else { $(element).css({ position: "relative", left: targetLeft, top: 0, zIndex: _.options.zIndex - 2, opacity: 0 }) } });
        _.$slides.eq(_.currentSlide).css({ zIndex: _.options.zIndex - 1, opacity: 1 })
    };
    Slick.prototype.setHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css("height", targetHeight)
        }
    };
    Slick.prototype.setOption = Slick.prototype.slickSetOption = function() {
        var _ = this,
            l, item, option, value, refresh = false,
            type;
        if ($.type(arguments[0]) === "object") {
            option = arguments[0];
            refresh = arguments[1];
            type = "multiple"
        } else if ($.type(arguments[0]) === "string") {
            option = arguments[0];
            value = arguments[1];
            refresh = arguments[2];
            if (arguments[0] === "responsive" && $.type(arguments[1]) === "array") { type = "responsive" } else if (typeof arguments[1] !== "undefined") { type = "single" }
        }
        if (type === "single") { _.options[option] = value } else if (type === "multiple") { $.each(option, function(opt, val) { _.options[opt] = val }) } else if (type === "responsive") {
            for (item in value) {
                if ($.type(_.options.responsive) !== "array") { _.options.responsive = [value[item]] } else {
                    l = _.options.responsive.length - 1;
                    while (l >= 0) {
                        if (_.options.responsive[l].breakpoint === value[item].breakpoint) { _.options.responsive.splice(l, 1) }
                        l--
                    }
                    _.options.responsive.push(value[item])
                }
            }
        }
        if (refresh) {
            _.unload();
            _.reinit()
        }
    };
    Slick.prototype.setPosition = function() {
        var _ = this;
        _.setDimensions();
        _.setHeight();
        if (_.options.fade === false) { _.setCSS(_.getLeft(_.currentSlide)) } else { _.setFade() }
        _.$slider.trigger("setPosition", [_])
    };
    Slick.prototype.setProps = function() {
        var _ = this,
            bodyStyle = document.body.style;
        _.positionProp = _.options.vertical === true ? "top" : "left";
        if (_.positionProp === "top") { _.$slider.addClass("slick-vertical") } else { _.$slider.removeClass("slick-vertical") }
        if (bodyStyle.WebkitTransition !== undefined || bodyStyle.MozTransition !== undefined || bodyStyle.msTransition !== undefined) { if (_.options.useCSS === true) { _.cssTransitions = true } }
        if (_.options.fade) { if (typeof _.options.zIndex === "number") { if (_.options.zIndex < 3) { _.options.zIndex = 3 } } else { _.options.zIndex = _.defaults.zIndex } }
        if (bodyStyle.OTransform !== undefined) {
            _.animType = "OTransform";
            _.transformType = "-o-transform";
            _.transitionType = "OTransition";
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = "MozTransform";
            _.transformType = "-moz-transform";
            _.transitionType = "MozTransition";
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = "webkitTransform";
            _.transformType = "-webkit-transform";
            _.transitionType = "webkitTransition";
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = "msTransform";
            _.transformType = "-ms-transform";
            _.transitionType = "msTransition";
            if (bodyStyle.msTransform === undefined) _.animType = false
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = "transform";
            _.transformType = "transform";
            _.transitionType = "transition"
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false)
    };
    Slick.prototype.setSlideClasses = function(index) {
        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;
        allSlides = _.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true");
        _.$slides.eq(index).addClass("slick-current");
        if (_.options.centerMode === true) {
            var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;
            centerOffset = Math.floor(_.options.slidesToShow / 2);
            if (_.options.infinite === true) {
                if (index >= centerOffset && index <= _.slideCount - 1 - centerOffset) { _.$slides.slice(index - centerOffset + evenCoef, index + centerOffset + 1).addClass("slick-active").attr("aria-hidden", "false") } else {
                    indexOffset = _.options.slidesToShow + index;
                    allSlides.slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2).addClass("slick-active").attr("aria-hidden", "false")
                }
                if (index === 0) { allSlides.eq(allSlides.length - 1 - _.options.slidesToShow).addClass("slick-center") } else if (index === _.slideCount - 1) { allSlides.eq(_.options.slidesToShow).addClass("slick-center") }
            }
            _.$slides.eq(index).addClass("slick-center")
        } else {
            if (index >= 0 && index <= _.slideCount - _.options.slidesToShow) { _.$slides.slice(index, index + _.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") } else if (allSlides.length <= _.options.slidesToShow) { allSlides.addClass("slick-active").attr("aria-hidden", "false") } else {
                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;
                if (_.options.slidesToShow == _.options.slidesToScroll && _.slideCount - index < _.options.slidesToShow) { allSlides.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder).addClass("slick-active").attr("aria-hidden", "false") } else { allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") }
            }
        }
        if (_.options.lazyLoad === "ondemand" || _.options.lazyLoad === "anticipated") { _.lazyLoad() }
    };
    Slick.prototype.setupInfinite = function() {
        var _ = this,
            i, slideIndex, infiniteCount;
        if (_.options.fade === true) { _.options.centerMode = false }
        if (_.options.infinite === true && _.options.fade === false) {
            slideIndex = null;
            if (_.slideCount > _.options.slidesToShow) {
                if (_.options.centerMode === true) { infiniteCount = _.options.slidesToShow + 1 } else { infiniteCount = _.options.slidesToShow }
                for (i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr("id", "").attr("data-slick-index", slideIndex - _.slideCount).prependTo(_.$slideTrack).addClass("slick-cloned")
                }
                for (i = 0; i < infiniteCount + _.slideCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr("id", "").attr("data-slick-index", slideIndex + _.slideCount).appendTo(_.$slideTrack).addClass("slick-cloned")
                }
                _.$slideTrack.find(".slick-cloned").find("[id]").each(function() { $(this).attr("id", "") })
            }
        }
    };
    Slick.prototype.interrupt = function(toggle) {
        var _ = this;
        if (!toggle) { _.autoPlay() }
        _.interrupted = toggle
    };
    Slick.prototype.selectHandler = function(event) {
        var _ = this;
        var targetElement = $(event.target).is(".slick-slide") ? $(event.target) : $(event.target).parents(".slick-slide");
        var index = parseInt(targetElement.attr("data-slick-index"));
        if (!index) index = 0;
        if (_.slideCount <= _.options.slidesToShow) { _.slideHandler(index, false, true); return }
        _.slideHandler(index)
    };
    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {
        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this,
            navTarget;
        sync = sync || false;
        if (_.animating === true && _.options.waitForAnimate === true) { return }
        if (_.options.fade === true && _.currentSlide === index) { return }
        if (sync === false) { _.asNavFor(index) }
        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);
        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;
        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) { if (_.options.fade === false) { targetSlide = _.currentSlide; if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) { _.animateSlide(slideLeft, function() { _.postSlide(targetSlide) }) } else { _.postSlide(targetSlide) } } return } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > _.slideCount - _.options.slidesToScroll)) { if (_.options.fade === false) { targetSlide = _.currentSlide; if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) { _.animateSlide(slideLeft, function() { _.postSlide(targetSlide) }) } else { _.postSlide(targetSlide) } } return }
        if (_.options.autoplay) { clearInterval(_.autoPlayTimer) }
        if (targetSlide < 0) { if (_.slideCount % _.options.slidesToScroll !== 0) { animSlide = _.slideCount - _.slideCount % _.options.slidesToScroll } else { animSlide = _.slideCount + targetSlide } } else if (targetSlide >= _.slideCount) { if (_.slideCount % _.options.slidesToScroll !== 0) { animSlide = 0 } else { animSlide = targetSlide - _.slideCount } } else { animSlide = targetSlide }
        _.animating = true;
        _.$slider.trigger("beforeChange", [_, _.currentSlide, animSlide]);
        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;
        _.setSlideClasses(_.currentSlide);
        if (_.options.asNavFor) {
            navTarget = _.getNavTarget();
            navTarget = navTarget.slick("getSlick");
            if (navTarget.slideCount <= navTarget.options.slidesToShow) { navTarget.setSlideClasses(_.currentSlide) }
        }
        _.updateDots();
        _.updateArrows();
        if (_.options.fade === true) {
            if (dontAnimate !== true) {
                _.fadeSlideOut(oldSlide);
                _.fadeSlide(animSlide, function() { _.postSlide(animSlide) })
            } else { _.postSlide(animSlide) }
            _.animateHeight();
            return
        }
        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) { _.animateSlide(targetLeft, function() { _.postSlide(animSlide) }) } else { _.postSlide(animSlide) }
    };
    Slick.prototype.startLoad = function() {
        var _ = this;
        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.hide();
            _.$nextArrow.hide()
        }
        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) { _.$dots.hide() }
        _.$slider.addClass("slick-loading")
    };
    Slick.prototype.swipeDirection = function() {
        var xDist, yDist, r, swipeAngle, _ = this;
        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);
        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) { swipeAngle = 360 - Math.abs(swipeAngle) }
        if (swipeAngle <= 45 && swipeAngle >= 0) { return _.options.rtl === false ? "left" : "right" }
        if (swipeAngle <= 360 && swipeAngle >= 315) { return _.options.rtl === false ? "left" : "right" }
        if (swipeAngle >= 135 && swipeAngle <= 225) { return _.options.rtl === false ? "right" : "left" }
        if (_.options.verticalSwiping === true) { if (swipeAngle >= 35 && swipeAngle <= 135) { return "down" } else { return "up" } }
        return "vertical"
    };
    Slick.prototype.swipeEnd = function(event) {
        var _ = this,
            slideCount, direction;
        _.dragging = false;
        _.swiping = false;
        if (_.scrolling) { _.scrolling = false; return false }
        _.interrupted = false;
        _.shouldClick = _.touchObject.swipeLength > 10 ? false : true;
        if (_.touchObject.curX === undefined) { return false }
        if (_.touchObject.edgeHit === true) { _.$slider.trigger("edge", [_, _.swipeDirection()]) }
        if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {
            direction = _.swipeDirection();
            switch (direction) {
                case "left":
                case "down":
                    slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount();
                    _.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount();
                    _.currentDirection = 1;
                    break;
                default:
            }
            if (direction != "vertical") {
                _.slideHandler(slideCount);
                _.touchObject = {};
                _.$slider.trigger("swipe", [_, direction])
            }
        } else {
            if (_.touchObject.startX !== _.touchObject.curX) {
                _.slideHandler(_.currentSlide);
                _.touchObject = {}
            }
        }
    };
    Slick.prototype.swipeHandler = function(event) {
        var _ = this;
        if (_.options.swipe === false || "ontouchend" in document && _.options.swipe === false) { return } else if (_.options.draggable === false && event.type.indexOf("mouse") !== -1) { return }
        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ? event.originalEvent.touches.length : 1;
        _.touchObject.minSwipe = _.listWidth / _.options.touchThreshold;
        if (_.options.verticalSwiping === true) { _.touchObject.minSwipe = _.listHeight / _.options.touchThreshold }
        switch (event.data.action) {
            case "start":
                _.swipeStart(event);
                break;
            case "move":
                _.swipeMove(event);
                break;
            case "end":
                _.swipeEnd(event);
                break
        }
    };
    Slick.prototype.swipeMove = function(event) {
        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;
        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;
        if (!_.dragging || _.scrolling || touches && touches.length !== 1) { return false }
        curLeft = _.getLeft(_.currentSlide);
        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;
        _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));
        verticalSwipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));
        if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) { _.scrolling = true; return false }
        if (_.options.verticalSwiping === true) { _.touchObject.swipeLength = verticalSwipeLength }
        swipeDirection = _.swipeDirection();
        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            _.swiping = true;
            event.preventDefault()
        }
        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) { positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1 }
        swipeLength = _.touchObject.swipeLength;
        _.touchObject.edgeHit = false;
        if (_.options.infinite === false) {
            if (_.currentSlide === 0 && swipeDirection === "right" || _.currentSlide >= _.getDotCount() && swipeDirection === "left") {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true
            }
        }
        if (_.options.vertical === false) { _.swipeLeft = curLeft + swipeLength * positionOffset } else { _.swipeLeft = curLeft + swipeLength * (_.$list.height() / _.listWidth) * positionOffset }
        if (_.options.verticalSwiping === true) { _.swipeLeft = curLeft + swipeLength * positionOffset }
        if (_.options.fade === true || _.options.touchMove === false) { return false }
        if (_.animating === true) { _.swipeLeft = null; return false }
        _.setCSS(_.swipeLeft)
    };
    Slick.prototype.swipeStart = function(event) {
        var _ = this,
            touches;
        _.interrupted = true;
        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) { _.touchObject = {}; return false }
        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) { touches = event.originalEvent.touches[0] }
        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;
        _.dragging = true
    };
    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {
        var _ = this;
        if (_.$slidesCache !== null) {
            _.unload();
            _.$slideTrack.children(this.options.slide).detach();
            _.$slidesCache.appendTo(_.$slideTrack);
            _.reinit()
        }
    };
    Slick.prototype.unload = function() {
        var _ = this;
        $(".slick-cloned", _.$slider).remove();
        if (_.$dots) { _.$dots.remove() }
        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) { _.$prevArrow.remove() }
        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) { _.$nextArrow.remove() }
        _.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    };
    Slick.prototype.unslick = function(fromBreakpoint) {
        var _ = this;
        _.$slider.trigger("unslick", [_, fromBreakpoint]);
        _.destroy()
    };
    Slick.prototype.updateArrows = function() {
        var _ = this,
            centerOffset;
        centerOffset = Math.floor(_.options.slidesToShow / 2);
        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow && !_.options.infinite) {
            _.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false");
            _.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false");
            if (_.currentSlide === 0) {
                _.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true");
                _.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")
            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {
                _.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true");
                _.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")
            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {
                _.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true");
                _.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")
            }
        }
    };
    Slick.prototype.updateDots = function() {
        var _ = this;
        if (_.$dots !== null) {
            _.$dots.find("li").removeClass("slick-active").end();
            _.$dots.find("li").eq(Math.floor(_.currentSlide / _.options.slidesToScroll)).addClass("slick-active")
        }
    };
    Slick.prototype.visibility = function() { var _ = this; if (_.options.autoplay) { if (document[_.hidden]) { _.interrupted = true } else { _.interrupted = false } } };
    $.fn.slick = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i, ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == "object" || typeof opt == "undefined") _[i].slick = new Slick(_[i], opt);
            else ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != "undefined") return ret
        }
        return _
    }
});


/*====================================*/

/**
 * sticky-sidebar - A JavaScript plugin for making smart and high performance.
 * @version v3.3.0
 * @link https://github.com/abouolia/sticky-sidebar
 * @author Ahmed Bouhuolia
 * @license The MIT License (MIT)
 **/
! function(t, e) { "object" == typeof exports && "undefined" != typeof module ? e() : "function" == typeof define && define.amd ? define(e) : e() }(0, function() {
    "use strict";

    function t(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }
    var e = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) { return i && t(e.prototype, i), n && t(e, n), e }
        }(),
        i = function() {
            var i = ".stickySidebar",
                n = { topSpacing: 0, bottomSpacing: 0, containerSelector: !1, innerWrapperSelector: ".inner-wrapper-sticky", stickyClass: "is-affixed", resizeSensor: !0, minWidth: !1 };
            return function() {
                function s(e) {
                    var i = this,
                        o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    if (t(this, s), this.options = s.extend(n, o), this.sidebar = "string" == typeof e ? document.querySelector(e) : e, void 0 === this.sidebar) throw new Error("There is no specific sidebar element.");
                    this.sidebarInner = !1, this.container = this.sidebar.parentElement, this.affixedType = "STATIC", this.direction = "down", this.support = { transform: !1, transform3d: !1 }, this._initialized = !1, this._reStyle = !1, this._breakpoint = !1, this._resizeListeners = [], this.dimensions = { translateY: 0, topSpacing: 0, lastTopSpacing: 0, bottomSpacing: 0, lastBottomSpacing: 0, sidebarHeight: 0, sidebarWidth: 0, containerTop: 0, containerHeight: 0, viewportHeight: 0, viewportTop: 0, lastViewportTop: 0 }, ["handleEvent"].forEach(function(t) { i[t] = i[t].bind(i) }), this.initialize()
                }
                return e(s, [{
                    key: "initialize",
                    value: function() {
                        var t = this;
                        if (this._setSupportFeatures(), this.options.innerWrapperSelector && (this.sidebarInner = this.sidebar.querySelector(this.options.innerWrapperSelector), null === this.sidebarInner && (this.sidebarInner = !1)), !this.sidebarInner) {
                            var e = document.createElement("div");
                            for (e.setAttribute("class", "inner-wrapper-sticky"), this.sidebar.appendChild(e); this.sidebar.firstChild != e;) e.appendChild(this.sidebar.firstChild);
                            this.sidebarInner = this.sidebar.querySelector(".inner-wrapper-sticky")
                        }
                        if (this.options.containerSelector) { var i = document.querySelectorAll(this.options.containerSelector); if ((i = Array.prototype.slice.call(i)).forEach(function(e, i) { e.contains(t.sidebar) && (t.container = e) }), !i.length) throw new Error("The container does not contains on the sidebar.") }
                        "function" != typeof this.options.topSpacing && (this.options.topSpacing = parseInt(this.options.topSpacing) || 0), "function" != typeof this.options.bottomSpacing && (this.options.bottomSpacing = parseInt(this.options.bottomSpacing) || 0), this._widthBreakpoint(), this.calcDimensions(), this.stickyPosition(), this.bindEvents(), this._initialized = !0
                    }
                }, { key: "bindEvents", value: function() { window.addEventListener("resize", this, { passive: !0 }), window.addEventListener("scroll", this, { passive: !0 }), this.sidebar.addEventListener("update" + i, this), this.options.resizeSensor && "undefined" != typeof ResizeSensor && (new ResizeSensor(this.sidebarInner, this.handleEvent), new ResizeSensor(this.container, this.handleEvent)) } }, { key: "handleEvent", value: function(t) { this.updateSticky(t) } }, {
                    key: "calcDimensions",
                    value: function() {
                        if (!this._breakpoint) {
                            var t = this.dimensions;
                            t.containerTop = s.offsetRelative(this.container).top, t.containerHeight = this.container.clientHeight, t.containerBottom = t.containerTop + t.containerHeight, t.sidebarHeight = this.sidebarInner.offsetHeight, t.sidebarWidth = this.sidebar.offsetWidth, t.viewportHeight = window.innerHeight, this._calcDimensionsWithScroll()
                        }
                    }
                }, {
                    key: "_calcDimensionsWithScroll",
                    value: function() {
                        var t = this.dimensions;
                        t.sidebarLeft = s.offsetRelative(this.sidebar).left, t.viewportTop = document.documentElement.scrollTop || document.body.scrollTop, t.viewportBottom = t.viewportTop + t.viewportHeight, t.viewportLeft = document.documentElement.scrollLeft || document.body.scrollLeft, t.topSpacing = this.options.topSpacing, t.bottomSpacing = this.options.bottomSpacing, "function" == typeof t.topSpacing && (t.topSpacing = parseInt(t.topSpacing(this.sidebar)) || 0), "function" == typeof t.bottomSpacing && (t.bottomSpacing = parseInt(t.bottomSpacing(this.sidebar)) || 0), "VIEWPORT-TOP" === this.affixedType ? t.topSpacing < t.lastTopSpacing && (t.translateY += t.lastTopSpacing - t.topSpacing, this._reStyle = !0) : "VIEWPORT-BOTTOM" === this.affixedType && t.bottomSpacing < t.lastBottomSpacing && (t.translateY += t.lastBottomSpacing - t.bottomSpacing, this._reStyle = !0), t.lastTopSpacing = t.topSpacing, t.lastBottomSpacing = t.bottomSpacing
                    }
                }, { key: "isSidebarFitsViewport", value: function() { return this.dimensions.sidebarHeight < this.dimensions.viewportHeight } }, {
                    key: "observeScrollDir",
                    value: function() {
                        var t = this.dimensions;
                        if (t.lastViewportTop !== t.viewportTop) {
                            var e = "down" === this.direction ? Math.min : Math.max;
                            t.viewportTop === e(t.viewportTop, t.lastViewportTop) && (this.direction = "down" === this.direction ? "up" : "down")
                        }
                    }
                }, {
                    key: "getAffixType",
                    value: function() {
                        var t = this.dimensions,
                            e = !1;
                        this._calcDimensionsWithScroll();
                        var i = t.sidebarHeight + t.containerTop,
                            n = t.viewportTop + t.topSpacing,
                            s = t.viewportBottom - t.bottomSpacing;
                        return "up" === this.direction ? n <= t.containerTop ? (t.translateY = 0, e = "STATIC") : n <= t.translateY + t.containerTop ? (t.translateY = n - t.containerTop, e = "VIEWPORT-TOP") : !this.isSidebarFitsViewport() && t.containerTop <= n && (e = "VIEWPORT-UNBOTTOM") : this.isSidebarFitsViewport() ? t.sidebarHeight + n >= t.containerBottom ? (t.translateY = t.containerBottom - i, e = "CONTAINER-BOTTOM") : n >= t.containerTop && (t.translateY = n - t.containerTop, e = "VIEWPORT-TOP") : t.containerBottom <= s ? (t.translateY = t.containerBottom - i, e = "CONTAINER-BOTTOM") : i + t.translateY <= s ? (t.translateY = s - i, e = "VIEWPORT-BOTTOM") : t.containerTop + t.translateY <= n && (e = "VIEWPORT-UNBOTTOM"), t.translateY = Math.max(0, t.translateY), t.translateY = Math.min(t.containerHeight, t.translateY), t.lastViewportTop = t.viewportTop, e
                    }
                }, {
                    key: "_getStyle",
                    value: function(t) {
                        if (void 0 !== t) {
                            var e = { inner: {}, outer: {} },
                                i = this.dimensions;
                            switch (t) {
                                case "VIEWPORT-TOP":
                                    e.inner = { position: "fixed", top: i.topSpacing, left: i.sidebarLeft - i.viewportLeft, width: i.sidebarWidth };
                                    break;
                                case "VIEWPORT-BOTTOM":
                                    e.inner = { position: "fixed", top: "auto", left: i.sidebarLeft, bottom: i.bottomSpacing, width: i.sidebarWidth };
                                    break;
                                case "CONTAINER-BOTTOM":
                                case "VIEWPORT-UNBOTTOM":
                                    var n = this._getTranslate(0, i.translateY + "px");
                                    e.inner = n ? { transform: n } : { position: "absolute", top: i.translateY, width: i.sidebarWidth }
                            }
                            switch (t) {
                                case "VIEWPORT-TOP":
                                case "VIEWPORT-BOTTOM":
                                case "VIEWPORT-UNBOTTOM":
                                case "CONTAINER-BOTTOM":
                                    e.outer = { height: i.sidebarHeight, position: "relative" }
                            }
                            return e.outer = s.extend({ height: "", position: "" }, e.outer), e.inner = s.extend({ position: "relative", top: "", left: "", bottom: "", width: "", transform: this._getTranslate() }, e.inner), e
                        }
                    }
                }, {
                    key: "stickyPosition",
                    value: function(t) {
                        if (!this._breakpoint) {
                            t = this._reStyle || t || !1;
                            var e = this.getAffixType(),
                                n = this._getStyle(e);
                            if ((this.affixedType != e || t) && e) {
                                var o = "affix." + e.toLowerCase().replace("viewport-", "") + i;
                                s.eventTrigger(this.sidebar, o), "STATIC" === e ? s.removeClass(this.sidebar, this.options.stickyClass) : s.addClass(this.sidebar, this.options.stickyClass);
                                for (var r in n.outer) this.sidebar.style[r] = n.outer[r];
                                for (var a in n.inner) {
                                    var c = "number" == typeof n.inner[a] ? "px" : "";
                                    this.sidebarInner.style[a] = n.inner[a] + c
                                }
                                var p = "affixed." + e.toLowerCase().replace("viewport-", "") + i;
                                s.eventTrigger(this.sidebar, p)
                            } else this._initialized && (this.sidebarInner.style.left = n.inner.left);
                            this.affixedType = e
                        }
                    }
                }, { key: "_widthBreakpoint", value: function() { window.innerWidth <= this.options.minWidth ? (this._breakpoint = !0, this.affixedType = "STATIC", this.sidebar.removeAttribute("style"), s.removeClass(this.sidebar, this.options.stickyClass), this.sidebarInner.removeAttribute("style")) : this._breakpoint = !1 } }, {
                    key: "updateSticky",
                    value: function() {
                        var t = this,
                            e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        this._running || (this._running = !0, function(e) {
                            requestAnimationFrame(function() {
                                switch (e) {
                                    case "scroll":
                                        t._calcDimensionsWithScroll(), t.observeScrollDir(), t.stickyPosition();
                                        break;
                                    case "resize":
                                    default:
                                        t._widthBreakpoint(), t.calcDimensions(), t.stickyPosition(!0)
                                }
                                t._running = !1
                            })
                        }(e.type))
                    }
                }, {
                    key: "_setSupportFeatures",
                    value: function() {
                        var t = this.support;
                        t.transform = s.supportTransform(), t.transform3d = s.supportTransform(!0)
                    }
                }, {
                    key: "_getTranslate",
                    value: function() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                            i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
                        return this.support.transform3d ? "translate3d(" + t + ", " + e + ", " + i + ")" : !!this.support.translate && "translate(" + t + ", " + e + ")"
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        window.removeEventListener("resize", this), window.removeEventListener("scroll", this), this.sidebar.classList.remove(this.options.stickyClass), this.sidebar.style.minHeight = "", this.sidebar.removeEventListener("update" + i, this);
                        var t = { inner: {}, outer: {} };
                        t.inner = { position: "", top: "", left: "", bottom: "", width: "", transform: "" }, t.outer = { height: "", position: "" };
                        for (var e in t.outer) this.sidebar.style[e] = t.outer[e];
                        for (var n in t.inner) this.sidebarInner.style[n] = t.inner[n];
                        this.options.resizeSensor && "undefined" != typeof ResizeSensor && (ResizeSensor.detach(this.sidebarInner, this.handleEvent), ResizeSensor.detach(this.container, this.handleEvent))
                    }
                }], [{
                    key: "supportTransform",
                    value: function(t) {
                        var e = !1,
                            i = t ? "perspective" : "transform",
                            n = i.charAt(0).toUpperCase() + i.slice(1),
                            s = ["Webkit", "Moz", "O", "ms"],
                            o = document.createElement("support").style;
                        return (i + " " + s.join(n + " ") + n).split(" ").forEach(function(t, i) { if (void 0 !== o[t]) return e = t, !1 }), e
                    }
                }, {
                    key: "eventTrigger",
                    value: function(t, e, i) {
                        try { var n = new CustomEvent(e, { detail: i }) } catch (t) {
                            (n = document.createEvent("CustomEvent")).initCustomEvent(e, !0, !0, i)
                        }
                        t.dispatchEvent(n)
                    }
                }, { key: "extend", value: function(t, e) { var i = {}; for (var n in t) void 0 !== e[n] ? i[n] = e[n] : i[n] = t[n]; return i } }, {
                    key: "offsetRelative",
                    value: function(t) {
                        var e = { left: 0, top: 0 };
                        do {
                            var i = t.offsetTop,
                                n = t.offsetLeft;
                            isNaN(i) || (e.top += i), isNaN(n) || (e.left += n), t = "BODY" === t.tagName ? t.parentElement : t.offsetParent
                        } while (t);
                        return e
                    }
                }, { key: "addClass", value: function(t, e) { s.hasClass(t, e) || (t.classList ? t.classList.add(e) : t.className += " " + e) } }, { key: "removeClass", value: function(t, e) { s.hasClass(t, e) && (t.classList ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " ")) } }, { key: "hasClass", value: function(t, e) { return t.classList ? t.classList.contains(e) : new RegExp("(^| )" + e + "( |$)", "gi").test(t.className) } }]), s
            }()
        }();
    window.StickySidebar = i,
        function() {
            if ("undefined" != typeof window) {
                var t = window.$ || window.jQuery || window.Zepto;
                if (t) {
                    t.fn.stickySidebar = function(e) {
                        return this.each(function() {
                            var n = t(this),
                                s = t(this).data("stickySidebar");
                            if (s || (s = new i(this, "object" == typeof e && e), n.data("stickySidebar", s)), "string" == typeof e) {
                                if (void 0 === s[e] && -1 === ["destroy", "updateSticky"].indexOf(e)) throw new Error('No method named "' + e + '"');
                                s[e]()
                            }
                        })
                    }, t.fn.stickySidebar.Constructor = i;
                    var e = t.fn.stickySidebar;
                    t.fn.stickySidebar.noConflict = function() { return t.fn.stickySidebar = e, this }
                }
            }
        }()
});